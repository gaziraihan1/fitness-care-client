import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxios from "../../Hooks/useAxios";

const Testimonials = () => {

  const axiosInstance = useAxios();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading reviews...</p>
      </section>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const bgVariants = [
    "from-pink-50 to-white",
    "from-green-50 to-white",
    "from-yellow-50 to-white",
    "from-purple-50 to-white",
    "from-indigo-50 to-white",
  ];
  const borderVariants = [
    "border-pink-300",
    "border-green-300",
    "border-yellow-300",
    "border-purple-300",
    "border-indigo-300",
  ];

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            🌟 What Our Members Say
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Hear directly from our community of fitness lovers and trainees.
            Each story is unique and inspiring!
          </p>
        </div>

        <Slider {...settings}>
          {reviews.map((review, idx) => {
            const bg = bgVariants[idx % bgVariants.length];
            const border = borderVariants[idx % borderVariants.length];
            return (
              <div key={review._id} className="px-3">
                <div
                  className={`bg-gradient-to-br ${bg} rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 hover:rotate-1 border-t-4 ${border} p-6 h-full flex flex-col justify-between`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={review?.userPhoto || "/default-avatar.png"}
                      alt={review.userName}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-offset-2 ring-blue-400"
                    />
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {review.userName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {review.userEmail}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-base leading-relaxed italic mb-6 flex-grow">
                    “{review.feedback}”
                  </p>

                  <div className="text-yellow-400 text-xl flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>
                        {index < review.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
