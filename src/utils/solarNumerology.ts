// ============================================================================
// ĐỘNG CƠ SỐ HỌC MẶT TRỜI & CHIÊM TINH HỌC GEN Z (SOLAR NUMEROLOGY & ASTROLOGY)
// Tích hợp: Thần Số Học Pythagoras (Số Chủ Đạo 1-11-22-33, Số Linh Hồn, Số Sứ Mệnh),
// Bộ Ba Chiêm Tinh (Sun Sign - Cung Mặt Trời, Moon Sign - Cung Mặt Trăng, Rising / Ascendant - Cung Mọc),
// Bản Đồ Khí Chất & Năng Lượng Đời Người (Life Matrix & Growth Lessons)
// ============================================================================

export interface SolarBirthInput {
  fullName: string;
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  birthHour?: number; // 0..23 (Dùng để tính Cung Mọc chính xác)
  birthMinute?: number;
}

export interface SunSignData {
  nameVi: string;
  nameEn: string;
  symbol: string;
  dates: string;
  element: "Lửa" | "Đất" | "Khí" | "Nước";
  modality: "Tiên Phong (Cardinal)" | "Kiên Định (Fixed)" | "Biến Đổi (Mutable)";
  rulingPlanet: string;
  archetype: string; // Hình mẫu Gen Z (Người Tiên Phong, Nhà Sáng Tạo, Người Chữa Lành...)
  strengths: string[];
  growthEdges: string[];
  vibe: string;
  superpower: string;
  shadowSide: string;
}

export interface MoonSignData {
  nameVi: string;
  nameEn: string;
  emotionalNeed: string;
  hiddenHeart: string;
  safeSpace: string;
}

export interface AscendantSignData {
  nameVi: string;
  nameEn: string;
  firstImpression: string;
  socialMask: string;
  outwardStyle: string;
}

export interface LifePathNumberData {
  number: number;
  isMasterNumber: boolean;
  title: string;
  coreVibration: string;
  lifeMission: string;
  talentAndCareer: string[];
  loveVibe: string;
  soulLesson: string;
  crystalAndColor: {
    color: string;
    crystal: string;
  };
  affirmation: string;
}

export interface SolarNumerologyResult {
  personalInfo: {
    fullName: string;
    birthDateStr: string;
    birthHourStr: string;
  };
  // 1. Thần Số Học Pythagoras Cốt Tủy
  numerology: {
    lifePath: LifePathNumberData; // Con số Chủ đạo (Life Path Number)
    soulUrgeNumber: number; // Chỉ số Linh hồn (Số khát khao nội tâm)
    soulUrgeMeaning: string;
    expressionNumber: number; // Chỉ số Sứ mệnh / Năng lực ngày sinh
    expressionMeaning: string;
    attitudeNumber: number; // Chỉ số Thái độ tiếp cận thế giới
    attitudeMeaning: string;
    personalYear2026: number; // Năm cá nhân 2026
    personalYearTheme: string;
    growthCycle: string;
  };
  // 2. Bộ Ba Chiêm Tinh (The Big Three) & Cung Hoàng Đạo Mặt Trời
  astrology: {
    sunSign: SunSignData; // Cung Mặt Trời (Bản ngã cốt lõi)
    moonSign: MoonSignData; // Cung Mặt Trăng (Thế giới nội tâm & cảm xúc)
    risingSign: AscendantSignData; // Cung Mọc (Vỏ bọc xã hội & ấn tượng đầu tiên)
    elementBalance: {
      fire: number; // %
      earth: number;
      air: number;
      water: number;
      dominantElement: string;
    };
  };
  // 3. Bản Đồ Cuộc Đời & Kim Chỉ Nam Thành Công (Map for Life & Success)
  lifeMap: {
    cosmicIdentity: string; // Tên danh hiệu năng lượng (vd: "Chiến Binh Ánh Sáng Tiên Phong")
    coreDilemma: string; // Nút thắt tâm lý lớn nhất thường gặp ở Gen Z
    healingPathway: string; // Lộ trình tự chữa lành & phát triển bản thân
    idealCareerTracks: string[]; // Định hướng nghề nghiệp phù hợp thời đại số (Creator, Coach, Tech, Art)
    relationshipCompatibility: {
      bestMatches: string[];
      growthChallenges: string[];
      advice: string;
    };
    sacredAffirmation: string;
  };
}

