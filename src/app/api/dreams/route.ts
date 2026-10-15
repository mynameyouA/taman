import { NextResponse } from 'next/server';

export interface JungianLayer {
  title: string;
  subtitle: string;
  name?: string;
  polarity?: string;
  content: string;
  meditativeNote: string;
}

export interface DreamAnalysisResponse {
  theme: {
    id: string;
    name: string;
    subtext: string;
    description: string;
  };
  fiveLayers: {
    archetype: JungianLayer;
    shadow: JungianLayer;
    animaAnimus: JungianLayer;
    subconsciousMessage: JungianLayer;
    awakeningGuidance: JungianLayer;
  };
  iChingResonance: {
    hexagramName: string;
    hexagramNumber: number;
    thoanTu: string;
    insight: string;
  };
  interpretation: string;
  tags: string[];
}

interface ThemePattern {
  id: string;
  name: string;
  subtext: string;
  keywords: string[];
  description: string;
  archetype: {
    name: string;
    content: string;
    meditativeNote: string;
  };
  shadow: {
    content: string;
    meditativeNote: string;
  };
  animaAnimus: {
    polarity: string;
    content: string;
    meditativeNote: string;
  };
  subconsciousMessage: {
    content: string;
    meditativeNote: string;
  };
  awakeningGuidance: {
    content: string;
    meditativeNote: string;
  };
  summary: string;
  tags: string[];
}

