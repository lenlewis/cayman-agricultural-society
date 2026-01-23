import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      <Image
        src="/images/hero-bg.png"
        alt="Lush tropical farmland in the Cayman Islands"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#027373]/70 via-[#04ADBF]/50 to-[#04BFBF]/60"></div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="w-36 h-36 mx-auto bg-white rounded-full flex items-center justify-center shadow-xl overflow-hidden">
            <Image
              src="/images/logo.jpg"
              alt="Cayman Islands Agricultural Society Logo"
              width={144}
              height={144}
              className="object-cover"
              priority
            />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Cayman Islands
          <br />
          <span className="text-[#7EA629]">Agricultural Society</span>
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Supporting and promoting agriculture in the Cayman Islands since 1965
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-block bg-[#7EA629] hover:bg-[#6b8f23] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg"
          >
            Get In Touch
          </a>
          <a
            href="#about"
            className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 backdrop-blur-sm border border-white/30"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/80 hover:text-white">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
