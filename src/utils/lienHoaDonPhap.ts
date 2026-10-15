import { CHU_DICH_64_QUE, IChingHexagramData } from "./easternOccult";

export type GenderType = "nam" | "nu";

export type DivinationMethodType =
  | "coin-ritual"
  | "thoi-khong-live"
  | "seri-tien"
  | "phone-plate"
  | "chan-huong-la"
  | "dien-co";

export interface CanChiTimeInfo {
  solarDate: string; // YYYY-MM-DD HH:mm:ss
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  canChiNam: string;
  canChiThang: string;
  canChiNgay: string;
  canChiGio: string;
  namIndex: number; // 1..12
  thangIndex: number; // 1..12
  ngayIndex: number; // 1..30
  gioIndex: number; // 1..12
  p: number; // (Năm + Tháng + Ngày) % 8 (dư 0 lấy 8)
  t: number; // (Năm + Tháng + Ngày + Giờ) % 8 (dư 0 lấy 8)
  d: number; // (Năm + Tháng + Ngày + Giờ) % 6 (dư 0 lấy 6)
}

export interface SeriMoneyAnalysis {
  rawInput: string;
  cleanDigits: string;
  prefixStr: string;
  firstHalf: string;
  secondHalf: string;
  sumFirstHalf: number;
  sumSecondHalf: number;
  sumTotal: number;
  p: number;
  t: number;
  d: number;
  fengShuiNote: string;
}

export interface PhonePlateAnalysis {
  rawInput: string;
  cleanDigits: string;
  type: "phone" | "plate";
  firstPart: string;
  secondPart: string;
  sumFirst: number;
  sumSecond: number;
  sumTotal: number;
  p: number;
  t: number;
  d: number;
  energyVibe: string;
}

export interface DonResult {
  p: number; // Quái Phải (Thượng)
  t: number; // Quái Trái (Hạ)
  d: number; // Hào động 1..6
  dongTren: boolean; // d >= 4
}

export interface KhongThoiSu {
  seq: number;
  p: number;
  t: number;
  d: number;
  dongTren: boolean;
  pChanh: number[];
  tChanh: number[];
  pHo: number[];
  tHo: number[];
  pBien: number[];
  tBien: number[];
  chanhName: string;
  hoName: string;
  bienName: string;
  taQuaiName: string;
  taQuaiNumber: number;
  suQuaiName: string;
  suQuaiNumber: number;
  dongViTriText: string;
  menhCungQuaiName: string; // Mệnh Quái tại Hổ
  menhCungQuaiNumber: number;
  chanhForm: string; // Dạng P/TA, TA/C, TA/Q, TA/T, TA/H
  lucThanMatrix: {
    symbol: string;
    label: string;
    meaning: string;
    element: string;
    isMenhCung?: boolean;
  }[];
  iChingDetails: {
    chanh: IChingHexagramData | null;
    ho: IChingHexagramData | null;
    bien: IChingHexagramData | null;
  };
}

export interface CaseStudySample {
  id: string;
  title: string;
  p: number;
  t: number;
  d: number;
  gender: GenderType;
  context: string;
  teacherAnalysis: string;
}

export interface BanQuaiKienResult {
  phaiInput: number;
  traiInput: number;
  dongInput: number;
  gender: GenderType;
  totalTimeSlots: number; // 5, 9 hoặc 13 không thời sự
  khongThoiList: KhongThoiSu[];
  tienDe: KhongThoiSu;
  luanDoan: {
    taiLoc: {
      title: string;
      content: string;
      status: "cát" | "bình" | "hung";
      chiTiet: string;
    };
    phongThuy: {
      title: string;
      toaHuong: string;
      matTienHem: string;
      content: string;
      status: "cát" | "bình" | "hung";
    };
    giaDao: {
      title: string;
      menhCungAnalysis: string;
      nhanSuLienHe: string;
      content: string;
      status: "cát" | "bình" | "hung";
    };
    sucKhoe: {
      title: string;
      nguHanhThe: string;
      boViCoThe: string;
      content: string;
      status: "cát" | "bình" | "hung";
    };
    ungKy: {
      title: string;
      thoiGianBienChuyen: string;
      chienLuoc: "ĐẠI TIẾN THỪA THẮNG" | "TRUNG ĐẠO THĂNG TRẦM" | "AN THỦ TỊNH DƯỠNG" | "HOÃN BINH CHỜ THỜI";
      loiKhuyenHanhDong: string;
      tienThoaiThan?: {
        type: "TIẾN THẦN (进神)" | "THOÁI THẦN (退神)" | "BÌNH HÒA";
        detail: string;
      };
      tuyetXuPhungSinh?: {
        isTuyetXu: boolean;
        detail: string;
      };
    };
    minhTriet: {
      title: string;
      counsel: string;
      practice: string;
    };
  };
}

export const TIEN_THIEN_BAT_QUAI: Record<
  number,
  {
    name: string;
    element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
    direction: string;
    oppositeDirection: string;
    trigram: number[];
    symbol: string;
    organ: string;
    diseaseRisk: string;
  }
> = {
  1: {
    name: "Kiền",
    element: "Kim",
    direction: "Tây Bắc",
    oppositeDirection: "Đông Nam",
    trigram: [1, 1, 1],
    symbol: "☰",
    organ: "Đầu, não bộ, xương cốt, phổi, đại tràng",
    diseaseRisk: "Đau đầu kinh niên, khí huyết nghẽn, ho khan, viêm phế quản",
  },
  2: {
    name: "Đoài",
    element: "Kim",
    direction: "Chính Tây",
    oppositeDirection: "Chính Đông",
    trigram: [0, 1, 1],
    symbol: "☱",
    organ: "Cổ họng, miệng, răng, thanh quản, phế quản",
    diseaseRisk: "Viêm họng, bệnh đường hô hấp, thương tích kim khí dao kéo",
  },
  3: {
    name: "Ly",
    element: "Hỏa",
    direction: "Chính Nam",
    oppositeDirection: "Chính Bắc",
    trigram: [1, 0, 1],
    symbol: "☲",
    organ: "Tim, mạch máu, mắt, tiểu tràng, thần kinh thị giác",
    diseaseRisk: "Cao huyết áp, tim đập nhanh, đau mắt, nhiệt độc bốc hỏa",
  },
  4: {
    name: "Chấn",
    element: "Mộc",
    direction: "Chính Đông",
    oppositeDirection: "Chính Tây",
    trigram: [0, 0, 1],
    symbol: "☳",
    organ: "Gan, thần kinh, gân cơ, bàn chân, tứ chi",
    diseaseRisk: "Nóng gan, co giật gân cơ, phong thấp, đau nhức chân tay",
  },
  5: {
    name: "Tốn",
    element: "Mộc",
    direction: "Đông Nam",
    oppositeDirection: "Tây Bắc",
    trigram: [1, 1, 0],
    symbol: "☴",
    organ: "Mật (đởm), đùi, hệ hô hấp, mao mạch, khí huyết",
    diseaseRisk: "Sỏi mật, nhiễm phong hàn, suy nhược khí huyết, dị ứng",
  },
  6: {
    name: "Khảm",
    element: "Thủy",
    direction: "Chính Bắc",
    oppositeDirection: "Chính Nam",
    trigram: [0, 1, 0],
    symbol: "☵",
    organ: "Thận, bàng quang, hệ bài tiết, tai, cơ quan sinh sản",
    diseaseRisk: "Thận suy, viêm bàng quang, ứ dịch thủy thũng, ù tai",
  },
  7: {
    name: "Cấn",
    element: "Thổ",
    direction: "Đông Bắc",
    oppositeDirection: "Tây Nam",
    trigram: [1, 0, 0],
    symbol: "☶",
    organ: "Mũi, lưng, ngón tay, khớp xương, dạ dày, khối u bướu",
    diseaseRisk: "Đau dạ dày, u cục bướu tích tụ, thoái hóa đốt sống lưng",
  },
  8: {
    name: "Khôn",
    element: "Thổ",
    direction: "Tây Nam",
    oppositeDirection: "Đông Bắc",
    trigram: [0, 0, 0],
    symbol: "☷",
    organ: "Tỳ, vị (dạ dày), cơ nhục, ổ bụng, hệ tiêu hóa",
    diseaseRisk: "Rối loạn tiêu hóa, trướng bụng, suy giảm hấp thu dưỡng chất",
  },
};

