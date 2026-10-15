"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone, Share2, PlusSquare } from "lucide-react";

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Đăng ký Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("[PWA] Service Worker đăng ký thành công với scope:", reg.scope);
          })
          .catch((err) => {
            console.warn("[PWA] Đăng ký Service Worker thất bại:", err);
          });
      });
    }

    // 2. Kiểm tra nếu đã mở dưới dạng App độc lập (Standalone PWA)
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isInStandaloneMode);

    if (isInStandaloneMode) return;

    // 3. Kiểm tra thiết bị iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 4. Bắt sự kiện beforeinstallprompt (Android / Chrome Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Hiển thị banner sau 3 giây để người dùng trải nghiệm trước
      setTimeout(() => {
        const hasDismissed = localStorage.getItem("taman_pwa_dismissed");
        if (!hasDismissed) {
          setShowBanner(true);
        }
      }, 3500);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Nếu là iOS và chưa đóng banner, hiển thị nhắc nhở
    if (isIosDevice && !isInStandaloneMode) {
      const hasDismissed = localStorage.getItem("taman_pwa_dismissed");
      if (!hasDismissed) {
        setTimeout(() => setShowBanner(true), 4000);
      }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("[PWA] Người dùng đã chấp nhận cài đặt Tâm An AI App!");
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("taman_pwa_dismissed", "true");
  };

  if (!showBanner || isStandalone) return null;

  return (
    <aside
      aria-label="Cài đặt ứng dụng Tâm An AI"
      className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:max-w-md z-50 p-4 rounded-2xl bg-[#070d1e]/95 backdrop-blur-xl border border-amber-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.2)] animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-sky-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-inner">
          <Smartphone className="w-6 h-6 text-amber-300 animate-pulse" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-amber-200 tracking-wide">
              Cài Đặt Tâm An AI Vào Điện Thoại
            </h4>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Mở ứng dụng toàn màn hình 1 chạm, gieo quẻ mượt mà không cần mở trình duyệt.
          </p>

          {isIOS ? (
            <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-300 font-medium">
                <Share2 className="w-3.5 h-3.5" /> <span>1. Nhấn nút Chia sẻ (Share) ở dưới Safari</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300 font-medium">
                <PlusSquare className="w-3.5 h-3.5" /> <span>2. Chọn &quot;Thêm vào MH chính&quot; (Add to Home)</span>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                Cài Đặt 1 Chạm Ngay
              </button>
              <button
                onClick={handleDismiss}
                className="py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
              >
                Để Sau
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
