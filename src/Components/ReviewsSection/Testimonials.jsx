import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center py-10 text-blue-600 font-semibold text-lg">
        Loading testimonials...
      </p>
    );
  }

  // slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            🌟 What Our Members Say
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Hear directly from our community of fitness lovers and trainees.
            Their stories inspire us every day!
          </p>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review._id} className="px-3">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 p-6 h-full flex flex-col justify-between">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={review?.userPhoto || "/default-avatar.png"}
                    alt={review.userName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {review.userName}
                    </h4>
                    <p className="text-sm text-gray-500">{review.userEmail}</p>
                  </div>
                </div>

                {/* Feedback */}
                <p className="text-gray-700 text-base leading-relaxed italic mb-6 flex-grow">
                  “{review.feedback}”
                </p>

                {/* Rating */}
                <div className="text-yellow-400 text-xl flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>
                      {index < review.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
