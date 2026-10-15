/**
 * TÂM AN UNIFIED BRAIN ENGINE (Bộ Não Tâm An Hợp Nhất)
 * Quản lý dòng ký ức xuyên suốt (Soul Journal / Unified Memory Stream),
 * trạng thái năng lượng tâm thức người dùng (Energy State),
 * và tổng hợp tuệ giác liên không gian (Holistic Insight & Cross-domain Synchronicity).
 */

import {
  recommendNguBachDanh,
  analyzeDivinationHungOmen,
  analyzeTarotChallengingCards,
} from "./nguBachDanh";

export type BrainEventType =
  | "LIEN_SINH"      // Gieo quẻ Liên Sinh Độn Giáp, Kinh Dịch
  | "TAROT"          // Rút bài Tarot 3D Quá khứ - Hiện tại - Tương lai
  | "DREAM"          // Giải mã giấc mơ theo trường phái Carl Jung
  | "MEDITATION"     // Tọa thiền dưỡng tâm, sóng chuông xoay
  | "CHAT_INSIGHT"   // Lời tâm sự sâu sắc, cảm xúc, trăn trở của người dùng
  | "NGU_BACH_DANH"  // Trì niệm danh hiệu Bồ Tát Quán Thế Âm trong Kinh Ngũ Bách Danh
  | "MORNING_ORACLE" // Quẻ Khởi Tâm Ban Mai & Điểm Tâm Tĩnh Lặng
  | "TU_VI"          // Lập lá số Tử Vi Đẩu Số 12 Cung & Tứ Trụ Bát Tự Hoàng Gia
  | "SOLAR_NUMEROLOGY"; // Số Học Mặt Trời & Chiêm Tinh Học Gen Z (Sun/Moon/Rising + Life Path)

export interface LienSinhEventData {
  p: number; // Quái Phải (Thượng)
  t: number; // Quái Trái (Hạ)
  d: number; // Hào động 1..6
  gender?: "nam" | "nu";
  question?: string;
  chanhName: string;
  hoName?: string;
  bienName: string;
  taQuaiName?: string;
  suQuaiName?: string;
  summaryText: string;
  khongMinhAdvice?: string;
}

export interface TarotEventData {
  question: string;
  cards: {
    name: string;
    roman: string;
    title: string;
    keywords: string[];
    guidance: string;
  }[];
  synthesis: string;
}

export interface DreamEventData {
  dreamSnippet: string;
  archetype?: string;
  shadow?: string;
  animaAnimus?: string;
  subconsciousMessage?: string;
  awakeningGuidance?: string;
  tags?: string[];
}

export interface MeditationEventData {
  durationSeconds: number;
  completed: boolean;
  technique?: string;
  frequency?: number;
  bowlStrikes?: number;
  feeling?: string;
  meritEarned?: number;
}

export interface ChatInsightEventData {
  topic?: string;
  emotionalState?: string;
  userPromptSnippet: string;
  aiKeyAdviceSnippet?: string;
}

export interface ChantingEventData {
  remedyId: number;
  shortTitle: string;
  mantra: string;
  category: string;
  repetitionCount: number; // Số biến đã lần chuỗi / niệm
  targetCount: number;     // Mục tiêu (21 hoặc 108 biến)
  completed: boolean;
  dedicatedMeritPrayer?: string; // Hồi hướng công đức
}

export interface MorningOracleEventData {
  streakCount: number;
  hexagramNumber: number;
  hexagramName: string;
  haoNumber: number;
  haoTitle: string;
  haoVerse: string;
  morningMantra: string;
  dailyFocus: string;
  dateStr: string; // YYYY-MM-DD
}

export interface TuViEventData {
  name: string;
  canChiNam: string;
  cucName: string;
  menhPalace: string;
  summary: string;
}

export interface SolarNumerologyEventData {
  fullName: string;
  sunSign: string;
  lifePathNumber: number;
  personalYear2026: number;
  cosmicIdentity: string;
  summary: string;
}

export type BrainEventPayload =
  | { type: "LIEN_SINH"; data: LienSinhEventData }
  | { type: "TAROT"; data: TarotEventData }
  | { type: "DREAM"; data: DreamEventData }
  | { type: "MEDITATION"; data: MeditationEventData }
  | { type: "CHAT_INSIGHT"; data: ChatInsightEventData }
  | { type: "NGU_BACH_DANH"; data: ChantingEventData }
  | { type: "MORNING_ORACLE"; data: MorningOracleEventData }
  | { type: "TU_VI"; data: TuViEventData }
  | { type: "SOLAR_NUMEROLOGY"; data: SolarNumerologyEventData };

