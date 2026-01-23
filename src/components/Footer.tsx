export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#027373] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              CI Agricultural Society
            </h3>
            <p className="text-white/80">
              Supporting and promoting agriculture in the Cayman Islands since
              1965.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-white/80 hover:text-[#04BFBF] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-white/80 hover:text-[#04BFBF] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#hours"
                  className="text-white/80 hover:text-[#04BFBF] transition-colors"
                >
                  Opening Hours
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="text-white/80 hover:text-[#04BFBF] transition-colors"
                >
                  Location
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/80 hover:text-[#04BFBF] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-white/80">
              <li>Stacy Watler Agriculture Pavilion</li>
              <li>Agricola Drive, Lower Valley</li>
              <li>Grand Cayman, Cayman Islands</li>
              <li className="pt-2">
                <a
                  href="tel:+13459473696"
                  className="hover:text-[#04BFBF] transition-colors"
                >
                  +1 (345) 947-3696
                </a>
              </li>
              <li>
                <a
                  href="mailto:ciagriculturalevents@gmail.com"
                  className="hover:text-[#04BFBF] transition-colors"
                >
                  ciagriculturalevents@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Cayman Islands Agricultural Society. All rights
            reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://www.facebook.com/CaymanAgriculture"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#7EA629] transition-colors"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
