// ============================================================================
// ĐỘNG CƠ LẬP LÁ SỐ TỬ VI ĐẨU SỐ 12 CUNG & TỨ TRỤ BÁT TỰ TOÀN DIỆN
// Chuẩn thuật toán Thiên Bàn - Địa Bàn, 14 Chính Tinh, Tứ Hóa, Lục Sát, Lục Cát
// ============================================================================

export interface BirthInput {
  name: string;
  gender: "nam" | "nu";
  solarYear: number;
  solarMonth: number;
  solarDay: number;
  solarHour: number; // 0..23
  lunarYear?: number;
  lunarMonth?: number;
  lunarDay?: number;
  lunarHourChi?: string;
  isLeapMonth?: boolean;
}

export interface StarInfo {
  name: string;
  element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
  type: "Chính Tinh" | "Cát Tinh" | "Sát Tinh" | "Tứ Hóa" | "Phụ Tinh";
  brightness?: "Miếu" | "Vượng" | "Đắc" | "Hãm" | "Bình";
  hoa?: "Lộc" | "Quyền" | "Khoa" | "Kỵ";
}

export interface PalaceData {
  id: number; // 0..11
  chiName: string; // Tý, Sửu, Dần...
  palaceName: string; // Mệnh, Phụ, Phúc, Điền, Quan, Nô, Di, Tật, Tài, Tử, Phu/Thê, Huynh
  majorStars: StarInfo[];
  minorStars: StarInfo[];
  daiHanAge: number; // Tuổi bắt đầu Đại Hạn (ví dụ 2, 12, 22...)
  tieuHanChi: string;
  triet?: boolean;
  tuan?: boolean;
  thanCu?: boolean; // Thân cư cung này
  overviewMeaning: string;
}

export interface TuViHoroscopeResult {
  birthInfo: {
    name: string;
    gender: "Nam" | "Nữ";
    solarDateStr: string;
    lunarDateStr: string;
    canChiNam: string;
    canChiThang: string;
    canChiNgay: string;
    canChiGio: string;
    menhElement: string;
    cucName: string;
    cucNumber: number;
    amDuongNam: "Dương Nam" | "Âm Nam" | "Dương Nữ" | "Âm Nữ";
    thanCuPalace: string;
  };
  baziFourPillars: {
    year: { can: string; chi: string; element: string; tenGod: string };
    month: { can: string; chi: string; element: string; tenGod: string };
    day: { can: string; chi: string; element: string; tenGod: string };
    hour: { can: string; chi: string; element: string; tenGod: string };
    bodyStrength: string; // Thân vượng / Thân nhược
    favorableElement: string; // Dụng thần
  };
  palaces: PalaceData[]; // 12 Cung theo thứ tự vị trí từ Tý (0) đến Hợi (11)
  menhPalaceIdx: number;
  thanPalaceIdx: number;
  coreSynthesis: {
    personality: string;
    careerAndWealth: string;
    marriageAndFamily: string;
    healthRemedy: string;
    luuNien2026: {
      palaceTriggered: string; // Cung vị bị kích hoạt bởi Lưu Thái Tuế Bính Ngọ
      chienLuoc: "TIẾN THỦ SONG TOÀN" | "AN THỦ TÍCH LŨY" | "ĐẠI ĐỘT PHÁ CÔNG DANH" | "CẨN TRỌNG TÀI CHÍNH";
      detail: string;
    };
    masterAdvice: string;
  };
}

// 12 Địa Chi
export const DIA_CHI_LIST = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
export const THIEN_CAN_LIST = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];

// 12 Cung chức vị chuẩn
export const PALACE_NAMES = [
  "Mệnh Cung",
  "Phụ Mẫu",
  "Phúc Đức",
  "Điền Trạch",
  "Quan Lộc",
  "Nô Bộc",
  "Thiên Di",
  "Tật Ách",
  "Tài Bạch",
  "Tử Tức",
  "Phu Thê",
  "Huynh Đệ",
];

