interface CardProps {
  city: string;
  image: string;
  country: string;
  price: number;
}

const Card = ({ city, image, country, price }: CardProps) => {
  return (
    <div className="w-full sm:max-w-[385px] rounded-2xl overflow-hidden transition-shadow hover:shadow-xl cursor-pointer group bg-white border border-zinc-200 mx-auto">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={city}
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
        />
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-full text-xs sm:text-sm px-3 py-1 text-gray-900 font-semibold shadow">
            from ${price}
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          {city}
        </h3>
        <p className="text-sm sm:text-base text-gray-600">{country}</p>
      </div>
    </div>
  );
};

export default Card;