// ----------------------------------------------------------------------------
// 12 CUNG HOÀNG ĐẠO (SUN SIGNS) VỚI GÓC NHÌN GEN Z SẮC NÉT
// ----------------------------------------------------------------------------
export const SUN_SIGNS_DICT: Record<string, SunSignData> = {
  Aries: {
    nameVi: "Bạch Dương",
    nameEn: "Aries",
    symbol: "♈",
    dates: "21/03 - 19/04",
    element: "Lửa",
    modality: "Tiên Phong (Cardinal)",
    rulingPlanet: "Sao Hỏa (Mars)",
    archetype: "Chiến Binh Tiên Phong (The Trailblazer)",
    strengths: ["Dám nghĩ dám làm", "Năng lượng bùng nổ", "Thẳng thắn chân thật", "Lãnh đạo tự nhiên"],
    growthEdges: ["Nóng vội bốc đồng", "Dễ chán nản nửa chừng", "Ít kiên nhẫn lắng nghe"],
    vibe: "Năng động, nhiệt huyết, không ngại va chạm, tiên phong mở lối dẫn đầu trào lưu.",
    superpower: "Biến ý tưởng thành hành động ngay lập tức không chần chừ.",
    shadowSide: "Cơn giận bộc phát và cảm giác bứt rứt khi mọi thứ diễn ra quá chậm.",
  },
  Taurus: {
    nameVi: "Kim Ngưu",
    nameEn: "Taurus",
    symbol: "♉",
    dates: "20/04 - 20/05",
    element: "Đất",
    modality: "Kiên Định (Fixed)",
    rulingPlanet: "Sao Kim (Venus)",
    archetype: "Người Kiến Tạo Vững Chãi (The Master Builder)",
    strengths: ["Kiên định đáng tin", "Gu thẩm mỹ tinh tế", "Quản lý tài chính giỏi", "Trung thành tuyệt đối"],
    growthEdges: ["Cố chấp bảo thủ", "Sợ thay đổi vùng an toàn", "Dễ nuông chiều bản thân quá mức"],
    vibe: "Điềm tĩnh, thực tế, yêu cái đẹp, trân trọng chất lượng cuộc sống và sự an toàn tài chính.",
    superpower: "Khả năng tích lũy bền bỉ và hiện thực hóa mục tiêu thành của cải vật chất.",
    shadowSide: "Khó buông bỏ những điều quen thuộc dù chúng đã không còn phục vụ sự phát triển.",
  },
  Gemini: {
    nameVi: "Song Tử",
    nameEn: "Gemini",
    symbol: "♊",
    dates: "21/05 - 20/06",
    element: "Khí",
    modality: "Biến Đổi (Mutable)",
    rulingPlanet: "Sao Thủy (Mercury)",
    archetype: "Sứ Giả Tri Thức & Kết Nối (The Communicator)",
    strengths: ["Thông minh nhạy bén", "Khả năng ngôn từ bậc thầy", "Thích nghi siêu tốc", "Ham học hỏi"],
    growthEdges: ["Dễ phân tán tư tưởng", "Hay lo âu bồn chồn", "Khó đào sâu một lĩnh vực"],
    vibe: "Hài hước, đa tài, bắt trend cực nhanh, luôn là tâm điểm của những cuộc hội thoại thú vị.",
    superpower: "Kết nối những ý tưởng tưởng chừng không liên quan thành giải pháp đột phá.",
    shadowSide: "Quá nhiều suy nghĩ chạy trong đầu khiến tâm trí khó đạt được trạng thái tĩnh lặng.",
  },
  Cancer: {
    nameVi: "Cự Giải",
    nameEn: "Cancer",
    symbol: "♋",
    dates: "21/06 - 22/07",
    element: "Nước",
    modality: "Tiên Phong (Cardinal)",
    rulingPlanet: "Mặt Trăng (The Moon)",
    archetype: "Người Nuôi Dưỡng & Trực Giác (The Intuitive Caregiver)",
    strengths: ["Trực giác cực nhạy", "Thấu cảm sâu sắc", "Bảo vệ gia đình và bạn bè", "Giàu cảm xúc nghệ thuật"],
    growthEdges: ["Dễ xúc động tổn thương", "Hay bọc mình vào vỏ ốc", "Bịn rịn với quá khứ"],
    vibe: "Ấm áp, tinh tế, nơi an trú tinh thần cho mọi người xung quanh, thấu hiểu tâm lý người khác.",
    superpower: "Cảm nhận được tần số cảm xúc của người khác trước khi họ kịp nói ra.",
    shadowSide: "Tự dằn vặt bản thân và có xu hướng thao túng cảm xúc thụ động khi cảm thấy bất an.",
  },
  Leo: {
    nameVi: "Sư Tử",
    nameEn: "Leo",
    symbol: "♌",
    dates: "23/07 - 22/08",
    element: "Lửa",
    modality: "Kiên Định (Fixed)",
    rulingPlanet: "Mặt Trời (The Sun)",
    archetype: "Ngôi Sao Tỏa Sáng (The Radiant Creator)",
    strengths: ["Tự tin rạng rỡ", "Hào phóng trượng nghĩa", "Sáng tạo nghệ thuật", "Khí chất thủ lĩnh"],
    growthEdges: ["Cái tôi cá nhân cao", "Cần sự công nhận liên tục", "Khó chấp nhận lời chê bai"],
    vibe: "Quang minh chính đại, hào sảng, tràn ngập năng lượng tích cực lan tỏa đến mọi người.",
    superpower: "Truyền cảm hứng và nâng tầm giá trị của những người đồng hành.",
    shadowSide: "Tổn thương lòng tự trọng khi không được chú ý hoặc bị xem nhẹ công sức.",
  },
  Virgo: {
    nameVi: "Xử Nữ",
    nameEn: "Virgo",
    symbol: "♍",
    dates: "23/08 - 22/09",
    element: "Đất",
    modality: "Biến Đổi (Mutable)",
    rulingPlanet: "Sao Thủy (Mercury)",
    archetype: "Nhà Hoàn Thiện & Chữa Lành (The Master Alchemist)",
    strengths: ["Tỉ mỉ chi tiết", "Tư duy phân tích sắc bén", "Tận tâm cống hiến", "Tính kỷ luật cao"],
    growthEdges: ["Chủ nghĩa cầu toàn thái quá", "Tự phán xét khắt khe", "Hay lo lắng vặt vãnh"],
    vibe: "Chỉn chu, thanh lịch, logic, đáng tin cậy trong mọi dự án phức tạp cần độ chính xác cao.",
    superpower: "Nhìn thấy ngay lỗ hổng trong hệ thống và đưa ra quy trình tối ưu hoàn hảo.",
    shadowSide: "Burnout vì ôm đồm mọi thứ và kỳ vọng sự hoàn hảo phi thực tế từ bản thân và người khác.",
  },
  Libra: {
    nameVi: "Thiên Bình",
    nameEn: "Libra",
    symbol: "♎",
    dates: "23/09 - 22/10",
    element: "Khí",
    modality: "Tiên Phong (Cardinal)",
    rulingPlanet: "Sao Kim (Venus)",
    archetype: "Sứ Giả Hòa Bình & Nghệ Thuật (The Harmonizer)",
    strengths: ["Công bằng chính trực", "Ngoại giao duyên dáng", "Thẩm mỹ cao cấp", "Tạo dựng hòa khí"],
    growthEdges: ["Do dự khó ra quyết định", "Sợ làm phật lòng người khác", "Né tránh xung đột trực tiếp"],
    vibe: "Thanh tao, lịch thiệp, yêu chuộng sự cân bằng, là cầu nối hòa giải trong mọi mâu thuẫn.",
    superpower: "Nhìn thấu mọi góc nhìn đa chiều của một vấn đề mà không thiên vị.",
    shadowSide: "Đánh mất lập trường cá nhân chỉ để chiều lòng số đông hoặc giữ vẻ hòa hoãn bề ngoài.",
  },
  Scorpio: {
    nameVi: "Bọ Cạp (Thiên Yết)",
    nameEn: "Scorpio",
    symbol: "♏",
    dates: "23/10 - 21/11",
    element: "Nước",
    modality: "Kiên Định (Fixed)",
    rulingPlanet: "Sao Diêm Vương (Pluto) & Sao Hỏa",
    archetype: "Nhà Chuyển Hóa & Thấu Cảm (The Transformer)",
    strengths: ["Trực giác thấu thị", "Ý chí kiên cường vô song", "Bảo mật tuyệt đối", "Chiều sâu cảm xúc"],
    growthEdges: ["Đa nghi phòng thủ cao", "Khó tha thứ", "Xu hướng kiểm soát"],
    vibe: "Huyền bí, cuốn hút, nội lực thâm sâu, không bao giờ đầu hàng trước nghịch cảnh.",
    superpower: "Khả năng tái sinh từ đống tro tàn, biến tổn thương thành sức mạnh phi thường.",
    shadowSide: "Gặm nhấm nỗi đau trong bí mật và lập rào chắn quá dày khiến người khác khó chạm vào tim.",
  },
  Sagittarius: {
    nameVi: "Nhân Mã",
    nameEn: "Sagittarius",
    symbol: "♐",
    dates: "22/11 - 21/12",
    element: "Lửa",
    modality: "Biến Đổi (Mutable)",
    rulingPlanet: "Sao Mộc (Jupiter)",
    archetype: "Triết Gia Tự Do & Khám Phá (The Truth Seeker)",
    strengths: ["Lạc quan vô biên", "Tầm nhìn xa trông rộng", "Yêu tự do phiêu lưu", "Rộng lượng cởi mở"],
    growthEdges: ["Thiếu kiên nhẫn cam kết", "Thẳng thắn làm mất lòng", "Hứa hẹn quá đà"],
    vibe: "Phóng khoáng, hài hước, mê xê dịch, luôn tìm kiếm ý nghĩa triết học cao hơn của cuộc sống.",
    superpower: "Luôn tìm thấy ánh sáng hy vọng và cơ hội ngay giữa hoàn cảnh tăm tối nhất.",
    shadowSide: "Chạy trốn thực tại và các trách nhiệm thực tế bằng những chuyến đi hoặc lý tưởng xa vời.",
  },
  Capricorn: {
    nameVi: "Ma Kết",
    nameEn: "Capricorn",
    symbol: "♑",
    dates: "22/12 - 19/01",
    element: "Đất",
    modality: "Tiên Phong (Cardinal)",
    rulingPlanet: "Sao Thổ (Saturn)",
    archetype: "Nhà Chiến Lược Đỉnh Cao (The Master Strategist)",
    strengths: ["Ý chí sắt đá", "Kỷ luật bền bỉ", "Tầm nhìn dài hạn", "Trách nhiệm cao cả"],
    growthEdges: ["Nghiêm khắc lạnh lùng", "Áp lực danh vọng nặng nề", "Khó mở lòng chia sẻ yếu đuối"],
    vibe: "Trưởng thành trước tuổi, phong thái đĩnh đạc, từng bước leo lên đỉnh cao danh vọng bằng thực lực.",
    superpower: "Khả năng chịu đựng gian khổ và lập chiến lược dài hạn 5-10 năm chuẩn xác.",
    shadowSide: "Đồng hóa giá trị bản thân với thành tích công việc, quên mất việc tận hưởng niềm vui hiện tại.",
  },
  Aquarius: {
    nameVi: "Bảo Bình",
    nameEn: "Aquarius",
    symbol: "♒",
    dates: "20/01 - 18/02",
    element: "Khí",
    modality: "Kiên Định (Fixed)",
    rulingPlanet: "Sao Thiên Vương (Uranus) & Sao Thổ",
    archetype: "Nhà Đổi Mới Vị Nhân Sinh (The Visionary Rebel)",
    strengths: ["Tư duy độc bản khác biệt", "Nhân đạo cấp tiến", "Sáng tạo công nghệ", "Tự do bình đẳng"],
    growthEdges: ["Xa cách cảm xúc", "Lập dị bướng bỉnh", "Khó hòa nhập truyền thống gò bó"],
    vibe: "Đi trước thời đại, không theo khuôn mẫu số đông, tư duy tương lai hướng tới cộng đồng văn minh.",
    superpower: "Phá vỡ các lề thói cũ kỹ để kiến tạo những hệ thống tân tiến, nhân văn hơn.",
    shadowSide: "Tự cô lập bản thân trên tháp ngà lý trí, né tránh việc kết nối cảm xúc chân thật, gần gũi.",
  },
  Pisces: {
    nameVi: "Song Ngư",
    nameEn: "Pisces",
    symbol: "♓",
    dates: "19/02 - 20/03",
    element: "Nước",
    modality: "Biến Đổi (Mutable)",
    rulingPlanet: "Sao Hải Vương (Neptune) & Sao Mộc",
    archetype: "Nghệ Sĩ Mộng Mơ & Giác Ngộ (The Mystical Dreamer)",
    strengths: ["Lòng trắc ẩn vô bờ", "Trực giác tâm linh", "Tưởng tượng phong phú", "Chữa lành tâm hồn"],
    growthEdges: ["Dễ bị ranh giới mờ nhạt", "Xu hướng trốn tránh thực tại", "Dễ hy sinh mù quáng"],
    vibe: "Thơ mộng, huyền ảo, giàu tình yêu thương, kết nối sâu sắc với âm nhạc và cõi vô thức.",
    superpower: "Thấu hiểu nỗi đau của nhân loại và chuyển hóa nó thành nghệ thuật chữa lành rung động cao.",
    shadowSide: "Đóng vai nạn nhân trong các mối quan hệ độc hại vì không nỡ từ chối hoặc đặt ranh giới bảo vệ mình.",
  },
};