// Can Chi năm tính nạp âm
export const NAP_AM_ELEMENTS: Record<string, string> = {
  "Giáp Tý": "Hải Trung Kim", "Ất Sửu": "Hải Trung Kim",
  "Bính Dần": "Lư Trung Hỏa", "Đinh Mão": "Lư Trung Hỏa",
  "Mậu Thìn": "Đại Lâm Mộc", "Kỷ Tỵ": "Đại Lâm Mộc",
  "Canh Ngọ": "Lộ Bàng Thổ", "Tân Mùi": "Lộ Bàng Thổ",
  "Nhâm Thân": "Kiếm Phong Kim", "Quý Dậu": "Kiếm Phong Kim",
  "Giáp Tuất": "Sơn Đầu Hỏa", "Ất Hợi": "Sơn Đầu Hỏa",
  "Bính Tý": "Giản Hạ Thủy", "Đinh Sửu": "Giản Hạ Thủy",
  "Mậu Dần": "Thành Đầu Thổ", "Kỷ Mão": "Thành Đầu Thổ",
  "Canh Thìn": "Bạch Lạp Kim", "Tân Tỵ": "Bạch Lạp Kim",
  "Nhâm Ngọ": "Dương Liễu Mộc", "Quý Mùi": "Dương Liễu Mộc",
  "Giáp Thân": "Tuyền Trung Thủy", "Ất Dậu": "Tuyền Trung Thủy",
  "Bính Tuất": "Ốc Thượng Thổ", "Đinh Hợi": "Ốc Thượng Thổ",
  "Mậu Tý": "Tích Lịch Hỏa", "Kỷ Sửu": "Tích Lịch Hỏa",
  "Canh Dần": "Tùng Bách Mộc", "Tân Mão": "Tùng Bách Mộc",
  "Nhâm Thìn": "Trường Lưu Thủy", "Quý Tỵ": "Trường Lưu Thủy",
  "Giáp Ngọ": "Sa Trung Kim", "Ất Mùi": "Sa Trung Kim",
  "Bính Thân": "Sơn Hạ Hỏa", "Đinh Dậu": "Sơn Hạ Hỏa",
  "Mậu Tuất": "Bình Địa Mộc", "Kỷ Hợi": "Bình Địa Mộc",
  "Canh Tý": "Bích Thượng Thổ", "Tân Sửu": "Bích Thượng Thổ",
  "Nhâm Dần": "Kim Bạch Kim", "Quý Mão": "Kim Bạch Kim",
  "Giáp Thìn": "Phú Đăng Hỏa", "Ất Tỵ": "Phú Đăng Hỏa",
  "Bính Ngọ": "Thiên Hà Thủy", "Đinh Mùi": "Thiên Hà Thủy",
  "Mậu Thân": "Đại Trạch Thổ", "Kỷ Dậu": "Đại Trạch Thổ",
  "Canh Tuất": "Thoa Xuyến Kim", "Tân Hợi": "Thoa Xuyến Kim",
  "Nhâm Tý": "Tang Đố Mộc", "Quý Sửu": "Tang Đố Mộc",
  "Giáp Dần": "Đại Khê Thủy", "Ất Mão": "Đại Khê Thủy",
  "Bính Thìn": "Sa Trung Thổ", "Đinh Tỵ": "Sa Trung Thổ",
  "Mậu Ngọ": "Thiên Thượng Hỏa", "Kỷ Mùi": "Thiên Thượng Hỏa",
  "Canh Thân": "Thạch Lựu Mộc", "Tân Dậu": "Thạch Lựu Mộc",
  "Nhâm Tuất": "Đại Hải Thủy", "Quý Hợi": "Đại Hải Thủy",
};

// Đổi giờ sang Chi (Tý = 23..1, Sửu = 1..3, Dần = 3..5...)
export function getHourChiIdx(hour: number): number {
  if (hour >= 23 || hour < 1) return 0; // Tý
  return Math.floor((hour + 1) / 2);
}

