/**
 * PHÁP BẢO KINH NGŨ BÁCH DANH QUÁN THẾ ÂM (500 Danh Hiệu Quán Âm Bồ Tát)
 * Tài liệu nguyên bản trích xuất từ "Lễ Ngũ Bách Danh Quán Thế Âm Bản Hành Trì".
 *
 * Mục đích cốt lõi:
 * Khi người xem gặp chuyện không may, quẻ có hào hung, bài Tarot thử thách,
 * hay giấc mộng hãi hùng: Khuyên họ thành tâm trì niệm danh hiệu tương ứng
 * để "Giảm thiểu rủi ro - An tâm định tĩnh - Nhẹ bớt nghiệp duyên".
 *
 * Triết lý Phật giáo: "Đức năng thắng số, Từ bi chuyển hóa nghiệp duyên".
 */

import nguBachDanhRaw from "@/data/nguBachDanh500.json";

export type KarmicRemedyCategory =
  | "TAI_ACH_BENH_TAT"       // Tai Ách, Bệnh Tật & Tật Ách (Bệnh thân, dịch bệnh, sông nước, lửa cháy, ác thú...)
  | "QUAN_TUNG_KHAU_THIET"   // Quan Tụng, Kiện Cáo & Khẩu Thiệt Oán Thù (Tù ngục, vu khống, tiểu nhân, oán kết...)
  | "TAI_LOC_TAC_NGHEN"      // Tài Lộc Tắc Nghẽn, Phá Sản & Thất Thoát (Khó khăn tài chính, phá sản, cầu công danh...)
  | "HON_NHAN_GIA_DAO"       // Hôn Nhân Bất Hòa, Ly Tan & Gia Đạo Bất An (Vợ chồng xung khắc, cầu con cái, bảo hộ gia quyến...)
  | "AC_MONG_BAT_AN"         // Ác Mộng, Hoang Mang, Bất An & Sợ Hãi Vô Cớ (Bóng đè, tà ma, hoảng loạn, sợ hãi...)
  | "NGHIEP_CHUONG_SAM_HOI";  // Nghiệp Chướng Nặng Nề & Sám Hối Tịnh Hóa (Vận hạn dồn dập, sám hối tịnh nghiệp, khai mở trí tuệ...)

export interface NguBachDanhRecord {
  id: number;
  name: string;
  shortTitle: string;
  category: KarmicRemedyCategory;
  categoryTitle: string;
  originalText: string;
  mantra: string;
  meaning: string;
  recommendedCount: number; // 21 hoặc 108 biến
  mindsetAdvice: string;
  keywords: string[];
}

export interface CategoryInfo {
  key: KarmicRemedyCategory;
  title: string;
  shortLabel: string;
  color: string;
  iconName: string;
  description: string;
  mantraPrefix: string;
}

