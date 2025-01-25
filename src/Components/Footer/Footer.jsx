import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-box">
          <h5 className="main-heading">Connect with us</h5>
          <p className="sub">+91 123456789</p>
          <p className="sub">Connect@withus.com</p>
        </div>
        <div className="footer-box">
          <h3 className="main-heading">Organization</h3>
          <p className="sub">MENU APP</p>
        </div>
        <div className="footer-box">
          <h5 className="main-heading">Find us</h5>
          <p className="sub">
            123 Innovation Drive, Suite 400 San Francisco, CA 94105 United
            States
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
