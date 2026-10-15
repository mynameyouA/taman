"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Compass,
  Sparkles,
  Flame,
  Shield,
  Activity,
  HelpCircle,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";

export interface CanhGioDetails {
  chi: string;
  name: string;
  rangeText: string;
  startHour: number;
  endHour: number;
  element: "Thủy" | "Thổ" | "Mộc" | "Hỏa" | "Kim";
  elementColor: string;
  elementStatus: string; // e.g. "Thổ Vượng Sinh Kim"
  quality: "Đại Cát" | "Tiểu Cát" | "Trung Hòa" | "Cần Thận Trọng";
  actionAdvice: string;
  avoidAdvice: string;
  suitableActivities: string[];
  zenTip: string;
}

export const CANH_GIO_12: CanhGioDetails[] = [
  {
    chi: "Tý",
    name: "Giờ Tý (Dạ Bán)",
    rangeText: "23:00 - 00:59",
    startHour: 23,
    endHour: 1,
    element: "Thủy",
    elementColor: "#38bdf8",
    elementStatus: "Thủy Khí Cực Thịnh • Dương Khí Khởi Sinh",
    quality: "Đại Cát",
    actionAdvice: "Thiền định sâu, tĩnh dưỡng tái tạo tế bào não bộ, buông thư tuyệt đối.",
    avoidAdvice: "Tránh thức khuya ăn uống thịnh soạn, tránh lao lực suy nghĩ tiêu cực.",
    suitableActivities: ["Tọa thiền dưỡng khí", "Nghe sóng Solfeggio 432Hz", "Nghỉ ngơi an giấc"],
    zenTip: "Một giấc ngủ sâu giờ Tý bằng ngàn thang thuốc bổ dưỡng tâm.",
  },
  {
    chi: "Sửu",
    name: "Giờ Sửu (Hoang Kê)",
    rangeText: "01:00 - 02:59",
    startHour: 1,
    endHour: 3,
    element: "Thổ",
    elementColor: "#fbbf24",
    elementStatus: "Thổ Đới Thủy Kỷ • Can Kinh Hoạt Động Mở Rộng",
    quality: "Trung Hòa",
    actionAdvice: "Dưỡng gan lọc độc tố, duy trì trạng thái ngủ sâu và mộng an lành.",
    avoidAdvice: "Tuyệt đối tránh dậy làm việc khuya gây hao tổn can huyết.",
    suitableActivities: ["Ngủ sâu", "Giải độc can tạng", "Cầu nguyện trong vô thức"],
    zenTip: "Hãy để gan tự chữa lành trong bóng tối tịch tĩnh của cõi vô vi.",
  },
  {
    chi: "Dần",
    name: "Giờ Dần (Bình Minh)",
    rangeText: "03:00 - 04:59",
    startHour: 3,
    endHour: 5,
    element: "Mộc",
    elementColor: "#34d399",
    elementStatus: "Dương Khí Bừng Nở • Phế Kinh Chủ Khí",
    quality: "Đại Cát",
    actionAdvice: "Tập thở sâu, hít thở dưỡng khí trong lành, khởi tâm biết ơn ngày mới.",
    avoidAdvice: "Tránh gió lạnh lùa trực tiếp, tránh suy nghĩ u uất.",
    suitableActivities: ["Thở 4-7-8 dưỡng phổi", "Chiêm bốc định hướng", "Lần tràng hạt cầu an"],
    zenTip: "Phế chủ khí toàn thân. Hơi thở sâu lúc rạng đông nạp đầy sinh lực cho cả ngày.",
  },
  {
    chi: "Mão",
    name: "Giờ Mão (Nhật Xuất)",
    rangeText: "05:00 - 06:59",
    startHour: 5,
    endHour: 7,
    element: "Mộc",
    elementColor: "#22c55e",
    elementStatus: "Mộc Khí Tươi Tốt • Đại Tràng Thải Độc",
    quality: "Tiểu Cát",
    actionAdvice: "Uống ly nước ấm thanh lọc cơ thể, đi bộ nhẹ nhàng dưới ánh bình minh.",
    avoidAdvice: "Tránh bỏ bữa sáng hoặc ăn đồ lạnh kích ứng tiêu hóa.",
    suitableActivities: ["Đi dạo chánh niệm", "Uống nước ấm", "Lên kế hoạch trọng tâm"],
    zenTip: "Mặt trời mọc thanh lọc vạn vật, uống nước ấm đánh thức mọi giác quan.",
  },
  {
    chi: "Thìn",
    name: "Giờ Thìn (Thực Thời)",
    rangeText: "07:00 - 08:59",
    startHour: 7,
    endHour: 9,
    element: "Thổ",
    elementColor: "#eab308",
    elementStatus: "Thổ Khí Vượng Thịnh • Vị Kinh Hấp Thu Dinh Dưỡng",
    quality: "Đại Cát",
    actionAdvice: "Dùng bữa sáng đủ chất, bắt đầu khởi sự công việc với tinh thần hứng khởi.",
    avoidAdvice: "Tránh tranh cãi đầu ngày, tránh bỏ bữa ăn sáng.",
    suitableActivities: ["Ăn sáng bồi dưỡng", "Gặp gỡ trao đổi năng lượng", "Làm việc quan trọng nhất"],
    zenTip: "Thổ sinh vạn vật. Bữa sáng chu đáo là nền móng sinh năng lượng dồi dào.",
  },
  {
    chi: "Tỵ",
    name: "Giờ Tỵ (Ngung Trung)",
    rangeText: "09:00 - 10:59",
    startHour: 9,
    endHour: 11,
    element: "Hỏa",
    elementColor: "#f97316",
    elementStatus: "Hỏa Khí Bốc Cao • Tỳ Kinh Vận Hóa Tinh Khí",
    quality: "Đại Cát",
    actionAdvice: "Đàm phán hợp đồng, họp chiến lược, giải quyết các thách thức tư duy cao độ.",
    avoidAdvice: "Tránh phân tâm lướt mạng xã hội vô bổ làm hao phí trí lực vàng.",
    suitableActivities: ["Đàm phán tài chính", "Ký kết giao dịch", "Sáng tạo đột phá"],
    zenTip: "Tư duy sắc bén nhất trong ngày. Hãy dành giờ Tỵ cho công việc quyết định thành bại.",
  },
  {
    chi: "Ngọ",
    name: "Giờ Ngọ (Nhật Trung)",
    rangeText: "11:00 - 12:59",
    startHour: 11,
    endHour: 13,
    element: "Hỏa",
    elementColor: "#ef4444",
    elementStatus: "Dương Khí Cực Đỉnh • Tâm Kinh Chủ Thần Minh",
    quality: "Tiểu Cát",
    actionAdvice: "Chợp mắt nghỉ trưa 15 - 20 phút (thiền ngủ), dưỡng tâm an thần.",
    avoidAdvice: "Tránh vận động cường độ cao dưới nắng gắt, tránh ăn quá no.",
    suitableActivities: ["Chợp mắt 20 phút", "Dưỡng tâm an tĩnh", "Nghe nhạc thiền nhẹ"],
    zenTip: "Một giấc ngủ ngắn giờ Ngọ giúp quân bình âm dương, bảo vệ trái tim minh mẫn.",
  },
  {
    chi: "Mùi",
    name: "Giờ Mùi (Nhật Điệt)",
    rangeText: "13:00 - 14:59",
    startHour: 13,
    endHour: 15,
    element: "Thổ",
    elementColor: "#d97706",
    elementStatus: "Thổ Hòa Âm Dương • Tiểu Tràng Phân Loại Chất Dinh Dưỡng",
    quality: "Trung Hòa",
    actionAdvice: "Tiếp tục công việc cần cù, giải quyết thư từ hồ sơ, kiểm tra số liệu.",
    avoidAdvice: "Tránh đưa ra các quyết định nóng vội hoặc hành động bốc đồng.",
    suitableActivities: ["Xử lý công văn giấy tờ", "Học tập nghiên cứu", "Uống trà dưỡng sinh"],
    zenTip: "Vạn sự tuần tự nhi tiến. Giữ tâm điềm đạm trước các sự cố nhỏ.",
  },
  {
    chi: "Thân",
    name: "Giờ Thân (Phổ Thì)",
    rangeText: "15:00 - 16:59",
    startHour: 15,
    endHour: 17,
    element: "Kim",
    elementColor: "#cbd5e1",
    elementStatus: "Kim Khí Thanh Sắc • Bàng Quang Kinh Đào Thải",
    quality: "Đại Cát",
    actionAdvice: "Gặp gỡ khách hàng, làm việc nhóm, rèn luyện thể thao nhẹ, uống đủ nước.",
    avoidAdvice: "Tránh ngồi bất động quá lâu, tránh nhịn tiểu tiện.",
    suitableActivities: ["Vận động thể thao", "Chốt giao dịch bán hàng", "Uống nước lọc bù khoáng"],
    zenTip: "Kim mang tính quyết đoán và hanh thông. Năng lượng tích cực lan tỏa mạnh mẽ.",
  },
  {
    chi: "Dậu",
    name: "Giờ Dậu (Nhật Nhập)",
    rangeText: "17:00 - 18:59",
    startHour: 17,
    endHour: 19,
    element: "Kim",
    elementColor: "#94a3b8",
    elementStatus: "Âm Khí Dần Tăng • Thận Kinh Tàng Tinh",
    quality: "Tiểu Cát",
    actionAdvice: "Kết thúc công việc cơ quan, sum họp gia đình, bồi bổ thận khí ấm áp.",
    avoidAdvice: "Tránh tăng ca quá khuya, tránh sử dụng chất kích thích nồng độ cao.",
    suitableActivities: ["Bữa cơm gia đình", "Ngâm chân nước ấm", "Buông xả việc công việc"],
    zenTip: "Hoàng hôn buông xuống, hãy khép lại âu lo công việc để trở về với tổ ấm.",
  },
  {
    chi: "Tuất",
    name: "Giờ Tuất (Hoàng Hôn)",
    rangeText: "19:00 - 20:59",
    startHour: 19,
    endHour: 21,
    element: "Thổ",
    elementColor: "#a855f7",
    elementStatus: "Thổ Đới Hỏa Khí • Tâm Bào Kinh Bảo Vệ Tim",
    quality: "Đại Cát",
    actionAdvice: "Trò chuyện ấm áp cùng người thân, đọc sách nâng cao tâm thức, nghe nhạc thư thái.",
    avoidAdvice: "Tránh xem tin tức tiêu cực giật gân, tránh cãi vã trong gia đình.",
    suitableActivities: ["Đọc sách minh triết", "Tâm sự gia đình", "Khai mở trực giác Tarot"],
    zenTip: "Tâm Bào che chở trái tim. Hãy dành buổi tối cho tiếng cười và sự yêu thương.",
  },
  {
    chi: "Hợi",
    name: "Giờ Hợi (Nhân Định)",
    rangeText: "21:00 - 22:59",
    startHour: 21,
    endHour: 23,
    element: "Thủy",
    elementColor: "#6366f1",
    elementStatus: "Thủy Khí Tĩnh Lặng • Tam Tiêu Kinh Điều Hòa Khí Huyết",
    quality: "Đại Cát",
    actionAdvice: "Tắt màn hình điện tử, massage thư giãn, thiền buông thư chuẩn bị vào giấc ngủ.",
    avoidAdvice: "Tránh ăn đêm, tránh tranh luận gay gắt qua điện thoại.",
    suitableActivities: ["Thiền nằm buông thư", "Trầm hương tịnh hóa", "Đi vào giấc ngủ an lành"],
    zenTip: "Nhân định là lúc người yên cảnh vắng. Hãy đưa tâm về trạng thái không-nghĩ-suy.",
  },
];

