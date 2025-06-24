import type { RoomConfig } from "@/types/hotel/hotel-search.type";

export function formatRoomSummary(rooms: RoomConfig[]): string {
  const totalAdults = rooms.reduce((sum, r) => sum + r.adults, 0);
  const totalChildren = rooms.reduce((sum, r) => sum + r.children, 0);
  const roomCount = rooms.length;

  let text = `${totalAdults} guest${totalAdults > 1 ? "s" : ""}`;
  if (totalChildren > 0) {
    text += `, ${totalChildren} child${totalChildren > 1 ? "ren" : ""}`;
  }
  text += `, ${roomCount} room${roomCount > 1 ? "s" : ""}`;

  return text;
}
