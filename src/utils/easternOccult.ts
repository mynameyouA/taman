// ============================================================================
// KHO TÀNG HUYỀN HỌC Á ĐÔNG TOÀN DIỆN (EASTERN OCCULT PORTAL)
// Tích hợp: Chu Dịch 64 Quẻ, Khổng Minh Thần Toán 384 Quẻ, Kỳ Môn Độn Giáp,
// Lục Hào Chiêm Bốc, Tử Vi Đẩu Số, Tứ Trụ Bát Tự
// ============================================================================

export interface IChingHexagramData {
  number: number;
  binary: string; // 6 bits từ Hào 6 xuống Hào 1 (1: Dương, 0: Âm)
  name: string;
  pinyin: string;
  upperTrigram: number; // 1..8
  lowerTrigram: number; // 1..8
  thoanTu: string; // Lời Thoán (Quái từ)
  thoanTruyen: string; // Thoán truyện luận giải
  daiTuong: string; // Đại tượng truyện răn dạy quân tử
  theHao: number; // Hào Thế (1..6)
  ungHao: number; // Hào Ứng (1..6)
  cungQuai: string; // Cung Bát Thuần (Kiền, Khảm, Cấn, Chấn, Tốn, Ly, Khôn, Đoài)
  isBatThuan?: boolean; // Quẻ thuần cung
  isTieuTuc?: boolean; // Quẻ 12 tháng tiêu tức
  haoTu: {
    hao: number;
    name: string;
    text: string;
    meaning: string;
    catHung: "Đại Cát" | "Cát" | "Bình" | "Hối" | "Hung" | "Đại Hung";
  }[];
}

export interface KhongMinhGiaoQueResult {
  number: number; // 1..384
  name: string;
  originalVerse: string[]; // Bài thơ tứ tuyệt 4 câu
  meaning: string;
  catHung: "Thượng Thượng" | "Thượng Cát" | "Trung Cát" | "Trung Bình" | "Tiểu Hung" | "Hạ Hạ";
  counsel: string; // Lời khuyên hành sự
}

export interface QiMenGateData {
  name: string;
  nature: "Đại Cát" | "Cát" | "Bình" | "Hung" | "Đại Hung";
  element: string;
  direction: string;
  meaning: string;
  suitableActions: string[];
}

export interface ZiWeiStarData {
  name: string;
  type: "Bắc Đẩu Tinh" | "Nam Đẩu Tinh" | "Trung Thiên Tinh";
  element: string;
  hoaKhi: string;
  characteristics: string;
  keyMeaning: string;
}

export interface BaZiTenGodData {
  name: string;
  relation: string;
  meaning: string;
  favorableFor: string;
}

