/**
 * TÂM AN TAROT ENGINE (Động Cơ Bói Toán & Chiêm Bốc Đa Chiều)
 * - Xáo bài Cryptographic Random (Fisher-Yates Shuffle bằng crypto.getRandomValues)
 * - Xác suất ngẫu nhiên Trạng thái Xuôi / Ngược (Upright / Reversed)
 * - 4 Phương Pháp Trải Bài Huyền Học:
 *   1. 'single': 1 Lá Khởi Tâm (Daily Oracle / Yes-No)
 *   2. 'three_time': 3 Lá Thời Không (Quá khứ - Hiện tại - Tương lai)
 *   3. 'three_body_mind': 3 Lá Thân - Tâm - Trí (Khám phá chiều sâu nội tại)
 *   4. 'celtic_cross_5': 5 Lá Thập Tự Trực Giác (Hiện trạng, Trở ngại, Cội rễ, Xu hướng, Đốn ngộ)
 * - Tích hợp Dữ liệu Tâm Linh Bản Mệnh (Năm sinh Can Chi, Cung hoàng đạo, Tên người xem)
 * - Tự động đối soát lá thử thách để đề xuất Danh Hiệu Quán Âm (Kinh Ngũ Bách Danh)
 */

import { TAROT_78_CARDS, TarotCardDefinition } from "@/data/tarot78Cards";
import { recommendNguBachDanh, NguBachDanhRecommendation } from "./nguBachDanh";

export type SpreadType = "single" | "three_time" | "three_body_mind" | "celtic_cross_5";

export interface SpreadPositionConfig {
  id: string;
  index: number;
  label: string; // Tên vị trí: Quá Khứ, Hiện Tại, Trở Ngại, Thân, Tâm, Trí...
  description: string;
}

export const SPREAD_CONFIGS: Record<
  SpreadType,
  {
    name: string;
    subName: string;
    description: string;
    cardCount: number;
    positions: SpreadPositionConfig[];
  }
> = {
  single: {
    name: "Trải 1 Lá Khởi Tâm",
    subName: "Daily Oracle & Direct Guidance",
    description: "Nhận thông điệp định hướng tức thời, câu trả lời trực diện Yes/No/Maybe từ vũ trụ cho ngày hôm nay.",
    cardCount: 1,
    positions: [
      {
        id: "oracle",
        index: 0,
        label: "Thông Điệp Khởi Tâm",
        description: "Tia sáng soi đường và bài học cốt tủy vũ trụ gửi đến bạn ngay trong sát na này.",
      },
    ],
  },
  three_time: {
    name: "Trải 3 Lá Thời Không",
    subName: "Past • Present • Future",
    description: "Quan sát dòng chảy thời gian, cội rễ quá khứ, năng lượng hiện tại và xu hướng chuyển dịch tương lai.",
    cardCount: 3,
    positions: [
      {
        id: "past",
        index: 0,
        label: "Quá Khứ",
        description: "Cội rễ nguyên nhân, hạt giống nghiệp duyên và bài học kinh nghiệm đã trải qua.",
      },
      {
        id: "present",
        index: 1,
        label: "Hiện Tại",
        description: "Thực tại đang diễn ra, nguồn lực sẵn có và thử thách tức thời bạn đang đối mặt.",
      },
      {
        id: "future",
        index: 2,
        label: "Tương Lai",
        description: "Xu hướng vận động tất yếu, kết quả đơm hoa kết trái nếu giữ vững quỹ đạo hiện tại.",
      },
    ],
  },
  three_body_mind: {
    name: "Trải 3 Lá Thân - Tâm - Trí",
    subName: "Body • Mind • Spirit",
    description: "Khám phá chiều sâu nội tại: Sức khỏe thể xác, dòng chảy cảm xúc và tầng giác ngộ tâm linh.",
    cardCount: 3,
    positions: [
      {
        id: "body",
        index: 0,
        label: "Thân (Body)",
        description: "Năng lượng sinh học, sức khỏe thể chất, môi trường sống và tài chính vật chất cụ thể.",
      },
      {
        id: "mind",
        index: 1,
        label: "Tâm (Mind)",
        description: "Dòng chảy cảm xúc, niềm tin ẩn sâu, các mối quan hệ tình cảm và trăn trở nội tâm.",
      },
      {
        id: "spirit",
        index: 2,
        label: "Trí (Spirit)",
        description: "Tuệ giác cao nhất, sứ mệnh linh hồn và lời khai thị từ trực giác Chân Ngã.",
      },
    ],
  },
  celtic_cross_5: {
    name: "Trải 5 Lá Thập Tự Trực Giác",
    subName: "Intuitive Cross Spread",
    description: "Mô hình thập tự huyền bí soi thấu mọi ngóc ngách: Hiện trạng, Trở ngại, Cội rễ, Xu hướng và Đốn ngộ tối hậu.",
    cardCount: 5,
    positions: [
      {
        id: "center_present",
        index: 0,
        label: "Hiện Trạng Trọng Tâm",
        description: "Năng lượng trung tâm cốt lõi bao trùm toàn bộ vấn đề của bạn lúc này.",
      },
      {
        id: "cross_challenge",
        index: 1,
        label: "Trở Ngại & Thách Thức",
        description: "Năng lượng cản trở ngang qua, nút thắt hoặc bài học nghịch cảnh cần vượt qua.",
      },
      {
        id: "root_past",
        index: 2,
        label: "Cội Rễ Nền Tảng",
        description: "Nguồn gốc tiềm thức sâu xa hình thành nên tình huống hiện tại.",
      },
      {
        id: "crown_trend",
        index: 3,
        label: "Xu Hướng Vận Động",
        description: "Năng lượng tiềm năng sắp hiển lộ trong thời gian ngắn sắp tới.",
      },
      {
        id: "outcome_awakening",
        index: 4,
        label: "Kết Quả Đốn Ngộ",
        description: "Điểm đến tối hậu và bài học thức tỉnh tâm linh khi bạn vượt qua trở ngại.",
      },
    ],
  },
};