// ----------------------------------------------------------------------------
// THẦN SỐ HỌC PYTHAGORAS CỐT TỦY (CON SỐ CHỦ ĐẠO 1..9, 11, 22, 33)
// ----------------------------------------------------------------------------
export const LIFE_PATH_NUMBERS_DICT: Record<number, LifePathNumberData> = {
  1: {
    number: 1,
    isMasterNumber: false,
    title: "Con Số 1 • Thủ Lĩnh Tiên Phong (The Independent Pioneer)",
    coreVibration: "Độc lập, Tiên phong, Ý chí sắt đá, Tự lực cánh sinh",
    lifeMission: "Đứng vững trên đôi chân của chính mình, mở đường cho những điều mới mẻ và truyền cảm hứng dũng cảm cho người khác.",
    talentAndCareer: ["Founder / Khởi nghiệp", "Giám đốc điều hành", "Nhà sáng chế", "Tác giả / Diễn giả độc lập"],
    loveVibe: "Cần đối tác tôn trọng không gian riêng và sự tự chủ; không thích bị kiểm soát hay phụ thuộc.",
    soulLesson: "Học cách hạ bớt cái tôi độc đoán để lắng nghe và kết nối chân thành với tập thể.",
    crystalAndColor: { color: "Đỏ Ruby & Vàng Hào Quang", crystal: "Đá Mắt Hổ (Tiger Eye) & Hồng Ngọc" },
    affirmation: "Tôi là người làm chủ vận mệnh của mình. Tôi can đảm bước đi trên con đường độc bản với lòng tự tin rạng ngời.",
  },
  2: {
    number: 2,
    isMasterNumber: false,
    title: "Con Số 2 • Sứ Giả Hòa Bình & Trực Giác (The Peacemaker)",
    coreVibration: "Hòa nhã, Lắng nghe, Trực giác tinh tế, Hợp tác thấu cảm",
    lifeMission: "Hàn gắn những rạn nứt, mang lại sự bình an, hòa giải mâu thuẫn bằng tình yêu thương và sự thấu hiểu sâu sắc.",
    talentAndCareer: ["Chuyên gia tâm lý / Tham vấn", "Ngoại giao", "Nhân sự (HR)", "Nghệ sĩ trị liệu"],
    loveVibe: "Chung thủy, chu đáo, coi trọng sự gắn kết tâm hồn sâu sắc; dễ bị tổn thương nếu bị lạnh nhạt.",
    soulLesson: "Học cách thiết lập ranh giới cảm xúc lành mạnh, không hy sinh bản thân quá mức để làm hài lòng người khác.",
    crystalAndColor: { color: "Bạc Ánh Trăng & Xanh Lam Ngọc", crystal: "Đá Mặt Trăng (Moonstone) & Thạch Anh Hồng" },
    affirmation: "Tôi tin tưởng vào trực giác của mình. Trái tim tôi tỏa sáng sự bình an và hòa ái đến mọi người xung quanh.",
  },
  3: {
    number: 3,
    isMasterNumber: false,
    title: "Con Số 3 • Nghệ Sĩ Truyền Cảm Hứng (The Creative Communicator)",
    coreVibration: "Sáng tạo, Ngôn từ duyên dáng, Lạc quan, Lan tỏa niềm vui",
    lifeMission: "Dùng tiếng nói, ngòi bút và nghệ thuật để xua tan bóng tối u ám, thắp sáng niềm hy vọng và niềm vui sống cho nhân gian.",
    talentAndCareer: ["Content Creator / KOL", "Biên kịch / Nhà văn", "Marketing & Truyền thông", "Diễn viên / MC"],
    loveVibe: "Thích sự lãng mạn, hài hước, cùng nhau chia sẻ câu chuyện mỗi ngày; sợ sự nhàm chán đơn điệu.",
    soulLesson: "Tập trung năng lượng vào mục tiêu dài hạn, tránh phân tán cảm xúc hoặc nông nổi bề nổi.",
    crystalAndColor: { color: "Vàng Nắng & Cam Tươi", crystal: "Thạch Anh Vàng (Citrine) & Hổ Phách" },
    affirmation: "Tôi tự do biểu đạt chân lý và vẻ đẹp của tâm hồn mình. Năng lượng tích cực của tôi mang niềm vui đến thế giới.",
  },
  4: {
    number: 4,
    isMasterNumber: false,
    title: "Con Số 4 • Kiến Trúc Sư Nền Móng (The Master Builder)",
    coreVibration: "Thực tế, Kỷ luật, Vững chãi, Chu toàn trách nhiệm",
    lifeMission: "Xây dựng những nền móng vững chắc, quy trình bài bản giúp gia đình, tổ chức và xã hội phát triển an toàn, bền vững.",
    talentAndCareer: ["Kỹ sư phần mềm / Hệ thống", "Quản lý dự án", "Tài chính / Kế toán", "Bất động sản"],
    loveVibe: "Chân thành, đáng tin cậy như bàn thạch; bày tỏ tình cảm bằng hành động thực tế chăm sóc che chở.",
    soulLesson: "Học cách linh hoạt đón nhận sự thay đổi, buông bỏ sự cứng nhắc và cho phép bản thân nghỉ ngơi buông thư.",
    crystalAndColor: { color: "Xanh Lục Bảo & Nâu Đất", crystal: "Thạch Anh Khói & Đá Mắt Hổ Xanh" },
    affirmation: "Tôi xây dựng cuộc đời mình trên nền tảng của sự thật, kỷ luật và tình yêu thương vững bền.",
  },
  5: {
    number: 5,
    isMasterNumber: false,
    title: "Con Số 5 • Lữ Khách Tự Do & Đổi Mới (The Free Spirit)",
    coreVibration: "Tự do, Trải nghiệm, Đột phá, Thích ứng linh hoạt",
    lifeMission: "Phá vỡ các giới hạn gò bó, truyền cảm hứng đổi mới, khám phá thế giới đa sắc màu và sống trọn vẹn từng khoảnh khắc.",
    talentAndCareer: ["Du lịch / Hướng dẫn viên", "Truyền thông sự kiện", "Thương mại quốc tế", "Sáng tạo nghệ thuật tự do"],
    loveVibe: "Cần sự mới mẻ, hào hứng, bạn đồng hành cùng khám phá chân trời mới; không chịu được sự giam cầm.",
    soulLesson: "Học cách tự kỷ luật nội tâm, làm chủ các cám dỗ nhất thời để đạt được tự do đích thực sâu sắc.",
    crystalAndColor: { color: "Lam Da Trời & Ngọc Bích Neon", crystal: "Đá Lapis Lazuli & Aquamarine" },
    affirmation: "Tôi đón nhận mọi biến đổi của cuộc đời với tâm thế phiêu lưu kỳ thú và sự khôn ngoan tự tại.",
  },
  6: {
    number: 6,
    isMasterNumber: false,
    title: "Con Số 6 • Trái Tim Yêu Thương & Chăm Sóc (The Nurturer)",
    coreVibration: "Yêu thương, Trách nhiệm, Che chở, Vun đắp mái ấm",
    lifeMission: "Lan tỏa tình thương vô điều kiện, xây dựng tổ ấm bình yên và phụng sự cộng đồng với sự tận tụy nhân từ.",
    talentAndCareer: ["Bác sĩ / Y sĩ / Dược sĩ", "Giáo dục / Đào tạo", "Tư vấn hôn nhân gia đình", "Thiết kế nội thất"],
    loveVibe: "Hiền hòa, ấm áp, toàn tâm toàn ý vì gia đình và người thương; khao khát một mái ấm tròn vẹn.",
    soulLesson: "Phân biệt giữa yêu thương lành mạnh và sự kiểm soát áp đặt; học cách yêu thương chăm sóc chính mình trước.",
    crystalAndColor: { color: "Hồng Phấn & Xanh Ngọc Bích", crystal: "Thạch Anh Hồng (Rose Quartz) & Ngọc Bích (Jade)" },
    affirmation: "Trái tim tôi là nguồn suối yêu thương vô tận. Tôi chữa lành và nâng đỡ cuộc đời bằng lòng từ bi thanh khiết.",
  },
  7: {
    number: 7,
    isMasterNumber: false,
    title: "Con Số 7 • Nhà Khai Sáng & Tri Thức Thâm Sâu (The Seeker of Truth)",
    coreVibration: "Trực giác, Triết học, Chiêm nghiệm, Khám phá cội rễ",
    lifeMission: "Khám phá quy luật vũ trụ, giải mã những bí mật tâm linh và khoa học để nâng cao nhận thức tâm thức nhân loại.",
    talentAndCareer: ["Nhà nghiên cứu khoa học", "Chuyên gia dữ liệu / AI", "Triết gia / Học giả", "Bậc thầy huyền học / Thiền sư"],
    loveVibe: "Cần sự đồng điệu sâu sắc về trí tuệ và tâm hồn; trân trọng những khoảng lặng tĩnh mịch một mình.",
    soulLesson: "Mở lòng tin tưởng cuộc sống và con người, kết nối tri thức sách vở với tình yêu thương thực tế giữa đời thường.",
    crystalAndColor: { color: "Tím Huyền Diệu & Trắng Tinh Khiết", crystal: "Thạch Anh Tím (Amethyst) & Đá Thạch Anh Trắng" },
    affirmation: "Tôi kết nối sâu sắc với trí tuệ vô hạn của vũ trụ. Chân lý dẫn đường cho mọi bước đi bình an của tôi.",
  },
  8: {
    number: 8,
    isMasterNumber: false,
    title: "Con Số 8 • Bậc Thầy Kiến Tạo Thịnh Vượng (The Powerhouse)",
    coreVibration: "Quyền lực, Tài chính, Điều hành, Hiện thực hóa vĩ đại",
    lifeMission: "Làm chủ quy luật vật chất và tinh thần, tạo dựng sự thịnh vượng bền vững và dùng nguồn lực để kiến tạo giá trị xã hội to lớn.",
    talentAndCareer: ["Doanh nhân / Chủ doanh nghiệp", "Đầu tư tài chính / Ngân hàng", "Luật sư / Thẩm phán", "Lãnh đạo cấp cao"],
    loveVibe: "Tìm kiếm người bạn đời bản lĩnh, chung chí hướng lớn; hào phóng bảo bọc đối phương bằng sự vững chãi.",
    soulLesson: "Cân bằng giữa tham vọng vật chất và đạo đức tâm linh; hiểu rằng của cải chân thật là công cụ để phụng sự đời.",
    crystalAndColor: { color: "Vàng Kim Hoàng Gia & Đen Obsidian", crystal: "Đá Pyrite (Vàng Găm) & Thạch Anh Đen" },
    affirmation: "Tôi là thỏi nam châm thu hút sự thịnh vượng chính đáng. Tôi dùng quyền năng của mình để ban phước cho nhân gian.",
  },
  9: {
    number: 9,
    isMasterNumber: false,
    title: "Con Số 9 • Trái Tim Vị Nhân Sinh & Buông Bỏ (The Humanitarian)",
    coreVibration: "Từ bi, Bác ái, Bao dung, Tinh thần phụng sự toàn cầu",
    lifeMission: "Đóng lại những chu kỳ cũ, truyền cảm hứng lòng trắc ẩn và phụng sự nhân loại vượt qua ranh giới chủng tộc, biên giới.",
    talentAndCareer: ["Tổ chức phi chính phủ (NGO)", "Hoạt động xã hội / Môi trường", "Giáo dục nhân văn", "Nghệ sĩ triết lý"],
    loveVibe: "Tình yêu rộng lớn, giàu đức hy sinh; cần một người hiểu được tâm nguyện phụng sự cộng đồng của mình.",
    soulLesson: "Học cách buông bỏ quá khứ nhẹ nhàng, tha thứ cho người khác và cho phép bản thân được đón nhận tình yêu thương.",
    crystalAndColor: { color: "Vàng Đồng Cổ & Xanh Đại Dương", crystal: "Đá Lapis Lazuli & Mã Não Đỏ (Carnelian)" },
    affirmation: "Tôi buông bỏ mọi oán hận để tha thứ và thứ tha. Tôi là kênh dẫn của tình yêu thương và trí tuệ vũ trụ.",
  },
  11: {
    number: 11,
    isMasterNumber: true,
    title: "Master Number 11/2 • Ngọn Hải Đăng Trực Giác (The Spiritual Illuminator)",
    coreVibration: "Siêu trực giác, Kênh dẫn năng lượng cao, Thấu cảm tâm linh",
    lifeMission: "Đánh thức tâm thức người khác, đóng vai trò là cây cầu nối giữa thế giới tinh thần và thực tại thông qua tuệ giác sắc bén.",
    talentAndCareer: ["Nhà hướng dẫn tâm linh / Coach", "Nghệ sĩ truyền cảm hứng", "Nhà cải cách xã hội", "Chuyên gia chữa lành"],
    loveVibe: "Rung động tâm hồn cực cao, cần bạn đời có chiều sâu nhận thức để thấu hiểu thế giới nội tâm nhạy cảm.",
    soulLesson: "Vượt qua sự lo âu, nhạy cảm quá mức bằng thiền định và giữ chân vững vàng trên mặt đất (Grounding).",
    crystalAndColor: { color: "Bạch Kim & Bạc Tinh Thể", crystal: "Đá Selenite & Thạch Anh Trắng Tinh Thể" },
    affirmation: "Tôi là kênh dẫn ánh sáng thuần khiết. Trực giác siêu việt dẫn dắt tôi soi đường cho muôn người.",
  },
  22: {
    number: 22,
    isMasterNumber: true,
    title: "Master Number 22/4 • Bậc Thầy Kiến Tạo Ước Mơ (The Master Builder of Dreams)",
    coreVibration: "Tầm nhìn vĩ đại, Hiện thực hóa quy mô lớn, Kỷ luật thép",
    lifeMission: "Biến những ý tưởng không tưởng thành hiện thực cụ thể, để lại những di sản to lớn phục vụ lợi ích lâu dài cho nhân loại.",
    talentAndCareer: ["Kiến trúc sư tương lai", "Lãnh đạo quốc tế", "Nhà sáng lập tập đoàn công nghệ lớn", "Quy hoạch đô thị xanh"],
    loveVibe: "Trầm ổn, sâu sắc, cùng chia sẻ khát vọng vĩ đại; cần sự thấu cảm vì gánh nặng trách nhiệm lớn trên vai.",
    soulLesson: "Không để áp lực của trách nhiệm đè bẹp niềm vui sống; tin tưởng vào quyền năng kiến tạo từng bước một.",
    crystalAndColor: { color: "Vàng San Hô & Xanh Rừng Già", crystal: "Đá Cẩm Thạch & Thạch Anh Tóc Vàng" },
    affirmation: "Tôi có đủ sức mạnh và kỷ luật để biến những giấc mơ cao đẹp nhất thành hiện thực vững bền trên mặt đất.",
  },
  33: {
    number: 33,
    isMasterNumber: true,
    title: "Master Number 33/6 • Bậc Thầy Nâng Đỡ & Từ Bi Vô Lượng (The Master Healer)",
    coreVibration: "Tình thương vô điều kiện, Nâng cao rung động, Chữa lành toàn diện",
    lifeMission: "Nâng đỡ tinh thần nhân loại bằng lòng từ bi vô lượng, trở thành hiện thân của tình yêu thương và sự hy sinh cao cả.",
    talentAndCareer: ["Bậc thầy trị liệu tâm thể", "Nhà hoạt động bảo vệ trẻ em & hòa bình", "Lãnh tụ tinh thần nhân văn"],
    loveVibe: "Bao dung vô bờ bến, kết nối linh hồn sâu thẳm; tình yêu vượt lên trên những đòi hỏi vị kỷ thế tục.",
    soulLesson: "Bảo vệ năng lượng bản thân, không biến mình thành vật hy sinh cho sự độc hại của người khác.",
    crystalAndColor: { color: "Hồng Kim Cương & Xanh Thiên Đường", crystal: "Đá Kunzite & Thạch Anh Hồng Madagascar" },
    affirmation: "Tình yêu thương của tôi chữa lành mọi vết thương. Tôi an trú trong năng lượng từ bi vô biên của vũ trụ.",
  },
};

