import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-8">
      <div className="relative w-full h-[500px] overflow-hidden rounded-3xl shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1517429128955-67ff5c1e29da?q=80&w=1740&auto=format&fit=crop"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20 gap-6 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Explore the World <br /> With Comfort
          </h1>
          <p className="text-lg md:text-xl max-w-lg">
            Find and book your perfect flight, hotel or trip today. We make
            traveling easy and fun.
          </p>
          <Button
            variant="outline"
            className="text-foreground"
            onClick={() => navigate("/countries")}
          >
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
