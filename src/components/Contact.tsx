export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#027373] mb-4">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-[#7EA629] mx-auto mb-6"></div>
          <p className="text-lg text-[#027373]/80">
            Get in touch with us for inquiries and information
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-[#04ADBF] rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#027373] mb-2">
                  Phone
                </h3>
                <a
                  href="tel:+13459473696"
                  className="text-[#04ADBF] hover:text-[#027373] text-lg transition-colors"
                >
                  +1 (345) 947-3696
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-[#04ADBF] rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#027373] mb-2">
                  Email
                </h3>
                <a
                  href="mailto:ciagriculturalevents@gmail.com"
                  className="text-[#04ADBF] hover:text-[#027373] text-lg transition-colors"
                >
                  ciagriculturalevents@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-[#04ADBF] rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#027373] mb-2">
                  Facebook
                </h3>
                <a
                  href="https://www.facebook.com/CaymanAgriculture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#04ADBF] hover:text-[#027373] text-lg transition-colors"
                >
                  @CaymanAgriculture
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#027373] to-[#04ADBF] rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Send Us a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white/90 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#7EA629] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/90 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#7EA629] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white/90 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#7EA629] focus:border-transparent resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#7EA629] hover:bg-[#6b8f23] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