export const KARMIC_CATEGORIES: Record<KarmicRemedyCategory, CategoryInfo> = {
  TAI_ACH_BENH_TAT: {
    key: "TAI_ACH_BENH_TAT",
    title: "Tai Ách, Bệnh Tật & Tật Ách",
    shortLabel: "Bệnh Tật & Tai Ách",
    color: "#ef4444",
    iconName: "HeartPulse",
    description: "Tiêu trừ bệnh khổ trên thân, giải trừ độc hại dịch bệnh, cứu thoát nạn nước cuốn, lửa cháy, sấm sét và ác thú.",
    mantraPrefix: "Nam Mô Dược Vương Cứu Khổ Quán Thế Âm Bồ Tát",
  },
  QUAN_TUNG_KHAU_THIET: {
    key: "QUAN_TUNG_KHAU_THIET",
    title: "Quan Tụng, Kiện Cáo & Khẩu Thiệt Oán Thù",
    shortLabel: "Quan Tụng & Oán Thù",
    color: "#f59e0b",
    iconName: "ShieldCheck",
    description: "Hóa giải kiện tụng cửa quan, thoát nạn lao ngục vợi bắt, dập tắt thị phi vu khống và hóa giải oán kết truyền kiếp.",
    mantraPrefix: "Nam Mô Giải Oán Kết Quán Thế Âm Bồ Tát",
  },
  TAI_LOC_TAC_NGHEN: {
    key: "TAI_LOC_TAC_NGHEN",
    title: "Tài Lộc Tắc Nghẽn, Phá Sản & Thất Thoát",
    shortLabel: "Tài Lộc & Công Danh",
    color: "#10b981",
    iconName: "TrendingUp",
    description: "Khai thông nguồn phước tài bảo tắc nghẽn, tiêu trừ nghiệp tham lam bủn xỉn, cầu công danh sự nghiệp hanh thông.",
    mantraPrefix: "Nam Mô Bảo Đàn Hoa Quán Thế Âm Bồ Tát",
  },
  HON_NHAN_GIA_DAO: {
    key: "HON_NHAN_GIA_DAO",
    title: "Hôn Nhân Bất Hòa, Ly Tan & Gia Đạo Bất An",
    shortLabel: "Gia Đạo & Tình Duyên",
    color: "#ec4899",
    iconName: "HeartHandshake",
    description: "Hòa thuận phu thê, giải tỏa xung khắc trong gia tộc, cầu tự sinh con thảo dâu hiền, bảo hộ trẻ nhỏ an lành.",
    mantraPrefix: "Nam Mô Từ Ái Hòa Thuận Quán Thế Âm Bồ Tát",
  },
  AC_MONG_BAT_AN: {
    key: "AC_MONG_BAT_AN",
    title: "Ác Mộng, Hoang Mang, Bất An & Sợ Hãi Vô Cớ",
    shortLabel: "Ác Mộng & Bất An",
    color: "#8b5cf6",
    iconName: "Sparkles",
    description: "Dập tắt sợ hãi đêm tối, tiêu trừ ác mộng và điềm quái dị, hóa giải bóng đè, tà khí khuấy rối, an định thần hồn.",
    mantraPrefix: "Nam Mô Thí Vô Úy Quán Thế Âm Bồ Tát",
  },
  NGHIEP_CHUONG_SAM_HOI: {
    key: "NGHIEP_CHUONG_SAM_HOI",
    title: "Nghiệp Chướng Nặng Nề & Sám Hối Tịnh Hóa",
    shortLabel: "Sám Hối & Tịnh Nghiệp",
    color: "#06b6d4",
    iconName: "Compass",
    description: "Sám hối vạn kiếp nghiệp dày, thanh tịnh tam nghiệp Thân-Khẩu-Ý, diệt trừ vô minh si ám, thành tựu đại nguyện Bồ Đề.",
    mantraPrefix: "Nam Mô Thanh Tịnh Bổn Tự Tại Quán Thế Âm Bồ Tát",
  },
};

// Đảm bảo dữ liệu được định kiểu chính xác
export const NGU_BACH_DANH_LIST: NguBachDanhRecord[] = nguBachDanhRaw as NguBachDanhRecord[];

/**
 * Tra cứu danh hiệu theo ID (1 - 500)
 */
export function getNguBachDanhById(id: number): NguBachDanhRecord | undefined {
  return NGU_BACH_DANH_LIST.find((item) => item.id === id);
}

/**
 * Lấy toàn bộ 500 danh hiệu
 */
export function getAllNguBachDanh(): NguBachDanhRecord[] {
  return NGU_BACH_DANH_LIST;
}

/**
 * Lấy danh sách danh hiệu thuộc một nhóm nghiệp duyên cụ thể
 */
export function getRemediesByCategory(category: KarmicRemedyCategory): NguBachDanhRecord[] {
  return NGU_BACH_DANH_LIST.filter((item) => item.category === category);
}

/**
 * Tìm kiếm danh hiệu Quán Thế Âm theo từ khóa và nhóm
 */
export function searchNguBachDanh(
  query: string,
  category?: KarmicRemedyCategory
): NguBachDanhRecord[] {
  const q = query.trim().toLowerCase();
  return NGU_BACH_DANH_LIST.filter((item) => {
    if (category && item.category !== category) return false;
    if (!q) return true;
    return (
      item.id.toString() === q ||
      item.shortTitle.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.originalText.toLowerCase().includes(q) ||
      item.keywords.some((kw) => kw.includes(q))
    );
  });
}

/**
 * Ngữ cảnh đầu vào để hệ thống AI suy luận đề xuất Pháp Môn Ngũ Bách Danh
 */
