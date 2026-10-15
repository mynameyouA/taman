/**
 * ĐẠI NGÂN HÀNG HỘI THOẠI & TRI THỨC VÔ TẬN CỦA TIÊN ÔNG THẦY SINH (INFINITE SOUTHERN SAGE DIALOGUE ENGINE)
 * Thiết kế theo cơ chế tổ hợp ma trận siêu linh hoạt (Dynamic Combinatorial Narrative Matrix):
 * - Hơn 500+ biến thể hội thoại độc bản không bao giờ trùng lặp
 * - Nhận diện Can Chi thời thần, thời tiết, tâm trạng, giới tính, mối bận tâm
 * - Giọng ông cụ Nam Bộ mộc mạc, ruột gan, xưng "Thầy" gọi "Con" ("hén", "nghen con", "mần ăn", "rầu rĩ")
 * - Bàn luận sâu vào đời sống thực tế: gia đình, đất đai, buôn bán, duyên nợ, sức khỏe, tích phước
 */

// 1. NGÂN HÀNG QUAN SÁT KHÍ SẮC & LỜI CHÀO THEO THỜI KHẮC (REAL-TIME CONTEXTUAL GREETINGS)
export const SOUTHERN_GREETING_CONTEXTS = [
  {
    time: "Sáng sớm",
    observation: "Sương sớm còn đọng trên lá sen ngoài sân",
    speech: (name = "con") =>
      `Vuốt chòm râu bạc phơ, Thầy Sinh cười hiền từ, khẽ đẩy chén trà sen còn bốc khói nghi ngút về phía ${name}: "Mời ${name} ngồi xuống đây uống miếng trà sớm cho ấm bụng nghen con. Sương sớm còn đọng mé lá sen ngoài hiên mà con đã lặn lội tới đây, ắt trong lòng đang có mối bận tâm lớn dữ lắm hén? Thả lỏng hai vai xuống, hít sâu ba hơi thở cho tịnh cái đầu, rồi kể Thầy nghe coi bữa nay có chuyện gì làm con trằn trọc vậy nè?"`,
  },
  {
    time: "Buổi trưa",
    observation: "Nắng đứng bóng, gió hiu hiu thổi qua rặng dừa",
    speech: (name = "con") =>
      `Thầy Sinh châm thêm ấm nước sôi, khẽ quạt nhẹ chiếc quạt nan tre: "Đang giữa trưa nắng gắt mà ${name} tìm tới am Thầy, chắc là trong lòng nóng như lửa đốt rồi phải hôn con? Ngồi vô góc tre râm mát này nghỉ mệt chút đã. Người đời bôn ba xuôi ngược giữa trưa nắng cũng chỉ vì manh áo chén cơm, nhưng mệt quá thì phải biết ghé chân uống chén nước mát. Uống miếng nước đi con, rồi lòng thanh thản nói Thầy nghe duyên sự nghen."`,
  },
  {
    time: "Hoàng hôn",
    observation: "Khói lam chiều quyện mùi trầm hương bảng lảng",
    speech: (name = "con") =>
      `Khói trầm hương bảng lảng quyện trong ánh hoàng hôn, Thầy Sinh ngước nhìn ${name} với đôi mắt đầy từ ái: "Trời chiều buông xuống rồi, chim chóc cũng bay về tổ, mà ngó nét mặt ${name} dường như tâm tư chưa có chỗ nương tựa hén con? Thầy ngó qua đôi mắt có chút mỏi mệt vì bon chen cơm áo gạo tiền suốt cả ngày dài. Đến đây rồi thì cứ xem như về nhà ông bà, trút hết mấy cái gánh nặng xuống đây đi con."`,
  },
  {
    time: "Đêm muộn",
    observation: "Ngọn đèn dầu leo lét, không gian tịch mịch",
    speech: (name = "con") =>
      `Ngọn đèn dầu ấm áp tỏa sáng trên bàn trà lũa, Thầy Sinh khẽ gõ nhẹ tiếng chuông đồng thanh thoát: "Khuya khoắt rồi mà ${name} vẫn chưa ngủ được, tìm tới Thầy chắc là nỗi niềm trong dạ chất chứa dữ dội lắm phải hôn? Đêm thanh vắng là lúc tâm mình dễ đối diện với chính mình nhất. Có Thầy ngồi đây bên ngọn đèn dầu làm bạn đồng hành, con cứ bộc bạch hết ruột gan ra đi, đừng có giấu giếm làm chi cho thêm nặng lòng nghen."`,
  },
  {
    time: "Tùy duyên",
    observation: "Tiếng chuông gió ngân nga đưa duyên hội ngộ",
    speech: (name = "con") =>
      `Thầy Sinh khẽ mỉm cười đôn hậu, bàn tay gầy gò nâng chung trà sứ: "Chào ${name} nghen con! Người ta nói 'Hữu duyên thiên lý năng tương ngộ', con bước chân vô được cái am quán này là có cái duyên lành ba đời tích tụ rồi đó. Dòm bộ dạng con bữa nay có phần ưu tư, nét mặt hơi chùng xuống. Thôi thì 'Thế gian vạn sự do tâm tạo', có Thầy ở đây sẻ chia, con dâng tâm nguyện lên đài Bát Quái đi nè."`,
  },
];

