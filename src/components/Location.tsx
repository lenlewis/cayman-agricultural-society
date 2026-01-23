import Image from "next/image";

export default function Location() {
  return (
    <section id="location" className="py-20 bg-[#F2E3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#027373] mb-4">
            Our Location
          </h2>
          <div className="w-24 h-1 bg-[#7EA629] mx-auto mb-6"></div>
          <p className="text-lg text-[#027373]/80">
            Find us at the Stacy Watler Agriculture Pavilion
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#04ADBF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#04ADBF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#027373] mb-2">
                    Address
                  </h3>
                  <p className="text-[#027373]/70">
                    Stacy Watler Agriculture Pavilion
                    <br />
                    Agricola Drive, Lower Valley
                    <br />
                    Bodden Town, Grand Cayman
                    <br />
                    Cayman Islands
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#04ADBF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#04ADBF]"
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
                  <h3 className="text-lg font-semibold text-[#027373] mb-2">
                    Mailing Address
                  </h3>
                  <p className="text-[#027373]/70">
                    P.O. Box 1768
                    <br />
                    Grand Cayman KY1-1109
                    <br />
                    Cayman Islands
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#04ADBF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#04ADBF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#027373] mb-2">
                    Getting Here
                  </h3>
                  <p className="text-[#027373]/70">
                    Located in Lower Valley, Bodden Town district. The pavilion
                    is easily accessible from the main road with ample parking
                    available.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/pavilion.png"
                alt="Stacy Watler Agriculture Pavilion"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold text-lg">Stacy Watler Agriculture Pavilion</p>
                <p className="text-white/80 text-sm">Your home for agricultural excellence</p>
              </div>
            </div>
            <div className="h-64 rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.8!2d-81.2!3d19.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE4JzAwLjAiTiA4McKwMTInMDAuMCJX!5e0!3m2!1sen!2sky!4v1600000000000!5m2!1sen!2sky"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cayman Islands Agricultural Society Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