export interface RemedyContext {
  issueType?: KarmicRemedyCategory;
  details?: string;
  // Dữ liệu quẻ Liên Sinh Độn Giáp
  divination?: {
    chanhName: string;
    bienName: string;
    movingLine: number;
    question?: string;
    isOminous?: boolean;
    khongMinhAdvice?: string;
  };
  // Dữ liệu bốc bài Tarot
  tarot?: {
    question?: string;
    challengingCards?: string[]; // e.g. ["The Tower", "Death", "Three of Swords", "Ten of Swords", "The Devil"]
    synthesis?: string;
  };
  // Dữ liệu giấc mơ Carl Jung
  dream?: {
    dreamSnippet: string;
    isNightmare?: boolean;
    shadow?: string;
  };
  // Trạng thái cảm xúc / đối thoại
  emotionalState?: "fearful" | "angry" | "depressed" | "anxious" | "grief" | "hopeless";
}

export interface NguBachDanhRecommendation {
  primaryCategory: KarmicRemedyCategory;
  categoryTitle: string;
  remedies: NguBachDanhRecord[]; // 1 đến 3 danh hiệu tương ứng nhất
  chantingVerse: string; // Câu xướng niệm trang nghiêm
  recommendedRepetitions: 21 | 108; // Số biến khuyến nghị
  compassionateGuidance: string; // Lời khai thị an tâm nhẹ nghiệp từ Master of Buddhist Philosophy
  karmicLighteningReason: string; // Lý do vì sao danh hiệu này giúp nhẹ nghiệp
}

/**
 * Phát hiện tính chất hung hiểm / chướng duyên từ quẻ Liên Sinh Độn Giáp
 */
export function analyzeDivinationHungOmen(divination: {
  chanhName: string;
  bienName: string;
  movingLine: number;
  question?: string;
}): { isOminous: boolean; category: KarmicRemedyCategory; reason: string } {
  const { chanhName, bienName, movingLine, question = "" } = divination;
  const qLower = question.toLowerCase();

  // 1. Quẻ ngộ Khảm (Thủy - hãm hiểm, tai ương, sông nước)
  if (
    chanhName.includes("Khảm") ||
    bienName.includes("Khảm") ||
    chanhName.includes("Kiển") ||
    chanhName.includes("Khốn")
  ) {
    if (qLower.includes("bệnh") || qLower.includes("sức khỏe") || qLower.includes("mổ")) {
      return {
        isOminous: true,
        category: "TAI_ACH_BENH_TAT",
        reason: `Quẻ ${chanhName} ngộ Khảm Thủy hãm hiểm, hào ${movingLine} biến động, cảnh báo chướng khí nơi thân thể cần được tịnh hóa.`,
      };
    }
    return {
      isOminous: true,
      category: "AC_MONG_BAT_AN",
      reason: `Quẻ ${chanhName} sang ${bienName} mang năng lượng Thủy hiểm trở, tâm thức dễ rơi vào hoang mang, lo âu bất an.`,
    };
  }

  // 2. Quẻ Tụng (Kiện tụng, tranh chấp, thị phi)
  if (chanhName.includes("Tụng") || bienName.includes("Tụng") || chanhName.includes("Cấu")) {
    return {
      isOminous: true,
      category: "QUAN_TUNG_KHAU_THIET",
      reason: `Quẻ Thiên Thủy Tụng mang khí tượng tranh chấp, quan tụng, khẩu thiệt oán thù, hào ${movingLine} động nhắc nhở nhẫn nhịn và sám hối.`,
    };
  }

  // 3. Quẻ Bĩ, Truân, Minh Di, Hủ (Bế tắc tài lộc, tổn hại)
  if (
    chanhName.includes("Bĩ") ||
    bienName.includes("Bĩ") ||
    chanhName.includes("Truân") ||
    chanhName.includes("Minh Di") ||
    chanhName.includes("Tổn")
  ) {
    if (qLower.includes("tiền") || qLower.includes("tài lộc") || qLower.includes("làm ăn") || qLower.includes("nợ")) {
      return {
        isOminous: true,
        category: "TAI_LOC_TAC_NGHEN",
        reason: `Quẻ ${chanhName} động hào ${movingLine} rơi vào lúc bế tắc tài bảo, cần hóa giải tham chấp và gieo mầm phước đức.`,
      };
    }
    return {
      isOminous: true,
      category: "NGHIEP_CHUONG_SAM_HOI",
      reason: `Quẻ gặp nghịch cảnh ${chanhName}, thời vận trắc trở, là lúc tốt nhất để hướng tâm tu tập và nhẹ nghiệp duyên.`,
    };
  }

  // 4. Nếu câu hỏi về hôn nhân / gia đạo
  if (
    qLower.includes("vợ chồng") ||
    qLower.includes("ly hôn") ||
    qLower.includes("con cái") ||
    qLower.includes("gia đình")
  ) {
    return {
      isOminous: movingLine === 3 || movingLine === 6,
      category: "HON_NHAN_GIA_DAO",
      reason: `Gia đạo đang gặp sóng gió thử thách, cần đức từ bi hòa ái của Quán Thế Âm để hóa giải xung khắc phu thê.`,
    };
  }

  // Mặc định: Hào 3 hoặc Hào 6 thường là hào cực hung hoặc cùng cực
  if (movingLine === 3 || movingLine === 6) {
    return {
      isOminous: true,
      category: "NGHIEP_CHUONG_SAM_HOI",
      reason: `Hào ${movingLine} động ở vị thế thử thách, cổ nhân dạy 'Đức năng thắng số', cần gia tăng trì niệm để nhẹ nghiệp.`,
    };
  }

  return {
    isOminous: false,
    category: "NGHIEP_CHUONG_SAM_HOI",
    reason: `Quẻ bình hòa, duy trì thiện niệm để tăng trưởng phước lành.`,
  };
}