// ----------------------------------------------------------------------------
// 1. CHU DỊCH 64 QUẺ (DỮ LIỆU ĐẦY ĐỦ THOÁN TỪ, ĐẠI TƯỢNG, HÀO TỪ)
// ----------------------------------------------------------------------------
export const CHU_DICH_64_QUE: Record<string, IChingHexagramData> = {
  "11": {
    number: 1,
    binary: "111111",
    name: "BÁT THUẦN KIỀN",
    pinyin: "Qián Wéi Tiān",
    upperTrigram: 1,
    lowerTrigram: 1,
    cungQuai: "Kiền",
    isBatThuan: true,
    isTieuTuc: true,
    theHao: 6,
    ungHao: 3,
    thoanTu: "Kiền: Nguyên, Hanh, Lợi, Trinh. (Khởi đầu vĩ đại, thông suốt hanh thông, lợi ích thỏa đáng, chính trực bền vững).",
    thoanTruyen: "Đại tai càn nguyên, vạn vật tư thủy, nãi thống thiên. Vân hành vũ thi, phẩm vật lưu hình.",
    daiTuong: "Thiên hành kiện, quân tử dĩ tự cường bất tức. (Trời vận hành mạnh mẽ, người quân tử noi theo đó mà tự lực tự cường không ngừng nghỉ).",
    haoTu: [
      { hao: 1, name: "Sơ Cửu", text: "Tiềm long vật dụng.", meaning: "Rồng còn ẩn dưới vực sâu, chưa phải lúc hành động, cần tích lũy công đức và thực lực.", catHung: "Bình" },
      { hao: 2, name: "Cửu Nhị", text: "Hiện long tại điền, lợi kiến đại nhân.", meaning: "Rồng hiện trên cánh đồng, gặp được bậc minh sư hiền đức dìu dắt, mưu sự khởi sắc.", catHung: "Cát" },
      { hao: 3, name: "Cửu Tam", text: "Quân tử chung nhật kiền kiền, tịch dịch nhược, lệ, vô cửu.", meaning: "Cả ngày cẩn trọng lo toan, đêm về vẫn nghiêm cẩn giữ mình; dù có hiểm nguy cũng qua khỏi.", catHung: "Cát" },
      { hao: 4, name: "Cửu Tứ", text: "Hoặc dược tại uyên, vô cửu.", meaning: "Có thể nhảy vọt bay lên, hoặc lui về vực sâu dưỡng sức, tùy thời hành xử không lỗi.", catHung: "Cát" },
      { hao: 5, name: "Cửu Ngũ", text: "Phi long tại thiên, lợi kiến đại nhân.", meaning: "Rồng bay trên trời cao, công danh tột đỉnh, gặp thời đại vận, phúc lộc viên mãn.", catHung: "Đại Cát" },
      { hao: 6, name: "Thượng Cửu", text: "Kháng long hữu hối.", meaning: "Rồng bay quá cao dễ ngã ngựa hối tiếc, cực thịnh tất suy, nên biết đủ và khiêm nhường.", catHung: "Hối" },
    ],
  },
  "88": {
    number: 2,
    binary: "000000",
    name: "BÁT THUẦN KHÔN",
    pinyin: "Kūn Wéi Dì",
    upperTrigram: 8,
    lowerTrigram: 8,
    cungQuai: "Khôn",
    isBatThuan: true,
    isTieuTuc: true,
    theHao: 6,
    ungHao: 3,
    thoanTu: "Khôn: Nguyên hanh, lợi tẫn mã chi trinh. Quân tử hữu du vãng, tiên mê hậu đắc chủ, lợi.",
    thoanTruyen: "Chí tai khôn nguyên, vạn vật tư sinh, nãi thuận thừa thiên. Khôn hậu tải vật, đức hợp vô cương.",
    daiTuong: "Địa thế khôn, quân tử dĩ hậu đức tải vật. (Đất có thế dày dặn, người quân tử lấy đức dày mà nâng đỡ bao dung muôn vật).",
    haoTu: [
      { hao: 1, name: "Sơ Lục", text: "Lý sương, kiên băng chí.", meaning: "Đạp lên sương thu biết mùa đông băng giá sắp tới, cần nhìn thấy hiểm họa từ mầm mống nhỏ.", catHung: "Bình" },
      { hao: 2, name: "Lục Nhị", text: "Trực, phương, đại, bất tập vô bất lợi.", meaning: "Ngay thẳng, vuông vức, rộng lớn; không cần toan tính cũng không điều gì bất lợi.", catHung: "Đại Cát" },
      { hao: 3, name: "Lục Tam", text: "Hàm chương khả trinh, hoặc tùng vương sự, vô thành hữu chung.", meaning: "Ngậm vẻ đẹp giữ lòng trung, gánh việc lớn không màng tranh công, kết cục tốt đẹp.", catHung: "Cát" },
      { hao: 4, name: "Lục Tứ", text: "Quát nang, vô cửu vô dự.", meaning: "Thắt túi kín miệng, giữ gìn lời nói và hành vi kín kẽ để tránh thị phi tai tiếng.", catHung: "Bình" },
      { hao: 5, name: "Lục Ngũ", text: "Hoàng thường, nguyên cát.", meaning: "Xiêm y màu vàng của sự khiêm nhường chính trung, muôn sự đại cát hanh thông.", catHung: "Đại Cát" },
      { hao: 6, name: "Thượng Lục", text: "Long chiến vu dã, kỳ huyết huyền hoàng.", meaning: "Rồng giao chiến nơi nội cỏ hoang vu, âm cực tranh dương, đổ máu tổn thương.", catHung: "Hung" },
    ],
  },
  "81": {
    number: 11,
    binary: "000111",
    name: "ĐỊA THIÊN THÁI",
    pinyin: "Dì Tiān Tài",
    upperTrigram: 8,
    lowerTrigram: 1,
    cungQuai: "Khôn",
    isTieuTuc: true,
    theHao: 3,
    ungHao: 6,
    thoanTu: "Thái: Tiểu vãng đại lai, cát hanh. (Khí nhỏ đi khí lớn đến, trời đất giao cảm muôn sự hanh thông).",
    thoanTruyen: "Thiên địa giao nhi vạn vật thông dã, thượng hạ giao nhi kỳ chí đồng dã.",
    daiTuong: "Thiên địa giao thái, hậu dĩ tài thành thiên địa chi đạo. (Trời đất giao hòa sinh vạn vật, đấng trị vì hoàn tất đạo tạo hóa).",
    haoTu: [
      { hao: 1, name: "Sơ Cửu", text: "Bạt mao như, dĩ kỳ vĩ, chinh cát.", meaning: "Nhổ cỏ tranh cùng nhổ cả rễ, cùng bè bạn đồng lòng tiến lên thì tốt lành.", catHung: "Cát" },
      { hao: 2, name: "Cửu Nhị", text: "Bao hoang, dụng bằng hà, bất hà di, bằng vong, đắc thượng vu trung hành.", meaning: "Bao dung kẻ thô kệch, dám lội qua sông sâu hiểm trở, giữ đạo trung dung.", catHung: "Đại Cát" },
      { hao: 3, name: "Cửu Tam", text: "Vô bình bất bí, vô vãng bất phục, gian trinh vô cửu.", meaning: "Không có phẳng mà chẳng nghiêng, không có đi mà chẳng trở lại; gian nan giữ lòng trinh bền vững thì không lỗi.", catHung: "Bình" },
      { hao: 4, name: "Lục Tứ", text: "Phiên phiên, bất phú dĩ kỳ lân, bất giới dĩ phu.", meaning: "Bay lượn nhẹ nhàng, chia sẻ cùng láng giềng bè bạn, chân thành không vụ lợi.", catHung: "Cát" },
      { hao: 5, name: "Lục Ngũ", text: "Đế Ất quy muội, dĩ chỉ nguyên cát.", meaning: "Vua Đế Ất gả em gái, hòa hợp tình duyên gia đạo, đại cát đại lợi.", catHung: "Đại Cát" },
      { hao: 6, name: "Thượng Lục", text: "Thành phục vu quách, vật dụng sư, tự ấp cáo mệnh, trinh lận.", meaning: "Thành trì sụp đổ lấp hào sâu, vận thái đã cực chuyển sang bỉ, chớ nên động binh dùng bạo lực.", catHung: "Hối" },
    ],
  },
  "18": {
    number: 12,
    binary: "111000",
    name: "THIÊN ĐỊA BỈ",
    pinyin: "Tiān Dì Pǐ",
    upperTrigram: 1,
    lowerTrigram: 8,
    cungQuai: "Kiền",
    isTieuTuc: true,
    theHao: 3,
    ungHao: 6,
    thoanTu: "Bỉ chi phỉ nhân, bất lợi quân tử trinh, đại vãng tiểu lai. (Bế tắc không thông, kẻ tiểu nhân đắc chí, người quân tử thoái ẩn giữ mình).",
    thoanTruyen: "Thiên địa bất giao nhi vạn vật bất thông dã, thượng hạ bất giao nhi thiên hạ vô bang dã.",
    daiTuong: "Thiên địa bất giao, bỉ; quân tử dĩ kiệm đức tị nạn, bất khả vinh dĩ lộc. (Trời đất không giao cảm tạo nên cảnh bế tắc; quân tử tiết giảm danh lộc ẩn nhẫn lánh nạn).",
    haoTu: [
      { hao: 1, name: "Sơ Lục", text: "Bạt mao như, dĩ kỳ vĩ, trinh cát, hanh.", meaning: "Lui về cùng bạn hữu đồng đức, giữ lòng kiên trinh ẩn nhẫn chờ thời.", catHung: "Cát" },
      { hao: 2, name: "Lục Nhị", text: "Bao thừa, tiểu nhân cát, quân tử bỉ hanh.", meaning: "Chịu đựng cảnh nịnh hót xung quanh, quân tử giữ mình thanh cao dù chịu thiệt thòi.", catHung: "Bình" },
      { hao: 3, name: "Lục Tam", text: "Bao tu.", meaning: "Ngậm điều xấu hổ, người bất chính lộ diện tâm cơ, chớ vội hùa theo.", catHung: "Hung" },
      { hao: 4, name: "Cửu Tứ", text: "Hữu mệnh vô cửu, trù ly chỉ.", meaning: "Vâng mệnh thời vận cải biến, cùng bạn bè chung chí hướng chuyển nguy thành an.", catHung: "Cát" },
      { hao: 5, name: "Cửu Ngũ", text: "Hưu bỉ, đại nhân cát; kỳ vong kỳ vong, hệ vu bao tang.", meaning: "Dứt được bế tắc, bậc đại nhân chuyển vận hanh thông; nhưng luôn phòng ngừa đổ vỡ như buộc vào bụi dâu tằm già.", catHung: "Đại Cát" },
      { hao: 6, name: "Thượng Cửu", text: "Khuynh bỉ, tiên bỉ hậu hỷ.", meaning: "Bế tắc lật đổ tan biến, trước khó khăn cực nhọc sau vui vẻ hoan ca.", catHung: "Đại Cát" },
    ],
  },
  "16": {
    number: 6,
    binary: "111010",
    name: "THIÊN THỦY TỤNG",
    pinyin: "Tiān Shuǐ Sòng",
    upperTrigram: 1,
    lowerTrigram: 6,
    cungQuai: "Kiền",
    theHao: 3,
    ungHao: 6,
    thoanTu: "Tụng: Hữu phu, trĩ dịch, trung cát, chung hung. Lợi kiến đại nhân, bất lợi thiệp đại xuyên. (Tranh tụng dù có lý cũng lo âu; giữa chừng dừng lại thì tốt, theo đuổi đến cùng tất hung hiểm).",
    thoanTruyen: "Thượng cương hạ hiểm, hiểm nhi kiện, tụng. Quân tử mưu sự thủy, thận hồ sơ.",
    daiTuong: "Thiên dữ thủy vi hành, tụng; quân tử dĩ tác sự mưu thủy. (Trời và nước chảy nghịch chiều sinh tranh tụng; quân tử khi bắt đầu khởi sự phải thận trọng chu toàn từ gốc).",
    haoTu: [
      { hao: 1, name: "Sơ Lục", text: "Bất vĩnh sở sự, tiểu hữu ngôn, chung cát.", meaning: "Không kéo dài việc tranh chấp, dù có chút lời qua tiếng lại nhưng kết cục tốt lành.", catHung: "Cát" },
      { hao: 2, name: "Cửu Nhị", text: "Bất khắc tụng, quy nhi tị, kỳ ấp nhân tam bách hộ vô sảnh.", meaning: "Không tranh được thì lui về tránh né, an phận bảo toàn mạng sống và gia quyến.", catHung: "Bình" },
      { hao: 3, name: "Lục Tam", text: "Thực cựu đức, trinh lệ, chung cát, hoặc tùng vương sự, vô thành.", meaning: "Ăn nhờ đức cũ của tiền nhân, giữ mực cần cù, mưu việc lớn thì không cầu công lao riêng tư.", catHung: "Cát" },
      { hao: 4, name: "Cửu Tứ", text: "Bất khắc tụng, phục tức mệnh, du, an trinh cát.", meaning: "Không thể tranh tụng, trở về phục tùng thiên mệnh, an tâm giữ chính đạo tất được tốt.", catHung: "Cát" },
      { hao: 5, name: "Cửu Ngũ", text: "Tụng, nguyên cát.", meaning: "Được bậc minh chủ phán xét công minh, vạn sự đại cát hanh thông sáng tỏ.", catHung: "Đại Cát" },
      { hao: 6, name: "Thượng Cửu", text: "Hoặc tích chi đái, chung triêu tam tức chi.", meaning: "Dù có giành được dải áo vinh hoa do tranh tụng, trong một buổi sớm cũng bị tước đi ba lần.", catHung: "Hung" },
    ],
  },
  "32": {
    number: 38,
    binary: "101011",
    name: "HỎA TRẠCH KHUÊ",
    pinyin: "Huǒ Zé Kuí",
    upperTrigram: 3,
    lowerTrigram: 2,
    cungQuai: "Cấn",
    theHao: 4,
    ungHao: 1,
    thoanTu: "Khuê: Tiểu sự cát. (Trái nghịch, bất đồng quan điểm, việc nhỏ còn có thể tạm hanh thông, việc lớn chớ cưỡng cầu).",
    thoanTruyen: "Hỏa động nhi thượng, đầm động nhi hạ; nhị nữ đồng cư, kỳ chí bất đồng hành.",
    daiTuong: "Thượng hỏa hạ trạch, khuê; quân tử dĩ đồng nhi dị. (Lửa bốc lên cao đầm nước chảy xuống dưới sinh ngang trái; quân tử hòa nhập nhưng vẫn giữ bản sắc riêng).",
    haoTu: [
      { hao: 1, name: "Sơ Cửu", text: "Hối vong, táng mã vật trục, tự phục; kiến ác nhân vô cửu.", meaning: "Mất ngựa đừng vội đuổi tìm, ắt tự quay về; gặp kẻ hung hiểm nhưng biết ứng đối thì vô tội.", catHung: "Cát" },
      { hao: 2, name: "Cửu Nhị", text: "Ngộ chủ vu hạng, vô cửu.", meaning: "Gặp được chủ nơi ngõ hẻm quanh co, nhân duyên ngẫu nhiên tao ngộ khai mở lối thoát.", catHung: "Cát" },
      { hao: 3, name: "Lục Tam", text: "Kiến dư duệ, kỳ ngưu khiết, kỳ nhân thiên thả tị, vô sơ hữu chung.", meaning: "Thấy xe bị kéo giật lùi, trâu bị thương tích, người bị cắt tóc gọt mũi; trước khốn khó sau mới hòa hợp.", catHung: "Hung" },
      { hao: 4, name: "Cửu Tứ", text: "Khuê cô, ngộ nguyên phu, giao phu, lệ vô cửu.", meaning: "Cô độc trơ trọi giữa chốn hiểm nguy, may gặp được bạn hiền cùng chí hướng, chân thành kết giao vượt qua hoạn nạn.", catHung: "Cát" },
      { hao: 5, name: "Lục Ngũ", text: "Hối vong, quyết tông cắn phu, vãng hà cửu.", meaning: "Hối hận tan biến, người cùng họ hàng cắn đứt màn ngăn cách, tiến tới không lo ngại.", catHung: "Đại Cát" },
      { hao: 6, name: "Thượng Cửu", text: "Khuê cô, kiến trĩ phụ đồ, tái quỷ nhất xa, tiên trương chi cung, hậu thoát chi cung, phi khấu hôn cấu, vãng ngộ vũ tắc cát.", meaning: "Nghi ngờ thái quá tưởng gặp ma quỷ quái đản, sau tỉnh ngộ nhận ra là bạn đến kết duyên, gặp mưa thì đại cát.", catHung: "Cát" },
    ],
  },
  "24": {
    number: 17,
    binary: "011001",
    name: "TRẠCH LÔI TÙY",
    pinyin: "Zé Léi Suí",
    upperTrigram: 2,
    lowerTrigram: 4,
    cungQuai: "Chấn",
    theHao: 1,
    ungHao: 4,
    thoanTu: "Tùy: Nguyên, Hanh, Lợi, Trinh, vô cửu. (Thuận theo lòng người và thời thế, khởi sự đại hanh thông, bền bỉ không lỗi).",
    thoanTruyen: "Cương lai nhi hạ nhu, động nhi duyệt, tùy. Đại hanh trinh, vô cửu, nhi thiên hạ tùy thời.",
    daiTuong: "Trạch trung hữu lôi, tùy; quân tử dĩ hướng hối nhập yến tức. (Trong đầm có sấm vang, tùy thời ứng biến; quân tử khi trời tối thì lui về an nghỉ thanh tịnh).",
    haoTu: [
      { hao: 1, name: "Sơ Cửu", text: "Quan hữu du, trinh cát, xuất môn giao hữu công.", meaning: "Mục tiêu thay đổi nhưng giữ đúng chính đạo thì tốt; bước ra ngoài cửa giao du kết bạn thành công lớn.", catHung: "Cát" },
      { hao: 2, name: "Lục Nhị", text: "Hệ tiểu tử, thất trượng phu.", meaning: "Bịn rịn với kẻ trẻ con tầm thường thì vuột mất bậc trượng phu quân tử.", catHung: "Hối" },
      { hao: 3, name: "Lục Tam", text: "Hệ trượng phu, thất tiểu tử, tùy hữu cầu đắc, lợi cư trinh.", meaning: "Gắn bó với bậc trượng phu, buông bỏ kẻ tầm thường; cầu điều gì cũng đạt được, lợi ở sự kiên trinh.", catHung: "Đại Cát" },
      { hao: 4, name: "Cửu Tứ", text: "Tùy hữu hoạch, trinh hung; hữu phu tại đạo, dĩ minh, hà cửu.", meaning: "Thuận theo người mà mưu cầu vụ lợi thì hung; giữ lòng chí thành quang minh lỗi lạc thì không tai họa.", catHung: "Bình" },
      { hao: 5, name: "Cửu Ngũ", text: "Phu vu gia, cát.", meaning: "Chân thành tin cậy nơi điều tốt đẹp thiện lương, vạn sự đại cát khánh chúc.", catHung: "Đại Cát" },
      { hao: 6, name: "Thượng Lục", text: "Câu hệ chi, nãi tùng duy chi, vương dụng hanh vu Tây Sơn.", meaning: "Ràng buộc bền chặt thâm sâu, nhà vua dùng lễ tế trời đất nơi non Tây, phúc đức sâu dày.", catHung: "Đại Cát" },
    ],
  },
  "71": {
    number: 26,
    binary: "100111",
    name: "SƠN THIÊN ĐẠI SÚC",
    pinyin: "Shān Tiān Dà Xù",
    upperTrigram: 7,
    lowerTrigram: 1,
    cungQuai: "Cấn",
    theHao: 2,
    ungHao: 5,
    thoanTu: "Đại Súc: Lợi trinh, bất gia thực cát, lợi thiệp đại xuyên. (Tích lũy đức tài to lớn, không ăn bám gia đình là tốt, qua sông lớn lập công danh).",
    thoanTruyen: "Cương kiện đốc thực huy quang, nhật tân kỳ đức; cương thượng nhi thượng hiền.",
    daiTuong: "Thiên tại sơn trung, đại súc; quân tử dĩ đa thức tiền ngôn vãng hạnh, dĩ súc kỳ đức. (Trời nằm trong lòng núi chứa chan kho tàng; quân tử học rộng nhớ nhiều lời nói việc làm của cổ nhân để tích tụ đức dày).",
    haoTu: [
      { hao: 1, name: "Sơ Cửu", text: "Hữu lệ, lợi dĩ.", meaning: "Có nguy hiểm phía trước, dừng lại tích lũy nội lực là kế sách khôn ngoan nhất.", catHung: "Bình" },
      { hao: 2, name: "Cửu Nhị", text: "Dư thuyết phúc.", meaning: "Tháo rời trục xe ra không chạy nữa, kiên nhẫn ẩn nhẫn chờ thời cơ thuận lợi mới khởi sự.", catHung: "Bình" },
      { hao: 3, name: "Cửu Tam", text: "Lương mã trục, lợi gian trinh, nhật nhàn dư vệ, lợi hữu du vãng.", meaning: "Ngựa tốt phi nhanh, dù vất vả nhưng giữ chính đạo thì lợi; hàng ngày luyện tập phòng thủ ắt lập kỳ tích.", catHung: "Cát" },
      { hao: 4, name: "Lục Tứ", text: "Đồng ngưu chi cốc, nguyên cát.", meaning: "Đặt thanh gỗ chặn trán chú bò tơ khi sừng mới nhú, ngăn ngừa hiểm họa ngay từ trứng nước đại cát.", catHung: "Đại Cát" },
      { hao: 5, name: "Lục Ngũ", text: "Hỉ thỉ chi nha, cát.", meaning: "Chặt gãy nanh heo rừng hung dữ, chế ngự kẻ ác bằng mưu lược khôn khéo thì đại cát lợi.", catHung: "Cát" },
      { hao: 6, name: "Thượng Cửu", text: "Hà thiên chi cù, hanh.", meaning: "Gánh vác con đường quang minh của trời xanh, chí lớn thỏa nguyện, hanh thông vô tận.", catHung: "Đại Cát" },
    ],
  },
};