// 64 Quẻ Chu Dịch Tiếng Việt chuẩn
export const QUAINAME_MAP: Record<string, string> = {
  "11": "BÁT THUẦN KIỀN",
  "12": "THIÊN TRẠCH LÝ",
  "13": "THIÊN HỎA ĐỒNG NHÂN",
  "14": "THIÊN LÔI VÔ VỌNG",
  "15": "THIÊN PHONG CẤU",
  "16": "THIÊN THỦY TỤNG",
  "17": "THIÊN SƠN ĐỘN",
  "18": "THIÊN ĐỊA BỈ",
  "21": "TRẠCH THIÊN QUÁI",
  "22": "BÁT THUẦN ĐOÀI",
  "23": "TRẠCH HỎA CÁCH",
  "24": "TRẠCH LÔI TÙY",
  "25": "TRẠCH PHONG ĐẠI QUÁ",
  "26": "TRẠCH THỦY KHỐN",
  "27": "TRẠCH SƠN HÀM",
  "28": "TRẠCH ĐỊA TỤY",
  "31": "HỎA THIÊN ĐẠI HỮU",
  "32": "HỎA TRẠCH KHUÊ",
  "33": "BÁT THUẦN LY",
  "34": "HỎA LÔI PHỆ HẠP",
  "35": "HỎA PHONG ĐỈNH",
  "36": "HỎA THỦY VỊ TẾ",
  "37": "HỎA SƠN LỮ",
  "38": "HỎA ĐỊA TẤN",
  "41": "LÔI THIÊN ĐẠI TRÁNG",
  "42": "LÔI TRẠCH QUY MUỘI",
  "43": "LÔI HỎA PHONG",
  "44": "BÁT THUẦN CHẤN",
  "45": "LÔI PHONG HẰNG",
  "46": "LÔI THỦY GIẢI",
  "47": "LÔI SƠN TIỂU QUÁ",
  "48": "LÔI ĐỊA DỰ",
  "51": "PHONG THIÊN TIỂU SÚC",
  "52": "PHONG TRẠCH TRUNG PHU",
  "53": "PHONG HỎA GIA NHÂN",
  "54": "PHONG LÔI ÍCH",
  "55": "BÁT THUẦN PHONG",
  "56": "PHONG THỦY HOÁN",
  "57": "PHONG SƠN TIỆM",
  "58": "PHONG ĐỊA QUÁN",
  "61": "THỦY THIÊN NHU",
  "62": "THỦY TRẠCH TIẾT",
  "63": "THỦY HỎA KÝ TẾ",
  "64": "THỦY LÔI TRUÂN",
  "65": "THỦY PHONG TĨNH",
  "66": "BÁT THUẦN KHẢM",
  "67": "THỦY SƠN KIỂN",
  "68": "THỦY ĐỊA TỈ",
  "71": "SƠN THIÊN ĐẠI SÚC",
  "72": "SƠN TRẠCH TỔN",
  "73": "SƠN HỎA BÍ",
  "74": "SƠN LÔI DI",
  "75": "SƠN PHONG CỔ",
  "76": "SƠN THỦY MÔNG",
  "77": "BÁT THUẦN CẤN",
  "78": "SƠN ĐỊA BÁC",
  "81": "ĐỊA THIÊN THÁI",
  "82": "ĐỊA TRẠCH LÂM",
  "83": "ĐỊA HỎA MINH DI",
  "84": "ĐỊA LÔI PHỤC",
  "85": "ĐỊA PHONG THĂNG",
  "86": "ĐỊA THỦY SƯ",
  "87": "ĐỊA SƠN KHIÊM",
  "88": "BÁT THUẦN KHÔN",
};

// Lục Thân Bát Quái: TA, Huynh (H), Quan (Q), Tài (T), Tử (C), Phụ (P)
export const LUC_THAN_MAP: Record<string, { label: string; meaning: string }> = {
  TA: { label: "TA", meaning: "Bản thể người cầu sự, chủ thể vận trình định mệnh" },
  H: { label: "Huynh Đệ (H)", meaning: "Đồng khí, bạn bè, đối tác, sự cạnh tranh hoặc tương trợ" },
  Q: { label: "Quan Quỷ (Q)", meaning: "Công danh, chức vụ, pháp luật, chướng ngại hoặc tai ách; con (TA Nam), chồng (TA Nữ)" },
  T: { label: "Thê Tài (T)", meaning: "Tiền tài, tài sản, của cải bất ngờ; cha (TA Nam/Nữ), vợ (TA Nam)" },
  C: { label: "Tử Tôn (C)", meaning: "Con cái (TA Nữ), phúc thần giải ách, chi hao, bà nội" },
  P: { label: "Phụ Mẫu (P)", meaning: "Mẹ hiền, nhà cửa đất đai, bằng cấp văn khế, quý nhân che chở, ông nội" },
};

// Helper: Lấy số quái từ 3 hào [h3, h2, h1] (từ trên xuống dưới)
export function getQuaiNumberFromTrigram(trigram: number[]): number {
  for (let i = 1; i <= 8; i++) {
    const t = TIEN_THIEN_BAT_QUAI[i].trigram;
    if (t[0] === trigram[0] && t[1] === trigram[1] && t[2] === trigram[2]) {
      return i;
    }
  }
  return 8;
}

// Độn phương trình thức từ P, T, d (hàm don trong khiet.js)
export function donStep(phai: number, trai: number, dong: number, next = false): DonResult {
  const qlen = 8;
  const dlen = 6;
  let p: number;
  let t: number;
  let d: number;

  if (next) {
    p = ((phai % qlen) + 4) % qlen;
    t = ((trai % qlen) + 6) % qlen;
    d = ((dong % dlen) + 4) % dlen;
  } else {
    p = phai % qlen;
    t = trai % qlen;
    d = isNaN(dong) || dong === 0 ? (phai + trai) % dlen : dong % dlen;
  }

  const retP = p === 0 ? qlen : p;
  const retT = t === 0 ? qlen : t;
  const retD = d === 0 ? dlen : d;

  return {
    p: retP,
    t: retT,
    d: retD,
    dongTren: retD >= 4,
  };
}

// Tính Biến Quái (hào động đảo bit 1 -> 0 hoặc 0 -> 1)
export function computeBienTrigrams(pQuaiNum: number, tQuaiNum: number, dong: number) {
  const pTrigram = [...TIEN_THIEN_BAT_QUAI[pQuaiNum].trigram];
  const tTrigram = [...TIEN_THIEN_BAT_QUAI[tQuaiNum].trigram];

  // Hào 1 ở dưới cùng (tTrigram[2]), Hào 6 ở trên cùng (pTrigram[0])
  if (dong >= 4) {
    // Thượng động
    const pIndex = 6 - dong; // d=4 => 2, d=5 => 1, d=6 => 0
    pTrigram[pIndex] = pTrigram[pIndex] === 1 ? 0 : 1;
  } else {
    // Hạ động
    const tIndex = 3 - dong; // d=1 => 2, d=2 => 1, d=3 => 0
    tTrigram[tIndex] = tTrigram[tIndex] === 1 ? 0 : 1;
  }

  return {
    pBien: pTrigram,
    tBien: tTrigram,
    pBienNum: getQuaiNumberFromTrigram(pTrigram),
    tBienNum: getQuaiNumberFromTrigram(tTrigram),
  };
}