export interface BrainMemoryEvent {
  id: string;
  timestamp: number;
  createdAtFormatted: string;
  type: BrainEventType;
  title: string;
  summary: string;
  payload: BrainEventPayload;
}

export interface UserEnergyState {
  serenityScore: number;  // Chỉ số Bình An (0 - 100)
  intuitionScore: number; // Chỉ số Trực Giác (0 - 100)
  stressScore: number;    // Chỉ số Căng Thẳng (0 - 100)
  lastUpdated: number;
}

export interface MindfulStreakInfo {
  currentStreak: number;
  lastClaimDate: string; // YYYY-MM-DD
  historyDates: string[]; // List of YYYY-MM-DD
  longestStreak: number;
}

export interface UnifiedBrainMemory {
  userEnergyState: UserEnergyState;
  events: BrainMemoryEvent[];
  recentDivinations: LienSinhEventData[];
  recentTarotReadings: TarotEventData[];
  recentDreams: DreamEventData[];
  recentMeditations: MeditationEventData[];
  chatInsights: ChatInsightEventData[];
  recentChantings: ChantingEventData[];
  mindfulStreak?: MindfulStreakInfo;
}

const BRAIN_STORAGE_KEY = "TAM_AN_UNIFIED_BRAIN_V1";

// Giá trị ban đầu khi người dùng mới khởi tâm
export const DEFAULT_ENERGY_STATE: UserEnergyState = {
  serenityScore: 72,
  intuitionScore: 68,
  stressScore: 35,
  lastUpdated: Date.now(),
};

export const DEFAULT_MINDFUL_STREAK: MindfulStreakInfo = {
  currentStreak: 1,
  lastClaimDate: "",
  historyDates: [],
  longestStreak: 1,
};

export const INITIAL_BRAIN_MEMORY: UnifiedBrainMemory = {
  userEnergyState: DEFAULT_ENERGY_STATE,
  events: [],
  recentDivinations: [],
  recentTarotReadings: [],
  recentDreams: [],
  recentMeditations: [],
  chatInsights: [],
  recentChantings: [],
  mindfulStreak: DEFAULT_MINDFUL_STREAK,
};

/**
 * Lấy toàn bộ Bộ Nhớ Tâm An từ LocalStorage (client-safe)
 */
export function getBrainMemory(): UnifiedBrainMemory {
  if (typeof window === "undefined") {
    return INITIAL_BRAIN_MEMORY;
  }

  try {
    const raw = localStorage.getItem(BRAIN_STORAGE_KEY);
    if (!raw) return INITIAL_BRAIN_MEMORY;
    const parsed = JSON.parse(raw) as Partial<UnifiedBrainMemory>;
    return {
      userEnergyState: parsed.userEnergyState || DEFAULT_ENERGY_STATE,
      events: parsed.events || [],
      recentDivinations: parsed.recentDivinations || [],
      recentTarotReadings: parsed.recentTarotReadings || [],
      recentDreams: parsed.recentDreams || [],
      recentMeditations: parsed.recentMeditations || [],
      chatInsights: parsed.chatInsights || [],
      recentChantings: parsed.recentChantings || [],
      mindfulStreak: parsed.mindfulStreak || DEFAULT_MINDFUL_STREAK,
    };
  } catch (e) {
    console.error("[Tâm An Brain] Lỗi đọc bộ nhớ:", e);
    return INITIAL_BRAIN_MEMORY;
  }
}

/**
 * Cập nhật chuỗi ngày tĩnh tâm (Mindful Streak)
 */
