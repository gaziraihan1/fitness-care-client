import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Testimonials = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews');
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-10 text-blue-600 font-semibold">Loading testimonials...</p>;
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">🌟 What Our Members Say</h2>
        <p className="text-gray-600 mb-10">Hear directly from our community of fitness lovers and trainees.</p>

        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.userPhoto}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <h4 className="font-bold text-gray-800">{review.userName}</h4>
                      <p className="text-sm text-gray-500">{review.userEmail}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">"{review.feedback}"</p>
                </div>

                <div className="text-yellow-400 text-lg">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
