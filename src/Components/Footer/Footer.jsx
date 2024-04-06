import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-12 text-center">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-8">
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            convallis libero eget risus feugiat consequat. Morbi eu mauris vel
            risus suscipit cursus.
          </p>
        </div>
        <div className="w-full md:w-1/3 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="text-sm">
            <li>
              <a href="/" className="text-white hover:text-indigo-400">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="text-white hover:text-indigo-400">
                Products
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 mb-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-sm flex items-center mb-2">info@example.com</p>
          <p className="text-sm flex items-center mb-2">+1234567890</p>
          <p className="text-sm">123 Main Street, City, Country</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm text-white">Created by Yasin</p>
      </div>
    </footer>
  );
};

export default Footer;
