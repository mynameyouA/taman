/**
 * MAI HOA DỊCH SỐ ENGINE (Thiệu Khang Tiết - Bắc Tống)
 * - Tinh hoa các phương thức lập quẻ Mai Hoa:
 *   1. Niên Nguyệt Nhật Thời Chiêm (Lập quẻ theo thời gian)
 *   2. Vật Số Chiêm (Đếm số lượng sự vật: hoa rơi, chim kêu, người đi...)
 *   3. Tự Số Chiêm (Đoán theo số nét chữ / âm tiết / từ ngữ)
 *   4. Đoán theo phương hướng và âm thanh tiếng động (Thanh âm chiêm)
 * - Bộ sưu tập các ví dụ kinh điển của Tiên sinh Thiệu Ung:
 *   * Quan Mai Chiêm (Xem hai con chim sẻ tranh cành hoa rơi)
 *   * Mẫu Đơn Chiêm (Xem ngựa giẫm nát hoa mẫu đơn)
 *   * Tây Các Thính Yến Thanh Chiêm (Nghe tiếng yến hót lầu Tây)
 *   * Ngưu Ai Minh Chiêm (Nghe tiếng trâu kêu thảm thiết)
 * - Thuật lý Thể - Dụng:
 *   * Thể sinh Dụng: Hao tổn sinh xuất
 *   * Dụng sinh Thể: Đại cát sinh nhập
 *   * Dụng khắc Thể: Đại hung khắc nhập
 *   * Thể khắc Dụng: Khắc xuất đoạt lợi
 *   * Thể Dụng Tỷ Hòa: Bình hòa cát lợi
 */

export interface MaiHoaExample {
  id: string;
  title: string;
  context: string;
  lapQue: {
    upperTrigram: number; // 1..8
    lowerTrigram: number; // 1..8
    movingLine: number; // 1..6
    chanhName: string;
    hoName: string;
    bienName: string;
  };
  theDungAnalysis: {
    theQuai: string;
    theElement: string;
    dungQuai: string;
    dungElement: string;
    hoQuai: string;
    bienQuai: string;
    relation: "Dụng sinh Thể" | "Thể sinh Dụng" | "Thể khắc Dụng" | "Dụng khắc Thể" | "Tỷ Hòa";
  };
  tienTriPrediction: string;
  actualVerification: string;
  mindsetLesson: string;
}

export interface MaiHoaReadingResult {
  method: "thoi-gian" | "so-luong" | "chu-viet" | "am-thanh";
  upperTrigram: number;
  lowerTrigram: number;
  movingLine: number;
  chanhName: string;
  hoName: string;
  bienName: string;
  theDung: {
    theQuai: string;
    theElement: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
    dungQuai: string;
    dungElement: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
    relation: "Dụng sinh Thể" | "Thể sinh Dụng" | "Thể khắc Dụng" | "Dụng khắc Thể" | "Tỷ Hòa";
    summary: string;
    score: number; // 0..100
  };
  ungKy: {
    thoiGianUocDinh: string;
    loiKhuyenHanhDong: string;
  };
  loiKhaiThi: string;
}

export const TRIGRAM_NAMES: Record<number, { name: string; element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"; symbol: string }> = {
  1: { name: "Kiền (Trời)", element: "Kim", symbol: "☰" },
  2: { name: "Đoài (Đầm)", element: "Kim", symbol: "☱" },
  3: { name: "Ly (Lửa)", element: "Hỏa", symbol: "☲" },
  4: { name: "Chấn (Sấm)", element: "Mộc", symbol: "☳" },
  5: { name: "Tốn (Gió)", element: "Mộc", symbol: "☴" },
  6: { name: "Khảm (Nước)", element: "Thủy", symbol: "☵" },
  7: { name: "Cấn (Núi)", element: "Thổ", symbol: "☶" },
  8: { name: "Khôn (Đất)", element: "Thổ", symbol: "☷" },
};

