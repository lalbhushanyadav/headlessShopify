import Button from "../../components/Button";
import { Link } from "react-router-dom";
export default function FrontendFooter() {
  return (
    <footer className="bg-white dark:bg-black text-gray-700 dark:text-gray-200 text-sm px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        {/* Logo & Copyright */}
        <div>
          <Link to="/" className="px-4 py-2">
            <h1 className="text-2xl font-bold text-black dark:text-white mb-3">
              Demo<span className="text-black dark:text-white">.</span>
            </h1>
          </Link>

          <p className="text-sm">
            © 2025 Demo.
            <br />
            All Rights Reserved
          </p>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-base font-semibold mb-3">ABOUT US</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:underline">About us</li>
            <li className="cursor-pointer hover:underline">Store location</li>
            <li className="cursor-pointer hover:underline">Contact</li>
            <li className="cursor-pointer hover:underline">Orders tracking</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-base font-semibold mb-3">USEFUL LINKS</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:underline">Returns</li>
            <li className="cursor-pointer hover:underline">Support Policy</li>
            <li className="cursor-pointer hover:underline">Size guide</li>
            <li className="cursor-pointer hover:underline">FAQs</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-base font-semibold mb-3">FOLLOW US</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:underline">Facebook</li>
            <li className="cursor-pointer hover:underline">Twitter</li>
            <li className="cursor-pointer hover:underline">Instagram</li>
            <li className="cursor-pointer hover:underline">Youtube</li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-base font-semibold mb-3">SUBSCRIBE</h3>
          <p className="mb-4 text-sm leading-5">
            Get E-mail updates about our latest shop and special offers.
          </p>
          <input
            type="email"
            placeholder="Enter your email address..."
            className="w-full px-3 py-2 text-sm border-b border-gray-300 bg-transparent focus:outline-none"
          />
          <button className="mt-4 underline text-black dark:text-white font-medium hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer transition duration-300 ease-in-out">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Scroll to top button */}
      <div className="fixed bottom-6 right-6 z-9 cursor-pointer">
        <Button className="w-10 h-10 rounded-circle flex items-center justify-center p-0">
          <span className="text-xl">⇧</span>
        </Button>
      </div>
    </footer>
  );
}
