import React from 'react';
import { HotelOffer, Media } from "@/types/hotel/hotel.type"; 

interface HotelCardProps {
  hotel: HotelOffer;
}

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || ''; 

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  // **** ОСТАВЬТЕ ЭТИ СТРОКИ РАСКОММЕНТИРОВАННЫМИ ДЛЯ ДАЛЬНЕЙШЕЙ ДИАГНОСТИКИ ****
  console.log("Loaded GOOGLE_API_KEY:", GOOGLE_API_KEY); 
  console.log("Hotel data in HotelCard:", hotel); 

  let finalImageUrl: string;
  const defaultPlaceholder = 'https://via.placeholder.com/300x200?text=No+Image';

  // Пытаемся получить photoReference из разных возможных полей.
  // Пожалуйста, проверьте в консоли, какое из этих полей (или другое) содержит ID фотографии.
  const rawPhotoReferenceCandidate =
    (hotel.hotel as any)?.media?.[0]?.googlePhotoReference || 
    (hotel.hotel as any)?.photos?.[0]?.photo_reference ||     
    (hotel.hotel as any)?.photoReference ||                   
    (hotel.hotel as any)?.icon_mask_base_uri ||               
    ''; 

  let photoReference: string | undefined = undefined;

  // **** ВАЖНОЕ ИСПРАВЛЕНИЕ: МАКСИМАЛЬНАЯ ОЧИСТКА photoReference ****
  if (typeof rawPhotoReferenceCandidate === 'string' && rawPhotoReferenceCandidate.length > 0) {
    let cleanedRef = rawPhotoReferenceCandidate;

    // 1. Декодируем HTML-сущности (например, "&lt;" в "<").
    try {
        const doc = new DOMParser().parseFromString(cleanedRef, 'text/html');
        cleanedRef = doc.documentElement.textContent || '';
    } catch (e) {
        console.error("Error decoding HTML entities for photo reference:", e);
        // Если произошла ошибка, оставляем как есть или сбрасываем
        cleanedRef = ''; 
    }

    // 2. Удаляем все HTML-теги (например, "<span>").
    cleanedRef = cleanedRef.replace(/<[^>]*>?/gm, '');

    // 3. Удаляем любые фигурные скобки и текст внутри них (например, "{photoReference}").
    cleanedRef = cleanedRef.replace(/\{[^}]*\}/g, '');

    // 4. Удаляем лишние пробелы.
    cleanedRef = cleanedRef.trim();

    // 5. Убеждаемся, что после всех очисток осталась непустая строка
    if (cleanedRef.length > 5) { // Проверяем, что длина больше минимальной для reference
        photoReference = cleanedRef;
    }
  }
  
  // **** ОСТАВЬТЕ ЭТУ СТРОКУ РАСКОММЕНТИРОВАННОЙ ****
  console.log("Cleaned photoReference:", photoReference); 

  // Формирование URL изображения
  if (photoReference && GOOGLE_API_KEY) {
    finalImageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
  } else if (hotel.hotel.imageUrl) {
    finalImageUrl = hotel.hotel.imageUrl;
  } else {
    finalImageUrl = defaultPlaceholder;
  }

  const price = hotel.offers[0]?.price.total || 'N/A';
  const currency = hotel.offers[0]?.price.currency || '';

  const displayRating = hotel.hotel.googleRating !== undefined
    ? hotel.hotel.googleRating.toFixed(1) 
    : (hotel.hotel.rating !== undefined ? hotel.hotel.rating.toFixed(1) : 'N/A'); 

  const renderStars = (ratingValue: string | number) => {
    const numericRating = typeof ratingValue === 'string' ? parseFloat(ratingValue) : ratingValue;
    if (!isNaN(numericRating) && numericRating >= 0 && numericRating <= 5) {
      return '⭐'.repeat(Math.floor(numericRating));
    }
    return String(ratingValue); 
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3">
        <img
          src={finalImageUrl} 
          alt={hotel.hotel.name || 'Hotel Image'}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = defaultPlaceholder;
            e.currentTarget.onerror = null; 
          }}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg mb-2">{hotel.hotel.name}</h3>
          <div className="text-sm text-gray-600 mb-2">
            Rating: {displayRating !== 'N/A' ? `${displayRating} ${renderStars(displayRating)}` : 'N/A'}
          </div>
        </div>
        <div className="flex justify-between items-end mt-4">
          <div className="text-xl font-bold text-purple-700">
            Price: {currency} {price}
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            View Deal
          </button>
        </div>
      </div>
    </div>
  );
};