export const MAI_HOA_CLASSIC_EXAMPLES: MaiHoaExample[] = [
  {
    id: "quan-mai-chiem",
    title: "1. Quan Mai Chiêm (Xem Hai Chim Sẻ Tranh Hoa Rơi)",
    context: "Giờ Thìn ngày 17 tháng Chạp năm Thìn, Thiệu Khang Tiết đi dạo trong vườn ngắm hoa mai, thấy hai con chim sẻ tranh nhau cành mai rồi cùng ngã nhào xuống đất.",
    lapQue: {
      upperTrigram: 2, // Đoài
      lowerTrigram: 5, // Tốn
      movingLine: 4,
      chanhName: "Trạch Phong Đại Quá",
      hoName: "Bát Thuần Kiền",
      bienName: "Thủy Phong Tỉnh",
    },
    theDungAnalysis: {
      theQuai: "Tốn (Hạ quái - không động)",
      theElement: "Mộc",
      dungQuai: "Đoài (Thượng quái - động hào 4)",
      dungElement: "Kim",
      hoQuai: "Kiền Kim",
      bienQuai: "Khảm Thủy",
      relation: "Dụng khắc Thể",
    },
    tienTriPrediction: "Dụng là Đoài Kim khắc Thể là Tốn Mộc. Đoài là thiếu nữ, Tốn là cây cối và đùi/chân. Hổ quái toàn Kim nặng nề. Đoán rằng: Tối mai sẽ có cô gái đến hái hoa, làm gãy cành cây, ngã trầy xước chân nhưng không nguy hiểm tính mạng (nhờ biến Khảm Thủy sinh Mộc).",
    actualVerification: "Đúng tối hôm sau, có cô gái hàng xóm sang hái trộm hoa, bị người giữ vườn đuổi, hoảng sợ trèo cây làm gãy cành ngã rách chân như thần định.",
    mindsetLesson: "Tâm động thì cơ duyên khởi. Sự vật ngẫu nhiên trước mắt (chim rơi) chính là bức điện tín đồng hiện tượng (Synchronicity) của vũ trụ.",
  },
  {
    id: "mau-don-chiem",
    title: "2. Mẫu Đơn Chiêm (Ngựa Giẫm Nát Hoa Mẫu Đơn)",
    context: "Ngày Tỵ tháng Tỵ năm Thìn, ông cùng bạn đến chùa An Lạc ngắm hoa mẫu đơn đang nở rộ tuyệt đẹp. Bạn hỏi cát hung của hoa.",
    lapQue: {
      upperTrigram: 1, // Kiền
      lowerTrigram: 5, // Tốn
      movingLine: 5,
      chanhName: "Thiên Phong Cấu",
      hoName: "Bát Thuần Kiền",
      bienName: "Hỏa Phong Đỉnh",
    },
    theDungAnalysis: {
      theQuai: "Tốn Mộc",
      theElement: "Mộc",
      dungQuai: "Kiền Kim",
      dungElement: "Kim",
      hoQuai: "Kiền Kim",
      bienQuai: "Ly Hỏa",
      relation: "Dụng khắc Thể",
    },
    tienTriPrediction: "Tốn Mộc là hoa, bị Kiền Kim khắc ráo riết. Kiền là ngựa (Mã vi Kiền). Giờ Ngọ ngày mai hoa này ắt bị ngựa giẫm nát.",
    actualVerification: "Trưa hôm sau, quan khách cưỡi ngựa đến ngắm hoa, hai con ngựa lồng lên cắn nhau nhảy vào luống hoa giẫm nát hết.",
    mindsetLesson: "Thuật Mai Hoa chú trọng tượng quái thiên nhiên thuần túy: Kiền là Ngựa, Tốn là Cây Cỏ. Kim khắc Mộc thì hoa tất tàn.",
  },
  {
    id: "tay-cac-thinh-yen-thanh",
    title: "3. Tây Các Thính Yến Thanh Chiêm (Tiếng Yến Hót Lầu Tây)",
    context: "Giờ Dậu ngày Tân Hợi, ngồi ở lầu Tây nghe tiếng chim yến hót lảnh lót rền vang hướng về phía Tây.",
    lapQue: {
      upperTrigram: 2, // Đoài (Tây)
      lowerTrigram: 5, // Tốn (Âm thanh/Gió)
      movingLine: 3,
      chanhName: "Trạch Phong Đại Quá",
      hoName: "Bát Thuần Kiền",
      bienName: "Trạch Thủy Khốn",
    },
    theDungAnalysis: {
      theQuai: "Đoài Kim (Thượng quái không động)",
      theElement: "Kim",
      dungQuai: "Tốn Mộc (Hạ quái động hào 3)",
      dungElement: "Mộc",
      hoQuai: "Kiền Kim",
      bienQuai: "Khảm Thủy",
      relation: "Thể khắc Dụng",
    },
    tienTriPrediction: "Thể là Đoài Kim khắc Dụng là Tốn Mộc. Thể khắc Dụng là cầu tài được tài, tiệc tùng gặp hỷ sự. Tối nay sẽ có khách phương xa mang rượu thịt đến thết đãi.",
    actualVerification: "Đúng canh hai đêm ấy có bạn cũ từ phương xa đến tặng lễ vật yến tiệc vui vẻ.",
    mindsetLesson: "Thể khắc Dụng chủ về sự việc ta nắm quyền kiểm soát, đoạt lấy kết quả cát lợi.",
  },
  {
    id: "nguu-ai-minh-chiem",
    title: "4. Ngưu Ai Minh Chiêm (Tiếng Trâu Kêu Thảm Thiết)",
    context: "Giờ Mùi ngày Quý Mão, nghe tiếng con trâu đực kêu ai oán từ phương Nam.",
    lapQue: {
      upperTrigram: 3, // Ly (Phương Nam)
      lowerTrigram: 8, // Khôn (Trâu thuộc Khôn Thổ)
      movingLine: 2,
      chanhName: "Hỏa Địa Tấn",
      hoName: "Thủy Sơn Kiển",
      bienName: "Hỏa Sơn Lữ",
    },
    theDungAnalysis: {
      theQuai: "Ly Hỏa (Thượng quái không động)",
      theElement: "Hỏa",
      dungQuai: "Khôn Thổ (Hạ quái động hào 2)",
      dungElement: "Thổ",
      hoQuai: "Cấn Thổ - Khảm Thủy",
      bienQuai: "Cấn Thổ",
      relation: "Thể sinh Dụng",
    },
    tienTriPrediction: "Ly Hỏa sinh xuất cho Khôn Thổ lâm hào động, chủ về hao tán tâm huyết và sinh lực. Trong vòng 21 ngày con trâu này tất bị xẻ thịt bán.",
    actualVerification: "Sau 20 ngày, chủ nhà kẹt tiền làm giỗ đã bán trâu cho lò mổ lấy thịt đãi khách đúng như dự báo.",
    mindsetLesson: "Thể sinh Dụng là tiết khí hao tổn, nếu hỏi việc làm ăn thì chủ chi phí đội vốn, người bệnh thì mất sức.",
  },
];