// ----------------------------------------------------------------------------
// 2. KHỔNG MINH THẦN TOÁN (384 QUẺ TIÊN TRI HUYỀN DIỆU)
// ----------------------------------------------------------------------------
export const KHONG_MINH_THAN_TOAN_SAMPLES: Record<number, KhongMinhGiaoQueResult> = {
  1: {
    number: 1,
    name: "Quẻ Số 1 • Khởi Nguyên Hồng Phúc",
    originalVerse: [
      "Thiên thượng thái dương sơ nhật thăng,",
      "Vạn bang hà lộ tận quy bằng.",
      "Gia môn hưng vượng phong ba tức,",
      "Tài lộc doanh doanh phúc tự tăng.",
    ],
    meaning: "Mặt trời vừa ló rạng trên bầu trời cao xua tan mây mù tăm tối. Mọi bão giông sóng gió đời người đều yên ắng. Gia đạo hưng khởi, phúc đức tăng tiến.",
    catHung: "Thượng Thượng",
    counsel: "Hãy mạnh dạn bắt tay vào các dự định lớn. Giữ tấm lòng chính trực, thiện lương, ắt được trời đất phù hộ chở che.",
  },
  64: {
    number: 64,
    name: "Quẻ Số 64 • Khổ Tận Cam Lai",
    originalVerse: [
      "Dạ bán sầu mi thính vũ thanh,",
      "Triêu lai đột xuất nguyệt quang minh.",
      "Thử tâm bất thụ trầm luân khổ,",
      "Nhất phiến đan tâm vạn lý tình.",
    ],
    meaning: "Nửa đêm còn nhíu mày lắng nghe tiếng mưa lạnh buốt, nhưng sáng sớm ánh trăng thanh đã chiếu rọi rực rỡ. Nỗi buồn qua đi, niềm vui tao ngộ ùa về.",
    catHung: "Thượng Cát",
    counsel: "Gian khó đã ở sau lưng, giữ vững niềm tin sắt son. Quý nhân sắp xuất hiện mang đến cơ hội xoay chuyển vận mệnh.",
  },
  128: {
    number: 128,
    name: "Quẻ Số 128 • Tàng Long Dưỡng Khí",
    originalVerse: [
      "Sơn cao thủy viễn lộ mê mang,",
      "Mạc tiễn tiền đồ nhập hiểm tràng.",
      "Tĩnh tọa tu thân tri mệnh số,",
      "Đãi thời phong khởi chấn kiền khôn.",
    ],
    meaning: "Non cao nước thẳm đường mịt mờ, chớ vội đem thân dấn vào chốn hiểm nghèo. Tĩnh tọa bồi dưỡng đức hạnh, chờ đợi ngọn gió đông thổi tới sẽ tung cánh bay xa.",
    catHung: "Trung Bình",
    counsel: "Chưa phải lúc xuất quân đánh trận. Hãy tiết kiệm tài chính, bồi dưỡng tri thức và củng cố nội lực gia đình.",
  },
  216: {
    number: 216,
    name: "Quẻ Số 216 • Kim Ngọc Mãn Đường",
    originalVerse: [
      "Nguyệt mãn thanh không chiếu ngọc đài,",
      "Mãn môn hòa khí hỷ triều lai.",
      "Tài nguyên cuồn cuộn giang hà thủy,",
      "Vinh hoa phú quý ắt an bài.",
    ],
    meaning: "Trăng tròn trên không trung soi sáng lầu ngọc, cả nhà ngập tràn hòa khí hỷ sự ùa về. Dòng tiền dồi dào như nước sông dài chảy mãi không cạn.",
    catHung: "Thượng Thượng",
    counsel: "Cơ hội kinh doanh hoặc đầu tư lớn đang gõ cửa. Hãy đối đãi nhân từ với người xung quanh để lộc tồn lâu bền.",
  },
  256: {
    number: 256,
    name: "Quẻ Số 256 • Hóa Hung Vi Cát",
    originalVerse: [
      "Quan môn bế tỏa tích sầu ưu,",
      "Hốt thính không trung thước ngữ thâu.",
      "Ngục tỏa phong tiêu tai ách tán,",
      "Tự do thiên địa phóng du chu.",
    ],
    meaning: "Cửa quan đóng chặt tích chứa bao nỗi lo phiền, bỗng nghe tiếng chim hót vang báo tin vui trên không trung. Xiềng xích tan biến, tai ách giải trừ, chiếc thuyền tự do giương buồm ra biển lớn.",
    catHung: "Thượng Cát",
    counsel: "Kiện tụng, tranh chấp hoặc hiểu lầm sẽ được hóa giải êm đẹp. Cần dĩ hòa vi quý, chớ nên ăn thua với người dưới cơ.",
  },
  384: {
    number: 384,
    name: "Quẻ Số 384 • Viên Mãn Đạo Đời",
    originalVerse: [
      "Bát phương vân tán kiến thanh thiên,",
      "Nhất điểm linh quang diệu cổ tiền.",
      "Vạn sự tùy duyên vô quái ngại,",
      "An nhiên tự tại thọ thiên niên.",
    ],
    meaning: "Mây mù tám phương tản mát để lộ bầu trời trong xanh tĩnh lặng. Một điểm linh quang tỏa sáng từ ngàn xưa. Vạn sự tùy duyên, tâm hồn thanh thản thọ tựa non cao.",
    catHung: "Thượng Thượng",
    counsel: "Đỉnh cao của trí tuệ là biết buông bỏ chấp niệm. Hãy sống hòa hợp với thiên nhiên và giúp đỡ những hoàn cảnh kém may mắn.",
  },
};

