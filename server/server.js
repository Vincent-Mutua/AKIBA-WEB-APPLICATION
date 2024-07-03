const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { extractTables } = require('@krakz999/tabula-node');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.post('/upload', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  const password = req.body.password;

  const filePath = path.join(__dirname, 'uploads', file.name);
  file.mv(filePath, async (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(500).send(err);
    }

    try {
      const results = await extractTables(filePath, {
        pages: 'all',
        guess: true,
        password: password,
        format: 'JSON'
      });

      console.log('Extracted Results:', results); // Log the extracted results
      res.json(JSON.parse(results));
    } catch (error) {
      console.error('Error extracting tables:', error);
      res.status(500).send('Error extracting tables from PDF.');
    } finally {
      fs.unlinkSync(filePath);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