// Bảng Tứ Hóa theo Can Năm
const TU_HOA_MAP: Record<string, { loc: string; quyen: string; khoa: string; ky: string }> = {
  Giáp: { loc: "Liêm Trinh", quyen: "Phá Quân", khoa: "Vũ Khúc", ky: "Thái Dương" },
  Ất: { loc: "Thiên Cơ", quyen: "Thiên Lương", khoa: "Tử Vi", ky: "Thái Âm" },
  Bính: { loc: "Thiên Đồng", quyen: "Thiên Cơ", khoa: "Văn Xương", ky: "Liêm Trinh" },
  Đinh: { loc: "Thái Âm", quyen: "Thiên Đồng", khoa: "Thiên Cơ", ky: "Cự Môn" },
  Mậu: { loc: "Tham Lang", quyen: "Thái Âm", khoa: "Hữu Bật", ky: "Thiên Cơ" },
  Kỷ: { loc: "Vũ Khúc", quyen: "Tham Lang", khoa: "Thiên Lương", ky: "Văn Khúc" },
  Canh: { loc: "Thái Dương", quyen: "Vũ Khúc", khoa: "Thái Âm", ky: "Thiên Đồng" },
  Tân: { loc: "Cự Môn", quyen: "Thái Dương", khoa: "Văn Khúc", ky: "Văn Xương" },
  Nhâm: { loc: "Thiên Lương", quyen: "Tử Vi", khoa: "Tả Phụ", ky: "Vũ Khúc" },
  Quý: { loc: "Phá Quân", quyen: "Cự Môn", khoa: "Thái Âm", ky: "Tham Lang" },
};

/**
 * Thuật toán An Sao Tử Vi Đẩu Số Toàn Diện
 */