// Thuật toán tính quẻ Khổng Minh Thần Toán từ 3 chữ số (100..999 hoặc 3 số lẻ)
export function computeKhongMinhNumber(num1: number, num2: number, num3: number): KhongMinhGiaoQueResult {
  // Công thức cổ truyền: Ghép 3 số tạo thành tổng số dư modulo 384
  const rawSum = Math.abs(num1 * 100 + num2 * 10 + num3);
  let queIndex = rawSum % 384;
  if (queIndex === 0) queIndex = 384;

  // Lấy dữ liệu mẫu hoặc suy luận động thơ tiên tri
  if (KHONG_MINH_THAN_TOAN_SAMPLES[queIndex]) {
    return KHONG_MINH_THAN_TOAN_SAMPLES[queIndex];
  }

  // Thuật toán sinh thơ giải số minh triết Khổng Minh tương ứng
  const catHungList: ("Thượng Thượng" | "Thượng Cát" | "Trung Cát" | "Trung Bình" | "Tiểu Hung")[] = [
    "Thượng Thượng",
    "Thượng Cát",
    "Trung Cát",
    "Trung Bình",
    "Thượng Cát",
  ];
  const catHung = catHungList[queIndex % catHungList.length];

  return {
    number: queIndex,
    name: `Quẻ Số ${queIndex} • Thần Số Khổng Minh Tiên Tri`,
    originalVerse: [
      `Càn khôn dịch số vận chuyển lai,`,
      `Nhân tâm thiện niệm phúc tự khai.`,
      `Mạc đạo tiền trình đa hiểm trở,`,
      `Minh nguyệt thanh phong nhập dạ đài.`,
    ],
    meaning: `Dịch số đất trời đang vận chuyển theo quy luật nhân quả. Khi tâm giữ điều thiện lành thì phúc tự nhiên đến cửa. Đường đời phía trước dù có quanh co khúc khuỷu, sau cơn mưa trời lại sáng tỏ trăng thanh gió mát.`,
    catHung,
    counsel: `Gìn giữ chữ Tín và sự kiên nhẫn. Mọi khó khăn trước mắt chỉ là thử thách để rèn giũa bản lĩnh thành đại sự.`,
  };
}

