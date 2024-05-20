import React, { Fragment } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Your components go here
import Home from './frontend/Home';

import Login from './frontend/Login';
import Register from './frontend/Register';
import Search from './frontend/Search';
import DashboardLayout from './backend/dashboard';





import EditUser from './backend/user/EditUser';
import AddUser from './backend/user/AddUser';
import ShowUsers from './backend/user/ShowUser';
import Detail from './frontend/Detail';
import UserDashboardLayout from './frontend/Dashboard';

import AddProperty from './backend/Property/AddProperty';
import ShowAllPropertys from './backend/Property/ShowAllProperty';
import EditProperty from './backend/Property/EditProperty';
import ShowAllRents from './backend/rent/ShowAllRent';
import AddRent from './backend/rent/AddRent';
import EditRent from './backend/rent/EditRent';
import Property from './frontend/Property';
import Rent from './frontend/Rent';
import PropertyDetail from './frontend/PropertyDetail';
import RentBookingPage from './frontend/dasboard/rent/rentbooking';
import PropertyBookingPage from './frontend/dasboard/property/propertybooking';
import AdminRentBookingPage from './backend/rentbooking/rentbooking';
import AdminPropertyBookingPage from './backend/propertybooking/propertybooking';
import AdminDocumentPage from './backend/document/document';
import Khalti from './frontend/Khalti';

function App() {
  return (
    <Router>
      <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rents" element={<Rent />} />
        <Route path="/property" element={<Property />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />

        <Route path="/admin/dashboard" element={<PrivateRoute userRole="admin" element={<DashboardLayout />} />} />

        {/* <Route path="/admin/dashboard" element={<DashboardLayout />} /> */}
        
        <Route path="/admin/addproperty" element={<PrivateRoute userRole="admin" element={<AddProperty />} />} />

        {/* <Route path="/admin/addproperty" element={<AddProperty />} /> */}

        <Route path="/admin/showproperty" element={<PrivateRoute userRole="admin" element={<ShowAllPropertys />} />} />

        {/* <Route path="/admin/showproperty" element={< ShowAllPropertys/>} /> */}

        <Route path="/admin/editproperty/:id" element={<PrivateRoute userRole="admin" element={<EditProperty />} />} />

        {/* <Route exact path="/admin/editproperty/:id" element={<EditProperty/>} /> */}

        <Route path="/admin/showrents" element={<PrivateRoute userRole="admin" element={<ShowAllRents />} />} />


        {/* <Route path="/admin/showrents" element={< ShowAllRents/>} /> */}

        <Route path="/admin/addrent" element={<PrivateRoute userRole="admin" element={<AddRent />} />} />

        {/* <Route path="/admin/addrent" element={<AddRent />} /> */}

        <Route path="/admin/editrent/:id" element={<PrivateRoute userRole="admin" element={<EditRent />} />} />

        {/* <Route exact path="/admin/editrent/:id" element={<EditRent/>} /> */}


    
        <Route path="/admin/showusers" element={<PrivateRoute userRole="admin" element={<ShowUsers />} />} />

        {/* <Route path="/admin/showusers" element={< ShowUsers/>} /> */}

        <Route path="/admin/adduser" element={<PrivateRoute userRole="admin" element={<AddUser />} />} />

        {/* <Route path="/admin/adduser" element={<AddUser />} /> */}
        <Route path="/admin/edituser/:id" element={<PrivateRoute userRole="admin" element={<EditUser />} />} />

        {/* <Route exact path="/admin/edituser/:id" element={<EditUser/>} /> */}

         <Route path="/detail/:id" element={<Detail />} />
         <Route path="/propertydetail/:id" element={< PropertyDetail/>} />


         <Route path="/admin/rentbooking" element={<PrivateRoute userRole="admin" element={<AdminRentBookingPage />} />} />

         {/* <Route path="/admin/rentbooking" element={<AdminRentBookingPage />} /> */}

         <Route path="/admin/propertybooking" element={<PrivateRoute userRole="admin" element={<AdminPropertyBookingPage />} />} />
         <Route path="/admin/document" element={<PrivateRoute userRole="admin" element={<AdminDocumentPage />} />} />

         {/* <Route path="/admin/propertybooking" element={<AdminPropertyBookingPage />} /> */}


         {/* users */}
         <Route path="/user/dashboard" element={<UserDashboardLayout />} />
         <Route path="/user/rentbooking" element={<RentBookingPage />} />
         <Route path="/user/propertybooking" element={<PropertyBookingPage />} />

         <Route path="/khalti/payment" element={<Khalti />} />

      </Routes>

      </Fragment>

    </Router>
  );
}

export default App;