// ----------------------------------------------------------------------------
// THUẬT TOÁN TÍNH CUNG HOÀNG ĐẠO MẶT TRỜI (SUN SIGN)
// ----------------------------------------------------------------------------
export function calculateSunSign(day: number, month: number): SunSignData {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return SUN_SIGNS_DICT.Aries;
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return SUN_SIGNS_DICT.Taurus;
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return SUN_SIGNS_DICT.Gemini;
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return SUN_SIGNS_DICT.Cancer;
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return SUN_SIGNS_DICT.Leo;
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return SUN_SIGNS_DICT.Virgo;
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return SUN_SIGNS_DICT.Libra;
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return SUN_SIGNS_DICT.Scorpio;
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return SUN_SIGNS_DICT.Sagittarius;
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return SUN_SIGNS_DICT.Capricorn;
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return SUN_SIGNS_DICT.Aquarius;
  return SUN_SIGNS_DICT.Pisces;
}

// ----------------------------------------------------------------------------
// THUẬT TOÁN TÍNH SỐ CHỦ ĐẠO (LIFE PATH NUMBER)
// ----------------------------------------------------------------------------
function reduceToSingleDigit(num: number, allowMaster = true): number {
  if (allowMaster && (num === 11 || num === 22 || num === 33)) {
    return num;
  }
  let sum = num;
  while (sum > 9 && !(allowMaster && (sum === 11 || sum === 22 || sum === 33))) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
}

