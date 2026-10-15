const fs = require('fs');
const path = require('path');

const rawPath = path.join(__dirname, '../../ngu_bach_danh_clean.json');
const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

// Vietnamese text cleaner
function cleanVietnamese(text) {
  if (!text) return '';
  let s = text.trim();

  // Strip trailing notes like .66, .56, .24
  s = s.replace(/\.(\d+)(?=(\s|$))/g, '.');
  s = s.replace(/\b(\d+)(?=[,.;:])/g, '');

  const replacements = [
    [/b\s+ồ\s+tát/gi, 'bồ tát'],
    [/Quán\s+Th\s+ế\s+Âm/gi, 'Quán Thế Âm'],
    [/Q\s+uán\s+Th\s+ế\s+Âm/gi, 'Quán Thế Âm'],
    [/Quán\s+T\s+hế\s+Âm/gi, 'Quán Thế Âm'],
    [/Quán\s+Âm/gi, 'Quán Âm'],
    [/Th\s+ế\s+Âm/gi, 'Thế Âm'],
    [/Kính\s+l\s+ạy/g, 'Kính lạy'],
    [/kính\s+l\s+ạy/g, 'kính lạy'],
    [/l\s+ạy/gi, 'lạy'],
    [/ng\s+ười/gi, 'người'],
    [/ngư\s+ời/gi, 'người'],
    [/chúng\s+s\s+inh/gi, 'chúng sinh'],
    [/chúng\s+sin\s+h/gi, 'chúng sinh'],
    [/chân\s+n\s+gôn/gi, 'chân ngôn'],
    [/đ\s+ược/gi, 'được'],
    [/đư\s+ợc/gi, 'được'],
    [/đ\s+ồ/gi, 'đồ'],
    [/c\s+ầu/gi, 'cầu'],
    [/c\s+ầm/gi, 'cầm'],
    [/li\s+ễu/gi, 'liễu'],
    [/r\s+ằng/gi, 'rằng'],
    [/đ\s+ịa/gi, 'địa'],
    [/m\s+ục/gi, 'mục'],
    [/du\s+ệ/gi, 'duệ'],
    [/b\s+ạn/gi, 'bạn'],
    [/h\s+ạ/gi, 'hạ'],
    [/h\s+ồng/gi, 'hồng'],
    [/ph\s+ấn/gi, 'phấn'],
    [/b\s+ịnh/gi, 'bệnh'],
    [/bịnh/gi, 'bệnh'],
    [/qu\s+ỉ/gi, 'quỷ'],
    [/ch\s+ết/gi, 'chết'],
    [/mu\s+ốn/gi, 'muốn'],
    [/nhi\s+ều/gi, 'nhiều'],
    [/l\s+ớn/gi, 'lớn'],
    [/ch\s+ỉ/gi, 'chỉ'],
    [/v\s+ời/gi, 'vời'],
    [/th\s+ức/gi, 'thức'],
    [/th\s+ần/gi, 'thần'],
    [/ph\s+ước/gi, 'phước'],
    [/đ\s+ức/gi, 'đức'],
    [/n\s+ạn/gi, 'nạn'],
    [/ng\s+ực/gi, 'ngực'],
    [/s\s+ườn/gi, 'sườn'],
    [/h\s+ọng/gi, 'họng'],
    [/l\s+ưỡi/gi, 'lưỡi'],
    [/d\s+ục/gi, 'dục'],
    [/gi\s+ận/gi, 'giận'],
    [/h\s+ờn/gi, 'hờn'],
    [/ng\s+u/gi, 'ngu'],
    [/s\s+i/gi, 'si'],
    [/h\s+oạn/gi, 'hoạn'],
    [/t\s+âm/gi, 'tâm'],
    [/th\s+ân/gi, 'thân'],
    [/ph\s+áp/gi, 'pháp'],
    [/gi\s+ới/gi, 'giới'],
    [/t\s+inh/gi, 'tinh'],
    [/tr\s+ực/gi, 'trực'],
    [/gi\s+ác/gi, 'giác'],
    [/t\s+uệ/gi, 'tuệ'],
    [/th\s+ương/gi, 'thương'],
    [/t\s+ự/gi, 'tự'],
    [/t\s+ại/gi, 'tại'],
    [/t\s+hiên/gi, 'thiên'],
    [/b\s+ảo/gi, 'bảo'],
    [/h\s+òa/gi, 'hòa'],
    [/t\s+huận/gi, 'thuận'],
    [/q\s+uyến/gi, 'quyến'],
    [/t\s+huộc/gi, 'thuộc'],
    [/n\s+ghiệp/gi, 'nghiệp'],
    [/ch\s+ướng/gi, 'chướng'],
    [/k\s+hổ/gi, 'khổ'],
    [/n\s+ão/gi, 'não'],
    [/o\s+án/gi, 'oán'],
    [/t\s+hù/gi, 'thù'],
    [/s\s+ợ/gi, 'sợ'],
    [/h\s+ãi/gi, 'hãi'],
    [/b\s+ất/gi, 'bất'],
    [/a\s+n/gi, 'an'],
    [/t\s+rừ/gi, 'trừ'],
    [/d\s+iệt/gi, 'diệt'],
    [/t\s+iêu/gi, 'tiêu'],
    [/c\s+ứu/gi, 'cứu'],
    [/đ\s+ộ/gi, 'độ'],
    [/g\s+iải/gi, 'giải'],
    [/t\s+hoát/gi, 'thoát'],
    [/v\s+ô/gi, 'vô'],
    [/ú\s+y/gi, 'úy'],
    [/l\s+iền/gi, 'liền'],
    [/l\s+ìa/gi, 'lìa'],
    [/s\s+inh/gi, 'sinh'],
    [/t\s+ử/gi, 'tử'],
    [/k\s+iếp/gi, 'kiếp'],
    [/t\s+rì/gi, 'trì'],
    [/n\s+iệm/gi, 'niệm'],
    [/d\s+anh/gi, 'danh'],
    [/h\s+iệu/gi, 'hiệu'],
    [/t\s+hần/gi, 'thần'],
    [/t\s+hông/gi, 'thông'],
    [/b\s+iến/gi, 'biến'],
    [/h\s+óa/gi, 'hóa'],
    [/c\s+ông/gi, 'công'],
    [/đ\s+oạn/gi, 'đoạn'],
    [/t\s+rộm/gi, 'trộm'],
    [/c\s+ướp/gi, 'cướp'],
    [/c\s+hiến/gi, 'chiến'],
    [/t\s+ranh/gi, 'tranh'],
    [/h\s+ỏa/gi, 'hỏa'],
    [/t\s+ai/gi, 'tai'],
    [/h\s+ọa/gi, 'họa'],
    [/đ\s+ộng/gi, 'động'],
    [/đ\s+ất/gi, 'đất'],
    [/s\s+ấm/gi, 'sấm'],
    [/s\s+ét/gi, 'sét'],
    [/k\s+hủng/gi, 'khủng'],
    [/b\s+ố/gi, 'bố'],
    [/r\s+ắn/gi, 'rắn'],
    [/r\s+ít/gi, 'rít'],
    [/b\s+ò/gi, 'bò'],
    [/c\s+ạp/gi, 'cạp'],
    [/c\s+ầm/gi, 'cầm'],
    [/t\s+hú/gi, 'thú'],
    [/d\s+ữ/gi, 'dữ'],
    [/đ\s+ộc/gi, 'độc'],
    [/t\s+huốc/gi, 'thuốc'],
    [/b\s+ùa/gi, 'bùa'],
    [/c\s+hú/gi, 'chú'],
    [/t\s+rù/gi, 'trù'],
    [/ế\s+m/gi, 'ếm'],
    [/t\s+hư/gi, 'thư'],
    [/m\s+ộng/gi, 'mộng'],
    [/đ\s+iềm/gi, 'điềm'],
    [/q\s+uái/gi, 'quái'],
    [/d\s+ị/gi, 'dị']
  ];

  for (const [pattern, rep] of replacements) {
    s = s.replace(pattern, rep);
  }

  // Generic single consonant + space + accented vowel
  s = s.replace(/\b([a-zA-ZđĐ]{1,2})\s+([àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ][a-zA-Zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]*)/gu, '$1$2');

  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

// 42 Thủ Nhãn Titles Map
const THU_NHAN_NAMES = {
  1: { title: "Như Ý Châu Quán Thế Âm", weapon: "Như Ý Bảo Châu", remedy: "Cầu phước đức, tài lộc dồi dào, tâm nguyện như ý" },
  2: { title: "Dương Liễu Quán Thế Âm", weapon: "Cành Dương Liễu", remedy: "Tiêu trừ các thứ bệnh tật trên thân thể" },
  3: { title: "Bảo Bát Quán Thế Âm", weapon: "Bát Báu (Bảo Bát)", remedy: "Trị các bệnh trong bụng, nội tạng, tiêu hóa" },
  4: { title: "Nhật Tinh Ma Ni Quán Thế Âm", weapon: "Châu Nhật Tinh", remedy: "Trị bệnh mắt mờ, mang lại quang minh tuệ giác" },
  5: { title: "Bạt Chiết La Quán Thế Âm", weapon: "Bạt Chiết La (Kim Cang)", remedy: "Hàng phục thiên ma tà thần, bảo vệ chánh niệm" },
  6: { title: "Kim Cang Chày Quán Thế Âm", weapon: "Chày Kim Cang", remedy: "Hàng phục oán tặc, kẻ ác quấy phá" },
  7: { title: "Thí Vô Úy Quán Thế Âm", weapon: "Tay Thí Vô Úy", remedy: "Dập tắt sợ hãi, hoang mang, an định tâm thần" },
  8: { title: "Quyến Sách Quán Thế Âm", weapon: "Dây Quyến Sách", remedy: "Tiêu trừ khuấy rối, tâm thần được an ổn tĩnh tại" },
  9: { title: "Nguyệt Tinh Ma Ni Quán Thế Âm", weapon: "Châu Nguyệt Tinh", remedy: "Trị nhiệt độc, sốt cao, dập tắt lửa sân hận" },
  10: { title: "Bảo Cung Quán Thế Âm", weapon: "Cung Báu", remedy: "Cầu thăng tiến công danh, địa vị, chức nghiệp hanh thông" },
  11: { title: "Bảo Tiễn Quán Thế Âm", weapon: "Tên Báu", remedy: "Mau gặp bạn lành, quý nhân tương trợ" },
  12: { title: "Bảo Kiếm Quán Thế Âm", weapon: "Gươm Báu", remedy: "Trừ quỷ thần, tạp mị, vọng lượng quấy phá" },
  13: { title: "Bạch Phất Quán Thế Âm", weapon: "Cây Phất Trắng", remedy: "Quét sạch chướng nạn ác hiểm bám bên thân" },
  14: { title: "Hồ Bình Quán Thế Âm", weapon: "Hồ Bình (Bảo Bình)", remedy: "Quyến thuộc hòa thuận, gia đạo êm ấm, dứt bất hòa" },
  15: { title: "Bàng Bài Quán Thế Âm", weapon: "Khiên Bàng Bài", remedy: "Xua đuổi ác thú hung dữ, hổ báo sài lang" },
  16: { title: "Phủ Việt Quán Thế Âm", weapon: "Rìu Phủ Việt", remedy: "Lìa nạn quan quân bắt bớ, thoát lao tù ngục hình" },
  17: { title: "Ngọc Hoàn Quán Thế Âm", weapon: "Vòng Ngọc", remedy: "Cầu được người trợ lực, đồng hành tận tụy" },
  18: { title: "Bạch Liên Hoa Quán Thế Âm", weapon: "Hoa Sen Trắng", remedy: "Thành tựu mọi công đức lành, tâm hồn thanh tịnh" },
  19: { title: "Thanh Liên Hoa Quán Thế Âm", weapon: "Hoa Sen Xanh", remedy: "Cầu sinh mười phương tịnh độ, tiêu trừ trầm luân" },
  20: { title: "Bảo Kính Quán Thế Âm", weapon: "Gương Báu", remedy: "Khai mở đại trí huệ, thấu suốt vạn pháp" },
  21: { title: "Tử Liên Hoa Quán Thế Âm", weapon: "Hoa Sen Tím", remedy: "Diện kiến mười phương chư Phật, kết duyên đại đạo" },
  22: { title: "Bảo Kíp Quán Thế Âm", weapon: "Bảo Kíp (Hộp Báu)", remedy: "Khai mở kho báu ẩn sâu, khơi thông phúc lộc tiềm ẩn" },
  23: { title: "Ngũ Sắc Vân Quán Thế Âm", weapon: "Mây Ngũ Sắc", remedy: "Đắc đạo giải thoát, tâm thức nhẹ nhàng phiêu diêu" },
  24: { title: "Quân Trì Bình Quán Thế Âm", weapon: "Bình Quân Trì", remedy: "Tịnh hóa thân tâm, sinh lên cõi Phạm Thiên thanh tịnh" },
  25: { title: "Hồng Liên Hoa Quán Thế Âm", weapon: "Hoa Sen Hồng", remedy: "Sinh lên các cảnh giới an lành, tiêu trừ khổ ách" },
  26: { title: "Bảo Kích Quán Thế Âm", weapon: "Cây Bảo Kích", remedy: "Xua đuổi giặc nghịch phương xa xâm hại, giữ vững bình yên" },
  27: { title: "Bảo Loa Quán Thế Âm", weapon: "Ống Loa Báu", remedy: "Triệu thỉnh chư thiên thiện thần thường đến ủng hộ" },
  28: { title: "Độc Lâu Trượng Quán Thế Âm", weapon: "Gậy Đầu Lâu", remedy: "Nhiếp phục quỷ thần, hóa giải bùa ngải u ám" },
  29: { title: "Tràng Hạt Quán Thế Âm", weapon: "Xâu Chuỗi Ngọc", remedy: "Chư Phật mười phương sớm đưa tay tiếp dẫn" },
  30: { title: "Bảo Linh Quán Thế Âm", weapon: "Chiếc Linh Báu", remedy: "Âm thanh thanh thoát nhiệm mầu, tiếng nói truyền cảm từ ái" },
  31: { title: "Bảo Ấn Quán Thế Âm", weapon: "Chiếc Ấn Báu", remedy: "Miệng nói biện luận khéo léo, thắng lý lẽ tranh tụng" },
  32: { title: "Thiết Câu Quán Thế Âm", weapon: "Câu Sắt (Thiết Câu)", remedy: "Được Thiên thần, Long vương ngày đêm ủng hộ" },
  33: { title: "Tích Trượng Quán Thế Âm", weapon: "Cây Tích Trượng", remedy: "Lòng từ bi che chở cho tất cả muôn loài chúng sinh" },
  34: { title: "Hợp Chưởng Quán Thế Âm", weapon: "Tay Hiệp Chưởng", remedy: "Muôn người cung kính, thương mến, hóa giải hận thù" },
  35: { title: "Hóa Phật Quán Thế Âm", weapon: "Hiện Hóa Phật", remedy: "Đời đời kiếp kiếp sinh nơi có Phật pháp soi đường" },
  36: { title: "Hóa Cung Điện Quán Thế Âm", weapon: "Hóa Cung Điện", remedy: "Không đọa thai môn tăm tối, thường ở cảnh giới tịnh lạc" },
  37: { title: "Bảo Kinh Quán Thế Âm", weapon: "Quyển Kinh Báu", remedy: "Học rộng nghe nhiều, trí nhớ thông minh tuyệt đỉnh" },
  38: { title: "Kim Luân Bất Thối Quán Thế Âm", weapon: "Bất Thối Kim Luân", remedy: "Tâm bồ đề kiên cố không lui sụt, vượt qua muôn kiếp nạn" },
  39: { title: "Đảnh Thượng Hóa Phật Quán Thế Âm", weapon: "Đảnh Thượng Hóa Phật", remedy: "Chư Phật mười phương mau đến xoa đầu thọ ký" },
  40: { title: "Bồ Đào Quán Thế Âm", weapon: "Chùm Bồ Đào", remedy: "Cây trái mùa màng bội thu, hoa màu no ấm, của cải đủ đầy" },
  41: { title: "Cam Lộ Quán Thế Âm", weapon: "Nước Cam Lộ", remedy: "Cứu vớt đói khát, dập tắt lửa dữ sân si, thân tâm tươi mát" },
  42: { title: "Tổng Nhiếp Thiên Thủ Quán Thế Âm", weapon: "Tổng Nhiếp Thiên Thủ", remedy: "Hàng phục vạn ma cõi đại thiên, uy lực vô song bất hoại" },
};

const CATEGORIES = {
  TAI_ACH_BENH_TAT: {
    key: 'TAI_ACH_BENH_TAT',
    title: 'Tai Ách, Bệnh Tật & Tật Ách',
    color: '#ef4444',
    icon: 'HeartPulse',
    desc: 'Đối trị thân mang bệnh tật, nghiệp bệnh trầm kha, tai nạn sông nước lửa cháy sấm sét, thú dữ độc hại.'
  },
  QUAN_TUNG_KHAU_THIET: {
    key: 'QUAN_TUNG_KHAU_THIET',
    title: 'Quan Tụng, Kiện Cáo & Khẩu Thiệt Oán Thù',
    color: '#f59e0b',
    icon: 'ShieldCheck',
    desc: 'Hóa giải quan sự kiện tụng, lao ngục giam cầm, tranh chấp thị phi, oán gia báo oán và ác ngữ vu khống.'
  },
  TAI_LOC_TAC_NGHEN: {
    key: 'TAI_LOC_TAC_NGHEN',
    title: 'Tài Lộc Tắc Nghẽn, Phá Sản & Thất Thoát',
    color: '#10b981',
    icon: 'TrendingUp',
    desc: 'Khai thông tài mạch tắc nghẽn, cứu vãn phá sản bế tắc, cầu phước đức điền sản, mùa màng và công danh hanh thông.'
  },
  HON_NHAN_GIA_DAO: {
    key: 'HON_NHAN_GIA_DAO',
    title: 'Hôn Nhân Bất Hòa, Ly Tan & Gia Đạo Bất An',
    color: '#ec4899',
    icon: 'HeartHandshake',
    desc: 'Hòa giải xung khắc phu thê, ngăn ngừa ly tán, cầu sinh con cái hiếu thuận, quyến thuộc bình an hòa thuận.'
  },
  AC_MONG_BAT_AN: {
    key: 'AC_MONG_BAT_AN',
    title: 'Ác Mộng, Hoang Mang, Bất An & Sợ Hãi Vô Cớ',
    color: '#8b5cf6',
    icon: 'Sparkles',
    desc: 'Tiêu trừ ác mộng quái dị, bóng đè, tà linh khuấy nhiễu, hoảng loạn sợ hãi vô cớ, an định thần hồn thanh tịnh.'
  },
  NGHIEP_CHUONG_SAM_HOI: {
    key: 'NGHIEP_CHUONG_SAM_HOI',
    title: 'Nghiệp Chướng Nặng Nề & Sám Hối Tịnh Hóa',
    color: '#06b6d4',
    icon: 'Compass',
    desc: 'Sám hối vạn kiếp ác nghiệp, thanh lọc thân khẩu ý, đoạn trừ tham sân si, khơi mở tuệ giác và vãng sinh tịnh độ.'
  }
};

function determineCategory(id, text) {
  const t = text.toLowerCase();

  // Special explicit checks for early items
  if (id === 1 || id === 10 || id === 22 || id === 40 || id === 63 || id === 64 || id === 65 || id === 157) {
    return 'TAI_LOC_TAC_NGHEN';
  }
  if (id === 14 || id === 34 || id === 458 || id === 455) {
    return 'HON_NHAN_GIA_DAO';
  }
  if (id === 6 || id === 16 || id === 26 || id === 31 || id === 54 || id === 55 || id === 156 || id === 161 || id === 175 || id === 176 || id === 177 || id === 490) {
    return 'QUAN_TUNG_KHAU_THIET';
  }
  if (id === 7 || id === 8 || id === 12 || id === 15 || id === 28 || id === 42 || id === 51 || id === 52 || id === 57 || id === 81 || id === 82 || id === 147 || id === 183 || id === 185 || id === 186 || id === 489) {
    return 'AC_MONG_BAT_AN';
  }
  if ([2, 3, 4, 9, 41, 43, 44, 45, 46, 47, 48, 49, 50, 53, 56, 58, 59, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 158, 174, 178, 179, 180, 181, 182, 184, 187, 454, 476].includes(id)) {
    return 'TAI_ACH_BENH_TAT';
  }

  // Regex & keyword rules
  if (t.includes('quan quân') || t.includes('vời bắt') || t.includes('kiện') || t.includes('lao ngục') ||
      t.includes('nhốt đánh') || t.includes('oán thù') || t.includes('giặc') || t.includes('oán tặc') ||
      t.includes('oan gia') || t.includes('trộm cướp') || t.includes('biện luận') || t.includes('chiến tranh') ||
      t.includes('thù địch') || t.includes('mưu nghịch')) {
    return 'QUAN_TUNG_KHAU_THIET';
  }

  if (t.includes('ác mộng') || t.includes('điềm quái') || t.includes('sợ hãi') || t.includes('khủng bố') ||
      t.includes('quỷ thần dữ') || t.includes('ma oán') || t.includes('tà thần') || t.includes('sơn tinh') ||
      t.includes('trù ếm') || t.includes('bùa chú') || t.includes('cuồng loạn mất trí') || t.includes('lửa phiền não') ||
      t.includes('khuấy rối')) {
    return 'AC_MONG_BAT_AN';
  }

  if (t.includes('bệnh') || t.includes('bịnh') || t.includes('thuốc độc') || t.includes('đau đớn') ||
      t.includes('cùi hủi') || t.includes('sốt rét') || t.includes('ho lao') || t.includes('nước cuốn') ||
      t.includes('lửa cháy') || t.includes('sấm sét') || t.includes('động đất') || t.includes('rắn độc') ||
      t.includes('bò cạp') || t.includes('cầm thú dữ') || t.includes('chết') || t.includes('bệnh nan y') ||
      t.includes('hoạnh tử') || t.includes('bị thương')) {
    return 'TAI_ACH_BENH_TAT';
  }

  if (t.includes('quyến thuộc') || t.includes('hòa thuận') || t.includes('phu thê') || t.includes('vợ chồng') ||
      t.includes('con trai') || t.includes('con gái') || t.includes('cha mẹ') || t.includes('cầu tự') ||
      t.includes('lìa lòng dục') || t.includes('yêu mến')) {
    return 'HON_NHAN_GIA_DAO';
  }

  if (t.includes('giàu lớn') || t.includes('châu báu') || t.includes('của cải') || t.includes('kho báu') ||
      t.includes('làm quan') || t.includes('lên chức') || t.includes('ngũ cốc') || t.includes('mùa no ấm') ||
      t.includes('lợi ích thế gian') || t.includes('phước đức') || t.includes('bảo kíp') || t.includes('tài bảo')) {
    return 'TAI_LOC_TAC_NGHEN';
  }

  return 'NGHIEP_CHUONG_SAM_HOI';
}

function extractMantra(id, text) {
  // If text contains "Chân ngôn rằng:"
  const mantraMatch = text.match(/Chân ngôn r\s*ằng:\s*([^\.]+[\.])/i);
  if (mantraMatch) {
    return mantraMatch[1].trim();
  }
  // Default solemn invocation
  if (THU_NHAN_NAMES[id]) {
    return `Nam Mô Đại Bi Quán Thế Âm Bồ Tát (${THU_NHAN_NAMES[id].title})`;
  }
  return `Nam Mô Đại Từ Đại Bi Cứu Khổ Cứu Nạn Quán Thế Âm Bồ Tát`;
}

function generateShortTitle(id, text, category) {
  if (THU_NHAN_NAMES[id]) {
    return THU_NHAN_NAMES[id].title;
  }

  let cleaned = text.replace(/^Kính lạy bồ tát Quán Thế Âm,\s*/i, '');
  cleaned = cleaned.replace(/^chú lực\s*/i, '');
  cleaned = cleaned.replace(/^ngài có năng lực\s*/i, '');
  cleaned = cleaned.replace(/^ngài\s*/i, '');

  // Truncate to concise title
  const firstClause = cleaned.split(/[,;\.]/)[0].trim();
  if (firstClause.length > 35) {
    return firstClause.slice(0, 32) + '...';
  }
  return firstClause.charAt(0).toUpperCase() + firstClause.slice(1);
}

function generateMindsetAdvice(category, shortTitle) {
  switch (category) {
    case 'TAI_ACH_BENH_TAT':
      return 'Tâm định thì khí hòa, khí hòa thì huyết thông. Hướng tâm về Bồ Tát với lòng chí thành sám hối nghiệp sát, giữ thân thanh tịnh, dùng năng lượng từ bi chuyển hóa bệnh nghiệp.';
    case 'QUAN_TUNG_KHAU_THIET':
      return 'Oán thù nên cởi không nên buộc. Khi đối diện tranh tụng thị phi, hãy giữ tâm như nước lặng, không khởi sân si, hướng thiện hồi hướng cho đối phương để hóa giải oán kết nhiều đời.';
    case 'TAI_LOC_TAC_NGHEN':
      return 'Tài bảo thế gian bắt nguồn từ hạt mầm bố thí và phước đức. Hãy phát tâm buông xả keo kiệt, thành tâm trì niệm để khai mở thiện tâm, gieo trồng ruộng phước thì quả lành tự đến.';
    case 'HON_NHAN_GIA_DAO':
      return 'Gia đạo là cõi tu tập nhẫn nhục. Hãy nhìn người thân bằng đôi mắt từ ái, dẹp bỏ bản ngã và thói cố chấp, chí thành cầu nguyện Bồ Tát gia hộ cho quyến thuộc được thuận hòa êm ấm.';
    case 'AC_MONG_BAT_AN':
      return 'Tâm an thì cảnh an, ma quỷ bắt nguồn từ bóng tối vọng tưởng. Trước khi ngủ hoặc khi bất an, trì niệm danh hiệu Bồ Tát để ánh sáng vô úy chiếu rọi, xua tan mọi bóng đen hãi hùng.';
    case 'NGHIEP_CHUONG_SAM_HOI':
    default:
      return 'Tội từ tâm khởi đem tâm sám, tâm được tịnh rồi tội liền tiêu. Đem lòng chân thành cúi đầu quy ngưỡng, nguyện dứt trừ vạn điều ác, làm mọi việc lành để thân tâm nhẹ nhõm thanh thản.';
  }
}

// Build 500 records
const records = [];

for (let i = 1; i <= 500; i++) {
  const rawText = cleanVietnamese(rawData[i] || '');
  const categoryKey = determineCategory(i, rawText);
  const categoryMeta = CATEGORIES[categoryKey];
  const shortTitle = generateShortTitle(i, rawText, categoryKey);
  const mantra = extractMantra(i, rawText);
  const mindset = generateMindsetAdvice(categoryKey, shortTitle);

  let meaning = rawText;
  if (THU_NHAN_NAMES[i]) {
    meaning = `${THU_NHAN_NAMES[i].weapon}: ${THU_NHAN_NAMES[i].remedy}. ${rawText}`;
  }

  const record = {
    id: i,
    name: `Nam Mô Quán Thế Âm Bồ Tát - ${shortTitle}`,
    shortTitle: shortTitle,
    category: categoryKey,
    categoryTitle: categoryMeta.title,
    originalText: rawText,
    mantra: mantra,
    meaning: meaning,
    recommendedCount: (i <= 42 || [43, 56, 57, 187, 458, 490].includes(i)) ? 108 : 21,
    mindsetAdvice: mindset,
    keywords: [
      shortTitle.toLowerCase(),
      categoryMeta.title.toLowerCase(),
      ...(THU_NHAN_NAMES[i] ? [THU_NHAN_NAMES[i].weapon.toLowerCase()] : [])
    ]
  };

  records.push(record);
}

// Write to JSON file
const outPath = path.join(__dirname, '../src/data/nguBachDanh500.json');
fs.writeFileSync(outPath, JSON.stringify(records, null, 2), 'utf8');

console.log(`Successfully generated 500 records at ${outPath}`);
console.log('Category breakdown:');
const counts = {};
records.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });
console.log(counts);
