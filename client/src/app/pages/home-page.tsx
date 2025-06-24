import React from "react";
import Card from "@/components/card";
import { Globe } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import HeroBanner from "@/components/hero-banner";
import FlightSearch from "@/components/search-block";

const data = [
  {
    city: "Paris",
    image:
      "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=1742&auto=format&fit=crop",
    country: "France",
    price: 200,
  },
  {
    city: "Rome",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1740&auto=format&fit=crop",
    country: "Italy",
    price: 180,
  },
  {
    city: "Barcelona",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    country: "Spain",
    price: 190,
  },
  {
    city: "London",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1740&auto=format&fit=crop",
    country: "United Kingdom",
    price: 220,
  },
  {
    city: "Amsterdam",
    image:
      "https://images.unsplash.com/photo-1459679749680-18eb1eb37418?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    country: "Netherlands",
    price: 170,
  },
];

export const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Form Search */}
      <FlightSearch />

      {/* Hero Banner */}
      <div className="container mx-auto max-w-7xl px-4 mt-12 mb-20">
        <section>
          <HeroBanner />
        </section>
      </div>

      {/* Popular directions */}
      <div className="container mx-auto max-w-7xl px-4 mt-12 mb-20">
        <section>
          <h2 className="text-2xl flex items-center gap-2 p-2 font-semibold">
            <Globe className="text-blue-400" />
            Popular Destinations
          </h2>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mt-6"
          >
            {data.map((item, idx) => (
              <SwiperSlide key={idx}>
                <Card
                  city={item.city}
                  image={item.image}
                  country={item.country}
                  price={item.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  );
};
