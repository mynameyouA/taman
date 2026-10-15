/**
 * KHO TÀNG LIỄU PHÀM TỨ HUẤN (LIAO-FAN'S FOUR LESSONS)
 * Nền tảng Chuyển Họa Thành Phúc, Cải Tạo Vận Mệnh & Tích Lũy Công Đức
 * Theo tác phẩm kinh điển của Viên Liễu Phàm (1533-1606) và giảng giải của HT. Tịnh Không.
 */

export interface LieuPhamLesson {
  id: number;
  chineseTitle: string;
  vietnameseTitle: string;
  summary: string;
  corePhilosophy: string;
  karmicPrinciple: string;
  practicalSteps: string[];
}

export interface ThienHanhItem {
  id: number;
  category: "CHINH_TAM" | "NGON_TU" | "HANH_DONG" | "CUU_VAT";
  title: string;
  description: string;
  meritPoints: number; // Điểm công đức
  remedyFor: string;    // Đối trị vận hạn gì
}

export const LIEU_PHAM_BON_BAI_HOC: LieuPhamLesson[] = [
  {
    id: 1,
    chineseTitle: "Lập Mạng Chi Học (立命之學)",
    vietnameseTitle: "Học Cách Lập Mạng (Mệnh Do Ta Tạo, Phước Tự Mình Cầu)",
    summary:
      "Vận mạng là do chính mình tự định đoạt qua từng ý niệm, lời nói và hành động. Khổng tiên sinh đoán trúng số mạng nhưng Vân Cốc Thiền Sư đã khai thị: 'Mạng do mình tạo, phước do mình cầu'. Người biết sửa đổi lỗi lầm, hành thiện tích đức thì trời xanh không thể trói buộc bởi lá số tử vi.",
    corePhilosophy: "Mệnh do trời định, nhưng vận do ta chuyển. Đức năng thắng số.",
    karmicPrinciple:
      "Người không có con cầu được con, người không có công danh cầu được đỗ đạt, người số yểu cầu được trường thọ — tất cả đều từ việc dứt bỏ điều ác, chuyên cần làm việc thiện mà chuyển hóa nhân duyên.",
    practicalSteps: [
      "Quán chiếu nhận thức: Không đổ lỗi cho hoàn cảnh hay số phận.",
      "Lập chí nguyện lớn: Đặt mục tiêu làm 3.000 việc thiện để hồi hướng công đức.",
      "Hằng ngày ghi sổ Công Quá Cách (ghi chép việc thiện và việc lỗi để tự răn).",
      "Niệm Phật trì chú (Chú Chuẩn Đề / Danh hiệu Quán Thế Âm) để tâm không khởi tạp niệm.",
    ],
  },
  {
    id: 2,
    chineseTitle: "Cải Quá Chi Pháp (改過之法)",
    vietnameseTitle: "Phương Pháp Cải Sửa Lỗi Lầm",
    summary:
      "Muốn tích phước thì trước hết phải ngăn ngừa rò rỉ phước đức bằng cách sửa lỗi. Phải có 3 tâm: Tâm Hổ Thẹn (biết xấu hổ với trời đất), Tâm Sợ Hãi (kính sợ luật nhân quả và thần minh soi xét), và Tâm Dũng Mãnh (dứt khoát trừ bỏ thói xấu như chém rắn độc).",
    corePhilosophy: "Biết lỗi là gốc của trí tuệ, sửa lỗi là cội của phước đức.",
    karmicPrinciple:
      "Sửa lỗi có 3 tầng bậc: Tầng hạ sửa nơi việc (hành động bên ngoài), Tầng trung sửa nơi lý (hiểu rõ lý lẽ nhân quả để không tái phạm), Tầng thượng sửa nơi tâm (tâm vừa khởi niệm xấu liền lập tức dập tắt).",
    practicalSteps: [
      "Khởi tâm hổ thẹn: Tự soi xét bản thân chưa trọn vẹn hiếu đạo và từ bi.",
      "Khởi tâm kính sợ: Trời đất quỷ thần đều thấy rõ nơi u tối, không dám làm càn.",
      "Khởi tâm dũng mãnh: Không lần lữa trì hoãn, quyết tâm dứt bỏ tập khí xấu ngay tức khắc.",
      "Tu tâm thanh tịnh: Niệm niệm đều là thiện niệm, ác niệm tự tiêu tan.",
    ],
  },
  {
    id: 3,
    chineseTitle: "Tích Thiện Chi Phương (積善之方)",
    vietnameseTitle: "Phương Pháp Tích Lũy Việc Thiện",
    summary:
      "Làm thiện cần phải phân biệt rõ: Thiện Chân - Thiện Giả, Thiện Ngay - Thiện Cong, Thiện Ẩn - Thiện Dương, Thiện Lớn - Thiện Nhỏ, Thiện Nửa - Thiện Tròn. Làm thiện mà vụ lợi hay mong cầu khen ngợi là Thiện Giả. Làm thiện vì lợi ích tha nhân mà tâm không dính mắc là Thiện Tròn.",
    corePhilosophy: "Tích thiện phước báo chưa đến nhưng họa đã rời xa; Tích ác họa chưa đến nhưng phước đã tiêu tan.",
    karmicPrinciple:
      "Mười việc thiện căn bản giúp cải tạo vận mệnh: 1. Giúp người làm lành; 2. Giữ lòng yêu kính; 3. Giúp người thành tựu; 4. Khuyên người làm lành; 5. Cứu người nguy cấp; 6. Xây dựng công trình công cộng; 7. Xả tài thí xả của cải; 8. Hộ trì chánh pháp; 9. Kính trọng bậc tôn trưởng; 10. Thương tiếc sinh mạng loài vật (phóng sinh).",
    practicalSteps: [
      "Thực hành bố thí tài sản và thời gian giúp người cô thế.",
      "Phóng sinh chim cá, bảo vệ muôn loài để tăng trưởng thọ mạng.",
      "Hòa ái nhường nhịn, dùng lời nói ái ngữ nâng đỡ tâm hồn người khác.",
      "Ẩn đức không khoe khoang (Âm đức) để phước báu lưu giữ bền lâu cho con cháu.",
    ],
  },
  {
    id: 4,
    chineseTitle: "Khiêm Đức Chi Hiệu (謙德之效)",
    vietnameseTitle: "Hiệu Nghiệm Của Đức Khiêm Tốn",
    summary:
      "Kinh Dịch nói: 'Trời bớt chỗ dư mà thêm vào chỗ thiếu, Đất biến đổi chỗ đầy mà chảy vào chỗ trũng, Quỷ thần làm hại kẻ kiêu căng mà ban phước cho người khiêm tốn'. Trong 64 quẻ Dịch, duy chỉ có quẻ Khiêm (Địa Sơn Khiêm) là 6 hào đều đại cát, không có hào nào hung.",
    corePhilosophy: "Kẻ kiêu ngạo tự đóng cửa phước báu; Người khiêm nhường dung nạp vạn dòng sông.",
    karmicPrinciple:
      "Càng có tài càng phải khiêm tốn, càng có phước càng phải nhún nhường. Người chuẩn bị đón nhận đại phước bao giờ trên nét mặt cũng toát lên vẻ từ hòa, cung kính, sẵn sàng lắng nghe và nhường nhịn người khác.",
    practicalSteps: [
      "Hạ thấp cái tôi, luôn tôn trọng và học hỏi từ mọi người xung quanh.",
      "Khi thành công không tự đắc, quy công lao về cho ơn trên và cộng đồng.",
      "Khi bị chê bai chỉ trích, lắng nghe với lòng biết ơn để tự răn mình.",
      "Luôn giữ nét mặt hòa ái, ánh mắt từ bi và lời nói khiêm cung.",
    ],
  },
];

