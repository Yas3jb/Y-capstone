import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0a4abf] text-white py-10 text-center">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-8">
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-sm">
            Welcome to our e-commerce platform! We are dedicated to providing
            the best shopping experience for our customers. Browse through our
            wide range of products and find exactly what you need. Our mission
            is to make online shopping convenient, affordable, and enjoyable for
            everyone.
          </p>
        </div>
        <div className="w-full md:w-1/3 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="text-sm">
            <li className="mb-1">
              <a
                href="/"
                className="text-white hover:text-yellow-300 transition-all duration-300"
              >
                Home
              </a>
            </li>
            <li className="mb-1">
              <a
                href="/products"
                className="text-white hover:text-yellow-300 transition-all duration-300"
              >
                Products
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <div className="text-sm mb-2">
            <FaEnvelope className="inline-block mr-2" />
            info@example.com
          </div>
          <div className="text-sm mb-2">
            <FaPhoneAlt className="inline-block mr-2" />
            +1234567890
          </div>
          <p className="text-sm">123 Main Street, City, Country</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm text-white">Created by Yasin</p>
        <div className="flex justify-center items-center mt-2">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 hover:text-yellow-300 transition-all duration-300"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 hover:text-yellow-300 transition-all duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 hover:text-yellow-300 transition-all duration-300"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
