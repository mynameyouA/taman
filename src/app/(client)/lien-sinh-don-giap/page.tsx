"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  RotateCcw,
  BookOpen,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Compass,
  HeartHandshake,
  HeartPulse,
  BrainCircuit,
  ShieldCheck,
  Flame,
  ChevronRight,
  User,
  Users,
  Home,
  MapPin,
  Eye,
  Star,
  Sun,
  Moon,
  Feather,
  HelpCircle,
  Clock,
  Award,
  Banknote,
  Smartphone,
  Car,
  Activity,
  CheckCircle2,
  Share2,
  Mic,
  MicOff,
} from "lucide-react";
import ClientNavbar from "@/components/ui/ClientNavbar";
import ClientFooter from "@/components/ui/ClientFooter";
import ZenButton from "@/components/ui/ZenButton";
import ZenBadge from "@/components/ui/ZenBadge";
import PageTransition from "@/components/ui/PageTransition";
import { zenAudio } from "@/utils/zenAudio";
import {
  computeBanQuaiKien,
  BanQuaiKienResult,
  KhongThoiSu,
  TIEN_THIEN_BAT_QUAI,
  GenderType,
  DivinationMethodType,
  LIEN_HOA_DON_CASE_STUDIES,
  CaseStudySample,
  getCurrentCanChiTime,
  parseSeriMoney,
  parsePhoneOrPlate,
  calculateStickDivination,
  CanChiTimeInfo,
  SeriMoneyAnalysis,
  PhonePlateAnalysis,
} from "@/utils/lienHoaDonPhap";
import { recordBrainEvent } from "@/utils/unifiedBrain";
import {
  CHU_DICH_64_QUE,
  KHONG_MINH_THAN_TOAN_SAMPLES,
  computeKhongMinhNumber,
  QI_MEN_BAT_MON,
  LUC_THU_MAP,
  getLucThuByCanNgay,
  TU_VI_14_CHINH_TINH,
  BAZI_THAP_THAN,
  evaluateBaziStrength,
} from "@/utils/easternOccult";
import NguBachDanhChantingModal from "@/components/ui/NguBachDanhChantingModal";
import GiftOracleBlessingModal from "@/components/growth/GiftOracleBlessingModal";
import {
  recommendNguBachDanh,
  analyzeDivinationHungOmen,
  KarmicRemedyCategory,
  KARMIC_CATEGORIES,
  getAllNguBachDanh,
} from "@/utils/nguBachDanh";
import SacredCoinRitual, {
  SacredHexagramResult,
} from "@/components/divination/SacredCoinRitual";
import ViralOracleCardModal, {
  ViralCardData,
} from "@/components/divination/ViralOracleCardModal";
import SoulfulThreeTierReading, {
  buildSoulfulReading,
  SoulfulReadingData,
} from "@/components/divination/SoulfulThreeTierReading";
import SageMasterAvatar3D from "@/components/3d/SageMasterAvatar3D";
import { addMeritPoints } from "@/utils/meritSystem";
import { sacredVoice } from "@/utils/sacredVoice";
import {
  MAI_HOA_CLASSIC_EXAMPLES,
  castMaiHoaTimeSpread,
  MaiHoaExample,
  MaiHoaReadingResult,
} from "@/utils/maiHoaEngine";


// Component vẽ quẻ 3 hào (Đơn Quái) với vạch Âm / Dương sắc nét
function TrigramGraphic({
  trigram,
  label,
  subLabel,
  movingLine,
  highlightColor = "#fef08a",
}: {
  trigram: number[]; // [h3, h2, h1] từ trên xuống dưới
  label: string;
  subLabel?: string;
  movingLine?: number | null;
  highlightColor?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white/[0.03] border border-white/10 min-w-[95px] backdrop-blur-md shadow-inner">
      <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex flex-col gap-1.5 w-14 py-1">
        {trigram.map((bit, idx) => {
          const lineNum = 3 - idx; // idx 0 = Hào 3, idx 1 = Hào 2, idx 2 = Hào 1
          const isThisLineMoving = movingLine === lineNum;

          if (bit === 1) {
            return (
              <div
                key={idx}
                className={`h-2 w-full rounded-sm transition-all duration-300 ${
                  isThisLineMoving
                    ? "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.9)] scale-105 ring-1 ring-white"
                    : "bg-[#fef08a]/90 shadow-[0_0_5px_rgba(254,240,138,0.4)]"
                }`}
                title={`Hào ${lineNum}: Dương ${isThisLineMoving ? "(ĐỘNG)" : ""}`}
              />
            );
          } else {
            return (
              <div
                key={idx}
                className="flex justify-between w-full h-2"
                title={`Hào ${lineNum}: Âm ${isThisLineMoving ? "(ĐỘNG)" : ""}`}
              >
                <div
                  className={`h-2 w-[42%] rounded-sm transition-all duration-300 ${
                    isThisLineMoving
                      ? "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.9)] ring-1 ring-white"
                      : "bg-[#94a3b8]"
                  }`}
                />
                <div
                  className={`h-2 w-[42%] rounded-sm transition-all duration-300 ${
                    isThisLineMoving
                      ? "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.9)] ring-1 ring-white"
                      : "bg-[#94a3b8]"
                  }`}
                />
              </div>
            );
          }
        })}
      </div>
      {subLabel && (
        <span
          className="text-[11px] font-serif font-bold text-center mt-0.5"
          style={{ color: highlightColor }}
        >
          {subLabel}
        </span>
      )}
    </div>
  );
}

// Component vẽ Quẻ Kép 6 hào (Thượng quái + Hạ quái)
function HexagramBlock({
  pTri,
  tTri,
  pName,
  tName,
  fullName,
  quaiType,
  dongHao,
}: {
  pTri: number[];
  tTri: number[];
  pName: string;
  tName: string;
  fullName: string;
  quaiType: "CHÁNH QUÁI" | "HỔ QUÁI" | "BIẾN QUÁI";
  dongHao?: number;
}) {
  const pMoving = dongHao && dongHao >= 4 ? dongHao - 3 : null;
  const tMoving = dongHao && dongHao <= 3 ? dongHao : null;

  return (
    <div className="flex flex-col items-center p-4 rounded-3xl bg-[#091124]/90 border border-[#d4af37]/30 shadow-lg min-w-[170px] flex-1 backdrop-blur-xl">
      <div className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/40 mb-3 tracking-wider">
        {quaiType}
      </div>

      <div className="space-y-2 mb-3">
        <TrigramGraphic
          trigram={pTri}
          label="Thượng"
          subLabel={pName}
          movingLine={pMoving}
          highlightColor="#38bdf8"
        />
        <TrigramGraphic
          trigram={tTri}
          label="Hạ"
          subLabel={tName}
          movingLine={tMoving}
          highlightColor="#34d399"
        />
      </div>

      <div className="text-center mt-1">
        <div className="text-sm font-serif font-bold text-white tracking-wide">{fullName}</div>
      </div>
    </div>
  );
}