// Hàm lấy thông tin Canh Giờ Hiện Tại
export function getCurrentCanhGio(): { current: CanhGioDetails; index: number; next: CanhGioDetails } {
  const currentHour = new Date().getHours();
  let index = 0;

  if (currentHour === 23 || currentHour === 0) {
    index = 0; // Giờ Tý
  } else {
    // 1-2: Sửu (index 1), 3-4: Dần (index 2), 5-6: Mão (index 3), ...
    index = Math.floor((currentHour + 1) / 2) % 12;
  }

  const current = CANH_GIO_12[index];
  const next = CANH_GIO_12[(index + 1) % 12];
  return { current, index, next };
}

export default function CosmicClockWidget() {
  const [canhInfo, setCanhInfo] = useState<{
    current: CanhGioDetails;
    index: number;
    next: CanhGioDetails;
  } | null>(null);

  const [hoveredChiIndex, setHoveredChiIndex] = useState<number | null>(null);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setCanhInfo(getCurrentCanhGio());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!canhInfo) return null;

  const activeChi = hoveredChiIndex !== null ? CANH_GIO_12[hoveredChiIndex] : canhInfo.current;
  const isViewingCurrent = hoveredChiIndex === null || hoveredChiIndex === canhInfo.index;

  // Góc xoay của kim chỉ giờ hoàng đạo (12 canh giờ, mỗi canh 30 độ)
  const clockAngle = (canhInfo.index * 30) - 90; // Tý ở góc 90 độ hoặc xoay theo trục chuẩn

  return (
    <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0c1427]/90 via-[#070d1e]/90 to-[#040814]/90 border border-[#d4af37]/35 shadow-[0_15px_45px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#d4af37]/15 to-transparent blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 to-transparent blur-3xl rounded-full" />

      {/* Header Widget */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fcd34d] animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#fcd34d]">
              Bát Tự Canh Giờ • Cosmic Clock
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
            Đồng Hồ Vận Khí Bát Tự 12 Canh Giờ
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Phân tích Ngũ Hành vượng suy và chỉ dẫn cát tường trong từng thời khắc vũ trụ
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-emerald-300 flex items-center gap-2 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-[#34d399]" />
            <span className="font-bold tracking-wider">{currentTimeStr || "Đang đồng bộ..."}</span>
          </div>
        </div>
      </div>

      {/* Body: Vòng tròn 12 Canh Giờ và Bảng Phân Tích Thực Tiễn */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* Phần 1: Bát Tự Hoàng Đạo Luân 12 Canh Giờ (Clock Dial) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-[#d4af37]/40 bg-[#060a17]/90 shadow-[0_0_35px_rgba(212,175,55,0.2),inset_0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center p-4 select-none">
            {/* Vòng viền ngoài trang trí bát quái */}
            <div className="absolute inset-1.5 rounded-full border border-dashed border-white/15 pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-white/10 pointer-events-none" />

            {/* Tâm đồng hồ thái cực âm dương */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-[#121c33] to-[#0a1020] border border-[#d4af37]/70 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Hiện Tại</span>
              <span className="text-lg font-serif font-bold text-[#fef08a] leading-none my-0.5">
                {canhInfo.current.chi}
              </span>
              <span className="text-[9px] font-mono text-emerald-400">{canhInfo.current.element}</span>
            </div>

            {/* Kim xoay chỉ canh giờ hiện tại */}
            <motion.div
              initial={false}
              animate={{ rotate: canhInfo.index * 30 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="absolute w-full h-full pointer-events-none flex items-center justify-center z-[5]"
            >
              <div className="w-[2px] h-28 bg-gradient-to-t from-transparent via-[#fcd34d] to-[#fef08a] -translate-y-14 rounded-full shadow-[0_0_12px_#fcd34d]" />
              <div className="absolute -translate-y-28 w-3 h-3 rounded-full bg-[#fef08a] border-2 border-slate-900 shadow-[0_0_10px_#fcd34d]" />
            </motion.div>

            {/* 12 Vị trí Địa Chi xếp tròn quanh đồng hồ */}
            {CANH_GIO_12.map((item, idx) => {
              const angle = (idx * 30 - 90) * (Math.PI / 180);
              const radius = 105; // bán kính px
              const x = Math.round(radius * Math.cos(angle));
              const y = Math.round(radius * Math.sin(angle));

              const isCurrent = idx === canhInfo.index;
              const isSelected = hoveredChiIndex === idx;

              return (
                <button
                  key={item.chi}
                  onClick={() => {
                    zenAudio.playSoftTap(600 + idx * 30, 0.03);
                    setHoveredChiIndex(isSelected ? null : idx);
                  }}
                  onMouseEnter={() => setHoveredChiIndex(idx)}
                  onMouseLeave={() => setHoveredChiIndex(null)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  title={`${item.name}: ${item.rangeText}`}
                  className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif font-bold transition-all duration-300 z-10 cursor-pointer ${
                    isCurrent
                      ? "bg-[#d4af37] text-slate-950 scale-110 shadow-[0_0_15px_#fcd34d] border border-white"
                      : isSelected
                      ? "bg-white/20 text-[#fef08a] scale-105 border border-[#d4af37]"
                      : "bg-[#0b1329]/90 text-slate-300 hover:text-white border border-white/10 hover:border-white/30"
                  }`}
                >
                  {item.chi}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-3 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" /> Canh giờ đương lệnh
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-600" /> Rê chuột để soi chi tiết
            </span>
          </div>
        </div>

        {/* Phần 2: Bảng Phân Tích Ngũ Hành Vượng Suy & Lời Khuyên Thiết Thực */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Card trạng thái canh giờ */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-serif font-bold text-white">
                    {activeChi.name}
                  </span>
                  <span className="text-xs font-mono text-[#fcd34d] px-2 py-0.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30">
                    {activeChi.rangeText}
                  </span>
                  {!isViewingCurrent && (
                    <button
                      onClick={() => setHoveredChiIndex(null)}
                      className="text-[10px] font-mono text-cyan-300 underline hover:text-white ml-2"
                    >
                      (Quay lại giờ hiện tại)
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  Ngũ Hành: <strong className="text-emerald-300 font-semibold">{activeChi.element}</strong> (
                  {activeChi.elementStatus})
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-serif font-bold shadow-sm ${
                  activeChi.quality === "Đại Cát"
                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
                    : activeChi.quality === "Tiểu Cát"
                    ? "bg-amber-950/80 text-amber-300 border border-amber-500/50"
                    : "bg-slate-800 text-slate-300 border border-white/15"
                }`}
              >
                {activeChi.quality}
              </span>
            </div>

            {/* Lời khuyên nên làm và nên tránh */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/25">
                <span className="text-emerald-300 font-semibold font-mono uppercase text-[10px] flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  NÊN THỰC HIỆN TRONG GIỜ NÀY
                </span>
                <p className="text-slate-200 leading-relaxed font-normal">{activeChi.actionAdvice}</p>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/25">
                <span className="text-rose-300 font-semibold font-mono uppercase text-[10px] flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  NÊN TIẾT CHẾ & TRÁNH
                </span>
                <p className="text-slate-200 leading-relaxed font-normal">{activeChi.avoidAdvice}</p>
              </div>
            </div>

            {/* Các hoạt động cát tường */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                Hoạt Động Khởi Sự Hanh Thông:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeChi.suitableActivities.map((act) => (
                  <span
                    key={act}
                    className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.04] border border-white/10 text-slate-200 font-medium flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    {act}
                  </span>
                ))}
              </div>
            </div>

            {/* Lời răn dưỡng tâm cổ phong */}
            <div className="mt-3 p-2.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs italic text-[#fef08a] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>"{activeChi.zenTip}"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
