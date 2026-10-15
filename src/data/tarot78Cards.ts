/**
 * BÁCH KHOA TOÀN THƯ 78 LÁ BÀI TAROT CHUẨN QUỐC TẾ (RIDER-WAITE-SMITH)
 * Dành riêng cho Tâm An AI - Trợ lý Tâm Linh & Chiêm Bốc Tối Cao.
 * Đầy đủ 22 Lá Ẩn Chính (Major Arcana) & 56 Lá Ẩn Phụ (Minor Arcana: Wands, Cups, Swords, Pentacles).
 * Mỗi lá bài sở hữu bách khoa luận giải 4 chiều:
 * 1. Công Danh Tài Lộc
 * 2. Tình Duyên Mối Quan Hệ
 * 3. Tinh Thần Thể Chất
 * 4. Lời Khuyên Hành Đạo / Lời Khai Thị Giác Ngộ (Dharma Guidance).
 */

export interface TarotCardDefinition {
  id: string;
  number: number;
  roman?: string;
  nameEn: string;
  nameVi: string;
  arcana: "Major" | "Minor";
  suit?: "Wands" | "Cups" | "Swords" | "Pentacles";
  element: "Lửa" | "Nước" | "Khí" | "Đất" | "Ánh Sáng" | "Vũ Trụ";
  astrology: string;
  icon: string;
  visualSymbol: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  aspects: {
    career: {
      upright: string;
      reversed: string;
    };
    love: {
      upright: string;
      reversed: string;
    };
    healthSpirit: {
      upright: string;
      reversed: string;
    };
    dharmaAdvice: {
      upright: string;
      reversed: string;
    };
  };
}