/**
 * 10 Hạnh Nguyện Tích Thiện Thực Hành Hằng Ngày theo Liễu Phàm Tứ Huấn
 */
export const LIEU_PHAM_THAP_THIEN_HANH: ThienHanhItem[] = [
  {
    id: 1,
    category: "CHINH_TAM",
    title: "Hiếu Kính Cha Mẹ & Bậc Trưởng Bối",
    description: "Ân cần thăm hỏi, phụng dưỡng cha mẹ, giữ lòng hiếu thuận làm gốc sinh phước.",
    meritPoints: 20,
    remedyFor: "Gia đạo bất an, tài lộc trắc trở, con cái ngỗ nghịch.",
  },
  {
    id: 2,
    category: "HANH_DONG",
    title: "Phóng Sinh & Tôn Trọng Sự Sống",
    description: "Cứu chuộc chim cá thả về tự nhiên, ăn chay tịnh dưỡng lòng từ bi.",
    meritPoints: 15,
    remedyFor: "Bệnh tật tật ách, tai nạn bất ngờ, sức khỏe suy giảm.",
  },
  {
    id: 3,
    category: "HANH_DONG",
    title: "Xả Tài Bố Thí & Cứu Khổ",
    description: "Trích một phần thu nhập giúp đỡ người nghèo khó, bệnh tật hoặc gặp hoạn nạn.",
    meritPoints: 15,
    remedyFor: "Phá sản, hao tài tán của, nợ nần bế tắc.",
  },
  {
    id: 4,
    category: "NGON_TU",
    title: "Ái Ngữ & Hòa Giải Tranh Chấp",
    description: "Nói lời chân thật từ ái, dập tắt lửa thị phi, không nói lời thêu dệt đâm chọc.",
    meritPoints: 10,
    remedyFor: "Kiện tụng quan môn, khẩu thiệt đàm tiếu, tiểu nhân hãm hại.",
  },
  {
    id: 5,
    category: "CHINH_TAM",
    title: "Tùy Hỷ Công Đức & Không Ganh Ghét",
    description: "Vui mừng trước thành công và hạnh phúc của người khác, dập tắt tâm đố kỵ.",
    meritPoints: 10,
    remedyFor: "Tâm trạng u uất, thiếu may mắn, làm việc gì cũng dở dang.",
  },
  {
    id: 6,
    category: "HANH_DONG",
    title: "Ấn Tống Kinh Sách & Lan Tỏa Minh Triết",
    description: "Chia sẻ tài liệu đạo đức, hướng dẫn người khác biết kính sợ nhân quả.",
    meritPoints: 15,
    remedyFor: "Mê mờ thiếu trí tuệ, thi cử lận đận, mất phương hướng cuộc đời.",
  },
  {
    id: 7,
    category: "CHINH_TAM",
    title: "Nhẫn Nhục Ba La Mật Khi Bị Oan Ức",
    description: "Bị hiểu lầm hay sỉ nhục vẫn an nhiên mỉm cười, xem đó là trả nghiệp cũ.",
    meritPoints: 25,
    remedyFor: "Oán thù truyền kiếp, nghịch cảnh liên miên, họa vô đơn chí.",
  },
  {
    id: 8,
    category: "HANH_DONG",
    title: "Tu Sửa Cầu Đường & Nơi Công Cộng",
    description: "Tham gia quét dọn đường sá, trồng cây xanh, hỗ trợ công trình từ thiện.",
    meritPoints: 10,
    remedyFor: "Xuất hành trắc trở, tai nạn xe cộ, việc làm ăn chậm trễ.",
  },
  {
    id: 9,
    category: "CHINH_TAM",
    title: "Sám Hối Lỗi Lầm Mỗi Tối Trước Khi Ngủ",
    description: "Tự kiểm điểm thân-khẩu-ý trong ngày, thành tâm hối cải trước bàn thờ tổ tiên/Phật.",
    meritPoints: 15,
    remedyFor: "Ác mộng bóng đè, tâm thần bất định, linh cảm điều xấu.",
  },
  {
    id: 10,
    category: "NGON_TU",
    title: "Khiêm Cung Từ Ái Trong Mọi Ứng Xử",
    description: "Nhún nhường, xưng hô tôn kính, lắng nghe nhiều hơn nói, tôn vinh người khác.",
    meritPoints: 20,
    remedyFor: "Quan hệ đổ vỡ, bị cấp trên xa lánh, mất đi quý nhân tương trợ.",
  },
];