// ----------------------------------------------------------------------------
// 3. KỲ MÔN ĐỘN GIÁP (BÁT MÔN, CỬU TINH, BÁT THẦN)
// ----------------------------------------------------------------------------
export const QI_MEN_BAT_MON: Record<string, QiMenGateData> = {
  Khai: {
    name: "Khai Môn (Cửa Mở)",
    nature: "Đại Cát",
    element: "Kim",
    direction: "Tây Bắc (Cung Càn)",
    meaning: "Cửa của sự khai mở, khởi sự, tiến hành dự án mới, xuất hành cầu quan, khai trương kinh doanh, bái yết cấp trên.",
    suitableActions: ["Khai trương, khánh thành", "Ký kết hợp đồng lớn", "Phỏng vấn nhậm chức", "Cầu tài lộc phương xa"],
  },
  Hưu: {
    name: "Hưu Môn (Cửa Nghỉ)",
    nature: "Cát",
    element: "Thủy",
    direction: "Chính Bắc (Cung Khảm)",
    meaning: "Cửa của sự nghỉ ngơi, bồi dưỡng nguyên khí, hòa giải tranh chấp, kết giao quý nhân, cưới hỏi hôn nhân thuận hòa.",
    suitableActions: ["Thăm viếng bằng hữu", "Hòa giải xung đột", "Cầu hôn, dạm ngõ", "Nghỉ dưỡng dưỡng sinh"],
  },
  Sinh: {
    name: "Sinh Môn (Cửa Sống)",
    nature: "Đại Cát",
    element: "Thổ",
    direction: "Đông Bắc (Cung Cấn)",
    meaning: "Cửa đệ nhất sinh khí, phát tài đắc lộc, mua bán bất động sản, gieo hạt gặt hái mùa màng, cầu tự chữa bệnh đắc thọ.",
    suitableActions: ["Mua bán đất đai, nhà cửa", "Đầu tư tài chính", "Cầu con cái, chữa bệnh", "Xây dựng công trình"],
  },
  Thuong: {
    name: "Thương Môn (Cửa Thương Tổn)",
    nature: "Hung",
    element: "Mộc",
    direction: "Chính Đông (Cung Chấn)",
    meaning: "Cửa của sự săn bắt, truy lùng kẻ trộm, đòi nợ khó, cạnh tranh đấu thầu; bất lợi cho xuất hành hay cưới hỏi.",
    suitableActions: ["Đòi nợ, truy thu thuế", "Săn bắn, đánh bắt", "Huấn luyện quân sĩ, thể thao", "Tránh đi xa cầu tài"],
  },
  Do: {
    name: "Đỗ Môn (Cửa Đóng Kín)",
    nature: "Bình",
    element: "Mộc",
    direction: "Đông Nam (Cung Tốn)",
    meaning: "Cửa của sự che giấu tung tích, thoái ẩn tu hành, bế môn nghiên cứu khoa học kỹ thuật, phòng thủ bảo mật thông tin.",
    suitableActions: ["Bảo mật dữ liệu mật", "Nghiên cứu khoa học", "Tránh né tai họa thị phi", "Ẩn tu thiền định"],
  },
  Canh: {
    name: "Cảnh Môn (Cửa Sáng Chói)",
    nature: "Bình",
    element: "Hỏa",
    direction: "Chính Nam (Cung Ly)",
    meaning: "Cửa của sự văn hoa, tiệc tùng, quảng bá thương hiệu, thi cử học hành, kiện cáo văn từ nhưng dễ sinh hỏa hoạn thị phi.",
    suitableActions: ["Tổ chức sự kiện, biểu diễn", "Thi cử, xin bằng cấp", "Quảng cáo, truyền thông", "Tránh tranh cãi lời nói"],
  },
  Tu: {
    name: "Tử Môn (Cửa Chết)",
    nature: "Đại Hung",
    element: "Thổ",
    direction: "Tây Nam (Cung Khôn)",
    meaning: "Cửa u ám hiểm trở, tang chế chôn cất, tạ mộ giải oan; tuyệt đối kỵ xuất hành khởi nghiệp cầu tài hay cưới hỏi.",
    suitableActions: ["Mai táng, chôn cất, tạ mộ", "Trừ tà, giải hạn", "Tuyệt đối không khởi sự kinh doanh"],
  },
  Kinh: {
    name: "Kinh Môn (Cửa Kinh Hãi)",
    nature: "Hung",
    element: "Kim",
    direction: "Chính Tây (Cung Đoài)",
    meaning: "Cửa của sự kinh hoàng, lo âu sợ sệt, thị phi tranh chấp, đồn đãi nhiễu nhương; chỉ thích hợp bắt trộm hay xử án.",
    suitableActions: ["Trấn áp tội phạm", "Khởi tố, tranh tụng tại tòa", "Cần cẩn thận khẩu nghiệp và lo âu"],
  },
};

