"use client";

import React from "react";
import { Sparkles, LucideIcon } from "lucide-react";

export type ZenBadgeVariant = "gold" | "sage" | "purple" | "cyan" | "emerald";

interface ZenBadgeProps {
  children?: React.ReactNode;
  label?: string;
  variant?: ZenBadgeVariant;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  pulsing?: boolean;
  className?: string;
  size?: "xs" | "sm" | "md";
}

export default function ZenBadge({
  children,
  label,
  variant = "gold",
  icon: Icon = Sparkles,
  pulsing = true,
  className = "",
  size = "sm",
}: ZenBadgeProps) {
  const styles: Record<
    ZenBadgeVariant,
    {
      badge: string;
      icon: string;
      dot: string;
      glow: string;
    }
  > = {
    gold: {
      badge:
        "bg-gradient-to-r from-[#d4af37]/20 via-[#fef08a]/10 to-[#b38a20]/15 border-[#d4af37]/50 text-[#fef08a]",
      icon: "text-[#fef08a]",
      dot: "bg-[#d4af37] shadow-[0_0_8px_#fef08a]",
      glow: "shadow-[0_0_16px_rgba(212,175,55,0.25)]",
    },
    sage: {
      badge:
        "bg-gradient-to-r from-[#8f9779]/20 via-[#a3ad8c]/10 to-[#6c7857]/15 border-[#8f9779]/50 text-[#d9e2c6]",
      icon: "text-[#d9e2c6]",
      dot: "bg-[#8f9779] shadow-[0_0_8px_#d9e2c6]",
      glow: "shadow-[0_0_16px_rgba(143,151,121,0.25)]",
    },
    purple: {
      badge:
        "bg-gradient-to-r from-purple-500/20 via-fuchsia-500/10 to-indigo-600/15 border-purple-400/50 text-purple-200",
      icon: "text-purple-300",
      dot: "bg-purple-400 shadow-[0_0_8px_#c084fc]",
      glow: "shadow-[0_0_16px_rgba(168,85,247,0.28)]",
    },
    cyan: {
      badge:
        "bg-gradient-to-r from-teal-500/20 via-cyan-400/10 to-emerald-600/15 border-teal-400/50 text-teal-200",
      icon: "text-teal-300",
      dot: "bg-teal-400 shadow-[0_0_8px_#2dd4bf]",
      glow: "shadow-[0_0_16px_rgba(20,184,166,0.28)]",
    },
    emerald: {
      badge:
        "bg-gradient-to-r from-emerald-500/20 via-emerald-400/10 to-teal-700/15 border-emerald-400/50 text-emerald-200",
      icon: "text-emerald-300",
      dot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
      glow: "shadow-[0_0_16px_rgba(16,185,129,0.28)]",
    },
  };

  const current = styles[variant] || styles.gold;

  const sizeClasses = {
    xs: "text-[10px] px-2 py-0.5 gap-1",
    sm: "text-[11px] px-3 py-1 gap-1.5",
    md: "text-xs px-3.5 py-1.5 gap-2",
  }[size];

  const iconSizes = {
    xs: "w-2.5 h-2.5",
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
  }[size];

  return (
    <span
      className={`relative inline-flex items-center font-mono uppercase tracking-widest rounded-full border backdrop-blur-md transition-all duration-300 ${current.badge} ${current.glow} ${sizeClasses} ${className}`}
    >
      {/* Subtle pulsing background aura */}
      {pulsing && (
        <span
          className="absolute inset-0 rounded-full bg-white/5 opacity-70 animate-pulse pointer-events-none -z-10"
        />
      )}

      {/* Micro sparkling icon */}
      <Icon className={`${iconSizes} ${current.icon} shrink-0 animate-pulse`} />

      {/* Content */}
      <span className="font-semibold tracking-wider">{label || children}</span>

      {/* Luminescent micro dot */}
      <span className={`w-1 h-1 rounded-full ${current.dot} shrink-0 ml-0.5`} />
    </span>
  );
}