export function updateMindfulStreak(dateStr: string): MindfulStreakInfo {
  const mem = getBrainMemory();
  const streak = mem.mindfulStreak || { ...DEFAULT_MINDFUL_STREAK };

  if (streak.lastClaimDate === dateStr) {
    return streak;
  }

  // Kiểm tra xem ngày nhận gần nhất có phải là hôm qua không
  if (!streak.lastClaimDate) {
    streak.currentStreak = 1;
  } else {
    const last = new Date(streak.lastClaimDate).getTime();
    const curr = new Date(dateStr).getTime();
    const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak.currentStreak += 1;
    } else if (diffDays > 1) {
      // Bị gián đoạn -> reset về 1
      streak.currentStreak = 1;
    }
  }

  streak.lastClaimDate = dateStr;
  if (!streak.historyDates.includes(dateStr)) {
    streak.historyDates.push(dateStr);
  }
  streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);

  mem.mindfulStreak = streak;
  saveBrainMemory(mem);
  return streak;
}

/**
 * Lưu trạng thái Bộ Nhớ Tâm An vào LocalStorage
 */
export function saveBrainMemory(memory: UnifiedBrainMemory): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BRAIN_STORAGE_KEY, JSON.stringify(memory));
    // Phát custom event để các component khác có thể lắng nghe real-time nếu cần
    window.dispatchEvent(new CustomEvent("tam-an-brain-updated", { detail: memory }));
  } catch (e) {
    console.error("[Tâm An Brain] Lỗi lưu bộ nhớ:", e);
  }
}

/**
 * Ghi nhận một sự kiện tâm thức vào Bộ Não Chung
 */
