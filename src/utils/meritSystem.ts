/**
 * Hệ Thống Tích Lũy Công Đức & Tuệ Căn (Merit & Spiritual Karma System)
 * Tích lũy điểm phước báu khi gieo quẻ, lần chuỗi 108 hạt, ngồi thiền, giải mộng, chia sẻ thiệp.
 * Lưu trữ bền vững trong LocalStorage và đồng bộ vào Unified Brain.
 */

export interface MeritLog {
  id: string;
  action: "DIVINATION" | "BEAD_COUNT" | "MEDITATION" | "DREAM_JOURNAL" | "CARD_SHARE" | "MORNING_ORACLE";
  title: string;
  meritPoints: number; // Điểm công đức
  timestamp: number;
}

export interface UserMeritProfile {
  totalMerit: number; // Tổng điểm công đức
  spiritualTier: string; // Phẩm cấp tuệ căn
  tierDescription: string;
  completedChantsCount: number; // Số lần hoàn thành chuỗi 108 hạt
  meditationMinutes: number; // Số phút tọa thiền tích lũy
  divinationCount: number; // Số lần gieo quẻ
  dailyStreak: number; // Số ngày tinh tấn liên tục
  lastActiveDate: string; // YYYY-MM-DD
  logs: MeritLog[];
}

const STORAGE_KEY = "tam_an_user_merit_profile_v1";

const MERIT_TIERS = [
  { min: 0, max: 99, tier: "Sơ Khai Định Tâm", desc: "Hạt mầm Bồ Đề vừa ươm nở, bắt đầu bước vào cõi thanh tịnh." },
  { min: 100, max: 299, tier: "Tinh Tấn An Trú", desc: "Tâm dần lắng đọng, từng bước chuyển hóa nghiệp duyên thành phước quả." },
  { min: 300, max: 699, tier: "Tuệ Căn Khai Mở", desc: "Trực giác linh thông, hòa quyện thời vận và đức hạnh cao đẹp." },
  { min: 700, max: 1499, tier: "Viên Dung Tự Tại", desc: "Tâm bình khí hòa, vạn sự hanh thông, công đức thù thắng." },
  { min: 1500, max: Infinity, tier: "Vô Vi Đại Giác", desc: "Đạt cảnh giới quang minh bất động, phước đức vô lượng bao bọc bản thân và gia đạo." },
];

export function getMeritProfile(): UserMeritProfile {
  if (typeof window === "undefined") {
    return createDefaultProfile();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultProfile();
    const data = JSON.parse(raw) as UserMeritProfile;
    // Cập nhật lại danh hiệu theo điểm số
    const currentTier = getTierByPoints(data.totalMerit);
    return {
      ...data,
      spiritualTier: currentTier.tier,
      tierDescription: currentTier.desc,
    };
  } catch (err) {
    console.error("Lỗi đọc Merit Profile:", err);
    return createDefaultProfile();
  }
}

function createDefaultProfile(): UserMeritProfile {
  return {
    totalMerit: 50, // Khởi duyên tặng 50 điểm phước lành ban đầu
    spiritualTier: "Sơ Khai Định Tâm",
    tierDescription: "Hạt mầm Bồ Đề vừa ươm nở, bắt đầu bước vào cõi thanh tịnh.",
    completedChantsCount: 0,
    meditationMinutes: 0,
    divinationCount: 0,
    dailyStreak: 1,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    logs: [
      {
        id: "init_merit",
        action: "DIVINATION",
        title: "Duyên khởi đầu tiên gia nhập Tâm An Đạo Tràng",
        meritPoints: 50,
        timestamp: Date.now(),
      },
    ],
  };
}

function getTierByPoints(points: number) {
  return MERIT_TIERS.find((t) => points >= t.min && points <= t.max) || MERIT_TIERS[0];
}

/**
 * Tích lũy công đức cho hành vi của người dùng
 */
export function addMeritPoints(
  action: MeritLog["action"],
  title: string,
  points: number,
  extraMeta?: { chantCompleted?: boolean; meditationSecs?: number; isDivination?: boolean }
): UserMeritProfile {
  if (typeof window === "undefined") return createDefaultProfile();

  const profile = getMeritProfile();
  const todayStr = new Date().toISOString().slice(0, 10);

  // Tính daily streak
  let newStreak = profile.dailyStreak;
  if (profile.lastActiveDate !== todayStr) {
    const lastDate = new Date(profile.lastActiveDate);
    const currentDate = new Date(todayStr);
    const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  }

  const newTotal = profile.totalMerit + points;
  const newTierInfo = getTierByPoints(newTotal);

  const newLog: MeritLog = {
    id: `merit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    action,
    title,
    meritPoints: points,
    timestamp: Date.now(),
  };

  const updatedProfile: UserMeritProfile = {
    ...profile,
    totalMerit: newTotal,
    spiritualTier: newTierInfo.tier,
    tierDescription: newTierInfo.desc,
    completedChantsCount: profile.completedChantsCount + (extraMeta?.chantCompleted ? 1 : 0),
    meditationMinutes: profile.meditationMinutes + Math.round((extraMeta?.meditationSecs || 0) / 60),
    divinationCount: profile.divinationCount + (extraMeta?.isDivination ? 1 : 0),
    dailyStreak: newStreak,
    lastActiveDate: todayStr,
    logs: [newLog, ...profile.logs.slice(0, 39)], // Giữ 40 log gần nhất
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    // Dispatch custom event để UI lắng nghe re-render tức thì
    window.dispatchEvent(new CustomEvent("merit-profile-updated", { detail: updatedProfile }));
  } catch (err) {
    console.error("Lỗi lưu Merit Profile:", err);
  }

  return updatedProfile;
}