/**
 * Phân tích lá bài Tarot thử thách sang Pháp Môn Ngũ Bách Danh
 */
export function analyzeTarotChallengingCards(cards: string[]): {
  isChallenging: boolean;
  category: KarmicRemedyCategory;
  reason: string;
} {
  const cardStr = cards.join(" ").toLowerCase();

  if (cardStr.includes("tower") || cardStr.includes("tháp") || cardStr.includes("16")) {
    return {
      isChallenging: true,
      category: "TAI_ACH_BENH_TAT",
      reason: "Lá The Tower báo hiệu sự sụp đổ bất ngờ của ảo vọng, biến cố chấn động cần sự che chở vô úy của Bồ Tát.",
    };
  }

  if (cardStr.includes("devil") || cardStr.includes("quỷ") || cardStr.includes("15")) {
    return {
      isChallenging: true,
      category: "NGHIEP_CHUONG_SAM_HOI",
      reason: "Lá The Devil chỉ điểm sự trói buộc của nghiệp ái dục, tham lam và tà kiến, cần năng lực sám hối tịnh hóa.",
    };
  }

  if (cardStr.includes("moon") || cardStr.includes("mặt trăng") || cardStr.includes("18")) {
    return {
      isChallenging: true,
      category: "AC_MONG_BAT_AN",
      reason: "Lá The Moon phản chiếu bóng tối hoang mang, ác mộng và ảo giác vô thức, cần ánh quang minh chiếu rọi.",
    };
  }

  if (cardStr.includes("swords") || cardStr.includes("kiếm")) {
    if (cardStr.includes("three") || cardStr.includes("ba kiếm") || cardStr.includes("ten") || cardStr.includes("mười kiếm")) {
      return {
        isChallenging: true,
        category: "HON_NHAN_GIA_DAO",
        reason: "Lá Ba Kiếm / Mười Kiếm mang nỗi đau chia lìa phản bội, cần tâm từ bi của Đức Quán Âm xoa dịu vết thương lòng.",
      };
    }
    return {
      isChallenging: true,
      category: "QUAN_TUNG_KHAU_THIET",
      reason: "Bộ Kiếm mang năng lượng xung đột, tranh đấu khẩu thiệt, cần dùng tâm nhẫn nhục và đức từ ái để hóa giải.",
    };
  }

  if (cardStr.includes("five of pentacles") || cardStr.includes("năm tiền")) {
    return {
      isChallenging: true,
      category: "TAI_LOC_TAC_NGHEN",
      reason: "Lá Năm Tiền thể hiện sự túng thiếu, cô độc lạnh giá, cần mở rộng phước điền để đón nhận bảo báu của cải.",
    };
  }

  return {
    isChallenging: false,
    category: "NGHIEP_CHUONG_SAM_HOI",
    reason: "Năng lượng bài ổn định, hướng tâm về cội nguồn an lạc.",
  };
}

