"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ZenAvatar3D from "@/components/3d/ZenAvatar3D";
import SageMasterAvatar3D from "@/components/3d/SageMasterAvatar3D";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Flame,
  AlertCircle,
  BrainCircuit,
  Compass,
  Moon,
  Heart,
  ChevronDown,
  ChevronUp,
  Mic,
  MicOff,
  Volume2,
} from "lucide-react";
import ClientNavbar from "@/components/ui/ClientNavbar";
import ClientFooter from "@/components/ui/ClientFooter";
import ZenButton from "@/components/ui/ZenButton";
import ZenBadge from "@/components/ui/ZenBadge";
import PageTransition from "@/components/ui/PageTransition";
import { zenAudio } from "@/utils/zenAudio";
import {
  getBrainMemory,
  recordBrainEvent,
  generateHolisticProactiveGreeting,
  UnifiedBrainMemory,
} from "@/utils/unifiedBrain";
import { sacredVoice } from "@/utils/sacredVoice";
import { addMeritPoints } from "@/utils/meritSystem";

interface MessageItem {
  id: number;
  sender: "ai" | "user";
  text: string;
  providerName?: string;
}

export default function ChatPage() {
  const [brainMemory, setBrainMemory] = useState<UnifiedBrainMemory | null>(null);
  const [showBrainHUD, setShowBrainHUD] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 1,
      sender: "ai",
      text: "Namaste. Tôi là Tâm An AI – người bạn đồng hành trong tĩnh lặng và tỉnh thức. Hôm nay tâm trí bạn đang vương vấn điều gì?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceOutputActive, setIsVoiceOutputActive] = useState(true);
  const [activeViseme, setActiveViseme] = useState<number | null>(null);
  const [currentVisemes, setCurrentVisemes] = useState<any[]>([]);
  const [avatarMode, setAvatarMode] = useState<"sage" | "orb">("sage");
  const [isSageSpeaking, setIsSageSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const unsub = sacredVoice.subscribe((st) => {
      setIsSageSpeaking(st.isSpeaking);
    });
    return () => unsub();
  }, []);

  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Khởi tạo Speech Recognition (STT)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "vi-VN";

        recognition.onstart = () => {
          setIsListening(true);
          zenAudio.playSoftTap(650, 0.05);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputValue(transcript);
            handleSendText(transcript);
          }
        };

        recognition.onerror = (err: any) => {
          console.warn("Lỗi nhận diện giọng nói:", err);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech. Bạn có thể sử dụng bàn phím gõ chữ nhé.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn("Recognition start error:", e);
      }
    }
  };

  // Khởi tạo dòng ký ức từ Bộ Não Tâm An duy nhất và nạp lời chào chủ động
  useEffect(() => {
    const mem = getBrainMemory();
    setBrainMemory(mem);

    const proactiveGreeting = generateHolisticProactiveGreeting(mem);
    setMessages([
      {
        id: 1,
        sender: "ai",
        text: proactiveGreeting,
      },
    ]);
  }, []);

  const QUICK_PROMPTS = [
    "Làm sao để buông bỏ lo âu?",
    "Ý nghĩa của sự tĩnh tại nội tâm",
    "Một lời khuyên cho ngày hôm nay",
  ];

  // Cuộn mượt mà xuống đáy hộp thoại khi có tin nhắn hoặc streaming gõ chữ
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Hủy kết nối stream an toàn khi người dùng thoát trang
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSendText = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    zenAudio.playSoftTap(600, 0.05);
    const userText = textToSend.trim();
    const newUserMsg: MessageItem = { id: Date.now(), sender: "user", text: userText };
    const aiMsgId = Date.now() + 1;
    const newAiMsg: MessageItem = { id: aiMsgId, sender: "ai", text: "" };

    // Chuẩn bị lịch sử hội thoại gửi lên API
    const historyPayload = messages.map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }));

    setMessages((prev) => [...prev, newUserMsg, newAiMsg]);
    setInputValue("");
    setIsTyping(true);
    setActiveViseme(null);
    setCurrentVisemes([]);

    // Lấy trạng thái Bộ Não mới nhất
    const currentMemory = getBrainMemory();
    setBrainMemory(currentMemory);

    // Hủy kết nối trước nếu còn đang hoạt động
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
          brainMemory: currentMemory,
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`Máy chủ phản hồi với mã trạng thái ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let buffer = "";
      let hasPlayedChime = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data:")) continue;

          const dataStr = trimmed.slice(5).trim();
          if (dataStr === "[DONE]") {
            break;
          }

          try {
            const parsed = JSON.parse(dataStr);

            if (parsed.providerUsed) {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMsgId ? { ...msg, providerName: parsed.providerUsed } : msg
                )
              );
            }

            if (parsed.text) {
              accumulatedText += parsed.text;
              if (!hasPlayedChime) {
                zenAudio.playCrystalChime(852, 0.06);
                hasPlayedChime = true;
              }
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMsgId ? { ...msg, text: accumulatedText } : msg
                )
              );
            }

            if (parsed.visemes && Array.isArray(parsed.visemes) && parsed.visemes.length > 0) {
              setCurrentVisemes(parsed.visemes);
              setActiveViseme(parsed.visemes[0].viseme ?? null);
            }
          } catch (jsonErr) {
            // Dòng SSE chưa hoàn chỉnh hoặc không phải JSON
          }
        }
      }

      // Đảm bảo nếu AI không trả về ký tự nào, cập nhật thông điệp an tĩnh
      if (!accumulatedText.trim()) {
        const fallbackText = "Hít một hơi thật sâu... Mọi biến chuyển đều đang đưa bạn về chốn bình an.";
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsgId ? { ...msg, text: fallbackText } : msg
          )
        );
      } else {
        // Tích lũy công đức đàm đạo minh triết
        addMeritPoints("CHAT_INSIGHT" as any, "Đàm đạo cùng Bậc Thầy Trí Tuệ AI", 15);

        // Khẩu truyền giọng đọc Thầy Sinh (nếu đang bật chế độ giọng nói)
        if (isVoiceOutputActive) {
          // Lấy đoạn mở đầu hoặc tóm lược lời khai thị
          const spokenExcerpt = accumulatedText.slice(0, 280);
          sacredVoice.speakReading(spokenExcerpt);
        }

        // Ghi lại sự kiện đối thoại vào Bộ Não Tâm An
        try {
          const updatedEvent = recordBrainEvent({
            type: "CHAT_INSIGHT",
            data: {
              userPromptSnippet: userText,
              aiKeyAdviceSnippet: accumulatedText.slice(0, 150),
            },
          });
          setBrainMemory(getBrainMemory());
        } catch (e) {
          console.error("Lỗi đồng bộ Chat Insight vào Bộ Não:", e);
        }
      }
    } catch (err: any) {
      if (err.name === "AbortError" || controller.signal.aborted) {
        console.log("[Tâm An AI] Đã hủy luồng stream kết nối.");
        return;
      }

      console.error("[Tâm An AI] Lỗi kết nối luồng SSE:", err);
      const friendlyError =
        "Xin lỗi bạn, năng lượng kết nối tâm thức tạm thời gián đoạn. Hãy hít thở sâu và thử gửi lại tin nhắn nhé.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsgId
            ? {
                ...msg,
                text:
                  msg.text.trim().length > 0
                    ? `${msg.text}\n\n⚠️ ${friendlyError}`
                    : friendlyError,
              }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
      setActiveViseme(null);
      setCurrentVisemes([]);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendText(inputValue);
  };

  return (
    <div className="min-h-screen bg-[#070b12] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d1f19] via-[#070b12] to-black text-white flex flex-col justify-between relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Nền ánh sáng quang học Zen mờ ảo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Unified Client Navigation Header */}
      <ClientNavbar />

      {/* Page Content Transition Container */}
      <PageTransition className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 z-10 w-full max-w-4xl mx-auto">
        {/* 3D WebGL Avatar Section: Tiên Ông Thầy Sinh hoặc Cầu Năng Lượng Zen */}
        <div className="relative mb-3 flex flex-col items-center z-10">
          {avatarMode === "sage" ? (
            <div className="relative w-72 h-64 sm:w-80 sm:h-72 rounded-3xl overflow-hidden border border-amber-500/40 bg-radial from-[#1e1b4b]/50 to-[#03050c]/90 shadow-[0_0_35px_rgba(212,175,55,0.25)] group">
              <SageMasterAvatar3D
                height={290}
                isSpeaking={isSageSpeaking || isTyping}
                isGesturing={isListening}
                isTranscending={false}
                speechAmplitude={0.7}
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-[10px] font-mono text-amber-200 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isSageSpeaking ? "bg-amber-400 animate-ping" : isListening ? "bg-sky-400 animate-pulse" : "bg-emerald-400"}`} />
                <span>{isListening ? "Thầy Đang Lắng Nghe..." : isSageSpeaking ? "Thầy Đang Khẩu Truyền" : "Thầy Sinh Tĩnh Tọa"}</span>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <div
                className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
                  isTyping
                    ? "bg-emerald-400/40 scale-125"
                    : "bg-emerald-500/15 scale-100"
                }`}
              />

              <ZenAvatar3D
                isTyping={isTyping}
                activeViseme={activeViseme}
                visemes={currentVisemes}
                size={140}
              />
            </div>
          )}

          {/* Nút Chuyển Đổi Chế Độ Avatar & Trạng Thái */}
          <div className="mt-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                zenAudio.playSoftTap(550, 0.04);
                setAvatarMode(avatarMode === "sage" ? "orb" : "sage");
              }}
              className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-200 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Chế độ: {avatarMode === "sage" ? "Tiên Ông Thầy Sinh 3D" : "Quả Cầu Năng Lượng"}</span>
            </button>
            <ZenBadge
              variant={avatarMode === "sage" ? "gold" : "emerald"}
              label={
                isListening
                  ? "Đang lắng tai..."
                  : isSageSpeaking
                  ? "Đàm đạo chân truyền"
                  : "Sẵn sàng khai vấn"
              }
              size="xs"
            />
          </div>
        </div>

        {/* Glassmorphism Chat Container with Zen Emerald Ambient */}
        <div className="w-full max-w-2xl h-[520px] flex flex-col backdrop-blur-2xl bg-white/[0.04] rounded-3xl border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)] overflow-hidden relative z-10">
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-wide text-emerald-100 flex items-center gap-2">
                  Tâm An AI • Giác Ngộ
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Unified Brain
                  </span>
                </h2>
                <p className="text-[10px] text-emerald-300/60 font-light">
                  Bộ Não Tâm Thức Hợp Nhất Toàn Nền Tảng
                </p>
              </div>
            </div>

            {/* Nút bật/tắt HUD Hào Quang Ký Ức Tâm An */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  zenAudio.playSoftTap(650, 0.04);
                  setShowBrainHUD(!showBrainHUD);
                }}
                className={`flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                  showBrainHUD
                    ? "bg-emerald-500/30 border-emerald-400 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                    : "bg-white/5 border-white/10 text-emerald-200/70 hover:text-white hover:border-emerald-400/40"
                }`}
                title="Bật/Tắt Hào Quang Ký Ức Tâm An"
              >
                <BrainCircuit className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden sm:inline">Ký Ức Đồng Bộ</span>
                {showBrainHUD ? (
                  <ChevronUp className="w-3 h-3 text-emerald-300" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-emerald-300/60" />
                )}
              </button>
              <div className="text-xs text-emerald-200/60 hidden sm:flex items-center gap-1.5 font-light">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Unified Memory HUD Dropdown (Hào quang Ký ức Tâm An) */}
          <AnimatePresence>
            {showBrainHUD && brainMemory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-b border-emerald-500/20 bg-[#0b1419]/95 backdrop-blur-xl px-4 py-3 z-20 text-xs overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>HÀO QUANG KÝ ỨC TÂM AN (UNIFIED MEMORY HUD)</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-emerald-200/80">
                    <span>Bình An: <strong className="text-emerald-300">{brainMemory.userEnergyState.serenityScore}%</strong></span>
                    <span>Trực Giác: <strong className="text-cyan-300">{brainMemory.userEnergyState.intuitionScore}%</strong></span>
                    <span>Căng Thẳng: <strong className="text-rose-300">{brainMemory.userEnergyState.stressScore}%</strong></span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Quẻ Dịch */}
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-medium mb-1">
                      <Compass className="w-3 h-3" />
                      <span>Quẻ Độn Giáp</span>
                    </div>
                    {brainMemory.recentDivinations.length > 0 ? (
                      <p className="text-[10px] text-gray-300 line-clamp-2">
                        {brainMemory.recentDivinations[0].chanhName} ➔ {brainMemory.recentDivinations[0].bienName} (Hào {brainMemory.recentDivinations[0].d})
                      </p>
                    ) : (
                      <p className="text-[10px] text-gray-500 italic">Chưa gieo quẻ hôm nay</p>
                    )}
                  </div>

                  {/* Tarot */}
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-1.5 text-purple-300 text-[11px] font-medium mb-1">
                      <Moon className="w-3 h-3" />
                      <span>Tarot 3D</span>
                    </div>
                    {brainMemory.recentTarotReadings.length > 0 ? (
                      <p className="text-[10px] text-gray-300 line-clamp-2">
                        {brainMemory.recentTarotReadings[0].cards.map((c) => c.title).join(" • ")}
                      </p>
                    ) : (
                      <p className="text-[10px] text-gray-500 italic">Chưa rút bài hôm nay</p>
                    )}
                  </div>

                  {/* Thiền định */}
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-1.5 text-teal-300 text-[11px] font-medium mb-1">
                      <Heart className="w-3 h-3" />
                      <span>Tọa Thiền</span>
                    </div>
                    {brainMemory.recentMeditations.length > 0 ? (
                      <p className="text-[10px] text-gray-300 line-clamp-2">
                        Đã thiền {Math.round(brainMemory.recentMeditations[0].durationSeconds / 60)} phút • Chuông 432Hz
                      </p>
                    ) : (
                      <p className="text-[10px] text-gray-500 italic">Chưa có phiên thiền</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 z-10 scrollbar-thin scrollbar-thumb-emerald-900/40">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[82%] p-4 rounded-2xl leading-relaxed text-sm md:text-base ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-emerald-600/35 to-teal-600/25 text-emerald-50 border border-emerald-400/40 rounded-br-none shadow-[0_4px_20px_rgba(16,185,129,0.18)]"
                      : "bg-white/[0.07] text-gray-100 border border-white/15 rounded-bl-none shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  } backdrop-blur-md`}
                >
                  {msg.text ? (
                    <div className="whitespace-pre-wrap">
                      {msg.text}
                      {isTyping &&
                        msg.sender === "ai" &&
                        msg.id === messages[messages.length - 1]?.id && (
                          <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                        )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-300/80 font-light text-xs py-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Đang khai mở tuệ giác...</span>
                    </div>
                  )}

                  {/* Nhãn nguồn trí tuệ tự động chuyển đổi */}
                  {msg.sender === "ai" && msg.providerName && (
                    <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-emerald-300/60">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                        <span>Nguồn: {msg.providerName}</span>
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Failover Active
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01] flex items-center gap-2 overflow-x-auto">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendText(prompt)}
                className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/50 text-emerald-200/80 hover:text-white whitespace-nowrap active:scale-95 transition-all cursor-pointer"
              >
                ✦ {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/[0.03] border-t border-white/10 z-10">
            <form onSubmit={handleSend} className="flex gap-2 sm:gap-3 items-center">
              {/* Nút bật/tắt khẩu truyền giọng nói của Thầy Sinh */}
              <button
                type="button"
                onClick={() => {
                  zenAudio.playSoftTap(500, 0.03);
                  setIsVoiceOutputActive(!isVoiceOutputActive);
                  if (isVoiceOutputActive) {
                    sacredVoice.stopSpeaking();
                  }
                }}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isVoiceOutputActive
                    ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
                title={isVoiceOutputActive ? "Đang bật giọng đọc Thầy Sinh" : "Đã tắt giọng đọc"}
              >
                <Volume2 className="w-4 h-4" />
              </button>

              {/* Nút Micro nói chuyện trực tiếp (STT) */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 sm:px-3 sm:py-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isListening
                    ? "bg-rose-500/30 border-rose-400 text-rose-200 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.5)]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-emerald-400/50"
                }`}
                title={isListening ? "Đang lắng nghe... bấm để dừng" : "Bấm vào để nói bằng Micro"}
              >
                {isListening ? (
                  <>
                    <Mic className="w-4 h-4 text-rose-300 animate-bounce" />
                    <span className="text-[11px] font-mono hidden sm:inline text-rose-200">Đang nghe...</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span className="text-[11px] font-mono hidden sm:inline">Nói Micro</span>
                  </>
                )}
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isListening ? "Đang lắng nghe giọng bạn..." : "Chia sẻ trăn trở hoặc cảm xúc của bạn..."}
                className="flex-1 bg-black/30 border border-white/15 rounded-full px-5 py-3 text-sm md:text-base text-white placeholder-gray-400/60 focus:outline-none focus:border-emerald-400/70 focus:bg-black/50 transition-all shadow-inner"
              />
              <ZenButton
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                variant="cyan"
                size="icon"
                borderBeam={true}
                soundEnabled={false} // Sound handled in handleSendText
                icon={Send}
                aria-label="Gửi tin nhắn"
                className="w-12 h-12 rounded-full shrink-0"
              />
            </form>
          </div>

          {/* Decorative glowing gradient inside the glass container */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none rounded-3xl" />
        </div>
      </PageTransition>

      {/* Unified Client Footer */}
      <ClientFooter />
    </div>
  );
}
