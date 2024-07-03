import * as React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useDropzone, Accept } from 'react-dropzone';
import { useState } from 'react';
import { Button, Alert, Modal } from 'react-bootstrap';
import { db, storage, auth } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import * as XLSX from 'xlsx';
import Footer from '../../components/Footer/Footer';

interface Transaction {
  receiptNo: string;
  completionTime: string;
  details: string;
  transactionStatus: string;
  paidIn: number | null;
  withdrawn: number | null;
  balance: number;
}

const UploadStatement: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile || acceptedFiles.length > 1 || selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setError('Please upload only one Excel file (.xlsx).');
      return;
    }
    setFile(selectedFile);
    setError(null);
    setShowModal(true);
  };

  const accept: Accept = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
  });

  const extractTransactions = async (): Promise<Transaction[]> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No file provided');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as Array<any[]>;

        const transactions: Transaction[] = [];
        let isReadingTransactions = false;

        jsonData.forEach(row => {
          if (
            row.includes('Receipt No.') &&
            row.includes('Completion Time') &&
            row.includes('Details') &&
            row.includes('Transaction Status') &&
            row.includes('Paid In') &&
            row.includes('Withdrawn') &&
            row.includes('Balance')
          ) {
            isReadingTransactions = true;
            return; // Skip the header row
          }

          if (isReadingTransactions) {
            const [receiptNo, completionTime, details, transactionStatus, paidIn, withdrawn, balance] = row;
            if (
              receiptNo !== undefined &&
              completionTime !== undefined &&
              details !== undefined &&
              transactionStatus !== undefined &&
              balance !== undefined
            ) {
              transactions.push({
                receiptNo: receiptNo.toString(),
                completionTime: completionTime.toString(),
                details: details.toString(),
                transactionStatus: transactionStatus.toString(),
                paidIn: paidIn !== undefined ? parseFloat(paidIn) : null,
                withdrawn: withdrawn !== undefined ? parseFloat(withdrawn) : null,
                balance: parseFloat(balance),
              });
            } else {
              isReadingTransactions = false; // Stop reading if a row is missing mandatory data
            }
          }
        });

        resolve(transactions);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `statements/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);

            try {
              const transactions = await extractTransactions();

              console.log('Transactions to Save:', transactions); // Log transactions before saving

              const userId = auth.currentUser?.uid;
              if (userId) {
                const docRef = await addDoc(collection(db, 'transactions'), {
                  userId,
                  transactions,
                  uploadedAt: new Date(),
                });
                console.log('Document written with ID: ', docRef.id);
              } else {
                setError('User is not logged in.');
              }
            } catch (e) {
              setError('Error adding document: ' + e);
            }
          });
        }
      );
    }
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <Header />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-2 p-0 ">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col">
              <h1>Upload your M-Pesa statement</h1>
              <div {...getRootProps()} className="dropzone p-5 border rounded bg-light text-center">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <p>Drag 'n' drop an Excel file (.xlsx) here, or click to select a file</p>
                )}
                {file && <p>Selected file: {file.name}</p>}
              </div>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              <Button className="mt-3" onClick={handleUpload} disabled={!file}>
                Upload
              </Button>
              {uploadProgress > 0 && (
                <div className="progress mt-3">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${uploadProgress}%` }}
                    aria-valuenow={uploadProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    {uploadProgress}%
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ready to upload your Excel file?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
      <Footer />
    </div>
    </div>
  );
};

export default UploadStatement;