export default function LienSinhDonGiapPage() {
  // Master Section Tabs
  const [portalTab, setPortalTab] = useState<
    "lien-hoa" | "mai-hoa" | "khong-minh" | "luc-hao" | "qi-men" | "ngu-bach-danh"
  >("lien-hoa");
  const [isNguBachDanhModalOpen, setIsNguBachDanhModalOpen] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

  // Mai Hoa Dịch Số State
  const [maiHoaResult, setMaiHoaResult] = useState<MaiHoaReadingResult | null>(null);
  const [selectedMaiHoaSample, setSelectedMaiHoaSample] = useState<MaiHoaExample>(MAI_HOA_CLASSIC_EXAMPLES[0]);

  // Tab 1: Phương thức gieo quẻ
  const [activeTab, setActiveTab] = useState<DivinationMethodType>("coin-ritual");
  const [gender, setGender] = useState<GenderType>("nam");
  const [phaiInput, setPhaiInput] = useState<string>("4");
  const [traiInput, setTraiInput] = useState<string>("6");
  const [dongInput, setDongInput] = useState<string>("4");
  const [tamYQuestion, setTamYQuestion] = useState<string>(
    "Cầu hỏi về công danh tài lộc, gia đạo và hướng nhà đất sắp tới..."
  );

  // Phương thức 1: Đồng hồ Can Chi Thời Không Thời Gian Thực
  const [liveCanChi, setLiveCanChi] = useState<CanChiTimeInfo>(() => getCurrentCanChiTime());
  React.useEffect(() => {
    const timer = setInterval(() => {
      setLiveCanChi(getCurrentCanChiTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Phương thức 2: Số Seri Tiền Polymer
  const [seriInput, setSeriInput] = useState<string>("AB 88889999");
  const seriAnalysis = React.useMemo(() => parseSeriMoney(seriInput), [seriInput]);

  // Phương thức 3: Sim Số Điện Thoại & Biển Số Xe
  const [phonePlateMode, setPhonePlateMode] = useState<"phone" | "plate">("phone");
  const [phonePlateInput, setPhonePlateInput] = useState<string>("0988.888.888");
  const phonePlateAnalysis = React.useMemo(
    () => parsePhoneOrPlate(phonePlateInput, phonePlateMode),
    [phonePlateInput, phonePlateMode]
  );

  // Phương thức 4: Rút Thăm Chân Hương / Nhánh Lá Tâm Ý (Nguyễn K Trang 5)
  const [stickSource, setStickSource] = useState<"phat" | "than_tai" | "to_tien" | "nhanh_la">("phat");
  const [rightStickCount, setRightStickCount] = useState<number>(4);
  const [leftStickCount, setLeftStickCount] = useState<number>(6);
  const [stickMovingLine, setStickMovingLine] = useState<number>(4);

  // State kết quả Bản Quái Kiện
  const [banQuaiKien, setBanQuaiKien] = useState<BanQuaiKienResult | null>(() => {
    return computeBanQuaiKien(4, 6, 4, "nam");
  });
  const [activeKtIndex, setActiveKtIndex] = useState<number>(0);
  const [isComputing, setIsComputing] = useState<boolean>(false);

  // State Bộ Luận Quẻ 3 Tầng Chạm Đáy Tâm Can
  const [soulfulReading, setSoulfulReading] = useState<SoulfulReadingData>(() => {
    return buildSoulfulReading({
      chanhName: "LÔI PHONG HẰNG",
      hoName: "TRẠCH THIÊN QUÁI",
      bienName: "ĐỊA PHONG THĂNG",
      movingLines: [4],
      gender: "nam",
      question: "Cầu hỏi về công danh tài lộc, gia đạo và hướng nhà đất sắp tới...",
    });
  });

  // State Modal Xuất Thiệp 4K
  const [isViralCardModalOpen, setIsViralCardModalOpen] = useState<boolean>(false);

  // State Tiên Ông Thầy Sinh tương tác
  const [isThaySinhTranscending, setIsThaySinhTranscending] = useState<boolean>(false);
  const [isThaySinhSpeaking, setIsThaySinhSpeaking] = useState<boolean>(false);
  const [isThaySinhGesturing, setIsThaySinhGesturing] = useState<boolean>(false);

  // Lắng nghe trạng thái phát âm của sacredVoice để mấp máy môi tự nhiên
  React.useEffect(() => {
    const unsub = sacredVoice.subscribe((st) => {
      setIsThaySinhSpeaking(st.isSpeaking);
    });
    return () => unsub();
  }, []);

  // Chức năng Gieo Quẻ Bằng Giọng Nói (Voice Divination)
  const [isListeningQuestion, setIsListeningQuestion] = useState<boolean>(false);
  const voiceRecognitionRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "vi-VN";

        recognition.onstart = () => {
          setIsListeningQuestion(true);
          zenAudio.playSoftTap(600, 0.05);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setTamYQuestion(transcript);
            zenAudio.playCrystalChime(852, 0.08);
          }
        };

        recognition.onerror = (err: any) => {
          console.warn("Lỗi nhận diện giọng nói câu hỏi:", err);
          setIsListeningQuestion(false);
        };

        recognition.onend = () => {
          setIsListeningQuestion(false);
        };

        voiceRecognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleVoiceQuestion = () => {
    if (!voiceRecognitionRef.current) {
      alert("Trình duyệt chưa hỗ trợ Web Speech API nhận diện giọng nói. Bạn hãy gõ chữ vào ô tâm nguyện nhé.");
      return;
    }
    if (isListeningQuestion) {
      voiceRecognitionRef.current.stop();
      setIsListeningQuestion(false);
    } else {
      try {
        voiceRecognitionRef.current.start();
      } catch (err) {
        console.warn("Start voice err:", err);
      }
    }
  };


  // Dữ liệu thiệp 4K phái sinh từ quẻ hiện tại
  const viralCardData: ViralCardData = React.useMemo(() => {
    const lines: number[] = banQuaiKien
      ? [
          banQuaiKien.tienDe.pChanh[0],
          banQuaiKien.tienDe.pChanh[1],
          banQuaiKien.tienDe.pChanh[2],
          banQuaiKien.tienDe.tChanh[0],
          banQuaiKien.tienDe.tChanh[1],
          banQuaiKien.tienDe.tChanh[2],
        ]
      : [1, 0, 1, 0, 1, 0];

    return {
      hexagramName: soulfulReading.chanhName,
      upperTrigramName: banQuaiKien?.tienDe.taQuaiName || "Thượng Quái",
      lowerTrigramName: banQuaiKien?.tienDe.suQuaiName || "Hạ Quái",
      hexagramLines: lines,
      movingLines: soulfulReading.movingLines,
      poemVerse: soulfulReading.poemVerse,
      blessingWish: "Nguyện cầu tâm định tuệ khai, vạn duyên hòa hợp, phước lành tăng trưởng.",
    };
  }, [soulfulReading, banQuaiKien]);

  // Xử lý khi hoàn tất nghi thức gieo 3 đồng xu Khang Hy
  const handleCoinHexagramCompleted = (res: SacredHexagramResult) => {
    zenAudio.playHarmonicChord();
    const upperNum = TIEN_THIEN_BAT_QUAI[1] ? (res.pChanhTri[0] === 1 && res.pChanhTri[1] === 1 && res.pChanhTri[2] === 1 ? 1 : 4) : 4;
    const lowerNum = 6;
    const d = res.movingLines[0] || 4;

    const bqk = computeBanQuaiKien(upperNum, lowerNum, d, gender);
    setBanQuaiKien(bqk);
    setActiveKtIndex(0);

    const reading = buildSoulfulReading({
      chanhName: res.chanhName,
      hoName: res.hoName,
      bienName: res.bienName,
      movingLines: res.movingLines,
      gender,
      question: tamYQuestion,
    });
    setSoulfulReading(reading);

    try {
      recordBrainEvent({
        type: "LIEN_SINH",
        data: {
          p: upperNum,
          t: lowerNum,
          d,
          gender,
          question: tamYQuestion.trim() || undefined,
          chanhName: res.chanhName,
          hoName: res.hoName,
          bienName: res.bienName,
          summaryText: reading.tier1_TamCanh.soulResonance.slice(0, 150),
          khongMinhAdvice: reading.tier3_HanhDao.daoistWisdom,
        },
      });
    } catch (err) {
      console.error("Brain sync error:", err);
    }

    const elem = document.getElementById("ban-quai-kien-results");
    if (elem) elem.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Khuyến nghị Pháp Bảo Ngũ Bách Danh tương ứng với quẻ
  const nguBachDanhRemedy = React.useMemo(() => {
    if (!banQuaiKien) return null;
    const chanhName =
      banQuaiKien.tienDe?.iChingDetails?.chanh?.name ||
      banQuaiKien.tienDe?.taQuaiName ||
      "Quẻ Gốc";
    const bienName =
      banQuaiKien.tienDe?.iChingDetails?.bien?.name ||
      banQuaiKien.tienDe?.suQuaiName ||
      "Quẻ Biến";
    return recommendNguBachDanh({
      divination: {
        chanhName,
        bienName,
        movingLine: banQuaiKien.dongInput,
        question: tamYQuestion,
      },
    });
  }, [banQuaiKien, tamYQuestion]);

  // State Khổng Minh Thần Toán
  const [kmNum1, setKmNum1] = useState<number>(2);
  const [kmNum2, setKmNum2] = useState<number>(1);
  const [kmNum3, setKmNum3] = useState<number>(6);
  const [kmResult, setKmResult] = useState(computeKhongMinhNumber(2, 1, 6));

  // State Lục Hào & Kinh Dịch
  const [selectedHexKey, setSelectedHexKey] = useState<string>("11");
  const [canNgaySelected, setCanNgaySelected] = useState<
    "Giáp" | "Ất" | "Bính" | "Đinh" | "Mậu" | "Kỷ" | "Canh" | "Tân" | "Nhâm" | "Quý"
  >("Giáp");

  // State Kỳ Môn & Tứ Trụ
  const [canNgayEle, setCanNgayEle] = useState<"Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ">("Hỏa");
  const [chiThangEle, setChiThangEle] = useState<"Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ">("Mộc");

  // Xử lý tính toán Bản Quái Kiện
  const handleLapBanQuaiKien = () => {
    zenAudio.playTibetanBowl(216, 0.15);
    setIsComputing(true);

    setTimeout(() => {
      let p = 4;
      let t = 6;
      let d = 4;

      if (activeTab === "thoi-khong-live") {
        const live = getCurrentCanChiTime();
        p = live.p;
        t = live.t;
        d = live.d;
      } else if (activeTab === "seri-tien") {
        const seri = parseSeriMoney(seriInput);
        p = seri.p;
        t = seri.t;
        d = seri.d;
      } else if (activeTab === "phone-plate") {
        const pp = parsePhoneOrPlate(phonePlateInput, phonePlateMode);
        p = pp.p;
        t = pp.t;
        d = pp.d;
      } else if (activeTab === "chan-huong-la") {
        const sticks = calculateStickDivination(rightStickCount, leftStickCount, stickMovingLine);
        p = sticks.p;
        t = sticks.t;
        d = sticks.d;
      } else if (activeTab === "dien-co") {
        p = parseFloat(phaiInput) || 4;
        t = parseFloat(traiInput) || 6;
        d = parseFloat(dongInput) || 4;
      }

      const res = computeBanQuaiKien(p, t, d, gender);
      setBanQuaiKien(res);
      setActiveKtIndex(0);
      setIsComputing(false);
      zenAudio.playHarmonicChord();

      const reading = buildSoulfulReading({
        chanhName: res.tienDe?.iChingDetails?.chanh?.name || res.tienDe?.chanhName || "Quẻ Chánh",
        hoName: res.tienDe?.iChingDetails?.ho?.name || res.tienDe?.hoName || "Quẻ Hổ",
        bienName: res.tienDe?.iChingDetails?.bien?.name || res.tienDe?.bienName || "Quẻ Biến",
        movingLines: [d],
        gender,
        question: tamYQuestion,
      });
      setSoulfulReading(reading);

      // Đồng bộ vào Bộ Não Tâm An duy nhất (Unified Brain)
      try {
        recordBrainEvent({
          type: "LIEN_SINH",
          data: {
            p,
            t,
            d,
            gender,
            question: tamYQuestion.trim() || undefined,
            chanhName: res.tienDe.chanhName,
            hoName: res.tienDe.hoName,
            bienName: res.tienDe.bienName,
            taQuaiName: res.tienDe.taQuaiName,
            suQuaiName: res.tienDe.suQuaiName,
            summaryText: res.luanDoan?.taiLoc?.content || res.tienDe.iChingDetails.chanh?.thoanTu || `Quẻ ${res.tienDe.chanhName} động hào ${d} biến sang ${res.tienDe.bienName}.`,
            khongMinhAdvice: res.luanDoan?.minhTriet?.counsel || undefined,
          },
        });
        // Tích lũy công đức gieo quẻ minh triết
        addMeritPoints("DIVINATION", `Gieo quẻ Liên Sinh Độn Giáp: ${res.tienDe.chanhName} ➔ ${res.tienDe.bienName}`, 30, { isDivination: true });
      } catch (err) {
        console.error("Lỗi đồng bộ Bộ Não Tâm An:", err);
      }

      const elem = document.getElementById("ban-quai-kien-results");
      if (elem) elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  };

  // Nạp ví dụ thực chứng kinh điển của Nguyễn K
  const handleSelectCaseStudy = (cs: CaseStudySample) => {
    zenAudio.playCrystalClick(1200, 0.08);
    setPhaiInput(cs.p.toString());
    setTraiInput(cs.t.toString());
    setDongInput(cs.d.toString());
    setGender(cs.gender);
    setTamYQuestion(cs.context);

    const res = computeBanQuaiKien(cs.p, cs.t, cs.d, cs.gender);
    setBanQuaiKien(res);
    setActiveKtIndex(0);

    const reading = buildSoulfulReading({
      chanhName: res.tienDe?.iChingDetails?.chanh?.name || res.tienDe?.chanhName || "Quẻ Chánh",
      hoName: res.tienDe?.iChingDetails?.ho?.name || res.tienDe?.hoName || "Quẻ Hổ",
      bienName: res.tienDe?.iChingDetails?.bien?.name || res.tienDe?.bienName || "Quẻ Biến",
      movingLines: [cs.d],
      gender: cs.gender,
      question: cs.context,
    });
    setSoulfulReading(reading);

    try {
      recordBrainEvent({
        type: "LIEN_SINH",
        data: {
          p: cs.p,
          t: cs.t,
          d: cs.d,
          gender: cs.gender,
          question: cs.context,
          chanhName: res.tienDe.chanhName,
          hoName: res.tienDe.hoName,
          bienName: res.tienDe.bienName,
          taQuaiName: res.tienDe.taQuaiName,
          suQuaiName: res.tienDe.suQuaiName,
          summaryText: cs.teacherAnalysis.slice(0, 150),
          khongMinhAdvice: res.luanDoan?.minhTriet?.counsel || undefined,
        },
      });
    } catch (e) {
      console.error(e);
    }

    const elem = document.getElementById("ban-quai-kien-results");
    if (elem) elem.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Rút thăm ngẫu nhiên
  const handleRandomPick = () => {
    zenAudio.playCrystalClick(1400, 0.08);
    const pRand = Math.floor(Math.random() * 24) + 1;
    const tRand = Math.floor(Math.random() * 24) + 1;
    const dRand = Math.floor(Math.random() * 6) + 1;
    setPhaiInput(pRand.toString());
    setTraiInput(tRand.toString());
    setDongInput(dRand.toString());
  };

  // Bốc quẻ Khổng Minh Thần Toán
  const handleGieoQueKhongMinh = () => {
    zenAudio.playTibetanBowl(432, 0.12);
    const res = computeKhongMinhNumber(kmNum1, kmNum2, kmNum3);
    setKmResult(res);
  };

  const handleRandomKhongMinh = () => {
    zenAudio.playCrystalClick(1500, 0.08);
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 10);
    const n3 = Math.floor(Math.random() * 10);
    setKmNum1(n1);
    setKmNum2(n2);
    setKmNum3(n3);
    setKmResult(computeKhongMinhNumber(n1, n2, n3));
  };

  const activeKt: KhongThoiSu = banQuaiKien
    ? banQuaiKien.khongThoiList[activeKtIndex] || banQuaiKien.tienDe
    : computeBanQuaiKien(4, 6, 4, "nam").tienDe;

  const currentIChingData = CHU_DICH_64_QUE[selectedHexKey] || CHU_DICH_64_QUE["11"];
  const lucThuList = getLucThuByCanNgay(canNgaySelected);
  const baziEvaluation = evaluateBaziStrength(canNgayEle, chiThangEle);

  return (
    <div className="relative min-h-screen bg-[#03050c] text-slate-100 overflow-x-hidden selection:bg-[#d4af37]/30 selection:text-[#fef08a] flex flex-col justify-between">
      {/* Background Ambience 4K */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(3,5,12,0.6)_50%,_rgba(3,5,12,0.98)_100%)]" />
      <div className="pointer-events-none fixed top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#d4af37]/15 via-[#38bdf8]/10 to-transparent blur-3xl z-0" />

      {/* Global Navbar */}
      <ClientNavbar />

      <PageTransition className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        {/* ========================================================================= */}
        {/* HEADER                                                                    */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <ZenBadge
              variant="gold"
              label="Huyền Cơ Dịch Lý Á Đông • 384 Bản Quái Kiện • Lục Môn Tinh Hoa"
              size="sm"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold font-display-gold tracking-tight leading-[1.18]"
          >
            Liên Sinh Độn Giáp
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-slate-300 mt-4 leading-relaxed font-normal"
          >
            Kế thừa trọn vẹn lý thuyết và phong cách luận sự từ nguyên tác{" "}
            <strong className="text-[#fef08a]">LIÊN HOA ĐỘN PHÁP</strong> của tác giả{" "}
            <span className="text-[#38bdf8] font-semibold">Nguyễn K</span>. Phân tích chi tiết Giàu Nghèo,
            Hướng Nhà Mặt Tiền/Ngõ Hẻm, Hôn Nhân Mệnh Cung TA NAM / TA NỮ và Sức Khỏe Ngũ Hành Tật Ách.
          </motion.p>

          {/* Nút Gieo Duyên Người Thân & Hộp Quà Tâm Thức 4K */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <ZenButton
              variant="gold"
              size="md"
              borderBeam={true}
              icon={Sparkles}
              onClick={() => {
                zenAudio.playCrystalChime(920, 0.08);
                setIsGiftModalOpen(true);
              }}
              className="shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            >
              Gieo Duyên Cho Người Thân (Hộp Quà 4K)
            </ZenButton>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* MASTER TABS: KHO TÀNG HUYỀN HỌC Á ĐÔNG & PHÁP BẢO NGŨ BÁCH DANH            */}
        {/* ========================================================================= */}
        <div className="w-full max-w-5xl mb-8">
          <div className="p-1.5 rounded-2xl bg-black/60 border border-[#d4af37]/30 backdrop-blur-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => {
                zenAudio.playSoftTap(500, 0.05);
                setPortalTab("lien-hoa");
              }}
              className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 ${
                portalTab === "lien-hoa"
                  ? "bg-gradient-to-r from-[#d4af37] to-[#b38f28] text-slate-950 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Bản Quái Kiện</span>
            </button>

            <button
              onClick={() => {
                zenAudio.playSoftTap(520, 0.06);
                setPortalTab("mai-hoa");
                if (!maiHoaResult) {
                  setMaiHoaResult(castMaiHoaTimeSpread());
                }
              }}
              className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 ${
                portalTab === "mai-hoa"
                  ? "bg-gradient-to-r from-[#f43f5e] to-[#e11d48] text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                  : "text-slate-400 hover:text-rose-300 hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Mai Hoa Dịch Số</span>
            </button>

            <button
              onClick={() => {
                zenAudio.playSoftTap(500, 0.05);
                setPortalTab("khong-minh");
              }}
              className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 ${
                portalTab === "khong-minh"
                  ? "bg-gradient-to-r from-[#38bdf8] to-[#0284c7] text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Khổng Minh</span>
            </button>

            <button
              onClick={() => {
                zenAudio.playSoftTap(500, 0.05);
                setPortalTab("luc-hao");
              }}
              className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 ${
                portalTab === "luc-hao"
                  ? "bg-gradient-to-r from-[#34d399] to-[#059669] text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Lục Hào 64 Quẻ</span>
            </button>

            <button
              onClick={() => {
                zenAudio.playSoftTap(500, 0.05);
                setPortalTab("qi-men");
              }}
              className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 ${
                portalTab === "qi-men"
                  ? "bg-gradient-to-r from-[#fb923c] to-[#ea580c] text-slate-950 shadow-[0_0_20px_rgba(251,146,60,0.4)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Kỳ Môn & Bát Tự</span>
            </button>

            <button
              onClick={() => {
                zenAudio.playSoftTap(660, 0.07);
                setPortalTab("ngu-bach-danh");
              }}
              className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-2 col-span-2 md:col-span-1 ${
                portalTab === "ngu-bach-danh"
                  ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                  : "text-slate-400 hover:text-amber-200 hover:bg-white/5"
              }`}
            >
              <Feather className="w-4 h-4 text-amber-300" />
              <span>Ngũ Bách Danh</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHÂN KHU 1: BẢN QUÁI KIỆN LIÊN SINH ĐỘN GIÁP                              */}
        {/* ========================================================================= */}
        {portalTab === "lien-hoa" && (
          <div className="w-full flex flex-col items-center">
            {/* HỘP NHẬP LIỆU BẢN QUÁI KIỆN */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-4xl mb-12"
            >
              <div className="p-6 sm:p-8 rounded-3xl backdrop-blur-2xl bg-[#070d1e]/90 border border-[#d4af37]/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                {/* Chọn Giới Tính Cầu Sự: TA NAM / TA NỮ */}
                <div className="mb-6 pb-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-300 block mb-1">
                      Giới Tính Người Cầu Sự (Định Mệnh Cung TA):
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Theo Đạo người: TA NAM xét Thê Tài (T) cư Mệnh; TA NỮ xét Quan Quỷ (Q) cư Mệnh.
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-black/40 p-1 rounded-2xl border border-white/10">
                    <button
                      onClick={() => {
                        zenAudio.playSoftTap(500, 0.05);
                        setGender("nam");
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                        gender === "nam"
                          ? "bg-[#38bdf8] text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>TA NAM (Chủ Tài)</span>
                    </button>

                    <button
                      onClick={() => {
                        zenAudio.playSoftTap(500, 0.05);
                        setGender("nu");
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                        gender === "nu"
                          ? "bg-rose-400 text-slate-950 shadow-[0_0_12px_rgba(251,113,133,0.5)]"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>TA NỮ (Chủ Quan)</span>
                    </button>
                  </div>
                </div>

                {/* Sub-tabs: 6 Phương thức chiêm bốc Liên Sinh Độn Giáp Toàn Diện */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 p-1.5 rounded-2xl bg-black/60 border border-white/10 mb-6 gap-1.5">
                  <button
                    onClick={() => {
                      zenAudio.playSoftTap(600, 0.06);
                      setActiveTab("coin-ritual");
                    }}
                    className={`py-2.5 px-2 rounded-xl text-xs font-serif font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                      activeTab === "coin-ritual"
                        ? "bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#b38f28] text-slate-950 shadow-[0_0_20px_rgba(212,175,55,0.5)] font-black"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>3 Đồng Xu Cổ</span>
                  </button>

                  <button
                    onClick={() => {
                      zenAudio.playSoftTap(500, 0.05);
                      setActiveTab("thoi-khong-live");
                    }}
                    className={`py-2.5 px-2 rounded-xl text-xs font-serif font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                      activeTab === "thoi-khong-live"
                        ? "bg-[#38bdf8] text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.5)] font-black"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Clock className="w-4 h-4 text-sky-300" />
                    <span>Thời Gian Can Chi</span>
                  </button>

                  <button
                    onClick={() => {
                      zenAudio.playSoftTap(500, 0.05);
                      setActiveTab("seri-tien");
                    }}
                    className={`py-2.5 px-2 rounded-xl text-xs font-serif font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                      activeTab === "seri-tien"
                        ? "bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.5)] font-black"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-emerald-300" />
                    <span>Seri Tiền Polymer</span>
                  </button>

                  <button
                    onClick={() => {
                      zenAudio.playSoftTap(500, 0.05);
                      setActiveTab("phone-plate");
                    }}
                    className={`py-2.5 px-2 rounded-xl text-xs font-serif font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                      activeTab === "phone-plate"
                        ? "bg-violet-400 text-slate-950 shadow-[0_0_15px_rgba(167,139,250,0.5)] font-black"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-violet-300" />
                    <span>Số ĐT / Biển Số Xe</span>
                  </button>

                  <button
                    onClick={() => {
                      zenAudio.playSoftTap(500, 0.05);
                      setActiveTab("chan-huong-la");
                    }}
                    className={`py-2.5 px-2 rounded-xl text-xs font-serif font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                      activeTab === "chan-huong-la"
                        ? "bg-amber-300 text-slate-950 shadow-[0_0_15px_rgba(252,211,77,0.5)] font-black"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Feather className="w-4 h-4 text-amber-200" />
                    <span>Chân Hương / Nhánh Lá</span>
                  </button>

                  <button
                    onClick={() => {
                      zenAudio.playSoftTap(500, 0.05);
                      setActiveTab("dien-co");
                    }}
                    className={`py-2.5 px-2 rounded-xl text-xs font-serif font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                      activeTab === "dien-co"
                        ? "bg-[#fef08a] text-slate-950 shadow-[0_0_15px_rgba(254,240,138,0.5)] font-black"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Award className="w-4 h-4 text-yellow-300" />
                    <span>Điển Cố Nguyễn K</span>
                  </button>
                </div>

                {/* TAB 0: NGHI THỨC GIEO 3 ĐỒNG XU KHANG HY & TAM KHÍ QUY NGUYÊN */}
                {activeTab === "coin-ritual" && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-mono uppercase text-slate-400">
                          Tâm Nguyện / Việc Cần Chiêm Bốc (Định Tâm Trước Khi Gieo):
                        </label>
                        <button
                          type="button"
                          onClick={toggleVoiceQuestion}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
                            isListeningQuestion
                              ? "bg-rose-500/30 border border-rose-400 text-rose-200 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.4)]"
                              : "bg-white/5 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-200"
                          }`}
                        >
                          {isListeningQuestion ? (
                            <>
                              <MicOff className="w-3.5 h-3.5 text-rose-300" />
                              <span>Đang lắng nghe...</span>
                            </>
                          ) : (
                            <>
                              <Mic className="w-3.5 h-3.5 text-amber-300" />
                              <span>Nói tâm nguyện</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={tamYQuestion}
                          onChange={(e) => setTamYQuestion(e.target.value)}
                          placeholder="Nhập tâm nguyện hoặc bấm nút 'Nói tâm nguyện' để cất lời..."
                          className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37] text-sm pr-12"
                        />
                        <button
                          type="button"
                          onClick={toggleVoiceQuestion}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-xl hover:bg-white/10 text-amber-300 transition-colors"
                          title="Gieo quẻ bằng giọng nói"
                        >
                          <Mic className={`w-4 h-4 ${isListeningQuestion ? "text-rose-400 animate-bounce" : "text-amber-300"}`} />
                        </button>
                      </div>
                    </div>

                    <SacredCoinRitual
                      question={tamYQuestion}
                      onCompleteHexagram={handleCoinHexagramCompleted}
                    />
                  </div>
                )}

                {/* TAB 1: THỜI KHÔNG HIỆN TẠI (NĂM - THÁNG - NGÀY - GIỜ REALTIME CAN CHI) */}
                {activeTab === "thoi-khong-live" && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Tâm Nguyện / Việc Cần Chiêm Bốc:
                      </label>
                      <input
                        type="text"
                        value={tamYQuestion}
                        onChange={(e) => setTamYQuestion(e.target.value)}
                        placeholder="Nhập tâm nguyện hoặc sự việc băn khoăn vào thời khắc hiện tại..."
                        className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] text-sm"
                      />
                    </div>

                    {/* HUD Đồng hồ Can Chi Thời Không Sống Động */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-950/40 via-black/60 to-blue-950/30 border border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.15)] backdrop-blur-xl">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 shadow-inner">
                            <Clock className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400">
                              Đồng Hồ Can Chi Thời Không Thời Gian Thực
                            </span>
                            <div className="text-xl font-mono font-bold text-white tracking-wide">
                              {liveCanChi.solarDate}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>Đang Đồng Bộ Lịch Vũ Trụ</span>
                          </span>
                        </div>
                      </div>

                      {/* 4 Trụ Can Chi Năm Tháng Ngày Giờ */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-center">
                          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                            Năm Can Chi (Chi #{liveCanChi.namIndex})
                          </span>
                          <span className="text-base font-serif font-bold text-[#fef08a] block">
                            {liveCanChi.canChiNam}
                          </span>
                          <span className="text-[10px] text-slate-400">Dịch số: {liveCanChi.namIndex}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-center">
                          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                            Tháng Can Chi (Chi #{liveCanChi.thangIndex})
                          </span>
                          <span className="text-base font-serif font-bold text-[#38bdf8] block">
                            {liveCanChi.canChiThang}
                          </span>
                          <span className="text-[10px] text-slate-400">Dịch số: {liveCanChi.thangIndex}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-center">
                          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                            Ngày Can Chi (Chi #{liveCanChi.ngayIndex})
                          </span>
                          <span className="text-base font-serif font-bold text-[#34d399] block">
                            {liveCanChi.canChiNgay}
                          </span>
                          <span className="text-[10px] text-slate-400">Dịch số: {liveCanChi.ngayIndex}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-center">
                          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                            Giờ Can Chi (Chi #{liveCanChi.gioIndex})
                          </span>
                          <span className="text-base font-serif font-bold text-rose-400 block">
                            {liveCanChi.canChiGio}
                          </span>
                          <span className="text-[10px] text-slate-400">Dịch số: {liveCanChi.gioIndex}</span>
                        </div>
                      </div>

                      {/* Công thức phân giải Dịch số */}
                      <div className="mt-4 p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/20 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                        <div className="text-slate-300">
                          <strong className="text-sky-300">Nguyên lý Dịch số Thời Không: </strong>
                          Thượng P = ({liveCanChi.namIndex} + {liveCanChi.thangIndex} + {liveCanChi.ngayIndex}) % 8 = <strong className="text-sky-300">{liveCanChi.p} ({TIEN_THIEN_BAT_QUAI[liveCanChi.p].name})</strong> •
                          Hạ T = (Tổng + {liveCanChi.gioIndex}) % 8 = <strong className="text-emerald-300">{liveCanChi.t} ({TIEN_THIEN_BAT_QUAI[liveCanChi.t].name})</strong> •
                          Động hào d = (Tổng) % 6 = <strong className="text-rose-400">Hào {liveCanChi.d}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: XEM BẰNG SỐ SERI TIỀN (SERI POLYMER VẬT PHẨM TÙY THÂN) */}
                {activeTab === "seri-tien" && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Tâm Nguyện / Việc Cần Chiêm Bốc (Rút Tờ Tiền Bất Kỳ Trong Ví):
                      </label>
                      <input
                        type="text"
                        value={tamYQuestion}
                        onChange={(e) => setTamYQuestion(e.target.value)}
                        placeholder="Nhập tâm nguyện hoặc câu hỏi trước khi quan sát số seri..."
                        className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Ô nhập số seri */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Nhập Số Seri Tờ Tiền (Chữ cái & Chữ số):
                        </label>
                        <input
                          type="text"
                          value={seriInput}
                          onChange={(e) => setSeriInput(e.target.value)}
                          placeholder="Ví dụ: AB 88889999 hoặc 19846283"
                          className="w-full px-4 py-3 rounded-xl bg-black/50 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-lg focus:outline-none focus:border-emerald-400 shadow-inner"
                        />
                        <span className="text-[11px] text-slate-400 block mt-1.5 leading-relaxed">
                          Hệ thống tự lọc chuỗi số nguyên, chia đôi: nửa đầu tính Thượng Quái (P), nửa sau tính Hạ Quái (T), tổng toàn bộ các chữ số tính Hào Động (d).
                        </span>

                        <div className="flex gap-2 mt-3">
                          {["AB 18392842", "CD 92846182", "VN 88889999", "TK 68686868"].map((sample) => (
                            <button
                              key={sample}
                              onClick={() => {
                                zenAudio.playCrystalClick(1200, 0.05);
                                setSeriInput(sample);
                              }}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-300 hover:border-emerald-400 transition-all"
                            >
                              {sample}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mô Phỏng Tờ Tiền Phong Thủy Phát Sáng Hào Quang */}
                      <div className="relative p-5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col justify-between">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
                          <span className="text-xs font-serif font-bold text-emerald-300 tracking-wider flex items-center gap-1.5">
                            <Banknote className="w-4 h-4" />
                            <span>VẬT PHẨM TÙY THÂN • BẢN VỊ LINH KHÍ</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                            POLYMER 4K
                          </span>
                        </div>

                        {/* Highlight chuỗi số phân tách Thượng / Hạ quái */}
                        <div className="my-4 text-center">
                          <div className="text-[11px] font-mono text-slate-400 mb-1">
                            CHUỖI SERI ĐƯỢC PHÂN RÃ THEO MAI HOA DỊCH SỐ
                          </div>
                          <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-emerald-500/30 text-lg font-mono">
                            {seriAnalysis.prefixStr && (
                              <span className="text-slate-400 px-1">{seriAnalysis.prefixStr}</span>
                            )}
                            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold" title="Nửa đầu chuỗi số: Thượng Quái (P)">
                              {seriAnalysis.firstHalf}
                            </span>
                            <span className="text-slate-500">-</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold" title="Nửa sau chuỗi số: Hạ Quái (T)">
                              {seriAnalysis.secondHalf}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                            <span className="text-[10px] text-sky-300 block">Thượng Quái (P)</span>
                            <strong className="text-white font-mono">{seriAnalysis.sumFirstHalf} % 8 = {seriAnalysis.p}</strong>
                            <span className="text-[10px] text-sky-400 block mt-0.5">{TIEN_THIEN_BAT_QUAI[seriAnalysis.p].name}</span>
                          </div>

                          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                            <span className="text-[10px] text-emerald-300 block">Hạ Quái (T)</span>
                            <strong className="text-white font-mono">{seriAnalysis.sumSecondHalf} % 8 = {seriAnalysis.t}</strong>
                            <span className="text-[10px] text-emerald-400 block mt-0.5">{TIEN_THIEN_BAT_QUAI[seriAnalysis.t].name}</span>
                          </div>

                          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                            <span className="text-[10px] text-rose-300 block">Động Hào (d)</span>
                            <strong className="text-white font-mono">{seriAnalysis.sumTotal} % 6 = {seriAnalysis.d}</strong>
                            <span className="text-[10px] text-rose-400 block mt-0.5">Hào {seriAnalysis.d}</span>
                          </div>
                        </div>

                        <div className="mt-3 text-[11px] text-emerald-300/90 italic bg-black/30 p-2 rounded-lg border border-emerald-500/20">
                          {seriAnalysis.fengShuiNote}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: XEM BẰNG SỐ ĐIỆN THOẠI HOẶC BIỂN SỐ XE */}
                {activeTab === "phone-plate" && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Tâm Nguyện / Việc Cần Chiêm Bốc (Định Khí Phương Tiện & Sim Phong Thủy):
                      </label>
                      <input
                        type="text"
                        value={tamYQuestion}
                        onChange={(e) => setTamYQuestion(e.target.value)}
                        placeholder="Nhập tâm nguyện hoặc câu hỏi băn khoăn về xe cộ, số sim..."
                        className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-400 text-sm"
                      />
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-950/40 via-slate-900 to-purple-950/40 border border-violet-500/30 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <button
                          onClick={() => {
                            zenAudio.playSoftTap(500, 0.05);
                            setPhonePlateMode("phone");
                            setPhonePlateInput("0988.888.888");
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                            phonePlateMode === "phone"
                              ? "bg-violet-400 text-slate-950 shadow-[0_0_12px_rgba(167,139,250,0.5)] font-black"
                              : "text-slate-400 hover:text-white bg-white/5"
                          }`}
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Sim Số Điện Thoại</span>
                        </button>

                        <button
                          onClick={() => {
                            zenAudio.playSoftTap(500, 0.05);
                            setPhonePlateMode("plate");
                            setPhonePlateInput("29A-888.88");
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                            phonePlateMode === "plate"
                              ? "bg-violet-400 text-slate-950 shadow-[0_0_12px_rgba(167,139,250,0.5)] font-black"
                              : "text-slate-400 hover:text-white bg-white/5"
                          }`}
                        >
                          <Car className="w-3.5 h-3.5" />
                          <span>Biển Số Xe Phương Tiện</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            {phonePlateMode === "phone" ? "Nhập Số Điện Thoại (10 số):" : "Nhập Biển Số Xe (Ví dụ 29A-888.88):"}
                          </label>
                          <input
                            type="text"
                            value={phonePlateInput}
                            onChange={(e) => setPhonePlateInput(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-violet-500/40 text-violet-300 font-mono font-bold text-lg focus:outline-none focus:border-violet-400"
                          />

                          <div className="flex gap-2 mt-3">
                            {(phonePlateMode === "phone"
                              ? ["0912.345.678", "0988.888.888", "0909.686.868", "0977.123.456"]
                              : ["29A-888.88", "30F-999.99", "51G-686.86", "43B-123.45"]
                            ).map((sample) => (
                              <button
                                key={sample}
                                onClick={() => {
                                  zenAudio.playCrystalClick(1300, 0.05);
                                  setPhonePlateInput(sample);
                                }}
                                className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 hover:text-violet-300"
                              >
                                {sample}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex flex-col justify-between">
                          <div className="text-xs text-slate-300 mb-2">
                            <span className="text-violet-300 font-bold">Phân Tách Năng Lượng: </span>
                            Phần đầu: <span className="text-sky-300 font-mono font-bold">{phonePlateAnalysis.firstPart}</span> (Thượng {TIEN_THIEN_BAT_QUAI[phonePlateAnalysis.p].name}) •
                            Phần đuôi: <span className="text-emerald-300 font-mono font-bold">{phonePlateAnalysis.secondPart}</span> (Hạ {TIEN_THIEN_BAT_QUAI[phonePlateAnalysis.t].name}) •
                            Động: <span className="text-rose-400 font-mono font-bold">Hào {phonePlateAnalysis.d}</span>
                          </div>
                          <div className="text-xs text-violet-200/90 leading-relaxed bg-violet-950/30 p-2.5 rounded-lg border border-violet-500/20">
                            {phonePlateAnalysis.energyVibe}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: RÚT THĂM CHÂN HƯƠNG / NHÁNH LÁ TÂM Ý (NGUYÊN TÁC NGUYỄN K TRANG 5) */}
                {activeTab === "chan-huong-la" && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Tâm Nguyện / Việc Cần Chiêm Bốc (Định Tâm Trước Bàn Thờ / Cây Cối):
                      </label>
                      <input
                        type="text"
                        value={tamYQuestion}
                        onChange={(e) => setTamYQuestion(e.target.value)}
                        placeholder="Nhập tâm nguyện hoặc câu hỏi băn khoăn..."
                        className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300 text-sm"
                      />
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-yellow-950/30 border border-amber-500/30 shadow-lg">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-xs font-mono uppercase text-slate-400 mr-2">Nguồn Khởi Quẻ:</span>
                        {[
                          { id: "phat", label: "Bàn Thờ Phật" },
                          { id: "than_tai", label: "Bàn Thờ Thần Tài" },
                          { id: "to_tien", label: "Bàn Thờ Tổ Tiên" },
                          { id: "nhanh_la", label: "Hai Nhánh Lá (Phải / Trái)" },
                        ].map((src) => (
                          <button
                            key={src.id}
                            onClick={() => {
                              zenAudio.playSoftTap(500, 0.05);
                              setStickSource(src.id as any);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                              stickSource === src.id
                                ? "bg-amber-300 text-slate-950 shadow-[0_0_12px_rgba(252,211,77,0.5)]"
                                : "text-slate-400 hover:text-white bg-white/5"
                            }`}
                          >
                            {src.label}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            Số Chân Hương / Lá Tay Phải (P):
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={rightStickCount}
                            onChange={(e) => setRightStickCount(parseInt(e.target.value, 10) || 1)}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-[#38bdf8] font-mono font-bold text-lg text-center focus:outline-none focus:border-[#38bdf8]"
                          />
                          <span className="text-[10px] text-slate-500 block mt-1">
                            Làm Thượng Quái (P % 8, dư 0 lấy 8)
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            Số Chân Hương / Lá Tay Trái (T):
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={leftStickCount}
                            onChange={(e) => setLeftStickCount(parseInt(e.target.value, 10) || 1)}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-[#34d399] font-mono font-bold text-lg text-center focus:outline-none focus:border-[#34d399]"
                          />
                          <span className="text-[10px] text-slate-500 block mt-1">
                            Làm Hạ Quái (T % 8, dư 0 lấy 8)
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            Số Hào Động (d):
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={6}
                            value={stickMovingLine}
                            onChange={(e) => setStickMovingLine(parseInt(e.target.value, 10) || 1)}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-rose-400 font-mono font-bold text-lg text-center focus:outline-none focus:border-rose-400"
                          />
                          <span className="text-[10px] text-slate-500 block mt-1">
                            Hào 1..6 (mặc định (P+T) % 6)
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end pt-3">
                        <button
                          onClick={() => {
                            zenAudio.playCrystalClick(1400, 0.08);
                            const pRand = Math.floor(Math.random() * 24) + 1;
                            const tRand = Math.floor(Math.random() * 24) + 1;
                            const dRand = Math.floor(Math.random() * 6) + 1;
                            setRightStickCount(pRand);
                            setLeftStickCount(tRand);
                            setStickMovingLine(dRand);
                          }}
                          className="text-xs font-mono text-[#fef08a] hover:underline flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Rút ngẫu nhiên hai tay (Phải - Trái)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: ĐIỂN CỐ KINH ĐIỂN CỦA NGUYỄN K */}
                {activeTab === "dien-co" && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300 mb-2">
                      Nhấn chọn ví dụ thực chứng kinh điển từ 118 trang nguyên tác LIÊN HOA ĐỘN PHÁP để học tập phong cách luận đoán của tác giả Nguyễn K:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                      {LIEN_HOA_DON_CASE_STUDIES.map((cs) => (
                        <div
                          key={cs.id}
                          onClick={() => handleSelectCaseStudy(cs)}
                          className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#d4af37] transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-[#fef08a] mb-1">
                            <span>{cs.title}</span>
                            <span className="text-[10px] font-mono text-slate-400 uppercase">
                              {cs.gender === "nam" ? "TA Nam" : "TA Nữ"}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                            {cs.context}
                          </p>
                          <div className="mt-2 text-[10px] text-[#38bdf8] flex items-center gap-1 group-hover:underline">
                            <span>Nạp quẻ & Xem luận sự</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB ĐIỂN CỐ KINH ĐIỂN CỦA NGUYỄN K */}
                {activeTab === "dien-co" && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300 mb-2">
                      Nhấn chọn ví dụ thực chứng kinh điển từ 118 trang nguyên tác LIÊN HOA ĐỘN PHÁP để học tập phong cách luận đoán của tác giả Nguyễn K:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                      {LIEN_HOA_DON_CASE_STUDIES.map((cs) => (
                        <div
                          key={cs.id}
                          onClick={() => handleSelectCaseStudy(cs)}
                          className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#d4af37] transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-[#fef08a] mb-1">
                            <span>{cs.title}</span>
                            <span className="text-[10px] font-mono text-slate-400 uppercase">
                              {cs.gender === "nam" ? "TA Nam" : "TA Nữ"}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                            {cs.context}
                          </p>
                          <div className="mt-2 text-[10px] text-[#38bdf8] flex items-center gap-1 group-hover:underline">
                            <span>Nạp quẻ & Xem luận sự</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nút hành động */}
                {activeTab !== "coin-ritual" && (
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Chuẩn 384 Bản Quái Kiện Nguyễn K • Mệnh Cung Hổ Quái</span>
                    </div>

                    <ZenButton
                      onClick={handleLapBanQuaiKien}
                      disabled={isComputing}
                      variant="gold"
                      size="lg"
                      icon={Layers}
                      iconPosition="left"
                      className="w-full sm:w-auto shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                    >
                      {isComputing ? "Đang Thiết Lập Quái Kiện..." : "Lập Bản Quái Kiện"}
                    </ZenButton>
                  </div>
                )}
              </div>
            </motion.div>

            {/* KẾT QUẢ BẢN QUÁI KIỆN KHÔNG THỜI SỰ */}
            <div id="ban-quai-kien-results" className="w-full max-w-5xl space-y-8 mb-16">
              {banQuaiKien && (
                <>
                  {/* TIÊN ÔNG THẦY SINH TRỰC QUAN ĐÀM ĐẠO KẾT QUẢ */}
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-[#17223b] via-[#0a1128] to-[#040813] border-2 border-[#d4af37]/50 shadow-[0_15px_40px_rgba(212,175,55,0.25)] flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-5/12 h-[340px] rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-lg relative bg-black/60">
                      <SageMasterAvatar3D
                        height={340}
                        isTranscending={isThaySinhTranscending}
                        isSpeaking={isThaySinhSpeaking}
                        isGesturing={isThaySinhGesturing}
                        speechAmplitude={0.7}
                      />
                    </div>
                    <div className="w-full md:w-7/12 flex flex-col items-start text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fcd34d]/15 border border-[#fcd34d]/40 text-xs font-mono text-[#fef08a] mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Thầy Sinh Luận Giải Sống Động</span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-white mb-2">
                        Thầy Sinh Khẩu Truyền: Quẻ {banQuaiKien.tienDe.chanhName}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        Thầy Sinh vừa bấm đốt ngón tay Can Chi và kết nối càn khôn. Bấm nút dưới đây để Thầy trực tiếp giảng giải bằng khẩu truyền ấm áp kết hợp chuông xoay Solfeggio 528Hz:
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <ZenButton
                          variant="gold"
                          size="sm"
                          icon={Sparkles}
                          onClick={() => {
                            zenAudio.playTibetanBowl(432, 0.1);
                            setIsThaySinhGesturing(true);
                            setTimeout(() => {
                              setIsThaySinhGesturing(false);
                              setIsThaySinhTranscending(true);
                              setTimeout(() => {
                                setIsThaySinhTranscending(false);
                                // Phát giọng đọc khẩu truyền Thầy Sinh
                                const speechText = `Chào con, Thầy vừa định tâm bấm ngón tay tính càn khôn cho con. Quẻ của con là ${banQuaiKien.tienDe.chanhName}, động hào ${banQuaiKien.dongInput} biến sang ${banQuaiKien.tienDe.bienName}. ${soulfulReading.tier1_TamCanh.soulResonance.slice(0, 220)}. Con hãy giữ tâm an tịnh, đức năng sẽ thắng số con nghen!`;
                                sacredVoice.speakReading(speechText, () => {
                                  setIsThaySinhSpeaking(false);
                                });
                              }, 2500);
                            }, 1800);
                          }}
                        >
                          {isThaySinhSpeaking ? "Thầy Đang Khẩu Truyền..." : "Thỉnh Thầy Giảng Giải Quẻ (Giọng Nói)"}
                        </ZenButton>
                        {isThaySinhSpeaking && (
                          <ZenButton
                            variant="glass"
                            size="sm"
                            onClick={() => {
                              sacredVoice.stopSpeaking();
                              setIsThaySinhSpeaking(false);
                            }}
                          >
                            Dừng Nghe
                          </ZenButton>
                        )}
                        <span className="text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Môi mấp máy & Cử động 8K chân thực</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BỘ LUẬN QUẺ 3 TẦNG CHẠM ĐÁY TÂM CAN */}
                  <SoulfulThreeTierReading
                    readingData={soulfulReading}
                    onOpenChantingModal={() => setIsNguBachDanhModalOpen(true)}
                    onOpenViralCardModal={() => setIsViralCardModalOpen(true)}
                  />


                  {/* TIÊU ĐỀ & CHỌN KHÔNG THỜI SỰ LIÊN HOÀN */}
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121b2d] via-[#091124] to-[#040711] border border-[#d4af37]/40 shadow-xl backdrop-blur-2xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/40">
                            BẢN QUÁI KIỆN {banQuaiKien.totalTimeSlots} KHÔNG THỜI
                          </span>
                          <span className="text-xs text-slate-400">
                            P = {banQuaiKien.phaiInput} • T = {banQuaiKien.traiInput} • d = {banQuaiKien.dongInput} • {banQuaiKien.gender === "nam" ? "TA NAM" : "TA NỮ"}
                          </span>
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-white">
                          Không Thời Sự Tiên Đề & Chuỗi Diễn Biến Liên Hoàn
                        </h2>
                      </div>

                      {/* Selector các không thời sự */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                        {banQuaiKien.khongThoiList.map((kt, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              zenAudio.playCrystalClick(1000 + idx * 80, 0.05);
                              setActiveKtIndex(idx);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                              activeKtIndex === idx
                                ? "bg-[#d4af37] text-slate-950 font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                                : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                            }`}
                          >
                            {idx === 0 ? "Tiên Đề (1)" : `KT (${idx + 1})`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CARD: TA QUÁI & SỰ QUÁI & MỆNH CUNG */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4 pt-2">
                      <div className="p-3.5 rounded-2xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8] font-bold font-mono">
                          TA
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#38bdf8]">
                            TA QUÁI (Không Động):
                          </div>
                          <div className="text-base font-serif font-bold text-white">
                            {activeKt.taQuaiName} ({TIEN_THIEN_BAT_QUAI[activeKt.taQuaiNumber].element} • {TIEN_THIEN_BAT_QUAI[activeKt.taQuaiNumber].direction})
                          </div>
                          <span className="text-[10px] text-slate-400">
                            Bản thể chủ sự cầu vận
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold font-mono">
                          SỰ
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase text-rose-400">
                            SỰ QUÁI (Có Hào Động):
                          </div>
                          <div className="text-base font-serif font-bold text-white">
                            {activeKt.suQuaiName} ({TIEN_THIEN_BAT_QUAI[activeKt.suQuaiNumber].element})
                          </div>
                          <span className="text-[10px] text-rose-300/80">
                            {activeKt.dongViTriText}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#fef08a]/10 border border-[#fef08a]/30 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#fef08a]/20 flex items-center justify-center text-[#fef08a] font-bold font-mono">
                          MỆNH
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#fef08a]">
                            MỆNH CUNG (Hổ Quái):
                          </div>
                          <div className="text-base font-serif font-bold text-white">
                            {activeKt.menhCungQuaiName} ({TIEN_THIEN_BAT_QUAI[activeKt.menhCungQuaiNumber].element})
                          </div>
                          <span className="text-[10px] text-[#fef08a]/80">
                            Định mệnh dĩ định từ 4 hào giữa
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PHƯƠNG TRÌNH THỨC: CHÁNH QUÁI - HỔ QUÁI - BIẾN QUÁI */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#070d1e]/90 border border-white/10 shadow-2xl backdrop-blur-2xl">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                          <Layers className="w-5 h-5 text-[#fef08a]" />
                          <span>Phương Trình Thức Không Thời: Chánh - Hổ - Biến</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Đoạn ký sự không thời với 3 quẻ lục hào và tương tác chuyển dịch hào động
                        </p>
                      </div>
                      <span className="text-xs font-mono text-[#fef08a] bg-[#d4af37]/15 px-3 py-1 rounded-full border border-[#d4af37]/30">
                        Không Thời Số {activeKt.seq} • Dạng {activeKt.chanhForm}
                      </span>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                      {/* CHÁNH QUÁI */}
                      <HexagramBlock
                        pTri={activeKt.pChanh}
                        tTri={activeKt.tChanh}
                        pName={TIEN_THIEN_BAT_QUAI[activeKt.p].name}
                        tName={TIEN_THIEN_BAT_QUAI[activeKt.t].name}
                        fullName={activeKt.chanhName}
                        quaiType="CHÁNH QUÁI"
                        dongHao={activeKt.d}
                      />

                      <div className="flex flex-col items-center justify-center text-slate-500 py-2">
                        <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0 text-[#d4af37]" />
                        <span className="text-[9px] font-mono mt-0.5">4 Hào Giữa</span>
                      </div>

                      {/* HỔ QUÁI */}
                      <HexagramBlock
                        pTri={activeKt.pHo}
                        tTri={activeKt.tHo}
                        pName="Thượng Hổ [5,4,3]"
                        tName="Hạ Hổ [4,3,2]"
                        fullName={activeKt.hoName}
                        quaiType="HỔ QUÁI"
                      />

                      <div className="flex flex-col items-center justify-center text-slate-500 py-2">
                        <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0 text-rose-400" />
                        <span className="text-[9px] font-mono mt-0.5 text-rose-300">Biến Hào {activeKt.d}</span>
                      </div>

                      {/* BIẾN QUÁI */}
                      <HexagramBlock
                        pTri={activeKt.pBien}
                        tTri={activeKt.tBien}
                        pName={activeKt.dongTren ? "Thượng Biến" : "Thượng Bất Biến"}
                        tName={!activeKt.dongTren ? "Hạ Biến" : "Hạ Bất Biến"}
                        fullName={activeKt.bienName}
                        quaiType="BIẾN QUÁI"
                      />
                    </div>

                    {/* DỊCH TƯỢNG CHU DỊCH CỦA 3 QUẺ */}
                    <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs">
                        <div className="font-bold text-[#fef08a] mb-1">
                          Thoán Từ Chánh: {activeKt.chanhName}
                        </div>
                        <p className="text-slate-300 leading-relaxed italic">
                          {activeKt.iChingDetails.chanh?.thoanTu || "Khí tượng khởi phát ban sơ của vận sự."}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs">
                        <div className="font-bold text-[#38bdf8] mb-1">
                          Tượng Hổ (Mệnh Quái): {activeKt.hoName}
                        </div>
                        <p className="text-slate-300 leading-relaxed italic">
                          {activeKt.iChingDetails.ho?.daiTuong || "Nội tâm ẩn tàng và hạt giống định mệnh chuyển biến."}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs">
                        <div className="font-bold text-rose-400 mb-1">
                          Thoán Biến: {activeKt.bienName}
                        </div>
                        <p className="text-slate-300 leading-relaxed italic">
                          {activeKt.iChingDetails.bien?.thoanTu || "Kết cục chuyển dịch hậu đề của thời không."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MA TRẬN LỤC THÂN (TA, H, T, C, P, Q) */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#070d1e]/90 border border-white/10 shadow-2xl backdrop-blur-2xl">
                    <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <h3 className="text-xl font-serif font-bold text-white">
                        Ma Trận Lục Thân Tương Tác Cùng Bản Thể TA ({TIEN_THIEN_BAT_QUAI[activeKt.taQuaiNumber].element})
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {[
                        { sym: "TA", title: "TA (Bản Mệnh)", color: "text-[#38bdf8] border-[#38bdf8]/40" },
                        { sym: "H", title: "Huynh Đệ (H)", color: "text-amber-300 border-amber-300/40" },
                        { sym: "T", title: "Thê Tài (T)", color: "text-emerald-400 border-emerald-400/40" },
                        { sym: "C", title: "Tử Tôn (C)", color: "text-purple-300 border-purple-300/40" },
                        { sym: "P", title: "Phụ Mẫu (P)", color: "text-sky-300 border-sky-300/40" },
                        { sym: "Q", title: "Quan Quỷ (Q)", color: "text-rose-400 border-rose-400/40" },
                      ].map((item, idx) => {
                        const match = activeKt.lucThanMatrix.find((m) => m.symbol === item.sym);
                        const isMenh = activeKt.lucThanMatrix.find((m) => m.symbol === item.sym && m.isMenhCung);
                        return (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-2xl bg-white/[0.02] border ${item.color} flex flex-col justify-between`}
                          >
                            <div>
                              <div className="text-xs font-mono font-bold mb-1">{item.title}</div>
                              <div className="text-[11px] text-slate-400 leading-tight">
                                {match ? match.meaning : "Tiềm ẩn"}
                              </div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                              <span className="text-slate-500">Trạng thái:</span>
                              <span className={match ? "text-emerald-400 font-bold" : "text-slate-500"}>
                                {isMenh ? "CƯ MỆNH" : match ? "Hiển Lộ" : "Phục Tàng"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* LUẬN ĐOÁN 4 ĐẠI SỰ NHÂN SINH THEO NGUYỄN K */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#091124]/95 border border-[#d4af37]/40 shadow-2xl space-y-6 backdrop-blur-2xl">
                    <div className="pb-4 border-b border-[#d4af37]/30 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/40">
                          BỘ LUẬN SỰ CHUẨN MỰC LIÊN HOA ĐỘN PHÁP
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-white mt-1">
                          Chiêm Đoán 4 Việc Đại Sự Nhân Sinh
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-[#38bdf8]">
                        Đối chiếu Mệnh Cung {banQuaiKien.gender === "nam" ? "TA NAM" : "TA NỮ"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* 1. Giàu nghèo */}
                      <div className="p-5 rounded-2xl bg-[#050b18] border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 text-[#fef08a]">
                              <TrendingUp className="w-4 h-4" />
                              <h4 className="text-base font-serif font-bold">
                                {banQuaiKien.luanDoan.taiLoc.title}
                              </h4>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                              {banQuaiKien.luanDoan.taiLoc.status}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                            {banQuaiKien.luanDoan.taiLoc.content}
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400">
                          <strong>Chi tiết vận sự:</strong> {banQuaiKien.luanDoan.taiLoc.chiTiet}
                        </div>
                      </div>

                      {/* 2. Hướng nhà & Mặt tiền/Ngõ hẻm */}
                      <div className="p-5 rounded-2xl bg-[#050b18] border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 text-[#38bdf8]">
                              <Compass className="w-4 h-4" />
                              <h4 className="text-base font-serif font-bold">
                                {banQuaiKien.luanDoan.phongThuy.title}
                              </h4>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase">
                              {banQuaiKien.luanDoan.phongThuy.status}
                            </span>
                          </div>
                          <div className="mb-2 text-xs font-mono text-[#fef08a] bg-white/5 px-2.5 py-1 rounded-lg">
                            {banQuaiKien.luanDoan.phongThuy.toaHuong}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                            {banQuaiKien.luanDoan.phongThuy.content}
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-sky-950/30 border border-sky-500/20 text-[11px] text-sky-200">
                          <strong>Khảo sát mặt đường:</strong> {banQuaiKien.luanDoan.phongThuy.matTienHem}
                        </div>
                      </div>

                      {/* 3. Gia đạo hôn nhân & Nhân sự liên hệ */}
                      <div className="p-5 rounded-2xl bg-[#050b18] border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 text-[#c084fc]">
                              <HeartHandshake className="w-4 h-4" />
                              <h4 className="text-base font-serif font-bold">
                                {banQuaiKien.luanDoan.giaDao.title}
                              </h4>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                              {banQuaiKien.luanDoan.giaDao.status}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                            {banQuaiKien.luanDoan.giaDao.content}
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-200">
                          <strong>Tra cứu nhân thân:</strong> {banQuaiKien.luanDoan.giaDao.nhanSuLienHe}
                        </div>
                      </div>

                      {/* 4. Sức khỏe ngũ hành */}
                      <div className="p-5 rounded-2xl bg-[#050b18] border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 text-rose-400">
                              <HeartPulse className="w-4 h-4" />
                              <h4 className="text-base font-serif font-bold">
                                {banQuaiKien.luanDoan.sucKhoe.title}
                              </h4>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                              {banQuaiKien.luanDoan.sucKhoe.status}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                            {banQuaiKien.luanDoan.sucKhoe.content}
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20 text-[11px] text-rose-200">
                          <strong>Tạng phủ chú trọng:</strong> {banQuaiKien.luanDoan.sucKhoe.boViCoThe}
                        </div>
                      </div>
                    </div>

                    {/* 5. ỨNG KỲ THỜI GIAN & CHIẾN LƯỢC TIẾN / THỦ (MỚI HỌC HỎI TỪ CAO THỦ LỤC HÀO) */}
                    {banQuaiKien.luanDoan.ungKy && (
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-amber-950/30 border border-amber-500/40 shadow-lg mt-4 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-2">
                          <div className="flex items-center gap-2 text-amber-300">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <h4 className="text-base font-serif font-bold">
                              {banQuaiKien.luanDoan.ungKy.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-300">Chiến lược:</span>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-200 border border-amber-400/40">
                              {banQuaiKien.luanDoan.ungKy.chienLuoc}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                          <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                            <span className="text-slate-400 block mb-1 font-mono">Mốc Ứng Kỳ Biến Chuyển:</span>
                            <strong className="text-amber-200 text-sm">{banQuaiKien.luanDoan.ungKy.thoiGianBienChuyen}</strong>
                          </div>
                          <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                            <span className="text-slate-400 block mb-1 font-mono">Chỉ Dẫn Hành Động Cụ Thể:</span>
                            <span className="text-slate-200">{banQuaiKien.luanDoan.ungKy.loiKhuyenHanhDong}</span>
                          </div>
                        </div>

                        {/* CHI TIẾT TIẾN THẦN / THOÁI THẦN & TUYỆT XỨ PHÙNG SINH THEO THƯ TỊCH CỔ ĐIỂN TRUNG HOA */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-amber-500/10 text-xs">
                          {banQuaiKien.luanDoan.ungKy.tienThoaiThan && (
                            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-amber-300 font-bold">Thuật Lý Tiến / Thoái:</span>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                                  banQuaiKien.luanDoan.ungKy.tienThoaiThan.type.includes("TIẾN")
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                    : banQuaiKien.luanDoan.ungKy.tienThoaiThan.type.includes("THOÁI")
                                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                    : "bg-slate-700/30 text-slate-300"
                                }`}>
                                  {banQuaiKien.luanDoan.ungKy.tienThoaiThan.type}
                                </span>
                              </div>
                              <p className="text-slate-300 leading-relaxed text-[11px]">
                                {banQuaiKien.luanDoan.ungKy.tienThoaiThan.detail}
                              </p>
                            </div>
                          )}

                          {banQuaiKien.luanDoan.ungKy.tuyetXuPhungSinh && (
                            <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-500/20">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-sky-300 font-bold">Tuyệt Xứ Phùng Sinh:</span>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                                  banQuaiKien.luanDoan.ungKy.tuyetXuPhungSinh.isTuyetXu
                                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                                    : "bg-slate-700/30 text-slate-300"
                                }`}>
                                  {banQuaiKien.luanDoan.ungKy.tuyetXuPhungSinh.isTuyetXu ? "ĐẮC CỨU CÁNH" : "BÌNH HÒA"}
                                </span>
                              </div>
                              <p className="text-slate-300 leading-relaxed text-[11px]">
                                {banQuaiKien.luanDoan.ungKy.tuyetXuPhungSinh.detail}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 6. Lời Minh Triết Khai Tuệ */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#121b2d] to-[#040711] border border-[#d4af37]/50 shadow-inner mt-4">
                      <div className="flex items-center gap-2 text-[#fef08a] mb-2">
                        <BrainCircuit className="w-5 h-5 text-[#fef08a]" />
                        <h4 className="text-lg font-serif font-bold">
                          {banQuaiKien.luanDoan.minhTriet.title}
                        </h4>
                      </div>
                      <p className="text-sm sm:text-base font-serif text-slate-200 leading-relaxed italic mb-3">
                        &ldquo;{banQuaiKien.luanDoan.minhTriet.counsel}&rdquo;
                      </p>
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed">
                        <strong>Hành đạo chuyển hung thành cát:</strong>{" "}
                        {banQuaiKien.luanDoan.minhTriet.practice}
                      </div>
                    </div>

                    {/* 6. HỘ NIỆM AN TÂM & NHẸ NGHIỆP TỪ KINH NGŨ BÁCH DANH */}
                    {nguBachDanhRemedy && (
                      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1c1507] via-[#100d05] to-[#080702] border-2 border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.2)] text-amber-100 relative overflow-hidden mt-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
                          <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] shrink-0">
                              <Feather className="w-6 h-6 animate-pulse" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                                  HỘ NIỆM KINH NGŨ BÁCH DANH
                                </span>
                                <span className="text-xs text-amber-400/80 font-mono">
                                  Giảm Rủi Ro & Nhẹ Nghiệp
                                </span>
                              </div>
                              <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-200 mt-1">
                                {nguBachDanhRemedy.remedies[0]?.name || "Nam Mô Đại Bi Quán Thế Âm Bồ Tát"}
                              </h3>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              zenAudio.playCrystalChime(660, 0.1);
                              setIsNguBachDanhModalOpen(true);
                            }}
                            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-serif font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                          >
                            <Sparkles className="w-4 h-4" />
                            <span>Pháp Bảo Trì Niệm An Tâm - Ngũ Bách Danh</span>
                          </button>
                        </div>

                        <div className="pt-4 space-y-3.5">
                          <p className="text-sm font-serif leading-relaxed italic text-amber-200/90">
                            &ldquo;Quẻ có chút chướng duyên nơi phương vị/công việc, nhưng bạn chớ quá hoang mang. Cổ nhân dạy: &apos;Đức năng thắng số, từ bi chuyển hóa nghiệp duyên&apos;. Bạn hãy chí thành hướng tâm trì niệm danh hiệu Bồ Tát: <strong className="text-white underline decoration-amber-400">{nguBachDanhRemedy.remedies[0]?.shortTitle}</strong>... để an định tâm thần và nhẹ bớt nghiệp lực.&rdquo;
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                            <div className="p-3.5 rounded-xl bg-black/50 border border-amber-500/20 space-y-1">
                              <span className="text-amber-400 font-medium flex items-center gap-1.5">
                                <Feather className="w-3.5 h-3.5 text-amber-300" />
                                Câu Xướng Niệm:
                              </span>
                              <p className="text-slate-200 font-serif font-semibold">{nguBachDanhRemedy.chantingVerse}</p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-black/50 border border-amber-500/20 space-y-1">
                              <span className="text-amber-400 font-medium flex items-center gap-1.5">
                                <Award className="w-3.5 h-3.5 text-amber-300" />
                                Số Biến Khuyến Nghị:
                              </span>
                              <p className="text-slate-200 font-mono font-bold">{nguBachDanhRemedy.recommendedRepetitions} Biến (Lần tràng hạt & gõ mõ)</p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-black/50 border border-amber-500/20 space-y-1">
                              <span className="text-amber-400 font-medium flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                                Pháp Môn Đối Trị:
                              </span>
                              <p className="text-slate-200">{nguBachDanhRemedy.categoryTitle}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHÂN KHU MAI HOA DỊCH SỐ: THIỆU KHANG TIẾT & BỘ VÍ DỤ KINH ĐIỂN          */}
        {/* ========================================================================= */}
        {portalTab === "mai-hoa" && (
          <div className="w-full max-w-5xl space-y-8 mb-16">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#070d1e]/90 border border-rose-500/40 shadow-2xl backdrop-blur-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                    THIỆU KHANG TIẾT TIÊN SINH (BẮC TỐNG)
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                    Mai Hoa Dịch Số: Thuật Thể Dụng & Điển Cố Kinh Điển
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Học tập tinh hoa Quan Mai Chiêm, Mẫu Đơn Chiêm, Tây Các Thính Yến Thanh; cải tiến cách lập quẻ và luận đoán Thể - Dụng
                  </p>
                </div>

                <ZenButton
                  variant="gold"
                  size="sm"
                  icon={Sparkles}
                  onClick={() => {
                    zenAudio.playTibetanBowl(528, 0.1);
                    setMaiHoaResult(castMaiHoaTimeSpread(new Date()));
                    addMeritPoints("DIVINATION", "Gieo Quẻ Mai Hoa Thời Gian Thực", 10, { isDivination: true });
                  }}
                >
                  Lập Quẻ Mai Hoa Thời Khắc Này
                </ZenButton>
              </div>

              {/* KẾT QUẢ QUẺ MAI HOA HIỆN TẠI */}
              {maiHoaResult && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/30 via-slate-900/60 to-rose-950/30 border border-rose-500/30 mb-8 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 font-serif font-bold">
                        梅
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">QUẺ MAI HOA THỜI GIAN</span>
                        <h4 className="text-lg font-serif font-bold text-white">
                          Thượng {maiHoaResult.theDung.dungQuai} • Hạ {maiHoaResult.theDung.theQuai} (Hào {maiHoaResult.movingLine} Động)
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-300">Quan hệ Thể Dụng:</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                        maiHoaResult.theDung.relation === "Dụng sinh Thể"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : maiHoaResult.theDung.relation === "Thể khắc Dụng"
                          ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                          : maiHoaResult.theDung.relation === "Tỷ Hòa"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                      }`}>
                        {maiHoaResult.theDung.relation}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed">
                    {maiHoaResult.theDung.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                      <span className="text-slate-400 block mb-1 font-mono">Dự Báo Ứng Kỳ:</span>
                      <strong className="text-rose-200">{maiHoaResult.ungKy.thoiGianUocDinh}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                      <span className="text-slate-400 block mb-1 font-mono">Chỉ Dẫn Hành Động:</span>
                      <span className="text-slate-200">{maiHoaResult.ungKy.loiKhuyenHanhDong}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* BỘ ĐIỂN CỐ VÍ DỤ KINH ĐIỂN CỦA THIỆU KHANG TIẾT */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-[#fef08a] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#d4af37]" />
                    <span>Bộ Sưu Tập Điển Cố Chiêm Bốc Thiệu Ung (Mai Hoa Cổ Truyền)</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Chọn ví dụ để soi sáng cách luận:</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {MAI_HOA_CLASSIC_EXAMPLES.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => {
                        zenAudio.playSoftTap(600, 0.05);
                        setSelectedMaiHoaSample(sample);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selectedMaiHoaSample.id === sample.id
                          ? "bg-rose-950/40 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.3)] text-white"
                          : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="text-xs font-serif font-bold line-clamp-1">{sample.title}</div>
                      <div className="text-[10px] font-mono text-rose-300 mt-1">{sample.lapQue.chanhName}</div>
                    </button>
                  ))}
                </div>

                {/* CHI TIẾT VÍ DỤ ĐANG CHỌN */}
                <div className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono text-rose-400 uppercase">BỐI CẢNH NGOẠI ỨNG ĐỘNG TÂM</span>
                      <h4 className="text-lg font-serif font-bold text-[#fef08a]">{selectedMaiHoaSample.title}</h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-rose-500/20 text-rose-200 border border-rose-500/40 self-start sm:self-auto">
                      {selectedMaiHoaSample.theDungAnalysis.relation}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    &ldquo;{selectedMaiHoaSample.context}&rdquo;
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 space-y-1">
                      <span className="text-[#38bdf8] font-mono font-bold block">1. Lập Quẻ Dịch:</span>
                      <p className="text-slate-200">Chánh: <strong>{selectedMaiHoaSample.lapQue.chanhName}</strong> (Hào {selectedMaiHoaSample.lapQue.movingLine} động)</p>
                      <p className="text-slate-400">Biến: {selectedMaiHoaSample.lapQue.bienName}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 space-y-1">
                      <span className="text-emerald-400 font-mono font-bold block">2. Thuật Luận Thể - Dụng:</span>
                      <p className="text-slate-200">Thể: {selectedMaiHoaSample.theDungAnalysis.theQuai} ({selectedMaiHoaSample.theDungAnalysis.theElement})</p>
                      <p className="text-slate-200">Dụng: {selectedMaiHoaSample.theDungAnalysis.dungQuai} ({selectedMaiHoaSample.theDungAnalysis.dungElement})</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 space-y-1">
                      <span className="text-amber-400 font-mono font-bold block">3. Lời Tiên Tri Cổ Điển:</span>
                      <p className="text-slate-200 line-clamp-3">{selectedMaiHoaSample.tienTriPrediction}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 space-y-1.5">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Thực Chứng Ứng Nghiệm:</span>
                    </div>
                    <p className="leading-relaxed">{selectedMaiHoaSample.actualVerification}</p>
                    <div className="pt-2 border-t border-emerald-500/20 text-slate-300 font-serif italic">
                      <strong className="text-[#fef08a]">Bài học cải tiến cách luận:</strong> {selectedMaiHoaSample.mindsetLesson}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHÂN KHU 2: KHỔNG MINH THẦN TOÁN (384 QUẺ TIÊN TRI)                       */}
        {/* ========================================================================= */}
        {portalTab === "khong-minh" && (
          <div className="w-full max-w-4xl space-y-8 mb-16">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#070d1e]/90 border border-[#38bdf8]/40 shadow-2xl backdrop-blur-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40">
                    GIA CÁT VŨ HẦU TIÊN TRI
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                    Khổng Minh Thần Toán 384 Quẻ
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Gieo 3 chữ số tâm ý hoặc rút quẻ tâm linh để thỉnh bài thơ tứ tuyệt cổ truyền răn dạy
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRandomKhongMinh}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#fef08a] hover:bg-white/10 flex items-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Rút Thần Số Ngẫu Nhiên</span>
                  </button>
                </div>
              </div>

              {/* Nhập 3 số */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                <div>
                  <label className="block text-xs font-mono text-center text-slate-300 mb-1">Số Thứ Nhất:</label>
                  <input
                    type="number"
                    min={0}
                    max={9}
                    value={kmNum1}
                    onChange={(e) => setKmNum1(Number(e.target.value))}
                    className="w-full py-3 rounded-2xl bg-black/50 border border-white/10 text-center font-mono text-2xl font-bold text-[#38bdf8] focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-center text-slate-300 mb-1">Số Thứ Hai:</label>
                  <input
                    type="number"
                    min={0}
                    max={9}
                    value={kmNum2}
                    onChange={(e) => setKmNum2(Number(e.target.value))}
                    className="w-full py-3 rounded-2xl bg-black/50 border border-white/10 text-center font-mono text-2xl font-bold text-[#fef08a] focus:outline-none focus:border-[#fef08a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-center text-slate-300 mb-1">Số Thứ Ba:</label>
                  <input
                    type="number"
                    min={0}
                    max={9}
                    value={kmNum3}
                    onChange={(e) => setKmNum3(Number(e.target.value))}
                    className="w-full py-3 rounded-2xl bg-black/50 border border-white/10 text-center font-mono text-2xl font-bold text-[#34d399] focus:outline-none focus:border-[#34d399]"
                  />
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <ZenButton
                  onClick={handleGieoQueKhongMinh}
                  variant="gold"
                  size="md"
                  icon={Sparkles}
                  iconPosition="left"
                >
                  Giải Mã Thần Số Khổng Minh
                </ZenButton>
              </div>

              {/* KẾT QUẢ QUẺ KHỔNG MINH */}
              {kmResult && (
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c1a30] to-[#040813] border border-[#38bdf8]/40 shadow-xl">
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
                    <div>
                      <span className="text-xs font-mono text-[#38bdf8]">THẦN SỐ {kmResult.number} / 384</span>
                      <h3 className="text-xl font-serif font-bold text-white">{kmResult.name}</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {kmResult.catHung}
                    </span>
                  </div>

                  {/* Bài thơ tứ tuyệt */}
                  <div className="my-5 p-5 rounded-2xl bg-black/40 border border-white/10 text-center space-y-1.5 font-serif text-lg text-[#fef08a] italic tracking-wide">
                    {kmResult.originalVerse.map((verse, idx) => (
                      <div key={idx}>&ldquo;{verse}&rdquo;</div>
                    ))}
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-200">
                      <strong className="text-white block mb-1">Lời bàn dịch nghĩa:</strong>
                      {kmResult.meaning}
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                      <strong className="text-emerald-300 block mb-1">Lời răn dạy hành sự:</strong>
                      {kmResult.counsel}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHÂN KHU 3: LỤC HÀO & KINH DỊCH 64 QUẺ                                    */}
        {/* ========================================================================= */}
        {portalTab === "luc-hao" && (
          <div className="w-full max-w-5xl space-y-8 mb-16">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#070d1e]/90 border border-[#34d399]/40 shadow-2xl backdrop-blur-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/40">
                    CHU DỊCH 64 QUẺ • LỤC HÀO CHIÊM BỐC
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                    Tra Cứu Thoán Từ, Thế Ứng & Lục Thú
                  </h2>
                </div>

                {/* Chọn quẻ & Ngày can */}
                <div className="flex items-center gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Can Ngày:</label>
                    <select
                      value={canNgaySelected}
                      onChange={(e) => setCanNgaySelected(e.target.value as any)}
                      className="px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-[#fef08a]"
                    >
                      {["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"].map((c) => (
                        <option key={c} value={c}>
                          Can {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Chọn Quẻ Dịch:</label>
                    <select
                      value={selectedHexKey}
                      onChange={(e) => setSelectedHexKey(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs font-serif text-white max-w-[200px]"
                    >
                      {Object.keys(CHU_DICH_64_QUE).map((k) => (
                        <option key={k} value={k}>
                          {CHU_DICH_64_QUE[k].name} ({CHU_DICH_64_QUE[k].cungQuai})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* CHI TIẾT QUẺ ĐANG CHỌN */}
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-[#091524] border border-[#34d399]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-[#34d399]">
                        Số {currentIChingData.number} • {currentIChingData.pinyin}
                      </span>
                      {currentIChingData.isBatThuan && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/40">
                          BÁT THUẦN
                        </span>
                      )}
                      {currentIChingData.isTieuTuc && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40">
                          TIÊU TỨC 12 THÁNG
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {currentIChingData.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-slate-400 block text-[10px]">Cung Bát Quái:</span>
                      <span className="text-[#34d399] font-bold">{currentIChingData.cungQuai}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-slate-400 block text-[10px]">Thế Hào:</span>
                      <span className="text-rose-400 font-bold">Hào {currentIChingData.theHao}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-slate-400 block text-[10px]">Ứng Hào:</span>
                      <span className="text-sky-400 font-bold">Hào {currentIChingData.ungHao}</span>
                    </div>
                  </div>
                </div>

                {/* Thoán từ & Đại tượng */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                    <div className="font-bold text-[#fef08a] mb-1 flex items-center gap-1.5">
                      <Feather className="w-4 h-4" />
                      <span>Thoán Từ (Lời Quái):</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed italic">{currentIChingData.thoanTu}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                    <div className="font-bold text-[#38bdf8] mb-1 flex items-center gap-1.5">
                      <Sun className="w-4 h-4" />
                      <span>Đại Tượng Truyện (Lời Răn Quân Tử):</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed italic">{currentIChingData.daiTuong}</p>
                  </div>
                </div>

                {/* BẢNG 6 HÀO TỪ & LỤC THÚ KHỞI THEO NGÀY */}
                <div>
                  <h4 className="text-base font-serif font-bold text-white mb-3">
                    Chi Tiết 6 Hào Từ & Phối Lục Thú (Ngày Can {canNgaySelected}):
                  </h4>
                  <div className="space-y-2.5">
                    {currentIChingData.haoTu.map((h) => {
                      const thu = lucThuList[h.hao - 1];
                      const isThe = currentIChingData.theHao === h.hao;
                      const isUng = currentIChingData.ungHao === h.hao;

                      return (
                        <div
                          key={h.hao}
                          className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isThe
                              ? "bg-rose-500/10 border-rose-500/40"
                              : isUng
                              ? "bg-sky-500/10 border-sky-500/40"
                              : "bg-white/[0.02] border-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-16 font-mono text-xs font-bold text-[#fef08a]">
                              {h.name}
                            </span>
                            <span className="text-xs font-serif font-bold text-slate-300">
                              {h.text}
                            </span>
                            <div className="flex items-center gap-1">
                              {isThe && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500 text-white font-bold">
                                  THẾ
                                </span>
                              )}
                              {isUng && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500 text-slate-950 font-bold">
                                  ỨNG
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-slate-400 italic line-clamp-1 max-w-xs">{h.meaning}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-[#34d399] whitespace-nowrap">
                              {thu?.name} ({thu?.element})
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 whitespace-nowrap">
                              {h.catHung}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHÂN KHU 4: KỲ MÔN ĐỘN GIÁP & TỨ TRỤ BÁT TỰ                              */}
        {/* ========================================================================= */}
        {portalTab === "qi-men" && (
          <div className="w-full max-w-5xl space-y-8 mb-16">
            {/* 1. KỲ MÔN ĐỘN GIÁP BÁT MÔN */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#070d1e]/90 border border-[#fb923c]/40 shadow-2xl backdrop-blur-2xl">
              <div className="pb-4 border-b border-white/10 mb-6">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#fb923c]/20 text-[#fb923c] border border-[#fb923c]/40">
                  KỲ MÔN ĐỘN GIÁP • TRẬN ĐỒ BÁT MÔN
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  Bát Môn Xuất Hành & Phương Vị Cát Lợi
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tam Cát Môn (Khai, Hưu, Sinh) mang lại sinh khí thịnh vượng, bảo an cho trăm sự mưu cầu
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {Object.keys(QI_MEN_BAT_MON).map((gateKey) => {
                  const gate = QI_MEN_BAT_MON[gateKey];
                  const isCat = gate.nature === "Đại Cát" || gate.nature === "Cát";
                  return (
                    <div
                      key={gateKey}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isCat
                          ? "bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400"
                          : gate.nature === "Đại Hung"
                          ? "bg-rose-950/20 border-rose-500/40"
                          : "bg-white/[0.02] border-white/10"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-sm font-serif font-bold text-white">{gate.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase ${
                              isCat
                                ? "bg-emerald-500/20 text-emerald-300"
                                : gate.nature === "Đại Hung"
                                ? "bg-rose-500/20 text-rose-300"
                                : "bg-slate-500/20 text-slate-300"
                            }`}
                          >
                            {gate.nature}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-[#fef08a] mb-2">
                          {gate.direction} • Hành {gate.element}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">{gate.meaning}</p>
                      </div>

                      <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400">
                        <strong className="text-white block">Việc nên làm:</strong>
                        {gate.suitableActions.slice(0, 2).join(", ")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. TỨ TRỤ BÁT TỰ & THẬP THẦN HỶ DỤNG */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#070d1e]/90 border border-[#d4af37]/40 shadow-2xl backdrop-blur-2xl">
              <div className="pb-4 border-b border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/40">
                    TỨ TRỤ BÁT TỰ • THÂN VƯỢNG NHƯỢC
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">
                    Thập Thần & Đánh Giá Hỷ Dụng Thần
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-0.5">Hành Nhật Can:</label>
                    <select
                      value={canNgayEle}
                      onChange={(e) => setCanNgayEle(e.target.value as any)}
                      className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-[#38bdf8]"
                    >
                      {["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"].map((e) => (
                        <option key={e} value={e}>
                          Hành {e}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-0.5">Lệnh Tháng:</label>
                    <select
                      value={chiThangEle}
                      onChange={(e) => setChiThangEle(e.target.value as any)}
                      className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-[#34d399]"
                    >
                      {["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"].map((e) => (
                        <option key={e} value={e}>
                          Hành {e}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Kết quả đánh giá Thân vượng nhược */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#121c2e] to-[#060c18] border border-[#d4af37]/30 mb-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="text-sm font-serif font-bold text-white">
                    Kết Quả Đánh Giá: <span className="text-[#fef08a]">{baziEvaluation.status}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Nhật Can {canNgayEle} sinh tháng {chiThangEle}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-1">
                  <strong>Dụng Thần:</strong> {baziEvaluation.dungThan}
                </p>
                <p className="text-xs text-emerald-300 leading-relaxed">
                  <strong>Hỷ Thần:</strong> {baziEvaluation.hyThan}
                </p>
              </div>

              {/* Bảng tra Thập Thần */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.keys(BAZI_THAP_THAN).map((godKey) => {
                  const god = BAZI_THAP_THAN[godKey];
                  return (
                    <div
                      key={godKey}
                      className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs"
                    >
                      <div className="font-serif font-bold text-[#fef08a] mb-1">{god.name}</div>
                      <div className="text-[10px] font-mono text-slate-400 mb-1.5">{god.relation}</div>
                      <p className="text-slate-300 leading-relaxed mb-2">{god.meaning}</p>
                      <div className="text-[10px] text-sky-300 border-t border-white/5 pt-1.5">
                        <strong>Đắc dụng:</strong> {god.favorableFor}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHÂN KHU 5: PHÁP BẢO KINH NGŨ BÁCH DANH (500 DANH HIỆU QUÁN THẾ ÂM)        */}
        {/* ========================================================================= */}
        {portalTab === "ngu-bach-danh" && (
          <div className="w-full max-w-5xl space-y-8 mb-16">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090d19]/90 border border-amber-500/40 shadow-2xl backdrop-blur-2xl">
              {/* Tiêu đề & Nút Mở Lần Chuỗi */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                      PHÁP BẢO ĐẠI BI • 500 DANH HIỆU
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Bản Hành Trì 111 Trang</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    Lễ Ngũ Bách Danh Quán Thế Âm Bồ Tát
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    Khuyên trì niệm danh hiệu tương ứng khi gặp chuyện không hay để giảm thiểu rủi ro, an định tâm thần và nhẹ bớt nghiệp duyên.
                  </p>
                </div>

                <button
                  onClick={() => {
                    zenAudio.playCrystalChime(792, 0.1);
                    setIsNguBachDanhModalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-serif font-bold text-sm shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2.5 whitespace-nowrap cursor-pointer shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Mở Chuỗi Tràng 108 Hạt Ảo</span>
                </button>
              </div>

              {/* Lời Khai Thị An Tâm */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 mb-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                    <Feather className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-amber-200">
                      Chỉ Đạo Cốt Lõi: Đức Năng Thắng Số • Từ Bi Chuyển Hóa Nghiệp Duyên
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                      &quot;Khi người xem gặp chuyện không may, quẻ có hào hung, hãy khuyên họ chí thành hướng tâm niệm danh hiệu tương ứng trong 500 danh hiệu Quán Thế Âm Bồ Tát. Mục tiêu cho họ an tâm, bớt hoảng sợ và nhẹ bớt nghiệp lực đời này.&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* 6 Pháp Môn Đối Trị Nghiệp Duyên */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {Object.entries(KARMIC_CATEGORIES).map(([key, info]) => {
                  const count = getAllNguBachDanh().filter((i) => i.category === key).length;
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        zenAudio.playCrystalClick(800, 0.05);
                        setIsNguBachDanhModalOpen(true);
                      }}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.05] transition-all cursor-pointer group flex flex-col justify-between gap-3 shadow-lg"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border"
                            style={{
                              backgroundColor: `${info.color}15`,
                              borderColor: `${info.color}40`,
                              color: info.color,
                            }}
                          >
                            {info.shortLabel}
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-300">
                            {count} Danh Hiệu
                          </span>
                        </div>
                        <h4 className="text-base font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                          {info.title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed mt-2 line-clamp-3">
                          {info.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-amber-300 transition-colors font-medium">
                        <span>{info.mantraPrefix.slice(0, 28)}...</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Banner CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <h4 className="text-base font-serif font-bold text-amber-200">
                    Tra Cứu Đầy Đủ 500 Danh Hiệu & Trì Niệm Lần Chuỗi
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Tích hợp chuông bát Tây Tạng và mõ thiền gỗ mít procedurally synthesized trực tiếp trên trình duyệt.
                  </p>
                </div>
                <button
                  onClick={() => setIsNguBachDanhModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-serif font-bold text-xs shadow-lg transition-all whitespace-nowrap cursor-pointer"
                >
                  Mở Trình Trì Niệm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL TRÌ NIỆM NGŨ BÁCH DANH */}
        <NguBachDanhChantingModal
          isOpen={isNguBachDanhModalOpen}
          onClose={() => setIsNguBachDanhModalOpen(false)}
          initialRecommendation={nguBachDanhRemedy}
          divinationContext={
            banQuaiKien
              ? {
                  chanhName:
                    banQuaiKien.tienDe?.iChingDetails?.chanh?.name ||
                    banQuaiKien.tienDe?.taQuaiName ||
                    "Quẻ Gốc",
                  bienName:
                    banQuaiKien.tienDe?.iChingDetails?.bien?.name ||
                    banQuaiKien.tienDe?.suQuaiName ||
                    "Quẻ Biến",
                  movingLine: banQuaiKien.dongInput,
                  question: tamYQuestion,
                }
              : undefined
          }
        />

        {/* MODAL XUẤT THIỆP QUẺ TÂM AN MAY MẮN 4K */}
        <ViralOracleCardModal
          isOpen={isViralCardModalOpen}
          onClose={() => setIsViralCardModalOpen(false)}
          cardData={viralCardData}
        />

        {/* MODAL GIEO DUYÊN CHO NGƯỜI THÂN & HỘP QUÀ TÂM THỨC 4K */}
        <GiftOracleBlessingModal
          isOpen={isGiftModalOpen}
          onClose={() => setIsGiftModalOpen(false)}
        />
      </PageTransition>

      {/* MOBILE STICKY FLOATING DOCK (TIỆN ÍCH HÀNH ĐỘNG NHANH CHO ĐIỆN THOẠI) */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-[#070d1e]/95 border border-[#d4af37]/60 rounded-2xl px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl flex items-center justify-between gap-1">
        <button
          onClick={() => {
            zenAudio.playSoftTap(500, 0.05);
            window.scrollTo({ top: 380, behavior: "smooth" });
          }}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-mono text-slate-300 hover:text-white active:scale-95 transition-all"
        >
          <Layers className="w-4 h-4 text-[#38bdf8] mb-0.5" />
          <span>Gieo Quẻ</span>
        </button>

        <button
          onClick={() => {
            zenAudio.playCrystalClick(1400, 0.08);
            setIsViralCardModalOpen(true);
          }}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-mono text-[#fef08a] hover:text-white active:scale-95 transition-all"
        >
          <Share2 className="w-4 h-4 text-[#d4af37] mb-0.5" />
          <span>Thiệp 4K</span>
        </button>

        <button
          onClick={() => {
            zenAudio.playCrystalChime(792, 0.1);
            setIsNguBachDanhModalOpen(true);
          }}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-mono text-amber-300 hover:text-white active:scale-95 transition-all"
        >
          <Feather className="w-4 h-4 text-amber-300 mb-0.5" />
          <span>Lần Chuỗi</span>
        </button>

        <button
          onClick={() => {
            zenAudio.playCrystalChime(920, 0.08);
            setIsGiftModalOpen(true);
          }}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-mono text-rose-300 hover:text-white active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-rose-400 mb-0.5" />
          <span>Tặng Quà</span>
        </button>
      </div>

      {/* Global Footer */}
      <ClientFooter />
    </div>
  );
}
