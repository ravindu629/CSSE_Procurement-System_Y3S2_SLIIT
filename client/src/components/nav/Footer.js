import React from "react";
import "./nav.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foter">
      <div>
        <a href="https://twitter.com/?lang=en">
          <i className="fab footer-icons fa-twitter"></i>
        </a>
        <i className="fab footer-icons fa-facebook-f"></i>
        <i className="fab footer-icons fa-instagram"></i>
        <i className="fas footer-icons fa-envelope"></i>
        <p className="copyright">© Copyright {year}</p>
      </div>
    </footer>
  );
}

export default Footer;
