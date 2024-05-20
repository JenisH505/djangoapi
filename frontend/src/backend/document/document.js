import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Sidebar from '../components/sidebar';


const AdminDocumentPage = () => {
  const [documents, setDocuments] = useState([]); // State to store the documents

  useEffect(() => {
    // Fetch documents from the server
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:9000/admin/document/'); // Fetch from the specified endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        
        const data = await response.json(); // Parse JSON response

        if (data.success) {
          setDocuments(data.data); // Store the retrieved documents in state
        } else {
          throw new Error('Failed to fetch documents');
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments(); // Call the fetch function
  }, []); // Empty dependency array to fetch once on component mount

  return (
    <Container fluid>
      <Row>
        <Col xs={3} id="sidebar">
          <Sidebar />
        </Col>
        <Col xs={9} id="content">
          <h2>Documents List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Document ID</th>
                <th>User ID</th>
                <th>Image</th>
                {/* <th>Created At</th> */}
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <tr key={index}>
                    <td>{doc._id}</td>
                    <td>{doc.user_id}</td>
                    <td>{doc.image}</td>
                    {/* <td>{doc.createdAt}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No documents available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDocumentPage;
