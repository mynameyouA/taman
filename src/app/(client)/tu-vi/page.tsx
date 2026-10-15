"use client";

import { useState } from "react";
import {
  generateTuViHoroscope,
  TuViHoroscopeResult,
  BirthInput,
  getHourChiIdx,
} from "@/utils/tuViEngine";
import TuViChartModal from "@/components/divination/TuViChartModal";
import ClientNavbar from "@/components/ui/ClientNavbar";
import ClientFooter from "@/components/ui/ClientFooter";
import PageTransition from "@/components/ui/PageTransition";
import {
  Compass,
  Calendar,
  Clock,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scroll,
} from "lucide-react";

export default function TuViPage() {
  const [formData, setFormData] = useState<BirthInput>({
    name: "",
    gender: "nam",
    solarYear: 1995,
    solarMonth: 8,
    solarDay: 15,
    solarHour: 10,
  });

  const [result, setResult] = useState<TuViHoroscopeResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = generateTuViHoroscope(formData);
    setResult(res);
  };

  return (
    <div className="relative min-h-screen bg-[#03050c] text-slate-100 flex flex-col justify-between selection:bg-[#d4af37]/30 selection:text-[#fef08a]">
      {/* Background Ambience 4K */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(3,5,12,0.6)_50%,_rgba(3,5,12,0.98)_100%)]" />
      <div className="pointer-events-none fixed top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#d4af37]/15 via-[#38bdf8]/10 to-transparent blur-3xl z-0" />

      {/* Global Navbar */}
      <ClientNavbar />

      <PageTransition className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center space-y-10">
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide uppercase">
            <Compass className="w-4 h-4 text-amber-400" />
            Kho Tàng Huyền Học Á Đông • Pháp Môn Đệ Nhất
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold font-display-gold">
            Lập Lá Số Tử Vi & Tứ Trụ Bát Tự Động
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Khai mở Thiên Bàn 12 Cung, định vị 14 Chính Tinh, Tứ Hóa và Đại Hạn 10 năm.
            Đón nhận lời minh triết Thầy Sinh khẩu truyền và xuất file Sớ Khởi Tâm Hoàng Gia 4K.
          </p>
        </div>

      {/* Form Nhập Thông Tin Bản Mệnh */}
      <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-3xl bg-[#070d1e]/90 border border-amber-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tên & Giới Tính */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" /> Họ Và Tên Đương Số
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Văn An"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white text-sm outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Giới Tính Bản Mệnh</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: "nam" })}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    formData.gender === "nam"
                      ? "bg-amber-500/20 border-amber-400 text-amber-200 shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Nam (Dương Cương)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: "nu" })}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    formData.gender === "nu"
                      ? "bg-amber-500/20 border-amber-400 text-amber-200 shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Nữ (Nhu Thuận)
                </button>
              </div>
            </div>
          </div>

          {/* Ngày - Tháng - Năm Sinh */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" /> Ngày Sinh
              </label>
              <input
                type="number"
                min={1}
                max={31}
                value={formData.solarDay}
                onChange={(e) => setFormData({ ...formData, solarDay: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-amber-400 text-center"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Tháng Sinh</label>
              <input
                type="number"
                min={1}
                max={12}
                value={formData.solarMonth}
                onChange={(e) => setFormData({ ...formData, solarMonth: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-amber-400 text-center"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Năm Sinh (DL)</label>
              <input
                type="number"
                min={1920}
                max={2030}
                value={formData.solarYear}
                onChange={(e) => setFormData({ ...formData, solarYear: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-amber-400 text-center"
              />
            </div>
          </div>

          {/* Giờ Sinh (Đầy Đủ 12 Canh Giờ Cổ Truyền & Ô Chọn Giờ Linh Hoạt) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" /> Giờ Sinh (Đầy đủ 12 Canh Giờ Tý đến Hợi)
              </label>
              <span className="text-xs text-amber-300 font-mono">
                Đang chọn: {formData.solarHour}:00 (
                {formData.solarHour >= 23 || formData.solarHour < 1
                  ? "Giờ Tý"
                  : formData.solarHour < 3
                  ? "Giờ Sửu"
                  : formData.solarHour < 5
                  ? "Giờ Dần"
                  : formData.solarHour < 7
                  ? "Giờ Mão"
                  : formData.solarHour < 9
                  ? "Giờ Thìn"
                  : formData.solarHour < 11
                  ? "Giờ Tỵ"
                  : formData.solarHour < 13
                  ? "Giờ Ngọ"
                  : formData.solarHour < 15
                  ? "Giờ Mùi"
                  : formData.solarHour < 17
                  ? "Giờ Thân"
                  : formData.solarHour < 19
                  ? "Giờ Dậu"
                  : formData.solarHour < 21
                  ? "Giờ Tuất"
                  : "Giờ Hợi"}
                )
              </span>
            </div>

            {/* Grid 12 Canh Giờ Chi Tiết */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {[
                { label: "Giờ Tý (23h - 01h)", val: 0, chi: "Tý" },
                { label: "Giờ Sửu (01h - 03h)", val: 2, chi: "Sửu" },
                { label: "Giờ Dần (03h - 05h)", val: 4, chi: "Dần" },
                { label: "Giờ Mão (05h - 07h)", val: 6, chi: "Mão" },
                { label: "Giờ Thìn (07h - 09h)", val: 8, chi: "Thìn" },
                { label: "Giờ Tỵ (09h - 11h)", val: 10, chi: "Tỵ" },
                { label: "Giờ Ngọ (11h - 13h)", val: 12, chi: "Ngọ" },
                { label: "Giờ Mùi (13h - 15h)", val: 14, chi: "Mùi" },
                { label: "Giờ Thân (15h - 17h)", val: 16, chi: "Thân" },
                { label: "Giờ Dậu (17h - 19h)", val: 18, chi: "Dậu" },
                { label: "Giờ Tuất (19h - 21h)", val: 20, chi: "Tuất" },
                { label: "Giờ Hợi (21h - 23h)", val: 22, chi: "Hợi" },
              ].map((h) => (
                <button
                  key={h.val}
                  type="button"
                  onClick={() => setFormData({ ...formData, solarHour: h.val })}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    getHourChiIdx(formData.solarHour) === getHourChiIdx(h.val)
                      ? "bg-amber-500/25 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10 font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  <span className="text-[12px] text-amber-300 font-semibold">{h.chi}</span>
                  <span className="text-[10px] text-slate-400 leading-tight">{h.label.split(" (")[1]?.replace(")", "") || ""}</span>
                </button>
              ))}
            </div>

            {/* Ô Nhập Giờ Tùy Chỉnh Linh Hoạt (0..23h) */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <span className="text-slate-400 whitespace-nowrap">Hoặc nhập giờ sinh chính xác:</span>
              <input
                type="number"
                min={0}
                max={23}
                value={formData.solarHour}
                onChange={(e) => {
                  const val = Math.min(23, Math.max(0, parseInt(e.target.value) || 0));
                  setFormData({ ...formData, solarHour: val });
                }}
                className="w-20 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-amber-300 font-bold text-center focus:outline-none focus:border-amber-400"
              />
              <span className="text-slate-500 text-[11px]">(Hệ thống tự động quy đổi sang Canh Giờ chuẩn xác)</span>
            </div>
          </div>

          {/* Nút Khởi Lập */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            Khởi Lập Thiên Bàn & Luận Giải Tử Vi
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Bảo mật tuyệt đối • Mã hóa đầu cuối
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <Scroll className="w-3.5 h-3.5" /> Xuất Sớ Hoàng Gia 4K Miễn Phí
          </div>
        </div>
      </div>

      {/* Modal hiển thị Lá Số */}
      {result && (
        <TuViChartModal data={result} onClose={() => setResult(null)} />
      )}
      </PageTransition>

      {/* Global Footer */}
      <ClientFooter />
    </div>
  );
}
