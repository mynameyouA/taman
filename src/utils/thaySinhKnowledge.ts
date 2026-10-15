/**
 * KHO TRI THỨC VÀ HỘI THOẠI ĐẶC TRƯNG MIỀN NAM CỦA THẦY SINH (NAM BỘ SAGE ENGINE)
 * Giọng điệu cụ già Nam Bộ: Bình dị, mộc mạc, chân chất, từ bi, xưng "Thầy" gọi "Con".
 * Dùng từ ngữ gần gũi Nam Bộ: "nghen con", "hén", "thiệt tình", "rầu rĩ", "bận tâm", "ngồi xuống uống miếng trà nóng", "phước đức ba đời", "ông bà độ mạng".
 */

export interface ThaySinhEncounterState {
  guestGender?: "nam" | "nu";
  guestAgeGroup?: "thanh_nien" | "trung_nien" | "lao_nien";
  visitCount?: number;
  timeOfDay?: "sang" | "trua" | "chieu" | "toi" | "khuya";
  concernCategory?: "tai_loc" | "tinh_duyen" | "gia_dao" | "cong_danh" | "suc_khoe" | "tam_an";
}

// 1. NGÂN HÀNG CÁCH CHÀO ĐẦU CỦA ÔNG CỤ MIỀN NAM CHÂN CHẤT
export const THAY_SINH_GREETINGS = [
  {
    tone: "Mộc mạc chân chất miền Tây",
    gesture: "Vuốt chòm râu bạc, cười đôn hậu mời ngồi",
    speech: (name = "con") =>
      `Vuốt chòm râu bạc phơ, Thầy Sinh cười hiền từ, đôi mắt nhìn sâu vào ánh mắt của ${name}. "Mời ${name} ngồi xuống đây uống miếng trà nóng nghen con. Gió thổi đưa duyên, bữa nay ${name} ghé am quán của Thầy, ngó nét mặt là Thầy biết trong lòng đang có chuyện gì rầu rĩ, trăn trở chưa gỡ ra được, phải hôn ${name}?"`,
  },
  {
    tone: "Ân cần ấm áp như ông nội miền Nam",
    gesture: "Rót chén trà nóng bốc khói, khẽ nghiêng đầu ngắm nghía",
    speech: (name = "con") =>
      `Thầy Sinh khẽ châm thêm bình trà thơm, khói trầm hương bay là đà trong gió. "Chào ${name} nghen! Uống ngụm trà nóng cho ấm bụng đã con. Ngó tướng mạo ${name}, Thầy thấy cặp chân mày hơi chau lại, chắc việc đời dạo này đè nặng lên vai con dữ lắm hén? Cứ bình tâm, trút hết tâm sự ra đây, có Thầy lắng nghe cùng ${name} nè."`,
  },
  {
    tone: "Thấu thị càn khôn phong thái cổ truyền Nam Bộ",
    gesture: "Bấm ngón tay tính Can Chi thời khắc, mắt sáng ngời",
    speech: (name = "con") =>
      `Thầy Sinh chắp tay gật đầu, ngón tay thoăn thoắt bấm nhẹ mấy đốt ngón tay theo Can Chi thời khắc. "Lành thay! Đúng ngay giờ âm dương giao hòa mà ${name} tìm tới Thầy. Duyên trời sắp đặt hổng có cái gì là ngẫu nhiên hết á. Trời đất có chuyển, lòng người có động. Nói Thầy nghe coi, chuyện gì đang làm ${name} hao tâm tổn sức nhất lúc này vậy con?"`,
  },
  {
    tone: "Thư thái buông bỏ bình dị",
    gesture: "Chỉ tay vào đài sen gỗ, nụ cười bao dung",
    speech: (name = "con") =>
      `Thầy Sinh chỉ tay ra mé đài sen tĩnh lặng ngoài sân. "Tới được đây rồi thì bao nhiêu bực dọc, bon chen ngoài đường con cứ bỏ hết ngoài cửa nghen ${name}. Thầy dòm thấy thần sắc con dạo này hơi mỏi mệt vì thức đêm thức hôm lo nghĩ nhiều quá. Thả lỏng hai vai xuống, thở sâu ba hơi, rồi cùng Thầy mở quẻ coi vận mạng ra sao nè."`,
  },
  {
    tone: "Minh triết thức tỉnh phong cách Nam Bộ",
    gesture: "Gõ nhẹ chiếc chuông đồng nhỏ, âm vang thanh tịnh",
    speech: (name = "con") =>
      `Tiếng chuông đồng ngân vang thanh thoát, Thầy Sinh nhìn ngay vô tâm thức của ${name}. "Người đời đi coi bói thường hay hỏi chừng nào giàu, chừng nào trúng số. Nhưng Thầy ngồi đây là để giúp ${name} hiểu cái tâm của mình, biết cái nào nên dừng, cái nào nên làm đặng tích phước cho con cháu. Nào, bữa nay ${name} gửi gắm nỗi lòng vô điều gì nè?"`,
  },
];