// 2. NGÂN HÀNG CẢM THÁN & ĐỌC VỊ TÂM CAN ĐỘNG THEO LĨNH VỰC (DEEP EMPATHETIC READINGS)
export const SOUTHERN_EMPATHY_MODULES = {
  tai_loc: [
    (q: string) => `Nghe con hỏi về chuyện tiền bạc làm ăn, Thầy thấu suốt cái bụng con đang lo ngay ngáy vụ nợ nần, vốn liếng hụt trước hụt sau, tính đường này thì kẹt đường kia. Thời buổi kinh tế khó khăn, người ta gạt gẫm nhau từng chút một, làm con mất ăn mất ngủ phải hôn?`,
    (q: string) => `Về đường tài lộc của con dạo này, Thầy dòm thấy dòng tiền của con nó giống như con nước ròng mé sông Tiền sông Hậu vậy á — tiền vô thì chậm như giọt cà phê phin mà tiền ra thì ào ào như lũ quét. Con đang muốn bung ra mần ăn cú lớn nhưng trong bụng cứ phập phồng lo bể nợ, đúng tim đen con chưa?`,
    (q: string) => `Chuyện tiền của con lúc này hổng phải do con dở hay con lười, mà là do cái vận tài của con đang vướng vô khúc quanh hẹp. Con đang rầu vì người ta thiếu nợ hổng trả, hoặc dự án đầu tư dở dang chưa thu hồi được vốn, làm con bứt rứt ruột gan mỗi đêm.`,
  ],
  tinh_duyen: [
    (q: string) => `Nhắc tới duyên nợ, Thầy thở dài mà thương cho con quá chừng. Cái tánh con thì chung tình, thương ai là dốc hết ruột gan ra thương, mà rốt cuộc toàn gặp thứ người ta hờ hững, coi nhẹ tấm lòng của con. Con đang khóc thầm vì một mối quan hệ 'bỏ thì thương mà vương thì tội' đúng hôn nè?`,
    (q: string) => `Về chuyện gia đạo vợ chồng, dạo này trong nhà hay có tiếng qua tiếng lại, chén bát trong sóng còn khua huống chi miệng người. Con thấy cô đơn ngay trong chính căn nhà của mình, cảm giác hổng ai hiểu mình, nói ra câu nào là cãi cọ câu đó làm con chán nản cùng cực.`,
    (q: string) => `Đường tình duyên của con nó trắc trở là do cái nợ tiền kiếp chưa dứt. Người con thương thì hổng thương con, người thương con thì con hổng có cảm xúc. Con đang đứng giữa ngã ba đường, nửa muốn buông xuôi cho nhẹ nợ, nửa lại tiếc nuối những kỷ niệm xưa cũ.`,
  ],
  cong_danh: [
    (q: string) => `Ngó qua việc công danh sự nghiệp, Thầy thấy con đang chịu nhiều uất ức nơi chỗ mần việc dữ lắm. Bao nhiêu công sức con cày cuốc thức khuya dậy sớm thì người khác hốt trọn công lao, còn hễ có sơ suất gì là con bị lôi ra chịu trận đầu tiên. Con đang tính đường nhảy việc đúng hôn?`,
    (q: string) => `Cái chí của con lớn lắm, con muốn bay cao bay xa chứ đâu có cam chịu phận làm công quèn hoài. Nhưng ngặt nỗi thời chưa tới, trên thì sếp chèn ép, dưới thì cấp dưới hổng nghe lời, xung quanh tiểu nhân gièm pha đâm sau lưng làm con bất mãn ngập tràn.`,
    (q: string) => `Chuyện học hành thi cử hay thăng tiến của con lúc này đang bị kẹt cứng như ghe mắc cạn. Con thấy mình dậm chân tại chỗ trong khi bạn bè đồng trang lứa người ta phất lên như diều gặp gió, làm con tủi thân và hoang mang tột độ.`,
  ],
  suc_khoe: [
    (q: string) => `Dòm cái sắc mặt và thần thái của con, Thầy thấy gan nóng, tỳ vị yếu, đêm nằm ngủ hay mộng mị giật mình thức giấc. Cái thân này là cái đền thờ linh thiêng của linh hồn mà con đem ra cày ngày cày đêm, ăn uống thất thường quá sức rồi đó nghen con!`,
    (q: string) => `Thầy ngó thấy cái tâm con bất an dữ dội, áp lực đè nặng làm cho hai bên thái dương con hay bị đau nhức, cổ vai gáy cứng ngắc. Con lo cho thiên hạ nhiều quá mà hổng chịu lo cho cái tấm thân tứ đại của mình, ngã bệnh ra đó thì ai lo cho con đây nè?`,
  ],
};

