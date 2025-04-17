export default function FrontendFooter() {
  return (
    <footer className="bg-[#f8f8f8] text-gray-700 text-sm px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        {/* Logo & Copyright */}
        <div>
          <h1 className="text-2xl font-bold text-black mb-3">
            Flone<span className="text-black">.</span>
          </h1>
          <p className="text-sm">
            © 2025 Flone.
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
          <button className="mt-4 underline text-black font-medium hover:text-gray-800">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Scroll to top button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-[#a855f7] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition">
          <span className="text-xl">⇧</span>
        </button>
      </div>
    </footer>
  );
}