export function calculateLifePathNumber(day: number, month: number, year: number): number {
  // Phương pháp chuẩn Pythagoras: Rút gọn từng thành phần trước khi cộng tổng
  const redDay = reduceToSingleDigit(day, true);
  const redMonth = reduceToSingleDigit(month, true);
  const redYear = reduceToSingleDigit(year, true);

  const total = redDay + redMonth + redYear;
  return reduceToSingleDigit(total, true);
}

// Bảng số Pythagoras cho chữ cái
const PYTHAGOREAN_LETTER_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

const VOWELS = new Set(["A", "E", "I", "O", "U", "Y"]);

function removeVietnameseTones(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toUpperCase();
}

// Tính Chỉ Số Linh Hồn (Tổng các nguyên âm trong tên)
export function calculateSoulUrgeNumber(fullName: string): number {
  const clean = removeVietnameseTones(fullName);
  let sum = 0;
  for (const ch of clean) {
    if (VOWELS.has(ch) && PYTHAGOREAN_LETTER_MAP[ch]) {
      sum += PYTHAGOREAN_LETTER_MAP[ch];
    }
  }
  return reduceToSingleDigit(sum || 7, true);
}

// Tính Chỉ Số Sứ Mệnh / Biểu Đạt (Tổng tất cả chữ cái trong tên)
export function calculateExpressionNumber(fullName: string): number {
  const clean = removeVietnameseTones(fullName);
  let sum = 0;
  for (const ch of clean) {
    if (PYTHAGOREAN_LETTER_MAP[ch]) {
      sum += PYTHAGOREAN_LETTER_MAP[ch];
    }
  }
  return reduceToSingleDigit(sum || 1, true);
}

