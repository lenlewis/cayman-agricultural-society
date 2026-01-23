export default function Hours() {
  const hours = [
    { day: "Monday", time: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", time: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", time: "9:00 AM - 5:00 PM" },
    { day: "Thursday", time: "9:00 AM - 5:00 PM" },
    { day: "Friday", time: "9:00 AM - 5:00 PM" },
    { day: "Saturday", time: "9:00 AM - 1:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  const getCurrentDay = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date().getDay()];
  };

  const currentDay = getCurrentDay();

  return (
    <section id="hours" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#027373] mb-4">
            Opening Hours
          </h2>
          <div className="w-24 h-1 bg-[#7EA629] mx-auto mb-6"></div>
          <p className="text-lg text-[#027373]/80">
            Visit us during our regular business hours
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-[#04ADBF] to-[#027373] rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-center mb-8">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div className="space-y-3">
              {hours.map((item) => (
                <div
                  key={item.day}
                  className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors ${
                    item.day === currentDay
                      ? "bg-white/20 border-l-4 border-[#7EA629]"
                      : "hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      item.day === currentDay
                        ? "text-white font-bold"
                        : "text-white/90"
                    }`}
                  >
                    {item.day}
                    {item.day === currentDay && (
                      <span className="ml-2 text-xs bg-[#7EA629] px-2 py-1 rounded-full">
                        Today
                      </span>
                    )}
                  </span>
                  <span
                    className={`${
                      item.time === "Closed"
                        ? "text-white/60"
                        : "text-white font-medium"
                    }`}
                  >
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 text-center">
              <p className="text-white/80 text-sm">
                * Hours may vary during public holidays and special events
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