// 2. NGÂN HÀNG LỜI KHUYÊN DỨT KHOÁT BẰNG GIỌNG MIỀN NAM
export const THAY_SINH_PRESCRIPTIONS: Record<
  string,
  {
    stopDoing: string[];
    startDoing: string[];
    remedyPractice: string[];
    lieuPhamInsight: string[];
  }
> = {
  tai_loc: {
    stopDoing: [
      "Con tuyệt đối đừng có đi vay mượn tiền bạc đặng đâm đầu vô mấy trò may rủi đỏ đen hay nghe lời rủ rê làm ăn mập mờ nghen con. Tiền vô cửa trước sẽ tuôn ra cửa sau nếu cái tâm tham chưa dứt đó.",
      "Con nên dừng ngay việc vội vàng ký giấy tờ hợp đồng làm ăn lớn trong mấy ngày này. Phải coi cho kỹ từng con chữ, kẻo tiểu nhân đang me sơ hở của con đó nghen.",
      "Con dừng cái thói quen buồn bực là xài tiền bậy bạ đặng giải khuây đi nè. Mồ hôi nước mắt làm ra đồng tiền, phung phí quá là hao tổn phước tài của mình đó con.",
    ],
    startDoing: [
      "Con hãy tập trung chăm chút vô cái nghề chánh của mình, mần ăn lương thiện, tích cóp từng đồng từng cắc đàng hoàng và ghi chép chi tiêu rõ ràng mỗi ngày nghen.",
      "Con nhớ trích ra chút đỉnh tiền bạc, mần việc phước đức, giúp đỡ mấy người nghèo khổ cơ nhỡ hay phóng sinh chim cá. Gieo hạt giống lành thì cây tài lộc mới đơm hoa kết trái bền lâu được.",
      "Gặp chuyện làm ăn lớn, con chịu khó hạ mình hỏi ý kiến mấy bậc cô bác tiền bối có kinh nghiệm đi, 'Lùi một bước trời cao biển rộng' nghen con.",
    ],
    remedyPractice: [
      "Mỗi sáng sớm thức dậy, con chí thành niệm danh hiệu 'Nam Mô Bảo Đàn Hoa Quán Thế Âm Bồ Tát' 21 biến đặng tiêu trừ lòng tham và mở rộng phước báu tài lộc nghen.",
      "Mỗi bữa thắp nén nhang trầm trước bàn thờ Phật hay ông bà, niệm 'Nam Mô Đại Bi Quán Thế Âm Bồ Tát' và cầu nguyện cho bá tánh vạn dân đều được cơm no áo ấm.",
    ],
    lieuPhamInsight: [
      "Cụ Viên Liễu Phàm dạy rành rành: 'Tiền tài trong đời là do phước đức tích lũy từ xưa, cưỡng cầu chỉ chuốc thêm vạ'. Biết đủ là giàu nhất trần đời đó con.",
      "Người xưa mần tới ba ngàn việc thiện mới đổi được số mạng vinh hoa, con muốn mần ăn phát đạt lâu dài thì phải siêng làm việc nghĩa mà hổng cầu mong người ta đền đáp nghen.",
    ],
  },
  tinh_duyen: {
    stopDoing: [
      "Con đừng có rình mò, kiểm soát điện thoại hay tra hỏi người ta hoài vì nỗi bất an trong lòng mình nữa nghen. Càng siết chặt nắm cát thì cát càng chảy tuột qua kẽ tay thôi con à.",
      "Con dứt khoát buông bỏ cái mối quan hệ mập mờ, làm con khóc hết nước mắt bấy lâu nay đi nè. Đừng có dại dột biến mình thành món đồ sơ cua của người khác nghen con.",
      "Con dừng ngay việc đem người thương của mình đi so đo với chồng người ta hay vợ người ta trên mạng xã hội, làm tổn thương lòng tự trọng của nhau dữ lắm đó.",
    ],
    startDoing: [
      "Con hãy bớt lời cằn nhằn lại, tập lắng nghe nhiều hơn, nấu bữa cơm chiều thiệt ấm cúng rồi nói lời thương lời cảm ơn với người ta nghen.",
      "Con phải biết thương yêu, chăm sóc bản thân mình cho thiệt tinh tươm trước đã. Khi tâm con thơm tho như hoa lài hoa sen thì người đàng hoàng tự khắc tìm tới con à.",
      "Hai đứa rủ nhau đi chùa, làm từ thiện, phóng sinh đặng bồi đắp cái duyên lành sâu dày cho đời này kiếp sau.",
    ],
    remedyPractice: [
      "Mỗi tối trước khi đi ngủ, con chí thành niệm 'Nam Mô Từ Ái Quán Thế Âm Bồ Tát' 108 biến đặng hóa giải hết mọi hờn giận oán hờn, cho gia đạo được ấm êm nghen.",
      "Trì niệm 'Nam Mô Phổ Hiền Bồ Tát' đặng mở rộng lòng bao dung, chuyển hóa mấy cái ích kỷ thành tình thương chân thật.",
    ],
    lieuPhamInsight: [
      "Liễu Phàm Tứ Huấn có dạy: 'Thấy lỗi người ta chớ vội trách mắng, hãy dòm lại cái lỗi của mình trước'. Nhịn một câu thì chín câu lành nghen con.",
      "Vợ chồng là cái nợ ba đời. Trả nợ với nụ cười hoan hỷ thì nợ biến thành hoa, trả nợ mà cằn nhằn quạu quọ thì hoa nó thành gai đâm nát lòng đó con.",
    ],
  },
  cong_danh: {
    stopDoing: [
      "Con dừng ngay việc hơn thua từng lời ăn tiếng nói, tranh giành hay nói xấu sau lưng đồng nghiệp nghen. Thị phi ở đời chỉ làm cho đầu óc con thêm tăm tối thôi à.",
      "Con bỏ cái tính lần lữa, đổ thừa cho hoàn cảnh đi nghen. Lười biếng trong suy nghĩ là nó gặm nhấm hết cơ hội thăng tiến của con đó.",
      "Đừng có ôm đồm quá nhiều việc cùng lúc khi sức lực có hạn, mần dở dang rồi mất hết uy tín với người ta nghen con.",
    ],
    startDoing: [
      "Con lo trau dồi tay nghề cho thiệt vững, mần việc với cái tâm phụng sự hết lòng, hổng có so đo tính toán thiệt hơn nghen.",
      "Thấy mấy đứa nhỏ mới vô nghề còn bỡ ngỡ, con mở lòng chỉ dẫn nâng đỡ tụi nó đi. Nâng người khác lên chính là tạo cái bệ phóng vững vàng nhất cho mình đó con.",
      "Giữ cái bụng điềm đạm trước mọi sóng gió, 'Tâm bất biến giữa dòng đời vạn biến' nghen con.",
    ],
    remedyPractice: [
      "Chí thành niệm 'Nam Mô Văn Thù Sư Lợi Bồ Tát' 49 biến mỗi ngày đặng đầu óc sáng suốt, tính toán việc gì cũng thông suốt nghen.",
      "Trì niệm danh hiệu 'Nam Mô Thí Vô Úy Quán Thế Âm Bồ Tát' đặng trong bụng vững vàng, hổng có sợ hãi ba cái khó khăn trắc trở.",
    ],
    lieuPhamInsight: [
      "Sách dạy: 'Trời đất làm vơi chỗ đầy mà bồi đắp cho chỗ khiêm nhường. Kẻ tự cao tự đại ắt sụp hầm, người biết khiêm tốn ắt được quý nhân nâng đỡ' nghen con.",
      "Muốn làm tướng giỏi thì trước hết phải làm lính cho đàng hoàng. Phước đức dày bao nhiêu thì công danh bền bấy nhiêu đó con.",
    ],
  },
};