export interface DrawnCardResult {
  card: TarotCardDefinition;
  isReversed: boolean;
  position: SpreadPositionConfig;
  keywords: string[];
  meaning: string;
  aspectAdvice: {
    career: string;
    love: string;
    healthSpirit: string;
    dharmaAdvice: string;
  };
  healingInsight: string; // Lăng kính chữa lành nội tâm & giải tỏa nỗi niềm
  shadowWork: string;     // Đối diện với bóng tối vô thức để chuyển hóa
  foolsJourneyStage: {
    stageLevel: "Ý Thức Xã Hội (Conscious)" | "Tiềm Thức & Nội Tâm (Subconscious)" | "Siêu Thức & Giác Ngộ (Superconscious)" | "Ngũ Đại Thực Tại (Minor Arcana)";
    archetypalLesson: string;
    kabbalahTreePath: string;
  };
  personalizedQuestionReading: string;
}

export interface TarotSpreadReadingResult {
  spreadType: SpreadType;
  spreadTitle: string;
  timestamp: number;
  userQuestion: string;
  userProfile?: {
    name?: string;
    birthYear?: number;
    canChi?: string;
    zodiac?: string;
  };
  drawnCards: DrawnCardResult[];
  overallSynthesis: string;
  spiritualRemedy?: NguBachDanhRecommendation;
  luckyAffirmation: string;
  energyScore: number; // 0..100
}

/**
 * Tính Can Chi từ năm sinh Dương lịch
 */
export function calculateCanChi(year: number): string {
  const CAN = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
  const CHI = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
  const can = CAN[year % 10];
  const chi = CHI[year % 12];
  return `${can} ${chi}`;
}

/**
 * Cryptographically Secure Fisher-Yates Shuffle
 */