// Tính Hổ Quái: Lấy hào [5, 4, 3] làm Thượng Hổ, hào [4, 3, 2] làm Hạ Hổ
export function computeHoTrigrams(pQuaiNum: number, tQuaiNum: number) {
  const pTri = TIEN_THIEN_BAT_QUAI[pQuaiNum].trigram;
  const tTri = TIEN_THIEN_BAT_QUAI[tQuaiNum].trigram;
  const h5 = pTri[1];
  const h4 = pTri[2];
  const h3 = tTri[0];
  const h2 = tTri[1];

  const pHo = [h5, h4, h3];
  const tHo = [h4, h3, h2];

  return {
    pHo,
    tHo,
    pHoNum: getQuaiNumberFromTrigram(pHo),
    tHoNum: getQuaiNumberFromTrigram(tHo),
  };
}

// Tính Lục Thân theo Ngũ Hành TA QUÁI
// ĐỊNH LÝ SÁCH LIÊN HOA ĐỘN PHÁP (Trang 9, 13):
// TA QUÁI là quái KHÔNG có hào bị động trong Chánh Quái.
// SỰ QUÁI là quái CÓ chứa hào bị động trong Chánh Quái.
export function computeLucThanRelation(taQuaiNum: number, targetQuaiNum: number): string {
  const taElement = TIEN_THIEN_BAT_QUAI[taQuaiNum].element;
  const targetElement = TIEN_THIEN_BAT_QUAI[targetQuaiNum].element;

  if (targetQuaiNum === taQuaiNum) return "TA";
  if (targetElement === taElement) return "H"; // Huynh Đệ (Đồng hành)

  const sinhNext: Record<string, string> = {
    Kim: "Thủy",
    Thủy: "Mộc",
    Mộc: "Hỏa",
    Hỏa: "Thổ",
    Thổ: "Kim",
  };
  const khacNext: Record<string, string> = {
    Kim: "Mộc",
    Mộc: "Thổ",
    Thổ: "Thủy",
    Thủy: "Hỏa",
    Hỏa: "Kim",
  };

  if (sinhNext[targetElement] === taElement) return "P"; // Target sinh TA: Phụ mẫu
  if (sinhNext[taElement] === targetElement) return "C"; // TA sinh Target: Tử tôn
  if (khacNext[targetElement] === taElement) return "Q"; // Target khắc TA: Quan quỷ
  if (khacNext[taElement] === targetElement) return "T"; // TA khắc Target: Thê tài

  return "H";
}

// Xác định số lượng không thời sự theo nguyên tắc Nguyễn K (trang 54 sách):
// Động hào 1, 4 -> 9 không thời
// Động hào 2, 5 -> 13 không thời
// Động hào 3, 6 -> 5 không thời
export function getTotalTimeSlots(dongHao: number): number {
  if (dongHao === 1 || dongHao === 4) return 9;
  if (dongHao === 2 || dongHao === 5) return 13;
  return 5;
}

// ----------------------------------------------------------------------------
// CÁC VÍ DỤ KINH ĐIỂN TỪ SÁCH LIÊN HOA ĐỘN PHÁP (NGUYỄN K)
// ----------------------------------------------------------------------------
export const LIEN_HOA_DON_CASE_STUDIES: CaseStudySample[] = [
  {
    id: "dia-thien-thai-dong-6",
    title: "1. Địa Thiên Thái động hào 6 • Đi xa dự đám cưới nhưng chưa sẵn tiền",
    p: 8,
    t: 1,
    d: 6,
    gender: "nam",
    context: "Ông A đến xem quẻ tốt xấu khi được bốc xăm P = 8, T = 1. Thầy đoán: 'Ông có bạn bè hay người thân ở phương xa mời đi tham quan hay dự hôn lễ là việc tốt, có điều ông chưa sẵn tiền'.",
    teacherAnalysis: "Chánh quái Kiền TA, Khôn P Sự. Chánh và Biến quái đều có P nên trước sau đều có quý nhân. Mệnh cung Kiền TA cư Đoài Huynh là bạn bè đến thăm. Ghép giòng Tha Sự: Kiền nối Đoài thành Thiên Trạch Lý (TA đi xa), Đoài nối Kiền thành Trạch Thiên Quải (Huynh Đoài quyết định) -> Huynh mời TA đi xa. Mệnh cung TA cư Lôi Trạch Quy Muội (tượng vu quy gả cưới). Chưa sẵn tiền vì Khôn nối Chấn Tài thành Địa Lôi Phục (đợi chờ tiền hỗ trợ).",
  },
  {
    id: "thien-thuy-tung-dong-3",
    title: "2. Thiên Thủy Tụng động hào 3 • Đi thăm bạn phương xa không báo trước",
    p: 1,
    t: 6,
    d: 3,
    gender: "nam",
    context: "Ông A định đi thăm người bạn phương xa không muốn báo trước, hỏi xem bạn có ở nhà không. Được quẻ Thiên Thủy Tụng động hào 3.",
    teacherAnalysis: "Bản quái kiện với Kiền TA, Khảm C Sự. Bạn của Kiền TA là Đoài Huynh. Không thời số 3 chủ sự Đoài Huynh (nhà bạn), nơi đây thấy có Kiền TA nhập vào không thời Huynh. Kết luận: Đến nơi ắt gặp bạn ở nhà vui vẻ.",
  },
  {
    id: "hoa-trach-khue-dong-3",
    title: "3. Hỏa Trạch Khuê động hào 3 • Nguy khốn hao tốn nơi đất Bắc",
    p: 3,
    t: 2,
    d: 3,
    gender: "nam",
    context: "Người xem hỏi về mưu sự đi xa và vận trình được quẻ Hỏa Trạch Khuê động hào 3.",
    teacherAnalysis: "Không thời 3 chủ sự Khảm Quan là không thời hãm hiểm (Khảm vị Bắc phương). TA nhập vào đất Bắc hay đi về phương Bắc ắt bị hiểm nguy vây khốn. Không thời 2, 4 chủ sự C là không thời chi hao, nhập vào chốn cờ bạc đàng điếm ắt thua thiệt sạch bách.",
  },
  {
    id: "trach-loi-tuy-dong-1",
    title: "4. Trạch Lôi Tùy động hào 1 • Bảo lãnh anh em sang Mỹ định cư",
    p: 2,
    t: 4,
    d: 1,
    gender: "nam",
    context: "Có người muốn bảo lãnh anh em ruột sang Mỹ chơi, được quẻ Trạch Lôi Tùy động hào 1.",
    teacherAnalysis: "Người bảo lãnh là TA Chấn Mộc, anh em là Tốn Huynh. Không thời Tiên đề TA1 có Tốn Huynh xuất hiện trước Mệnh cung TA là tín hiệu Huynh Sự nhập Không Thời TA. Đến Không thời TA5 là không thời kết cho thấy Tốn Huynh nhập hoàn toàn -> Bảo lãnh thành công sau bước đầu khó khăn.",
  },
  {
    id: "son-thien-dai-suc-dong-2",
    title: "5. Sơn Thiên Đại Súc động hào 2 • Nữ hai đời chồng do chồng trước tử vong",
    p: 7,
    t: 1,
    d: 2,
    gender: "nu",
    context: "Hỏi nguyên do người nữ Cấn TA đến hai đời chồng: bị bỏ, bỏ chồng hay chồng chết?",
    teacherAnalysis: "Bản quái kiện cho thấy Tốn Quan (chồng) tại không thời 3 và 11. Mệnh cung Tốn Sự cư Đoài Kim làm Tốn Mộc lâm thế tử. Tốn Quan lại nhập không thời 4, 8 chủ sự Ly Hỏa là không thời Tốn tiêu thiêu rụi kiệt quệ. Kết luận: Chồng trước bệnh chết chứ không phải ly hôn phản bội.",
  },
  {
    id: "dia-thien-thai-dong-4",
    title: "6. Địa Thiên Thái động hào 4 • Bệnh u trực tràng gặp danh y đại phúc",
    p: 8,
    t: 1,
    d: 4,
    gender: "nu",
    context: "Nữ Canh Tuất (mệnh Kim) phát hiện u trực tràng phải phẫu thuật gấp, hỏi cát hung sinh tử.",
    teacherAnalysis: "Canh Tuất hành Kim gặp hỏa thời 2 năm Bính Thân - Đinh Dậu bị khắc. Kiền TA, Cấn Sự mà Cấn tượng cái u, biến Ly Hỏa làm thổ trướng khiến u lớn nhanh. Nhưng Cấn là Phụ Mẫu Sự (P) là sự lành, ở đây P chính là Bác sĩ quý nhân tận tình cứu chữa thành công.",
  },
];

