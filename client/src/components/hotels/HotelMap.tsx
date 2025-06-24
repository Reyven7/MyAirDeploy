
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HotelOffer } from "@/types/hotel/hotel.type"; 
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl; 
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


interface Props {
  hotels: HotelOffer[]; 
}

export const HotelMap = ({ hotels }: Props) => {
  const centerHotel = hotels.find(h =>
    h.hotel.latitude !== undefined && h.hotel.longitude !== undefined
  );

  if (!centerHotel) {
    return <p className="text-center mt-4">No location data available</p>; //
  }

  
  const centerLat = centerHotel.hotel.latitude;
  const centerLng = centerHotel.hotel.longitude;


  if (centerLat === undefined || centerLng === undefined) {
    return <p className="text-center mt-4">No valid center coordinates found</p>;
  }

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {hotels.map((hotelOffer, idx) => { 
        const markerLat = hotelOffer.hotel.latitude;
        const markerLng = hotelOffer.hotel.longitude;

        if (markerLat !== undefined && markerLng !== undefined) {
          return (
            <Marker
              key={hotelOffer.hotel.hotelId || idx} 
              position={[markerLat, markerLng]}
             
              icon={L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
                shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              })}
            >
              <Popup>
                <b>{hotelOffer.hotel.name}</b><br /> {/* Доступ к имени через hotelOffer.hotel.name */}
                {hotelOffer.offers[0]?.price.currency} {hotelOffer.offers[0]?.price.total} {/* Доступ к цене через offers */}
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
};