/**
 * Hàm phân tích và gợi ý bài học Liễu Phàm Tứ Huấn phù hợp với quẻ Dịch / Vận hạn
 */
export function getLieuPhamRemedy(omenType: string, reason?: string) {
  const o = omenType.toLowerCase();

  if (o.includes("tài") || o.includes("phá sản") || o.includes("tiền") || o.includes("khốn")) {
    return {
      lesson: LIEU_PHAM_BON_BAI_HOC[2], // Tích thiện xả tài
      advice: "Quẻ chỉ ra cung Tài đang gặp chướng duyên do phước báu tiền kiếp bị rò rỉ. Theo Liễu Phàm Tứ Huấn, 'Xả tài thì tụ phước'. Con hãy trích một phần tiền bạc để giúp đỡ người nguy cấp, bố thí thức ăn cho người nghèo. Khi con mở rộng tâm lượng cho đi, dòng chảy tài lộc tự nhiên sẽ khai thông hanh thông trở lại.",
      recommendedActions: [LIEU_PHAM_THAP_THIEN_HANH[2], LIEU_PHAM_THAP_THIEN_HANH[0]],
    };
  }

  if (o.includes("bệnh") || o.includes("tai ách") || o.includes("khảm") || o.includes("sức khỏe")) {
    return {
      lesson: LIEU_PHAM_BON_BAI_HOC[0], // Lập mạng & Phóng sinh
      advice: "Thân mạng đang gặp đại hạn do nghiệp sát hoặc oán khí quấy rầy. Đại sư Viên Liễu Phàm xưa kia từng bị Khổng tiên sinh đoán thọ chỉ 53 tuổi, nhưng nhờ phát nguyện làm 3.000 việc thiện và đại phóng sinh mà sống thọ đến hơn 74 tuổi. Con hãy lập hạnh phóng sinh chim cá, ăn chay giảm sát sinh và sám hối nghiệp cũ để tăng trưởng thọ mạng.",
      recommendedActions: [LIEU_PHAM_THAP_THIEN_HANH[1], LIEU_PHAM_THAP_THIEN_HANH[8]],
    };
  }

  if (o.includes("quan") || o.includes("kiện") || o.includes("thị phi") || o.includes("tranh chấp")) {
    return {
      lesson: LIEU_PHAM_BON_BAI_HOC[3], // Khiêm đức
      advice: "Quẻ ngộ thị phi, quan tụng là do tính khí kiêu ngạo hoặc khẩu nghiệp chưa thanh tịnh. Liễu Phàm Tứ Huấn dạy: 'Quẻ Địa Sơn Khiêm 6 hào đều đại cát'. Con nên dừng lại mọi tranh cãi, nhẫn nhịn nhường một bước, dùng ái ngữ đối đãi với kẻ chống đối. Nhẫn nhục là pháp bảo hóa giải oan gia trái chủ màu nhiệm nhất.",
      recommendedActions: [LIEU_PHAM_THAP_THIEN_HANH[3], LIEU_PHAM_THAP_THIEN_HANH[6], LIEU_PHAM_THAP_THIEN_HANH[9]],
    };
  }

  return {
    lesson: LIEU_PHAM_BON_BAI_HOC[1], // Cải quá
    advice: "Vận trình đang chững lại để thử thách tâm tính của con. Cổ nhân dạy 'Hết cơn bĩ cực đến hồi thái lai'. Con hãy tận dụng thời gian này để quán chiếu lại thân tâm, dứt bỏ những thói quen xấu, làm tròn hiếu đạo với cha mẹ. Khi tâm con chuyển thành thuần thiện, vận mạng sẽ tự khắc đổi chiều từ hung hóa cát.",
    recommendedActions: [LIEU_PHAM_THAP_THIEN_HANH[0], LIEU_PHAM_THAP_THIEN_HANH[4], LIEU_PHAM_THAP_THIEN_HANH[8]],
  };
}