/**
 * Hàm thông minh cốt lõi: Đề xuất Danh Hiệu Quán Âm tương ứng trong Kinh Ngũ Bách Danh
 * Dựa trên Quẻ Dịch, Lá Tarot, Giấc Mơ hoặc Nỗi khổ niềm đau của người xem.
 */
export function recommendNguBachDanh(context: RemedyContext): NguBachDanhRecommendation {
  let selectedCategory: KarmicRemedyCategory = context.issueType || "NGHIEP_CHUONG_SAM_HOI";
  let triggerReason = "";

  // 1. Kiểm tra Quẻ Liên Sinh Độn Giáp
  if (context.divination) {
    const divAnalysis = analyzeDivinationHungOmen(context.divination);
    if (divAnalysis.isOminous) {
      selectedCategory = divAnalysis.category;
      triggerReason = divAnalysis.reason;
    }
  }

  // 2. Kiểm tra Lá Tarot thử thách
  if (context.tarot?.challengingCards && context.tarot.challengingCards.length > 0) {
    const tarotAnalysis = analyzeTarotChallengingCards(context.tarot.challengingCards);
    if (tarotAnalysis.isChallenging) {
      selectedCategory = tarotAnalysis.category;
      triggerReason = triggerReason ? `${triggerReason} Đồng thời, ${tarotAnalysis.reason}` : tarotAnalysis.reason;
    }
  }

  // 3. Kiểm tra Giấc Mộng
  if (context.dream?.isNightmare) {
    selectedCategory = "AC_MONG_BAT_AN";
    triggerReason = "Giấc mộng ác nghiệp, bóng tối khuấy đảo thần thức, cần nương tựa uy lực Thí Vô Úy để dập tắt hãi hùng.";
  }

  // 4. Nếu có chi tiết mô tả tìm kiếm
  if (context.details) {
    const dLower = context.details.toLowerCase();
    if (dLower.includes("bệnh") || dLower.includes("thuốc") || dLower.includes("ung thư") || dLower.includes("tai nạn")) {
      selectedCategory = "TAI_ACH_BENH_TAT";
    } else if (dLower.includes("kiện") || dLower.includes("tù") || dLower.includes("tranh chấp") || dLower.includes("thị phi")) {
      selectedCategory = "QUAN_TUNG_KHAU_THIET";
    } else if (dLower.includes("phá sản") || dLower.includes("nợ nần") || dLower.includes("thất nghiệp") || dLower.includes("tài chính")) {
      selectedCategory = "TAI_LOC_TAC_NGHEN";
    } else if (dLower.includes("ly hôn") || dLower.includes("chia tay") || dLower.includes("con cái") || dLower.includes("chồng ngoại tình")) {
      selectedCategory = "HON_NHAN_GIA_DAO";
    } else if (dLower.includes("ác mộng") || dLower.includes("sợ ma") || dLower.includes("bóng đè") || dLower.includes("hoảng loạn")) {
      selectedCategory = "AC_MONG_BAT_AN";
    }
  }

  // Chọn 1 đến 3 danh hiệu tiêu biểu nhất từ 500 danh hiệu
  const candidatePool = getRemediesByCategory(selectedCategory);

  // Danh hiệu ưu tiên đặc biệt theo danh mục
  const priorityIdsByCategory: Record<KarmicRemedyCategory, number[]> = {
    TAI_ACH_BENH_TAT: [2, 56, 43, 9, 3, 4, 187, 454], // Dương Liễu Quán Âm, 3 tai 9 hoạnh tử, Tiêu độc bùa chú...
    QUAN_TUNG_KHAU_THIET: [16, 490, 31, 6, 26, 54, 55], // Phủ Việt lìa nạn quan quân, Oán thù tan rã, Ấn báu thắng lý...
    TAI_LOC_TAC_NGHEN: [1, 22, 10, 40, 63, 64, 496], // Như Ý Châu giàu lớn, Bảo Kíp kho báu ngầm, Cung báu thăng quan, Biển phước đức...
    HON_NHAN_GIA_DAO: [14, 458, 34, 455, 481], // Hồ Bình quyến thuộc hòa thuận, Cầu con trai con gái, Hiệp Chưởng kính yêu...
    AC_MONG_BAT_AN: [7, 57, 8, 12, 489, 51, 186], // Thí Vô Úy dứt sợ hãi, Giải trừ ác mộng, Dập tắt lửa phiền não...
    NGHIEP_CHUONG_SAM_HOI: [18, 494, 38, 20, 301, 484, 486], // Bạch Liên Hoa thanh tịnh, Thánh Thanh Tịnh, Bất thối kim luân, Tiêu tội diệt ác...
  };

  const priorityIds = priorityIdsByCategory[selectedCategory] || [18, 7, 1];
  const selectedRemedies: NguBachDanhRecord[] = [];

  // Lấy các danh hiệu ưu tiên trước
  for (const pid of priorityIds) {
    const item = getNguBachDanhById(pid);
    if (item && selectedRemedies.length < 3) {
      selectedRemedies.push(item);
    }
  }

  // Nếu chưa đủ 3, bổ sung từ pool
  for (const item of candidatePool) {
    if (selectedRemedies.length >= 3) break;
    if (!selectedRemedies.some((r) => r.id === item.id)) {
      selectedRemedies.push(item);
    }
  }

  const primaryRemedy = selectedRemedies[0] || NGU_BACH_DANH_LIST[0];
  const categoryInfo = KARMIC_CATEGORIES[selectedCategory];

  // Câu xướng niệm
  const chantingVerse = `Nam Mô Đại Từ Đại Bi Tầm Thanh Cứu Khổ Cứu Nạn Quán Thế Âm Bồ Tát (${primaryRemedy.shortTitle})`;

  // Khai thị từ Master of Buddhist Philosophy
  const compassionateGuidance =
    `Quẻ dịch hay cuộc đời dẫu có chút chướng duyên nơi phương vị hay công việc, bạn chớ quá hoang mang hay sợ hãi. ` +
    `Cổ nhân dạy: "Đức năng thắng số, Từ bi chuyển hóa nghiệp duyên". Vận mệnh không phải là tảng đá bất di bất dịch, mà tùy tâm biến chuyển. ` +
    `Khi tâm bạn khởi lòng từ bi, buông bỏ oán kết và thành kính hướng về Đức Quán Thế Âm qua danh hiệu "${primaryRemedy.shortTitle}", ` +
    `tần số năng lượng bình an sẽ bảo bọc bạn, hóa dữ thành lành, làm nhẹ bớt nghiệp lực và khai thông lối thoát an nhiên.`;

  const karmicLighteningReason =
    triggerReason ||
    `Nương vào oai thần nguyện lực của Đức Quán Thế Âm trong Kinh Ngũ Bách Danh (${categoryInfo.title}), chuyển hóa nghiệp chướng từ gốc rễ tâm thức, đem lại bình an và may mắn.`;

  return {
    primaryCategory: selectedCategory,
    categoryTitle: categoryInfo.title,
    remedies: selectedRemedies,
    chantingVerse,
    recommendedRepetitions: primaryRemedy.recommendedCount as 21 | 108,
    compassionateGuidance,
    karmicLighteningReason,
  };
}

/**
 * Tra cứu pháp môn đối trị trực tiếp theo loại vấn đề
 */
export function getRemedyByIssue(
  issueType: KarmicRemedyCategory,
  details?: string
): NguBachDanhRecommendation {
  return recommendNguBachDanh({ issueType, details });
}

/**
 * Thống kê tổng hợp số lượng danh hiệu theo từng nhóm
 */
export function getCategoryStatistics(): Record<
  KarmicRemedyCategory,
  CategoryInfo & { count: number }
> {
  const stats: Record<string, any> = {};

  Object.entries(KARMIC_CATEGORIES).forEach(([key, info]) => {
    const count = NGU_BACH_DANH_LIST.filter((item) => item.category === key).length;
    stats[key] = {
      ...info,
      count,
    };
  });

  return stats as Record<KarmicRemedyCategory, CategoryInfo & { count: number }>;
}