// ----------------------------------------------------------------------------
// THUẬT TOÁN TÍNH BẢN QUÁI KIỆN TOÀN DIỆN
// ----------------------------------------------------------------------------
export function computeBanQuaiKien(
  pInput: number,
  tInput: number,
  dInput: number,
  gender: GenderType = "nam"
): BanQuaiKienResult {
  const totalSlots = getTotalTimeSlots(dInput);
  const khongThoiList: KhongThoiSu[] = [];

  let curP = pInput;
  let curT = tInput;
  let curD = dInput;
  let next = false;

  for (let step = 0; step < totalSlots; step++) {
    const don = donStep(curP, curT, curD, next);
    const pNum = don.p;
    const tNum = don.t;
    const dNum = don.d;
    const dongTren = don.dongTren;

    // Chánh Quái
    const pChanh = TIEN_THIEN_BAT_QUAI[pNum].trigram;
    const tChanh = TIEN_THIEN_BAT_QUAI[tNum].trigram;
    const chanhKey = `${pNum}${tNum}`;
    const chanhName = QUAINAME_MAP[chanhKey] || `Quẻ ${pNum}-${tNum}`;

    // Hổ Quái
    const ho = computeHoTrigrams(pNum, tNum);
    const hoKey = `${ho.pHoNum}${ho.tHoNum}`;
    const hoName = QUAINAME_MAP[hoKey] || `Quẻ Hổ ${ho.pHoNum}-${ho.tHoNum}`;

    // Biến Quái
    const bien = computeBienTrigrams(pNum, tNum, dNum);
    const bienKey = `${bien.pBienNum}${bien.tBienNum}`;
    const bienName = QUAINAME_MAP[bienKey] || `Quẻ Biến ${bien.pBienNum}-${bien.tBienNum}`;

    // Định lý TA Quái & Sự Quái:
    // Quái không động là TA QUÁI. Quái có hào động là SỰ QUÁI.
    const taQuaiNum = dongTren ? tNum : pNum;
    const suQuaiNum = dongTren ? pNum : tNum;
    const taQuaiName = TIEN_THIEN_BAT_QUAI[taQuaiNum].name;
    const suQuaiName = TIEN_THIEN_BAT_QUAI[suQuaiNum].name;

    // MỆNH CUNG TA: Theo trang 37 sách LIENHOADON.pdf:
    // Mệnh tại thượng thì thượng Hổ là Mệnh Quái.
    // Mệnh tại hạ thì hạ Hổ là Mệnh Quái.
    const menhCungQuaiNum = dongTren ? ho.tHoNum : ho.pHoNum;
    const menhCungQuaiName = TIEN_THIEN_BAT_QUAI[menhCungQuaiNum].name;

    // Lục Thân Ma Trận
    const involved = [pNum, tNum, ho.pHoNum, ho.tHoNum, bien.pBienNum, bien.tBienNum];
    const lucThanMatrix = involved.map((qNum, idx) => {
      const rel = computeLucThanRelation(taQuaiNum, qNum);
      const def = LUC_THAN_MAP[rel] || { label: rel, meaning: "" };
      const isMenh = (dongTren && idx === 3) || (!dongTren && idx === 2);
      return {
        symbol: rel,
        label: def.label,
        meaning: def.meaning,
        element: TIEN_THIEN_BAT_QUAI[qNum].element,
        isMenhCung: isMenh,
      };
    });

    // Dạng thức Chánh Quái: P/TA, TA/C, TA/Q, TA/T, v.v.
    const relUpper = computeLucThanRelation(taQuaiNum, pNum);
    const relLower = computeLucThanRelation(taQuaiNum, tNum);
    const chanhForm = `${relUpper}/${relLower}`;

    // Tra cứu dữ liệu Chu Dịch 64 Quẻ
    const iChingChanh = CHU_DICH_64_QUE[chanhKey] || null;
    const iChingHo = CHU_DICH_64_QUE[hoKey] || null;
    const iChingBien = CHU_DICH_64_QUE[bienKey] || null;

    khongThoiList.push({
      seq: step + 1,
      p: pNum,
      t: tNum,
      d: dNum,
      dongTren,
      pChanh,
      tChanh,
      pHo: ho.pHo,
      tHo: ho.tHo,
      pBien: bien.pBien,
      tBien: bien.tBien,
      chanhName,
      hoName,
      bienName,
      taQuaiName,
      taQuaiNumber: taQuaiNum,
      suQuaiName,
      suQuaiNumber: suQuaiNum,
      dongViTriText: dongTren ? `Thượng Quái (${suQuaiName}) động hào ${dNum}` : `Hạ Quái (${suQuaiName}) động hào ${dNum}`,
      menhCungQuaiName,
      menhCungQuaiNumber: menhCungQuaiNum,
      chanhForm,
      lucThanMatrix,
      iChingDetails: {
        chanh: iChingChanh,
        ho: iChingHo,
        bien: iChingBien,
      },
    });

    curP = pNum;
    curT = tNum;
    curD = dNum;
    next = true;
  }

  const tienDe = khongThoiList[0];
  const taEle = TIEN_THIEN_BAT_QUAI[tienDe.taQuaiNumber].element;
  const suEle = TIEN_THIEN_BAT_QUAI[tienDe.suQuaiNumber].element;
  const taDirection = TIEN_THIEN_BAT_QUAI[tienDe.taQuaiNumber].direction;
  const oppositeDir = TIEN_THIEN_BAT_QUAI[tienDe.taQuaiNumber].oppositeDirection;

  // Kiểm tra sự hiện diện của các lục thân trong toàn bản quái kiện và tại Tiên Đề
  const menhLucThan = computeLucThanRelation(tienDe.taQuaiNumber, tienDe.menhCungQuaiNumber);
  const hasTaiInMenh = menhLucThan === "T";
  const hasQuanInMenh = menhLucThan === "Q";
  const hasTaiAnywhere = khongThoiList.some((kt) => kt.lucThanMatrix.some((m) => m.symbol === "T"));
  const hasQuanAnywhere = khongThoiList.some((kt) => kt.lucThanMatrix.some((m) => m.symbol === "Q"));
  const hasTuAnywhere = khongThoiList.some((kt) => kt.lucThanMatrix.some((m) => m.symbol === "C"));
  const hasPhuAnywhere = khongThoiList.some((kt) => kt.lucThanMatrix.some((m) => m.symbol === "P"));
  const hasPTAForm = khongThoiList.some((kt) => kt.chanhForm === "P/TA" || kt.chanhForm === "TA/P");

  // =========================================================================
  // 1. LUẬN ĐOÁN GIÀU NGHÈO & TÀI LỘC
  // =========================================================================
  let taiLocStatus: "cát" | "bình" | "hung" = "bình";
  let taiLocContent = "";
  let taiLocChiTiet = "";

  if (hasTaiInMenh) {
    taiLocStatus = "cát";
    taiLocContent = `Đại Cát! Thê Tài (T) trực tiếp cư Mệnh Cung TA (${taEle}). Chủ về hoạnh tài phát đạt, dòng tiền dồi dào, kinh doanh đắc lợi, cầu tài tất đắc.`;
    taiLocChiTiet = `Bản mệnh TA làm chủ nguồn lực, khắc xuất đoạt tài thế thắng vẻ vang. Các dự định đầu tư, mở rộng cơ sở kinh doanh đều gặp thời cơ chín muồi.`;
  } else if (hasTaiAnywhere) {
    taiLocStatus = "cát";
    taiLocContent = `Khá hanh thông. Thê Tài xuất hiện trong chuỗi không thời sự. Tài đứng trước Mệnh cung hoặc hiển lộ ở Hổ/Biến quái là dấu hiệu bất ngờ có khoản thu lớn, được người giúp đỡ về mặt tài chính.`;
    taiLocChiTiet = `Số không thời sự là ${totalSlots} (${totalSlots >= 9 ? "đa đoan thăng trầm, có lúc tưởng kẹt tiền nhưng sau lại có khoản tiền lớn bất ngờ bù đắp" : "vận tài kiên định ổn định"}).`;
  } else if (hasQuanAnywhere) {
    taiLocStatus = "bình";
    taiLocContent = `Quan Quỷ (Q) nắm giữ không thời. Tiền tài cần gắn liền với danh phận, giấy tờ pháp lý nghiêm ngặt. Tránh mạo hiểm đầu cơ, cho vay nặng lãi kẻo vướng kiện tụng tranh chấp.`;
    taiLocChiTiet = `Cần lấy công danh, chức nghiệp làm gốc, không nên thấy cái lợi trước mắt mà liều lĩnh.`;
  } else {
    taiLocStatus = "hung";
    taiLocContent = `Tài lộc có dấu hiệu chi hao hoặc bế tắc. Không thấy Tài tinh xuất hiện, cẩn trọng hao tài tốn của nơi đỏ đen hoặc đầu tư không nghiên cứu kỹ.`;
    taiLocChiTiet = `Nên thực hành tiết kiệm, củng cố nội lực gia đình, chớ nên nóng vội xuất tiền lớn lúc này.`;
  }

  // =========================================================================
  // 2. LUẬN ĐOÁN HƯỚNG NHÀ & ĐẤT ĐỊA PHONG THỦY (THEO NGUYỄN K TRANG 53-58)
  // =========================================================================
  let phongThuyStatus: "cát" | "bình" | "hung" = "cát";
  let matTienHemText = "";
  if (hasPTAForm) {
    matTienHemText = "NHÀ Ở MẶT ĐƯỜNG LỚN / MẶT TIỀN THÔNG THOÁNG (Chánh quái đắc dạng P/TA, tương sinh phát đạt, dễ được bồi thường mở rộng đường hoặc kinh doanh đắc địa).";
  } else if (hasTuAnywhere && !hasTaiInMenh) {
    matTienHemText = "NHÀ TRONG NGÕ HẺM / ĐƯỜNG NỘI BỘ (Chánh quái dạng TA sinh C hoặc hao suy, đường trước nhà quanh co hoặc cụt, cần chú ý thoát nước).";
  } else {
    matTienHemText = "NHÀ KHU DÂN CƯ ỔN ĐỊNH, ĐƯỜNG THÔNG (Địa thế bằng phẳng, lưu thông thuận tiện, minh đường sáng sủa).";
  }

  const phongThuyContent = `Theo Liên Hoa Độn Pháp: Tọa phương của ngôi nhà lấy TA Quái làm gốc, tức TỌA ${tienDe.taQuaiName} (${taDirection}). HƯỚNG NHÀ (mặt tiền đón khí) là phương đối ứng tức HƯỚNG ${oppositeDir}. Địa trạch: ${tienDe.taQuaiName} (${taEle}) tương tác cùng SỰ Quái (${suEle}). ${matTienHemText}`;

  // =========================================================================
  // 3. LUẬN ĐOÁN HÔN NHÂN GIA ĐẠO (TA NAM / TA NỮ & MỆNH CUNG)
  // =========================================================================
  let giaDaoStatus: "cát" | "bình" | "hung" = "bình";
  let menhCungAnalysis = "";
  let nhanSuLienHe = "";
  let giaDaoContent = "";

  if (gender === "nam") {
    // TA NAM: Người trưởng thành thì TÀI phải CƯ MỆNH
    if (hasTaiInMenh) {
      giaDaoStatus = "cát";
      menhCungAnalysis = `TA NAM đắc Thê Tài (T) CƯ MỆNH CUNG: Hôn sự đại thành! Vợ chồng hòa thuận, người phối ngẫu nết na vượng phu ích tử, cùng chung tay gầy dựng cơ đồ ấm êm.`;
    } else if (menhLucThan === "TA" && tienDe.p === tienDe.t) {
      giaDaoStatus = "hung";
      menhCungAnalysis = `TA NAM trong ngoài thuần một quái TA (tựa Bát Thuần Kiền hào 2): Tượng độc thân, số ở vậy, thích tu hành hoặc duyên tình muộn màng, khó lòng gắn kết thế tục.`;
    } else {
      giaDaoStatus = "bình";
      menhCungAnalysis = `TA NAM Mệnh Cung không có Tài ngự: Hôn nhân dễ có giai đoạn xa cách, vợ chồng cần bớt cái tôi cá nhân, nhường nhịn nhau để giữ gìn tổ ấm.`;
    }
    nhanSuLienHe = `Hỏi việc CHA tìm Thê Tài (T) [${hasTaiAnywhere ? "Có dữ liệu" : "Tiềm ẩn"}]; Hỏi MẸ tìm Phụ Mẫu (P) [${hasPhuAnywhere ? "Có dữ liệu" : "Tiềm ẩn"}]; Hỏi CON TRAI tìm Quan Quỷ (Q) [${hasQuanAnywhere ? "Có dữ liệu" : "Tiềm ẩn"}]; Hỏi ANH EM tìm Huynh Đệ (H).`;
  } else {
    // TA NỮ: Gái lớn có chồng thì QUAN phải CƯ MỆNH
    if (hasQuanInMenh) {
      giaDaoStatus = "cát";
      menhCungAnalysis = `TA NỮ đắc Quan Quỷ (Q) CƯ MỆNH CUNG: Phu thê xứng đôi vừa lứa, người chồng có danh phận chở che gia đình, tình duyên bền chặt như ý.`;
    } else if (menhLucThan === "C") {
      giaDaoStatus = "bình";
      menhCungAnalysis = `TA NỮ Mệnh cư Tử Tôn (C): Thần khắc Quan, người phụ nữ tài giỏi cá tính mạnh mẽ, dễ lấn lướt bạn đời hoặc dồn hết tâm trí cho con cái mà lơ là chồng.`;
    } else {
      giaDaoStatus = "bình";
      menhCungAnalysis = `TA NỮ Mệnh Cung không có Quan: Duyên đến muộn hoặc từng trải qua trắc trở đò ngang. Cần tìm hiểu kỹ tính nết đối phương trước khi gắn kết trăm năm.`;
    }
    nhanSuLienHe = `Hỏi việc CHỒNG tìm Quan Quỷ (Q) [${hasQuanAnywhere ? "Có dữ liệu" : "Tiềm ẩn"}]; Hỏi CON CÁI tìm Tử Tôn (C) [${hasTuAnywhere ? "Có dữ liệu" : "Tiềm ẩn"}]; Hỏi MẸ tìm Phụ Mẫu (P); Hỏi CHA tìm Thê Tài (T).`;
  }

  giaDaoContent = `${menhCungAnalysis} ${nhanSuLienHe}`;

  // =========================================================================
  // 4. LUẬN ĐOÁN SỨC KHỎE TẬT ÁCH & BỘ VỊ NGŨ HÀNH (TIÊU TÙ TUYỆT TỬ)
  // =========================================================================
  let sucKhoeStatus: "cát" | "bình" | "hung" = "bình";
  let nguHanhThe = "";
  const organDetail = TIEN_THIEN_BAT_QUAI[tienDe.taQuaiNumber].organ;
  const diseaseRisk = TIEN_THIEN_BAT_QUAI[tienDe.taQuaiNumber].diseaseRisk;

  // Xác định thế vượng, tướng, hưu, tù, tuyệt, tử
  const isKhacNhap = computeLucThanRelation(tienDe.taQuaiNumber, tienDe.suQuaiNumber) === "Q";
  const isSinhXuat = computeLucThanRelation(tienDe.taQuaiNumber, tienDe.suQuaiNumber) === "C";
  const isSinhNhap = computeLucThanRelation(tienDe.taQuaiNumber, tienDe.suQuaiNumber) === "P";

  if (hasTuAnywhere) {
    sucKhoeStatus = "cát";
    nguHanhThe = `Đắc TỬ TÔN (C) là Thần Giải Ách giải bệnh, thân tâm an ổn. Khí huyết lưu thông, tạng phủ phục hồi mạnh mẽ.`;
  } else if (isSinhNhap) {
    sucKhoeStatus = "cát";
    nguHanhThe = `TA được Phụ Mẫu (P) sinh nhập: Lâm thế Vượng Tướng, gặp thầy thuốc danh y tận tình chữa trị dứt điểm (tựa ca u bướu trực tràng của nữ Canh Tuất).`;
  } else if (isKhacNhap) {
    sucKhoeStatus = "hung";
    nguHanhThe = `SỰ Quái (${suEle}) khắc nhập TA Quái (${taEle}) lâm thế TỬ: Ngũ hành bị chế ước gay gắt, dễ phát sinh viêm nhiễm hoặc tổn thương cấp tính.`;
  } else if (isSinhXuat) {
    sucKhoeStatus = "bình";
    nguHanhThe = `TA Quái (${taEle}) sinh xuất cho SỰ Quái (${suEle}) lâm thế TIÊU / TUYỆT: Cơ thể hao tổn nguyên khí, mất ngủ, suy nhược thần kinh vì lao lực quá độ.`;
  } else {
    sucKhoeStatus = "bình";
    nguHanhThe = `Ngũ hành bình hòa đồng khí (Huynh Đệ), thể trạng ổn định, chỉ cần duy trì nếp sinh hoạt lành mạnh.`;
  }

  const sucKhoeContent = `${nguHanhThe} Bộ vị cơ thể cần chú ý ứng với ${tienDe.taQuaiName} (${taEle}): ${organDetail}. Phòng ngừa: ${diseaseRisk}.`;

  // =========================================================================
  // 5. LUẬN ĐOÁN ỨNG KỲ THỜI GIAN & CHIẾN LƯỢC TIẾN / THỦ (THEO CAO THỦ LỤC HÀO)
  // =========================================================================
  const BRANCHES = ["Tý (Tháng 11 âm)", "Sửu (Tháng 12 âm)", "Dần (Tháng 1 âm)", "Mão (Tháng 2 âm)", "Thìn (Tháng 3 âm)", "Tỵ (Tháng 4 âm)", "Ngọ (Tháng 5 âm)", "Mùi (Tháng 6 âm)", "Thân (Tháng 7 âm)", "Dậu (Tháng 8 âm)", "Tuất (Tháng 9 âm)", "Hợi (Tháng 10 âm)"];
  const ungKyBranch = BRANCHES[(tienDe.d * 2 - 1) % 12];
  
  let chienLuocVal: "ĐẠI TIẾN THỪA THẮNG" | "TRUNG ĐẠO THĂNG TRẦM" | "AN THỦ TỊNH DƯỠNG" | "HOÃN BINH CHỜ THỜI" = "TRUNG ĐẠO THĂNG TRẦM";
  let loiKhuyenHanhDong = "";

  if (taiLocStatus === "cát" && sucKhoeStatus === "cát") {
    chienLuocVal = "ĐẠI TIẾN THỪA THẮNG";
    loiKhuyenHanhDong = `Khí vượng tài thông, thiên thời địa lợi nhân hòa tề tựu. Nên chủ động mở rộng kinh doanh, quyết đoán ký kết, xuất hành cầu tài đều đắc ý. Mốc chuyển biến mạnh nhất vào ${ungKyBranch}.`;
  } else if (taiLocStatus === "hung" || sucKhoeStatus === "hung") {
    chienLuocVal = "AN THỦ TỊNH DƯỠNG";
    loiKhuyenHanhDong = `Thời vận đang lâm thế tôi luyện. Tuyệt đối không manh động mở rộng quy mô, không cho vay mượn hay tranh chấp pháp lý. Nên thu mình củng cố nội lực, trì niệm chú và làm việc thiện để hóa hung thành cát. Đến ${ungKyBranch} mây mù mới dần tan.`;
  } else if (tienDe.dongTren) {
    chienLuocVal = "HOÃN BINH CHỜ THỜI";
    loiKhuyenHanhDong = `Hào động tại thượng quái, biến cố xuất phát từ ngoại cảnh bên ngoài. Hãy kiên nhẫn quan sát, hoãn binh một nhịp để đối phương lộ sơ hở hoặc đối tác đưa ra điều khoản tốt hơn. Ứng kỳ hanh thông dự kiến vào ${ungKyBranch}.`;
  } else {
    chienLuocVal = "TRUNG ĐẠO THĂNG TRẦM";
    loiKhuyenHanhDong = `Thời thế nửa cát nửa hung, cần giữ tâm thế trung đạo bất thiên. Làm việc công chính, minh bạch tài chính và dĩ hòa vi quý với người thân. Mốc ứng nghiệm quan sát kỹ tại ${ungKyBranch}.`;
  }

  // Phân tích Tiến Thần & Thoái Thần (Tăng San Bốc Dịch: Động hào hóa biến cùng hành ngũ hành)
  const tienDeBien = computeBienTrigrams(tienDe.p, tienDe.t, tienDe.d);
  const pBienNum = tienDeBien.pBienNum;
  const tBienNum = tienDeBien.tBienNum;
  const suBienNum = tienDe.dongTren ? pBienNum : tBienNum;
  const suBienEle = TIEN_THIEN_BAT_QUAI[suBienNum]?.element;
  
  let tienThoaiType: "TIẾN THẦN (进神)" | "THOÁI THẦN (退神)" | "BÌNH HÒA" = "BÌNH HÒA";
  let tienThoaiDetail = "Động hào biến xuất dị hành ngũ hành, vận động theo quy luật sinh khắc chế hóa tự nhiên.";

  if (suEle === suBienEle) {
    // Cùng hành: Kiền (1 Kim) - Đoài (2 Kim), Chấn (4 Mộc) - Tốn (5 Mộc)
    if ((tienDe.suQuaiNumber === 1 && suBienNum === 2) || (tienDe.suQuaiNumber === 4 && suBienNum === 5)) {
      tienThoaiType = "TIẾN THẦN (进神)";
      tienThoaiDetail = `Cổ thư 《Tăng San Bốc Dịch》: Sự Quái ${tienDe.suQuaiName} (${suEle}) hóa ${TIEN_THIEN_BAT_QUAI[suBienNum].name} (${suBienEle}) là đắc TIẾN THẦN! Nội lực tăng tiến, thời vận ngày càng mở rộng, kiên trì theo đuổi ắt gặt hái thành tựu vẻ vang.`;
    } else if ((tienDe.suQuaiNumber === 2 && suBienNum === 1) || (tienDe.suQuaiNumber === 5 && suBienNum === 4)) {
      tienThoaiType = "THOÁI THẦN (退神)";
      tienThoaiDetail = `Cổ thư 《Tăng San Bốc Dịch》: Sự Quái ${tienDe.suQuaiName} (${suEle}) hóa ${TIEN_THIEN_BAT_QUAI[suBienNum].name} (${suBienEle}) là lâm THOÁI THẦN. Năng lượng thoái trào dần, không nên nóng vội bành trướng, nên củng cố phòng thủ.`;
    }
  }

  // Phân tích Tuyệt Xứ Phùng Sinh (《Dịch Ẩn》&《Bốc Phệ Chánh Tông》: Lâm tuyệt vị nhưng đắc sinh phù)
  let isTuyetXu = false;
  let tuyetXuDetail = "";
  if (isKhacNhap && hasPhuAnywhere) {
    isTuyetXu = true;
    tuyetXuDetail = `《Dịch Ẩn》quy tắc TUYỆT XỨ PHÙNG SINH: Quẻ tuy gặp Sự khắc nhập TA ngỡ như lâm vào tuyệt lộ, nhưng chuỗi không thời lại phục đắc Phụ Mẫu (P) tương sinh và Tử Tôn (C) giải ách. Đây là tượng "Trong cái rủi có cái may lớn", người gặp nghịch cảnh bế tắc tưởng chừng khép lại nhưng lại mở ra bước ngoặt tái sinh kỳ diệu.`;
  } else if (taiLocStatus === "hung" && hasTaiAnywhere) {
    isTuyetXu = true;
    tuyetXuDetail = `TUYỆT XỨ PHÙNG SINH: Tiền tài hiện tại tưởng chừng cạn kiệt hoặc chi tiêu quá đà, nhưng chuỗi không thời tiếp theo đắc Tài tinh cứu ứng, bất ngờ có nguồn thu mới hoặc quý nhân dang tay giải cứu.`;
  } else {
    tuyetXuDetail = `Khí cơ luân chuyển bình ổn, không lâm đại tuyệt, giữ vững tâm thiện thì phước lành tự quy tụ.`;
  }

  if (tienThoaiType === "TIẾN THẦN (进神)" && chienLuocVal !== "ĐẠI TIẾN THỪA THẮNG") {
    chienLuocVal = "ĐẠI TIẾN THỪA THẮNG";
    loiKhuyenHanhDong += " Đặc biệt quẻ đắc TIẾN THẦN, càng làm càng phát đạt!";
  } else if (tienThoaiType === "THOÁI THẦN (退神)" && chienLuocVal === "ĐẠI TIẾN THỪA THẮNG") {
    chienLuocVal = "TRUNG ĐẠO THĂNG TRẦM";
    loiKhuyenHanhDong += " Tuy nhiên quẻ lâm THOÁI THẦN, cần biết điểm dừng vừa đủ.";
  }

  // =========================================================================
  // 6. LỜI MINH TRIẾT KHAI TUỆ & HÀNH ĐẠO CHUYỂN DUYÊN
  // =========================================================================
  const counsel = `Vạn vật hữu hình đều vận hành trong vòng quay tương tác của Âm Dương Bát Quái. Bản Quái Kiện phản ảnh dòng năng lượng thời không hiện tại: TA Quái (${tienDe.taQuaiName}) giữ định tĩnh thì muôn biến động của SỰ Quái (${tienDe.suQuaiName}) đều trở thành bậc thang giác ngộ.`;
  const practice = `Thực hành thiền quán hơi thở 15 phút mỗi sáng hướng về phương ${taDirection}. Tích đức phóng sinh, bố thí tài vật vô tư để chuyển biến mọi nghiệp duyên thành phúc báo rạng ngời.`;

  return {
    phaiInput: pInput,
    traiInput: tInput,
    dongInput: dInput,
    gender,
    totalTimeSlots: totalSlots,
    khongThoiList,
    tienDe,
    luanDoan: {
      taiLoc: {
        title: "1. Giàu Nghèo & Tài Lộc Sự Nghiệp",
        status: taiLocStatus,
        content: taiLocContent,
        chiTiet: taiLocChiTiet,
      },
      phongThuy: {
        title: "2. Hướng Nhà & Đất Địa Phong Thủy",
        toaHuong: `Tọa ${tienDe.taQuaiName} (${taDirection}) • Hướng ${oppositeDir}`,
        matTienHem: matTienHemText,
        status: phongThuyStatus,
        content: phongThuyContent,
      },
      giaDao: {
        title: "3. Hôn Nhân & Gia Đạo Tình Duyên",
        menhCungAnalysis,
        nhanSuLienHe,
        status: giaDaoStatus,
        content: giaDaoContent,
      },
      sucKhoe: {
        title: "4. Sức Khỏe & Tai Ách Phòng Ngừa",
        nguHanhThe,
        boViCoThe: organDetail,
        status: sucKhoeStatus,
        content: sucKhoeContent,
      },
      ungKy: {
        title: "5. Ứng Kỳ Thời Gian & Chiến Lược Tiến / Thủ (Lục Hào Cổ Điển Trung Hoa)",
        thoiGianBienChuyen: ungKyBranch,
        chienLuoc: chienLuocVal,
        loiKhuyenHanhDong,
        tienThoaiThan: {
          type: tienThoaiType,
          detail: tienThoaiDetail,
        },
        tuyetXuPhungSinh: {
          isTuyetXu,
          detail: tuyetXuDetail,
        },
      },
      minhTriet: {
        title: "6. Lời Minh Triết Khai Tuệ (Hành Đạo Chuyển Duyên)",
        counsel,
        practice,
      },
    },
  };
}