// Tính Chỉ Số Thái Độ (Ngày sinh + Tháng sinh)
export function calculateAttitudeNumber(day: number, month: number): number {
  return reduceToSingleDigit(day + month, false);
}

// Tính Năm Cá Nhân 2026 (Ngày sinh + Tháng sinh + Năm thế giới 2026 = 1)
export function calculatePersonalYear2026(day: number, month: number): number {
  const universalYear2026 = reduceToSingleDigit(2026, false); // 2 + 0 + 2 + 6 = 10 -> 1
  return reduceToSingleDigit(day + month + universalYear2026, false);
}

// Ước lượng Cung Mặt Trăng và Cung Mọc dựa trên giờ sinh và ngày sinh
export function estimateMoonAndRising(
  day: number,
  month: number,
  year: number,
  hour = 12
): { moon: MoonSignData; rising: AscendantSignData } {
  // Chu kỳ Mặt Trăng di chuyển qua 12 cung mỗi 2.5 ngày
  const moonIndex = (month * 2 + Math.floor(day / 2.5) + (year % 12)) % 12;
  const signs = [
    SUN_SIGNS_DICT.Aries,
    SUN_SIGNS_DICT.Taurus,
    SUN_SIGNS_DICT.Gemini,
    SUN_SIGNS_DICT.Cancer,
    SUN_SIGNS_DICT.Leo,
    SUN_SIGNS_DICT.Virgo,
    SUN_SIGNS_DICT.Libra,
    SUN_SIGNS_DICT.Scorpio,
    SUN_SIGNS_DICT.Sagittarius,
    SUN_SIGNS_DICT.Capricorn,
    SUN_SIGNS_DICT.Aquarius,
    SUN_SIGNS_DICT.Pisces,
  ];
  const moonSignRef = signs[moonIndex] || SUN_SIGNS_DICT.Cancer;

  // Cung mọc thay đổi khoảng 2 giờ một cung bắt đầu từ giờ mặt trời mọc (~06:00)
  const sunSignIndex = signs.findIndex((s) => s.nameEn === calculateSunSign(day, month).nameEn);
  const hourOffset = Math.floor(((hour - 6 + 24) % 24) / 2);
  const risingIndex = (sunSignIndex + hourOffset) % 12;
  const risingSignRef = signs[risingIndex] || SUN_SIGNS_DICT.Aries;

  return {
    moon: {
      nameVi: moonSignRef.nameVi,
      nameEn: moonSignRef.nameEn,
      emotionalNeed: `Cần cảm giác an toàn thuộc về ${moonSignRef.element}, được thấu hiểu không phán xét.`,
      hiddenHeart: `Nơi sâu thẳm tâm can: Người này giữ những cảm xúc chân thật theo phong cách ${moonSignRef.nameVi}.`,
      safeSpace: `Không gian tái tạo năng lượng: Nơi yên tĩnh mang năng lượng ${moonSignRef.element}.`,
    },
    rising: {
      nameVi: risingSignRef.nameVi,
      nameEn: risingSignRef.nameEn,
      firstImpression: `Ấn tượng đầu tiên toát lên khí chất của ${risingSignRef.nameVi}: ${risingSignRef.vibe}`,
      socialMask: `Phong thái đối ngoại: Tự tin, chuyên nghiệp với phong cách ${risingSignRef.modality}.`,
      outwardStyle: `Cách tiếp cận thế giới bên ngoài: Trực diện, phong thái cuốn hút của cung ${risingSignRef.nameVi}.`,
    },
  };
}