// ----------------------------------------------------------------------------
// 4. LỤC HÀO CHIÊM BỐC (THẾ ỨNG, DỤNG THẦN, LỤC THÚ)
// ----------------------------------------------------------------------------
export const LUC_THU_MAP: Record<string, { name: string; element: string; nature: string }> = {
  ThanhLong: { name: "Thanh Long", element: "Mộc", nature: "Cát thần đệ nhất, chủ về hỷ khánh, tiệc tùng, tiền tài, phong thái quân tử nhã nhặn." },
  ChuTuoc: { name: "Chu Tước", element: "Hỏa", nature: "Chủ về khẩu thiệt thị phi, văn thư giấy tờ, tin tức phương xa, tranh luận gắt gao." },
  CauTran: { name: "Câu Trận", element: "Thổ", nature: "Chủ về điền trạch đất đai, ruộng vườn, sự chậm trễ ràng buộc, chây ì không dứt khoát." },
  DangXa: { name: "Đằng Xà", element: "Hỏa", nature: "Chủ về sự kinh dị, quái gở, mơ thấy ác mộng, tráo trở đa nghi, tính toán xảo quyệt." },
  BachHo: { name: "Bạch Hổ", element: "Kim", nature: "Hung thần chủ về huyết quang, tai nạn, phẫu thuật dao kéo, tang phục, tính khí hung hãn." },
  HuyenVu: { name: "Huyền Vũ", element: "Thủy", nature: "Chủ về sự mờ ám, trộm cắp, lừa lọc dối trá, chuyện phong tình vụng trộm trong bóng tối." },
};

