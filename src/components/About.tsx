import Image from "next/image";

export default function About() {
  const features = [
    {
      title: "Agricultural Shows",
      description:
        "Annual agricultural shows showcasing local produce, livestock, and farming innovations.",
      image: "/images/agricultural-show.png",
    },
    {
      title: "Farmer Support",
      description:
        "Resources and support for local farmers to improve agricultural practices and sustainability.",
      image: "/images/farmer-support.png",
    },
    {
      title: "Community Events",
      description:
        "Regular community events promoting local agriculture and connecting farmers with consumers.",
      image: "/images/community-event.png",
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#F2E3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#027373] mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-[#7EA629] mx-auto mb-6"></div>
          <p className="text-lg text-[#027373]/80 max-w-3xl mx-auto">
            The Cayman Islands Agricultural Society is a non-profit organization
            dedicated to promoting and supporting agriculture throughout the
            Cayman Islands. We work to preserve our agricultural heritage while
            embracing modern sustainable farming practices.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#027373] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#027373]/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#027373] rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Our Mission
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto">
            To foster the growth and development of agriculture in the Cayman
            Islands by providing education, resources, and community support to
            farmers and agricultural enthusiasts alike.
          </p>
        </div>
      </div>
    </section>
  );
}