// ----------------------------------------------------------------------------
// HÀM TỔNG HỢP TOÀN BỘ SỐ HỌC MẶT TRỜI & CHIÊM TINH HỌC
// ----------------------------------------------------------------------------
export function generateSolarNumerologyProfile(input: SolarBirthInput): SolarNumerologyResult {
  const { fullName, solarDay, solarMonth, solarYear, birthHour = 12 } = input;

  const sunSign = calculateSunSign(solarDay, solarMonth);
  const lifePathNum = calculateLifePathNumber(solarDay, solarMonth, solarYear);
  const lifePathData = LIFE_PATH_NUMBERS_DICT[lifePathNum] || LIFE_PATH_NUMBERS_DICT[1];

  const soulUrge = calculateSoulUrgeNumber(fullName);
  const expression = calculateExpressionNumber(fullName);
  const attitude = calculateAttitudeNumber(solarDay, solarMonth);
  const personalYear = calculatePersonalYear2026(solarDay, solarMonth);

  const { moon: moonSign, rising: risingSign } = estimateMoonAndRising(
    solarDay,
    solarMonth,
    solarYear,
    birthHour
  );

  // Tính tỷ lệ nguyên tố ngũ hành phương Tây
  const elements = [sunSign.element, moonSign.emotionalNeed.includes("Lửa") ? "Lửa" : "Nước"];
  let fire = 30;
  let earth = 25;
  let air = 25;
  let water = 20;

  if (sunSign.element === "Lửa") { fire += 20; earth -= 5; air -= 5; water -= 10; }
  else if (sunSign.element === "Đất") { earth += 20; fire -= 5; air -= 5; water -= 10; }
  else if (sunSign.element === "Khí") { air += 20; fire -= 5; earth -= 5; water -= 10; }
  else { water += 20; fire -= 10; earth -= 5; air -= 5; }

  const dominantElement = sunSign.element;

  // Bản đồ cuộc đời & Kim chỉ nam thành công
  const cosmicIdentity = `${sunSign.archetype} • Rung Động Số ${lifePathNum}`;
  const coreDilemma = `Mâu thuẫn giữa khát vọng tỏa sáng độc bản (${sunSign.superpower}) và nỗi sợ bị phán xét, hội chứng Impostor Syndrome phổ biến ở thế hệ trẻ.`;
  const healingPathway = `Tích hợp năng lượng ${sunSign.element} với bài học Con số Chủ đạo ${lifePathNum}: Thực hành lắng nghe bản thân mỗi sáng, viết nhật ký biết ơn và thiết lập ranh giới cảm xúc rõ ràng.`;
  
  const idealCareerTracks = [
    ...lifePathData.talentAndCareer,
    `Nhà sáng tạo nội dung số (Digital Creator)`,
    `Chuyên gia tư vấn & Huấn luyện viên phát triển bản thân (Life Coach / Mentor)`,
  ];

  const personalYearThemes: Record<number, string> = {
    1: "Năm Khởi Đầu Mới: Gieo hạt mầm dự án mới, tự tin bứt phá vùng an toàn.",
    2: "Năm Hợp Tác & Kiên Nhẫn: Lắng nghe, kết nối đồng đội, chăm sóc nội tâm.",
    3: "Năm Tỏa Sáng Sáng Tạo: Mở rộng giao tiếp, khẳng định phong cách cá nhân.",
    4: "Năm Củng Cố Nền Móng: Kỷ luật tài chính, học thêm kỹ năng chuyên sâu.",
    5: "Năm Tự Do & Chuyển Mình: Đón nhận cơ hội du lịch, thay đổi môi trường mới.",
    6: "Năm Gia Đình & Trách Nhiệm: Chăm sóc người thân, vun đắp tình cảm bền vững.",
    7: "Năm Tĩnh Tâm & Tri Thức: Đào sâu chuyên môn, chữa lành tâm hồn bằng thiền định.",
    8: "Năm Gặt Hái Thịnh Vượng: Đỉnh cao tài chính, thăng tiến sự nghiệp, khẳng định vị thế.",
    9: "Năm Hoàn Tất & Bao Dung: Buông bỏ những điều cũ kỹ, chuẩn bị cho chu kỳ 9 năm mới.",
  };

  return {
    personalInfo: {
      fullName: fullName || "Đồng Môn Chiêm Nghiệm",
      birthDateStr: `${solarDay}/${solarMonth}/${solarYear}`,
      birthHourStr: `${birthHour}:00`,
    },
    numerology: {
      lifePath: lifePathData,
      soulUrgeNumber: soulUrge,
      soulUrgeMeaning: `Khát vọng cháy bỏng trong tim hướng về con số ${soulUrge}: Tìm kiếm sự hòa hợp, tự do biểu đạt chân thực bản thân.`,
      expressionNumber: expression,
      expressionMeaning: `Năng lực bẩm sinh được vũ trụ ban tặng mang rung động số ${expression}: Khả năng dẫn dắt và giải quyết các bài toán hóc búa.`,
      attitudeNumber: attitude,
      attitudeMeaning: `Cách bạn phản ứng với thế giới bên ngoài (Số thái độ ${attitude}): Nhanh nhẹn, nhiệt tình và giàu lòng tự trọng.`,
      personalYear2026: personalYear,
      personalYearTheme: personalYearThemes[personalYear] || "Năm cân bằng và hoàn thiện bản thân.",
      growthCycle: `Đang ở chu kỳ rung động ${lifePathNum % 3 === 0 ? "Khai Sáng Tâm Thức" : "Hiện Thực Hóa Mục Tiêu"}.`,
    },
    astrology: {
      sunSign,
      moonSign,
      risingSign,
      elementBalance: {
        fire,
        earth,
        air,
        water,
        dominantElement,
      },
    },
    lifeMap: {
      cosmicIdentity,
      coreDilemma,
      healingPathway,
      idealCareerTracks,
      relationshipCompatibility: {
        bestMatches: [`Người mang cung ${sunSign.element} tương hợp`, `Người có Con số Chủ đạo ${lifePathNum === 1 ? "3, 5" : lifePathNum === 2 ? "6, 8" : "1, 7"}`],
        growthChallenges: ["Cần tránh những mối quan hệ độc hại thao túng cảm xúc (gaslighting)."],
        advice: "Tình yêu chân thật bắt đầu từ việc bạn chấp nhận trọn vẹn cả phần ánh sáng lẫn phần bóng tối của chính mình.",
      },
      sacredAffirmation: lifePathData.affirmation,
    },
  };
}