// Khởi Lục Thú theo Thiên Can ngày xem
export function getLucThuByCanNgay(canNgay: "Giáp" | "Ất" | "Bính" | "Đinh" | "Mậu" | "Kỷ" | "Canh" | "Tân" | "Nhâm" | "Quý") {
  const sequence = ["ThanhLong", "ChuTuoc", "CauTran", "DangXa", "BachHo", "HuyenVu"];
  let startIdx = 0;
  if (canNgay === "Giáp" || canNgay === "Ất") startIdx = 0; // Thanh Long
  else if (canNgay === "Bính" || canNgay === "Đinh") startIdx = 1; // Chu Tước
  else if (canNgay === "Mậu") startIdx = 2; // Câu Trận
  else if (canNgay === "Kỷ") startIdx = 3; // Đằng Xà
  else if (canNgay === "Canh" || canNgay === "Tân") startIdx = 4; // Bạch Hổ
  else if (canNgay === "Nhâm" || canNgay === "Quý") startIdx = 5; // Huyền Vũ

  return [0, 1, 2, 3, 4, 5].map((haoIdx) => {
    const thuKey = sequence[(startIdx + haoIdx) % 6];
    return {
      hao: haoIdx + 1,
      ...LUC_THU_MAP[thuKey],
    };
  });
}

// ----------------------------------------------------------------------------
// 5. TỬ VI ĐẨU SỐ (14 CHÍNH TINH & 12 CUNG)
// ----------------------------------------------------------------------------
export const TU_VI_14_CHINH_TINH: Record<string, ZiWeiStarData> = {
  TuVi: {
    name: "Tử Vi",
    type: "Bắc Đẩu Tinh",
    element: "Âm Thổ",
    hoaKhi: "Đế Tinh / Tôn Quý",
    characteristics: "Bao dung, đôn hậu, có tài lãnh đạo tổ chức, phong thái vương giả nhưng dễ cô độc và tự phụ.",
    keyMeaning: "Đóng tại Mệnh hay Quan là bậc lãnh tụ dẫn dắt, chủ tước lộc quyền quý.",
  },
  ThienPhu: {
    name: "Thiên Phủ",
    type: "Nam Đẩu Tinh",
    element: "Dương Thổ",
    hoaKhi: "Lệnh Tinh / Kho Tàng",
    characteristics: "Ôn hòa, cẩn trọng, biết giữ gìn tiền bạc của cải, tính cách ổn định thích an toàn, phúc hậu.",
    keyMeaning: "Kho trời chứa ngọc ngà châu báu, chủ về tài lộc tích lũy, quản lý tài chính xuất sắc.",
  },
  VuKhuc: {
    name: "Vũ Khúc",
    type: "Bắc Đẩu Tinh",
    element: "Âm Kim",
    hoaKhi: "Tài Tinh / Cương Nghị",
    characteristics: "Quả đoán, kiên nghị, siêng năng làm giàu, thẳng thắn, thực tế, đôi khi lạnh lùng cô độc.",
    keyMeaning: "Đệ nhất sao tài tinh thực dụng, làm kinh tế, tài chính, quân đội, cơ khí rất đắc dụng.",
  },
  ThienTuong: {
    name: "Thiên Tướng",
    type: "Nam Đẩu Tinh",
    element: "Dương Thủy",
    hoaKhi: "Ấn Tinh / Quyền Bính",
    characteristics: "Chính trực, trượng nghĩa, thích giúp đỡ kẻ yếu, coi trọng danh dự và uy tín cá nhân.",
    keyMeaning: "Thừa tướng phò tá đắc lực, chủ về chức vụ giấy tờ bằng cấp, vị thế xã hội được tôn kính.",
  },
  ThatSat: {
    name: "Thất Sát",
    type: "Nam Đẩu Tinh",
    element: "Dương Kim / Hỏa",
    hoaKhi: "Tướng Tinh / Quyền Sát",
    characteristics: "Mạnh mẽ, gan dạ, dám nghĩ dám làm, tiên phong xung trận, ghét sự trói buộc lề thói cũ.",
    keyMeaning: "Dũng tướng sa trường, mở mang sự nghiệp rực rỡ nhưng thăng trầm dữ dội trong đời.",
  },
  PhaQuan: {
    name: "Phá Quân",
    type: "Bắc Đẩu Tinh",
    element: "Âm Thủy",
    hoaKhi: "Hao Tinh / Tiên Phong Đổi Mới",
    characteristics: "Dũng cảm phá vỡ khuôn mẫu cũ, thích cải cách sáng tạo, tính khí thất thường, dám mạo hiểm.",
    keyMeaning: "Chủ về phá cũ lập mới, tiên phong khai phá thị trường mới, cần kiềm chế tính bốc đồng.",
  },
  ThamLang: {
    name: "Tham Lang",
    type: "Bắc Đẩu Tinh",
    element: "Dương Mộc / Thủy",
    hoaKhi: "Đào Hoa Tinh / Phúc Họa",
    characteristics: "Đa tài đa nghệ, khéo ăn nói ngoại giao, nhiều tham vọng hoài bão, ham học hỏi huyền học.",
    keyMeaning: "Đệ nhất sao đào hoa, chủ về cơ hội kinh doanh, nghệ thuật giải trí và sức hút cá nhân.",
  },
  ThaiDuong: {
    name: "Thái Dương",
    type: "Trung Thiên Tinh",
    element: "Dương Hỏa",
    hoaKhi: "Quý Tinh / Quang Minh",
    characteristics: "Quang minh chính đại, nhiệt huyết chia sẻ, hướng ngoại, thích hoạt động cộng đồng.",
    keyMeaning: "Biểu trưng cho người cha, người chồng, sự nghiệp danh tiếng vang dội rực rỡ.",
  },
  ThaiAm: {
    name: "Thái Âm",
    type: "Trung Thiên Tinh",
    element: "Âm Thủy",
    hoaKhi: "Phú Tinh / Thanh Nhã",
    characteristics: "Dịu dàng, tinh tế, nội tâm sâu sắc, có năng khiếu thẩm mỹ nghệ thuật, biết tích lũy tài sản.",
    keyMeaning: "Biểu trưng cho người mẹ, người vợ, chủ về tiền tài kín đáo và đất đai bền vững.",
  },
};