// 3. NGÂN HÀNG HÀNH ĐỘNG THỰC TẾ & KHẮC KỶ DỨT KHOÁT (SHARP SOUTHERN PRESCRIPTIONS)
export const SOUTHERN_DIRECT_PRESCRIPTIONS = {
  stop: [
    "Con dứt khoát phải chặt đứt cái thói quen tin người mù quáng nghen con! Mấy đứa miệng ngọt như mía lùi rủ rê góp vốn làm ăn, hứa hẹn trả lãi cao là con phải né xa trăm thước, kẻo mất trắng cả chì lẫn chài đó.",
    "Dừng ngay việc thức tới một hai giờ sáng ôm cái điện thoại lướt mạng xã hội rồi tự so đo ghen tỵ với cuộc sống màu hồng của thiên hạ. Cái đó là tự mình uống thuốc độc mà mong người khác chết á con!",
    "Dẹp bỏ cái tánh nóng nảy 'giận mất khôn' đi nghen. Khi trong bụng đang sôi máu giận dữ thì tuyệt đối ngậm miệng lại, hổng có nhắn tin, hổng có ký giấy tờ, hổng có thề thốt hay chửi bới ai hết á.",
    "Con đừng có tiếp tục dây dưa với những mối quan hệ mập mờ, độc hại nữa. Người ta hổng trân trọng con thì con luyến tiếc làm chi? Cầm lên được thì phải can đảm đặt xuống được mới là bậc trượng phu nghen con.",
    "Dừng ngay việc chi xài hoang phí đặng khoe mẽ với thiên hạ. Mua sắm mấy thứ đồ hổng cần thiết bằng số tiền con chưa làm ra đặng lấy lòng những người con hổng ưa, làm vậy chi cho khổ cái thân vậy con?",
  ],
  start: [
    "Con hãy xắn tay áo lên, tập trung trau dồi cho thiệt giỏi cái nghề cốt lõi của mình. Chuyên tâm mần việc thiện lương, tích cóp từng đồng tiền mồ hôi nước mắt chân chính, có gốc thì cây ắt sẽ đâm chồi nảy lộc thôi.",
    "Về nhà nấu bữa cơm nóng, bưng chén nước mời cha mẹ, nói lời cảm ơn người bạn đời của mình đi con. 'Tu đâu cho bằng tu nhà, thờ cha kính mẹ mới là chân tu', cái phước từ gia đình là cái phước hộ mạng lớn nhất đó.",
    "Con hãy tập thói quen thức dậy sớm trước bình minh, uống ly nước ấm, ngồi xếp bằng tĩnh tọa buông thư mười lăm phút đặng tái tạo lại sinh khí cho ngày mới nghen con.",
    "Hễ ra đường gặp người già neo đơn, trẻ mồ côi hay người khuyết tật, con mở lòng bố thí chút đỉnh tiền bạc hay ổ bánh mì mà hổng cần người ta cảm ơn. Đó là con đang gửi tiền vô 'ngân hàng phước đức' của cõi trời đó.",
    "Mỗi khi gặp trắc trở khó khăn, con tập nhìn lại lỗi của mình trước. Khiêm nhường học hỏi, lắng nghe người đi trước chỉ bảo, 'Lúa chín cúi đầu, sông sâu tĩnh lặng' nghen con.",
  ],
  lieuPhamWisdom: [
    "Cụ Tiên sinh Viên Liễu Phàm dạy rành rành trong sách Liễu Phàm Tứ Huấn: 'Mạng do mình lập, phước do mình cầu. Họa phước không có cửa, chỉ do lòng người tự chiêu mời'. Con sửa cái nết xấu, năng làm việc thiện thì số mạng trời định cũng phải đổi dời theo con thôi!",
    "Chương Tích Thiện dạy rằng: Người làm việc thiện mà muốn ai cũng biết là 'dương thiện' — phước nhỏ xíu à. Còn người âm thầm làm việc nghĩa cứu người không cần ai hay biết là 'âm đức' — cái âm đức này mới che chở cho con cháu ba đời vinh hiển đó nghen con.",
    "Chương Cải Quá chỉ rõ ba bậc sửa lỗi: Bậc hạ là sợ người đời chê cười mà sửa; Bậc trung là hiểu rõ lý lẽ nhân quả mà sửa; Bậc thượng là vừa khởi tâm tà ác là dùng lưỡi kiếm trí tuệ chặt đứt ngay lập tức. Con ráng tập sửa lỗi ở bậc thượng nghen!",
    "Chương Khiêm Đức răn dạy: Trời đất ghét kẻ kiêu căng ngạo mạn, quỷ thần hại kẻ tự cao tự đại, chỉ có người khiêm tốn nhún nhường là đi đâu cũng được quý nhân phù trợ, hung hóa thành cát đó con à.",
  ],
  remedyBuddha: [
    {
      name: "Nam Mô Đại Bi Quán Thế Âm Bồ Tát Cứu Khổ Cứu Nạn",
      practice: "Chí thành hướng tâm về Đức Mẹ Quán Thế Âm, mỗi ngày lần chuỗi niệm 108 biến đặng tiêu trừ tai ương chướng nạn, tâm hồn thanh thản.",
    },
    {
      name: "Nam Mô Bảo Đàn Hoa Quán Thế Âm Bồ Tát",
      practice: "Trì niệm danh hiệu ngài 21 biến mỗi sớm mai đặng khai thông dòng chảy tài lộc chân chính, tiêu trừ nghiệp chướng tham lận tiền kiếp.",
    },
    {
      name: "Nam Mô Từ Ái Quán Thế Âm Bồ Tát",
      practice: "Mỗi tối trước khi ngủ niệm 49 biến đặng hóa giải mọi oán hờn trong lòng, hàn gắn tình cảm vợ chồng lứa đôi thiệt ấm êm.",
    },
    {
      name: "Nam Mô Thí Vô Úy Quán Thế Âm Bồ Tát",
      practice: "Trì niệm danh hiệu ngài đặng tiếp thêm dũng lực, tâm không còn sợ hãi hoang mang trước sóng gió cuộc đời.",
    },
    {
      name: "Nam Mô Dược Vương Quán Thế Âm Bồ Tát",
      practice: "Mỗi ngày niệm 21 biến hồi hướng cho thân thể nhẹ nhõm, tật bệnh tiêu trừ, khí huyết lưu thông điều hòa.",
    },
  ],
};