// 3. HÀM TẠO LỜI ĐÀM ĐẠO CHÂN CHẤT MIỀN NAM
export function generateDynamicThaySinhNarrative(params: {
  methodName: string;
  inputIdentifier: string;
  hexagramName: string;
  movingLine: number;
  category?: "tai_loc" | "tinh_duyen" | "cong_danh";
  guestName?: string;
}): {
  fullScript: string;
  gestureDescription: string;
  prescriptions: { stop: string; start: string; remedy: string; lieuPham: string };
} {
  const {
    methodName,
    inputIdentifier,
    hexagramName,
    movingLine,
    category = "tai_loc",
    guestName = "con",
  } = params;

  // Chọn ngẫu nhiên cách chào miền Nam
  const greetingObj = THAY_SINH_GREETINGS[Math.floor(Math.random() * THAY_SINH_GREETINGS.length)];
  const greetingText = greetingObj.speech(guestName);

  // Chọn bộ lời khuyên Nam Bộ
  const catData = THAY_SINH_PRESCRIPTIONS[category] || THAY_SINH_PRESCRIPTIONS.tai_loc;
  const stopDoing = catData.stopDoing[Math.floor(Math.random() * catData.stopDoing.length)];
  const startDoing = catData.startDoing[Math.floor(Math.random() * catData.startDoing.length)];
  const remedy = catData.remedyPractice[Math.floor(Math.random() * catData.remedyPractice.length)];
  const lieuPham = catData.lieuPhamInsight[Math.floor(Math.random() * catData.lieuPhamInsight.length)];

  const fullScript = `${greetingText}

Nhận được ${methodName} mang ấn số ${inputIdentifier} của ${guestName}, Thầy khẽ nhắm mắt, điều hòa hơi thở vô định lực. Mấy ngón tay Thầy bấm nhẹ theo vòng Bát Quái Cửu Cung nghen.

Kìa, đài Bát Quái bừng sáng kim quang rực rỡ! Trận đồ Dịch lý ứng hiện quẻ ${hexagramName}, động chuyển ngay tại hào ${movingLine} đó con!

${guestName} nghe Thầy dặn dò bốn điều ruột gan này đặng chuyển nguy thành an nghen:

Thứ nhất, điều con nên dừng lại nè: ${stopDoing}

Thứ hai, điều con nên mần liền nè: ${startDoing}

Thứ ba, học theo lời dạy cụ Viên Liễu Phàm đặng đổi mạng đổi phước nè con: ${lieuPham}

Thứ tư, phương pháp định tâm an thần: ${remedy}

${guestName} nhớ lấy lời Thầy nghen: 'Tướng do tâm sinh, cảnh tùy tâm chuyển'. Giữ cái tâm cho thiệt thanh tịnh, ăn ở hiền lành thì đường đời ắt thênh thang rộng mở nghen con!`;

  return {
    fullScript,
    gestureDescription: greetingObj.gesture,
    prescriptions: {
      stop: stopDoing,
      start: startDoing,
      remedy,
      lieuPham,
    },
  };
}
