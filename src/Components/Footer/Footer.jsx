const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-12">
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
              <a href="/" className="text-gray-400 hover:text-red-400">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="text-gray-400 hover:text-red-400">
                Products
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-sm">123 Main Street, City, Country</p>
          <p className="text-sm">Email: info@example.com</p>
          <p className="text-sm">Phone: +1234567890</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm text-gray-400">Created by Yasin</p>
      </div>
    </footer>
  );
};

export default Footer;