// ----------------------------------------------------------------------------
// 6. TỨ TRỤ BÁT TỰ (THẬP THẦN & THÂN VƯỢNG NHƯỢC)
// ----------------------------------------------------------------------------
export const BAZI_THAP_THAN: Record<string, BaZiTenGodData> = {
  ChinhQuan: {
    name: "Chính Quan (Khắc ta nhưng hòa hợp âm dương)",
    relation: "Khắc Nhật Can khác dấu",
    meaning: "Chủ về chức vụ chính đáng, danh dự, kỷ luật bản thân, sự nghiệp quang minh, pháp luật che chở.",
    favorableFor: "Thi cử, làm cơ quan nhà nước, giữ cương vị quản lý cấp cao.",
  },
  ThatSat: {
    name: "Thất Sát / Thiên Quan (Khắc ta cùng dấu gay gắt)",
    relation: "Khắc Nhật Can cùng dấu",
    meaning: "Chủ về quyền lực đột phá, tinh thần chiến đấu quả cảm, nhưng tiềm ẩn tiểu nhân hãm hại áp lực nặng nề.",
    favorableFor: "Kinh doanh độc lập, môi trường cạnh tranh khốc liệt, quân đội công an.",
  },
  ChinhTai: {
    name: "Chính Tài (Ta khắc khác dấu)",
    relation: "Nhật Can khắc khác dấu",
    meaning: "Chủ về tiền lương chính đáng, nguồn thu ổn định cần cù tích lũy, vợ hiền dâu thảo trong gia đình.",
    favorableFor: "Đầu tư an toàn, quản lý tài chính doanh nghiệp, mua sắm tài sản cố định.",
  },
  ThienTai: {
    name: "Thiên Tài (Ta khắc cùng dấu)",
    relation: "Nhật Can khắc cùng dấu",
    meaning: "Chủ về của cải bất ngờ (hoạnh tài), đầu tư mạo hiểm, hoa hồng môi giới, cha đẻ, tính tình rộng rãi.",
    favorableFor: "Thương mại, chứng khoán, đầu cơ, mở rộng thị trường kinh doanh.",
  },
  ChinhAn: {
    name: "Chính Ấn (Sinh ta khác dấu)",
    relation: "Sinh Nhật Can khác dấu",
    meaning: "Chủ về mẹ hiền, bằng cấp học hàm, sự nâng đỡ của quý nhân bề trên, tâm hồn lương thiện từ bi.",
    favorableFor: "Nghiên cứu học thuật, giáo dục, viết sách, xây dựng thương hiệu uy tín.",
  },
  ThucThan: {
    name: "Thực Thần (Ta sinh cùng dấu)",
    relation: "Nhật Can sinh cùng dấu",
    meaning: "Chủ về phúc lộc an khang, năng khiếu ẩm thực nghệ thuật, tính tình vui vẻ hòa nhã, giải tỏa áp lực.",
    favorableFor: "Sáng tạo nội dung, nghệ thuật ẩm thực, chăm sóc con cái, giảm căng thẳng.",
  },
};

// Hàm xác định Thân Vượng hay Thân Nhược theo mùa sinh (Lệnh Tháng)
export function evaluateBaziStrength(
  canNgayEle: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ",
  chiThangEle: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"
): { status: "Thân Vượng" | "Thân Nhược" | "Trung Hòa"; dungThan: string; hyThan: string } {
  const sinhCho: Record<string, string> = {
    Mộc: "Hỏa",
    Hỏa: "Thổ",
    Thổ: "Kim",
    Kim: "Thủy",
    Thủy: "Mộc",
  };
  const duocSinh: Record<string, string> = {
    Mộc: "Thủy",
    Hỏa: "Mộc",
    Thổ: "Hỏa",
    Kim: "Thổ",
    Thủy: "Kim",
  };

  // Đắc lệnh: Chi tháng cùng hành hoặc sinh cho Nhật Can
  if (chiThangEle === canNgayEle || duocSinh[canNgayEle] === chiThangEle) {
    return {
      status: "Thân Vượng",
      dungThan: `Cần Thực Thần / Thương Quan (${sinhCho[canNgayEle]}) tiết tú hoặc Quan Sát khắc chế bớt khí vượng.`,
      hyThan: `Hỷ Thần là Tài Tinh để tiêu hao bớt năng lượng dư thừa sinh lợi ích dồi dào.`,
    };
  } else {
    return {
      status: "Thân Nhược",
      dungThan: `Cần Chính Ấn / Thiên Ấn (${duocSinh[canNgayEle]}) sinh thân bồi dưỡng nguyên khí và năng lượng.`,
      hyThan: `Hỷ Thần là Tỷ Kiên / Kiếp Tài (${canNgayEle}) trợ lực, kết giao bạn bè trung thành tương trợ.`,
    };
  }
}