const DREAM_THEMES: ThemePattern[] = [
  {
    id: "water",
    name: "Nước • Cảm Xúc Sâu Kín",
    subtext: "Đại dương vô thức và dòng chảy bản thể",
    keywords: ["nước", "biển", "sóng", "sông", "hồ", "mưa", "đại dương", "đuối nước", "suối", "ngập", "thủy triều", "chìm", "bơi"],
    description: "Nước là biểu tượng kinh điển nhất của Vô thức Tập thể (Collective Unconscious). Dòng nước phản chiếu trạng thái tâm lý đang biến chuyển từ tầng sâu kín nhất của tâm hồn.",
    archetype: {
      name: "The Great Mother & The Primordial Ocean (Đại Mẫu & Đại Dương Nguyên Sơ)",
      content: "Nguyên mẫu Nước đại diện cho nguồn cội của sự sống và vùng biển sâu vô thức. Giấc mơ báo hiệu tâm trí bạn đang khao khát được gột rửa, tái sinh và hòa nhập lại với cội nguồn cảm xúc thuần khiết nhất.",
      meditativeNote: "Nước nâng đỡ vạn vật nhưng không tranh giành; vô thức của bạn đang mời gọi sự mềm mại, thuận dòng."
    },
    shadow: {
      content: "Phần bóng tối (Shadow) ở đây là những cảm xúc bi thương, u uất hoặc đam mê bị đè nén bấy lâu trong đời sống thường nhật. Bạn có xu hướng dựng lên lớp vỏ lý trí cứng cỏi để chối bỏ sự yếu mềm dễ bị tổn thương bên trong.",
      meditativeNote: "Đừng cố ngăn chặn dòng thác; hãy quan sát từng con sóng cảm xúc nổi lên rồi tự tan biến."
    },
    animaAnimus: {
      polarity: "Anima (Năng lượng Tính Nữ Trực Giác)",
      content: "Năng lượng Anima đang trỗi dậy mạnh mẽ, yêu cầu bạn hạ bớt sự cứng nhắc của lý tính (Animus / Logos) để mở lòng lắng nghe trực giác, lòng trắc ẩn và sự thấu cảm bao la đối với chính bản thân.",
      meditativeNote: "Sự dịu dàng không phải là yếu đuối, mà là dung lượng chứa đựng vô biên của một tâm hồn thức tỉnh."
    },
    subconsciousMessage: {
      content: "Tiềm thức nhắn nhủ: Đã đến lúc bạn phải đối diện với hồ nước tâm can. Có những cảm xúc chưa được gọi tên đang cần được bạn thừa nhận, lắng nghe và hóa giải bằng sự bao dung.",
      meditativeNote: "Mỗi giọt nước trong cõi mộng đều mang hạt giống của sự thanh tẩy tâm hồn."
    },
    awakeningGuidance: {
      content: "Thực hành thiền định tĩnh lặng cùng hơi thở êm dịu. Hãy cho phép bản thân được khóc, được mềm lòng và giải phóng những ức chế đã tích tụ. Đừng cố bơi ngược dòng đời, hãy học cách thả lỏng để dòng chảy chân như đưa bạn về bến bình an.",
      meditativeNote: "Hợp nhất với dòng nước: Buông bỏ sự bám chấp để tự do tự tại như nước chảy mây trôi."
    },
    summary: "Nước mang đến thông điệp tái sinh từ chiều sâu vô thức. Tiềm thức bạn đang kêu gọi sự lắng nghe cảm xúc chân thật, gột rửa những ức chế cũ kỹ để đón nhận nguồn sinh lực tươi mới và bao dung.",
    tags: ["nước", "cảm xúc sâu kín", "anima", "thanh tẩy", "vô thức tập thể"]
  },
  {
    id: "falling",
    name: "Rơi Tự Do • Mất Kiểm Soát & Cần Buông Bỏ",
    subtext: "Khoảng không vô định và sự sụp đổ của bản ngã",
    keywords: ["rơi", "ngã", "vực", "rớt", "hụt hẫng", "chênh vênh", "lao dốc", "không trọng lực", "trượt chân", "tụt dốc"],
    description: "Cảm giác rơi tự do phản ánh khoảnh khắc bản ngã (Ego) mất đi điểm tựa quen thuộc của sự kiểm soát, đối diện với nỗi sợ hư vô và sự vô định của cuộc đời.",
    archetype: {
      name: "The Abyss & Descent into Underworld (Vực Thẳm & Hành Trình Xuống Cõi Vô Thức)",
      content: "Nguyên mẫu Vực Thẳm tượng trưng cho bước chuyển đổi tâm lý cấp tiến. Bản ngã nhận ra rằng các ảo tưởng an toàn mà bạn bám víu đang tan rã để dọn đường cho một sự thức tỉnh sâu sắc hơn.",
      meditativeNote: "Vực sâu không phải nơi hủy diệt, mà là mảnh đất màu mỡ cho sự tái cấu trúc tâm linh."
    },
    shadow: {
      content: "Bóng tối (Shadow) ở đây là nỗi sợ hãi tột cùng về sự thất bại, nỗi ám ảnh mất danh dự, hoặc việc không thể thao túng tương lai theo ý muốn. Bạn đang sợ buông tay vì nghĩ rằng buông là mất tất cả.",
      meditativeNote: "Bản ngã sợ rơi, nhưng linh hồn lại biết cách bay lượn khi chạm đáy tĩnh lặng."
    },
    animaAnimus: {
      polarity: "Cân bằng Ý Chí và Sự Phó Thác",
      content: "Giấc mơ chỉ ra sự căng thẳng giữa ý chí kiểm soát cứng nhắc và nhu cầu buông xả tự nhiên. Tiềm thức đòi hỏi bạn ngừng gồng mình gánh vác, chuyển từ tâm thế đối kháng sang thái độ tin tưởng vào sự an bài của nhân duyên.",
      meditativeNote: "Chỉ khi đôi bàn tay thôi nắm chặt, bạn mới có thể đón nhận món quà của hư không."
    },
    subconsciousMessage: {
      content: "Thông điệp tiềm thức: Những trụ cột cũ kỹ trong tư duy của bạn đã hoàn thành sứ mệnh lịch sử. Cố níu giữ chỉ tạo thêm kiệt quệ. Hãy can đảm thả rơi những gì không còn thuộc về hiện tại.",
      meditativeNote: "Rơi tự do chính là bước đầu tiên của sự giải thoát khỏi xiềng xích bản ngã."
    },
    awakeningGuidance: {
      content: "Nhận diện những nỗi lo lắng đang ám ảnh bạn và tập bài thực hành buông xả từng ý niệm. Nhận thức rằng cuộc sống không cần bạn phải gồng mình kiểm soát từng chi tiết. Khi bạn tin tưởng vào mặt đất nâng đỡ, cảm giác rơi sẽ hóa thành sự an nhiên tuyệt đối.",
      meditativeNote: "Hãy ngồi yên, thở sâu và cảm nhận sự nâng đỡ diệu kỳ của Đất Mẹ dưới chân."
    },
    summary: "Rơi tự do là lời nhắc nhở thiêng liêng về việc buông bỏ quyền kiểm soát của bản ngã. Khi bạn dám buông tay khỏi những kỳ vọng cũ, bạn sẽ tìm thấy sự tự do chân thật trong sự phó thác thanh thản.",
    tags: ["rơi tự do", "buông bỏ", "vực thẳm", "chuyển hóa bản ngã", "tỉnh thức"]
  },
  {
    id: "flying",
    name: "Bay Lượn • Khát Vọng Giải Thoát",
    subtext: "Đôi cánh tâm linh và sự vượt thoát giới hạn hữu hình",
    keywords: ["bay", "lượn", "cánh", "trời", "mây", "bầu trời", "chim", "lơ lửng", "phiêu du", "tự do", "không gian"],
    description: "Bay lượn là biểu hiện tuyệt mỹ của năng lượng Puer Aeternus (Thiếu niên vĩnh cửu) hoặc sự thăng hoa của tâm thức (Transcendence) vượt lên trên mọi ràng buộc của thế giới trần tục.",
    archetype: {
      name: "The Puer Aeternus & Transcendence (Người Tự Do & Sự Thăng Hoa Tâm Thức)",
      content: "Nguyên mẫu Người Thăng Hoa thể hiện khát vọng tinh thần muốn vượt lên trên những áp lực, khuôn mẫu chật hẹp của đời sống thực tại để chiêm ngưỡng bức tranh toàn cảnh của vũ trụ từ tầng cao tuệ giác.",
      meditativeNote: "Bầu trời nội tâm không có biên giới; đôi cánh chính là niềm tin thuần khiết vào tự tính sáng tỏ."
    },
    shadow: {
      content: "Mặt tối của trạng thái bay lượn là xu hướng 'trốn chạy thực tại' (Spiritual Bypassing). Bạn có thể đang tìm cách bay bổng trong suy tưởng để né tránh những trách nhiệm cụ thể, những vướng mắc đời thường chưa được giải quyết rốt ráo.",
      meditativeNote: "Cánh chim dù bay cao đến đâu cũng cần một cành cây vững chắc để tựa vào lúc đêm về."
    },
    animaAnimus: {
      polarity: "Animus / Anima Hợp Nhất Trong Tinh Thần Khai Phóng",
      content: "Năng lượng sáng tạo và nguồn cảm hứng đang đạt độ chín muồi. Sự kết hợp giữa tầm nhìn lý trí sắc bén và cảm xúc thăng hoa giúp bạn nhìn nhận mọi trắc trở đời thường dưới một góc nhìn khoáng đạt, từ bi.",
      meditativeNote: "Tự do đích thực không phải là trốn chạy đất mẹ, mà là mang ánh sáng bầu trời soi rọi thế gian."
    },
    subconsciousMessage: {
      content: "Tiềm thức khẳng định: Bạn có tiềm năng to lớn vượt xa chiếc lồng định kiến mà bạn tự giam mình. Đã đến lúc phóng tầm mắt xa hơn, can đảm khởi xướng những dự định mang tính đột phá và nhân văn.",
      meditativeNote: "Đừng giam giữ đại bàng trong chuồng bồ câu; hãy dang rộng đôi cánh tuệ giác."
    },
    awakeningGuidance: {
      content: "Hãy giữ lấy tầm nhìn khoáng đạt của người bay trên mây, nhưng đồng thời neo giữ gót chân thật vững chắc trên mặt đất (Grounding). Biến những ý niệm cao đẹp thành hành động cụ thể, phụng sự và gieo mầm bình an cho cuộc sống hôm nay.",
      meditativeNote: "Tâm không vướng bận, chân đạp đất dày, đầu đội trời xanh — ấy là cảnh giới an lạc."
    },
    summary: "Bay lượn biểu trưng cho sự thăng hoa của tâm thức và khát khao tự do tột cùng. Tiềm thức khuyến khích bạn giải phóng tiềm năng sáng tạo, đồng thời nhắc nhở giữ vững gốc rễ để biến lý tưởng thành hiện thực.",
    tags: ["bay lượn", "khát vọng tự do", "thăng hoa tâm thức", "vượt thoát giới hạn", "tuệ giác"]
  },
  {
    id: "chased",
    name: "Bị Rượt Đuổi • Đối Diện Bóng Tối Nội Tâm",
    subtext: "Tiếng gọi của phần nhân cách bị từ chối và nỗi sợ nguyên thủy",
    keywords: ["rượt", "đuổi", "chạy", "bóng đen", "quái vật", "kẻ lạ", "trốn", "sợ", "hung thủ", "săn lùng", "đe dọa", "bắt cóc"],
    description: "Bị rượt đuổi là cơ chế kinh điển của Vô thức: Kẻ đang đuổi theo bạn trong giấc mơ thực chất chính là một phần năng lượng nội tâm bị bạn xua đuổi, khước từ và dồn nén xuống bóng tối.",
    archetype: {
      name: "The Shadow Pursuer (Bóng Đen Theo Dấu Bản Ngã)",
      content: "Nguyên mẫu Shadow xuất hiện dưới hình dạng một mối đe dọa bên ngoài. Khi bạn càng cố chạy trốn, bóng đen càng trở nên to lớn và hung hãn hơn, bởi nó đang khao khát được bản ngã thừa nhận và tích hợp.",
      meditativeNote: "Kẻ đuổi theo bạn chính là một mảnh ghép thất lạc của linh hồn bạn đang tìm đường trở về."
    },
    shadow: {
      content: "Phần bóng tối này có thể là sự tức giận bị cấm đoán, dục vọng sâu kín, cảm giác tội lỗi, hoặc những tài năng bị chôn vùi vì định kiến gia đình, xã hội. Nỗi sợ hãi trong mơ là dấu hiệu của sự chia cắt nội tâm nghiêm trọng.",
      meditativeNote: "Bạn không thể chiến thắng một cái bóng bằng cách chạy trốn trong đường hầm tăm tối."
    },
    animaAnimus: {
      polarity: "Thử Thách Kháng Cự & Dũng Khí Đối Thoại",
      content: "Xung đột giữa Persona (mặt nạ thánh thiện, hoàn hảo bạn trưng ra) và Shadow (sự thật trần trụi bên dưới). Năng lượng bản lĩnh đang bị kìm hãm, đòi hỏi sự dũng cảm để quay đầu lại, nhìn thẳng vào mắt kẻ truy đuổi.",
      meditativeNote: "Dũng cảm lớn nhất của một đời người không phải đánh bại ngoại cảnh, mà là mỉm cười với bóng tối của chính mình."
    },
    subconsciousMessage: {
      content: "Tiềm thức cảnh báo dõng dạc: Trốn chạy không còn là giải pháp an toàn. Càng né tránh bài học cuộc đời, nó sẽ càng biến tướng thành những lo âu, rối ren trong đời sống thực tại. Đã đến giờ dừng bước và lắng nghe.",
      meditativeNote: "Hãy quay lại và hỏi bóng đen: 'Bạn đến đây để mang cho tôi thông điệp gì?'"
    },
    awakeningGuidance: {
      content: "Thực hành phương pháp 'Tích Hợp Bóng Tối' (Shadow Work) của Carl Jung. Viết nhật ký về những điều bạn căm ghét hoặc sợ hãi nhất ở người khác — đó chính là tấm gương phản chiếu bóng tối của bạn. Hãy ôm lấy sự bất toàn của mình bằng lòng từ bi.",
      meditativeNote: "Khi bạn ôm lấy bóng đen, bóng đen sẽ lập tức tan biến thành nguồn sinh lực hộ trì cho bạn."
    },
    summary: "Bị rượt đuổi là lời triệu hồi khẩn thiết để bạn đối diện với phần bóng tối vô thức (Shadow). Khi can đảm dừng lại và dung nạp những tổn thương dồn nén, bạn sẽ tìm lại được sự toàn vẹn trọn vẹn của linh hồn.",
    tags: ["bị rượt đuổi", "shadow work", "bóng tối vô thức", "đối diện nỗi sợ", "toàn vẹn nội tâm"]
  },
  {
    id: "lost",
    name: "Lạc Lối • Giai Đoạn Chuyển Hóa Linh Hồn",
    subtext: "Mê cung nội tâm và thời khắc tái định hướng cuộc đời",
    keywords: ["lạc", "đường", "mê cung", "rừng", "sương mù", "tìm đường", "mất phương hướng", "ngõ cụt", "bế tắc", "lang thang", "quanh co"],
    description: "Lạc lối biểu trưng cho giai đoạn Nigredo (Hắc hóa / Đêm tối của linh hồn) trong giả kim thuật tâm lý Jung. Mọi la bàn cũ đều vô dụng, buộc tâm thức phải phát triển một phương thức định vị hoàn toàn mới.",
    archetype: {
      name: "The Labyrinth & The Night Journey (Mê Cung Bí Ẩn & Đêm Tối Của Linh Hồn)",
      content: "Nguyên mẫu Mê Cung tượng trưng cho cấu trúc phức tạp của tâm trí con người. Lạc lối không phải là tai họa, mà là một nghi thức điểm đạo cần thiết để bạn từ bỏ những con đường mòn quen thuộc vốn đã cạn kiệt sinh khí.",
      meditativeNote: "Người biết mình đang lạc đường chính là người bắt đầu tìm thấy hướng đi đích thực."
    },
    shadow: {
      content: "Bóng tối ở đây là sự phụ thuộc vào chỉ dẫn của người khác, nỗi sợ cô độc khi phải tự mình chọn con đường riêng. Bạn hoang mang vì trước nay luôn sống theo kỳ vọng của xã hội mà quên mất tiếng gọi từ trái tim chân thật.",
      meditativeNote: "Khi sương mù dày đặc nhất, đừng cố căng mắt nhìn xa, hãy chỉ cần bước tiếp bước chân hiện tiền."
    },
    animaAnimus: {
      polarity: "Khai Mở Ngọn Đèn Soi Sáng Nội Tâm",
      content: "Lý trí phán đoán (Animus) đã tạm thời bất lực trước ngã rẽ cuộc đời. Đây là lúc Anima — ngọn đèn của cảm nhận tinh tế và đức tin vô điều kiện — cần được thắp sáng để dẫn lối qua mê cung sương mù.",
      meditativeNote: "Con mắt tâm thức chỉ mở ra khi đôi mắt trần gian chịu thừa nhận sự bế tắc."
    },
    subconsciousMessage: {
      content: "Tiềm thức nhắn gửi: Đừng hoảng sợ trước cảm giác chông chênh lúc này. Bạn đang ở khúc quanh quan trọng của sự tái định hình nhân cách. Sự lạc lối bên ngoài chính là bước ngoặt mời gọi bạn quay về khám phá thế giới bên trong.",
      meditativeNote: "Tâm An chính là nơi chốn bình yên không bao giờ có thể bị lạc mất."
    },
    awakeningGuidance: {
      content: "Dành thời gian tĩnh tâm, ngưng đưa ra các quyết định hệ trọng trong trạng thái hoảng loạn. Hãy coi giai đoạn này như một kỳ nghỉ đông của tâm hồn. Tập quan sát từng khoảnh khắc và lắng nghe sự mách bảo êm dịu của trực giác.",
      meditativeNote: "Khi bạn dừng lại, trung tâm của vũ trụ sẽ hiện hữu ngay dưới từng bước chân bạn đi."
    },
    summary: "Lạc lối trong cõi mộng là dấu chỉ của giai đoạn chuyển hóa linh hồn sâu sắc. Đừng nóng vội tìm lối thoát bên ngoài; hãy dừng lại, thắp sáng ngọn đèn trực giác nội tâm để bước qua đêm tối của tâm thức.",
    tags: ["lạc lối", "mê cung tâm thức", "chuyển hóa linh hồn", "đêm tối linh hồn", "tái định hướng"]
  },
  {
    id: "ancestor_deceased",
    name: "Gặp Người Đã Khuất • Kết Nối Cội Nguồn & Nghiệp Thức",
    subtext: "Chiếc cầu nối giữa các thế hệ và sự chữa lành liên thế hệ",
    keywords: ["người đã khuất", "ông bà", "cha mẹ mất", "người chết", "linh hồn", "tổ tiên", "người thân qua đời", "âm phần", "mộ"],
    description: "Giấc mơ gặp người đã khuất là sự tiếp xúc thiêng liêng với Vô thức Tổ tiên (Ancestral Unconscious) và những ký ức tâm linh mang tính di truyền trong dòng máu.",
    archetype: {
      name: "The Ancestor & The Wise Old Soul (Tiên Tổ & Tuệ Giác Vượt Không Gian)",
      content: "Nguyên mẫu Tiên Tổ mang theo phước báu và kinh nghiệm ngàn đời của dòng họ. Họ xuất hiện để truyền trao lời nhắc nhở, bảo bọc hoặc trao gửi sứ mệnh hóa giải những gút thắt còn dang dở.",
      meditativeNote: "Dòng máu tổ tiên đang chảy trong từng tế bào của bạn; sự hiện diện của họ là minh chứng của tình thương bất diệt."
    },
    shadow: {
      content: "Những ân hận, day dứt chưa kịp bày tỏ lúc người thân còn tại thế, hoặc những gánh nặng tâm lý chưa lành lặn của gia đình đang đè nặng lên vô thức bạn dưới dạng cảm giác tội lỗi âm thầm.",
      meditativeNote: "Lời tạ lỗi chân thành trong tâm trí có sức mạnh vượt qua mọi lằn ranh sinh tử."
    },
    animaAnimus: {
      polarity: "Sợi Dây Thâm Tình & Di Sản Tâm Linh",
      content: "Sự dung hòa giữa truyền thống cội nguồn và khát vọng tự chủ của cá nhân. Giấc mơ gợi mở sự thấu hiểu sâu sắc đối với những thiếu sót của tiền nhân để bạn từ bi tha thứ và giải phóng cho cả hai phía.",
      meditativeNote: "Chữa lành cho chính bạn hôm nay cũng chính là chữa lành cho bảy đời tổ tiên phía sau."
    },
    subconsciousMessage: {
      content: "Tiềm thức nhắn nhủ: Có một thông điệp tri ân và bình an đang được trao đến bạn. Người xưa đã hoàn tất cõi trần và mong mỏi bạn được sống an lạc, tự tại, không còn bị trói buộc bởi nỗi đau quá vãng.",
      meditativeNote: "Hãy thắp một nén hương tâm, gửi trọn tình thương và lời tri ân đến các bậc tiền bối."
    },
    awakeningGuidance: {
      content: "Thực hành bài thiền hồi hướng công đức và tri ân tổ tiên. Hãy trân trọng di sản tinh thần cao đẹp mà họ để lại, đồng thời ý thức buông bỏ những khuôn mẫu tiêu cực trong dòng tộc để mở ra một tương lai tươi sáng hơn.",
      meditativeNote: "Sống một đời bình an, lương thiện chính là món quà báo ân sâu sắc nhất dành cho người đã khuất."
    },
    summary: "Gặp người đã khuất là sự kết nối linh thiêng với vô thức cội nguồn. Giấc mơ mở ra cơ hội chữa lành những day dứt quá khứ, tiếp nhận phước lành từ tổ tiên và sống trọn vẹn với hiện tại.",
    tags: ["gặp người đã khuất", "vô thức tổ tiên", "chữa lành cội nguồn", "tri ân tiền nhân", "bình an"]
  },
  {
    id: "ancient_house",
    name: "Ngôi Nhà Cổ Bí Ẩn • Cấu Trúc Nhân Cách & Tiềm Thức Ẩn Giấu",
    subtext: "Những căn phòng khóa kín và tầng hầm vô thức của tâm trí",
    keywords: ["nhà cổ", "ngôi nhà", "căn phòng", "tầng hầm", "gác xép", "cửa khóa", "lâu đài", "biệt thự", "phòng kín", "hành lang"],
    description: "Theo Carl Jung, ngôi nhà chính là biểu tượng hoàn hảo của cấu trúc tâm trí (Psyche). Các tầng lầu đại diện cho tầng ý thức, gác xép là lý tưởng, và tầng hầm là nơi ẩn chứa vô thức sâu thẳm.",
    archetype: {
      name: "The Psyche Mansion (Tòa Lâu Đài Tâm Thức)",
      content: "Nguyên mẫu Ngôi Nhà đại diện cho toàn thể nhân cách của bạn. Khám phá những căn phòng mới lạ hoặc bí ẩn trong mơ là dấu hiệu bạn đang khám phá ra những tiềm năng tâm linh to lớn chưa từng được khai mở.",
      meditativeNote: "Tâm hồn bạn là một lâu đài tráng lệ; mỗi căn phòng đều lưu giữ một kho báu diệu kỳ."
    },
    shadow: {
      content: "Những căn phòng tối tăm, bụi bặm hoặc bị niêm phong chứa đựng những ký ức tuổi thơ bị tổn thương, những cảm xúc bị ruồng rẫy mà bạn không dám mở cửa bước vào đối diện.",
      meditativeNote: "Căn phòng càng u tối, khi đón ánh dương vào sẽ càng bừng sáng rạng ngời."
    },
    animaAnimus: {
      polarity: "Hài Hòa Giữa Ngoại Cảnh & Nội Tâm",
      content: "Sự phân bổ năng lượng giữa thế giới bên ngoài (mặt tiền ngôi nhà) và thế giới thâm sâu bên trong (gian phòng kín). Giấc mơ nhắc bạn cần chú trọng tu sửa không gian an trú nội tâm thay vì chỉ mải mê trang hoàng bề nổi.",
      meditativeNote: "Ngôi nhà đẹp nhất không phải ở nội thất xa hoa, mà ở sự ấm áp, thanh tịnh trong từng ngóc ngách tâm can."
    },
    subconsciousMessage: {
      content: "Tiềm thức thôi thúc: Đã đến lúc bạn quay về thăm lại những 'căn phòng' bị lãng quên trong tâm hồn. Có một tài năng, một ước mơ thuở thiếu thời đang chờ đợi bạn mở khóa để bước ra ánh sáng.",
      meditativeNote: "Chiếc chìa khóa vạn năng để mở mọi căn phòng trong cõi mộng chính là lòng tự trắc ẩn."
    },
    awakeningGuidance: {
      content: "Thực hành dọn dẹp không gian sống vật lý để thanh lọc năng lượng tâm trí. Dành thời gian kết nối lại với những sở thích nguyên sơ từng khiến tâm hồn bạn rung động. Chăm sóc và trân trọng từng ngóc ngách của bản thể.",
      meditativeNote: "Trở về an trú nơi ngôi nhà nội tâm kiên cố, bão táp cuộc đời sẽ chẳng thể lay chuyển."
    },
    summary: "Ngôi nhà cổ đại diện cho toàn bộ cấu trúc tâm thức của bạn. Giấc mơ mời gọi bạn can đảm mở những cánh cửa niêm phong, chữa lành ký ức xưa cũ và đánh thức những tiềm năng vô giá đang ngủ yên.",
    tags: ["ngôi nhà cổ", "cấu trúc tâm thức", "căn phòng bí ẩn", "tiềm năng vô thức", "trở về an trú"]
  }
];