export const TAROT_78_CARDS: TarotCardDefinition[] = [
  {
    "id": "major_00_fool",
    "number": 0,
    "roman": "0",
    "nameEn": "The Fool",
    "nameVi": "Chàng Khờ",
    "arcana": "Major",
    "element": "Khí",
    "astrology": "Sao Thiên Vương (Uranus)",
    "icon": "🎒",
    "visualSymbol": "Vách đá vô tận, bông hồng trắng ngây thơ và mặt trời rực rỡ",
    "uprightKeywords": [
      "Khởi đầu mới",
      "Hồn nhiên",
      "Tự do vô hạn",
      "Niềm tin thuần khiết",
      "Phiêu lưu"
    ],
    "reversedKeywords": [
      "Liều lĩnh mù quáng",
      "Thiếu cẩn trọng",
      "Sợ hãi rủi ro",
      "Hành động nông nổi"
    ],
    "uprightMeaning": "The Fool biểu trưng cho linh hồn bước vào chuyến hành trình vĩ đại với tâm thế không định kiến. Đây là bước nhảy vọt của niềm tin, nơi vũ trụ mở ra những tiềm năng vô hạn.",
    "reversedMeaning": "Lá bài cảnh báo sự ngây thơ quá mức biến thành ngông cuồng, hoặc ngược lại, nỗi sợ thất bại đang kìm hãm bạn bước qua ngưỡng cửa an toàn.",
    "aspects": {
      "career": {
        "upright": "Thời điểm lý tưởng để khởi nghiệp, chuyển đổi ngành nghề hoặc thử sức với dự án hoàn toàn mới.",
        "reversed": "Tránh đưa ra các quyết định đầu tư thiếu nghiên cứu kỹ lưỡng; cẩn trọng trước những lời hứa hẹn viển vông."
      },
      "love": {
        "upright": "Mối duyên mới bất ngờ, tình cảm trong sáng không toan tính, ngập tràn tiếng cười và sự tươi mới.",
        "reversed": "Thiếu cam kết, sợ sự ràng buộc trách nhiệm hoặc hành động vô tư làm tổn thương đối phương."
      },
      "healthSpirit": {
        "upright": "Sinh lực dồi dào, tâm trí thanh thản như đứa trẻ, tràn đầy năng lượng khám phá thiên nhiên.",
        "reversed": "Coi chừng tai nạn do bất cẩn, lơ là dấu hiệu kiệt sức hoặc lối sống buông thả."
      },
      "dharmaAdvice": {
        "upright": "Giữ tâm ban sơ (Sơ tâm - Shoshin). Hãy đón nhận mọi hoàn cảnh với đôi mắt thuần khiết không vướng bận định kiến.",
        "reversed": "Tỉnh thức phân định giữa tự do chân thật và sự phóng túng buông tuồng; quay về quan sát hơi thở định tâm."
      }
    }
  },
  {
    "id": "major_01_magician",
    "number": 1,
    "roman": "I",
    "nameEn": "The Magician",
    "nameVi": "Ảo Thuật Gia",
    "arcana": "Major",
    "element": "Khí",
    "astrology": "Sao Thủy (Mercury)",
    "icon": "🪄",
    "visualSymbol": "Biểu tượng vô cực ∞, quyền trượng hướng thiên, 4 pháp bảo Đất-Nước-Khí-Lửa trên bàn",
    "uprightKeywords": [
      "Sức mạnh hiện thực hóa",
      "Tài năng thiên bẩm",
      "Ý chí chủ động",
      "Tập trung cao độ",
      "Khéo léo"
    ],
    "reversedKeywords": [
      "Thao túng",
      "Lừa dối",
      "Lãng phí tiềm năng",
      "Bế tắc năng lực"
    ],
    "uprightMeaning": "The Magician đại diện cho nhịp cầu kết nối 'Trên sao dưới vậy'. Bạn nắm trong tay đủ mọi công cụ và tài nguyên để biến ý niệm trong đầu thành hiện thực hữu hình.",
    "reversedMeaning": "Cảnh báo thói lươn lẹo, lạm dụng tài năng để thao túng người khác, hoặc cảm giác bất lực vì không biết tập trung tài nguyên vào đâu.",
    "aspects": {
      "career": {
        "upright": "Năng lực chuyên môn thăng hoa, mưu sự đại thành, đàm phán thành công, dẫn dắt dự án then chốt.",
        "reversed": "Gặp phải kẻ nói dối, hợp đồng chứa bẫy ngầm, hoặc nói nhiều nhưng không bắt tay vào hành động."
      },
      "love": {
        "upright": "Khả năng giao tiếp hòa hợp tuyệt vời; thu hút đối phương bằng trí tuệ, sự dí dỏm và sức hút nam châm.",
        "reversed": "Thiếu chân thành, che giấu sự thật hoặc dùng chiêu trò tâm lý thao túng cảm xúc đối tác."
      },
      "healthSpirit": {
        "upright": "Năng lượng phục hồi dồi dào, khả năng tự chữa lành thể xác và điều phối khí huyết hanh thông.",
        "reversed": "Căng thẳng trí não do suy nghĩ quá độ, mất ngủ hoặc lạm dụng các chất kích thích."
      },
      "dharmaAdvice": {
        "upright": "Biến tâm nguyện thành hành động thiện lành. Hãy sử dụng tài năng để phụng sự tha nhân và gieo mầm phúc đức.",
        "reversed": "Tránh sa vào tà kiến dùng trí xảo trá hại người; sám hối khẩu nghiệp và quay về với tâm chân thật."
      }
    }
  },
  {
    "id": "major_02_high_priestess",
    "number": 2,
    "roman": "II",
    "nameEn": "The High Priestess",
    "nameVi": "Nữ Đại Tư Tế",
    "arcana": "Major",
    "element": "Nước",
    "astrology": "Mặt Trăng (Moon)",
    "icon": "📜",
    "visualSymbol": "Hai cột đền Boaz & Jachin, bức màn lựu đỏ, vầng trăng khuyết dưới chân",
    "uprightKeywords": [
      "Trực giác tâm linh",
      "Bí mật huyền bí",
      "Tĩnh lặng nội tại",
      "Minh triết tiềm thức",
      "Trí tuệ cao siêu"
    ],
    "reversedKeywords": [
      "Bỏ quên trực giác",
      "Bí mật đen tối bị phơi bày",
      "Nông cạn",
      "Cách ly cô lập"
    ],
    "uprightMeaning": "Nữ Tư Tế ngự trị tại ngưỡng cửa giữa cõi ý thức và vô thức. Đây là thời khắc bạn cần lắng nghe tiếng nói nhỏ nhẹ nhưng vang dội của trực giác thay vì ồn ào lý trí.",
    "reversedMeaning": "Bạn đang phớt lờ giác quan thứ sáu, để nỗi ngờ vực lấn át, hoặc đang chịu đựng sự cô độc lãnh cảm do dựng tường ngăn với thế giới bên ngoài.",
    "aspects": {
      "career": {
        "upright": "Nhìn thấu bản chất vấn đề ẩn giấu, thích hợp nghiên cứu sâu, phân tích chiến lược và bảo mật thông tin.",
        "reversed": "Có chuyện khuất tất sau lưng tại nơi làm việc, tin đồn thất thiệt, thiếu minh bạch trong giao dịch."
      },
      "love": {
        "upright": "Mối liên kết tâm linh thần giao cách cảm sâu sắc, tình cảm kín đáo nhưng đượm nồng và thủy chung.",
        "reversed": "Che giấu cảm xúc thật, đa nghi, chiến tranh lạnh khiến mối quan hệ đóng băng."
      },
      "healthSpirit": {
        "upright": "Cân bằng nội tiết tố, lắng nghe nhu cầu sâu kín của cơ thể thông qua giấc ngủ và giấc mơ.",
        "reversed": "Rối loạn chu kỳ sinh học, trầm cảm nhẹ, bất an do kìm nén cảm xúc quá mức."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu nội tâm qua tĩnh tọa và thiền định. Hãy để mặt hồ tâm trí lắng đọng, chân lý tự khắc hiện rõ.",
        "reversed": "Khai mở lòng trắc ẩn, không để sự tự kỷ biến thành kiêu ngạo; hòa nhập mà không hòa tan."
      }
    }
  },
  {
    "id": "major_03_empress",
    "number": 3,
    "roman": "III",
    "nameEn": "The Empress",
    "nameVi": "Nữ Hoàng",
    "arcana": "Major",
    "element": "Đất",
    "astrology": "Sao Kim (Venus)",
    "icon": "👑",
    "visualSymbol": "Vương miện 12 ngôi sao, cánh đồng lúa mì vàng óng, tấm đệm họa tiết sao Kim",
    "uprightKeywords": [
      "Màu mỡ phì nhiêu",
      "Nuôi dưỡng",
      "Tình mẫu tử",
      "Sáng tạo dồi dào",
      "Sung túc tự nhiên"
    ],
    "reversedKeywords": [
      "Nuông chiều thái quá",
      "Tắc nghẽn sáng tạo",
      "Phụ thuộc cảm xúc",
      "Bỏ bê bản thân"
    ],
    "uprightMeaning": "The Empress là hình mẫu Mẹ Đất bao dung, mang lại sinh sôi nảy nở, sự thịnh vượng ấm no và niềm hân hoan thụ hưởng cái đẹp của cuộc đời.",
    "reversedMeaning": "Cảnh báo sự bảo bọc ngột ngạt, kiểm soát đối phương dưới vỏ bọc yêu thương, hoặc kiệt sức vì hy sinh cho người khác mà quên chăm sóc bản thân.",
    "aspects": {
      "career": {
        "upright": "Dự án đơm hoa kết trái, bội thu lợi nhuận, môi trường làm việc sáng tạo ấm áp và hỗ trợ lẫn nhau.",
        "reversed": "Thiếu cảm hứng làm việc, xung đột với cộng sự nữ, chi tiêu hoang phí vào những thú vui xa xỉ."
      },
      "love": {
        "upright": "Hôn nhân viên mãn, tình yêu ngọt ngào đơm hoa kết trái, tin vui về con cái hoặc gắn kết trọn vẹn.",
        "reversed": "Ghen tuông sở hữu, cảm giác không được trân trọng hoặc mâu thuẫn mẹ chồng nàng dâu."
      },
      "healthSpirit": {
        "upright": "Sức sống căng tràn, khả năng thụ thai cao, thể chất hòa hợp với nhịp điệu đất trời.",
        "reversed": "Tăng cân mất kiểm soát, lười vận động hoặc các vấn đề liên quan đến cơ quan sinh sản."
      },
      "dharmaAdvice": {
        "upright": "Thực hành tâm từ vô lượng (Maitri). Ban rải tình thương và sự nâng đỡ đến vạn vật mà không mong cầu đền đáp.",
        "reversed": "Học cách buông tay để người thương tự trưởng thành; tình thương đích thực phải đi kèm với trí tuệ."
      }
    }
  },
  {
    "id": "major_04_emperor",
    "number": 4,
    "roman": "IV",
    "nameEn": "The Emperor",
    "nameVi": "Hoàng Đế",
    "arcana": "Major",
    "element": "Lửa",
    "astrology": "Cung Bạch Dương (Aries)",
    "icon": "🏛️",
    "visualSymbol": "Ngai vàng đá hoa cương chạm đầu cừu, tay cầm quả cầu quyền lực và vương trượng Ankh",
    "uprightKeywords": [
      "Trật tự kỷ cương",
      "Quyền lực vững vàng",
      "Lãnh đạo quyết đoán",
      "Cấu trúc nền móng",
      "Bảo hộ"
    ],
    "reversedKeywords": [
      "Độc đoán chuyên quyền",
      "Cứng nhắc bảo thủ",
      "Lạm quyền",
      "Mất kiểm soát tổ chức"
    ],
    "uprightMeaning": "The Emperor tượng trưng cho trật tự, nguyên tắc và sức mạnh kiến tạo nền móng vững bền. Bạn có năng lực làm chủ tình thế và dẫn dắt tập thể vượt qua hỗn loạn.",
    "reversedMeaning": "Sự cai trị độc tài, bướng bỉnh không lắng nghe góp ý, hoặc sự yếu nhược nhu nhược làm sụp đổ trật tự công việc.",
    "aspects": {
      "career": {
        "upright": "Thăng tiến vị trí quản lý, ký kết hợp đồng với cơ quan lớn, xây dựng hệ thống quy chuẩn bền vững.",
        "reversed": "Chạm trán cấp trên hách dịch, kỷ luật bị phá vỡ, tranh giành quyền lực tiêu hao nội lực."
      },
      "love": {
        "upright": "Chỗ dựa vững chắc, đối tác trưởng thành nghiêm túc, xây dựng tương lai gia đình bài bản rõ ràng.",
        "reversed": "Gia trưởng áp đặt, thiếu đi sự mềm mỏng lãng mạn, kiểm soát đời tư đối phương thái quá."
      },
      "healthSpirit": {
        "upright": "Kỷ luật tập luyện nghiêm túc đem lại thể hình và sức khỏe tối ưu, tinh thần thép kiên định.",
        "reversed": "Đau đầu do áp lực gánh vác, cao huyết áp, các bệnh về xương khớp do cơ thể quá căng cứng."
      },
      "dharmaAdvice": {
        "upright": "Dùng đức hạnh để nhiếp phục nhân tâm (Đức trị). Quyền lực tối thượng là quyền năng tự chủ chính mình.",
        "reversed": "Hạ bớt bản ngã và cái tôi ngạo mạn; nhẫn nhục và lắng nghe là đỉnh cao của bản lĩnh bậc trượng phu."
      }
    }
  },
  {
    "id": "major_05_hierophant",
    "number": 5,
    "roman": "V",
    "nameEn": "The Hierophant",
    "nameVi": "Đại Giáo Hoàng",
    "arcana": "Major",
    "element": "Đất",
    "astrology": "Cung Kim Ngưu (Taurus)",
    "icon": "⛪",
    "visualSymbol": "Vương miện ba tầng, hai chìa khóa vàng bạc của Thánh Peter, hai tín đồ quỳ dưới bệ",
    "uprightKeywords": [
      "Truyền thống",
      "Minh sư dẫn lối",
      "Quy chuẩn đạo đức",
      "Tri thức kinh điển",
      "Tín ngưỡng thiêng liêng"
    ],
    "reversedKeywords": [
      "Bảo thủ giáo điều",
      "Phá vỡ lề thói cũ",
      "Tư tưởng lệch chuẩn",
      "Giả nhân giả nghĩa"
    ],
    "uprightMeaning": "The Hierophant mang sứ mệnh truyền thừa đạo thống và tri thức cổ xưa. Tìm kiếm lời khuyên từ tiền bối, tôn trọng quy củ chuẩn mực sẽ đem lại bình an và thành công.",
    "reversedMeaning": "Sự giam hãm trong các giáo điều lạc hậu, bị lừa bởi những kẻ mang danh thầy bà tâm linh rởm, hoặc khao khát nổi loạn phá cách.",
    "aspects": {
      "career": {
        "upright": "Học hỏi từ chuyên gia kỳ cựu, làm việc trong các tổ chức uy tín có bề dày truyền thống, thi cử thuận lợi.",
        "reversed": "Bất mãn với cơ chế quan liêu, quy trình làm việc rườm rà cản trở đổi mới và sáng tạo."
      },
      "love": {
        "upright": "Tình yêu hướng tới hôn nhân chính thống được hai họ chúc phúc, gắn kết bằng giá trị sống tương đồng.",
        "reversed": "Quan điểm sống bất đồng do khác biệt nền tảng văn hóa gia đình, áp lực định kiến xã hội."
      },
      "healthSpirit": {
        "upright": "Tuân thủ phác đồ điều trị truyền thống, chữa lành bằng các phương pháp tự nhiên dưỡng sinh.",
        "reversed": "Tin theo các phương thuốc mê tín dị đoan không căn cứ khoa học, kiêng khem mù quáng."
      },
      "dharmaAdvice": {
        "upright": "Quy y Tam Bảo, nương tựa bậc thiện tri thức chánh kiến. Tôn kính cội nguồn tiên tổ nuôi dưỡng phước báu.",
        "reversed": "Cẩn trọng phân định chánh tà; 'Y pháp bất y nhân' - nương vào chân lý chứ đừng mê muội tôn sùng cá nhân."
      }
    }
  },
  {
    "id": "major_06_lovers",
    "number": 6,
    "roman": "VI",
    "nameEn": "The Lovers",
    "nameVi": "Đôi Tình Nhân",
    "arcana": "Major",
    "element": "Khí",
    "astrology": "Cung Song Tử (Gemini)",
    "icon": "💞",
    "visualSymbol": "Đại thiên thần Raphael giang cánh chúc phúc, Adam & Eve, Cây tri thức và Cây sự sống",
    "uprightKeywords": [
      "Tình yêu tri kỷ",
      "Lựa chọn ngã rẽ",
      "Hòa hợp âm dương",
      "Sự gắn kết thiêng liêng",
      "Đồng điệu giá trị"
    ],
    "reversedKeywords": [
      "Bất đồng rạn nứt",
      "Lựa chọn sai lầm",
      "Mâu thuẫn giá trị nội tâm",
      "Bội ước không chung thủy"
    ],
    "uprightMeaning": "The Lovers không chỉ nói về tình yêu đôi lứa mà còn là ngã rẽ đạo đức quan trọng đòi hỏi bạn phải chọn lựa bằng cả con tim và sự tỉnh thức chân thật.",
    "reversedMeaning": "Sự chia rẽ, bất hòa trong quan hệ, đưa ra quyết định vội vàng trái với lương tâm, hoặc rơi vào mối quan hệ tay ba phức tạp.",
    "aspects": {
      "career": {
        "upright": "Hợp tác đối tác ăn ý tạo nên giá trị kép, đứng trước hai cơ hội việc làm đều hấp dẫn cần chọn lựa sáng suốt.",
        "reversed": "Xung đột lợi ích nội bộ, đối tác lật lọng, đưa cảm xúc cá nhân xen lẫn vào quyết định công việc."
      },
      "love": {
        "upright": "Gặp gỡ tri kỷ tâm đầu ý hợp, tình yêu nồng nàn thăng hoa, cam kết đồng hành bền chặt suốt đời.",
        "reversed": "Cảm giác xa cách lạnh nhạt, bất an vì có người thứ ba, mâu thuẫn không thể dung hòa."
      },
      "healthSpirit": {
        "upright": "Thân tâm hợp nhất, năng lượng âm dương trong cơ thể cân bằng giúp thần sắc rạng rỡ tươi trẻ.",
        "reversed": "Tâm trí xáo trộn do giằng xé nội tâm, suy nhược thần kinh vì lo nghĩ chuyện tình cảm."
      },
      "dharmaAdvice": {
        "upright": "Nuôi dưỡng tình thương rộng lớn không điều kiện. Nhìn thấy Chân Như trong mắt người đồng hành.",
        "reversed": "Chuyển hóa ái dục chấp thủ thành tình thương từ bi; học bài học buông xả nếu duyên đã hết."
      }
    }
  },
  {
    "id": "major_07_chariot",
    "number": 7,
    "roman": "VII",
    "nameEn": "The Chariot",
    "nameVi": "Cỗ Chiến Xa",
    "arcana": "Major",
    "element": "Nước",
    "astrology": "Cung Cự Giải (Cancer)",
    "icon": "🛡️",
    "visualSymbol": "Chiến binh kiên cường trên chiến xa mui sao, hai nhân sư đen trắng kéo xe theo hai hướng",
    "uprightKeywords": [
      "Ý chí sắt đá",
      "Chiến thắng vinh quang",
      "Kiểm soát xung đột",
      "Tiến về phía trước",
      "Bản lĩnh kiên cường"
    ],
    "reversedKeywords": [
      "Mất lái chệch hướng",
      "Hung hăng hiếu thắng",
      "Bất lực trước biến cố",
      "Thất bại vì thiếu kiềm chế"
    ],
    "uprightMeaning": "The Chariot đại diện cho sức mạnh làm chủ hai luồng năng lượng đối lập (nhân sư đen - trắng) bằng ý chí định tâm, vượt qua mọi chướng ngại để cán đích vẻ vang.",
    "reversedMeaning": "Cảnh báo sự mất kiểm soát, để cảm xúc bốc đồng lái cuộc đời lao dốc, hoặc cảm giác kiệt sức vì cố gồng mình chống lại dòng chảy tự nhiên.",
    "aspects": {
      "career": {
        "upright": "Vượt qua thử thách khốc liệt, đánh bại đối thủ cạnh tranh, đạt được mục tiêu doanh số hoặc thăng chức lớn.",
        "reversed": "Dự án bị đình trệ đột ngột, tranh cãi gay gắt với đồng nghiệp, áp lực quá tải dẫn đến kiệt quệ."
      },
      "love": {
        "upright": "Cùng nhau vượt qua sóng gió gia đình và thử thách cản trở, kiên định bảo vệ tình yêu đến cùng.",
        "reversed": "Cái tôi quá lớn ai cũng muốn phần thắng khiến quan hệ đổ vỡ, nói lời cay độc gây tổn thương sâu sắc."
      },
      "healthSpirit": {
        "upright": "Sức bền thể lực phi thường, phục hồi nhanh chóng sau bệnh tật nhờ ý chí sinh tồn mạnh mẽ.",
        "reversed": "Nguy cơ va chạm giao thông, chấn thương cơ bắp do hoạt động quá sức, cần giảm tốc độ sống."
      },
      "dharmaAdvice": {
        "upright": "Nhiếp phục tâm vượn ý ngựa. Bậc trí giả dùng định lực làm dây cương, điều phục mọi tham sân si.",
        "reversed": "Nhận diện cơn giận và thói hiếu thắng; thắng vạn quân không bằng tự thắng chính mình."
      }
    }
  },
  {
    "id": "major_08_strength",
    "number": 8,
    "roman": "VIII",
    "nameEn": "Strength",
    "nameVi": "Sức Mạnh Thuần Khiết",
    "arcana": "Major",
    "element": "Lửa",
    "astrology": "Cung Sư Tử (Leo)",
    "icon": "🦁",
    "visualSymbol": "Thiếu nữ áo trắng dịu dàng vuốt ve miệng sư tử hung dữ, ấn vô cực ∞ trên đỉnh đầu",
    "uprightKeywords": [
      "Dũng khí từ bi",
      "Thuần hóa thú tính",
      "Kiên nhẫn nhẫn nại",
      "Nội lực bền bỉ",
      "Lòng trắc ẩn"
    ],
    "reversedKeywords": [
      "Tự ti yếu đuối",
      "Bùng nổ cơn thịnh nộ",
      "Nghi ngờ bản thân",
      "Sợ hãi trốn chạy"
    ],
    "uprightMeaning": "Strength khẳng định sức mạnh chân chính không đến từ bạo lực cơ bắp mà xuất phát từ lòng từ bi, sự nhẫn nại vô bờ và sự dịu dàng có thể làm tan chảy mọi hung hiểm.",
    "reversedMeaning": "Bạn đang bị nỗi tự ti và sợ hãi bóp nghẹt, hoặc ngược lại, để cho cơn giận nguyên thủy kiểm soát hành vi làm tổn thương người thân yêu.",
    "aspects": {
      "career": {
        "upright": "Khéo léo xử lý khủng hoảng truyền thông, thuần hóa khách hàng khó tính bằng thái độ tận tâm chuyên nghiệp.",
        "reversed": "Mất bình tĩnh trong cuộc họp quan trọng, thiếu tự tin khi trình bày ý tưởng, dễ bỏ cuộc giữa chừng."
      },
      "love": {
        "upright": "Tình yêu cảm hóa đối phương, sự bao dung và lắng nghe giúp hàn gắn những tổn thương sâu đậm nhất.",
        "reversed": "Thiếu kiên nhẫn, chì chiết lỗi lầm quá khứ của người yêu, hoặc tự ti cho rằng mình không xứng đáng được yêu."
      },
      "healthSpirit": {
        "upright": "Hệ miễn dịch khỏe mạnh, khả năng chiến thắng bệnh tật hiểm nghèo nhờ tinh thần lạc quan yêu đời.",
        "reversed": "Mệt mỏi kiệt sức, suy giảm đề kháng, trầm cảm do kìm nén uất ức kéo dài không được giải tỏa."
      },
      "dharmaAdvice": {
        "upright": "Tu hạnh Nhẫn Nhục Ba La Mật (Kshanti). Lấy ân báo oán, oán ấy tiêu tan; lấy từ bi cảm hóa can qua.",
        "reversed": "Nhìn sâu vào con sư tử giận dữ bên trong; ôm ấp nỗi đau của chính mình bằng sự vỗ về tỉnh thức."
      }
    }
  },
  {
    "id": "major_09_hermit",
    "number": 9,
    "roman": "IX",
    "nameEn": "The Hermit",
    "nameVi": "Ẩn Sĩ",
    "arcana": "Major",
    "element": "Đất",
    "astrology": "Cung Xử Nữ (Virgo)",
    "icon": "🏮",
    "visualSymbol": "Lão trượng áo choàng xám trên đỉnh núi tuyết, tay cầm đèn lồng chứa ngôi sao 6 cánh soi đường",
    "uprightKeywords": [
      "Soi sáng nội tâm",
      "Tĩnh lặng tu tập",
      "Minh triết từng trải",
      "Cô độc thanh cao",
      "Chiêm nghiệm chân lý"
    ],
    "reversedKeywords": [
      "Cô lập cực đoan",
      "Bảo thủ xa lánh đời",
      "Lạc lối trong bóng tối",
      "Tự giam cầm tâm trí"
    ],
    "uprightMeaning": "The Hermit kêu gọi bạn tạm gác lại những xô bồ náo nhiệt của trần gian để quay vào trong, thắp sáng ngọn đèn tuệ giác và chiêm nghiệm ý nghĩa thực sự của kiếp nhân sinh.",
    "reversedMeaning": "Sự cô lập biến thành lãnh cảm quái gở, sợ hãi giao tiếp xã hội, hoặc bế tắc không tìm thấy phương hướng trong màn sương mù mờ mịt.",
    "aspects": {
      "career": {
        "upright": "Thời điểm thích hợp để đi học nâng cao, viết sách nghiên cứu, làm việc độc lập hoặc cố vấn chiến lược.",
        "reversed": "Khó hòa nhập với văn hóa tập thể, từ chối sự trợ giúp cần thiết từ đồng nghiệp dẫn đến tiến độ bế tắc."
      },
      "love": {
        "upright": "Khoảng lặng cần thiết để cả hai cùng nhìn nhận lại bản thân; tìm kiếm người bạn đời cùng chia sẻ lý tưởng tâm linh.",
        "reversed": "Bỏ rơi đối phương trong im lặng lạnh lùng, đóng chặt cánh cửa trái tim vì sợ bị tổn thương lần nữa."
      },
      "healthSpirit": {
        "upright": "Thanh lọc cơ thể, tịnh tâm dưỡng khí, tìm thấy bình an qua những chuyến đi thiền định retreat.",
        "reversed": "Trầm cảm, cảm giác bị cả thế giới bỏ rơi, suy nhược do thiếu ánh sáng mặt trời và sự kết nối."
      },
      "dharmaAdvice": {
        "upright": "Hãy là ngọn đèn cho chính mình (Atta Dipa Viharatha). Chân lý tối thượng nằm ngay trong tâm thanh tịnh của bạn.",
        "reversed": "Trở lại nhân gian phụng sự; ngọn đèn trí tuệ thắp lên là để soi đường cho muôn loài cùng thoát khổ."
      }
    }
  },
  {
    "id": "major_10_wheel_of_fortune",
    "number": 10,
    "roman": "X",
    "nameEn": "Wheel of Fortune",
    "nameVi": "Bánh Xe Vận Mệnh",
    "arcana": "Major",
    "element": "Lửa",
    "astrology": "Sao Mộc (Jupiter)",
    "icon": "☸️",
    "visualSymbol": "Bánh xe luân hồi khắc chữ T-A-R-O, Nhân sư trên đỉnh, Rắn Typhon trượt xuống, Thần Anubis nâng lên",
    "uprightKeywords": [
      "Vận may bất ngờ",
      "Bước ngoặt định mệnh",
      "Quy luật luân hồi",
      "Thời cơ chín muồi",
      "Nhân duyên hội tụ"
    ],
    "reversedKeywords": [
      "Vận rủi tạm thời",
      "Kháng cự đổi thay",
      "Cố chấp với dĩ vãng",
      "Thiếu may mắn"
    ],
    "uprightMeaning": "Wheel of Fortune nhắc nhở về quy luật vô thường và bánh xe nghiệp duyên không ngừng xoay chuyển. Vận may đang mỉm cười, mở ra cơ hội đổi đời bất ngờ.",
    "reversedMeaning": "Giai đoạn thoái trào hoặc xui xẻo tạm thời; chớ oán trách số phận mà hãy hiểu rằng đây là nhịp chùng cần thiết để chuẩn bị cho chu kỳ đi lên tiếp theo.",
    "aspects": {
      "career": {
        "upright": "Bước ngoặt thăng tiến ngoạn mục, cơ hội kinh doanh vàng gõ cửa, gặp thời thế thiên thời địa lợi nhân hòa.",
        "reversed": "Kế hoạch bị đảo lộn vì yếu tố khách quan ngoài tầm kiểm soát; nên án binh bất động bảo toàn nguồn vốn."
      },
      "love": {
        "upright": "Nhân duyên tiền định bất ngờ xuất hiện, người cũ quay lại hoặc một cuộc gặp gỡ định mệnh thay đổi cuộc đời.",
        "reversed": "Hiểu lầm do hoàn cảnh trớ trêu, thời điểm chưa thích hợp khiến đôi lứa tạm thời bị ngăn cách."
      },
      "healthSpirit": {
        "upright": "Bệnh tật chuyển biến tích cực thần kỳ, hồi phục sinh lực, tâm thế hòa nhịp với vũ trụ.",
        "reversed": "Thể trạng biến động thất thường theo thời tiết, cần đề phòng các đợt tái phát bệnh cũ."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu Định luật Duyên khởi và Vô thường. Giữ tâm xả buông (Upekkha) trước vinh nhục được mất của cuộc đời.",
        "reversed": "Nhận thức nhân quả công bằng; gieo nhân thiện hôm nay chính là tạo nên vận may cho ngày mai."
      }
    }
  },
  {
    "id": "major_11_justice",
    "number": 11,
    "roman": "XI",
    "nameEn": "Justice",
    "nameVi": "Công Lý",
    "arcana": "Major",
    "element": "Khí",
    "astrology": "Cung Thiên Bình (Libra)",
    "icon": "⚖️",
    "visualSymbol": "Nữ thần công lý cầm thanh gươm hai lưỡi thẳng đứng và chiếc cân thăng bằng tuyệt đối",
    "uprightKeywords": [
      "Công bằng minh bạch",
      "Nhân quả báo ứng",
      "Sự thật sáng tỏ",
      "Quyết định lý trí",
      "Trách nhiệm"
    ],
    "reversedKeywords": [
      "Bất công oan sai",
      "Trốn tránh trách nhiệm",
      "Định kiến hẹp hòi",
      "Hậu quả nặng nề"
    ],
    "uprightMeaning": "Justice phản chiếu quy luật nhân quả nghiêm minh không sai một ly. Sự thật sẽ được phơi bày, mọi hành động trong quá khứ sẽ nhận về kết quả tương xứng và công bằng.",
    "reversedMeaning": "Cảnh báo sự bất công, gian dối trong hợp đồng pháp lý, hoặc thói quen đổ lỗi cho người khác thay vì dũng cảm chịu trách nhiệm về sai lầm của mình.",
    "aspects": {
      "career": {
        "upright": "Thắng kiện trong tranh chấp pháp lý, hợp đồng ký kết minh bạch sòng phẳng, được đền đáp xứng đáng với công sức.",
        "reversed": "Gặp rắc rối về thanh tra pháp lý, phạt hành chính hoặc bị đối tác lừa gạt bằng các điều khoản mù mờ."
      },
      "love": {
        "upright": "Mối quan hệ dựa trên sự tôn trọng bình đẳng, thành thật không giấu giếm, cùng nhau chia sẻ trách nhiệm.",
        "reversed": "Mất cân bằng trong việc cho và nhận, dằn vặt phán xét lẫn nhau, có dấu hiệu lừa dối bị bại lộ."
      },
      "healthSpirit": {
        "upright": "Cơ thể đòi hỏi sự cân bằng trong chế độ ăn uống, lối sống điều độ chính là liều thuốc chữa lành tốt nhất.",
        "reversed": "Mất cân bằng thể chất nghiêm trọng, tác dụng phụ của thuốc hoặc thói quen sinh hoạt buông thả kéo dài."
      },
      "dharmaAdvice": {
        "upright": "Tin sâu nhân quả báo ứng (Karma). 'Gieo gió gặt bão, gieo thiện duyên gặt quả lành', hành động với lương tri sáng tỏ.",
        "reversed": "Thành tâm sám hối tịnh hóa những lầm lỗi đã qua; đền bù thiệt hại cho tha nhân để giải tỏa nghiệp oán."
      }
    }
  },
  {
    "id": "major_12_hanged_man",
    "number": 12,
    "roman": "XII",
    "nameEn": "The Hanged Man",
    "nameVi": "Người Treo Ngược",
    "arcana": "Major",
    "element": "Nước",
    "astrology": "Sao Hải Vương (Neptune)",
    "icon": "🪢",
    "visualSymbol": "Chàng trai treo ngược chân trên cây chữ T bằng gỗ sống, đầu tỏa hào quang giác ngộ, gương mặt thanh thản",
    "uprightKeywords": [
      "Buông bỏ kiểm soát",
      "Góc nhìn đổi mới",
      "Hy sinh vì đại nghĩa",
      "Tạm dừng định tâm",
      "Giác ngộ đốn ngộ"
    ],
    "reversedKeywords": [
      "Hy sinh vô ích",
      "Cố chấp bế tắc",
      "Tự biến mình thành nạn nhân",
      "Chậm trễ lãng phí"
    ],
    "uprightMeaning": "The Hanged Man dạy bài học vô giá về sự buông bỏ. Khi bạn chịu dừng lại và đảo ngược góc nhìn, những điều tưởng như bế tắc lại chính là cánh cửa dẫn tới đại ngộ.",
    "reversedMeaning": "Sự chịu đựng vô nghĩa, tâm lý đóng vai nạn nhân để thao túng lòng thương hại của người khác, hoặc trì hoãn hành động vì sợ đau đớn.",
    "aspects": {
      "career": {
        "upright": "Kế hoạch tạm thời đình trệ để tái cấu trúc; đổi mới tư duy hoàn toàn sẽ tạo ra bước đột phá ngoạn mục.",
        "reversed": "Lãng phí thời gian và tiền bạc cho một dự án không có tương lai; nên dứt khoát cắt lỗ."
      },
      "love": {
        "upright": "Sẵn sàng nhường nhịn và hy sinh vì hạnh phúc chung, học cách thấu hiểu cảm xúc từ góc nhìn của đối phương.",
        "reversed": "Mối quan hệ một chiều độc hại, bạn hy sinh tất cả nhưng đối phương chỉ xem đó là điều hiển nhiên."
      },
      "healthSpirit": {
        "upright": "Thời gian nghỉ ngơi tịnh dưỡng hồi phục sức khỏe, thực hành yoga và các bài tập đảo ngược dòng năng lượng.",
        "reversed": "Kiệt sức do lao lực kéo dài, từ chối nghỉ ngơi khiến bệnh tình chuyển biến mạn tính."
      },
      "dharmaAdvice": {
        "upright": "Thực hành hạnh xả ly (Nekkhamma). Đôi khi chiến thắng lớn nhất là buông bỏ sự nắm giữ và chấp thủ cố hữu.",
        "reversed": "Phân biệt giữa hy sinh cao thượng và sự nhu nhược yếu đuối; chớ để tâm si mê dẫn dắt vào ngõ cụt."
      }
    }
  },
  {
    "id": "major_13_death",
    "number": 13,
    "roman": "XIII",
    "nameEn": "Death",
    "nameVi": "Tử Thần Tái Sinh",
    "arcana": "Major",
    "element": "Nước",
    "astrology": "Cung Bọ Cạp (Scorpio)",
    "icon": "💀",
    "visualSymbol": "Kỵ sĩ xương mặc giáp đen cưỡi ngựa trắng mang cờ hoa hồng thần bí, mặt trời mọc giữa hai tòa tháp",
    "uprightKeywords": [
      "Kết thúc chu kỳ cũ",
      "Tái sinh lột xác",
      "Chuyển hóa triệt để",
      "Buông bỏ quá khứ",
      "Cánh cửa mới"
    ],
    "reversedKeywords": [
      "Kháng cự đổi thay",
      "Mắc kẹt trong đau buồn",
      "Sợ hãi cái chết",
      "Kéo dài sự hấp hối"
    ],
    "uprightMeaning": "Death hiếm khi chỉ cái chết thể xác; đây là biểu tượng hùng tráng của sự kết thúc một chương cũ để một khởi đầu mới rực rỡ được hoài thai và tái sinh từ đống tro tàn.",
    "reversedMeaning": "Sự giãy giụa bất lực bám víu vào những gì đã chết (mối quan hệ độc hại, công việc trì trệ), tự kéo dài đau khổ cho chính mình.",
    "aspects": {
      "career": {
        "upright": "Chấm dứt hoàn toàn công việc cũ để bắt đầu sự nghiệp mới huy hoàng hơn; tái cấu trúc triệt để tổ chức.",
        "reversed": "Cố níu kéo mô hình kinh doanh lỗi thời dẫn đến thua lỗ nặng nề hơn."
      },
      "love": {
        "upright": "Kết thúc một mối quan hệ đã cạn duyên để giải thoát cho nhau; hoặc sự chuyển mình lột xác sâu sắc trong cách yêu.",
        "reversed": "Dây dưa không dứt khoát với người yêu cũ độc hại, cản trở duyên lành mới bước vào cuộc đời."
      },
      "healthSpirit": {
        "upright": "Cắt bỏ khối u phiền não, loại bỏ triệt để thói quen sinh hoạt xấu, cơ thể bước vào chu kỳ trẻ hóa hồi sinh.",
        "reversed": "U uất buồn bã làm suy sụp tinh thần, cơ thể nặng nề do chứa chấp năng lượng u uất tiêu cực."
      },
      "dharmaAdvice": {
        "upright": "Quán niệm về sự chết và vô thường (Marana Sati). Nhận thức đời người ngắn ngủi để sống trọn vẹn từng sát na thanh tịnh.",
        "reversed": "Buông xả chấp niệm tiền kiếp; chiếc lá rụng về cội là để nuôi dưỡng những chồi non bừng nở mùa xuân."
      }
    }
  },
  {
    "id": "major_14_temperance",
    "number": 14,
    "roman": "XIV",
    "nameEn": "Temperance",
    "nameVi": "Tiết Độ & Hòa Hợp",
    "arcana": "Major",
    "element": "Lửa",
    "astrology": "Cung Nhân Mã (Sagittarius)",
    "icon": "🕊️",
    "visualSymbol": "Đại thiên thần một chân trên đất một chân dưới nước, rót qua lại dòng nước giữa hai chiếc cúp vàng",
    "uprightKeywords": [
      "Trung đạo cân bằng",
      "Hòa hợp nhịp nhàng",
      "Chữa lành vi tế",
      "Kiên nhẫn điều độ",
      "Giả kim thuật nội tâm"
    ],
    "reversedKeywords": [
      "Mất cân bằng thái quá",
      "Xung đột bất hòa",
      "Hấp tấp nôn nóng",
      "Lối sống cực đoan"
    ],
    "uprightMeaning": "Temperance là nghệ thuật sống Trung Đạo. Bằng cách dung hòa các mặt đối lập với sự kiên nhẫn và từ ái, bạn tạo ra sự chuyển hóa thần diệu chữa lành mọi vết thương.",
    "reversedMeaning": "Lối sống mất cân bằng, ăn uống quá độ, cảm xúc trồi sụt thất thường, hoặc sự kết hợp sai lầm giữa các yếu tố xung khắc.",
    "aspects": {
      "career": {
        "upright": "Hòa giải xung đột nội bộ tài tình, kết hợp nhuần nhuyễn giữa kế hoạch dài hạn và hành động ngắn hạn.",
        "reversed": "Tranh cãi gay gắt trong tập thể, kế hoạch tiến hành chắp vá thiếu liên kết dẫn đến lãng phí tài nguyên."
      },
      "love": {
        "upright": "Mối quan hệ êm đềm bình yên, thấu hiểu và tôn trọng khoảng trời riêng của nhau, tình yêu bền vững như dòng suối mát.",
        "reversed": "Thiếu kiên nhẫn, đòi hỏi đối phương phải đáp ứng ngay lập tức các mong muốn ích kỷ của mình."
      },
      "healthSpirit": {
        "upright": "Cơ thể thanh lọc, khí huyết lưu thông điều hòa, tâm trí an định và bình yên tuyệt đối.",
        "reversed": "Rối loạn chuyển hóa chất, ngộ độc thực phẩm hoặc tác hại do dùng quá liều các chất kích thích."
      },
      "dharmaAdvice": {
        "upright": "Hành trì Bát Chánh Đạo và con đường Trung Đạo (Majjhima Patipada). Không buông thả dục lạc cũng không khổ hạnh ép xác.",
        "reversed": "Tự soi chiếu và điều chỉnh những thói quen thái quá; lấy sự điều hòa hơi thở làm điểm tựa định tâm."
      }
    }
  },
  {
    "id": "major_15_devil",
    "number": 15,
    "roman": "XV",
    "nameEn": "The Devil",
    "nameVi": "Ác Quỷ Trói Buộc",
    "arcana": "Major",
    "element": "Đất",
    "astrology": "Cung Ma Kết (Capricorn)",
    "icon": "⛓️",
    "visualSymbol": "Thần Dê Baphomet với ngôi sao năm cánh ngược, hai người nam nữ bị xích lỏng quanh cổ vào bệ đá",
    "uprightKeywords": [
      "Cám dỗ vật chất",
      "Trói buộc vô hình",
      "Ảo tưởng chấp ngã",
      "Ái dục mê muội",
      "Bóng tối vô thức"
    ],
    "reversedKeywords": [
      "Phá tan xiềng xích",
      "Thức tỉnh giải thoát",
      "Nhận diện ảo tưởng",
      "Chiến thắng cám dỗ"
    ],
    "uprightMeaning": "The Devil vạch trần những sợi dây xích vô hình do chính tâm tham sân si của bạn tạo ra. Chiếc xích quanh cổ vốn rất lỏng, bạn hoàn toàn có thể tự tháo ra nếu tỉnh thức.",
    "reversedMeaning": "Khoảnh khắc bừng tỉnh, chặt đứt thói quen nghiện ngập, thoát khỏi mối quan hệ thao túng độc hại và tìm lại tự do tự tại.",
    "aspects": {
      "career": {
        "upright": "Bị cuốn vào vòng xoáy kim tiền bất chính, làm việc kiệt sức vì lòng tham không đáy, môi trường làm việc độc hại kìm kẹp.",
        "reversed": "Dũng cảm từ bỏ nguồn lợi bất minh, tìm lại đạo đức nghề nghiệp và hướng đi chân chính."
      },
      "love": {
        "upright": "Mối quan hệ lệ thuộc mù quáng, ghen tuông bệnh hoạn, tình dục chi phối lý trí nhưng trống rỗng tâm hồn.",
        "reversed": "Dứt khoát chấm dứt với kẻ lạm dụng thao túng, chữa lành vết thương lòng và lấy lại phẩm giá."
      },
      "healthSpirit": {
        "upright": "Nghiện ngập (rượu bia, thuốc lá, cờ bạc, mạng xã hội), tâm lý bất an hoảng loạn do ám thị tiêu cực.",
        "reversed": "Cai nghiện thành công, phục hồi thể chất, năng lượng tích cực đẩy lùi bóng tối u ám."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu Tam Độc: Tham - Sân - Si. Thành tâm sám hối và niệm danh hiệu Quán Thế Âm để phá trừ ma chướng.",
        "reversed": "Tri ân bài học bóng tối; nhận ra bùn lầy chính là dưỡng chất nuôi hoa sen thức tỉnh ngát hương."
      }
    }
  },
  {
    "id": "major_16_tower",
    "number": 16,
    "roman": "XVI",
    "nameEn": "The Tower",
    "nameVi": "Tòa Tháp Sụp Đổ",
    "arcana": "Major",
    "element": "Lửa",
    "astrology": "Sao Hỏa (Mars)",
    "icon": "⚡",
    "visualSymbol": "Tia sét đánh trúng vương miện trên đỉnh tháp đá cao ngất, lửa bốc ngùn ngụt, hai người rơi xuống vực",
    "uprightKeywords": [
      "Sụp đổ bất ngờ",
      "Thanh trừng ảo tưởng",
      "Biến cố thức tỉnh",
      "Giải phóng ngột ngạt",
      "Sự thật trần trụi"
    ],
    "reversedKeywords": [
      "Tránh được thảm họa trong gang tấc",
      "Cố bám víu đống đổ nát",
      "Sợ hãi biến động",
      "Nỗi đau âm ỉ kéo dài"
    ],
    "uprightMeaning": "The Tower là tia sét của Thượng Đế giáng xuống đập tan những tòa tháp bản ngã và ảo tưởng dối trá. Dù chấn động gây đau đớn, nhưng đó là điều bắt buộc để bạn xây dựng lại trên nền móng sự thật.",
    "reversedMeaning": "Bạn đang cố trì hoãn một sự sụp đổ không thể tránh khỏi, hoặc sau cơn bão táp, bạn đang gắng gượng đứng dậy thu dọn tàn cuộc.",
    "aspects": {
      "career": {
        "upright": "Phá sản bất ngờ, công ty cắt giảm hàng loạt, scandal bị phanh phui làm sụp đổ danh tiếng ảo.",
        "reversed": "Nhận biết sớm nguy cơ rủi ro và kịp thời chuyển hướng, giảm thiểu tối đa thiệt hại tài chính."
      },
      "love": {
        "upright": "Bí mật phản bội bị vỡ lở dẫn đến chia tay đột ngột chấn động, tranh cãi dữ dội phá tan vỏ bọc hạnh phúc giả tạo.",
        "reversed": "Cố che đậy rạn nứt hôn nhân vì sợ miệng tiếng thiên hạ, sống trong sự dằn vặt ngột ngạt từng ngày."
      },
      "healthSpirit": {
        "upright": "Tai nạn bất ngờ, cơn đau cấp tính, đột quỵ cần cấp cứu khẩn cấp; cú sốc tâm lý mạnh.",
        "reversed": "Thoát nạn thần kỳ trong gang tấc, giai đoạn phục hồi hậu sang chấn tâm lý."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu Vô Ngã và sự sụp đổ của ảo vọng chấp ngã. Nương tựa vào Phật Pháp như bến đỗ bình an bất hoại.",
        "reversed": "Đừng xây lại ngôi nhà trên cát lún; hãy dọn sạch xà bần quá khứ để đặt viên đá tảng Chánh Pháp."
      }
    }
  },
  {
    "id": "major_17_star",
    "number": 17,
    "roman": "XVII",
    "nameEn": "The Star",
    "nameVi": "Ngôi Sao Hy Vọng",
    "arcana": "Major",
    "element": "Khí",
    "astrology": "Cung Bảo Bình (Aquarius)",
    "icon": "⭐",
    "visualSymbol": "Thiếu nữ khỏa thân dưới bầu trời 8 ngôi sao sáng rực, rót dòng nước sự sống xuống đất và hồ nước",
    "uprightKeywords": [
      "Hy vọng phục sinh",
      "Niềm tin rạng rỡ",
      "Chữa lành tâm hồn",
      "Cảm hứng thanh khiết",
      "Điềm lành vũ trụ"
    ],
    "reversedKeywords": [
      "Mất niềm tin",
      "Thất vọng chán chường",
      "Hoài nghi tương lai",
      "Bi quan tiêu cực"
    ],
    "uprightMeaning": "Sau cơn dông bão của Tòa Tháp, The Star xuất hiện như vì sao hộ mệnh tỏa ánh sáng êm dịu, mang lại sự chữa lành, niềm hy vọng bất diệt và dòng ân phước dồi dào từ vũ trụ.",
    "reversedMeaning": "Bóng mây hoài nghi che khuất niềm tin, cảm giác cô độc và bi quan khiến bạn không nhìn thấy những phước lành đang hiện hữu xung quanh.",
    "aspects": {
      "career": {
        "upright": "Ý tưởng sáng tạo được công nhận, danh tiếng lan tỏa, cơ hội làm việc trong môi trường nhân văn lý tưởng.",
        "reversed": "Thiếu cảm hứng làm việc, đặt mục tiêu xa rời thực tế dẫn đến thất vọng khi không đạt kết quả."
      },
      "love": {
        "upright": "Tình yêu thuần khiết không vụ lợi, tâm hồn đồng điệu hòa hợp, tương lai đôi lứa ngập tràn ánh sáng tươi đẹp.",
        "reversed": "Mất niềm tin vào tình yêu sau tổn thương cũ, tự ti khép kín lòng mình không dám đón nhận người mới."
      },
      "healthSpirit": {
        "upright": "Sức khỏe phục hồi kỳ diệu, tinh thần thanh thản an nhiên, dòng năng lượng tích cực lan tỏa toàn thân.",
        "reversed": "Cạn kiệt năng lượng tinh thần, cảm giác chông chênh vô định cần được nâng đỡ và trị liệu tâm lý."
      },
      "dharmaAdvice": {
        "upright": "Giữ tâm thanh tịnh như giếng nước trong veo. Hãy là sứ giả của ánh sáng, lan tỏa bình an và niềm tin đến thế gian.",
        "reversed": "Khơi lại đốm lửa bồ đề tâm; bóng đêm dẫu dày đặc đến đâu cũng không thể ngăn bình minh ló dạng."
      }
    }
  },
  {
    "id": "major_18_moon",
    "number": 18,
    "roman": "XVIII",
    "nameEn": "The Moon",
    "nameVi": "Mặt Trăng Huyền Bí",
    "arcana": "Major",
    "element": "Nước",
    "astrology": "Cung Song Ngư (Pisces)",
    "icon": "🌕",
    "visualSymbol": "Mặt trăng tỏa giọt sương, chó sói và chó nhà sủa trăng, con tôm bò lên từ đầm lầy vô thức",
    "uprightKeywords": [
      "Ảo giác vô thức",
      "Nỗi sợ mơ hồ",
      "Bí mật che giấu",
      "Trực giác hoang dã",
      "Màn sương bất an"
    ],
    "reversedKeywords": [
      "Giải tỏa ảo ảnh",
      "Sự thật phơi bày",
      "Vượt qua sợ hãi",
      "Ánh sáng chiếu rọi"
    ],
    "uprightMeaning": "The Moon dẫn lối vào miền đất của tiềm thức sâu thẳm, nơi nỗi sợ vô hình, ảo ảnh và giấc mơ đan xen. Đừng vội tin vào những gì mắt thấy, hãy dùng tuệ giác soi rọi màn sương.",
    "reversedMeaning": "Bức màn bí mật dần hé lộ, bạn bắt đầu phân định được đâu là sự thật và đâu là ảo giác do tâm trí tự thêu dệt nên.",
    "aspects": {
      "career": {
        "upright": "Môi trường làm việc mờ ám, thông tin bất cân xứng, coi chừng tiểu nhân gièm pha hãm hại sau lưng.",
        "reversed": "Phát hiện ra kẻ lừa đảo, làm sáng tỏ các khúc mắc hiểu lầm, đường hướng kinh doanh dần thông tỏ."
      },
      "love": {
        "upright": "Bất an, nghi ngờ đối phương lừa dối, cảm giác mơ hồ không biết tương lai mối quan hệ sẽ đi về đâu.",
        "reversed": "Đối thoại thẳng thắn giải tỏa mọi hoài nghi, nhận diện bản chất thật của đối tác và đưa ra quyết định dứt khoát."
      },
      "healthSpirit": {
        "upright": "Mất ngủ kinh niên, ác mộng đè nặng tâm trí, rối loạn lo âu, nhạy cảm quá mức với năng lượng xấu.",
        "reversed": "Tinh thần dần hồi phục, giấc ngủ sâu và an giấc trở lại sau thời gian dài điều trị."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu 'Phàm sở hữu tướng giai thị hư vọng'. Niệm Quán Thế Âm để dẹp yên tâm ma và nỗi sợ hãi hư huyễn.",
        "reversed": "Dũng cảm đối diện với bóng tối bên trong (Shadow Work); ánh sáng chánh niệm chiếu tới đâu, bóng tối tan biến tới đó."
      }
    }
  },
  {
    "id": "major_19_sun",
    "number": 19,
    "roman": "XIX",
    "nameEn": "The Sun",
    "nameVi": "Mặt Trời Rực Rỡ",
    "arcana": "Major",
    "element": "Lửa",
    "astrology": "Mặt Trời (Sun)",
    "icon": "☀️",
    "visualSymbol": "Đứa trẻ khỏa thân đầu đội vòng hoa cưỡi ngựa trắng dưới vầng thái dương rạng ngời và tường hoa hướng dương",
    "uprightKeywords": [
      "Hân hoan tột đỉnh",
      "Thành công vang dội",
      "Ánh sáng chân lý",
      "Sinh lực dồi dào",
      "Ấm áp rực rỡ"
    ],
    "reversedKeywords": [
      "Mây mờ tạm thời",
      "Niềm vui chưa trọn vẹn",
      "Kiêu căng tự phụ",
      "Lạc quan tếu"
    ],
    "uprightMeaning": "The Sun là lá bài tích cực và tươi sáng nhất trong bộ Tarot. Mọi u ám tan biến, nhường chỗ cho niềm vui thuần khiết, thành công rực rỡ và sức sống tràn trề ấm áp.",
    "reversedMeaning": "Thành công có thể bị chậm trễ đôi chút do vài đám mây che khuất, hoặc lời nhắc nhở chớ quá kiêu ngạo tự mãn mà đánh mất sự cẩn trọng.",
    "aspects": {
      "career": {
        "upright": "Đạt thành tựu xuất sắc, được vinh danh khen thưởng, mưu sự đại hanh thông, tài chính sinh sôi nảy nở.",
        "reversed": "Đạt kết quả tốt nhưng chưa đúng như kỳ vọng ban đầu, tránh tự phụ làm mất lòng đồng nghiệp."
      },
      "love": {
        "upright": "Tình yêu viên mãn ngọt ngào, đón nhận tin vui cưới hỏi hoặc sinh con, mối quan hệ tràn đầy tiếng cười và sự tin cậy.",
        "reversed": "Hiểu lầm nhỏ có thể làm giảm bớt không khí vui tươi, cần mở lòng chia sẻ nhiều hơn."
      },
      "healthSpirit": {
        "upright": "Thể chất cường tráng, tinh thần sảng khoái yêu đời, khả năng hồi phục bệnh tật nhanh chóng tuyệt đối.",
        "reversed": "Say nắng, kiệt sức nhẹ do hoạt động quá nhiều dưới nhiệt lượng cao, cần bổ sung nước và nghỉ ngơi."
      },
      "dharmaAdvice": {
        "upright": "Tỏa chiếu ánh sáng quang minh trí tuệ và lòng từ bi sưởi ấm nhân gian. Hân hoan tùy hỷ công đức muôn loài.",
        "reversed": "Khiêm nhường trong chiến thắng; mặt trời chân chính sưởi ấm vạn vật mà chẳng đòi hỏi bất kỳ lời ca ngợi nào."
      }
    }
  },
  {
    "id": "major_20_judgement",
    "number": 20,
    "roman": "XX",
    "nameEn": "Judgement",
    "nameVi": "Phán Xét & Thức Tỉnh",
    "arcana": "Major",
    "element": "Lửa",
    "astrology": "Sao Diêm Vương (Pluto)",
    "icon": "📯",
    "visualSymbol": "Thiên thần Gabriel thổi tù và vàng từ mây trời, người chết trỗi dậy từ mộ đá mở rộng vòng tay đón ân điển",
    "uprightKeywords": [
      "Tiếng gọi lương tri",
      "Đại phán xét",
      "Tái sinh tâm thức",
      "Tha thứ giải thoát",
      "Quyết định bước ngoặt"
    ],
    "reversedKeywords": [
      "Tự trách dằn vặt",
      "Phớt lờ tiếng gọi lương tri",
      "Chậm trễ chuyển hóa",
      "Nghi ngờ bản thân"
    ],
    "uprightMeaning": "Judgement gióng lên hồi còi thức tỉnh thiêng liêng. Quá khứ đã qua, đã đến lúc bạn bước ra khỏi nấm mồ định kiến cũ, đón nhận sự tha thứ và bước vào cuộc đời mới với sứ mệnh cao cả.",
    "reversedMeaning": "Sự giam cầm bản thân trong mặc cảm tội lỗi quá khứ, trốn tránh trách nhiệm thức tỉnh hoặc chần chừ không dám đưa ra phán quyết then chốt.",
    "aspects": {
      "career": {
        "upright": "Tìm thấy sứ mệnh nghề nghiệp đích thực (Calling), đánh giá năng lực công tâm, mở ra chương mới thênh thang.",
        "reversed": "Bị khiển trách vì sai lầm cũ, do dự không dám nắm bắt cơ hội đổi đời vì sợ bị đánh giá."
      },
      "love": {
        "upright": "Tha thứ cho lỗi lầm xưa của nhau để cùng hồi sinh tình yêu; hoặc buông tay trong êm đẹp thanh thản.",
        "reversed": "Bới móc sai lầm quá khứ, dằn vặt chì chiết đối phương khiến mối quan hệ không lối thoát."
      },
      "healthSpirit": {
        "upright": "Sự hồi sinh ngoạn mục sau cơn bạo bệnh, giác ngộ tâm linh sâu sắc thay đổi hoàn toàn nhân sinh quan.",
        "reversed": "Cảm giác tội lỗi gây ảnh hưởng tiêu cực đến thể chất, cần thực hành tha thứ để giải tỏa ách tắc."
      },
      "dharmaAdvice": {
        "upright": "Lắng nghe tiếng chuông tỉnh thức nơi tâm khảm. Tha thứ cho mình và người là cánh cửa mở ra cõi Tịnh Độ hiện tiền.",
        "reversed": "Thành tâm sám hối tịnh hóa nghiệp cũ; đừng phán xét tha nhân khi chính mình còn chưa hoàn thiện."
      }
    }
  },
  {
    "id": "major_21_world",
    "number": 21,
    "roman": "XXI",
    "nameEn": "The World",
    "nameVi": "Thế Giới Toàn Bích",
    "arcana": "Major",
    "element": "Đất",
    "astrology": "Sao Thổ (Saturn)",
    "icon": "🌍",
    "visualSymbol": "Vũ công nhảy múa giữa vòng nguyệt quế nguy nga, 4 góc là 4 sinh vật thần thánh (Sư tử, Bò, Đại bàng, Thiên thần)",
    "uprightKeywords": [
      "Viên mãn tột đỉnh",
      "Hoàn tất chu kỳ",
      "Hợp nhất vũ trụ",
      "Thành tựu vĩ đại",
      "Tự do thênh thang"
    ],
    "reversedKeywords": [
      "Chưa trọn vẹn",
      "Thiếu một bước cuối",
      "Trì hoãn hoàn thành",
      "Nuối tiếc dở dang"
    ],
    "uprightMeaning": "The World đánh dấu sự hoàn tất viên mãn của cuộc hành trình của Chàng Khờ (Fool's Journey). Bạn đã đắc đạo, dung hợp mọi trải nghiệm thành tuệ giác toàn bích và sẵn sàng cho tầng thứ tiến hóa mới.",
    "reversedMeaning": "Bạn đang ở rất gần đích nhưng thiếu chút kiên nhẫn để khép lại chu kỳ; cảm giác thiếu một mảnh ghép cuối cùng để đạt sự trọn vẹn.",
    "aspects": {
      "career": {
        "upright": "Dự án hoàn thành xuất sắc đạt tầm quốc tế, mở rộng kinh doanh toàn cầu, chạm tới đỉnh cao danh vọng.",
        "reversed": "Gặp trục trặc ở khâu bàn giao cuối cùng, kế hoạch xuất ngoại bị chậm trễ vì thủ tục giấy tờ."
      },
      "love": {
        "upright": "Cái kết viên mãn trọn vẹn, hôn nhân hạnh phúc hòa hợp về mọi mặt, tình yêu vượt qua mọi rào cản địa lý và văn hóa.",
        "reversed": "Vẫn còn một gút mắc chưa giải tỏa trước khi có thể tiến tới cam kết hôn nhân trọn đời."
      },
      "healthSpirit": {
        "upright": "Thân tâm hợp nhất với đại vũ trụ, sức khỏe hoàn hảo, tâm thế tự tại thong dong giữa muôn trùng biến dịch.",
        "reversed": "Cần chú ý duy trì chế độ dưỡng sinh đều đặn, đừng lơ là khi vừa mới hồi phục sức khỏe."
      },
      "dharmaAdvice": {
        "upright": "Viên mãn Bồ Đề Tâm (Bodhicitta). Thấy mình trong vạn vật và vạn vật trong mình; an trú nơi tịch diệt Niết Bàn hiện tiền.",
        "reversed": "Kiên trì đi trọn con đường; 'Hành bách lý giả bán cửu thập' - chớ nản lòng nơi bước chân cuối cùng."
      }
    }
  },
  {
    "id": "wands_ace",
    "number": 1,
    "roman": "Ace",
    "nameEn": "Ace of Wands",
    "nameVi": "Át Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Nguyên tố Hỏa sơ khai",
    "icon": "🪄",
    "visualSymbol": "Bàn tay thần từ đám mây vươn ra nắm quyền trượng nảy lộc xanh tươi",
    "uprightKeywords": [
      "Tia lửa sáng tạo",
      "Cơ hội khởi nghiệp",
      "Đam mê mãnh liệt",
      "Nguồn cảm hứng mới"
    ],
    "reversedKeywords": [
      "Thiếu nhiệt huyết",
      "Trì hoãn bế tắc",
      "Ý tưởng chết yểu",
      "Nóng vội hỏng việc"
    ],
    "uprightMeaning": "Ace of Wands là món quà khởi nguyên từ vũ trụ trao cho bạn ngọn lửa nhiệt huyết, một cơ hội nghề nghiệp hoặc dự án sáng tạo đầy triển vọng.",
    "reversedMeaning": "Năng lượng bị nghẽn tắc, cảm giác chán chường mất phương hướng, hoặc nôn nóng đốt cháy giai đoạn dẫn đến thất bại.",
    "aspects": {
      "career": {
        "upright": "Khởi đầu dự án mới đầy hứa hẹn, nắm bắt cơ hội kinh doanh độc đáo, năng lượng làm việc bùng nổ.",
        "reversed": "Kế hoạch khởi nghiệp gặp trở ngại ngay từ bước đầu, thiếu vốn hoặc thiếu sự kiên định để theo đuổi."
      },
      "love": {
        "upright": "Tiếng sét ái tình, tình cảm nồng nàn rực cháy, sức hút giới tính mãnh liệt giữa hai người.",
        "reversed": "Ngọn lửa đam mê chóng tàn, cả thèm chóng chán, thiếu sự gắn kết cảm xúc sâu sắc."
      },
      "healthSpirit": {
        "upright": "Sinh lực tràn trề, năng lượng dồi dào, bắt đầu chế độ luyện tập thể chất mới rất hứng khởi.",
        "reversed": "Hỏa vượng sinh nhiệt, nóng trong người, mụn nhọt hoặc kiệt sức vì hoạt động quá độ."
      },
      "dharmaAdvice": {
        "upright": "Thắp sáng ngọn lửa trí tuệ và tinh thần dấn thân vì lý tưởng cao đẹp phụng sự cuộc đời.",
        "reversed": "Quán chiếu tâm nóng nảy sân si; đừng để ngọn lửa tham vọng thiêu đốt sự bình an nội tại."
      }
    }
  },
  {
    "id": "wands_two",
    "number": 2,
    "roman": "2",
    "nameEn": "Two of Wands",
    "nameVi": "Hai Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Hỏa tinh tại Bạch Dương",
    "icon": "🪄",
    "visualSymbol": "Nhà quý tộc trên bờ tường thành ngắm nhìn biển cả, tay cầm quả địa cầu nhỏ và quyền trượng",
    "uprightKeywords": [
      "Tầm nhìn chiến lược",
      "Hoạch định tương lai",
      "Khát vọng vươn xa",
      "Lựa chọn phương hướng"
    ],
    "reversedKeywords": [
      "Sợ bước ra khỏi vùng an toàn",
      "Thiếu kế hoạch",
      "Do dự chần chừ",
      "Bất an tương lai"
    ],
    "uprightMeaning": "Two of Wands thúc giục bạn đứng trên cao phóng tầm mắt ra biển lớn. Bạn đã có nền tảng vững chắc, giờ là lúc vạch kế hoạch chinh phục những chân trời mới.",
    "reversedMeaning": "Sự giam cầm trong vùng an toàn quen thuộc, sợ hãi những biến số chưa biết trước ngoài biển khơi.",
    "aspects": {
      "career": {
        "upright": "Lập kế hoạch mở rộng thị trường, đàm phán hợp tác quốc tế, hoạch định đường hướng phát triển 5 năm tới.",
        "reversed": "Kế hoạch mở rộng gặp trục trặc, bất đồng quan điểm giữa các cổ đông sáng lập."
      },
      "love": {
        "upright": "Cùng người yêu bàn tính kế hoạch tương lai dài hạn, tình cảm chín chắn và thấu hiểu tầm nhìn của nhau.",
        "reversed": "Khoảng cách địa lý gây trở ngại, hoặc hai người có định hướng tương lai hoàn toàn trái ngược nhau."
      },
      "healthSpirit": {
        "upright": "Thể trạng ổn định, tinh thần minh mẫn, sẵn sàng cho những chuyến du lịch xa tái tạo năng lượng.",
        "reversed": "Căng thẳng do lo nghĩ quá nhiều về tương lai xa xôi, mất ngủ vì những dự tính chưa thành hình."
      },
      "dharmaAdvice": {
        "upright": "Định hướng tâm thức về phía giác ngộ. Có tầm nhìn xa trông rộng nhưng luôn bước đi vững chắc trong chánh niệm.",
        "reversed": "Học cách chấp nhận sự bất định của cuộc đời; đừng để sự cầu toàn kìm hãm bước chân tiến bước."
      }
    }
  },
  {
    "id": "wands_three",
    "number": 3,
    "roman": "3",
    "nameEn": "Three of Wands",
    "nameVi": "Ba Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Mặt Trời tại Bạch Dương",
    "icon": "🪄",
    "visualSymbol": "Thương nhân đứng trên đỉnh đồi nhìn những đoàn thuyền buồm chở đầy ắp hàng hóa thuận buồm xuôi gió",
    "uprightKeywords": [
      "Mở rộng cơ hội",
      "Tầm nhìn thành tựu",
      "Thuận buồm xuôi gió",
      "Hợp tác viễn xứ"
    ],
    "reversedKeywords": [
      "Chuyến tàu chậm trễ",
      "Thất vọng kết quả",
      "Kế hoạch đổ bể",
      "Trở ngại địa lý"
    ],
    "uprightMeaning": "Three of Wands báo hiệu những con thuyền bạn gửi đi đã bắt đầu mang về những chuyến hàng thắng lợi đầu tiên. Tầm nhìn của bạn đang được đền đáp xứng đáng.",
    "reversedMeaning": "Sự chậm trễ ngoài dự kiến, đối tác nước ngoài bội ước, hoặc kết quả đạt được không như kỳ vọng ban đầu.",
    "aspects": {
      "career": {
        "upright": "Kinh doanh quốc tế phát đạt, dự án mở rộng gặt hái thành quả tích cực, được thăng tiến vị trí quản lý.",
        "reversed": "Hàng hóa bị giữ lại cảng, xuất nhập khẩu gặp khó khăn về pháp lý, dự án đầu tư chậm thu hồi vốn."
      },
      "love": {
        "upright": "Tình cảm phát triển thuận lợi, cùng nhau du lịch khám phá thế giới, tình yêu vượt qua rào cản khoảng cách.",
        "reversed": "Mối quan hệ yêu xa gặp nhiều thử thách hoài nghi, thiếu sự gắn kết thể xác và tinh thần."
      },
      "healthSpirit": {
        "upright": "Sức khỏe dồi dào, cơ thể thích nghi tuyệt vời với các môi trường khí hậu mới.",
        "reversed": "Mệt mỏi do lệch múi giờ (jet lag), dị ứng thời tiết khi di chuyển xa, cần nghỉ ngơi hồi phục."
      },
      "dharmaAdvice": {
        "upright": "Tâm rộng mở như biển khơi; gieo hạt giống thiện lành trên mọi mảnh đất bạn đặt chân đến.",
        "reversed": "Kiên nhẫn chờ đợi hạt giống nảy mầm; không nóng vội gặt hái khi quả chưa chín muồi."
      }
    }
  },
  {
    "id": "wands_four",
    "number": 4,
    "roman": "4",
    "nameEn": "Four of Wands",
    "nameVi": "Bốn Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Kim Tinh tại Bạch Dương",
    "icon": "🪄",
    "visualSymbol": "Bốn cây gậy cắm hoa trái sum suê tạo thành vòm cổng ăn mừng rực rỡ, hai cô gái nâng cành hoa chào đón",
    "uprightKeywords": [
      "Ăn mừng thắng lợi",
      "Mái ấm bình yên",
      "Hôn lễ hân hoan",
      "Thành tựu ban đầu",
      "Hòa hợp gia đình"
    ],
    "reversedKeywords": [
      "Căng thẳng gia đạo",
      "Lễ kỷ niệm bị hoãn",
      "Cảm giác lạc lõng tại nhà",
      "Bất hòa nội bộ"
    ],
    "uprightMeaning": "Four of Wands là khúc ca hoan hỷ của sự sum vầy, tân gia, hôn lễ hoặc ăn mừng cột mốc thành công vững chắc đầu tiên bên gia đình và bạn bè thân thiết.",
    "reversedMeaning": "Mâu thuẫn ngầm trong gia đình, tiệc tùng ăn mừng bị hoãn, hoặc cảm giác không thực sự thoải mái ngay trong chính ngôi nhà của mình.",
    "aspects": {
      "career": {
        "upright": "Dự án hoàn thành đúng hạn mang lại lợi nhuận cao, tiệc liên hoan công ty đoàn kết, môi trường làm việc lý tưởng.",
        "reversed": "Tranh cãi phân chia thưởng cuối năm, không khí làm việc gượng gạo thiếu chân thành."
      },
      "love": {
        "upright": "Đám cưới hạnh phúc, chuyển về sống chung trong ngôi nhà mới, tình yêu được gia đình hai bên ủng hộ tuyệt đối.",
        "reversed": "Gia đình ngăn cản chuyện cưới xin, căng thẳng trước ngày trọng đại vì bất đồng quan điểm chuẩn bị."
      },
      "healthSpirit": {
        "upright": "Thể trạng tuyệt vời, tinh thần thư thái ngập tràn niềm vui, môi trường sống trong lành giúp dưỡng sinh tốt.",
        "reversed": "Tác hại của việc tiệc tùng quá chén, ăn uống thừa chất béo cần điều chỉnh chế độ thanh lọc."
      },
      "dharmaAdvice": {
        "upright": "Biết ơn và tri ân mái ấm hiện tại; biến ngôi nhà thành đạo tràng thanh tịnh ngập tràn tiếng cười hòa ái.",
        "reversed": "Hòa giải những bất hòa gia đạo bằng hạnh lắng nghe ái ngữ; tha thứ cho người thân để lòng an yên."
      }
    }
  },
  {
    "id": "wands_five",
    "number": 5,
    "roman": "5",
    "nameEn": "Five of Wands",
    "nameVi": "Năm Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Thổ Tinh tại Sư Tử",
    "icon": "🪄",
    "visualSymbol": "Năm chàng trai dùng gậy giao đấu tranh đua hỗn loạn trong một cuộc thử sức căng thẳng",
    "uprightKeywords": [
      "Cạnh tranh khốc liệt",
      "Xung đột ý kiến",
      "Tranh đấu thử thách",
      "Hỗn loạn",
      "Bất đồng tập thể"
    ],
    "reversedKeywords": [
      "Tìm được tiếng nói chung",
      "Tránh né xung đột",
      "Thỏa hiệp hòa bình",
      "Mệt mỏi vì tranh đấu"
    ],
    "uprightMeaning": "Five of Wands phản ánh cuộc chiến tranh giành quyền lợi hoặc ý kiến đối lập trong tập thể. Đây là thử thách giúp bạn rèn luyện bản lĩnh và khẳng định năng lực cá nhân.",
    "reversedMeaning": "Sự hòa giải sau cuộc tranh cãi gay gắt, hoặc tâm lý kiệt sức muốn buông xuôi nhượng bộ để tìm kiếm sự yên ổn.",
    "aspects": {
      "career": {
        "upright": "Thương trường cạnh tranh gay gắt, các cuộc họp tranh luận nảy lửa; cần giữ cái đầu lạnh để vượt lên dẫn đầu.",
        "reversed": "Xung đột nội bộ tạm thời lắng xuống, tìm ra giải pháp trung gian hòa giải giữa các phòng ban."
      },
      "love": {
        "upright": "Thường xuyên cãi vã vì những chuyện vặt vãnh, cái tôi của cả hai quá lớn không ai chịu nhường ai.",
        "reversed": "Chủ động làm hòa, giải tỏa bất đồng, nhận ra tranh cãi chỉ làm tổn thương tình cảm thiêng liêng."
      },
      "healthSpirit": {
        "upright": "Cần giải phóng năng lượng dư thừa qua các môn thể thao đối kháng, boxing hoặc tập gym cường độ cao.",
        "reversed": "Vết bầm tím chấn thương thể thao, kiệt sức thần kinh vì thường xuyên sống trong môi trường căng thẳng."
      },
      "dharmaAdvice": {
        "upright": "Nhìn nhận xung đột như tấm gương soi chiếu bản ngã; dùng trí tuệ chuyển hóa đối kháng thành trợ duyên.",
        "reversed": "Buông bỏ thói háo thắng; nhường một bước trời cao biển rộng, lùi một bước vạn sự bình yên."
      }
    }
  },
  {
    "id": "wands_six",
    "number": 6,
    "roman": "6",
    "nameEn": "Six of Wands",
    "nameVi": "Sáu Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Mộc Tinh tại Sư Tử",
    "icon": "🪄",
    "visualSymbol": "Kỵ sĩ đội vòng nguyệt quế cưỡi ngựa trắng diễu hành khải hoàn giữa đám đông hò reo tung hô",
    "uprightKeywords": [
      "Chiến thắng vang dội",
      "Được tôn vinh",
      "Sự công nhận",
      "Tự hào xứng đáng",
      "Thăng tiến vượt bậc"
    ],
    "reversedKeywords": [
      "Thất bại ê chề",
      "Tiếng tăm hoen ố",
      "Tự mãn ngã ngựa",
      "Bị cướp công trạng"
    ],
    "uprightMeaning": "Six of Wands là bản hùng ca khải hoàn. Mọi nỗ lực gian khổ của bạn đã được đền đáp bằng sự công nhận vang dội từ xã hội và sự thăng hoa rực rỡ của uy tín cá nhân.",
    "reversedMeaning": "Sự sụp đổ danh tiếng, bị người khác cướp mất công lao, hoặc tính tự cao tự đại biến bạn thành kẻ đáng ghét trong mắt mọi người.",
    "aspects": {
      "career": {
        "upright": "Đạt giải thưởng danh giá, được thăng chức công khai trước toàn công ty, uy tín thương hiệu cá nhân lên đỉnh cao.",
        "reversed": "Thất bại trong cuộc đua thăng chức, công sức cống hiến bị cấp trên ngó lơ, uy tín giảm sút."
      },
      "love": {
        "upright": "Tình yêu được mọi người ngưỡng mộ chúc phúc, cả hai cùng nhau tỏa sáng và tự hào về đối phương.",
        "reversed": "Tự cao coi thường người yêu, so sánh đối phương với người khác làm tổn thương lòng tự trọng của họ."
      },
      "healthSpirit": {
        "upright": "Sức khỏe dồi dào, tinh thần phấn chấn tự tin giúp hệ miễn dịch hoạt động ở trạng thái tối ưu.",
        "reversed": "Áp lực phải duy trì hình ảnh hoàn hảo gây kiệt sức, suy nhược thần kinh vì quá lo lắng dư luận."
      },
      "dharmaAdvice": {
        "upright": "Giữ tâm khiêm cung trước vinh quang; nhớ rằng mọi thành tựu đều do muôn duyên hòa hợp mà thành.",
        "reversed": "Hạ thấp bản ngã kiêu mạn; 'Khen chê như gió thoảng qua tai', giữ tâm bình thản trước thế thái nhân tình."
      }
    }
  },
  {
    "id": "wands_seven",
    "number": 7,
    "roman": "7",
    "nameEn": "Seven of Wands",
    "nameVi": "Bảy Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Hỏa Tinh tại Sư Tử",
    "icon": "🪄",
    "visualSymbol": "Người chiến binh đơn thương độc mã đứng trên đỉnh đồi cao vung gậy đẩy lùi 6 cây gậy tấn công từ dưới",
    "uprightKeywords": [
      "Bảo vệ lập trường",
      "Kiên định không lùi bước",
      "Chống lại số đông",
      "Bản lĩnh kiên cường"
    ],
    "reversedKeywords": [
      "Bị áp đảo quá tải",
      "Buông xuôi bỏ cuộc",
      "Kiệt sức trước áp lực",
      "Cố chấp vô ích"
    ],
    "uprightMeaning": "Seven of Wands biểu trưng cho dũng khí bảo vệ niềm tin và thành quả của mình trước sự công kích của số đông. Dù đơn độc trên đỉnh đồi, bạn vẫn có lợi thế địa hình để chiến thắng.",
    "reversedMeaning": "Bạn đang bị áp lực từ muôn phía bủa vây làm cho kiệt sức, cảm giác bất lực không thể chống cự nổi và muốn đầu hàng.",
    "aspects": {
      "career": {
        "upright": "Bảo vệ thành công ý tưởng dự án trước hội đồng phản biện gay gắt, giữ vững thị phần trước các đối thủ cạnh tranh.",
        "reversed": "Bị cô lập tại nơi làm việc, không chịu nổi áp lực chỉ trích từ dư luận, buộc phải nhượng bộ thỏa hiệp."
      },
      "love": {
        "upright": "Dũng cảm bảo vệ tình yêu trước sự phản đối kịch liệt của gia đình và bạn bè, kiên định với lựa chọn của con tim.",
        "reversed": "Mệt mỏi vì liên tục phải giải thích và tranh cãi, tình yêu đứng trước bờ vực tan vỡ vì thiếu sự kiên định."
      },
      "healthSpirit": {
        "upright": "Sức đề kháng mạnh mẽ chống lại dịch bệnh xâm nhập, thể lực dẻo dai giúp bạn vượt qua giai đoạn làm việc căng thẳng.",
        "reversed": "Suy sụp miễn dịch do căng thẳng kéo dài, đau nhức cơ bắp toàn thân vì luôn trong trạng thái phòng thủ đề phòng."
      },
      "dharmaAdvice": {
        "upright": "Giữ vững chánh kiến (Samma Ditthi) giữa thời mạt pháp nhiễu nhương; kiên định với con đường thiện lương.",
        "reversed": "Học cách buông bỏ những cuộc chiến không cần thiết; tiết kiệm năng lượng tâm thức cho những điều thực sự giá trị."
      }
    }
  },
  {
    "id": "wands_eight",
    "number": 8,
    "roman": "8",
    "nameEn": "Eight of Wands",
    "nameVi": "Tám Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Thủy Tinh tại Nhân Mã",
    "icon": "🪄",
    "visualSymbol": "Tám cây gậy bay vút qua bầu trời quang đãng với tốc độ xé gió hướng về phía mặt đất phì nhiêu",
    "uprightKeywords": [
      "Tốc độ nhanh chóng",
      "Thông tin bất ngờ",
      "Hành động dứt khoát",
      "Du lịch hàng không",
      "Tiến triển thần tốc"
    ],
    "reversedKeywords": [
      "Chậm trễ đình trệ",
      "Thông tin sai lệch",
      "Hấp tấp hỏng việc",
      "Hỗn loạn mất kiểm soát"
    ],
    "uprightMeaning": "Eight of Wands là mũi tên thời gian đã rời dây cung. Mọi việc sẽ diễn ra với tốc độ cực nhanh; tin tức quan trọng sắp ập đến và các nút thắt sẽ được tháo gỡ chớp nhoáng.",
    "reversedMeaning": "Sự trì hoãn bực bội do chuyến bay bị hủy, tin tức bị gián đoạn hoặc hành động vội vã thiếu suy nghĩ gây hậu quả khó lường.",
    "aspects": {
      "career": {
        "upright": "Hợp đồng được chốt trong chớp mắt, email phản hồi tích cực bất ngờ, chuyến công tác gấp mang lại thành công vang dội.",
        "reversed": "Dự án bị hoãn vô thời hạn, mạng lưới thông tin liên lạc bị cắt đứt, quyết định vội vàng gây tổn thất tài chính."
      },
      "love": {
        "upright": "Tình yêu phát triển nhanh như vũ bão, tỏ tình thành công, những cuộc hẹn hò liên tiếp đầy phấn khích và nồng nhiệt.",
        "reversed": "Hiểu lầm tai hại qua tin nhắn, nôn nóng ép đối phương cam kết khiến họ sợ hãi muốn lùi lại."
      },
      "healthSpirit": {
        "upright": "Quá trình hồi phục bệnh diễn ra cực kỳ nhanh chóng, năng lượng cơ thể lưu thông thông suốt không còn ứ trệ.",
        "reversed": "Tăng nhịp tim, hồi hộp lo âu, nguy cơ chấn thương do vội vàng hấp tấp khi đi lại."
      },
      "dharmaAdvice": {
        "upright": "Nắm bắt sát na hiện tại với tâm tỉnh giác; hành động thiện lành kịp thời không chút chần chừ do dự.",
        "reversed": "Lắng dịu tâm trí đang chạy cuồng loạn; chậm lại một nhịp để nhìn rõ chân tướng sự việc."
      }
    }
  },
  {
    "id": "wands_nine",
    "number": 9,
    "roman": "9",
    "nameEn": "Nine of Wands",
    "nameVi": "Chín Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Mặt Trăng tại Nhân Mã",
    "icon": "🪄",
    "visualSymbol": "Chiến binh đầu quấn băng trắng tựa vào cây gậy cảnh giác, sau lưng là hàng rào 8 cây gậy kiên cố",
    "uprightKeywords": [
      "Kiên trì chặng cuối",
      "Phòng thủ cảnh giác",
      "Bền bỉ chịu đựng",
      "Thử thách cuối cùng",
      "Vết thương danh dự"
    ],
    "reversedKeywords": [
      "Kiệt sức gục ngã",
      "Hoang tưởng phòng thủ quá mức",
      "Cố chấp bướng bỉnh",
      "Từ chối đầu hàng"
    ],
    "uprightMeaning": "Nine of Wands là lời khẳng định bạn đã vượt qua muôn trùng bão táp và chỉ còn một thử thách cuối cùng trước vạch đích. Đừng bỏ cuộc lúc này, sức bền bỉ sẽ đem lại chiến thắng.",
    "reversedMeaning": "Sự hoang tưởng sợ hãi kẻ thù tưởng tượng, kiệt quệ hoàn toàn cả về thể xác lẫn tinh thần vì luôn gồng mình căng thẳng.",
    "aspects": {
      "career": {
        "upright": "Giai đoạn nước rút căng thẳng của dự án, giữ vững phòng tuyến trước áp lực thanh kiểm tra, sắp chạm tay vào đích đến.",
        "reversed": "Kiệt sức bỏ cuộc ngay trước ngưỡng cửa thành công, từ chối nhận sự giúp đỡ từ người khác."
      },
      "love": {
        "upright": "Bảo vệ mối quan hệ sau nhiều lần bị tổn thương quá khứ; cần mở lòng từng chút một để đối phương bước vào.",
        "reversed": "Dựng bức tường thành quá dày khiến đối phương nản lòng bỏ cuộc, nghi ngờ vô căn cứ giết chết tình yêu."
      },
      "healthSpirit": {
        "upright": "Khả năng chịu đựng đau đớn và nghịch cảnh tuyệt vời, vết thương thể xác đang trong giai đoạn kéo da non lành lặn.",
        "reversed": "Hội chứng kiệt sức mãn tính (Burnout), suy nhược hệ thần kinh trung ương do mất ngủ căng thẳng kéo dài."
      },
      "dharmaAdvice": {
        "upright": "Tu tập hạnh Tinh Tấn Ba La Mật (Viriya). Bước những bước chân vững chãi cuối cùng qua sa mạc khảo nghiệm.",
        "reversed": "Hạ vũ khí phòng thủ xuống; nhận ra không có kẻ thù nào bên ngoài nguy hiểm bằng tâm sợ hãi bên trong."
      }
    }
  },
  {
    "id": "wands_ten",
    "number": 10,
    "roman": "10",
    "nameEn": "Ten of Wands",
    "nameVi": "Mười Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Thổ Tinh tại Nhân Mã",
    "icon": "🪄",
    "visualSymbol": "Người đàn ông oằn mình ôm bó 10 cây gậy nặng trĩu bước đi chậm chạp về phía ngôi làng phía xa",
    "uprightKeywords": [
      "Gánh nặng quá tải",
      "Trách nhiệm đè nặng",
      "Lao lực kiệt sức",
      "Sắp hoàn thành nghĩa vụ"
    ],
    "reversedKeywords": [
      "Buông bớt gánh nặng",
      "Ủy thác công việc",
      "Sụp đổ dưới áp lực",
      "Gánh vác chuyện bao đồng"
    ],
    "uprightMeaning": "Ten of Wands cho thấy bạn đang ôm đồm quá nhiều việc và gánh nặng trách nhiệm đang đè cong lưng bạn. Đã đến lúc học cách buông bỏ bớt và ủy thác cho người khác.",
    "reversedMeaning": "Bạn dũng cảm vứt bớt những gánh nặng không thuộc về mình, hoặc cảnh báo sự sụp đổ thể lực hoàn toàn nếu cứ tiếp tục cố đấm ăn xôi.",
    "aspects": {
      "career": {
        "upright": "Ôm đồm công việc từ A đến Z dẫn đến quá tải nghiêm trọng; cần phân quyền và thuê thêm nhân sự hỗ trợ.",
        "reversed": "Biết từ chối những đòi hỏi vô lý của cấp trên, tái cơ cấu lại công việc giúp giải phóng áp lực nặng nề."
      },
      "love": {
        "upright": "Cảm thấy mối quan hệ trở thành gánh nặng mệt mỏi, một mình gánh vác trách nhiệm tài chính và chăm sóc gia đình.",
        "reversed": "Thẳng thắn chia sẻ gánh nặng việc nhà và tài chính với bạn đời, tìm lại sự nhẹ nhõm và gắn kết yêu thương."
      },
      "healthSpirit": {
        "upright": "Cần đi mát-xa trị liệu đau mỏi vai gáy, nắn chỉnh cột sống lưng do gánh nặng và ngồi sai tư thế lâu ngày.",
        "reversed": "Thoát vị đĩa đệm, tổn thương đốt sống cổ nghiêm trọng cần can thiệp y tế ngay lập tức."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu tâm chấp thủ và thói quen ôm đồm; nhận ra phần lớn gánh nặng do chính bản ngã tự vác lên vai.",
        "reversed": "Đặt gánh nặng xuống để lòng nhẹ tênh như mây trời; giải thoát khỏi những âu lo phiền não thế tục."
      }
    }
  },
  {
    "id": "wands_page",
    "number": 11,
    "roman": "Page",
    "nameEn": "Page of Wands",
    "nameVi": "Tiểu Đồng Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Nguyên tố Hỏa của Đất (Sứ giả nhiệt huyết)",
    "icon": "🪄",
    "visualSymbol": "Chàng thiếu niên đứng giữa sa mạc ngắm nhìn quyền trượng đang đâm chồi xanh với ánh mắt háo hức",
    "uprightKeywords": [
      "Tin tức hứng khởi",
      "Học hỏi đam mê",
      "Ý tưởng non trẻ",
      "Nhà thám hiểm trẻ",
      "Nhiệt tình thuần khiết"
    ],
    "reversedKeywords": [
      "Tin xấu thất vọng",
      "Bốc đồng nông nổi",
      "Cả thèm chóng chán",
      "Lười biếng thiếu kỷ luật"
    ],
    "uprightMeaning": "Page of Wands mang đến làn gió mới mẻ của sự tò mò và nhiệt huyết. Bạn sắp nhận được tin tức truyền cảm hứng hoặc bắt đầu một khóa học, sở thích mới đầy thú vị.",
    "reversedMeaning": "Tin tức bị hoãn hoặc không như mong đợi, sự nhiệt tình ban đầu vụt tắt nhanh chóng do thiếu kiên nhẫn rèn luyện.",
    "aspects": {
      "career": {
        "upright": "Khởi đầu công việc thực tập đầy triển vọng, được giao phụ trách mảng sáng tạo nội dung, tiếp thu kiến thức mới cực nhanh.",
        "reversed": "Mắc sai sót do thiếu kinh nghiệm và tính cẩu thả, không hoàn thành cam kết với cấp trên."
      },
      "love": {
        "upright": "Tình cảm mới chớm ngây thơ đáng yêu, những tin nhắn tán tỉnh ngọt ngào đầy phấn khích và bất ngờ.",
        "reversed": "Đối phương trẻ con, thất hứa, chỉ giỏi nói những lời có cánh nhưng không có hành động cụ thể."
      },
      "healthSpirit": {
        "upright": "Trẻ trung năng động, thích tham gia các câu lạc bộ thể thao ngoài trời và du lịch phượt trải nghiệm.",
        "reversed": "Chấn thương nhẹ do nghịch ngợm bất cẩn, bong gân hoặc trầy xước trong các hoạt động thể thao."
      },
      "dharmaAdvice": {
        "upright": "Nuôi dưỡng tâm hiếu học và lòng nhiệt thành hướng thiện; mở lòng đón nhận những bài học sơ khởi của cuộc đời.",
        "reversed": "Rèn luyện tính kiên nhẫn; ngọn lửa muốn duy trì lâu dài cần có củi khô chứ không thể chỉ cháy bùng bằng rơm rạ."
      }
    }
  },
  {
    "id": "wands_knight",
    "number": 12,
    "roman": "Knight",
    "nameEn": "Knight of Wands",
    "nameVi": "Hiệp Sĩ Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Nguyên tố Hỏa của Khí (Chiến binh xông pha)",
    "icon": "🪄",
    "visualSymbol": "Hiệp sĩ giáp vàng cưỡi ngựa lửa chồm lên phi nước đại, áo choàng họa tiết kỳ giông rực cháy",
    "uprightKeywords": [
      "Hành động thần tốc",
      "Dũng mãnh xông pha",
      "Năng lượng bùng nổ",
      "Quyết đoán phiêu lưu",
      "Bất chấp gian khó"
    ],
    "reversedKeywords": [
      "Hấp tấp liều lĩnh",
      "Nóng nảy hung hăng",
      "Bỏ dở giữa chừng",
      "Gây gổ tai vạ"
    ],
    "uprightMeaning": "Knight of Wands là hiện thân của ngọn lửa bùng cháy xông pha trận mạc. Khi mục tiêu đã định, bạn lao về phía trước với sự dũng cảm và tốc độ không gì ngăn cản nổi.",
    "reversedMeaning": "Sự nóng vội thiếu suy nghĩ dẫn đến tai nạn, thói hung hăng hiếu chiến gây họa, hoặc nhiệt huyết bùng lên rồi nhanh chóng lụi tàn.",
    "aspects": {
      "career": {
        "upright": "Xông pha mở rộng thị trường mới, chốt các thương vụ lớn trong chớp mắt, năng lượng truyền cảm hứng cho toàn đội ngũ.",
        "reversed": "Gặp rủi ro lớn vì quyết định cảm tính thiếu phân tích rủi ro, gây thù chuốc oán với đối tác vì thái độ hống hách."
      },
      "love": {
        "upright": "Chàng trai quyến rũ cuốn bạn vào cơn lốc tình ái cuồng nhiệt, tình yêu nồng cháy không thể cưỡng lại.",
        "reversed": "Kẻ săn tình chỉ thích chinh phục rồi nhanh chóng biến mất, sợ hãi cam kết hôn nhân lâu dài."
      },
      "healthSpirit": {
        "upright": "Thể lực sung mãn tuyệt đỉnh, tim mạch khỏe mạnh, tràn đầy năng lượng hoạt động không biết mệt mỏi.",
        "reversed": "Tăng huyết áp đột ngột, nguy cơ tai nạn giao thông do phóng nhanh vượt ẩu, kiệt sức vì làm việc thâu đêm."
      },
      "dharmaAdvice": {
        "upright": "Dùng năng lượng dũng mãnh để phụng sự chánh pháp; làm chiến sĩ tiên phong bảo vệ điều thiện lành.",
        "reversed": "Thu thúc lục căn; kiềm chế con ngựa bất kham của tâm thức để tránh rơi xuống vực thẳm mê lầm."
      }
    }
  },
  {
    "id": "wands_queen",
    "number": 13,
    "roman": "Queen",
    "nameEn": "Queen of Wands",
    "nameVi": "Hoàng Hậu Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Nguyên tố Hỏa của Nước (Bậc thầy ấm áp)",
    "icon": "🪄",
    "visualSymbol": "Hoàng hậu ngự trên ngai chạm sư tử, tay cầm hoa hướng dương và quyền trượng, mèo đen ngồi dưới chân",
    "uprightKeywords": [
      "Tự tin quyến rũ",
      "Ấm áp hào phóng",
      "Độc lập kiên định",
      "Sức hút rạng ngời",
      "Khả năng truyền cảm hứng"
    ],
    "reversedKeywords": [
      "Ghen tuông đố kỵ",
      "Ích kỷ thao túng",
      "Hách dịch tự phụ",
      "Tự ti mất bình tĩnh"
    ],
    "uprightMeaning": "Queen of Wands tỏa ra nguồn năng lượng ấm áp tự tin như mặt trời. Bạn làm chủ cuộc sống, truyền cảm hứng và thu hút mọi người bằng vẻ đẹp tâm hồn và sự hào phóng vô bờ.",
    "reversedMeaning": "Sự đố kỵ ghen ghét với thành công của người khác, đóng vai 'nữ hoàng bi kịch' (drama queen) hoặc trở nên cay độc vì thiếu tự tin.",
    "aspects": {
      "career": {
        "upright": "Trở thành nữ lãnh đạo quyền lực được cấp dưới kính yêu, quản lý xuất sắc các dự án sáng tạo và truyền thông.",
        "reversed": "Xung đột quyền lực với đồng nghiệp nữ, bị chỉ trích vì thái độ độc đoán và thiếu lắng nghe cấp dưới."
      },
      "love": {
        "upright": "Người phụ nữ quyến rũ độc lập làm chủ trái tim đối phương, tình yêu nồng hậu ấm áp và tràn ngập niềm vui.",
        "reversed": "Ghen tuông lồng lộn vô cớ, nghi ngờ đối phương kiểm soát từng động thái của người yêu."
      },
      "healthSpirit": {
        "upright": "Sức sống rạng ngời, làn da hồng hào khỏe khoắn, năng lượng tích cực giúp đẩy lùi mọi mầm bệnh tật.",
        "reversed": "Rối loạn nội tiết, nóng trong gây nổi mụn, căng thẳng tinh thần do ôm đồm việc quản lý xã hội."
      },
      "dharmaAdvice": {
        "upright": "Hóa thân thành ngọn lửa sưởi ấm những mảnh đời lạnh giá; dùng đức khiêm nhu và lòng từ bi soi sáng nhân gian.",
        "reversed": "Nhận diện tâm ganh tị đố kỵ; thực hành hạnh tùy hỷ công đức để tâm hồn được thanh thản nhẹ nhàng."
      }
    }
  },
  {
    "id": "wands_king",
    "number": 14,
    "roman": "King",
    "nameEn": "King of Wands",
    "nameVi": "Vua Gậy",
    "arcana": "Minor",
    "suit": "Wands",
    "element": "Lửa",
    "astrology": "Nguyên tố Hỏa của Hỏa (Vua lãnh đạo tối cao)",
    "icon": "🪄",
    "visualSymbol": "Đức vua ngồi ngai chạm sư tử và kỳ giông cắn đuôi, tay cầm quyền trượng nở hoa, áo choàng rực lửa",
    "uprightKeywords": [
      "Nhà lãnh đạo tầm nhìn",
      "Ý chí vĩ đại",
      "Thành tựu đỉnh cao",
      "Uy tín tuyệt đối",
      "Bản lĩnh kiệt xuất"
    ],
    "reversedKeywords": [
      "Độc đoán bạo chúa",
      "Kỳ vọng bất khả thi",
      "Kiêu ngạo mù quáng",
      "Bất lực mất uy"
    ],
    "uprightMeaning": "King of Wands là bậc thầy làm chủ ngọn lửa ý chí. Bạn không chỉ có tầm nhìn vĩ đại mà còn có bản lĩnh hiện thực hóa nó, dẫn dắt cả một đế chế vươn tới thành công huy hoàng.",
    "reversedMeaning": "Sự độc tài gia trưởng áp đặt ý chí lên người khác, đặt ra những tiêu chuẩn trên trời khiến cấp dưới kiệt quệ, hoặc sự thất bại thảm hại vì quá ngạo mạn.",
    "aspects": {
      "career": {
        "upright": "Doanh nhân thành đạt, CEO bản lĩnh đưa công ty vượt qua khủng hoảng, đầu tư chiến lược mang lại lợi nhuận khổng lồ.",
        "reversed": "Doanh nghiệp đứng trước nguy cơ phá sản vì quyết định đầu tư độc đoán của người đứng đầu."
      },
      "love": {
        "upright": "Người bạn đời chín chắn mạnh mẽ, chỗ dựa vững như bàn thạch cho cả gia đình, yêu thương nồng nàn và chung thủy.",
        "reversed": "Người chồng gia trưởng độc đoán, luôn xem thường ý kiến của vợ con, không khí gia đình ngột ngạt căng thẳng."
      },
      "healthSpirit": {
        "upright": "Thể lực cường tráng, sinh lực bền bỉ ở độ tuổi chín muồi, duy trì phong độ đỉnh cao nhờ lối sống kỷ luật.",
        "reversed": "Các bệnh lý tim mạch do áp lực gánh vác doanh nghiệp lớn, cần đề phòng đột quỵ do làm việc quá sức."
      },
      "dharmaAdvice": {
        "upright": "Dùng uy đức và năng lực lãnh đạo để kiến tạo phước lành cho xã hội; làm bóng cây râm mát chở che muôn loài.",
        "reversed": "Chuyển hóa uy quyền thành đức độ; người lãnh đạo vĩ đại nhất là người biết cúi mình phụng sự tha nhân."
      }
    }
  },
  {
    "id": "cups_ace",
    "number": 1,
    "roman": "Ace",
    "nameEn": "Ace of Cups",
    "nameVi": "Át Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Nguyên tố Thủy sơ khai",
    "icon": "🏆",
    "visualSymbol": "Bàn tay thần nâng chiếc chén thánh tràn trề 5 dòng nước tuôn trào xuống hồ sen, bồ câu ngậm bánh thánh hạ xuống",
    "uprightKeywords": [
      "Dòng suối tình yêu",
      "Trực giác khai mở",
      "Hạnh phúc dạt dào",
      "Chữa lành tâm hồn",
      "Khởi đầu cảm xúc mới"
    ],
    "reversedKeywords": [
      "Cảm xúc khô hạn",
      "Tổn thương tình cảm",
      "Tình cảm bị từ chối",
      "Bế tắc nội tâm"
    ],
    "uprightMeaning": "Ace of Cups là suối nguồn tình yêu và ân sủng vô tận từ vũ trụ rót vào trái tim bạn. Một tình yêu mới thiêng liêng, sự thức tỉnh tâm linh hoặc sự chữa lành sâu sắc đang đón đợi.",
    "reversedMeaning": "Trái tim bị đóng chặt vì vết thương cũ, cảm giác chai sạn cảm xúc, hoặc tình cảm chân thành trao đi nhưng bị hắt hủi phũ phàng.",
    "aspects": {
      "career": {
        "upright": "Môi trường làm việc nhân văn giàu tình người, tìm thấy niềm đam mê thực sự trong công việc chăm sóc và chữa lành.",
        "reversed": "Cảm giác chán nản vô cảm tại công sở, thiếu sự đồng cảm thấu hiểu giữa các đồng nghiệp."
      },
      "love": {
        "upright": "Tình yêu đích thực gõ cửa, trái tim rung động thổn thức, cơ hội bước vào mối duyên lành tiền định thiêng liêng.",
        "reversed": "Thất vọng trong tình cảm, bị từ chối lời tỏ tình, hoặc bản thân chưa sẵn sàng mở lòng đón nhận tình yêu."
      },
      "healthSpirit": {
        "upright": "Cơ thể thanh lọc độc tố, tinh thần an định thư thái, hệ tuần hoàn và chức năng thận hoạt động cực tốt.",
        "reversed": "Ứ trệ dịch lỏng, phù nề, hoặc trầm cảm do cảm xúc u uất bị dồn nén lâu ngày không được giải tỏa."
      },
      "dharmaAdvice": {
        "upright": "Khai mở nguồn suối từ bi vô lượng trong tâm; yêu thương muôn loài với trái tim thuần khiết không điều kiện.",
        "reversed": "Học cách yêu thương và tha thứ cho chính bản thân mình trước khi mong cầu nhận được tình thương từ người khác."
      }
    }
  },
  {
    "id": "cups_two",
    "number": 2,
    "roman": "2",
    "nameEn": "Two of Cups",
    "nameVi": "Hai Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Kim Tinh tại Cự Giải",
    "icon": "🏆",
    "visualSymbol": "Đôi nam nữ nâng chén chúc tụng nhau dưới đầu thần thú Caduceus có cánh và đầu sư tử bảo hộ",
    "uprightKeywords": [
      "Hòa hợp tri kỷ",
      "Đính ước gắn kết",
      "Tình yêu đôi lứa",
      "Hợp tác ăn ý",
      "Sự tha thứ"
    ],
    "reversedKeywords": [
      "Hiểu lầm rạn nứt",
      "Mất cân bằng tình cảm",
      "Chia tay tạm thời",
      "Hợp đồng bị hủy"
    ],
    "uprightMeaning": "Two of Cups biểu trưng cho sự hòa quyện tuyệt mỹ giữa hai tâm hồn. Tình yêu đôi lứa thăng hoa, hợp tác làm ăn ăn ý dựa trên sự tôn trọng và thấu hiểu lẫn nhau tuyệt đối.",
    "reversedMeaning": "Sự bất đồng hiểu lầm gây rạn nứt, một bên cho đi quá nhiều còn một bên vô tâm, hoặc thỏa thuận làm ăn bị đổ bể phút chót.",
    "aspects": {
      "career": {
        "upright": "Tìm được đối tác kinh doanh lý tưởng bổ trợ hoàn hảo điểm yếu cho nhau, ký kết hợp đồng thuận lợi.",
        "reversed": "Bất đồng ý kiến gay gắt với cộng sự thân thiết, tranh chấp quyền lợi làm tan vỡ liên minh làm ăn."
      },
      "love": {
        "upright": "Hai trái tim cùng chung nhịp đập, lời tỏ tình được đón nhận nồng nhiệt, cam kết gắn bó trọn đời bên nhau.",
        "reversed": "Chiến tranh lạnh, hiểu lầm không chịu giải thích, cái tôi cản trở sự hòa giải khiến đôi lứa xa cách."
      },
      "healthSpirit": {
        "upright": "Sự hòa hợp cảm xúc mang lại thể trạng dẻo dai khỏe mạnh, tinh thần phấn chấn hỗ trợ chữa lành mọi bệnh tật.",
        "reversed": "Stress ảnh hưởng đến dạ dày và tiêu hóa do buồn phiền chuyện tình cảm lứa đôi."
      },
      "dharmaAdvice": {
        "upright": "Nhìn người bạn đồng hành như bậc thiện tri thức; nâng đỡ nhau cùng tiến tu trên con đường đạo đức.",
        "reversed": "Bình đẳng và tôn trọng trong mọi mối quan hệ; hóa giải oán kết bằng tâm bao dung và lời nói hòa nhã."
      }
    }
  },
  {
    "id": "cups_three",
    "number": 3,
    "roman": "3",
    "nameEn": "Three of Cups",
    "nameVi": "Ba Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Thủy Tinh tại Cự Giải",
    "icon": "🏆",
    "visualSymbol": "Ba thiếu nữ nhảy múa nâng cao ba chiếc cúp vàng ăn mừng giữa cánh đồng nho trĩu quả",
    "uprightKeywords": [
      "Hội ngộ sum vầy",
      "Niềm vui bạn bè",
      "Ăn mừng chiến thắng",
      "Hân hoan cộng đồng",
      "Chia sẻ hạnh phúc"
    ],
    "reversedKeywords": [
      "Tin đồn thị phi",
      "Tiệc tùng quá đà",
      "Bị bạn bè cô lập",
      "Mối quan hệ tay ba"
    ],
    "uprightMeaning": "Three of Cups là lời ca mừng rỡ của tình bằng hữu tri kỷ và những bữa tiệc sum vầy chia sẻ thành công. Niềm vui được nhân lên gấp bội khi được san sẻ cùng cộng đồng yêu thương.",
    "reversedMeaning": "Thị phi đâm sau lưng từ nhóm bạn thân, tiệc tùng sa đà làm hại sức khỏe, hoặc sự xuất hiện của kẻ thứ ba xen vào quan hệ.",
    "aspects": {
      "career": {
        "upright": "Ăn mừng hoàn thành dự án xuất sắc cùng đồng nghiệp, mạng lưới quan hệ xã hội mở rộng đem lại nhiều cơ hội mới.",
        "reversed": "Môi trường công sở chia bè kéo phái, tin đồn thất thiệt nơi hành lang làm tổn hại uy tín cá nhân."
      },
      "love": {
        "upright": "Tình yêu ngập tràn tiếng cười và sự ủng hộ hết mình từ nhóm bạn thân, tiệc đính hôn vui vẻ đáng nhớ.",
        "reversed": "Bạn bè can thiệp quá sâu vào chuyện tình cảm riêng tư, hoặc lo sợ người yêu có mối quan hệ mập mờ bên ngoài."
      },
      "healthSpirit": {
        "upright": "Tinh thần sảng khoái yêu đời giúp tăng cường sức đề kháng, sức khỏe cải thiện nhờ lối sống năng động giao tiếp.",
        "reversed": "Ngộ độc rượu bia, gan nhiễm mỡ hoặc tăng men gan do tham gia quá nhiều buổi nhậu nhẹt tiệc tùng."
      },
      "dharmaAdvice": {
        "upright": "Tùy hỷ công đức (Mudita). Vui với niềm vui của tha nhân, chúc phúc cho thành tựu của bạn bè xung quanh.",
        "reversed": "Cẩn trọng khẩu nghiệp nơi chốn đông người; tránh buôn chuyện thị phi phán xét làm tổn hại phước đức."
      }
    }
  },
  {
    "id": "cups_four",
    "number": 4,
    "roman": "4",
    "nameEn": "Four of Cups",
    "nameVi": "Bốn Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Mặt Trăng tại Cự Giải",
    "icon": "🏆",
    "visualSymbol": "Chàng trai khoanh tay ngồi tựa gốc cây thở dài, ngó lơ ba chiếc cúp trước mặt trong khi một bàn tay thần đưa chiếc cúp thứ tư",
    "uprightKeywords": [
      "Thờ ơ chán chường",
      "Bỏ lỡ cơ hội",
      "Chiêm nghiệm nội tâm",
      "Bất mãn thực tại",
      "Thu mình lại"
    ],
    "reversedKeywords": [
      "Bừng tỉnh nắm bắt cơ hội",
      "Thoát khỏi trầm cảm",
      "Đón nhận điều mới",
      "Trở lại cuộc sống"
    ],
    "uprightMeaning": "Four of Cups phản ánh trạng thái chán chường, mất hứng thú với mọi thứ xung quanh. Bạn quá tập trung vào những nỗi thất vọng cũ mà bỏ lỡ món quà quý giá vũ trụ đang đưa ra trước mắt.",
    "reversedMeaning": "Khoảnh khắc thức tỉnh sau chuỗi ngày u uất, bạn nhận ra cơ hội vàng và chủ động vươn tay đón nhận luồng sinh khí mới.",
    "aspects": {
      "career": {
        "upright": "Cảm thấy công việc hiện tại đơn điệu nhàm chán, bỏ qua lời mời hợp tác hấp dẫn vì tâm trạng uể oải.",
        "reversed": "Tìm lại được cảm hứng làm việc, chủ động nhận dự án mới và tạo ra bước chuyển biến tích cực trong sự nghiệp."
      },
      "love": {
        "upright": "Lãnh cảm trong tình yêu, cảm thấy đối phương không còn lãng mạn như xưa, thu mình vào thế giới riêng.",
        "reversed": "Mở cửa trái tim, cho đối phương cơ hội chuộc lỗi, hoặc dứt khoát bước ra khỏi nỗi buồn cũ để đón người mới."
      },
      "healthSpirit": {
        "upright": "Cần thay đổi môi trường sống, đi dạo dưới ánh nắng và hòa mình vào thiên nhiên để đánh thức các giác quan.",
        "reversed": "Trầm cảm nhẹ, mệt mỏi vô cớ do thiếu vận động và thói quen giam mình trong phòng kín quá lâu."
      },
      "dharmaAdvice": {
        "upright": "Thực hành tâm biết ơn (Gratitude). Nhìn nhận và trân trọng muôn vàn phước lành đang hiện hữu trong phút giây hiện tại.",
        "reversed": "Quán chiếu tâm tham ái và bất toại nguyện (Dukkha); nhận ra hạnh phúc chân thật không đến từ việc tìm kiếm cảm giác mới lạ."
      }
    }
  },
  {
    "id": "cups_five",
    "number": 5,
    "roman": "5",
    "nameEn": "Five of Cups",
    "nameVi": "Năm Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Hỏa Tinh tại Bọ Cạp",
    "icon": "🏆",
    "visualSymbol": "Người khoác áo choàng đen cúi đầu đau buồn trước 3 chiếc cúp đổ tràn rượu đỏ, sau lưng vẫn còn 2 chiếc cúp nguyên vẹn",
    "uprightKeywords": [
      "Đau buồn mất mát",
      "Nuối tiếc dĩ vãng",
      "Thất vọng tổn thương",
      "Bỏ quên điều còn lại"
    ],
    "reversedKeywords": [
      "Chấp nhận đau thương",
      "Chữa lành tiến bước",
      "Nhìn thấy hy vọng",
      "Tìm lại bình an"
    ],
    "uprightMeaning": "Five of Cups là nỗi đau tiếc nuối những gì đã đổ vỡ. Dù mất mát là có thật, nhưng nếu chịu quay đầu lại, bạn sẽ thấy hai chiếc cúp nguyên vẹn vẫn đang đợi bạn nâng niu và xây dựng lại.",
    "reversedMeaning": "Giai đoạn nguôi ngoai nỗi đau, chấp nhận quá khứ và dũng cảm quay đầu nhìn về những giá trị tốt đẹp vẫn còn sót lại để bước tiếp.",
    "aspects": {
      "career": {
        "upright": "Thua lỗ trong một thương vụ đầu tư, thất bại trong cuộc phỏng vấn xin việc; cần rút kinh nghiệm để làm lại.",
        "reversed": "Vực dậy sau thất bại tài chính, tìm ra hướng đi mới từ những nguồn lực còn lại và tái thiết công việc."
      },
      "love": {
        "upright": "Đau đớn sau khi chia tay, ôm ấp kỷ niệm cũ trong nước mắt, cảm giác bị người yêu phản bội ruồng rẫy.",
        "reversed": "Lau khô nước mắt, tha thứ cho người cũ và sẵn sàng mở lòng để tình yêu mới bước vào cuộc đời."
      },
      "healthSpirit": {
        "upright": "Cần giải tỏa năng lượng u uất qua khóc lóc hoặc tâm sự với chuyên gia tâm lý, tránh kìm nén đau thương.",
        "reversed": "Suy nhược thể chất do bỏ ăn bỏ uống vì đau buồn, cần chú ý chăm sóc dinh dưỡng và giấc ngủ."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu vô thường và sự tan hợp của vạn duyên. Cái gì đến là duyên, cái gì đi là nợ đã trả xong.",
        "reversed": "Học bài học buông xả từ chiếc cúp đã đổ; không ai có thể làm bạn đau khổ nếu tâm bạn không chấp thủ."
      }
    }
  },
  {
    "id": "cups_six",
    "number": 6,
    "roman": "6",
    "nameEn": "Six of Cups",
    "nameVi": "Sáu Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Mặt Trời tại Bọ Cạp",
    "icon": "🏆",
    "visualSymbol": "Cậu bé trao chiếc cúp cắm đầy hoa trắng cho cô bé trong khuôn viên lâu đài cổ kính thanh bình",
    "uprightKeywords": [
      "Kỷ niệm tuổi thơ",
      "Người cũ quay lại",
      "Hồn nhiên trong sáng",
      "Nỗi nhớ quê hương",
      "Quà tặng chân tình"
    ],
    "reversedKeywords": [
      "Mắc kẹt trong quá khứ",
      "Ấu trĩ chưa trưởng thành",
      "Bỏ lại dĩ vãng",
      "Tiến tới tương lai"
    ],
    "uprightMeaning": "Six of Cups đưa bạn về với miền ký ức ngọt ngào của tuổi thơ. Người bạn thời thơ ấu hoặc người yêu cũ có thể xuất hiện mang lại cảm giác ấm áp và những món quà chân tình vô vụ lợi.",
    "reversedMeaning": "Cố chấp sống mãi trong hoài niệm quá khứ tươi đẹp mà trốn tránh trách nhiệm thực tại của người trưởng thành.",
    "aspects": {
      "career": {
        "upright": "Nhận được sự giúp đỡ từ bạn học cũ hoặc đồng nghiệp xưa, quay trở lại công ty cũ làm việc với vị thế cao hơn.",
        "reversed": "Áp dụng phương pháp làm việc lỗi thời không còn phù hợp với xu thế thị trường hiện đại."
      },
      "love": {
        "upright": "Tình yêu trong sáng như thuở ban đầu, người yêu cũ muốn nối lại duyên xưa với sự chân thành và hối lỗi.",
        "reversed": "Nhận ra người cũ đã thay đổi không còn như trong ký ức, dứt khoát khép lại hoài niệm để sống cho hiện tại."
      },
      "healthSpirit": {
        "upright": "Tâm hồn trẻ lại, sức khỏe cải thiện nhờ những chuyến về thăm quê hương sum họp bên gia đình.",
        "reversed": "Các chứng bệnh di truyền thời thơ ấu có dấu hiệu tái phát nhẹ, cần kiểm tra sức khỏe tổng quát."
      },
      "dharmaAdvice": {
        "upright": "Giữ tâm hồn trong sáng thanh khiết như đứa trẻ; gieo hạt giống từ bi không vướng bận toan tính vụ lợi.",
        "reversed": "Biết ơn quá khứ nhưng không bám víu; 'Quá khứ đã qua, tương lai chưa tới, an trú trong hiện tại'."
      }
    }
  },
  {
    "id": "cups_seven",
    "number": 7,
    "roman": "7",
    "nameEn": "Seven of Cups",
    "nameVi": "Bảy Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Kim Tinh tại Bọ Cạp",
    "icon": "🏆",
    "visualSymbol": "Bóng người đứng trước 7 chiếc cúp trôi nổi trên đám mây chứa rắn, lâu đài, ngọc quý, vương miện, quỷ dữ...",
    "uprightKeywords": [
      "Ảo tưởng mộng mơ",
      "Đứng trước nhiều lựa chọn",
      "Cám dỗ phù hoa",
      "Thiếu thực tế",
      "Lạc lối trong tâm tưởng"
    ],
    "reversedKeywords": [
      "Tỉnh mộng sáng suốt",
      "Lựa chọn dứt khoát",
      "Đối diện thực tế",
      "Hành động cụ thể"
    ],
    "uprightMeaning": "Seven of Cups cảnh báo bạn đang đứng trước quá nhiều ảo tưởng và cám dỗ phù hoa. Giấc mơ dẫu đẹp nhưng nếu không hạ cánh xuống mặt đất thì tất cả chỉ là lâu đài xây trên cát.",
    "reversedMeaning": "Bừng tỉnh sau cơn mê ảo ảnh, nhận diện đâu là giá trị cốt lõi thực tế và đưa ra quyết định dứt khoát không còn do dự.",
    "aspects": {
      "career": {
        "upright": "Quá nhiều ý tưởng kinh doanh viển vông thiếu tính khả thi; cần lập bảng phân tích số liệu tài chính cụ thể.",
        "reversed": "Loại bỏ các phương án mơ hồ, tập trung toàn lực vào một mục tiêu khả thi duy nhất đem lại hiệu quả thực tế."
      },
      "love": {
        "upright": "Mơ mộng hình mẫu người yêu hoàn hảo không có thực trên đời, đứng núi này trông núi nọ khiến tình cảm trôi nổi.",
        "reversed": "Nhìn nhận rõ khuyết điểm của đối phương và chấp nhận yêu con người thật của họ thay vì ảo tưởng lý tưởng hóa."
      },
      "healthSpirit": {
        "upright": "Cẩn thận với các phương pháp làm đẹp hoặc thực phẩm chức năng quảng cáo thổi phồng không rõ nguồn gốc.",
        "reversed": "Tác hại của việc lạm dụng chất kích thích hoặc nghiện thế giới ảo, game online làm suy kiệt tinh thần."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu Bát Nhã Ba La Mật: 'Sắc bất dị không, không bất dị sắc'. Phá tan ảo ảnh của tâm vọng tưởng.",
        "reversed": "Thực hành Chánh Niệm và tỉnh giác; đưa tâm lang thang trở về neo đậu nơi thân trong từng phút giây."
      }
    }
  },
  {
    "id": "cups_eight",
    "number": 8,
    "roman": "8",
    "nameEn": "Eight of Cups",
    "nameVi": "Tám Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Thổ Tinh tại Song Ngư",
    "icon": "🏆",
    "visualSymbol": "Lữ khách chống gậy quay lưng bước đi trong đêm trăng khuyết, bỏ lại sau lưng 8 chiếc cúp xếp ngay ngắn",
    "uprightKeywords": [
      "Dứt áo ra đi",
      "Tìm kiếm ý nghĩa cao hơn",
      "Buông bỏ điều quen thuộc",
      "Hành trình tâm linh",
      "Chuyến đi thầm lặng"
    ],
    "reversedKeywords": [
      "Sợ hãi không dám dứt bỏ",
      "Quay lại chốn cũ",
      "Trốn chạy trách nhiệm",
      "Mắc kẹt bế tắc"
    ],
    "uprightMeaning": "Eight of Cups là bước chân quả cảm của người lữ khách dám buông bỏ những thứ bề ngoài tưởng như đủ đầy nhưng bên trong đã trống rỗng, để dấn thân tìm kiếm chân lý và ý nghĩa đích thực.",
    "reversedMeaning": "Biết rõ nơi đó không còn thuộc về mình nhưng sợ hãi không dám dứt áo ra đi, hoặc trốn chạy thực tại vì hèn nhát.",
    "aspects": {
      "career": {
        "upright": "Dũng cảm từ bỏ vị trí công việc lương cao nhưng vô nghĩa để theo đuổi đam mê và sứ mệnh cuộc đời.",
        "reversed": "Ngại thay đổi công việc vì sợ mất đi chế độ đãi ngộ quen thuộc, chấp nhận sống mòn trong sự chán chường."
      },
      "love": {
        "upright": "Chủ động chấm dứt mối quan hệ dù không có cãi vã, vì nhận ra tâm hồn hai người không còn cùng chung một hướng đi.",
        "reversed": "Dùng dằng nửa muốn đi nửa muốn ở, chia tay rồi lại quay lại trong vòng lặp bế tắc không lối thoát."
      },
      "healthSpirit": {
        "upright": "Chuyến đi bộ hành hương, retreat thiền định giúp thanh lọc tâm trí và tái tạo lại toàn bộ năng lượng sống.",
        "reversed": "Thể lực suy yếu do bỏ bê bản thân, bước chân nặng nề vì mang vác quá nhiều tâm sự u uất trong lòng."
      },
      "dharmaAdvice": {
        "upright": "Hạnh Xuất Gia xả phú cầu bần. Dũng cảm bước ra khỏi ngôi nhà lửa tam giới để đi tìm ánh sáng giác ngộ.",
        "reversed": "Nhìn rõ động cơ của sự ra đi; đừng nhầm lẫn giữa sự buông xả trí tuệ và sự trốn chạy trách nhiệm thế tục."
      }
    }
  },
  {
    "id": "cups_nine",
    "number": 9,
    "roman": "9",
    "nameEn": "Nine of Cups",
    "nameVi": "Chín Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Mộc Tinh tại Song Ngư",
    "icon": "🏆",
    "visualSymbol": "Người đàn ông phương phi mỉm cười mãn nguyện khoanh tay trước ngực, sau lưng là 9 chiếc cúp vàng xếp hình vòng cung",
    "uprightKeywords": [
      "Ước nguyện thành hiện thực",
      "Thỏa mãn viên mãn",
      "Hưởng thụ sung túc",
      "Hạnh phúc cá nhân",
      "Tự tin tự hào"
    ],
    "reversedKeywords": [
      "Ước vọng chưa đạt",
      "Tham lam vô độ",
      "Thỏa mãn nông cạn",
      "Hậu quả của sự nuông chiều"
    ],
    "uprightMeaning": "Nine of Cups được mệnh danh là 'Lá bài Ước Nguyện' (Wish Card). Mọi mong ước sâu kín của bạn sắp thành hiện thực trọn vẹn, mang lại sự thỏa mãn, an khang và niềm vui tràn đầy.",
    "reversedMeaning": "Ước nguyện bị trì hoãn hoặc khi đạt được rồi lại cảm thấy trống rỗng, cảnh báo thói nuông chiều bản thân thái quá làm hao tổn phúc đức.",
    "aspects": {
      "career": {
        "upright": "Đạt được mức lương và vị trí hằng mơ ước, dự án kinh doanh mang lại lợi nhuận vượt xa mong đợi ban đầu.",
        "reversed": "Đạt được mục tiêu tài chính nhưng đánh mất sự cân bằng cuộc sống và sức khỏe; cảm giác trống rỗng."
      },
      "love": {
        "upright": "Gặp được người bạn đời đúng như mọi tiêu chuẩn mơ ước bấy lâu, tình yêu ngọt ngào trọn vẹn hạnh phúc ngất ngây.",
        "reversed": "Thất vọng vì đối phương không hoàn hảo như kỳ vọng đặt ra, hoặc quá ích kỷ chỉ biết đòi hỏi sự phục vụ."
      },
      "healthSpirit": {
        "upright": "Thể trạng tuyệt vời, tinh thần sảng khoái, tận hưởng những bữa ăn ngon và giấc ngủ sâu trọn vẹn.",
        "reversed": "Tăng cân mất kiểm soát, béo phì, bệnh gout do nuông chiều khẩu vị ăn uống quá nhiều đồ bổ béo."
      },
      "dharmaAdvice": {
        "upright": "Biết đủ là giàu tối thượng (Tri túc thường lạc - Santutthi). Chia sẻ phước lành sung túc đến những mảnh đời cơ nhỡ.",
        "reversed": "Đừng để dục lạc thế gian làm mờ mắt; hạnh phúc vật chất chỉ là bóng nước phù du trước biển luân hồi."
      }
    }
  },
  {
    "id": "cups_ten",
    "number": 10,
    "roman": "10",
    "nameEn": "Ten of Cups",
    "nameVi": "Mười Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Hỏa Tinh tại Song Ngư",
    "icon": "🏆",
    "visualSymbol": "Gia đình hạnh phúc cùng hai đứa trẻ nhảy múa dưới dải cầu vồng kết bằng 10 chiếc cúp vàng rực rỡ trên bầu trời xanh",
    "uprightKeywords": [
      "Hạnh phúc gia đình viên mãn",
      "Bình an vĩnh cửu",
      "Mái ấm lý tưởng",
      "Hòa hợp trọn vẹn",
      "Phước lộc toàn gia"
    ],
    "reversedKeywords": [
      "Xung đột gia đình",
      "Ly tán rạn nứt",
      "Mất đi sự bình yên",
      "Vỏ bọc hạnh phúc giả tạo"
    ],
    "uprightMeaning": "Ten of Cups là đỉnh cao của hạnh phúc cảm xúc và gia đình. Dải cầu vồng 10 chiếc cúp tượng trưng cho sự chở che của trời đất, mang lại bình an, hòa thuận và tình yêu vĩnh cửu cho toàn thể gia đạo.",
    "reversedMeaning": "Rạn nứt trong tổ ấm gia đình, bất hòa thế hệ giữa cha mẹ và con cái, hoặc cố gồng mình giữ gìn vỏ bọc hạnh phúc để che mắt thế gian.",
    "aspects": {
      "career": {
        "upright": "Môi trường làm việc như một đại gia đình đoàn kết thương yêu nhau, cùng chia sẻ thành quả và hỗ trợ nhau hết lòng.",
        "reversed": "Bất đồng giá trị cốt lõi trong tổ chức, không khí làm việc căng thẳng ảnh hưởng tiêu cực đến đời sống gia đình."
      },
      "love": {
        "upright": "Hôn nhân viên mãn răng long đầu bạc, sinh con đẻ cái ngoan ngoãn hiếu thuận, tình yêu bền vững trọn đời trọn kiếp.",
        "reversed": "Cơm không lành canh không ngọt, nguy cơ ly thân ly hôn vì thiếu sự lắng nghe và cảm thông giữa vợ chồng."
      },
      "healthSpirit": {
        "upright": "Thân tâm an lạc, gia đình khỏe mạnh bình an không tai ương tật bệnh, năng lượng an lành bao bọc ngôi nhà.",
        "reversed": "Bệnh tật của người thân trong gia đình làm xáo trộn cuộc sống, cần quan tâm chăm sóc sức khỏe cha mẹ già."
      },
      "dharmaAdvice": {
        "upright": "Biến gia đình thành tịnh thổ yêu thương; gieo trồng hạt giống hiếu đạo và đạo đức cho các thế hệ con cháu nối dõi.",
        "reversed": "Hàn gắn những rạn nứt gia đạo bằng hạnh từ bi và bao dung; gia hòa vạn sự hưng, nhà có êm thì muôn sự mới thuận."
      }
    }
  },
  {
    "id": "cups_page",
    "number": 11,
    "roman": "Page",
    "nameEn": "Page of Cups",
    "nameVi": "Tiểu Đồng Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Nguyên tố Thủy của Đất (Sứ giả cảm xúc)",
    "icon": "🏆",
    "visualSymbol": "Chàng thiếu niên áo gấm đứng bên bờ biển ngắm nhìn chú cá nhỏ bất ngờ nhảy lên chào từ trong chiếc cúp",
    "uprightKeywords": [
      "Trực giác bất ngờ",
      "Tin mừng tình cảm",
      "Tâm hồn thi sĩ",
      "Thông điệp ngọt ngào",
      "Lòng trắc ẩn ngây thơ"
    ],
    "reversedKeywords": [
      "Cảm xúc non nớt",
      "Hờn dỗi trẻ con",
      "Tin buồn tình cảm",
      "Mộng mơ viển vông"
    ],
    "uprightMeaning": "Page of Cups mang đến những thông điệp bất ngờ thú vị từ tiềm thức và vũ trụ. Một tin vui về tình cảm, một lời mời dễ thương hoặc sự bừng nở của năng khiếu nghệ thuật và trực giác nhạy bén.",
    "reversedMeaning": "Tính khí thất thường hờn dỗi như trẻ con, nhận được tin không vui trong chuyện tình cảm, hoặc sự trốn tránh thực tại vào thế giới mộng tưởng.",
    "aspects": {
      "career": {
        "upright": "Cơ hội thử sức trong các lĩnh vực nghệ thuật, viết lách, thiết kế sáng tạo; nhận được phản hồi tích cực từ khách hàng.",
        "reversed": "Thiếu tính chuyên nghiệp trong công việc, để cảm xúc cá nhân chi phối các quyết định kinh doanh quan trọng."
      },
      "love": {
        "upright": "Nhận được lời tỏ tình ngọt ngào lãng mạn, mối tình đầu trong sáng thơ ngây đầy ắp những rung động tinh khôi.",
        "reversed": "Đối phương nhạy cảm quá mức dễ bị tổn thương vì lời nói vô tình, hờn dỗi đòi hỏi sự chú ý liên tục."
      },
      "healthSpirit": {
        "upright": "Trực giác mách bảo nhu cầu cần thiết của cơ thể, tinh thần thư thái giúp điều hòa khí huyết êm dịu.",
        "reversed": "Dễ bị xúc động thái quá dẫn đến đau đầu hoa mắt, rối loạn tiêu hóa do tâm lý lo lắng hồi hộp thất thường."
      },
      "dharmaAdvice": {
        "upright": "Lắng nghe trực giác vi tế và tiếng lòng mách bảo; giữ tâm hồn mềm mại như nước để dung nạp vạn vật.",
        "reversed": "Trưởng thành trong cảm xúc; không để những cơn sóng gió tâm lý cuốn trôi đi sự định tĩnh cần thiết."
      }
    }
  },
  {
    "id": "cups_knight",
    "number": 12,
    "roman": "Knight",
    "nameEn": "Knight of Cups",
    "nameVi": "Hiệp Sĩ Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Nguyên tố Thủy của Khí (Kỵ sĩ lãng mạn)",
    "icon": "🏆",
    "visualSymbol": "Hiệp sĩ áo giáp bạc mang cúp vàng chầm chậm cưỡi ngựa trắng bước qua dòng suối êm đềm, mũ cài cánh chim thần",
    "uprightKeywords": [
      "Lời mời lãng mạn",
      "Bạch mã hoàng tử",
      "Theo đuổi lý tưởng",
      "Hòa giải êm đẹp",
      "Sứ giả hòa bình"
    ],
    "reversedKeywords": [
      "Kẻ lừa tình ngọt ngào",
      "Vỡ mộng ảo tưởng",
      "Thay lòng đổi dạ",
      "Thiếu thực tế"
    ],
    "uprightMeaning": "Knight of Cups là hình mẫu bạch mã hoàng tử mang chiếc cúp tình yêu đến trao tặng. Anh ấy theo đuổi cái đẹp và lý tưởng cao quý với sự duyên dáng, tinh tế và một trái tim ấm áp nồng nàn.",
    "reversedMeaning": "Kẻ săn tình dẻo mỏ hứa hươu hứa vượn rồi quất ngựa truy phong, vỡ mộng đau đớn khi nhận ra bộ mặt thật sau vẻ ngoài hào nhoáng lãng mạn.",
    "aspects": {
      "career": {
        "upright": "Nhận được lời mời làm việc hấp dẫn đúng đam mê, đàm phán ngoại giao thành công nhờ sự khéo léo duyên dáng.",
        "reversed": "Kế hoạch hợp tác chỉ vẽ ra trên giấy mà không có tính thực thi, đối tác hứa hẹn nhiều nhưng làm chẳng bao nhiêu."
      },
      "love": {
        "upright": "Tình yêu lãng mạn như phim ngôn tình, người yêu chu đáo tinh tế luôn mang lại những bất ngờ ngọt ngào.",
        "reversed": "Gặp phải kẻ đa tình lăng nhăng 'bắt cá hai tay', bị thao túng tâm lý bằng những lời nói dối ngọt ngào có cánh."
      },
      "healthSpirit": {
        "upright": "Sức khỏe phục hồi nhờ các liệu pháp âm nhạc trị liệu, hương thơm thảo mộc và không gian sống thi vị.",
        "reversed": "Suy nhược tinh thần do thất tình, chìm đắm trong men rượu hoặc chất kích thích để quên đi thực tại phũ phàng."
      },
      "dharmaAdvice": {
        "upright": "Dấn thân phụng sự với tâm hồn thuần khiết của người nghệ sĩ; làm sứ giả đem lại hòa bình và sự an ủi cho nhân thế.",
        "reversed": "Tỉnh táo phân định giữa tình thương chân thật và lòng tham ái vi tế; đừng để sự ủy mị làm mềm yếu ý chí tu tập."
      }
    }
  },
  {
    "id": "cups_queen",
    "number": 13,
    "roman": "Queen",
    "nameEn": "Queen of Cups",
    "nameVi": "Hoàng Hậu Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Nguyên tố Thủy của Nước (Mẹ hiền từ ái)",
    "icon": "🏆",
    "visualSymbol": "Hoàng hậu ngồi ngai vàng chạm hình tiên cá bên bờ biển, hai tay nâng niu chiếc cúp nạm ngọc tinh xảo kín nắp",
    "uprightKeywords": [
      "Từ bi bao la",
      "Trực giác thấu thị",
      "Nuôi dưỡng cảm xúc",
      "Người mẹ dịu hiền",
      "Tâm hồn thấu cảm"
    ],
    "reversedKeywords": [
      "Lụy tình phụ thuộc",
      "Tâm lý bất ổn",
      "Bị cảm xúc thao túng",
      "Bỏ bê bản thân"
    ],
    "uprightMeaning": "Queen of Cups là hiện thân của Bồ Tát Quán Thế Âm lắng nghe tiếng kêu khổ của thế gian. Trái tim bao dung và khả năng thấu cảm siêu phàm của bà có thể vỗ về và xoa dịu mọi vết thương sâu kín nhất.",
    "reversedMeaning": "Sự bi lụy cảm xúc quá mức, tự biến mình thành bãi rác chứa chấp năng lượng tiêu cực của người khác, hoặc tâm lý thao túng cảm xúc đối phương.",
    "aspects": {
      "career": {
        "upright": "Phát huy xuất sắc vai trò tư vấn tâm lý, y tế, chăm sóc khách hàng; được cấp dưới và đồng nghiệp kính yêu vô vàn.",
        "reversed": "Quá nhạy cảm dễ bị tổn thương trước lời phê bình trong công việc, không giữ được ranh giới chuyên nghiệp tại công sở."
      },
      "love": {
        "upright": "Tình yêu sâu đậm bao dung hết mực, người vợ người mẹ lý tưởng luôn tạo ra bến đỗ bình yên nhất cho gia đình.",
        "reversed": "Ghen tuông ám ảnh, phụ thuộc cảm xúc hoàn toàn vào đối phương, dằn vặt bản thân khi mối quan hệ gặp trục trặc."
      },
      "healthSpirit": {
        "upright": "Cân bằng nước và điện giải trong cơ thể, thể trạng khỏe mạnh nhờ giữ được tâm thái an định không giận hờn oán trách.",
        "reversed": "Rối loạn cảm xúc theo mùa, trầm cảm sau sinh hoặc các bệnh lý phụ khoa do u uất tinh thần lâu ngày."
      },
      "dharmaAdvice": {
        "upright": "Hành trì hạnh Lắng Nghe của Đức Quán Thế Âm (Avalokiteshvara); mở rộng dung lượng trái tim để dung chứa vạn vật.",
        "reversed": "Thiết lập ranh giới bảo vệ tâm thức; học cách buông bỏ những muộn phiền của tha nhân mà không để dính mắc vào mình."
      }
    }
  },
  {
    "id": "cups_king",
    "number": 14,
    "roman": "King",
    "nameEn": "King of Cups",
    "nameVi": "Vua Cốc",
    "arcana": "Minor",
    "suit": "Cups",
    "element": "Nước",
    "astrology": "Nguyên tố Thủy của Hỏa (Vua làm chủ cảm xúc)",
    "icon": "🏆",
    "visualSymbol": "Đức vua ngự trên ngai đá nổi giữa biển khơi sóng gió, tay cầm quyền trượng và cúp vàng, cá nhảy và thuyền buồm phía xa",
    "uprightKeywords": [
      "Làm chủ cảm xúc",
      "Điềm đạm bao dung",
      "Trí tuệ cảm xúc cao",
      "Chỗ dựa vững chãi",
      "Nhân hậu độ lượng"
    ],
    "reversedKeywords": [
      "Cảm xúc lạnh lùng",
      "Thao túng nội tâm",
      "Bùng nổ cơn thịnh nộ",
      "Nghiện ngập buông thả"
    ],
    "uprightMeaning": "King of Cups là bậc thầy làm chủ biển cả cảm xúc. Giữa muôn trùng sóng gió bão táp của cuộc đời, ngài vẫn ngự trị trên ngai đá với sự điềm đạm, trí tuệ sâu thấu và tấm lòng nhân hậu vô biên.",
    "reversedMeaning": "Bề ngoài tỏ ra lạnh lùng đạo mạo nhưng bên trong dậy sóng nham hiểm, dùng chiêu trò thao túng cảm xúc để trục lợi cá nhân.",
    "aspects": {
      "career": {
        "upright": "Nhà lãnh đạo có EQ xuất sắc, giải quyết êm thấm các mâu thuẫn nội bộ gay gắt, chèo lái doanh nghiệp vượt qua khủng hoảng.",
        "reversed": "Lãnh đạo thiếu quyết đoán do sợ mất lòng người khác, hoặc trở nên độc đoán lạnh lùng xa cách với nhân viên."
      },
      "love": {
        "upright": "Người đàn ông trưởng thành lý tưởng, biết lắng nghe thấu hiểu và che chở, tình yêu sâu sắc và thủy chung son sắt.",
        "reversed": "Đóng chặt cảm xúc, lạnh lùng tàn nhẫn khi chia tay, hoặc dùng sự im lặng trừng phạt đối phương trong mối quan hệ."
      },
      "healthSpirit": {
        "upright": "Hệ thần kinh ổn định vững vàng, huyết áp và tim mạch điều hòa tuyệt vời nhờ khả năng kiểm soát căng thẳng bậc thầy.",
        "reversed": "Nguy cơ mắc các bệnh về gan và đường mật do kìm nén uất ức bên trong mà không chịu giãi bày."
      },
      "dharmaAdvice": {
        "upright": "Tâm bất biến giữa dòng đời vạn biến. Biến tâm trí thành đại dương mênh mông dung chứa muôn vàn sóng gió trần ai.",
        "reversed": "Quan sát tâm sân hận ngấm ngầm; thực hành sám hối và tịnh hóa những ý niệm tiêu cực ẩn sâu nơi đáy lòng."
      }
    }
  },
  {
    "id": "swords_ace",
    "number": 1,
    "roman": "Ace",
    "nameEn": "Ace of Swords",
    "nameVi": "Át Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Nguyên tố Phong sơ khai",
    "icon": "⚔️",
    "visualSymbol": "Bàn tay thần vươn ra từ mây nắm chặt thanh bảo kiếm hai lưỡi cắm qua vương miện kết bằng cành ô liu và cọ",
    "uprightKeywords": [
      "Đột phá tư duy",
      "Chân lý sáng tỏ",
      "Chiến thắng trí tuệ",
      "Rõ ràng minh bạch",
      "Ý chí sắt đá"
    ],
    "reversedKeywords": [
      "Nhầm lẫn hỗn loạn",
      "Tư duy bạo lực",
      "Sự thật tàn nhẫn",
      "Thất bại chiến lược"
    ],
    "uprightMeaning": "Ace of Swords là thanh bảo kiếm trí tuệ chặt đứt mọi dây mơ rễ má của sự hoang mang giả tạo. Sự thật sáng tỏ như ban ngày, mang lại bước đột phá tư duy và chiến thắng vang dội cho công lý.",
    "reversedMeaning": "Sự thật bị bóp méo dối trá, tư duy hỗn loạn mất phương hướng, hoặc dùng lời lẽ cay độc tàn nhẫn để sát thương người khác.",
    "aspects": {
      "career": {
        "upright": "Tìm ra giải pháp đột phá cho bài toán hóc búa, thắng lợi trong tranh luận pháp lý, hợp đồng minh bạch sòng phẳng.",
        "reversed": "Kế hoạch chiến lược bị sai sót nghiêm trọng ngay từ khâu ý tưởng, tranh cãi gay gắt dẫn đến đổ vỡ hợp tác."
      },
      "love": {
        "upright": "Cuộc trò chuyện thẳng thắn làm sáng tỏ mọi khúc mắc bấy lâu, quyết định rõ ràng dứt khoát cho tương lai đôi lứa.",
        "reversed": "Lời nói cay nghiệt làm tổn thương sâu sắc lòng tự trọng của đối phương, không ai chịu lắng nghe nhau."
      },
      "healthSpirit": {
        "upright": "Chẩn đoán y khoa chính xác tuyệt đối, phẫu thuật thành công mỹ mãn loại bỏ triệt để mầm bệnh tật.",
        "reversed": "Vết cắt tổn thương ngoài da, đau nửa đầu dữ dội do suy nghĩ căng thẳng quá tải trí não."
      },
      "dharmaAdvice": {
        "upright": "Dùng gươm báu Bát Nhã chém đứt gốc rễ vô minh phiền não; giữ tâm ngay thẳng chính trực không thiên vị.",
        "reversed": "Tránh dùng trí thông minh để ngụy biện và xoi mói lỗi lầm của người khác; trí tuệ phải đi đôi với từ bi."
      }
    }
  },
  {
    "id": "swords_two",
    "number": 2,
    "roman": "2",
    "nameEn": "Two of Swords",
    "nameVi": "Hai Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Mặt Trăng tại Thiên Bình",
    "icon": "⚔️",
    "visualSymbol": "Thiếu nữ bị bịt mắt ngồi trên bờ đá trước biển đêm, hai tay bắt chéo giữ thăng bằng hai thanh gươm sắc nhọn",
    "uprightKeywords": [
      "Bế tắc lưỡng lự",
      "Bịt mắt trốn tránh",
      "Cân nhắc ngã rẽ",
      "Thỏa hiệp tạm thời",
      "Tĩnh lặng trước bão"
    ],
    "reversedKeywords": [
      "Sự thật phơi bày",
      "Buộc phải chọn lựa",
      "Mất cân bằng sụp đổ",
      "Thông tin quá tải"
    ],
    "uprightMeaning": "Two of Swords phản ánh tình thế tiến thoái lưỡng nan khi bạn tự bịt mắt trốn tránh sự thật và trì hoãn đưa ra quyết định khó khăn. Giữ thái độ trung lập lúc này chỉ là giải pháp tạm bợ kéo dài thời gian.",
    "reversedMeaning": "Bức màn che mắt bị giật xuống, sự thật bắt buộc bạn phải đối mặt và đưa ra phán quyết dứt khoát không thể chối từ.",
    "aspects": {
      "career": {
        "upright": "Đứng trước hai cơ hội việc làm ngang sức ngang tài khó chọn lựa; cần cân nhắc kỹ các rủi ro tiềm ẩn.",
        "reversed": "Bị ép phải chọn phe trong cuộc đấu đá nội bộ công ty, không thể tiếp tục giữ thái độ trung lập được nữa."
      },
      "love": {
        "upright": "Chiến tranh lạnh, đóng chặt lòng mình không chịu đối thoại, né tránh thừa nhận sự thật mối quan hệ đang rạn nứt.",
        "reversed": "Mở mắt nhìn thẳng vào vấn đề cốt lõi, tháo gỡ nút thắt bế tắc bằng một cuộc nói chuyện dứt khoát rõ ràng."
      },
      "healthSpirit": {
        "upright": "Cần cho đôi mắt và não bộ nghỉ ngơi, tránh nhìn màn hình điện tử quá nhiều để giảm bớt căng thẳng thị giác.",
        "reversed": "Thị lực suy giảm, đau mỏi vai gáy và khớp cổ do cơ thể luôn trong trạng thái gồng cứng phòng thủ."
      },
      "dharmaAdvice": {
        "upright": "Quay vào trong lắng nghe tiếng nói trực giác; khi tâm trí thôi tranh cãi, đáp án chính xác tự khắc hiện ra.",
        "reversed": "Dũng cảm tháo bỏ chiếc khăn bịt mắt vô minh; can đảm đối diện với sự thật là bước đầu tiên của giải thoát."
      }
    }
  },
  {
    "id": "swords_three",
    "number": 3,
    "roman": "3",
    "nameEn": "Three of Swords",
    "nameVi": "Ba Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Thổ Tinh tại Thiên Bình",
    "icon": "⚔️",
    "visualSymbol": "Trái tim đỏ thắm lơ lửng giữa bầu trời mây đen vần vũ mưa giông bị ba thanh kiếm đâm xuyên qua",
    "uprightKeywords": [
      "Nỗi đau tan vỡ",
      "Phản bội đau đớn",
      "Tổn thương sâu sắc",
      "Nước mắt chia ly",
      "Mổ xẻ sự thật"
    ],
    "reversedKeywords": [
      "Chữa lành hàn gắn",
      "Vượt qua đau thương",
      "Tha thứ xoa dịu",
      "Mưa tạnh mây tan"
    ],
    "uprightMeaning": "Three of Swords là nỗi đau buốt giá của sự phản bội, mất mát hoặc chia ly. Dù cơn đau như xé rách tâm can, nhưng vết mổ của lưỡi kiếm là cần thiết để nặn sạch mủ độc của sự lừa dối bấy lâu.",
    "reversedMeaning": "Giai đoạn phục hồi sau cú sốc tình cảm, vết thương lòng bắt đầu kéo da non, bạn học cách tha thứ để tự giải thoát cho chính mình.",
    "aspects": {
      "career": {
        "upright": "Bị đối tác lừa gạt hợp đồng, mất việc đột ngột, dự án tâm huyết bị hủy bỏ gây thiệt hại nặng nề.",
        "reversed": "Khắc phục hậu quả sau sự cố đổ bể kinh doanh, bắt đầu xây dựng lại lòng tin nơi các đối tác trung thành."
      },
      "love": {
        "upright": "Bị người yêu phản bội đau đớn, phát hiện mối quan hệ tay ba cay đắng, chia tay trong nước mắt nghẹn ngào.",
        "reversed": "Dần nguôi ngoai nỗi đau tan vỡ, tha thứ cho lỗi lầm của người cũ để tìm lại sự thanh thản cho tâm hồn."
      },
      "healthSpirit": {
        "upright": "Các cơn đau nhói vùng tim do xúc động mạnh, cần chú ý kiểm tra điện tâm đồ và hệ thống tuần hoàn máu.",
        "reversed": "Phục hồi sức khỏe tim mạch sau phẫu thuật, tinh thần ổn định trở lại sau giai đoạn trầm cảm nặng nề."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu Tam Pháp Ấn: Khổ (Dukkha). Hiểu rằng nỗi đau là người thầy vĩ đại rèn giũa bản lĩnh giác ngộ.",
        "reversed": "Rút mũi kiếm ra khỏi tim bằng hạnh tha thứ; ôm ấp đứa trẻ tổn thương bên trong bằng lòng từ ái vô bờ."
      }
    }
  },
  {
    "id": "swords_four",
    "number": 4,
    "roman": "4",
    "nameEn": "Four of Swords",
    "nameVi": "Bốn Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Mộc Tinh tại Thiên Bình",
    "icon": "⚔️",
    "visualSymbol": "Bức tượng hiệp sĩ nằm tĩnh lặng chắp tay cầu nguyện trên nắp mộ đá trong thánh đường, 3 thanh kiếm treo trên tường và 1 thanh nằm dưới bệ",
    "uprightKeywords": [
      "Nghỉ ngơi tịnh dưỡng",
      "Rút lui phục hồi",
      "Thiền định tĩnh tâm",
      "Tạm dừng xung đột",
      "Nạp lại năng lượng"
    ],
    "reversedKeywords": [
      "Hồi phục tái xuất",
      "Kiệt sức do không nghỉ",
      "Bị ép quay lại chiến trường",
      "Bất an trong tĩnh lặng"
    ],
    "uprightMeaning": "Four of Swords là mệnh lệnh rút lui chiến thuật để dưỡng thương. Sau những trận chiến khốc liệt, hãy buông vũ khí xuống, nằm yên trong tĩnh lặng thiền định để thân tâm được phục hồi nguyên khí.",
    "reversedMeaning": "Đã đến lúc thức dậy sau giấc ngủ đông, nạp đủ năng lượng để tái xuất giang hồ; hoặc cảnh báo sự kiệt sức do không chịu nghỉ ngơi.",
    "aspects": {
      "career": {
        "upright": "Xin nghỉ phép xả hơi sau khi hoàn thành dự án lớn, tạm thời án binh bất động trước những biến động thị trường.",
        "reversed": "Quay trở lại công việc với năng lượng mới mẻ, sẵn sàng đương đầu với các thử thách mới trên thương trường."
      },
      "love": {
        "upright": "Cả hai cần một khoảng lặng tạm xa nhau vài ngày để suy ngẫm thấu đáo, tránh tranh cãi leo thang làm sứt mẻ tình cảm.",
        "reversed": "Kết thúc thời gian chiến tranh lạnh, chủ động liên lạc lại với người yêu để cùng nhau trò chuyện hòa giải."
      },
      "healthSpirit": {
        "upright": "Thời gian vàng để nhập viện điều trị phục hồi chức năng, thực hành ngủ sâu và thiền định chữa lành tế bào.",
        "reversed": "Suy kiệt thể chất nghiêm trọng do mất ngủ kéo dài, cơ thể phát tín hiệu báo động đỏ đòi hỏi phải dừng lại ngay."
      },
      "dharmaAdvice": {
        "upright": "Thực hành An Cư Kiết Hạ (Vassa). Đóng cửa các giác quan, tĩnh tọa chuyên sâu để hồi quang phản chiếu tự tánh.",
        "reversed": "Xuất định mang tuệ giác nhập thế; sau khi tâm đã định tĩnh, hãy đem năng lượng an lành ấy phụng sự tha nhân."
      }
    }
  },
  {
    "id": "swords_five",
    "number": 5,
    "roman": "5",
    "nameEn": "Five of Swords",
    "nameVi": "Năm Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Kim Tinh tại Bảo Bình",
    "icon": "⚔️",
    "visualSymbol": "Kẻ thắng trận mỉm cười xảo quyệt thu nhặt 5 thanh kiếm trên bãi đất, hai bại binh thất thiểu cúi đầu rời đi dưới bầu trời mây xám xịt",
    "uprightKeywords": [
      "Thắng lợi cay đắng",
      "Bẽ bàng thất bại",
      "Thủ đoạn chơi xấu",
      "Cái tôi vị kỷ",
      "Tranh chấp vô nghĩa"
    ],
    "reversedKeywords": [
      "Hòa giải buông bỏ",
      "Chấm dứt hận thù",
      "Chấp nhận thua cuộc",
      "Tìm kiếm sự công bằng"
    ],
    "uprightMeaning": "Five of Swords phản ánh một chiến thắng cay đắng (Pyrrhic victory) nơi người thắng cuộc giành được phần thưởng bằng thủ đoạn đê hèn nhưng đánh mất toàn bộ tình người và sự tôn trọng của xung quanh.",
    "reversedMeaning": "Nhận ra sự vô nghĩa của cuộc tranh đấu hơn thua, chủ động buông gươm hòa giải hoặc chấp nhận buông tay để chấm dứt chuỗi ngày hận thù.",
    "aspects": {
      "career": {
        "upright": "Môi trường công sở đấu đá hãm hại nhau tàn nhẫn, thắng thầu bằng chiêu trò xấu nhưng chuốc lấy oán thù từ đối thủ.",
        "reversed": "Nhận thức rõ hậu quả tiêu cực của cạnh tranh không lành mạnh, ngồi lại thương lượng chia sẻ quyền lợi cùng thắng."
      },
      "love": {
        "upright": "Cãi vã gay gắt ai cũng muốn giành phần thắng bằng những lời lẽ sát thương tàn độc, kết cục là cả hai cùng tan nát cõi lòng.",
        "reversed": "Hạ cái tôi xuống, chủ động xin lỗi vì những lời cay nghiệt đã lỡ nói ra, quyết tâm hàn gắn mối quan hệ."
      },
      "healthSpirit": {
        "upright": "Căng thẳng tột độ khiến hệ tiêu hóa bị tổn thương, nguy cơ viêm loét dạ dày tá tràng do tâm trạng uất ức cay cú.",
        "reversed": "Giải tỏa được cơn giận dữ dồn nén, huyết áp ổn định trở lại sau khi buông bỏ tranh chấp kiện tụng."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu 'Thắng thì thêm oán thù, bại thì nằm đau khổ; không hơn thua tranh giành, tâm mới được an lạc'.",
        "reversed": "Sám hối những hành vi dùng mưu mẹo tổn hại tha nhân; đền bù thiệt hại để hóa giải nghiệp oán tiền kiếp."
      }
    }
  },
  {
    "id": "swords_six",
    "number": 6,
    "roman": "6",
    "nameEn": "Six of Swords",
    "nameVi": "Sáu Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Thủy Tinh tại Bảo Bình",
    "icon": "⚔️",
    "visualSymbol": "Người chèo đò chở người phụ nữ và đứa trẻ trùm khăn qua vùng nước êm ả, 6 thanh kiếm cắm thẳng đứng trên mũi thuyền",
    "uprightKeywords": [
      "Rời xa giông bão",
      "Chuyển biến êm đềm",
      "Hành trình chữa lành",
      "Vượt qua nghịch cảnh",
      "Bình yên phía trước"
    ],
    "reversedKeywords": [
      "Mắc kẹt trong giông bão",
      "Hành trình trắc trở",
      "Khó khăn kéo dài",
      "Chưa thể buông bỏ gánh nặng"
    ],
    "uprightMeaning": "Six of Swords là con thuyền chở bạn rời xa vùng nước xoáy bão táp để tiến về vùng nước êm đềm bình yên phía trước. Dù nỗi buồn vẫn còn đó trên mũi thuyền, nhưng điều tồi tệ nhất đã ở lại sau lưng.",
    "reversedMeaning": "Hành trình di chuyển gặp nhiều trắc trở, kế hoạch chuyển chỗ ở bị hoãn, hoặc tâm trí vẫn bám víu vào đau thương chưa chịu buông.",
    "aspects": {
      "career": {
        "upright": "Chuyển việc thành công sang môi trường mới trong lành hơn, dự án vượt qua giai đoạn khủng hoảng bắt đầu đi vào quỹ đạo ổn định.",
        "reversed": "Công việc mới không như kỳ vọng, vẫn còn vướng bận rắc rối bàn giao từ chỗ làm cũ chưa giải quyết dứt điểm."
      },
      "love": {
        "upright": "Cùng nhau vượt qua sóng gió thử thách, chuyển đến sinh sống tại vùng đất mới để làm lại từ đầu với tình yêu sâu sắc hơn.",
        "reversed": "Mang theo những định kiến và tổn thương cũ vào mối quan hệ mới khiến mọi chuyện lặp lại vết xe đổ."
      },
      "healthSpirit": {
        "upright": "Bệnh tình thuyên giảm rõ rệt, giai đoạn hồi phục sức khỏe tiến triển khả quan, thích hợp đi nghỉ dưỡng suối khoáng.",
        "reversed": "Quá trình điều trị bị gián đoạn, cần kiên trì theo dõi phác đồ dưỡng sinh không nên sốt ruột."
      },
      "dharmaAdvice": {
        "upright": "Bước qua bờ giác (Paramita). Nhận ra mọi giông bão cuộc đời chỉ là chất liệu tôi luyện bản lĩnh vững vàng trên lộ trình giải thoát.",
        "reversed": "Nhổ bỏ những mũi kiếm định kiến găm nơi tâm khảm; đừng mang hành trang đau buồn cũ lên con thuyền mới."
      }
    }
  },
  {
    "id": "swords_seven",
    "number": 7,
    "roman": "7",
    "nameEn": "Seven of Swords",
    "nameVi": "Bảy Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Mặt Trăng tại Bảo Bình",
    "icon": "⚔️",
    "visualSymbol": "Kẻ trộm lén lút ôm 5 thanh kiếm rón rén rời khỏi doanh trại quân địch, ngoái đầu nhìn lại 2 thanh kiếm còn cắm dưới đất",
    "uprightKeywords": [
      "Kế sách mưu mẹo",
      "Hành động lén lút",
      "Chiến lược thông minh",
      "Tránh đối đầu trực diện",
      "Coi chừng lừa dối"
    ],
    "reversedKeywords": [
      "Bại lộ mưu gian",
      "Thú nhận sự thật",
      "Bị bắt quả tang",
      "Thay đổi chiến thuật chính trực"
    ],
    "uprightMeaning": "Seven of Swords nhắc nhở bạn cần dùng mưu trí và sự khéo léo thay vì dùng sức mạnh đối đầu trực diện. Đồng thời là lời cảnh báo coi chừng sự trộm cắp, lừa đảo hoặc sự phản bội sau lưng.",
    "reversedMeaning": "Hành vi gian dối bị phơi bày ra ánh sáng, cảm giác cắn rứt lương tâm thôi thúc thú nhận sự thật, hoặc kế hoạch mưu mẹo bị phá sản hoàn toàn.",
    "aspects": {
      "career": {
        "upright": "Cần bảo mật tuyệt đối ý tưởng sáng tạo và bí mật kinh doanh; dùng chiến lược ngách thông minh để vượt mặt đối thủ lớn.",
        "reversed": "Bị tố giác hành vi gian lận tài chính hoặc vi phạm bản quyền sở hữu trí tuệ; danh tiếng bị tổn hại nghiêm trọng."
      },
      "love": {
        "upright": "Có sự che giấu thiếu thành thật trong quan hệ, những tin nhắn lén lút sau lưng đối phương gây cảm giác bất an.",
        "reversed": "Dũng cảm thú nhận lỗi lầm và sự thiếu chung thủy trong quá khứ để tìm kiếm sự tha thứ và làm lại cuộc đời."
      },
      "healthSpirit": {
        "upright": "Cần cẩn thận đề phòng mất cắp tài sản khi đi khám chữa bệnh tại các bệnh viện hoặc cơ sở y tế đông đúc.",
        "reversed": "Áp lực tâm lý do che giấu bí mật quá lâu gây suy nhược thần kinh, mất ngủ triền miên vì lo sợ bại lộ."
      },
      "dharmaAdvice": {
        "upright": "Thực hành Chánh Mạng và Chánh Nghiệp. Giữ gìn giới hạnh thanh tịnh; của phi nghĩa dẫu lấy được cũng hóa thành tro bụi.",
        "reversed": "Sám hối tội lỗi gian tham trộm cắp; hoàn trả lại những gì không thuộc về mình để lương tâm được thanh thản."
      }
    }
  },
  {
    "id": "swords_eight",
    "number": 8,
    "roman": "8",
    "nameEn": "Eight of Swords",
    "nameVi": "Tám Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Mộc Tinh tại Song Tử",
    "icon": "⚔️",
    "visualSymbol": "Người phụ nữ bị trói lỏng và bịt mắt đứng giữa bãi bùn lầy bao quanh bởi 8 thanh kiếm cắm xung quanh",
    "uprightKeywords": [
      "Bế tắc tự áp đặt",
      "Tự biến mình thành nạn nhân",
      "Bất lực ảo tưởng",
      "Sợ hãi kìm kẹp",
      "Lối thoát hiện hữu"
    ],
    "reversedKeywords": [
      "Cởi trói giải thoát",
      "Nhìn thấy lối thoát",
      "Lấy lại quyền kiểm soát",
      "Vượt qua giới hạn bản thân"
    ],
    "uprightMeaning": "Eight of Swords vạch trần chiếc lồng giam do chính tâm trí bạn dựng lên. Những sợi dây trói vốn rất lỏng và các thanh kiếm không hề khóa kín lối đi. Chỉ cần tháo dải băng bịt mắt, bạn hoàn toàn có thể tự bước ra.",
    "reversedMeaning": "Khoảnh khắc tự tháo dây trói bước ra khỏi bóng tối ngục tù tự tạo, nhận ra sức mạnh tự chủ của bản thân và giành lại quyền kiểm soát cuộc đời.",
    "aspects": {
      "career": {
        "upright": "Cảm thấy bế tắc ngột ngạt trong công việc hiện tại nhưng sợ hãi không dám nhảy việc vì tự ti năng lực bản thân.",
        "reversed": "Nhận ra tiềm năng to lớn của bản thân, dũng cảm nộp đơn nghỉ việc để tìm kiếm chân trời tự do mới."
      },
      "love": {
        "upright": "Cảm giác bị giam cầm trong mối quan hệ độc hại thao túng, luôn sợ hãi đối phương nổi giận mà không dám lên tiếng.",
        "reversed": "Dứt khoát chấm dứt sự phụ thuộc tâm lý, bước ra khỏi mối quan hệ kiểm soát và tìm lại tự do tự tại."
      },
      "healthSpirit": {
        "upright": "Hội chứng hoảng loạn, sợ không gian hẹp, cảm giác ngột ngạt khó thở do căng thẳng tâm lý tự tạo ra.",
        "reversed": "Vượt qua chứng rối loạn lo âu sau thời gian trị liệu tâm lý tích cực, hơi thở thông suốt trở lại."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu 'Tâm làm chủ, tâm tạo tác'. Không có ai giam cầm bạn ngoại trừ những định kiến sai lầm của chính mình.",
        "reversed": "Phá vỡ bức tường tự ti mặc cảm; nhận ra Phật tính sáng ngời vốn sẵn có nơi tự tâm không hề bị trói buộc."
      }
    }
  },
  {
    "id": "swords_nine",
    "number": 9,
    "roman": "9",
    "nameEn": "Nine of Swords",
    "nameVi": "Chín Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Hỏa Tinh tại Song Tử",
    "icon": "⚔️",
    "visualSymbol": "Người phụ nữ ôm mặt khóc nức nở ngồi bật dậy trên giường trong đêm tối, 9 thanh kiếm treo song song trên bức tường phía sau",
    "uprightKeywords": [
      "Cơn ác mộng đè nặng",
      "Lo âu dằn vặt",
      "Mất ngủ kinh hoàng",
      "Tuyệt vọng u tối",
      "Bóng ma tâm lý"
    ],
    "reversedKeywords": [
      "Bình minh xua tan ác mộng",
      "Giải tỏa lo âu",
      "Tìm kiếm sự giúp đỡ",
      "Hiểu ra nỗi sợ vô căn cứ"
    ],
    "uprightMeaning": "Nine of Swords là đêm đen của tâm hồn với những cơn ác mộng và sự dằn vặt xé lòng. Tuy nhiên, 9 thanh kiếm chỉ treo trên tường chứ không hề đâm vào người bạn; nỗi đau phần lớn do tâm trí tự tưởng tượng phóng đại.",
    "reversedMeaning": "Bình minh ló dạng xua tan cơn ác mộng đen tối, bạn nhận ra những nỗi lo sợ bấy lâu thực chất không đáng sợ như mình nghĩ và tìm lại được sự thanh thản.",
    "aspects": {
      "career": {
        "upright": "Mất ngủ trắng đêm vì lo lắng công nợ và áp lực tiến độ công việc, nỗi sợ thất bại ám ảnh tột cùng.",
        "reversed": "Tìm ra giải pháp tháo gỡ khó khăn tài chính, áp lực công việc được san sẻ giúp tinh thần nhẹ nhõm trở lại."
      },
      "love": {
        "upright": "Dằn vặt đau đớn vì nghi ngờ đối phương lừa dối, cảm giác tội lỗi về những lỗi lầm đã gây ra cho người mình yêu.",
        "reversed": "Chia sẻ thẳng thắn nỗi bất an với người bạn đời, giải tỏa mọi hiểu lầm và cùng nhau vượt qua khủng hoảng niềm tin."
      },
      "healthSpirit": {
        "upright": "Mất ngủ kinh niên, ác mộng đè nặng, suy nhược thần kinh nghiêm trọng cần điều trị bằng liệu pháp y khoa kết hợp thiền định.",
        "reversed": "Giấc ngủ an lành trở lại sau thời gian dài điều trị, giải tỏa hoàn toàn các ức chế thần kinh tiêu cực."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu tính Không của các nỗi sợ hãi; 'Tâm kinh' dạy: 'Tâm vô quái ngại, vô quái ngại cố vô hữu khủng bố, viễn ly điên đảo mộng tưởng'.",
        "reversed": "Thắp lên ngọn đèn chánh niệm để soi rọi bóng tối vô minh; mọi ma chướng tự khắc tan biến khi ánh sáng trí tuệ hiện tiền."
      }
    }
  },
  {
    "id": "swords_ten",
    "number": 10,
    "roman": "10",
    "nameEn": "Ten of Swords",
    "nameVi": "Mười Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Mặt Trời tại Song Tử",
    "icon": "⚔️",
    "visualSymbol": "Người đàn ông nằm sấp bất động trên bờ cát với 10 thanh kiếm cắm dọc sống lưng, bầu trời xa xa hé lộ ánh rạng đông vàng",
    "uprightKeywords": [
      "Đáy sâu tuyệt vọng",
      "Kết thúc hoàn toàn",
      "Phản bội đâm sau lưng",
      "Bi kịch chạm đáy",
      "Bình minh tái sinh"
    ],
    "reversedKeywords": [
      "Trỗi dậy từ đống tro tàn",
      "Hồi sinh ngoạn mục",
      "Thoát chết thần kỳ",
      "Vết thương bắt đầu lành"
    ],
    "uprightMeaning": "Ten of Swords là điểm tận cùng của nỗi đau và bi kịch. Khi bạn đã chạm đáy vực sâu, mọi thứ không thể tồi tệ hơn được nữa. Hãy nhìn về phía chân trời xa, ánh rạng đông đang bừng sáng báo hiệu một chu kỳ tái sinh rực rỡ.",
    "reversedMeaning": "Sự trỗi dậy thần kỳ từ tro tàn đổ nát, thoát chết trong gang tấc và hồi phục ngoạn mục sau chuỗi ngày tăm tối nhất của cuộc đời.",
    "aspects": {
      "career": {
        "upright": "Dự án sụp đổ hoàn toàn, phá sản hoặc mất việc cay đắng; nhưng đây chính là cơ hội để bạn giải phóng hoàn toàn và bắt đầu lại từ đầu.",
        "reversed": "Tái thiết lại sự nghiệp từ đống đổ nát, tìm thấy cơ hội hồi sinh kinh doanh quý giá sau giai đoạn khủng hoảng tồi tệ."
      },
      "love": {
        "upright": "Mối quan hệ chấm dứt trong sự phản bội cay đắng đau đớn cùng cực, không còn cơ hội nào để cứu vãn hay hàn gắn.",
        "reversed": "Chấp nhận buông tay hoàn toàn nỗi đau cũ, đứng dậy làm lại cuộc đời với niềm tin mới mẻ vào tương lai."
      },
      "healthSpirit": {
        "upright": "Cơn đau cấp tính dữ dội, kiệt quệ hoàn toàn thể lực, cần cấp cứu và điều trị tích cực tại bệnh viện.",
        "reversed": "Qua cơn nguy kịch thần kỳ, cơ thể bắt đầu tiếp nhận thuốc và tiến triển hồi phục tích cực từng ngày."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu lẽ cùng tắc biến, biến tắc thông. Khi nghiệp chướng đã trổ hết quả đắng, con đường giải thoát sáng ngời sẽ mở ra.",
        "reversed": "Tri ân nghịch cảnh đã tôi luyện kim cương; từ đống tro tàn của bản ngã cũ, chân ngã thuần khiết bừng sáng thức tỉnh."
      }
    }
  },
  {
    "id": "swords_page",
    "number": 11,
    "roman": "Page",
    "nameEn": "Page of Swords",
    "nameVi": "Tiểu Đồng Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Nguyên tố Khí của Đất (Sứ giả lý trí)",
    "icon": "⚔️",
    "visualSymbol": "Chàng thiếu niên đứng trên đồi cỏ lộng gió, hai tay giương cao thanh gươm sắc bén với ánh mắt cảnh giác sắc sảo",
    "uprightKeywords": [
      "Tò mò học hỏi",
      "Tư duy sắc sảo",
      "Thông tin cảnh giác",
      "Giao tiếp thẳng thắn",
      "Người trẻ thông minh"
    ],
    "reversedKeywords": [
      "Xoi mói nhiều chuyện",
      "Nói nhiều làm ít",
      "Hung hăng hiếu chiến",
      "Tin tặc lừa đảo"
    ],
    "uprightMeaning": "Page of Swords mang đến nguồn năng lượng sắc sảo của trí tuệ trẻ trung. Bạn tràn đầy năng lượng khám phá, sẵn sàng học hỏi những kiến thức mới và thẳng thắn bảo vệ quan điểm chân lý của mình.",
    "reversedMeaning": "Tính tọc mạch xoi mói đời tư người khác, phát ngôn bừa bãi gây họa khẩu nghiệp, hoặc hành vi lừa đảo qua mạng internet.",
    "aspects": {
      "career": {
        "upright": "Phân tích số liệu sắc bén, nắm bắt nhanh các công nghệ AI và phần mềm mới, đề xuất các ý tưởng cải tiến độc đáo.",
        "reversed": "Gặp rắc rối vì phát ngôn thiếu chín chắn trên mạng xã hội, bị đồng nghiệp tẩy chay vì tính hay mách lẻo."
      },
      "love": {
        "upright": "Mối quan hệ dựa trên sự kích thích trí tuệ và tranh luận thông minh, thẳng thắn chia sẻ không giấu giếm điều gì.",
        "reversed": "Thường xuyên xoi mói bắt bẻ từng câu chữ của đối phương, nghi ngờ vô cớ kiểm tra trộm tin nhắn điện thoại."
      },
      "healthSpirit": {
        "upright": "Hệ thần kinh nhanh nhạy, phản xạ tốt, cần chú ý bảo vệ đường hô hấp và phổi trong những ngày thời tiết trở gió.",
        "reversed": "Viêm họng, ho gió, đau rát thanh quản do nói quá nhiều hoặc làm việc trong môi trường ô nhiễm khói bụi."
      },
      "dharmaAdvice": {
        "upright": "Dùng trí tuệ sắc bén để phân biệt chánh tà; dũng cảm nói lời chân thật bảo vệ người cô thế và chân lý đạo đức.",
        "reversed": "Tu khẩu nghiệp; 'Lời nói không là dao mà cắt lòng đau nhói', học cách im lặng lắng nghe nhiều hơn là tranh cãi."
      }
    }
  },
  {
    "id": "swords_knight",
    "number": 12,
    "roman": "Knight",
    "nameEn": "Knight of Swords",
    "nameVi": "Hiệp Sĩ Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Nguyên tố Khí của Khí (Chiến binh cuồng phong)",
    "icon": "⚔️",
    "visualSymbol": "Hiệp sĩ mặc giáp thép thúc ngựa phi như bay qua đồng hoang lộng gió, tay cầm gươm vung chém quyết liệt",
    "uprightKeywords": [
      "Tấn công chớp nhoáng",
      "Quyết đoán táo bạo",
      "Tham vọng ngút trời",
      "Trí tuệ sắc bén",
      "Hành động mãnh liệt"
    ],
    "reversedKeywords": [
      "Hấp tấp hung tợn",
      "Lời lẽ tàn nhẫn",
      "Cố chấp ngông cuồng",
      "Húc đầu vào đá"
    ],
    "uprightMeaning": "Knight of Swords là cơn cuồng phong trí tuệ không gì cản nổi. Khi phát hiện mục tiêu, bạn lao tới với sự quyết đoán phi thường và tốc độ ánh sáng, sẵn sàng san phẳng mọi chướng ngại cản đường.",
    "reversedMeaning": "Sự hung hăng mù quáng húc đầu vào đá, lời nói cay độc làm tan nát lòng người, hoặc thói tự cao ngông cuồng chuốc lấy thất bại ê chề.",
    "aspects": {
      "career": {
        "upright": "Tấn công thị trường chớp nhoáng đè bẹp đối thủ, quyết đoán xử lý khủng hoảng truyền thông trong vòng 24 giờ.",
        "reversed": "Kế hoạch kinh doanh bị phá sản do quá nôn nóng đốt cháy giai đoạn, gây bất hòa sâu sắc với toàn bộ ban điều hành."
      },
      "love": {
        "upright": "Bày tỏ tình cảm dứt khoát thẳng thắn, không ngần ngại đấu tranh bảo vệ người yêu trước mọi sóng gió bủa vây.",
        "reversed": "Tính khí nóng nảy gia trưởng, áp đặt suy nghĩ lên đối phương và làm tổn thương người yêu bằng những lời cay độc."
      },
      "healthSpirit": {
        "upright": "Phản xạ nhanh nhạy, sinh lực dồi dào, cần chú ý các biện pháp an toàn khi tham gia các hoạt động tốc độ cao.",
        "reversed": "Chấn thương sọ não hoặc gãy xương do tai nạn giao thông vì phóng nhanh vượt ẩu; sốt cao mê sảng."
      },
      "dharmaAdvice": {
        "upright": "Dùng dũng khí bạt núi lấp biển để chặt đứt lưới ma vô minh; không lùi bước trước bất kỳ nghịch cảnh nào.",
        "reversed": "Thu thúc tâm sân hận; dũng cảm chân chính là dũng cảm nhẫn nhục và bao dung chứ không phải hung hăng hiếu chiến."
      }
    }
  },
  {
    "id": "swords_queen",
    "number": 13,
    "roman": "Queen",
    "nameEn": "Queen of Swords",
    "nameVi": "Hoàng Hậu Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Nguyên tố Khí của Nước (Bậc thầy thấu suốt)",
    "icon": "⚔️",
    "visualSymbol": "Hoàng hậu ngồi nghiêng trên ngai đá chạm thiên thần, tay trái giơ cao đón nhận, tay phải cầm thanh gươm thẳng đứng hướng trời",
    "uprightKeywords": [
      "Minh triết sắc sảo",
      "Độc lập tự chủ",
      "Nhìn thấu bản chất",
      "Giao tiếp chuẩn xác",
      "Công tâm không thiên vị"
    ],
    "reversedKeywords": [
      "Cay độc lạnh lùng",
      "Định kiến cay nghiệt",
      "Cô độc cay đắng",
      "Trái tim băng giá"
    ],
    "uprightMeaning": "Queen of Swords là người phụ nữ từng trải qua muôn trùng đau thương nhưng đã tôi luyện nước mắt thành viên ngọc trí tuệ sáng ngời. Bà công tâm, sắc sảo, nhìn thấu mọi sự giả dối và luôn bảo vệ lẽ phải.",
    "reversedMeaning": "Trái tim hóa đá trở nên cay nghiệt độc đoán, luôn nhìn đời bằng ánh mắt xăm xoi phán xét và cô lập bản thân trong sự cay đắng.",
    "aspects": {
      "career": {
        "upright": "Nữ thẩm phán, kiểm toán viên, cố vấn chiến lược sắc sảo; bóc tách bản chất sự việc không ai có thể qua mắt được.",
        "reversed": "Bị cô lập tại công sở vì thái độ quá khắt khe cay nghiệt với cấp dưới, thiếu sự nâng đỡ bao dung của một người lãnh đạo."
      },
      "love": {
        "upright": "Mối quan hệ dựa trên sự tôn trọng trí tuệ và bình đẳng, thẳng thắn chia sẻ và tôn trọng không gian riêng của nhau.",
        "reversed": "Chiến tranh lạnh kéo dài, dùng sự mỉa mai cay độc trừng phạt người yêu khiến mối quan hệ đóng băng hoàn toàn."
      },
      "healthSpirit": {
        "upright": "Tâm trí minh mẫn sáng suốt, lối sống khoa học điều độ giúp duy trì thể trạng khỏe mạnh và tinh thần sảng khoái.",
        "reversed": "Khô mắt, suy giảm thị lực, các bệnh lý viêm xoang và đường hô hấp mạn tính do cơ thể thiếu độ ẩm cần thiết."
      },
      "dharmaAdvice": {
        "upright": "Dùng gươm tuệ chặt đứt mọi tơ vương chấp ái; sống đời thanh cao độc lập mà tràn đầy từ bi trí tuệ.",
        "reversed": "Làm tan chảy khối băng giá nơi trái tim; trí tuệ chân thật phải luôn được ấp ủ trong hơi ấm của tình thương đại đồng."
      }
    }
  },
  {
    "id": "swords_king",
    "number": 14,
    "roman": "King",
    "nameEn": "King of Swords",
    "nameVi": "Vua Kiếm",
    "arcana": "Minor",
    "suit": "Swords",
    "element": "Khí",
    "astrology": "Nguyên tố Khí của Hỏa (Vua công lý tối cao)",
    "icon": "⚔️",
    "visualSymbol": "Đức vua ngồi ngai đá nghiêm nghị cầm thanh gươm công lý thẳng đứng, sau lưng là bầu trời quang đãng và đàn chim liệng",
    "uprightKeywords": [
      "Chân lý tối thượng",
      "Quyền lực trí tuệ",
      "Kỷ luật thép",
      "Phán xét công minh",
      "Lãnh đạo bằng lý trí"
    ],
    "reversedKeywords": [
      "Độc tài tàn bạo",
      "Lạm dụng luật pháp",
      "Phán quyết bất công",
      "Thao túng xảo trá"
    ],
    "uprightMeaning": "King of Swords là biểu tượng tối cao của quyền lực trí tuệ và công lý. Ngài phán xét mọi việc bằng cái đầu lạnh, dựa trên sự thật và luật pháp nghiêm minh, không bị lung lạc bởi cảm xúc thiên vị.",
    "reversedMeaning": "Sự độc tài tàn bạo, lạm dụng quyền lực pháp luật để đàn áp người khác, hoặc dùng trí tuệ siêu việt vào những âm mưu xảo trá đen tối.",
    "aspects": {
      "career": {
        "upright": "Luật sư kỳ cựu, thẩm phán công minh, lãnh đạo tài ba đưa ra các quyết định chiến lược sáng suốt đưa tổ chức vươn tầm.",
        "reversed": "Gặp rắc rối lớn về tranh chấp pháp lý, bị cấp trên độc đoán vùi dập, quyết định đầu tư sai lầm vì quá bảo thủ."
      },
      "love": {
        "upright": "Mối quan hệ nghiêm túc dựa trên sự tôn trọng nguyên tắc và đạo đức, đối phương là chỗ dựa trí tuệ vững chắc đáng tin cậy.",
        "reversed": "Mối quan hệ ngột ngạt như trong trại lính, đối phương gia trưởng xét nét từng hành vi nhỏ nhặt thiếu đi sự ấm áp."
      },
      "healthSpirit": {
        "upright": "Kỷ luật thép trong chế độ ăn uống và tập luyện giúp duy trì thể hình lý tưởng và sức khỏe dẻo dai tuyệt vời.",
        "reversed": "Huyết áp cao, xơ cứng động mạch, căng thẳng thần kinh quá mức do luôn phải gồng mình giải quyết các vấn đề phức tạp."
      },
      "dharmaAdvice": {
        "upright": "Thực hành Chánh Tư Duy và Chánh Kiến. Dùng thanh bảo kiếm trí tuệ phụng sự công lý và bảo vệ nền hòa bình nhân loại.",
        "reversed": "Hạ bớt sự nghiêm khắc khắc nghiệt; luật pháp nghiêm minh nhưng cần có lòng từ bi dung thứ cho những lỗi lầm vô ý của chúng sinh."
      }
    }
  },
  {
    "id": "pentacles_ace",
    "number": 1,
    "roman": "Ace",
    "nameEn": "Ace of Pentacles",
    "nameVi": "Át Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Nguyên tố Địa sơ khai",
    "icon": "🪙",
    "visualSymbol": "Bàn tay thần từ mây nâng đồng tiền vàng khắc ngôi sao năm cánh lơ lửng trên khu vườn hoa hồng và cổng vòm bách thảo",
    "uprightKeywords": [
      "Hạt giống tài lộc",
      "Cơ hội thịnh vượng",
      "Nền tảng vững chắc",
      "Đầu tư sinh lời",
      "Phước báu vật chất"
    ],
    "reversedKeywords": [
      "Bỏ lỡ cơ hội làm giàu",
      "Đầu tư thua lỗ",
      "Thiếu nền tảng tài chính",
      "Chi tiêu hoang phí"
    ],
    "uprightMeaning": "Ace of Pentacles là hạt giống tài lộc màu mỡ vũ trụ trao vào tay bạn. Một cơ hội kinh doanh sinh lời, một công việc đãi ngộ cao hoặc nguồn vốn vững chắc đang mở ra con đường thịnh vượng bền lâu.",
    "reversedMeaning": "Cơ hội tài chính bị tuột mất do do dự, đầu tư vào dự án bánh vẽ thiếu tính thực tế dẫn đến thất thoát tiền của.",
    "aspects": {
      "career": {
        "upright": "Ký hợp đồng nhận việc với mức lương hấp dẫn, nhận được khoản vốn đầu tư thiên thần, khởi nghiệp trên nền tảng vững vàng.",
        "reversed": "Dự án xin vốn bị từ chối, hợp đồng kinh doanh bị hủy bỏ phút chót, khó khăn về dòng tiền thanh khoản ban đầu."
      },
      "love": {
        "upright": "Tình yêu xây dựng trên nền tảng thực tế vững chắc, cùng nhau tích lũy tài chính mua nhà dựng xây tổ ấm tương lai.",
        "reversed": "Mối quan hệ rạn nứt vì gánh nặng tiền bạc, bất đồng quan điểm chi tiêu giữa hai người gây căng thẳng."
      },
      "healthSpirit": {
        "upright": "Thể trạng dồi dào sung mãn, bắt đầu chế độ dinh dưỡng lành mạnh và tập luyện bài bản đem lại kết quả rõ rệt.",
        "reversed": "Suy dinh dưỡng hoặc lười vận động, các vấn đề liên quan đến xương khớp và hấp thu dưỡng chất kém."
      },
      "dharmaAdvice": {
        "upright": "Xem tài sản vật chất như phương tiện gieo trồng phước điền; thực hành hạnh Bố Thí Ba La Mật (Dana) cứu giúp người nghèo khó.",
        "reversed": "Tránh tham lam tích trữ của cải bất chính; nhận ra vàng bạc châu báu chỉ là phù du nếu không có đạo đức dẫn đường."
      }
    }
  },
  {
    "id": "pentacles_two",
    "number": 2,
    "roman": "2",
    "nameEn": "Two of Pentacles",
    "nameVi": "Hai Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Mộc Tinh tại Ma Kết",
    "icon": "🪙",
    "visualSymbol": "Chàng trai nhảy múa tung hứng hai đồng tiền vàng trong dải băng vô cực ∞, sau lưng là hai con thuyền cưỡi sóng gió nhấp nhô",
    "uprightKeywords": [
      "Cân bằng tài chính",
      "Thích ứng linh hoạt",
      "Xoay sở đa nhiệm",
      "Dòng tiền lưu thông",
      "Lạc quan trước biến động"
    ],
    "reversedKeywords": [
      "Mất cân bằng tài chính",
      "Nợ nần chồng chất",
      "Quá tải đa nhiệm",
      "Quyết định tài chính sai lầm"
    ],
    "uprightMeaning": "Two of Pentacles thể hiện nghệ thuật tung hứng cân bằng cuộc sống và tài chính. Dù cuộc đời có thăng trầm sóng gió, bạn vẫn uyển chuyển xoay sở nhịp nhàng và duy trì được sự ổn định vui vẻ.",
    "reversedMeaning": "Mất cân bằng nghiêm trọng, nợ nần bủa vây do chi tiêu vung tay quá trán, quá tải vì ôm đồm quá nhiều dự án cùng lúc.",
    "aspects": {
      "career": {
        "upright": "Khéo léo xoay sở nhiều công việc freelance cùng lúc, linh hoạt chuyển đổi mô hình kinh doanh thích nghi với thị trường.",
        "reversed": "Dòng tiền doanh nghiệp bị tắc nghẽn, mất khả năng thanh toán các khoản nợ đến hạn, kiệt sức vì làm việc quá sức."
      },
      "love": {
        "upright": "Cùng nhau khéo léo vun vén chi tiêu gia đình vượt qua giai đoạn khó khăn kinh tế, tình cảm càng thêm gắn bó son sắt.",
        "reversed": "Bận rộn kiếm tiền đến mức không còn thời gian dành cho người yêu, bỏ bê tình cảm khiến khoảng cách ngày càng xa."
      },
      "healthSpirit": {
        "upright": "Cần duy trì sự cân bằng giữa làm việc và nghỉ ngơi, tham gia các bài tập giữ thăng bằng như yoga và thái cực quyền.",
        "reversed": "Rối loạn tiền đình, hoa mắt chóng mặt do căng thẳng xoay sở tài chính và thiếu ngủ trầm trọng kéo dài."
      },
      "dharmaAdvice": {
        "upright": "Hành trì Trung Đạo giữa đời thường; sống linh hoạt tùy duyên mà bất biến trước mọi đổi thay của thế sự.",
        "reversed": "Đơn giản hóa cuộc sống (Minimalism); buông bỏ bớt những nhu cầu không cần thiết để giảm bớt gánh nặng tâm trí."
      }
    }
  },
  {
    "id": "pentacles_three",
    "number": 3,
    "roman": "3",
    "nameEn": "Three of Pentacles",
    "nameVi": "Ba Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Hỏa Tinh tại Ma Kết",
    "icon": "🪙",
    "visualSymbol": "Người thợ chạm khắc đá trẻ tuổi đứng trên bục chăm chú thi công nhà thờ lớn, bên cạnh là vị linh mục và kiến trúc sư cầm bản vẽ cố vấn",
    "uprightKeywords": [
      "Tay nghề tinh xảo",
      "Làm việc nhóm xuất sắc",
      "Chuyên môn vững vàng",
      "Xây dựng kiệt tác",
      "Được công nhận tài năng"
    ],
    "reversedKeywords": [
      "Thiếu hợp tác đồng đội",
      "Tay nghề kém cỏi",
      "Làm việc cẩu thả",
      "Thiếu sự tôn trọng chuyên môn"
    ],
    "uprightMeaning": "Three of Pentacles tôn vinh tinh thần làm việc nhóm và tay nghề chuyên môn bậc thầy. Khi bạn kết hợp tài năng cá nhân với sự cố vấn của chuyên gia, một kiệt tác bền vững ngàn năm sẽ được tạo dựng.",
    "reversedMeaning": "Xung đột bất đồng trong nhóm làm việc, sự cẩu thả thiếu trách nhiệm làm hỏng dự án, hoặc cái tôi quá lớn không chịu lắng nghe đồng nghiệp.",
    "aspects": {
      "career": {
        "upright": "Được khen ngợi về năng lực chuyên môn xuất sắc, thăng tiến nhờ tinh thần đồng đội tuyệt vời, hoàn thành xuất sắc công trình lớn.",
        "reversed": "Dự án bị đình chỉ do thi công kém chất lượng, tranh cãi gay gắt giữa các thành viên trong nhóm về phân chia công việc."
      },
      "love": {
        "upright": "Cùng nhau chung tay xây dựng nền móng gia đình vững chắc, tôn trọng và học hỏi từ những điểm mạnh của nhau.",
        "reversed": "Thiếu sự phối hợp chia sẻ việc nhà, một bên coi thường đóng góp của bên kia làm rạn nứt tình cảm vợ chồng."
      },
      "healthSpirit": {
        "upright": "Tuân thủ nghiêm ngặt phác đồ điều trị của bác sĩ chuyên khoa đem lại kết quả phục hồi sức khỏe mỹ mãn.",
        "reversed": "Tự ý chữa bệnh theo các mẹo vặt trên mạng gây biến chứng, cần tìm đến các cơ sở y tế uy tín để thăm khám."
      },
      "dharmaAdvice": {
        "upright": "Tâm niệm phụng sự qua từng hành động nhỏ nhất; làm việc với tâm thành kính và sự cẩn trọng như xây đền cho Phật.",
        "reversed": "Học hạnh khiêm tốn lắng nghe bậc tiền bối; không tự mãn với chút tài mọn mà đánh mất cơ hội hoàn thiện bản thân."
      }
    }
  },
  {
    "id": "pentacles_four",
    "number": 4,
    "roman": "4",
    "nameEn": "Four of Pentacles",
    "nameVi": "Bốn Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Mặt Trời tại Ma Kết",
    "icon": "🪙",
    "visualSymbol": "Người đàn ông ngồi ôm khư khư đồng tiền vàng trước ngực, hai chân giẫm lên hai đồng tiền và một đồng đội trên đầu",
    "uprightKeywords": [
      "Bảo toàn tài sản",
      "Tiết kiệm tích lũy",
      "Kiểm soát an toàn",
      "Bám víu cố chấp",
      "Sợ hãi mất mát"
    ],
    "reversedKeywords": [
      "Phá vỡ bế tắc",
      "Chi tiêu hào phóng",
      "Phá sản mất của",
      "Học cách buông xả"
    ],
    "uprightMeaning": "Four of Pentacles phản ánh nhu cầu an toàn tài chính vững chắc. Tuy nhiên, sự bám víu khư khư quá mức có thể biến bạn thành kẻ keo kiệt bủn xỉn, chặn đứng dòng chảy lưu thông tự nhiên của tài lộc và tình cảm.",
    "reversedMeaning": "Học được bài học mở rộng lòng mình chia sẻ tài chính với tha nhân, hoặc cảnh báo nguy cơ mất mát tài sản do đầu tư mạo hiểm.",
    "aspects": {
      "career": {
        "upright": "Bảo toàn vốn an toàn trong giai đoạn khủng hoảng, giữ vững vị trí công việc ổn định, tích lũy tài chính có kỷ luật.",
        "reversed": "Bỏ lỡ cơ hội đầu tư bứt phá vì quá nhút nhát sợ rủi ro, môi trường làm việc bảo thủ kìm hãm sáng tạo."
      },
      "love": {
        "upright": "Mong muốn sự ổn định lâu dài trong tình yêu, nhưng coi chừng tính sở hữu ghen tuông kiểm soát thái quá làm ngột ngạt đối phương.",
        "reversed": "Mở lòng tin tưởng đối phương, buông bỏ sự kiểm soát đời tư của người yêu giúp tình cảm ấm êm trở lại."
      },
      "healthSpirit": {
        "upright": "Cần chú ý các bài tập kéo giãn cơ thể và tập hít thở sâu để giải phóng năng lượng ứ trệ do thói quen co cụm.",
        "reversed": "Táo bón, sỏi thận hoặc các chứng bệnh tắc nghẽn mạch máu do cơ thể thiếu sự lưu thông và vận động linh hoạt."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu 'Tài sản như dòng nước chảy, giữ lại thành ao tù nước đọng, lưu thông thành đại dương bao la'.",
        "reversed": "Phá trừ tâm bỏn xẻn ích kỷ (Macchariya); bố thí cúng dường gieo mầm phước đức cho muôn kiếp vị lai."
      }
    }
  },
  {
    "id": "pentacles_five",
    "number": 5,
    "roman": "5",
    "nameEn": "Five of Pentacles",
    "nameVi": "Năm Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Thủy Tinh tại Kim Ngưu",
    "icon": "🪙",
    "visualSymbol": "Hai người ăn mày tàn tật rách rưới lê bước trong bão tuyết lạnh giá, ngó lơ cửa sổ kính màu ấm áp của nhà thờ phía trên",
    "uprightKeywords": [
      "Khó khăn tài chính",
      "Cảm giác cô độc",
      "Mất mát nghèo túng",
      "Bỏ rơi lạnh giá",
      "Hy vọng bị bỏ quên"
    ],
    "reversedKeywords": [
      "Vượt qua nghèo khó",
      "Tìm thấy ánh sáng ấm áp",
      "Nhận được sự trợ giúp",
      "Phục hồi tài chính"
    ],
    "uprightMeaning": "Five of Pentacles là đêm đông lạnh giá của sự thiếu thốn vật chất và cô đơn tột cùng. Tuy nhiên, ngay trên đầu bạn chính là khung cửa sổ nhà thờ ấm áp; chỉ cần ngước mắt lên gõ cửa, sự trợ giúp luôn sẵn sàng.",
    "reversedMeaning": "Cơn bão tuyết tan dần, bạn nhận được sự giúp đỡ kịp thời từ quý nhân, tìm được việc làm mới và thoát khỏi cảnh bế tắc tài chính.",
    "aspects": {
      "career": {
        "upright": "Mất việc, phá sản, thất thoát tài chính nghiêm trọng; cần dũng cảm hạ thấp cái tôi để tìm kiếm sự cứu trợ từ cộng đồng.",
        "reversed": "Tìm được công việc mới sau thời gian dài thất nghiệp, doanh nghiệp tái cấu trúc thành công và dần phục hồi doanh thu."
      },
      "love": {
        "upright": "Cảm giác bị người yêu bỏ rơi lạnh nhạt, cùng nhau trải qua giai đoạn nghèo khó thử thách lòng thủy chung của đôi lứa.",
        "reversed": "Cùng nhau vượt qua cơn bĩ cực kinh tế, tình yêu được sưởi ấm trở lại sau chuỗi ngày xa cách lạnh lùng."
      },
      "healthSpirit": {
        "upright": "Cơ thể suy nhược do thiếu dinh dưỡng và thời tiết khắc nghiệt, cần giữ ấm cơ thể và bổ sung vitamin cần thiết.",
        "reversed": "Hồi phục sức khỏe sau cơn bạo bệnh, tìm được phương pháp điều trị đúng thầy đúng thuốc giúp tiết kiệm chi phí."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu nhân duyên nghèo khó do nghiệp bỏn xẻn đời trước; nương tựa Tam Bảo tìm nơi trú ngụ tâm linh bình an.",
        "reversed": "Mở rộng lòng từ bi trắc ẩn với những mảnh đời bất hạnh; san sẻ chén cơm manh áo sưởi ấm mùa đông nhân thế."
      }
    }
  },
  {
    "id": "pentacles_six",
    "number": 6,
    "roman": "6",
    "nameEn": "Six of Pentacles",
    "nameVi": "Sáu Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Mặt Trăng tại Kim Ngưu",
    "icon": "🪙",
    "visualSymbol": "Vị thương nhân giàu có tay cầm cán cân công lý, tay kia phân phát tiền vàng cho hai người nghèo khó quỳ dưới chân",
    "uprightKeywords": [
      "Hào phóng từ thiện",
      "Cho và nhận cân bằng",
      "Sự đền đáp công bằng",
      "Quý nhân nâng đỡ",
      "Chia sẻ tài lộc"
    ],
    "reversedKeywords": [
      "Bố thí ban ơn trịch thượng",
      "Lừa đảo từ thiện",
      "Nợ nần khó đòi",
      "Bất công quyền lợi"
    ],
    "uprightMeaning": "Six of Pentacles là dòng chảy cân bằng tuyệt mỹ của luật Nhân Quả qua hành động Cho và Nhận. Bạn có thể là người giàu lòng hảo tâm chia sẻ tài lộc, hoặc là người đón nhận sự trợ giúp quý báu lúc ngặt nghèo.",
    "reversedMeaning": "Sự cho đi với thái độ ban ơn trịch thượng coi thường người khác, bị lừa đảo lợi dụng lòng tốt, hoặc nợ nần không chịu trả.",
    "aspects": {
      "career": {
        "upright": "Được nhận học bổng, được nhà đầu tư rót vốn, hoặc được thưởng xứng đáng với công sức cống hiến cho công ty.",
        "reversed": "Bất công trong phân chia hoa hồng lợi nhuận, bị cấp trên chèn ép bớt xén tiền lương và quyền lợi chính đáng."
      },
      "love": {
        "upright": "Mối quan hệ bình đẳng và hào phóng, cả hai cùng biết chăm sóc và đáp ứng nhu cầu cảm xúc và vật chất của nhau.",
        "reversed": "Mối quan hệ một chiều 'đại gia - chân dài' phụ thuộc tiền bạc, một bên dùng tiền để kiểm soát và thao túng đối phương."
      },
      "healthSpirit": {
        "upright": "Sức khỏe dồi dào, có điều kiện kinh tế để tiếp cận các dịch vụ y tế và chăm sóc sức khỏe chất lượng cao nhất.",
        "reversed": "Cần cẩn thận khi sử dụng các khoản vay mượn chi trả tiền viện phí, tránh rơi vào bẫy tín dụng đen nguy hiểm."
      },
      "dharmaAdvice": {
        "upright": "Thực hành 'Tam Luân Không Tịch' khi bố thí: Không thấy mình là người cho, không thấy người nhận, không thấy vật cho.",
        "reversed": "Cho đi với tâm bình đẳng không cầu danh; phước đức sâu dày nằm ở tấm lòng chân thật chứ không ở số tiền nhiều hay ít."
      }
    }
  },
  {
    "id": "pentacles_seven",
    "number": 7,
    "roman": "7",
    "nameEn": "Seven of Pentacles",
    "nameVi": "Bảy Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Thổ Tinh tại Kim Ngưu",
    "icon": "🪙",
    "visualSymbol": "Người nông dân chống cuốc đứng ngắm nhìn bụi cây trĩu quả 7 đồng tiền vàng với ánh mắt suy tư kiên nhẫn",
    "uprightKeywords": [
      "Kiên nhẫn chờ đợi",
      "Đánh giá thành quả",
      "Đầu tư dài hạn",
      "Thu hoạch sắp tới",
      "Bước ngoặt chiến lược"
    ],
    "reversedKeywords": [
      "Nóng vội mất kiên nhẫn",
      "Nỗ lực không kết quả",
      "Đầu tư sai lầm",
      "Lãng phí công sức"
    ],
    "uprightMeaning": "Seven of Pentacles là khoảng lặng chiêm nghiệm của người gieo hạt. Bạn đã đổ bao mồ hôi công sức vun xới, giờ là lúc kiên nhẫn chờ hoa thơm kết trái và đánh giá lại xem có cần điều chỉnh chiến lược hay không.",
    "reversedMeaning": "Sự sốt ruột nóng vội muốn gặt hái khi quả chưa chín, hoặc nhận ra đã đầu tư công sức vào mảnh đất cằn cỗi không mang lại tương lai.",
    "aspects": {
      "career": {
        "upright": "Thời điểm tổng kết đánh giá dự án sau một năm thi công, chuẩn bị thu hoạch lợi nhuận từ các khoản đầu tư dài hạn.",
        "reversed": "Kế hoạch đầu tư chậm sinh lời khiến nản lòng, làm việc cật lực nhưng kết quả thu về không tương xứng với công sức."
      },
      "love": {
        "upright": "Tình cảm chín muồi sau thời gian dài cùng nhau vun đắp, chuẩn bị bước sang giai đoạn cam kết hôn nhân vững chắc.",
        "reversed": "Cảm thấy mối quan hệ dậm chân tại chỗ không phát triển, tự hỏi liệu có nên tiếp tục đầu tư thời gian cho người này."
      },
      "healthSpirit": {
        "upright": "Kết quả xét nghiệm sức khỏe cải thiện rõ rệt sau nhiều tháng kiên trì ăn kiêng và tập luyện thể dục đều đặn.",
        "reversed": "Bỏ cuộc giữa chừng trong quá trình điều trị phục hồi, thiếu kiên nhẫn làm gián đoạn hiệu quả của thuốc."
      },
      "dharmaAdvice": {
        "upright": "Quán chiếu luật Nhân Quả: Có gieo ắt có gặt. Kiên trì tu tập vun bồi cội phước, quả ngọt bồ đề tự khắc viên thành.",
        "reversed": "Đừng nóng vội mong cầu chứng đắc; việc tu tập như mài thanh sắt thành kim, cần công phu bền bỉ qua năm tháng."
      }
    }
  },
  {
    "id": "pentacles_eight",
    "number": 8,
    "roman": "8",
    "nameEn": "Eight of Pentacles",
    "nameVi": "Tám Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Mặt Trời tại Xử Nữ",
    "icon": "🪙",
    "visualSymbol": "Người thợ trẻ tuổi ngồi bên bàn chăm chú dùng búa đục từng đồng tiền vàng tỉ mỉ, 7 đồng tiền đã hoàn tất treo trên cột",
    "uprightKeywords": [
      "Chuyên tâm rèn luyện",
      "Tay nghề bậc thầy",
      "Cần cù tỉ mỉ",
      "Chi tiết hoàn hảo",
      "Học việc thành tài"
    ],
    "reversedKeywords": [
      "Lười biếng thiếu kỷ luật",
      "Làm ẩu cẩu thả",
      "Thiếu định hướng nghề nghiệp",
      "Mất hứng thú làm việc"
    ],
    "uprightMeaning": "Eight of Pentacles là hình mẫu của sự kiên trì và niềm say mê lao động chân chính. Bằng cách tập trung cao độ vào từng chi tiết nhỏ nhất, bạn đang từng bước nâng tầm kỹ năng của mình lên hàng kiệt tác.",
    "reversedMeaning": "Thói làm việc ẩu tả cẩu thả để đối phó, thiếu kiên nhẫn rèn luyện kỹ năng cơ bản, hoặc cảm giác nhàm chán lặp đi lặp lại như một cỗ máy.",
    "aspects": {
      "career": {
        "upright": "Nâng cao tay nghề chuyên môn qua các khóa đào tạo chuyên sâu, hoàn thành xuất sắc các nhiệm vụ đòi hỏi độ chính xác cao.",
        "reversed": "Chất lượng sản phẩm bị khách hàng phàn nàn do làm ẩu, thiếu tập trung dẫn đến sai sót số liệu kế toán nghiêm trọng."
      },
      "love": {
        "upright": "Tỉ mỉ vun vén cho tình yêu từng ngày từ những quan tâm nhỏ nhặt nhất, xây dựng mối quan hệ bền bỉ bằng sự chân thành.",
        "reversed": "Quá mải mê công việc mà bỏ bê đối phương, tình yêu trở nên khô khan thiếu đi sự lãng mạn và gia vị cảm xúc."
      },
      "healthSpirit": {
        "upright": "Kỷ luật luyện tập thể thao đều đặn mỗi ngày mang lại vóc dáng săn chắc và hệ miễn dịch cực kỳ khỏe mạnh.",
        "reversed": "Hội chứng chấn thương do vận động lặp đi lặp lại (RSI), đau cổ tay do gõ bàn phím hoặc thao tác máy móc liên tục."
      },
      "dharmaAdvice": {
        "upright": "Thiền trong từng hành động công việc (Chánh Niệm trong công việc). Biến mỗi giây phút lao động thành thời khắc tỉnh thức thiêng liêng.",
        "reversed": "Tránh rơi vào bệnh cầu toàn máy móc; giữ tâm hồn rộng mở linh hoạt, không để tiểu tiết làm lu mờ bức tranh toàn cảnh."
      }
    }
  },
  {
    "id": "pentacles_nine",
    "number": 9,
    "roman": "9",
    "nameEn": "Nine of Pentacles",
    "nameVi": "Chín Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Kim Tinh tại Xử Nữ",
    "icon": "🪙",
    "visualSymbol": "Người phụ nữ quý phái mặc áo lụa hoa đứng giữa vườn nho trĩu quả vàng, tay đeo găng nâng chim ưng săn mồi thuần hóa",
    "uprightKeywords": [
      "Độc lập sung túc",
      "Thanh lịch tự chủ",
      "Thành quả viên mãn",
      "Tận hưởng cuộc sống",
      "Khu vườn an lạc"
    ],
    "reversedKeywords": [
      "Phụ thuộc tài chính",
      "Cô độc giàu sang",
      "Chi tiêu hoang tàng",
      "Hư danh hào nhoáng"
    ],
    "uprightMeaning": "Nine of Pentacles là bức tranh tuyệt mỹ của người phụ nữ tự chủ, độc lập và thịnh vượng. Bạn đã tự tay gây dựng nên cơ đồ bằng chính tài năng và sự kỷ luật của mình, giờ là lúc an nhiên thụ hưởng thành quả.",
    "reversedMeaning": "Sống phụ thuộc vào tiền chu cấp của người khác, cảm giác cô độc trống rỗng giữa đống của cải nhung lụa, hoặc nguy cơ phá sản vì lối sống xa hoa.",
    "aspects": {
      "career": {
        "upright": "Đạt tự do tài chính, sở hữu bất động sản giá trị, tận hưởng thành quả sau nhiều năm lao động miệt mài không ngừng nghỉ.",
        "reversed": "Mất cân bằng tài chính do mua sắm hàng hiệu quá đà, đầu tư bất động sản gặp trục trặc pháp lý."
      },
      "love": {
        "upright": "Người phụ nữ độc lập quyến rũ không cần dựa dẫm vào ai, nếu yêu là vì sự đồng điệu tâm hồn chứ không vì vật chất.",
        "reversed": "Tự ti về hoàn cảnh kinh tế hoặc ngược lại, quá kiêu kỳ khiến các đối tượng tiềm năng e ngại không dám tiếp cận."
      },
      "healthSpirit": {
        "upright": "Sức khỏe dồi dào, nhan sắc trẻ trung quý phái nhờ chế độ dinh dưỡng hữu cơ và chăm sóc spa dưỡng sinh định kỳ.",
        "reversed": "Lười vận động thể chất do lối sống quá tiện nghi, cần hòa mình vào thiên nhiên và tham gia lao động chân tay nhẹ nhàng."
      },
      "dharmaAdvice": {
        "upright": "Tâm an nhiên tự tại giữa cảnh đời nhung lụa; 'Ở đời vui đạo hãy tùy duyên, đói đến thì ăn mệt ngủ liền'.",
        "reversed": "Nhận rõ bản chất phù du của danh lợi; đừng để sự giàu sang vật chất biến thành sợi dây xích vàng trói buộc tâm linh."
      }
    }
  },
  {
    "id": "pentacles_ten",
    "number": 10,
    "roman": "10",
    "nameEn": "Ten of Pentacles",
    "nameVi": "Mười Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Thủy Tinh tại Xử Nữ",
    "icon": "🪙",
    "visualSymbol": "Ba thế hệ gia đình quây quần dưới cổng vòm dinh thự cổ kính bên hai chú chó săn trung thành, 10 đồng tiền vàng xếp thành Cây Sự Sống",
    "uprightKeywords": [
      "Di sản gia tộc",
      "Thịnh vượng muôn đời",
      "Gia đạo hưng long",
      "Vững bền truyền đời",
      "Phúc lộc tràn trề"
    ],
    "reversedKeywords": [
      "Tranh chấp thừa kế",
      "Gia đạo sa sút",
      "Mất mát tài sản tổ tiên",
      "Ràng buộc gia tộc nặng nề"
    ],
    "uprightMeaning": "Ten of Pentacles là đỉnh cao viên mãn của sự thịnh vượng vật chất và di sản gia tộc truyền đời. Thành quả bạn xây dựng không chỉ đảm bảo ấm no cho bản thân mà còn để lại phước lộc dồi dào cho con cháu mai sau.",
    "reversedMeaning": "Tranh chấp tài sản thừa kế gay gắt giữa anh em ruột thịt, gia đình sa sút do con cháu phá tán của cải tổ tiên để lại.",
    "aspects": {
      "career": {
        "upright": "Doanh nghiệp gia đình phát đạt hưng thịnh, ký kết hợp đồng sáp nhập quy mô lớn, xây dựng thương hiệu uy tín lâu đời.",
        "reversed": "Mâu thuẫn quyền lực nội bộ giữa các thế hệ trong công ty gia đình, nguy cơ phá sản vì quản lý tài chính lỏng lẻo."
      },
      "love": {
        "upright": "Hôn nhân môn đăng hộ đối được hai bên dòng họ ủng hộ chúc phúc, xây dựng cơ đồ gia đình vững như bàn thạch.",
        "reversed": "Áp lực định kiến gia đình ngăn cản tình yêu, xung đột gay gắt về việc phân chia tài sản trước hôn nhân."
      },
      "healthSpirit": {
        "upright": "Trường thọ, sống vui vầy bên con cháu đuề huề, nguồn gen di truyền khỏe mạnh và môi trường sống lý tưởng.",
        "reversed": "Các bệnh lý mạn tính di truyền trong gia tộc (tiểu đường, tim mạch), cần kiểm tra tầm soát sức khỏe định kỳ."
      },
      "dharmaAdvice": {
        "upright": "Tích đức cho con cháu; 'Gia đình tích thiện ắt có dư dả niềm vui', để lại cho đời sau di sản đạo đức thanh cao.",
        "reversed": "Hóa giải tranh chấp đất đai bằng lòng bao dung hiếu thuận; của cải trần gian chết có mang theo được đâu mà tương tàn."
      }
    }
  },
  {
    "id": "pentacles_page",
    "number": 11,
    "roman": "Page",
    "nameEn": "Page of Pentacles",
    "nameVi": "Tiểu Đồng Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Nguyên tố Đất của Đất (Sứ giả thực tế)",
    "icon": "🪙",
    "visualSymbol": "Chàng thiếu niên đứng giữa cánh đồng màu mỡ nâng niu đồng tiền vàng bằng cả hai tay với ánh mắt say mê",
    "uprightKeywords": [
      "Khát vọng học hỏi",
      "Hạt giống tài năng",
      "Chăm chỉ thực tế",
      "Cơ hội nghề nghiệp",
      "Kế hoạch tài chính mới"
    ],
    "reversedKeywords": [
      "Lười biếng thiếu tập trung",
      "Bỏ lỡ cơ hội học tập",
      "Thực dụng thiển cận",
      "Lãng phí tiền bạc"
    ],
    "uprightMeaning": "Page of Pentacles mang đến tinh thần ham học hỏi và khát vọng lập thân thực tế. Bạn sắp nhận được tin vui về học bổng, việc làm mới hoặc cơ hội bắt đầu một dự án tài chính đầy triển vọng.",
    "reversedMeaning": "Thói lười biếng ham chơi bỏ bê việc học hành, thiếu mục tiêu nghề nghiệp rõ ràng, hoặc tư duy thực dụng thiển cận.",
    "aspects": {
      "career": {
        "upright": "Khởi đầu công việc mới với thái độ cầu tiến chăm chỉ, học hỏi kiến thức đầu tư tài chính căn bản cực kỳ bài bản.",
        "reversed": "Thất bại trong kỳ thi tuyển dụng do thiếu chuẩn bị, thái độ làm việc thụ động chờ giao việc mới làm."
      },
      "love": {
        "upright": "Tình yêu bắt đầu từ sự nghiêm túc và thực tế, cả hai cùng chia sẻ mục tiêu xây dựng sự nghiệp vững chắc cho tương lai.",
        "reversed": "Đối phương thực dụng tính toán quá mức trong chuyện tiền bạc, tình cảm thiếu đi sự lãng mạn và nồng nhiệt."
      },
      "healthSpirit": {
        "upright": "Thể trạng khỏe khoắn, duy trì thói quen ăn uống khoa học và bắt đầu lộ trình rèn luyện thể chất bài bản.",
        "reversed": "Lười vận động, ngồi sai tư thế học tập gây cong vẹo cột sống và cận thị, cần ra ngoài hít thở khí trời."
      },
      "dharmaAdvice": {
        "upright": "Trân trọng từng cơ hội gieo mầm phúc đức; học đạo từ những điều bình dị giản đơn nhất trong cuộc sống hằng ngày.",
        "reversed": "Nuôi dưỡng chí lập thân bền bỉ; ngọc không mài không sáng, người không học không biết đạo lý làm người."
      }
    }
  },
  {
    "id": "pentacles_knight",
    "number": 12,
    "roman": "Knight",
    "nameEn": "Knight of Pentacles",
    "nameVi": "Hiệp Sĩ Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Nguyên tố Đất của Khí (Chiến binh bền bỉ)",
    "icon": "🪙",
    "visualSymbol": "Hiệp sĩ mặc giáp dày cưỡi ngựa ô đứng lặng im quan sát cánh đồng đã cày xới thẳng tắp, tay cầm đồng tiền vàng",
    "uprightKeywords": [
      "Bền bỉ như đá",
      "Trách nhiệm tận tụy",
      "Cần cù chăm chỉ",
      "Thực tế đáng tin",
      "Tiến bước vững chắc"
    ],
    "reversedKeywords": [
      "Cứng nhắc bảo thủ",
      "Lười biếng trì trệ",
      "Sống mòn tẻ nhạt",
      "Tham công tiếc việc"
    ],
    "uprightMeaning": "Knight of Pentacles là hiện thân của sự cần cù, trách nhiệm và tính kiên định tuyệt đối. Dù không quá nhanh nhẹn hay hoa mỹ, nhưng từng bước chân vững chắc của bạn đảm bảo chắc chắn sẽ cán đích thành công.",
    "reversedMeaning": "Sự cứng nhắc bảo thủ không chịu đổi mới, lối sống đơn điệu tẻ nhạt đến ngột ngạt, hoặc sự trì trệ lười biếng không chịu nhúc nhích.",
    "aspects": {
      "career": {
        "upright": "Hoàn thành công việc với độ tin cậy tuyệt đối 100%, được cấp trên tín nhiệm giao phó quản lý ngân sách trọng yếu.",
        "reversed": "Công việc trì trệ dậm chân tại chỗ do sự cầu toàn thái quá và chậm chạp trong việc ra quyết định."
      },
      "love": {
        "upright": "Người bạn đời chung thủy son sắt đáng tin cậy nhất thế gian, tình yêu bình dị nhưng vững chắc như bàn thạch.",
        "reversed": "Mối quan hệ trở nên tẻ nhạt thiếu lửa, đối phương quá khô khan chỉ biết đến công việc mà quên mất sự lãng mạn."
      },
      "healthSpirit": {
        "upright": "Sức bền thể lực phi thường, cơ bắp dẻo dai khỏe mạnh nhờ lối sống kỷ luật và sinh hoạt điều độ nghiêm ngặt.",
        "reversed": "Đau mỏi cơ bắp và khớp gối do làm việc nặng nhọc kéo dài, cần chú ý nghỉ ngơi thư giãn hợp lý."
      },
      "dharmaAdvice": {
        "upright": "Hành trì Ba La Mật bằng sự nhẫn nại bền bỉ qua năm tháng; từng bước chân chánh niệm vững chãi đưa tới bờ giác ngộ.",
        "reversed": "Mở rộng tầm nhìn tránh chấp thủ giáo điều cứng nhắc; linh hoạt tùy duyên ứng biến để việc tu học đem lại lợi lạc."
      }
    }
  },
  {
    "id": "pentacles_queen",
    "number": 13,
    "roman": "Queen",
    "nameEn": "Queen of Pentacles",
    "nameVi": "Hoàng Hậu Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Nguyên tố Đất của Nước (Mẹ Đất trù phú)",
    "icon": "🪙",
    "visualSymbol": "Hoàng hậu ngự trên ngai đá chạm khắc thần thú giữa thiên nhiên hoa trái sum suê, thỏ chạy dưới chân, tay nâng đồng tiền vàng",
    "uprightKeywords": [
      "Nuôi dưỡng sung túc",
      "Khéo léo vun vén",
      "Thực tế ấm áp",
      "Mẹ Đất trù phú",
      "Hiếu khách hào phóng"
    ],
    "reversedKeywords": [
      "Bỏ bê gia đình",
      "Lo âu tài chính thái quá",
      "Vật chất hóa cuộc sống",
      "Kiệt sức vì chăm sóc"
    ],
    "uprightMeaning": "Queen of Pentacles là hình ảnh người phụ nữ đảm đang, tháo vát, biết cách làm ra tiền và khéo léo vun vén cho tổ ấm ngập tràn sự ấm no, tiện nghi và tình yêu thương ấm áp.",
    "reversedMeaning": "Quá lo lắng về tiền bạc đến mức mất ăn mất ngủ, bỏ bê chăm sóc gia đình, hoặc đánh giá giá trị con người hoàn toàn qua lăng kính vật chất.",
    "aspects": {
      "career": {
        "upright": "Quản lý tài chính doanh nghiệp xuất sắc, môi trường làm việc ấm cúng như ở nhà, kinh doanh ẩm thực và nông nghiệp đại thắng.",
        "reversed": "Quản lý thu chi kém dẫn đến hao hụt ngân sách, căng thẳng quá mức giữa việc cơ quan và trách nhiệm gia đình."
      },
      "love": {
        "upright": "Người vợ đảm đang chu đáo, chỗ dựa tinh thần và hậu phương vững chắc cho chồng con, gia đình hòa thuận ấm êm.",
        "reversed": "Cằn nhằn chì chiết chồng con về chuyện tiền nong, tạo ra áp lực tài chính nặng nề trong mái ấm gia đình."
      },
      "healthSpirit": {
        "upright": "Chăm sóc sức khỏe gia đình bằng thực phẩm hữu cơ sạch, hệ tiêu hóa và làn da khỏe đẹp rạng ngời.",
        "reversed": "Tăng cân do thói quen ăn uống đồ ngọt giải tỏa căng thẳng, cần điều chỉnh lại chế độ dinh dưỡng thanh đạm."
      },
      "dharmaAdvice": {
        "upright": "Thực hành tâm bao dung của Mẹ Đất; chở che nuôi dưỡng muôn loài bằng tình thương cụ thể qua từng chén cơm manh áo.",
        "reversed": "Học cách chăm sóc bản thân trước khi lo cho người khác; đừng để sự hy sinh mù quáng biến thành nỗi oán trách ngấm ngầm."
      }
    }
  },
  {
    "id": "pentacles_king",
    "number": 14,
    "roman": "King",
    "nameEn": "King of Pentacles",
    "nameVi": "Vua Tiền",
    "arcana": "Minor",
    "suit": "Pentacles",
    "element": "Đất",
    "astrology": "Nguyên tố Đất của Hỏa (Vua tài chính quyền lực)",
    "icon": "🪙",
    "visualSymbol": "Đức vua ngồi ngai chạm đầu bò đực mặc áo choàng nho đen rực rỡ, chân giẫm lên giáp trụ chiến thắng, tay cầm quyền trượng và đồng tiền",
    "uprightKeywords": [
      "Đế vương tài chính",
      "Thành tựu tột bực",
      "Bảo chứng uy tín",
      "Thịnh vượng bền vững",
      "Chỗ dựa kim tiền"
    ],
    "reversedKeywords": [
      "Tham lam tàn nhẫn",
      "Phá sản sụp đổ",
      "Vật chất suy đồi",
      "Độc đoán bủn xỉn"
    ],
    "uprightMeaning": "King of Pentacles là biểu tượng đỉnh cao của sự thành công tài chính và quyền lực thế tục. Mọi dự án ngài chạm tay vào đều hóa thành vàng (Midas touch), mang lại sự phồn vinh bền vững và uy tín tuyệt đối.",
    "reversedMeaning": "Kẻ tham lam tàn nhẫn sẵn sàng giẫm đạp lên đạo đức vì đồng tiền, nguy cơ sụp đổ đế chế kinh doanh do đầu tư sai lầm hoặc lối sống trụy lạc.",
    "aspects": {
      "career": {
        "upright": "Doanh nhân thành đạt tột bậc, nhà đầu tư huyền thoại, dẫn dắt tập đoàn đa quốc gia phát triển hưng thịnh vững bền.",
        "reversed": "Đối mặt với nguy cơ phá sản nợ nần, bị điều tra về các hành vi trốn thuế và gian lận tài chính quy mô lớn."
      },
      "love": {
        "upright": "Người bạn đời chu đáo đảm bảo cuộc sống nhung lụa vương giả cho gia đình, chung thủy và có trách nhiệm tuyệt đối.",
        "reversed": "Dùng tiền bạc để kiểm soát và hạ thấp phẩm giá của bạn đời, coi hôn nhân như một hợp đồng kinh tế mua bán sòng phẳng."
      },
      "healthSpirit": {
        "upright": "Sức khỏe sung mãn dồi dào, có điều kiện thụ hưởng các liệu pháp y học tiên tiến nhất để kéo dài tuổi thọ.",
        "reversed": "Các bệnh lý của nhà giàu: gout, mỡ máu cao, xơ gan do tiệc tùng tiếp khách rượu thịt triền miên."
      },
      "dharmaAdvice": {
        "upright": "Dùng tài lực khổng lồ để hộ trì Chánh Pháp, xây chùa lập cầu cứu trợ thiên tai; làm đại thí chủ của muôn loài.",
        "reversed": "Thức tỉnh trước ảo vọng kim tiền; 'Vạn lượng vàng mười mang không được, chỉ có nghiệp duyên theo sát thân'."
      }
    }
  }
];

export const MAJOR_ARCANA_CARDS = TAROT_78_CARDS.filter((c) => c.arcana === "Major");
export const MINOR_ARCANA_CARDS = TAROT_78_CARDS.filter((c) => c.arcana === "Minor");

export function getTarotCardById(id: string): TarotCardDefinition | undefined {
  return TAROT_78_CARDS.find((c) => c.id === id);
}
