"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";
import SacredLotusLogo from "./SacredLotusLogo";

/**
 * GoldenScrollEnhancer — Tiểu tiết vi mô đỉnh cao:
 * 1. Golden Scroll Progress Bar vi tế 2px dát vàng chạy dọc đỉnh màn hình
 * 2. Nút "Chạm Đỉnh An Trú" (Scroll to Top) biểu tượng Bát Diệp Liên Hoa mạ vàng
 */
export default function GoldenScrollEnhancer() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsVisible(latest > 350);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    zenAudio.playCrystalChime(1080, 0.06);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* 1. Golden Scroll Progress Bar đỉnh màn hình */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#38bdf8] origin-left z-[100] shadow-[0_0_12px_rgba(254,240,138,0.7)] pointer-events-none"
      />

      {/* 2. Nút Chạm Đỉnh An Trú (Floating Scroll to Top) */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={scrollToTop}
            title="Trở về đỉnh cõi tĩnh tâm"
            className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-[#070d1e]/85 backdrop-blur-xl border border-[#d4af37]/45 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(254,240,138,0.7)] hover:border-[#fef08a] group transition-all select-none flex items-center justify-center cursor-pointer"
          >
            {/* Vầng hào quang xoay */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d4af37]/20 to-[#38bdf8]/20 blur-sm group-hover:blur-md transition-all -z-10" />

            <div className="relative flex items-center justify-center w-7 h-7">
              <SacredLotusLogo
                size="xs"
                className="group-hover:opacity-0 transition-opacity duration-300"
              />
              <ArrowUp className="w-4 h-4 text-[#fef08a] absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
