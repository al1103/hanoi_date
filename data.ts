// ============================================
// DATA CONSTANTS - Địa điểm & Món ăn
// ============================================

// --- Types ---
export interface LocationItem {
  id: string;
  name: string;
  emoji: string;
  desc: string;
}

export interface FoodItem {
  id: string;
  name: string;
  imageAlt: string;
  desc: string;
}

// --- Danh sách địa điểm ---
export const LOCATIONS: LocationItem[] = [
  { id: "1", name: "Hồ Gươm", emoji: "⭐", desc: "Check-in trung tâm" },
  { id: "2", name: "Phố cổ Hà Nội", emoji: "🏮", desc: "Dạo phố" },
  { id: "3", name: "West Lake (Hồ Tây)", emoji: "🌅", desc: "Ngắm hoàng hôn" },
  {
    id: "4",
    name: "Lotte Observation Deck",
    emoji: "🏙️",
    desc: "View thành phố",
  },
  { id: "5", name: "Landmark 72 Sky", emoji: "🌆", desc: "View cao tầng" },
  {
    id: "6",
    name: "AEON Mall Hà Đông",
    emoji: "🎡",
    desc: "Vui chơi + ăn uống",
  },
  { id: "7", name: "Royal City", emoji: "⛸️", desc: "Sân trượt băng" },
  { id: "8", name: "Vincom Bà Triệu", emoji: "🍿", desc: "Xem phim" },
  { id: "9", name: "Công Viên Thống Nhất", emoji: "🌳", desc: "Picnic" },
  { id: "10", name: "Long Biên Bridge", emoji: "🌉", desc: "Chụp ảnh" },
  { id: "11", name: "Keangnam Sky Walk", emoji: "👣", desc: "Đi bộ trên kính" },
  { id: "12", name: "Công viên Yên Sở", emoji: "🚴", desc: "Đạp xe" },
];

// --- Danh sách món ăn ---
export const FOODS: FoodItem[] = [
  { id: "f1", name: "Ví dụ 1", imageAlt: "Món ăn 1", desc: "Mô tả món 1" },
  { id: "f2", name: "Ví dụ 2", imageAlt: "Món ăn 2", desc: "Mô tả món 2" },
  { id: "f3", name: "Ví dụ 3", imageAlt: "Món ăn 3", desc: "Mô tả món 3" },
  { id: "f4", name: "Ví dụ 4", imageAlt: "Món ăn 4", desc: "Mô tả món 4" },
  { id: "f5", name: "Ví dụ 5", imageAlt: "Món ăn 5", desc: "Mô tả món 5" },
  { id: "f6", name: "Ví dụ 6", imageAlt: "Món ăn 6", desc: "Mô tả món 6" },
  { id: "f7", name: "Ví dụ 7", imageAlt: "Món ăn 7", desc: "Mô tả món 7" },
  { id: "f8", name: "Ví dụ 8", imageAlt: "Món ăn 8", desc: "Mô tả món 8" },
];