// Fallback generic theme for dreams that do not hit specific keywords
const DEFAULT_MYSTIC_THEME: ThemePattern = {
  id: "cosmic_mystery",
  name: "Vũ Trụ Huyền Bí • Khai Mở Tâm Linh",
  subtext: "Dòng chảy biểu tượng và sự thức tỉnh của bản thể toàn vẹn",
  keywords: [],
  description: "Giấc mơ của bạn phản ánh sự chuyển động vi tế trong cõi tiềm thức, nơi các biểu tượng thần bí đang kết tinh để dẫn lối cho hành trình Thấu Thị Bản Thể (Individuation).",
  archetype: {
    name: "The Self & The Cosmic Mirror (Bản Thể Toàn Vẹn & Gương Soi Vũ Trụ)",
    content: "Nguyên mẫu The Self (Chân Ngã) đang vận hành để kéo các mảnh vỡ của tâm trí về một thể thống nhất hài hòa. Những ảo tượng trong mơ chính là tấm gương phản chiếu những bước chuyển tâm linh quan trọng sắp tới.",
    meditativeNote: "Vũ trụ không ở bên ngoài; vạn tượng trong cõi mộng đều xuất phát từ tâm của chính bạn."
  },
  shadow: {
    content: "Phần bóng tối là những nghi ngờ, do dự và nỗi bất an chưa rõ nguyên do đang cản trở bạn bước đi dứt khoát trên con đường chân thật của chính mình.",
    meditativeNote: "Bóng tối là khoảng trống cần thiết để ánh sáng tuệ giác soi tỏ con đường."
  },
  animaAnimus: {
    polarity: "Cân Bằng Âm Dương Tâm Thức",
    content: "Sự hòa quyện giữa năng lượng trực giác mềm mại và ý chí quyết đoán kiên định. Giấc mơ khuyến khích bạn nuôi dưỡng sự tĩnh lặng để đưa ra những quyết sách sáng suốt.",
    meditativeNote: "Tĩnh lặng sinh trí tuệ; định lực sâu dày chuyển hóa vạn chướng duyên."
  },
  subconsciousMessage: {
    content: "Tiềm thức gửi trao thông điệp: Bạn đang đứng trước ngưỡng cửa chuyển biến nội tâm tích cực. Hãy tin tưởng vào tiếng nói trực giác và những điềm lành vi tế đang âm thầm nâng đỡ từng bước chân bạn.",
    meditativeNote: "Một hạt mầm bình an khi được gieo trong tâm mộng sẽ nở hoa tuệ giác giữa cõi trần."
  },
  awakeningGuidance: {
    content: "Duy trì thói quen quán chiếu tâm mỗi ngày thông qua thiền định và lắng nghe hơi thở. Hãy sống trọn vẹn trong chánh niệm, nhìn nhận mọi sự việc bằng con mắt từ bi và tâm thế bao dung thanh thản.",
    meditativeNote: "Vạn pháp quy tâm: Giữ tâm bình thản, vạn sự ắt hanh thông."
  },
  summary: "Giấc mơ mang mật mã của sự thức tỉnh tâm linh. Tiềm thức bạn đang kết nối với trường năng lượng vũ trụ để khai mở tuệ giác, chuyển hóa nỗi âu lo thành niềm tin kiên định vào hành trình hoàn thiện bản ngã.",
  tags: ["khai mở tâm linh", "chân ngã", "cân bằng âm dương", "trực giác", "tỉnh thức"]
};