// ============================================================================
// 1. PHƯƠNG THỨC THỜI KHÔNG HIỆN TẠI (NĂM - THÁNG - NGÀY - GIỜ REALTIME CAN CHI)
// ============================================================================
export const CAN_NAMES = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
export const CHI_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

/**
 * Lấy thông tin Năm Tháng Ngày Giờ hiện tại theo Can Chi và Mai Hoa/Liên Hoa Độn Pháp.
 * Chi: Tý=1, Sửu=2, Dần=3, Mão=4, Thìn=5, Tỵ=6, Ngọ=7, Mùi=8, Thân=9, Dậu=10, Tuất=11, Hợi=12.
 */
export function getCurrentCanChiTime(date: Date = new Date()): CanChiTimeInfo {
  const solarYear = date.getFullYear();
  const solarMonth = date.getMonth() + 1;
  const solarDay = date.getDate();
  const hour = date.getHours();

  // Chi của Giờ:
  // 23:00 - 00:59: Tý (1)
  // 01:00 - 02:59: Sửu (2)...
  const gioIndex = Math.floor((hour + 1) / 2) % 12 + 1; // 1..12
  const chiGio = CHI_NAMES[gioIndex - 1];

  // Chi của Năm (Lịch âm dương):
  // Năm 2026: (2026 - 4) % 12 = 2 => Dần? Năm 2024 (Giáp Thìn = 5), 2025 (Ất Tỵ = 6), 2026 (Bính Ngọ = 7)
  const canNamIdx = (solarYear - 4) % 10;
  const chiNamIdx = (solarYear - 4) % 12;
  const canChiNam = `${CAN_NAMES[(canNamIdx + 10) % 10]} ${CHI_NAMES[(chiNamIdx + 12) % 12]}`;
  const namIndex = ((chiNamIdx + 12) % 12) + 1; // 1..12

  // Tháng và Ngày (Tính ước lượng âm lịch chính xác cho vùng Việt Nam)
  // Tháng hiện tại (solarMonth): Chi tháng Dần=3 (tháng 1 âm), Mão=4 (tháng 2 âm)...
  const thangIndex = ((solarMonth + 1) % 12) + 1;
  const canThangIdx = (solarYear * 12 + solarMonth + 3) % 10;
  const canChiThang = `${CAN_NAMES[(canThangIdx + 10) % 10]} ${CHI_NAMES[thangIndex - 1]}`;

  // Ngày: Julian Day number để tìm Can Chi ngày chuẩn thiên văn
  const a = Math.floor((14 - solarMonth) / 12);
  const y = solarYear + 4800 - a;
  const m = solarMonth + 12 * a - 3;
  const jd = solarDay + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const canNgayIdx = (jd + 9) % 10;
  const chiNgayIdx = (jd + 1) % 12;
  const canChiNgay = `${CAN_NAMES[(canNgayIdx + 10) % 10]} ${CHI_NAMES[(chiNgayIdx + 12) % 12]}`;
  const ngayIndex = ((chiNgayIdx + 12) % 12) + 1;

  // Can của Giờ:
  const canGioIdx = (canNgayIdx * 2 + Math.floor((hour + 1) / 2)) % 10;
  const canChiGio = `${CAN_NAMES[(canGioIdx + 10) % 10]} ${chiGio}`;

  // Công thức Dịch số Mai Hoa & Liên Hoa Độn:
  // Thượng số P = (Năm + Tháng + Ngày) % 8 (dư 0 lấy 8)
  // Hạ số T = (Năm + Tháng + Ngày + Giờ) % 8 (dư 0 lấy 8)
  // Động hào d = (Năm + Tháng + Ngày + Giờ) % 6 (dư 0 lấy 6)
  const sumUpper = namIndex + thangIndex + ngayIndex;
  const sumLower = sumUpper + gioIndex;

  let p = sumUpper % 8;
  if (p === 0) p = 8;

  let t = sumLower % 8;
  if (t === 0) t = 8;

  let d = sumLower % 6;
  if (d === 0) d = 6;

  const pad = (n: number) => n.toString().padStart(2, "0");
  const solarDate = `${solarYear}-${pad(solarMonth)}-${pad(solarDay)} ${pad(hour)}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

  return {
    solarDate,
    lunarDay: solarDay,
    lunarMonth: solarMonth,
    lunarYear: solarYear,
    canChiNam,
    canChiThang,
    canChiNgay,
    canChiGio,
    namIndex,
    thangIndex,
    ngayIndex,
    gioIndex,
    p,
    t,
    d,
  };
}

// ============================================================================
// 2. PHƯƠNG THỨC XEM BẰNG SỐ SERI TIỀN (SERI POLYMER VẬT PHẨM TÙY THÂN)
// ============================================================================
export function parseSeriMoney(input: string): SeriMoneyAnalysis {
  const rawInput = input.trim();
  const cleanDigits = rawInput.replace(/\D/g, "");
  const prefixMatch = rawInput.match(/^[a-zA-Z]+/);
  const prefixStr = prefixMatch ? prefixMatch[0].toUpperCase() : "";

  // Nếu không có số, mặc định bộ số seri tài lộc 8 số: 88889999
  const digits = cleanDigits.length >= 2 ? cleanDigits : "88889999";
  const mid = Math.floor(digits.length / 2);
  const firstHalf = digits.slice(0, mid);
  const secondHalf = digits.slice(mid);

  const sumFirstHalf = firstHalf.split("").reduce((acc, c) => acc + (parseInt(c, 10) || 0), 0);
  const sumSecondHalf = secondHalf.split("").reduce((acc, c) => acc + (parseInt(c, 10) || 0), 0);
  const sumTotal = digits.split("").reduce((acc, c) => acc + (parseInt(c, 10) || 0), 0);

  let p = sumFirstHalf % 8;
  if (p === 0) p = 8;

  let t = sumSecondHalf % 8;
  if (t === 0) t = 8;

  let d = sumTotal % 6;
  if (d === 0) d = 6;

  let fengShuiNote = "";
  if (p === 1 && t === 1) {
    fengShuiNote = "Thuần Dương Kiền Kim: Vận khí hanh thông tột bực, đại phú đại quý, tiền vào như nước!";
  } else if (p === 8 && t === 8) {
    fengShuiNote = "Thuần Âm Khôn Thổ: Phúc đức dày dặn, an ổn điền trạch, tài lộc tích tụ lâu bền.";
  } else if (p === 3 && t === 6) {
    fengShuiNote = "Hỏa Thủy Tương Giao (Vị Tế / Ký Tế): Dòng tiền lưu thông nhanh, tài chính biến hóa linh hoạt.";
  } else {
    fengShuiNote = `Dịch số Polymer: Thượng ${TIEN_THIEN_BAT_QUAI[p].name} (${TIEN_THIEN_BAT_QUAI[p].element}) kết hợp Hạ ${TIEN_THIEN_BAT_QUAI[t].name} (${TIEN_THIEN_BAT_QUAI[t].element}), Động hào ${d}.`;
  }

  return {
    rawInput,
    cleanDigits: digits,
    prefixStr,
    firstHalf,
    secondHalf,
    sumFirstHalf,
    sumSecondHalf,
    sumTotal,
    p,
    t,
    d,
    fengShuiNote,
  };
}

// ============================================================================
// 3. PHƯƠNG THỨC SỐ ĐIỆN THOẠI & BIỂN SỐ XE
// ============================================================================
export function parsePhoneOrPlate(input: string, mode: "phone" | "plate" = "phone"): PhonePlateAnalysis {
  const rawInput = input.trim();
  const cleanDigits = rawInput.replace(/\D/g, "");

  // Mặc định fallback
  const digits = cleanDigits.length >= 4 ? cleanDigits : mode === "phone" ? "0988888888" : "2988888";
  const mid = Math.floor(digits.length / 2);
  const firstPart = digits.slice(0, mid);
  const secondPart = digits.slice(mid);

  const sumFirst = firstPart.split("").reduce((acc, c) => acc + (parseInt(c, 10) || 0), 0);
  const sumSecond = secondPart.split("").reduce((acc, c) => acc + (parseInt(c, 10) || 0), 0);
  const sumTotal = digits.split("").reduce((acc, c) => acc + (parseInt(c, 10) || 0), 0);

  let p = sumFirst % 8;
  if (p === 0) p = 8;

  let t = sumSecond % 8;
  if (t === 0) t = 8;

  let d = sumTotal % 6;
  if (d === 0) d = 6;

  let energyVibe = "";
  if (mode === "phone") {
    energyVibe = `Sim Số Phong Thủy: Tiền vận ${TIEN_THIEN_BAT_QUAI[p].name} (${TIEN_THIEN_BAT_QUAI[p].element}) - Hậu vận ${TIEN_THIEN_BAT_QUAI[t].name} (${TIEN_THIEN_BAT_QUAI[t].element}). Hợp trợ năng lượng giao tiếp và mở rộng mạng lưới quý nhân.`;
  } else {
    energyVibe = `Biển Số Xe May Mắn: Khung xe ${TIEN_THIEN_BAT_QUAI[p].name} vững chãi, Bánh xe ${TIEN_THIEN_BAT_QUAI[t].name} chuyển động êm thuận. Vạn dặm bình an, thượng lộ hanh thông.`;
  }

  return {
    rawInput,
    cleanDigits: digits,
    type: mode,
    firstPart,
    secondPart,
    sumFirst,
    sumSecond,
    sumTotal,
    p,
    t,
    d,
    energyVibe,
  };
}

// ============================================================================
// 4. PHƯƠNG THỨC RÚT CHÂN HƯƠNG / NHÁNH LÁ TÂM Ý (NGUYÊN TÁC NGUYỄN K TRANG 5)
// ============================================================================
export function calculateStickDivination(rightCount: number, leftCount: number, movingLine?: number): {
  p: number;
  t: number;
  d: number;
} {
  const pRaw = Math.max(1, rightCount);
  const tRaw = Math.max(1, leftCount);

  let p = pRaw % 8;
  if (p === 0) p = 8;

  let t = tRaw % 8;
  if (t === 0) t = 8;

  let d = movingLine && movingLine >= 1 && movingLine <= 6 ? movingLine : (pRaw + tRaw) % 6;
  if (d === 0) d = 6;

  return { p, t, d };
}