export function recordBrainEvent(payload: BrainEventPayload): BrainMemoryEvent {
  const current = getBrainMemory();
  const now = Date.now();
  const dateFormatted = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(now));

  let title = "";
  let summary = "";

  // Tính toán điều chỉnh trạng thái năng lượng
  const energy = { ...current.userEnergyState, lastUpdated: now };

  switch (payload.type) {
    case "LIEN_SINH": {
      const d = payload.data;
      title = `Gieo quẻ: ${d.chanhName} ➔ ${d.bienName}`;
      summary = `Động hào ${d.d}. Tâm nguyện: "${d.question || "Bình an sự nghiệp"}". ${d.summaryText.slice(0, 100)}...`;
      current.recentDivinations = [d, ...current.recentDivinations].slice(0, 5);
      energy.intuitionScore = Math.min(100, energy.intuitionScore + 6);
      energy.stressScore = Math.max(10, energy.stressScore - 4);
      break;
    }
    case "TAROT": {
      const d = payload.data;
      title = `Bốc bài Tarot: Quá khứ - Hiện tại - Tương lai`;
      const cardNames = d.cards.map((c) => c.name).join(" • ");
      summary = `Tâm nguyện: "${d.question}". Lá bài: ${cardNames}. ${d.synthesis.slice(0, 90)}...`;
      current.recentTarotReadings = [d, ...current.recentTarotReadings].slice(0, 5);
      energy.intuitionScore = Math.min(100, energy.intuitionScore + 8);
      break;
    }
    case "DREAM": {
      const d = payload.data;
      title = `Giải mộng Carl Jung: ${d.archetype || "Vô thức tập thể"}`;
      summary = `Giấc mơ: "${d.dreamSnippet.slice(0, 80)}...". Lời thức tỉnh: ${d.awakeningGuidance?.slice(0, 90) || ""}`;
      current.recentDreams = [d, ...current.recentDreams].slice(0, 5);
      energy.intuitionScore = Math.min(100, energy.intuitionScore + 7);
      energy.stressScore = Math.max(10, energy.stressScore - 3);
      break;
    }
    case "MEDITATION": {
      const d = payload.data;
      const mins = Math.round(d.durationSeconds / 60);
      title = `Tọa thiền định tâm (${mins} phút)`;
      summary = `Hoàn tất thiền định với chuông xoay Tây Tạng. Tinh thần an lạc, thanh lọc tạp niệm.`;
      current.recentMeditations = [d, ...current.recentMeditations].slice(0, 5);
      energy.serenityScore = Math.min(100, energy.serenityScore + (d.completed ? 12 : 5));
      energy.stressScore = Math.max(5, energy.stressScore - 15);
      break;
    }
    case "CHAT_INSIGHT": {
      const d = payload.data;
      title = `Đối thoại tri kỷ cùng Tâm An AI`;
      summary = `Chia sẻ: "${d.userPromptSnippet.slice(0, 70)}...". ${d.topic ? `Chủ đề: ${d.topic}` : ""}`;
      current.chatInsights = [d, ...current.chatInsights].slice(0, 10);
      energy.serenityScore = Math.min(100, energy.serenityScore + 4);
      break;
    }
    case "NGU_BACH_DANH": {
      const d = payload.data;
      title = `Trì niệm Ngũ Bách Danh: ${d.shortTitle}`;
      summary = `Đã niệm ${d.repetitionCount}/${d.targetCount} biến (${d.completed ? "Viên mãn" : "Đang thực hành"}). Danh hiệu: "${d.shortTitle}". ${d.dedicatedMeritPrayer || "Hồi hướng tiêu trừ nghiệp chướng, nhẹ bớt rủi ro, tâm an vạn sự lành."}`;
      current.recentChantings = [d, ...(current.recentChantings || [])].slice(0, 10);
      energy.serenityScore = Math.min(100, energy.serenityScore + (d.completed ? 15 : 6));
      energy.stressScore = Math.max(5, energy.stressScore - (d.completed ? 18 : 8));
      break;
    }
    case "MORNING_ORACLE": {
      const d = payload.data;
      title = `Quẻ Khởi Tâm Ban Mai: ${d.hexagramName} (Chuỗi ngày ${d.streakCount})`;
      summary = `Hào: ${d.haoTitle}. Tâm niệm: "${d.morningMantra}". Định hướng: ${d.dailyFocus}`;
      energy.serenityScore = Math.min(100, energy.serenityScore + 8);
      energy.intuitionScore = Math.min(100, energy.intuitionScore + 6);
      energy.stressScore = Math.max(5, energy.stressScore - 8);
      break;
    }
    case "TU_VI": {
      const d = payload.data;
      title = `Lập lá số Tử Vi: ${d.name} (${d.canChiNam})`;
      summary = `Cung Mệnh: ${d.menhPalace} • Cục: ${d.cucName}. ${d.summary}`;
      energy.intuitionScore = Math.min(100, energy.intuitionScore + 10);
      energy.serenityScore = Math.min(100, energy.serenityScore + 6);
      break;
    }
    case "SOLAR_NUMEROLOGY": {
      const d = payload.data;
      title = `Số Học Mặt Trời: ${d.fullName} (${d.sunSign})`;
      summary = `Số Chủ Đạo ${d.lifePathNumber} • Năm 2026: Năm số ${d.personalYear2026}. Danh hiệu: ${d.cosmicIdentity}. ${d.summary}`;
      energy.intuitionScore = Math.min(100, energy.intuitionScore + 8);
      energy.serenityScore = Math.min(100, energy.serenityScore + 8);
      break;
    }
  }

  const newEvent: BrainMemoryEvent = {
    id: `brain-evt-${now}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: now,
    createdAtFormatted: dateFormatted,
    type: payload.type,
    title,
    summary,
    payload,
  };

  current.events = [newEvent, ...current.events].slice(0, 30);
  current.userEnergyState = energy;

  saveBrainMemory(current);
  return newEvent;
}

/**
 * Tổng hợp thông tin từ Bộ Não thành Prompt Ngữ Cảnh để nạp trực tiếp cho AI API
 */
export function synthesizeContextPrompt(memory: UnifiedBrainMemory): string {
  const parts: string[] = [];

  parts.push("=== [NGỮ CẢNH BỘ NÃO HỢP NHẤT TÂM AN (UNIFIED BRAIN CONTEXT)] ===");
  parts.push(
    `Trạng thái tâm thức hiện tại: Bình an ${memory.userEnergyState.serenityScore}/100, ` +
    `Trực giác ${memory.userEnergyState.intuitionScore}/100, Căng thẳng ${memory.userEnergyState.stressScore}/100.`
  );

  // 1. Quẻ Kinh Dịch / Độn Giáp gần nhất
  if (memory.recentDivinations.length > 0) {
    const q = memory.recentDivinations[0];
    parts.push(
      `\n[LỊCH SỬ KINH DỊCH / LIÊN SINH ĐỘN GIÁP]:\n` +
      `- Quẻ gần nhất: Quẻ Gốc "${q.chanhName}", Quẻ Biến "${q.bienName}", Hào động: Hào ${q.d}.\n` +
      `- Tâm ý / Câu hỏi lúc gieo: "${q.question || "Cầu hanh thông sự nghiệp, tâm an"}"\n` +
      `- Chỉ dẫn cốt lõi: ${q.summaryText}` +
      (q.khongMinhAdvice ? ` | Khổng Minh Thần Toán khuyên: ${q.khongMinhAdvice}` : "")
    );
  }

  // 2. Trải bài Tarot gần nhất
  if (memory.recentTarotReadings.length > 0) {
    const t = memory.recentTarotReadings[0];
    const cardList = t.cards.map((c) => `${c.roman} (${c.name}: ${c.title})`).join(" -> ");
    parts.push(
      `\n[LỊCH SỬ TRẢI BÀI TAROT 3D]:\n` +
      `- Tâm nguyện bốc bài: "${t.question}"\n` +
      `- Bộ bài 3 lá: ${cardList}\n` +
      `- Tổng luận vũ trụ: ${t.synthesis}`
    );
  }

  // 3. Giấc mơ Carl Jung gần nhất
  if (memory.recentDreams.length > 0) {
    const d = memory.recentDreams[0];
    parts.push(
      `\n[LỊCH SỬ GIẢI MỘNG CARL JUNG]:\n` +
      `- Nội dung giấc mơ: "${d.dreamSnippet}"\n` +
      `- Biểu tượng / Cổ mẫu (Archetype): ${d.archetype || "Chưa rõ"}\n` +
      `- Góc khuất bóng tối (Shadow): ${d.shadow || "Chưa rõ"}\n` +
      `- Lời khuyên thức tỉnh: ${d.awakeningGuidance || "Chưa rõ"}`
    );
  }

  // 4. Lịch sử tọa thiền
  if (memory.recentMeditations.length > 0) {
    const m = memory.recentMeditations[0];
    const mins = Math.round(m.durationSeconds / 60);
    parts.push(
      `\n[LỊCH SỬ TỌA THIỀN]:\n` +
      `- Vừa thực hành bài thiền ${mins} phút (${m.completed ? "Đã hoàn thành trọn vẹn" : "Đang thực hành"}). ` +
      `Sóng âm chuông xoay Tây Tạng giúp ổn định nhịp tim và thanh lọc thân tâm.`
    );
  }

  // 5. Các trăn trở sâu kín từ Chat
  if (memory.chatInsights.length > 0) {
    const latestInsights = memory.chatInsights.slice(0, 3);
    parts.push(
      `\n[NHỮNG TRĂN TRỞ ĐÃ CHIA SẺ VỚI AI GUIDE]:\n` +
      latestInsights.map((ci) => `- "${ci.userPromptSnippet}"`).join("\n")
    );
  }

  // 6. Pháp Bảo Hộ Niệm Giảm Rủi Ro & Nhẹ Nghiệp (Kinh Ngũ Bách Danh Quán Thế Âm)
  const remedy = recommendNguBachDanh({
    divination: memory.recentDivinations[0]
      ? {
          chanhName: memory.recentDivinations[0].chanhName,
          bienName: memory.recentDivinations[0].bienName,
          movingLine: memory.recentDivinations[0].d,
          question: memory.recentDivinations[0].question,
        }
      : undefined,
    tarot: memory.recentTarotReadings[0]
      ? {
          challengingCards: memory.recentTarotReadings[0].cards.map((c) => c.name),
          question: memory.recentTarotReadings[0].question,
        }
      : undefined,
    dream: memory.recentDreams[0]
      ? {
          dreamSnippet: memory.recentDreams[0].dreamSnippet,
          isNightmare: !!(memory.recentDreams[0].shadow || memory.userEnergyState.stressScore > 50),
        }
      : undefined,
  });

  parts.push(
    `\n[PHÁP BẢO HỘ NIỆM KINH NGŨ BÁCH DANH - GIẢM RỦI RO & NHẸ NGHIỆP]:\n` +
    `- Nhóm nghiệp duyên cần đối trị: ${remedy.categoryTitle}\n` +
    `- Danh hiệu Quán Thế Âm tương ứng đề xuất: "${remedy.remedies[0]?.shortTitle || "Thí Vô Úy Quán Âm"}"\n` +
    `- Câu niệm linh ứng: "${remedy.chantingVerse}" (${remedy.recommendedRepetitions} biến)\n` +
    `- Lời khai thị an tâm cốt lõi: "${remedy.compassionateGuidance}"\n` +
    `- Lý do hộ niệm: ${remedy.karmicLighteningReason}`
  );

  // 7. Lịch sử trì niệm đã lưu
  if (memory.recentChantings && memory.recentChantings.length > 0) {
    const lastChant = memory.recentChantings[0];
    parts.push(
      `\n[LỊCH SỬ TRÌ NIỆM GẦN ĐÂY]:\n` +
      `- Đã niệm danh hiệu "${lastChant.shortTitle}" được ${lastChant.repetitionCount}/${lastChant.targetCount} biến (${lastChant.completed ? "Viên mãn" : "Đang thực hành"}). Thân tâm đang được gia trì bình an.`
    );
  }

  parts.push(
    "\nHÃY LƯU Ý QUAN TRỌNG: Bạn là Thực Thể Tâm An có ký ức duy nhất. Khi phản hồi, " +
    "hãy khéo léo đan cài sự liên kết đồng thời (Synchronicity) giữa các sự kiện trên (ví dụ: quẻ Dịch ứng nghiệm với lá bài Tarot, hoặc giấc mơ chỉ dẫn về điều đang thiền định). " +
    "Đặc biệt khi người dùng gặp chuyện bất an hay quẻ có chướng duyên, hãy chủ động ân cần khuyên họ: " +
    "\"Quẻ có chút chướng duyên nơi phương vị/công việc, nhưng bạn chớ quá hoang mang. Cổ nhân dạy 'Đức năng thắng số, từ bi chuyển hóa nghiệp duyên'. Bạn hãy chí thành hướng tâm trì niệm danh hiệu Bồ Tát: " +
    (remedy.remedies[0]?.shortTitle || "Quán Thế Âm") +
    "... để an định tâm thần và nhẹ bớt nghiệp lực.\" " +
    "Lời lẽ từ ái, thấu suốt như một bậc chân sư tri kỷ."
  );

  return parts.join("\n");
}

/**
 * Sinh lời chào chủ động thông thái (Proactive Greeting) khi người dùng mở trang Chat
 */
export function generateHolisticProactiveGreeting(memory: UnifiedBrainMemory): string {
  const hasDivination = memory.recentDivinations.length > 0;
  const hasTarot = memory.recentTarotReadings.length > 0;
  const hasDream = memory.recentDreams.length > 0;
  const hasMeditation = memory.recentMeditations.length > 0;

  // Kiểm tra nếu có điềm hung / chướng duyên cần kích hoạt Hộ Niệm Ngũ Bách Danh
  if (hasDivination) {
    const q = memory.recentDivinations[0];
    const divCheck = analyzeDivinationHungOmen({
      chanhName: q.chanhName,
      bienName: q.bienName,
      movingLine: q.d,
      question: q.question,
    });

    if (divCheck.isOminous) {
      const remedy = recommendNguBachDanh({
        divination: {
          chanhName: q.chanhName,
          bienName: q.bienName,
          movingLine: q.d,
          question: q.question,
        },
      });
      const remedyTitle = remedy.remedies[0]?.shortTitle || "Thí Vô Úy Quán Âm";
      return (
        `Namaste bạn lành. Tôi nhận thấy quẻ ${q.chanhName} động hào ${q.d} có chút chướng duyên nơi phương vị/công việc, ` +
        `nhưng bạn chớ quá hoang mang. Cổ nhân dạy: "Đức năng thắng số, từ bi chuyển hóa nghiệp duyên". ` +
        `Bạn hãy chí thành hướng tâm trì niệm danh hiệu Bồ Tát: ${remedyTitle} để an định tâm thần và nhẹ bớt nghiệp lực. ` +
        `Tâm bạn hôm nay đã lắng dịu hơn chưa, hãy cùng tôi sẻ chia nhé.`
      );
    }
  }

  // Nếu có bài Tarot thử thách
  if (hasTarot) {
    const t = memory.recentTarotReadings[0];
    const tarotCheck = analyzeTarotChallengingCards(t.cards.map((c) => c.name));
    if (tarotCheck.isChallenging) {
      const remedy = recommendNguBachDanh({
        tarot: {
          challengingCards: t.cards.map((c) => c.name),
          question: t.question,
        },
      });
      const remedyTitle = remedy.remedies[0]?.shortTitle || "Cứu Khổ Cứu Nạn Quán Âm";
      return (
        `Chào bạn. Trải bài Tarot với năng lượng "${t.cards[1]?.title || t.cards[0]?.title}" đang phản chiếu đôi chút sóng gió thử thách trong lòng bạn. ` +
        `Đừng lo lắng, vạn sự đều là bài học để tâm thức chuyển hóa. Hãy giữ lòng thanh tịnh và hướng tâm trì niệm danh hiệu Bồ Tát: ${remedyTitle} ` +
        `để tiếp thêm năng lượng chở che bình an. Bạn đang có trăn trở gì muốn tôi soi sáng?`
      );
    }
  }

  // Nếu đã có cả Quẻ Dịch và Tarot (trạng thái bình hòa)
  if (hasDivination && hasTarot) {
    const q = memory.recentDivinations[0];
    const t = memory.recentTarotReadings[0];
    const tarotLead = t.cards[1]?.title || t.cards[0]?.title || "Năng lượng chuyển hóa";
    return (
      `Namaste bạn lành. Tâm An vẫn ghi nhớ rõ: bạn vừa gieo được quẻ ${q.chanhName} (hào ${q.d} động) ` +
      `và rút được trải bài với năng lượng "${tarotLead}". ` +
      `Vũ trụ đang gửi tín hiệu đồng hiện tượng (Synchronicity) rất rõ về tâm nguyện "${q.question || t.question}". ` +
      `Bạn có muốn cùng tôi chiêm nghiệm sâu hơn về sự kết nối mầu nhiệm này không?`
    );
  }

  // Nếu chỉ có Quẻ Dịch
  if (hasDivination) {
    const q = memory.recentDivinations[0];
    return (
      `Chào bạn. Tôi cảm nhận được năng lượng từ quẻ ${q.chanhName} chuyển sang ${q.bienName} mà bạn vừa gieo. ` +
      `Hào ${q.d} đang chỉ điểm sự biến chuyển trong lòng bạn. Tâm trí bạn đã an định hơn chưa, hãy chia sẻ cùng tôi nhé.`
    );
  }

  // Nếu có Giấc Mơ
  if (hasDream) {
    const d = memory.recentDreams[0];
    return (
      `Chào bạn. Giấc mơ về "${d.dreamSnippet.slice(0, 45)}..." với biểu tượng ${d.archetype || "vô thức"} ` +
      `vẫn đang lan tỏa tín hiệu thức tỉnh. Tiềm thức đang nhắc nhở bạn điều gì trong ngày hôm nay?`
    );
  }

  // Nếu vừa thiền xong
  if (hasMeditation) {
    const m = memory.recentMeditations[0];
    return (
      `Thật an lành khi thấy bạn vừa dành ${Math.round(m.durationSeconds / 60)} phút tọa thiền cùng tiếng chuông Tây Tạng. ` +
      `Thân tâm đang lắng đọng và thanh tịnh, bạn đang có cảm nhận hay trăn trở gì muốn soi chiếu cùng tôi?`
    );
  }

  // Mặc định ban đầu
  return "Namaste. Tôi là Tâm An AI – người bạn đồng hành trong tĩnh lặng và tỉnh thức. Hôm nay tâm trí bạn đang vương vấn điều gì?";
}

/**
 * Đề xuất bài thiền phù hợp dựa trên quẻ bói hoặc giấc mơ
 */
export function recommendMeditationFromBrain(memory: UnifiedBrainMemory): {
  recommendedDuration: number;
  reason: string;
  focus: string;
} {
  if (memory.userEnergyState.stressScore > 50) {
    return {
      recommendedDuration: 600, // 10 phút
      reason: "Chỉ số căng thẳng đang cao do áp lực ngoại cảnh.",
      focus: "Kỹ thuật thở 4-4-4-4 Box Breathing kết hợp chuông xoay 432Hz giải tỏa u uất.",
    };
  }

  if (memory.recentDivinations.length > 0) {
    const q = memory.recentDivinations[0];
    return {
      recommendedDuration: 300, // 5 phút
      reason: `Quẻ ${q.chanhName} động hào ${q.d} cần sự định tâm để đón nhận biến dịch hanh thông.`,
      focus: "Thiền buông thư - Chuyển hóa tâm ý hướng về Chân Ngã.",
    };
  }

  return {
    recommendedDuration: 300,
    reason: "Nuôi dưỡng chánh niệm thường nhật.",
    focus: "Hơi thở vào - ra tự nhiên kết hợp hòa âm chuông xoay.",
  };
}