function classifyDreamTheme(dreamText: string): ThemePattern {
  const lower = dreamText.toLowerCase();
  
  let bestMatch: ThemePattern | null = null;
  let maxScore = 0;

  for (const theme of DREAM_THEMES) {
    let score = 0;
    for (const kw of theme.keywords) {
      if (lower.includes(kw)) {
        score += 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = theme;
    }
  }

  return (bestMatch && maxScore > 0) ? bestMatch : DEFAULT_MYSTIC_THEME;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dream } = body;

    // Validate request payload
    if (!dream || typeof dream !== 'string' || dream.trim().length < 8) {
      return NextResponse.json(
        { 
          error: 'Bad Request', 
          message: 'Nội dung giấc mơ quá ngắn. Vui lòng mô tả chi tiết hơn (ít nhất 8 ký tự) để cổng vũ trụ có đủ dữ liệu luận giải.' 
        },
        { status: 400 }
      );
    }

    // Depth psychology processing latency (1.2 seconds for realistic mystical calculation)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Phân loại chủ đề giấc mơ theo Carl Jung
    const theme = classifyDreamTheme(dream);

    // Ánh xạ Giấc Mơ Carl Jung sang 64 Quẻ Kinh Dịch tương ứng
    const DREAMS_ICHING_MAP: Record<string, { hexagramName: string; hexagramNumber: number; thoanTu: string; insight: string }> = {
      water: {
        hexagramName: "BÁT THUẦN KHẢM (Thủy vi Khảm)",
        hexagramNumber: 29,
        thoanTu: "Tập khảm, hữu phu, duy tâm hanh, hành hữu thượng. (Hiểm nạn trùng trùng nhưng có lòng chí thành thì lòng dạ thông suốt).",
        insight: "Nước trong mộng ứng với quẻ Khảm. Hãy học đức tính của nước: khi gặp hố sâu vực thẳm thì dừng lại lấp đầy rồi mới chảy tiếp; lòng dạ bình thản vượt qua mọi thử thách nội tâm.",
      },
      falling: {
        hexagramName: "SƠN ĐỊA BÁC (Sơn vi Bác)",
        hexagramNumber: 23,
        thoanTu: "Bác: Bất lợi hữu du vãng. (Bản ngã cũ tiêu mòn sụp đổ để nhường chỗ cho trật tự tâm thức mới).",
        insight: "Cảm giác rơi tự do ứng với quẻ Bác. Hãy dũng cảm buông bỏ sự bám chấp của cái tôi; khi nền móng cũ tan rã, hạt giống chân thật mới có thể đâm chồi.",
      },
      flying: {
        hexagramName: "HỎA THIÊN ĐẠI HỮU",
        hexagramNumber: 14,
        thoanTu: "Đại Hữu: Nguyên hanh. Mặt trời tỏa sáng trên nền trời cao, chứa chan ánh sáng tuệ giác.",
        insight: "Bay lượn trên mây ứng với quẻ Đại Hữu. Tâm trí bạn đang đạt trạng thái giải phóng, hãy chuyển hóa nguồn cảm hứng này thành đức khiêm nhường để phụng sự tha nhân.",
      },
      chase: {
        hexagramName: "LÔI THỦY GIẢI (Lôi vi Giải)",
        hexagramNumber: 40,
        thoanTu: "Giải: Lợi tây nam, vô sở vãng, kỳ lai phục cát. (Sấm động mưa tuôn, cởi bỏ mọi hiểm nguy lo sợ).",
        insight: "Bóng đen rượt đuổi ứng với quẻ Giải. Nỗi sợ chỉ là ảo ảnh do tâm tạo tác; khi bạn quay đầu nhìn thẳng vào bóng tối với tâm từ bi, mọi hiểm nguy tự khắc tiêu tán.",
      },
      ancestors: {
        hexagramName: "ĐỊA THIÊN THÁI (Địa vi Thái)",
        hexagramNumber: 11,
        thoanTu: "Thái: Tiểu vãng đại lai, cát hanh. (Trời đất giao hòa, âm dương thông suốt, tổ tiên độ trì phúc lộc).",
        insight: "Gặp người đã khuất ứng với quẻ Thái. Đây là phúc duyên lớn báo hiệu sự hòa giải sâu sắc giữa quá khứ và hiện tại, nguồn cội đang tiếp sức cho bạn.",
      },
      ancient_house: {
        hexagramName: "PHONG ĐỊA QUAN (Phong vi Quan)",
        hexagramNumber: 20,
        thoanTu: "Quan: Quán nhi bất tiến, hữu phu dong nhược. (Tỉnh thức quan sát, chiêm nghiệm quy luật vạn vật).",
        insight: "Ngôi nhà cổ ứng với quẻ Quan. Hãy xem đây là lời mời gọi của tiềm thức để quay vào bên trong tu tập, quán chiếu lại toàn bộ nếp sống của bản thân.",
      },
    };

    const iChingResonance = DREAMS_ICHING_MAP[theme.id] || {
      hexagramName: "ĐỊA LÔI PHỤC (Địa vi Phục)",
      hexagramNumber: 24,
      thoanTu: "Phục: Hanh, xuất nhập vô tật, bằng lai vô cửu. (Dương khí trở lại, ánh sáng ban mai xuất hiện).",
      insight: "Giấc mộng báo hiệu sự thức tỉnh và phục hồi năng lượng sống thuần khiết từ sâu trong tâm khảm.",
    };

    // Build the 5-layer Carl Jung depth psychology analysis
    const responsePayload: DreamAnalysisResponse = {
      theme: {
        id: theme.id,
        name: theme.name,
        subtext: theme.subtext,
        description: theme.description,
      },
      fiveLayers: {
        archetype: {
          title: "Tầng 1: Archetype (Nguyên Mẫu Tâm Thức)",
          subtitle: "Cấu trúc biểu tượng nguyên thủy từ Vô Thức Tập Thể",
          name: theme.archetype.name,
          content: theme.archetype.content,
          meditativeNote: theme.archetype.meditativeNote,
        },
        shadow: {
          title: "Tầng 2: Shadow (Bóng Tối Vô Thức)",
          subtitle: "Những dồn nén, nỗi sợ và phần nhân cách bị từ chối",
          content: theme.shadow.content,
          meditativeNote: theme.shadow.meditativeNote,
        },
        animaAnimus: {
          title: "Tầng 3: Anima & Animus (Năng Lượng Giới Tính Đối Lập)",
          subtitle: "Sự cân bằng giữa Tính Nữ Trực Giác & Tính Nam Quyết Đoán",
          polarity: theme.animaAnimus.polarity,
          content: theme.animaAnimus.content,
          meditativeNote: theme.animaAnimus.meditativeNote,
        },
        subconsciousMessage: {
          title: "Tầng 4: Thông Điệp Tiềm Thức Gửi Trao",
          subtitle: "Tiếng gọi vi tế mà tâm trí ban ngày đã vô tình xao lãng",
          content: theme.subconsciousMessage.content,
          meditativeNote: theme.subconsciousMessage.meditativeNote,
        },
        awakeningGuidance: {
          title: "Tầng 5: Lời Khuyên Thức Tỉnh & Hợp Nhất Bản Ngã",
          subtitle: "Chỉ dẫn chuyển hóa thực tiễn theo tinh thần thiền định",
          content: theme.awakeningGuidance.content,
          meditativeNote: theme.awakeningGuidance.meditativeNote,
        },
      },
      iChingResonance,
      interpretation: theme.summary,
      tags: theme.tags,
    };

    return NextResponse.json(responsePayload, { status: 200 });

  } catch (error) {
    console.error('Failed to process Jungian dream interpretation API call:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: 'Đã xảy ra sự cố trong quá trình luận giải giấc mơ Carl Jung. Vui lòng thử lại sau.' 
      },
      { status: 500 }
    );
  }
}