/**
 * Thuật toán tính mối quan hệ Thể - Dụng theo Ngũ Hành sinh khắc
 */
export function evaluateTheDung(
  theEle: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ",
  dungEle: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"
): {
  relation: "Dụng sinh Thể" | "Thể sinh Dụng" | "Thể khắc Dụng" | "Dụng khắc Thể" | "Tỷ Hòa";
  summary: string;
  score: number;
} {
  const SINH: Record<string, string> = { Mộc: "Hỏa", Hỏa: "Thổ", Thổ: "Kim", Kim: "Thủy", Thủy: "Mộc" };
  const KHAC: Record<string, string> = { Mộc: "Thổ", Thổ: "Thủy", Thủy: "Hỏa", Hỏa: "Kim", Kim: "Mộc" };

  if (theEle === dungEle) {
    return {
      relation: "Tỷ Hòa",
      summary: "Thể Dụng Tỷ Hòa: Đồng thanh tương ứng, đồng khí tương cầu. Mọi việc bình ổn thuận hòa, có bạn đồng hành cùng chí hướng.",
      score: 75,
    };
  }

  if (SINH[dungEle] === theEle) {
    return {
      relation: "Dụng sinh Thể",
      summary: "Đại Cát! Dụng sinh Thể (Sinh nhập): Được hoàn cảnh ưu ái, quý nhân trợ lực, mưu sự tất thành, tiền bạc và danh vọng tự tìm đến.",
      score: 95,
    };
  }

  if (SINH[theEle] === dungEle) {
    return {
      relation: "Thể sinh Dụng",
      summary: "Hao Tổn! Thể sinh Dụng (Sinh xuất): Bản thân phải lao tâm khổ tứ, hao tài tốn lực cho người khác, việc làm nhiều hưởng ít.",
      score: 45,
    };
  }

  if (KHAC[theEle] === dungEle) {
    return {
      relation: "Thể khắc Dụng",
      summary: "Cát Lợi! Thể khắc Dụng (Khắc xuất): Ta làm chủ tình thế, chiến thắng trở ngại, đoạt tài đắc lợi, nắm chắc phần thắng trong tay.",
      score: 85,
    };
  }

  // KHAC[dungEle] === theEle
  return {
    relation: "Dụng khắc Thể",
    summary: "Bất Lợi! Dụng khắc Thể (Khắc nhập): Bị hoàn cảnh chèn ép, áp lực bủa vây, dễ gặp tiểu nhân quấy phá hoặc tổn thất bất ngờ. Cần thủ hiểm dưỡng sức.",
    score: 25,
  };
}

