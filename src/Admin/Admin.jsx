import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import Sidebar from '../components/Sidebar/Sidebar.tsx';
import { db, auth } from '../config/firebase.js'
import { collection, query, where, orderBy, limit, getDocs, doc, deleteDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import {Spinner} from 'react-bootstrap';

import './admin-styles.css'
import { Button } from 'react-bootstrap';

function AppSideBar(props) {
  return (
    <div className='sidebar'>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Button
          onClick={()=>{
            console.log(props);
            props.refreshAction();
          }}
        >
          Refresh
        </Button>
      </Nav>
    </div>
  );
}

function AppNav() {
  const navigate = useNavigate();
  return (
    <Navbar className="bg-body-tertiary" fixed='top'>
      <Navbar.Brand href="#home">Akiba Admin </Navbar.Brand>
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{auth.currentUser.displayName || 'Admin'}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      <Button 
      onClick={()=>{
        signOut(auth)
        .then(()=>{
          navigate('/')
        })
      }}> LogOut </Button>
    </Navbar>
  )
}

function AdminApp() {
  const [Users, SetUsers] = useState([]);
  const getUsers = async () => {
    SetUsers([]);
    let TEMP = [];
    let users_col = collection(db, "users");
    getDocs(users_col)
      .then(snapshot => {
        snapshot.forEach((doc) => {
          TEMP.push({ id: doc.id, data: doc.data() });
        });
        SetUsers(TEMP);
      })
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (userObject)=>{
    console.log(userObject.id);
    const deleteRef = doc(db, 'users', userObject.id);
    deleteDoc(deleteRef)
      .then(()=>{
        getUsers();
      }).catch(err=> console.error(err));
  }

  return (
    <div className='app-main-content'>
      <AppSideBar refreshAction={getUsers}/>
      <div className="admin-content">
        <Table>
          <thead>
            <TableRow>
              <TableHeader>UID </TableHeader>
              <TableHeader>First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {Users ?
              (<>
                {Users.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.data.firstName}</TableCell>
                    <TableCell>{transaction.data.lastName}</TableCell>
                    <TableCell>{transaction.data.email}</TableCell>
                    <TableCell>{transaction.data.role || 'User'}</TableCell>
                    <TableCell> 
                      {(transaction.data.role != 'admin') &&                       
                      <MdDelete size={25} onClick={()=>{
                        handleDelete(transaction);
                      }}/> }
                    </TableCell>
                  </TableRow>
                ))}
              </>) :
              (<>
                <Spinner/>
              </>)}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default function Admin() {
  return (
    <div className='root-element'>
      <AppNav />
      <AdminApp />
    </div>
  )
}


const Title = styled.div`
  font-size: 15px;
  line-height: 32px;
  color: #737373;
  margin-bottom: 16px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Tab = styled.div`
  padding: 10px 10px;
  font-size: 14px;
  font-weight: bold;
  color: #525252;
  cursor: pointer;

  &.active {
    color: #14b8a6;
    border-bottom: 2px solid #14b8a6;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f3f4f6;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #27272a;
  border-bottom: 1px solid rgba(156, 163, 175, 0.3);
`;

const TableCell = styled.td`
  padding: 5px;
  text-align: left;
  font-size: 14px;
  color: #27272a;
  border-bottom: 1px solid rgba(156, 163, 175, 0.3);
`;

const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #14b8a6;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
`;

