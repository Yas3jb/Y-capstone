import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>123 Main Street, City, Country</p>
          <p>Email: info@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Created by Yasin</p>
      </div>
    </footer>
  );
};

export default Footer;