export function secureShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    let rand = 0;
    if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
      const buf = new Uint32Array(1);
      window.crypto.getRandomValues(buf);
      rand = buf[0] / (0xffffffff + 1);
    } else {
      rand = Math.random();
    }
    const j = Math.floor(rand * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Tạo ngẫu nhiên trạng thái Xuôi/Ngược với entropy bảo mật
 * Mặc định tỉ lệ xuôi ~68%, ngược ~32% phản ánh đúng năng lượng tự nhiên của Tarot RWS
 */
export function getRandomOrientation(): boolean {
  let rand = 0;
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const buf = new Uint8Array(1);
    window.crypto.getRandomValues(buf);
    rand = buf[0] / 256;
  } else {
    rand = Math.random();
  }
  return rand > 0.68; // true = Reversed (Ngược), false = Upright (Xuôi)
}

/**
 * Luận giải chi tiết cá nhân hóa theo câu hỏi và thông tin bản mệnh
 */
function generatePersonalizedCardReading(
  card: TarotCardDefinition,
  isReversed: boolean,
  position: SpreadPositionConfig,
  question: string,
  userProfile?: { name?: string; canChi?: string; zodiac?: string }
): string {
  const cardState = isReversed ? "ở trạng thái Ngược (Reversed)" : "ở trạng thái Xuôi (Upright)";
  const qClean = question.trim() || "Khai mở tuệ giác và bình an trên đường đời";
  const userName = userProfile?.name ? `bạn ${userProfile.name}` : "bạn";
  const destinyInfo = userProfile?.canChi ? ` (Bản mệnh ${userProfile.canChi})` : "";

  const mainMeaning = isReversed ? card.reversedMeaning : card.uprightMeaning;
  const dharmaGuidance = isReversed
    ? card.aspects.dharmaAdvice.reversed
    : card.aspects.dharmaAdvice.upright;

  let posContext = "";
  if (position.id === "past" || position.id === "root_past") {
    posContext = `Nơi vị trí ${position.label}: Những trải nghiệm dĩ vãng đã tích lũy năng lượng này`;
  } else if (position.id === "present" || position.id === "center_present" || position.id === "oracle") {
    posContext = `Nơi vị trí ${position.label}: Năng lượng này đang trực tiếp tác động đến thực tại của ${userName}`;
  } else if (position.id === "future" || position.id === "outcome_awakening" || position.id === "crown_trend") {
    posContext = `Nơi vị trí ${position.label}: Dòng thời gian đang mở ra hướng chuyển dịch này`;
  } else if (position.id === "body") {
    posContext = `Nơi chiều kích Thân (Thể chất & Vật chất): Năng lượng này phản ánh tình trạng sinh lực và nguồn lực thực tế`;
  } else if (position.id === "mind") {
    posContext = `Nơi chiều kích Tâm (Cảm xúc & Niềm tin): Lá bài soi rọi những xúc cảm và niềm tin sâu thẳm`;
  } else if (position.id === "spirit") {
    posContext = `Nơi chiều kích Trí (Tuệ giác & Linh hồn): Thông điệp giác ngộ tối cao nhắc nhở`;
  } else if (position.id === "cross_challenge") {
    posContext = `Nơi vị trí Trở Ngại (Thử thách): Năng lượng này đang là bài kiểm tra định lực`;
  }

  return `${posContext}${destinyInfo}. Soi chiếu theo tâm nguyện "${qClean}": Lá bài ${card.nameVi} (${card.nameEn}) xuất hiện ${cardState}. ${mainMeaning} Lời khai thị riêng dành cho bạn: ${dharmaGuidance}`;
}

/**
 * Tổng luận toàn quẻ bài Tarot Tâm An
 */
