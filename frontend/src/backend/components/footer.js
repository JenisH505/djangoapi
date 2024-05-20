// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span className="text-muted">Admin Dashboard - &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

export default Footer;