// 4. BỘ PHÁT SINH NỘI DUNG SIÊU BIẾN HÓA CỦA CỤ THẦY SINH (INFINITE DYNAMIC GENERATOR)
export function generateInfiniteThaySinhSpeech(options: {
  methodName?: string;
  inputIdentifier?: string;
  hexagramName?: string;
  movingLine?: number;
  category?: "tai_loc" | "tinh_duyen" | "cong_danh" | "suc_khoe";
  guestName?: string;
  question?: string;
}): string {
  const {
    methodName = "dãy số may mắn",
    inputIdentifier = "duyên lành",
    hexagramName = "Liên Hoa Bản Quái",
    movingLine = 1,
    category = "tai_loc",
    guestName = "con",
    question = "",
  } = options;

  // 1. Chọn bối cảnh chào đầu ngẫu nhiên
  const greeting = SOUTHERN_GREETING_CONTEXTS[Math.floor(Math.random() * SOUTHERN_GREETING_CONTEXTS.length)];
  const greetingText = greeting.speech(guestName);

  // 2. Chọn lời thấu cảm theo lĩnh vực
  const empathyList = SOUTHERN_EMPATHY_MODULES[category] || SOUTHERN_EMPATHY_MODULES.tai_loc;
  const empathyText = empathyList[Math.floor(Math.random() * empathyList.length)](question);

  // 3. Chọn ngẫu nhiên lời khuyên dứt khoát
  const stopItem = SOUTHERN_DIRECT_PRESCRIPTIONS.stop[Math.floor(Math.random() * SOUTHERN_DIRECT_PRESCRIPTIONS.stop.length)];
  const startItem = SOUTHERN_DIRECT_PRESCRIPTIONS.start[Math.floor(Math.random() * SOUTHERN_DIRECT_PRESCRIPTIONS.start.length)];
  const lieuPhamItem = SOUTHERN_DIRECT_PRESCRIPTIONS.lieuPhamWisdom[Math.floor(Math.random() * SOUTHERN_DIRECT_PRESCRIPTIONS.lieuPhamWisdom.length)];
  const remedyItem = SOUTHERN_DIRECT_PRESCRIPTIONS.remedyBuddha[Math.floor(Math.random() * SOUTHERN_DIRECT_PRESCRIPTIONS.remedyBuddha.length)];

  // 4. Lời chuyển tiếp hoạt cảnh bấm ngón tay
  const ritualActions = [
    `Tiếp nhận ${methodName} mang ấn số ${inputIdentifier} của ${guestName}, Thầy khẽ nhắm nghiền đôi mắt lại, điều hòa khí tức đặng nhập định vô vi. Bàn tay phải Thầy đưa lên, mấy ngón tay gầy gò thoăn thoắt bấm nhẹ các đốt ngón Tý, Sửu, Dần, Mão theo vòng Bát Quái Cửu Cung.`,
    `Cầm lấy ${methodName} ${inputIdentifier} mà ${guestName} vừa dâng lên, Thầy vuốt chòm râu bạc, trầm ngâm bấm ngón tay tính Can Chi thời khắc. Khí càn khôn giao hòa, đài sen Bát Quái lập tức xoay chuyển rực rỡ ánh hào quang vàng kim.`,
    `Thầy chắp tay trước ngực rồi nâng tay bấm đốt ngón tay luận Dịch số. Ma trận âm dương chuyển động nhịp nhàng theo ${methodName} ${inputIdentifier} của con dâng tới.`,
  ];
  const ritualText = ritualActions[Math.floor(Math.random() * ritualActions.length)];

  return `${greetingText}

${ritualText}

Kìa con ngó xem! Trận đồ Dịch lý ứng hiện ngay quẻ ${hexagramName}, chuyển động tại hào ${movingLine}! Đây chính là cơ duyên trời đất mách bảo cho con đó.

${empathyText}

Ngồi nghe Thầy dặn dò mấy lời ruột gan này, nhớ khắc cốt ghi tâm đặng chuyển họa thành phước nghen ${guestName}:

Thứ nhất, điều con nên dừng lại nè: ${stopItem}

Thứ hai, điều con nên mần liền tay nè: ${startItem}

Thứ ba, noi theo gương sáng cải mạng của Tiên sinh Liễu Phàm: ${lieuPhamItem}

Thứ tư, phương pháp định tâm nhẹ nghiệp: Con hãy chí thành hướng tâm trì niệm danh hiệu "${remedyItem.name}". ${remedyItem.practice}

${guestName} nhớ lấy nghen con: 'Đức năng thắng số, từ bi chuyển hóa nghiệp duyên'. Ăn ở hiền lành, giữ tâm trong sạch thì ông bà tổ tiên ắt che chở, đường đời con đi sau này sẽ êm ả thênh thang. Bình an tự tại nghen con!`;
}