function generateOverallSpreadSynthesis(
  cards: DrawnCardResult[],
  spreadType: SpreadType,
  question: string,
  userProfile?: { name?: string; canChi?: string; zodiac?: string }
): string {
  const qClean = question.trim() || "Khai mở tuệ giác và bình an trên đường đời";
  const userName = userProfile?.name ? `bạn ${userProfile.name}` : "bạn";
  const destinyTag = userProfile?.canChi ? ` (tuổi ${userProfile.canChi})` : "";

  const cardNames = cards.map((c) => `${c.card.nameVi} (${c.isReversed ? "Ngược" : "Xuôi"})`).join(" ➔ ");

  const challengingCount = cards.filter(
    (c) =>
      c.isReversed ||
      c.card.id.includes("tower") ||
      c.card.id.includes("devil") ||
      c.card.id.includes("death") ||
      c.card.id.includes("swords_three") ||
      c.card.id.includes("swords_ten") ||
      c.card.id.includes("swords_nine")
  ).length;

  let toneTone = "";
  if (challengingCount === 0) {
    toneTone = "Trực quẻ tỏa ra ánh hào quang quang minh cát tường tuyệt mỹ. Các lá bài đều mang năng lượng thuận duyên và phước lộc dồi dào.";
  } else if (challengingCount <= 2) {
    toneTone = "Trực quẻ có sự đan xen giữa thử thách tôi luyện và cơ hội chuyển hóa. Có nghịch cảnh nhưng chính là lò lửa tôi luyện nên kim cương.";
  } else {
    toneTone = "Trực quẻ cảnh báo những cơn sóng gió nghiệp duyên và bài học biến cố lớn. Đây là thời khắc bạn cần nương tựa vào sự tịnh tâm, tránh manh động và hướng tâm tu dưỡng.";
  }

  return (
    `Tổng Luận Đại Quẻ Tarot Tâm An cho ${userName}${destinyTag} theo tâm nguyện: "${qClean}". ` +
    `Dòng chuyển biến năng lượng qua các lá bài: ${cardNames}. ${toneTone} ` +
    `Vũ trụ gửi lời nhắn nhủ thiêng liêng: Hãy luôn nhớ rằng lá bài phản chiếu trường năng lượng hiện tại của tâm thức. ` +
    `"Đức năng thắng số, Tâm an vạn sự an". Khi bạn làm chủ được ý niệm, giữ tâm từ bi và hành động với sự tỉnh thức sáng suốt, bạn chính là bậc kiến tạo vận mệnh tối cao của cuộc đời mình.`
  );
}

/**
 * Tính điểm năng lượng quẻ (Energy Harmony Score: 0..100)
 */
function calculateEnergyScore(cards: DrawnCardResult[]): number {
  let score = 50;
  cards.forEach((c) => {
    if (!c.isReversed) {
      if (c.card.arcana === "Major") score += 12;
      else score += 7;
    } else {
      score -= 8;
    }

    if (
      c.card.id.includes("sun") ||
      c.card.id.includes("star") ||
      c.card.id.includes("world") ||
      c.card.id.includes("wheel")
    ) {
      score += 15;
    }
    if (
      c.card.id.includes("tower") ||
      c.card.id.includes("devil") ||
      c.card.id.includes("swords_ten")
    ) {
      score -= 15;
    }
  });

  return Math.min(100, Math.max(15, score));
}

/**
 * Tạo câu khẳng định may mắn (Affirmation)
 */
function generateLuckyAffirmation(cards: DrawnCardResult[]): string {
  const firstCard = cards[0]?.card;
  if (!firstCard) return "Tôi bình an, tôi tự tại, vũ trụ che chở từng bước chân tôi.";

  if (firstCard.element === "Lửa") {
    return "Tôi đón nhận ngọn lửa nhiệt huyết và dũng khí vô biên; mọi chướng ngại đều biến thành chất liệu cho thành công!";
  } else if (firstCard.element === "Nước") {
    return "Tâm tôi tĩnh lặng và bao dung như biển khơi; tình thương và trực giác dẫn dắt tôi đến bến bờ hạnh phúc trọn vẹn.";
  } else if (firstCard.element === "Khí") {
    return "Trí tuệ tôi sáng tỏ như ánh quang minh; mọi quyết định của tôi đều chính trực, minh bạch và tràn đầy sức mạnh.";
  } else {
    return "Tôi an trú vững chãi trên mảnh đất trù phú; tài lộc, sức khỏe và sự thịnh vượng bền vững đang tuôn chảy vào cuộc đời tôi.";
  }
}

/**
 * HÀM RÚT BÀI CỐT LÕI: drawTarotSpread
 */