/**
 * Lập quẻ Mai Hoa Dịch Số theo Thời Gian Thực
 */
export function castMaiHoaTimeSpread(date: Date = new Date()): MaiHoaReadingResult {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  const chiYear = ((year - 4) % 12) + 1;
  const chiHour = Math.floor((hour + 1) / 2) % 12 + 1;

  // Thượng quái: (Năm + Tháng + Ngày) % 8
  const upperRaw = (chiYear + month + day) % 8;
  const upper = upperRaw === 0 ? 8 : upperRaw;

  // Hạ quái: (Năm + Tháng + Ngày + Giờ) % 8
  const lowerRaw = (chiYear + month + day + chiHour) % 8;
  const lower = lowerRaw === 0 ? 8 : lowerRaw;

  // Hào động: (Năm + Tháng + Ngày + Giờ) % 6
  const movingRaw = (chiYear + month + day + chiHour) % 6;
  const moving = movingRaw === 0 ? 6 : movingRaw;

  // Phân định Thể - Dụng:
  // Hào động 1..3: Động Hạ Quái -> Thượng quái là THỂ, Hạ quái là DỤNG
  // Hào động 4..6: Động Thượng Quái -> Hạ quái là THỂ, Thượng quái là DỤNG
  const theTrigramNum = moving >= 4 ? lower : upper;
  const dungTrigramNum = moving >= 4 ? upper : lower;

  const theInfo = TRIGRAM_NAMES[theTrigramNum];
  const dungInfo = TRIGRAM_NAMES[dungTrigramNum];

  const theDungEval = evaluateTheDung(theInfo.element, dungInfo.element);

  const BRANCH_HOURS = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  const ungKyHour = BRANCH_HOURS[chiHour - 1];

  return {
    method: "thoi-gian",
    upperTrigram: upper,
    lowerTrigram: lower,
    movingLine: moving,
    chanhName: `Quẻ ${TRIGRAM_NAMES[upper].name} trên ${TRIGRAM_NAMES[lower].name}`,
    hoName: "Hổ Quái chuyển tiếp",
    bienName: `Biến động hào ${moving}`,
    theDung: {
      theQuai: theInfo.name,
      theElement: theInfo.element,
      dungQuai: dungInfo.name,
      dungElement: dungInfo.element,
      relation: theDungEval.relation,
      summary: theDungEval.summary,
      score: theDungEval.score,
    },
    ungKy: {
      thoiGianUocDinh: `Ứng kỳ trọng điểm trong khung giờ ${ungKyHour} hoặc chu kỳ hành ${theInfo.element}`,
      loiKhuyenHanhDong: theDungEval.score >= 70 ? "Thời cơ chín muồi, nên quyết đoán tiến bước!" : "Nên an tĩnh thu mình, dưỡng khí đợi thời cơ.",
    },
    loiKhaiThi: "Khang Tiết tiên sinh dạy: Tâm hư tức thông, vật lai thuận ứng. Không chấp trước vào quẻ, lấy trí tuệ minh định đường đi.",
  };
}
