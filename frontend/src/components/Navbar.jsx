import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Modal, Button } from 'react-bootstrap';
import axios
 from 'axios';
const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(''); // Store user ID
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(''); // Store preview image URL
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    // Check if user is logged in based on local storage
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.username);
      setUserId(userData._id); // Store user ID
      setIsLoggedIn(true); // Update login status
    } else {
      setIsLoggedIn(false);
      setUserName('');
      setUserId(''); // Clear user ID if not logged in
    }
  }, []);

  const handleShowModal = () => {
    setShowModal(true); // Show the modal when triggered
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear local storage on logout
    setIsLoggedIn(false); // Update login status
    setUserName('');
    setUserId(''); // Clear user ID on logout
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file); // Store the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Preview the uploaded image
      };
      reader.readAsDataURL(file); // Read the uploaded file
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("user_id", userId);
  
      try {
        const response = await axios.post(`http://localhost:9000/user/document/${userId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (response.data.success) {
          console.log("Document uploaded successfully:", response.data);
        } else {
          console.error("Upload failed:", response.data.error);
        }
      } catch (error) {
        console.error("Upload error:", error); // Handle errors in the promise
      }
    } else {
      console.error("No file selected."); // Ensure there is a file to upload
    }
  };
  
  return (
    <Container>
      <Navbar expand="lg" className="navbar-dark bg-white">
        <Navbar.Brand href="/">
          <h3 style={{ color: '#0177A8' }}>Realestate</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/property">Property</Nav.Link>
            <Nav.Link href="/rents">Rent</Nav.Link>

            {isLoggedIn ? (
              <div className="d-flex align-items-center">
             <a className='mr-2 text-decoration-none text-black mr-2' href="/property">Property</a>
            <a className='mr-2 text-decoration-none text-black' href="/rents">Rent</a>
                <Button onClick={handleShowModal} className="btn btn-primary mr-2">
                  Upload Document
                </Button>
                <span className="mr-2">Welcome, {userName}</span>
                <Button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex">
                <a href="/login" className="btn btn-outline-primary mr-2">
                  Login
                </a>
                <a href="/register" className="btn btn-primary">
                  Register
                </a>
              </div>
            )}
          </Nav> 
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Upload Document</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <form
  onSubmit={(e) => {
    e.preventDefault(); // Pass the event to prevent form submission
    handleSubmit(e); // Ensure the event is passed to handleSubmit
  }}
>
      <input type="text" name="user_id" value={userId} />
      <div className="mb-3">
        <label htmlFor="imageUpload" className="form-label">Upload Image</label>
        <input type="file" className="form-control" id="imageUpload" onChange={handleImageUpload} />
      </div>
      {previewImage && (
        <div>
          <img src={previewImage} alt="Preview" style={{ maxWidth: '100%' }} />
        </div>
      )}
       <Button
        variant="primary"
        type="submit"
  
      >
        Upload Document
      </Button>
    </form>
  </Modal.Body>
</Modal>



    </Container>
  );
};

export default Navigation;