export function drawTarotSpread(
  spreadType: SpreadType = "three_time",
  userQuestion: string = "",
  userProfile?: {
    name?: string;
    birthYear?: number;
    canChi?: string;
    zodiac?: string;
  }
): TarotSpreadReadingResult {
  const config = SPREAD_CONFIGS[spreadType];
  const shuffledDeck = secureShuffle(TAROT_78_CARDS);
  const selectedCards = shuffledDeck.slice(0, config.cardCount);

  // Nếu có năm sinh mà chưa có Can Chi thì tự tính
  const finalProfile = { ...userProfile };
  if (finalProfile.birthYear && !finalProfile.canChi) {
    finalProfile.canChi = calculateCanChi(finalProfile.birthYear);
  }

  const drawnCards: DrawnCardResult[] = selectedCards.map((card, idx) => {
    const isReversed = getRandomOrientation();
    const pos = config.positions[idx];
    const keywords = isReversed ? card.reversedKeywords : card.uprightKeywords;
    const meaning = isReversed ? card.reversedMeaning : card.uprightMeaning;
    const aspectAdvice = {
      career: isReversed ? card.aspects.career.reversed : card.aspects.career.upright,
      love: isReversed ? card.aspects.love.reversed : card.aspects.love.upright,
      healthSpirit: isReversed ? card.aspects.healthSpirit.reversed : card.aspects.healthSpirit.upright,
      dharmaAdvice: isReversed ? card.aspects.dharmaAdvice.reversed : card.aspects.dharmaAdvice.upright,
    };

    const personalizedQuestionReading = generatePersonalizedCardReading(
      card,
      isReversed,
      pos,
      userQuestion,
      finalProfile
    );

    // Tính toán góc nhìn Chữa lành (Healing Insight) và Đối diện bóng tối (Shadow Work)
    const isChallenging = isReversed || card.id.includes("tower") || card.id.includes("devil") || card.id.includes("death") || card.suit === "Swords";
    const healingInsight = isChallenging
      ? `Lá bài ${card.nameVi} xuất hiện không phải để phán xét định mệnh, mà như tấm gương tâm lý soi rọi nỗi sợ đang kìm hãm bạn. Hãy đón nhận sự gián đoạn này như một cơ hội quý báu để rũ bỏ gánh nặng cũ, thiết lập ranh giới cảm xúc lành mạnh và yêu thương chính mình sâu sắc hơn.`
      : `Lá bài ${card.nameVi} mang năng lượng ánh sáng thuần khiết, nhắc nhở bạn hãy tin tưởng vào trực giác và giá trị nội tại. Bình an đích thực không nằm ở ngoại cảnh, mà khởi sinh từ sự hòa hợp giữa thân và tâm.`;

    const shadowWork = isReversed
      ? `Bóng tối vô thức: Bạn có thể đang vô thức né tránh sự thật hoặc để nỗi sợ thất bại ngăn cản hành động. Bài học chuyển hóa là dám đối diện trực diện, tha thứ cho những thiếu sót của bản thân trong quá khứ.`
      : `Bóng tối vô thức: Đề phòng sự tự mãn hoặc quá bám chấp vào một kết quả cố định. Hãy giữ tâm xả ly và cởi mở trước những lối đi bất ngờ mà vũ trụ sắp đặt.`;

    // Phân tích Hành trình Kẻ Khờ (Rachel Pollack 3-Line Theory) & Kabbalah Tree of Life Pathworking
    let stageLevel: "Ý Thức Xã Hội (Conscious)" | "Tiềm Thức & Nội Tâm (Subconscious)" | "Siêu Thức & Giác Ngộ (Superconscious)" | "Ngũ Đại Thực Tại (Minor Arcana)" = "Ngũ Đại Thực Tại (Minor Arcana)";
    let archetypalLesson = "";
    let kabbalahTreePath = "";

    if (card.arcana === "Major") {
      const numMatch = card.id.match(/major_(\d+)/);
      const majorNum = numMatch ? parseInt(numMatch[1], 10) : 0;
      if (majorNum >= 1 && majorNum <= 7) {
        stageLevel = "Ý Thức Xã Hội (Conscious)";
        archetypalLesson = `Tầng 1 (Rachel Pollack): Xây dựng bản ngã, vị thế xã hội, làm chủ ý chí và kỷ luật cá nhân.`;
        kabbalahTreePath = `Cầu nối Kether - Chokmah - Binah xuống Chesed: Năng lượng khởi nguyên hình thành trật tự thực tại.`;
      } else if (majorNum >= 8 && majorNum <= 14) {
        stageLevel = "Tiềm Thức & Nội Tâm (Subconscious)";
        archetypalLesson = `Tầng 2 (Rachel Pollack): Khủng hoảng bản ngã, quay vào nội tâm, đối diện bóng tối và chuyển hóa cái tôi cũ.`;
        kabbalahTreePath = `Trục Tiphereth (Trái Tim Cây Sự Sống): Tìm kiếm sự hài hòa, công lý và cái chết tái sinh của bản ngã.`;
      } else {
        stageLevel = "Siêu Thức & Giác Ngộ (Superconscious)";
        archetypalLesson = `Tầng 3 (Rachel Pollack): Vượt thoát ảo tưởng thế tục, thức tỉnh tâm linh vũ trụ và hòa nhập Chân Ngã viên mãn.`;
        kabbalahTreePath = `Cửa ngõ Yesod tiến nhập Malkuth: Hợp nhất ánh sáng thiêng liêng vào thế giới vật chất trần thế.`;
      }
    } else {
      const suitMap: Record<string, string> = {
        Wands: "Nguyên tố Lửa (Atziluth - Thế giới Khởi Nguyên): Ý chí, đam mê, hành động tiên phong",
        Cups: "Nguyên tố Nước (Briah - Thế giới Sáng Tạo): Cảm xúc, tình yêu, trực giác và tâm từ bi",
        Swords: "Nguyên tố Khí (Yetzirah - Thế giới Hình Thành): Lý trí sắc bén, sự thật, thử thách tư duy",
        Pentacles: "Nguyên tố Đất (Assiah - Thế giới Vật Chất): Tài chính, sức khỏe, sự nghiệp và cội rễ vững chắc",
      };
      archetypalLesson = suitMap[card.suit || "Wands"] || "Thực tại đời sống thường nhật.";
      kabbalahTreePath = `Tứ Giới Kabbalah tương ứng Tứ Đại Ngũ Hành Á Đông.`;
    }

    return {
      card,
      isReversed,
      position: pos,
      keywords,
      meaning,
      aspectAdvice,
      healingInsight,
      shadowWork,
      foolsJourneyStage: {
        stageLevel,
        archetypalLesson,
        kabbalahTreePath,
      },
      personalizedQuestionReading,
    };
  });

  const overallSynthesis = generateOverallSpreadSynthesis(
    drawnCards,
    spreadType,
    userQuestion,
    finalProfile
  );

  // Kiểm tra lá bài thử thách để nạp đối soát Kinh Ngũ Bách Danh
  const challengingCardNames = drawnCards
    .filter(
      (c) =>
        c.isReversed ||
        c.card.id.includes("tower") ||
        c.card.id.includes("devil") ||
        c.card.id.includes("death") ||
        c.card.id.includes("moon") ||
        c.card.suit === "Swords"
    )
    .map((c) => `${c.card.nameEn} ${c.isReversed ? "reversed" : ""}`);

  let spiritualRemedy: NguBachDanhRecommendation | undefined = undefined;
  if (challengingCardNames.length > 0) {
    spiritualRemedy = recommendNguBachDanh({
      tarot: {
        challengingCards: challengingCardNames,
      },
      details: userQuestion,
    });
  }

  const energyScore = calculateEnergyScore(drawnCards);
  const luckyAffirmation = generateLuckyAffirmation(drawnCards);

  return {
    spreadType,
    spreadTitle: config.name,
    timestamp: Date.now(),
    userQuestion: userQuestion.trim() || "Khai mở tuệ giác và định hướng bình an",
    userProfile: finalProfile,
    drawnCards,
    overallSynthesis,
    spiritualRemedy,
    luckyAffirmation,
    energyScore,
  };
}