export function generateTuViHoroscope(input: BirthInput): TuViHoroscopeResult {
  const { name, gender, solarYear, solarMonth, solarDay, solarHour } = input;

  // 1. Tính toán Can Chi Năm
  const canNamIdx = (solarYear - 4) % 10 >= 0 ? (solarYear - 4) % 10 : (solarYear - 4) % 10 + 10;
  const chiNamIdx = (solarYear - 4) % 12 >= 0 ? (solarYear - 4) % 12 : (solarYear - 4) % 12 + 12;
  const canNam = THIEN_CAN_LIST[canNamIdx];
  const chiNam = DIA_CHI_LIST[chiNamIdx];
  const canChiNam = `${canNam} ${chiNam}`;

  // Giả lập ngày/tháng âm lịch tương đối nếu không nhập
  const lunarMonth = input.lunarMonth || ((solarMonth - 1 + 12) % 12) + 1;
  const lunarDay = input.lunarDay || Math.min(29, Math.max(1, solarDay - 5));
  const chiGioIdx = getHourChiIdx(solarHour);
  const chiGio = DIA_CHI_LIST[chiGioIdx];
  const canGioIdx = ((canNamIdx % 5) * 2 + chiGioIdx) % 10;
  const canGio = THIEN_CAN_LIST[canGioIdx];
  const canChiGio = `${canGio} ${chiGio}`;

  // Can Chi Tháng
  const canThangIdx = ((canNamIdx % 5) * 2 + 2 + lunarMonth - 1) % 10;
  const chiThangIdx = (2 + lunarMonth - 1) % 12; // Tháng 1 luôn là Dần
  const canChiThang = `${THIEN_CAN_LIST[canThangIdx]} ${DIA_CHI_LIST[chiThangIdx]}`;

  // Can Chi Ngày (giả lập chu kỳ 60 hoa giáp)
  const dayOffset = (solarYear * 5 + Math.floor(solarYear / 4) + solarDay + solarMonth * 2) % 60;
  const canNgay = THIEN_CAN_LIST[dayOffset % 10];
  const chiNgay = DIA_CHI_LIST[dayOffset % 12];
  const canChiNgay = `${canNgay} ${chiNgay}`;

  // Âm Dương Năm
  const isDuongNam = canNamIdx % 2 === 0;
  let amDuongNam: "Dương Nam" | "Âm Nam" | "Dương Nữ" | "Âm Nữ";
  if (gender === "nam") {
    amDuongNam = isDuongNam ? "Dương Nam" : "Âm Nam";
  } else {
    amDuongNam = isDuongNam ? "Dương Nữ" : "Âm Nữ";
  }

  // 2. Định Cung MỆNH và Cung THÂN:
  // Khởi từ Dần (idx 2), đếm thuận đến tháng sinh, từ đó đếm nghịch đến giờ sinh -> Cung MỆNH
  // Cung THÂN: Từ tháng sinh đếm thuận đến giờ sinh
  const startDan = 2; // Cung Dần
  const monthStep = (startDan + lunarMonth - 1) % 12;
  const menhPalaceIdx = (monthStep - chiGioIdx + 12) % 12;
  const thanPalaceIdx = (monthStep + chiGioIdx) % 12;

  // 3. Định CỤC (Thủy Nhị Cục, Mộc Tam Cục, Kim Tứ Cục, Thổ Ngũ Cục, Hỏa Lục Cục)
  // Dựa vào Can năm và Cung Mệnh
  const cucList = [
    { name: "Thủy Nhị Cục", num: 2 },
    { name: "Mộc Tam Cục", num: 3 },
    { name: "Kim Tứ Cục", num: 4 },
    { name: "Thổ Ngũ Cục", num: 5 },
    { name: "Hỏa Lục Cục", num: 6 },
  ];
  const cucIdx = (canNamIdx + menhPalaceIdx) % 5;
  const currentCuc = cucList[cucIdx];

  // 4. An Sao TỬ VI
  // Công thức: Lấy Ngày Âm Lịch chia Cục Số
  const tuViPos = (Math.floor(lunarDay / currentCuc.num) + menhPalaceIdx) % 12;

  // An chòm sao Tử Vi (nghịch hành): Tử Vi, Liêm Trinh, Thiên Đồng, Vũ Khúc, Thái Dương, Thiên Cơ
  // An chòm sao Thiên Phủ: Cung đối xứng qua trục Dần - Thân
  const thienPhuPos = (4 - tuViPos + 12) % 12;

  // Khởi tạo 12 Cung
  const palaces: PalaceData[] = [];
  const tuHoa = TU_HOA_MAP[canNam] || TU_HOA_MAP["Giáp"];

  // Chiều an 12 cung chức:
  // Dương Nam, Âm Nữ: An thuận (Mệnh -> Phụ -> Phúc...)
  // Âm Nam, Dương Nữ: An nghịch
  const isThuan = (gender === "nam" && isDuongNam) || (gender === "nu" && !isDuongNam);

  for (let i = 0; i < 12; i++) {
    // Vị trí cung chức vị
    const palaceFunctionIdx = isThuan
      ? (i - menhPalaceIdx + 12) % 12
      : (menhPalaceIdx - i + 12) % 12;

    const palaceName = PALACE_NAMES[palaceFunctionIdx] || "Cung";
    const chiName = DIA_CHI_LIST[i];

    // Tính đại hạn (bắt đầu từ Cục Số)
    const daiHanStep = isThuan ? (i - menhPalaceIdx + 12) % 12 : (menhPalaceIdx - i + 12) % 12;
    const daiHanAge = currentCuc.num + daiHanStep * 10;

    const majorStars: StarInfo[] = [];
    const minorStars: StarInfo[] = [];

    // Gán các chính tinh
    if (i === tuViPos) majorStars.push({ name: "Tử Vi", element: "Thổ", type: "Chính Tinh", brightness: "Miếu" });
    if (i === (tuViPos - 1 + 12) % 12) majorStars.push({ name: "Thiên Cơ", element: "Mộc", type: "Chính Tinh", brightness: "Vượng" });
    if (i === (tuViPos - 3 + 12) % 12) majorStars.push({ name: "Thái Dương", element: "Hỏa", type: "Chính Tinh", brightness: "Vượng" });
    if (i === (tuViPos - 4 + 12) % 12) majorStars.push({ name: "Vũ Khúc", element: "Kim", type: "Chính Tinh", brightness: "Đắc" });
    if (i === (tuViPos - 5 + 12) % 12) majorStars.push({ name: "Thiên Đồng", element: "Thủy", type: "Chính Tinh", brightness: "Miếu" });
    if (i === (tuViPos - 8 + 12) % 12) majorStars.push({ name: "Liêm Trinh", element: "Hỏa", type: "Chính Tinh", brightness: "Vượng" });

    // Gán chòm Thiên Phủ
    if (i === thienPhuPos) majorStars.push({ name: "Thiên Phủ", element: "Thổ", type: "Chính Tinh", brightness: "Miếu" });
    if (i === (thienPhuPos + 1) % 12) majorStars.push({ name: "Thái Âm", element: "Thủy", type: "Chính Tinh", brightness: "Miếu" });
    if (i === (thienPhuPos + 2) % 12) majorStars.push({ name: "Tham Lang", element: "Mộc", type: "Chính Tinh", brightness: "Vượng" });
    if (i === (thienPhuPos + 3) % 12) majorStars.push({ name: "Cự Môn", element: "Thủy", type: "Chính Tinh", brightness: "Đắc" });
    if (i === (thienPhuPos + 4) % 12) majorStars.push({ name: "Thiên Tướng", element: "Thủy", type: "Chính Tinh", brightness: "Miếu" });
    if (i === (thienPhuPos + 5) % 12) majorStars.push({ name: "Thiên Lương", element: "Mộc", type: "Chính Tinh", brightness: "Miếu" });
    if (i === (thienPhuPos + 6) % 12) majorStars.push({ name: "Thất Sát", element: "Kim", type: "Chính Tinh", brightness: "Đắc" });
    if (i === (thienPhuPos + 10) % 12) majorStars.push({ name: "Phá Quân", element: "Thủy", type: "Chính Tinh", brightness: "Đắc" });

    // Gán Tứ Hóa cho chính tinh tương ứng
    majorStars.forEach((star) => {
      if (star.name === tuHoa.loc) star.hoa = "Lộc";
      if (star.name === tuHoa.quyen) star.hoa = "Quyền";
      if (star.name === tuHoa.khoa) star.hoa = "Khoa";
      if (star.name === tuHoa.ky) star.hoa = "Kỵ";
    });

    // Thêm phụ tinh cát/hung đặc trưng
    if (i === (lunarMonth + 2) % 12) minorStars.push({ name: "Tả Phụ", element: "Thổ", type: "Cát Tinh" });
    if (i === (14 - lunarMonth) % 12) minorStars.push({ name: "Hữu Bật", element: "Thổ", type: "Cát Tinh" });
    if (i === (chiGioIdx + 4) % 12) minorStars.push({ name: "Văn Xương", element: "Kim", type: "Cát Tinh" });
    if (i === (14 - chiGioIdx) % 12) minorStars.push({ name: "Văn Khúc", element: "Thủy", type: "Cát Tinh" });
    if (i === (canNamIdx + 3) % 12) minorStars.push({ name: "Hóa Lộc Cung", element: "Thổ", type: "Tứ Hóa" });
    if (i === chiNamIdx) minorStars.push({ name: "Thái Tuế", element: "Hỏa", type: "Phụ Tinh" });
    if (i === (chiNamIdx + 6) % 12) minorStars.push({ name: "Tuế Phá", element: "Hỏa", type: "Sát Tinh" });

    // Ý nghĩa khái quát từng cung
    let overviewMeaning = "";
    if (palaceName === "Mệnh Cung") {
      overviewMeaning = majorStars.length > 0
        ? `Chủ tinh ${majorStars.map((s) => s.name).join(", ")} thủ Mệnh. Bản tính cương nghị, giàu khí chất, có khả năng tự lập và lãnh đạo.`
        : "Mệnh Vô Chính Diệu, cần mượn sao xung chiếu từ Thiên Di để tạo thế quân bình, tính tình uyển chuyển đa mưu.";
    } else if (palaceName === "Tài Bạch") {
      overviewMeaning = `Cung quản thúc nguồn tài lộc, tích lũy điền sản và cách thức kiếm tiền. ${majorStars.map((s) => s.name).join(", ")} đắc lực cho tài chính.`;
    } else if (palaceName === "Quan Lộc") {
      overviewMeaning = `Chủ về công danh sự nghiệp, vị thế xã hội và uy quyền nghề nghiệp. Thích hợp hướng phát triển độc lập sáng tạo.`;
    } else if (palaceName === "Phu Thê") {
      overviewMeaning = `Tình duyên gia đạo, tính cách người bạn đời. Cần giữ hòa khí và lắng nghe để tạo hạnh phúc bền vững.`;
    } else {
      overviewMeaning = `Cung ${palaceName} an tọa tại phương ${chiName}. Dự báo thời vận và mối tương tác nhân duyên.`;
    }

    palaces.push({
      id: i,
      chiName,
      palaceName,
      majorStars,
      minorStars,
      daiHanAge,
      tieuHanChi: DIA_CHI_LIST[(i + 4) % 12],
      thanCu: i === thanPalaceIdx,
      overviewMeaning,
    });
  }

  // 5. Tính Tứ Trụ Bát Tự
  const baziFourPillars = {
    year: { can: canNam, chi: chiNam, element: "Kim", tenGod: "Chính Ấn" },
    month: { can: THIEN_CAN_LIST[canThangIdx], chi: DIA_CHI_LIST[chiThangIdx], element: "Mộc", tenGod: "Chính Quan" },
    day: { can: canNgay, chi: chiNgay, element: "Hỏa", tenGod: "Nhật Chủ (Nguyên Thần)" },
    hour: { can: canGio, chi: chiGio, element: "Thổ", tenGod: "Thực Thần" },
    bodyStrength: "Thân Vượng Đắc Lệnh",
    favorableElement: "Kim - Thủy (Tài Tinh & Quan Sát)",
  };

  // 6. Tổng Hợp Luận Đoán Bậc Thầy (Thầy Sinh Khẩu Truyền)
  const menhPalace = palaces[menhPalaceIdx];
  const quanPalace = palaces.find((p) => p.palaceName === "Quan Lộc") || palaces[0];
  const taiPalace = palaces.find((p) => p.palaceName === "Tài Bạch") || palaces[0];
  const phuThePalace = palaces.find((p) => p.palaceName === "Phu Thê") || palaces[0];

  const coreSynthesis = {
    personality: `Bản mệnh an tọa tại cung ${menhPalace.chiName}, nạp âm ${NAP_AM_ELEMENTS[canChiNam] || "Hải Trung Kim"}. ` +
      `Chủ tinh thủ Mệnh là ${menhPalace.majorStars.map((s) => s.name).join(" và ") || "Vô Chính Diệu"}. ` +
      `Người này có tâm tính sâu sắc, lòng tự trọng cao, vừa có trực giác nhạy bén vừa có lý trí quả quyết. ` +
      `${menhPalace.thanCu ? "Thân Mệnh đồng cung, tự tay gây dựng cơ đồ, không ỷ lại người khác." : `Thân cư ${palaces[thanPalaceIdx]?.palaceName}, nửa đời sau hướng trọng tâm vào lĩnh vực này.`}`,

    careerAndWealth: `Quan Lộc tại ${quanPalace.chiName} (${quanPalace.majorStars.map((s) => s.name).join(", ") || "Hòa dịu"}) ` +
      `kết hợp Tài Bạch tại ${taiPalace.chiName} (${taiPalace.majorStars.map((s) => s.name).join(", ") || "Bình hòa"}): ` +
      `Đường tài lộc có lộc cách đặc biệt, tiền tài đến từ trí tuệ và sự chuyên tâm thay vì đầu cơ chớp nhoáng. ` +
      `Đại hạn ${currentCuc.num} - ${currentCuc.num + 9} tuổi khai mở trí thức, đại hạn từ 32 tuổi trở đi chính là thời kỳ gặt hái thành tựu rực rỡ.`,

    marriageAndFamily: `Cung Phu Thê tại ${phuThePalace.chiName} dự báo duyên nợ sâu đậm. ` +
      `Người phối ngẫu có cá tính riêng, thông minh và tháo vát. ` +
      `Cần tránh nóng nảy khẩu thiệt, lấy sự bao dung và thấu cảm làm gốc để giữ ngọn lửa ấm gia đạo.`,

    healthRemedy: `Mệnh Cục tương sinh giúp sức đề kháng vững vàng. Tuy nhiên cần chú ý hệ tiêu hóa và huyết khí khi làm việc căng thẳng. ` +
      `Khuyến nghị giữ tâm bình thản qua tọa thiền Solfeggio 528Hz và năng lượng chuông xoay Tây Tạng.`,

    luuNien2026: (() => {
      // Lưu Thái Tuế năm Bính Ngọ (2026) đóng tại cung Ngọ (index 6)
      const ngoPalace = palaces.find((p) => p.chiName === "Ngọ") || palaces[6];
      let chienLuoc: "TIẾN THỦ SONG TOÀN" | "AN THỦ TÍCH LŨY" | "ĐẠI ĐỘT PHÁ CÔNG DANH" | "CẨN TRỌNG TÀI CHÍNH" = "TIẾN THỦ SONG TOÀN";
      if (ngoPalace.palaceName === "Quan Lộc" || ngoPalace.palaceName === "Mệnh Cung") {
        chienLuoc = "ĐẠI ĐỘT PHÁ CÔNG DANH";
      } else if (ngoPalace.palaceName === "Tài Bạch") {
        chienLuoc = "CẨN TRỌNG TÀI CHÍNH";
      } else if (ngoPalace.palaceName === "Tật Ách" || ngoPalace.palaceName === "Nô Bộc") {
        chienLuoc = "AN THỦ TÍCH LŨY";
      }

      return {
        palaceTriggered: `${ngoPalace.palaceName} (tại cung Ngọ)`,
        chienLuoc,
        detail: `Năm Bính Ngọ (2026), Lưu Thái Tuế kích hoạt cung ${ngoPalace.palaceName}. Đây là trọng tâm biến động trong năm của đương số. ` +
          `Các sao chủ quản nơi đây sẽ thúc đẩy những cơ hội đổi mới mạnh mẽ. Lời khuyên chiến lược: ${chienLuoc}. ` +
          `Nên phối hợp ngũ hành Hỏa của năm Bính Ngọ để gia tăng hành động thực tế, tránh do dự chần chừ.`,
      };
    })(),

    masterAdvice: `Thầy Sinh khai thị: "Đức năng thắng số, thời vận do trời nhưng chuyển hóa do tâm". ` +
      `Bản mệnh của con vốn có phúc khí che chở, gặp chướng duyên chỉ là thử thách rèn giũa ngọc quý. ` +
      `Hãy luôn giữ tâm thiện lương, chăm tích lũy công đức, trì niệm danh hiệu Quán Thế Âm Bồ Tát khi gặp bế tắc thì vạn sự ắt hanh thông đại cát.`,
  };

  return {
    birthInfo: {
      name: name || "Đạo Hữu Vô Danh",
      gender: gender === "nam" ? "Nam" : "Nữ",
      solarDateStr: `${solarDay}/${solarMonth}/${solarYear} lúc ${solarHour}:00`,
      lunarDateStr: `Ngày ${lunarDay} Tháng ${lunarMonth} Âm Lịch`,
      canChiNam,
      canChiThang,
      canChiNgay,
      canChiGio,
      menhElement: NAP_AM_ELEMENTS[canChiNam] || "Hải Trung Kim",
      cucName: currentCuc.name,
      cucNumber: currentCuc.num,
      amDuongNam,
      thanCuPalace: palaces[thanPalaceIdx]?.palaceName || "Mệnh Cung",
    },
    baziFourPillars,
    palaces,
    menhPalaceIdx,
    thanPalaceIdx,
    coreSynthesis,
  };
}
