"use client";

import React, { useState, useRef, MouseEvent } from "react";
import Link from "next/link";
import { Sparkles, LucideIcon } from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";

export type ZenButtonVariant =
  | "gold"
  | "sage"
  | "purple"
  | "cyan"
  | "glass"
  | "ghost";

export type ZenButtonSize = "sm" | "md" | "lg" | "icon";

interface ZenButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: ZenButtonVariant;
  size?: ZenButtonSize;
  magnetic?: boolean;
  borderBeam?: boolean;
  soundEnabled?: boolean;
  soundType?: "crystal" | "chime" | "tap" | "harmonic";
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  className?: string;
  children?: React.ReactNode;
}

export default function ZenButton({
  href,
  variant = "gold",
  size = "md",
  magnetic = true,
  borderBeam = true,
  soundEnabled = true,
  soundType = "crystal",
  icon: Icon,
  iconPosition = "left",
  className = "",
  children,
  onClick,
  disabled,
  ...props
}: ZenButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic Pull Calculation
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!magnetic || disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Gentle magnetic pull dampening (max 8px)
    setOffset({
      x: Math.max(-8, Math.min(8, distanceX * 0.2)),
      y: Math.max(-8, Math.min(8, distanceY * 0.2)),
    });
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
      if (soundEnabled) {
        zenAudio.playSoftHover();
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (soundEnabled) {
      if (soundType === "harmonic") {
        zenAudio.playHarmonicChord();
      } else if (soundType === "tap") {
        zenAudio.playSoftTap();
      } else if (soundType === "chime") {
        zenAudio.playCrystalChime();
      } else {
        zenAudio.playCrystalClick();
      }
    }

    if (onClick) {
      (onClick as any)(e);
    }
  };

  // Styles per variant
  const variantStyles: Record<
    ZenButtonVariant,
    {
      container: string;
      glow: string;
      beamColor: string;
      iconColor: string;
    }
  > = {
    gold: {
      container:
        "bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 font-semibold shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.65)] border border-[#fef08a]/40",
      glow: "bg-[#d4af37]/35",
      beamColor: "from-transparent via-[#fff5b8] to-transparent",
      iconColor: "text-slate-900",
    },
    sage: {
      container:
        "bg-gradient-to-r from-[#8f9779] via-[#aab493] to-[#778063] text-slate-950 font-semibold shadow-[0_0_25px_rgba(143,151,121,0.35)] hover:shadow-[0_0_40px_rgba(143,151,121,0.65)] border border-[#d9e2c6]/40",
      glow: "bg-[#8f9779]/35",
      beamColor: "from-transparent via-[#e4edd2] to-transparent",
      iconColor: "text-slate-900",
    },
    purple: {
      container:
        "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white font-semibold shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.65)] border border-purple-300/40",
      glow: "bg-purple-500/35",
      beamColor: "from-transparent via-purple-200 to-transparent",
      iconColor: "text-purple-100",
    },
    cyan: {
      container:
        "bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-600 text-slate-950 font-semibold shadow-[0_0_25px_rgba(20,184,166,0.35)] hover:shadow-[0_0_40px_rgba(20,184,166,0.65)] border border-teal-300/40",
      glow: "bg-teal-400/35",
      beamColor: "from-transparent via-teal-100 to-transparent",
      iconColor: "text-slate-900",
    },
    glass: {
      container:
        "backdrop-blur-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium border border-white/20 hover:border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
      glow: "bg-white/15",
      beamColor: "from-transparent via-white/80 to-transparent",
      iconColor: "text-[#fef08a]",
    },
    ghost: {
      container:
        "bg-transparent hover:bg-white/10 text-slate-300 hover:text-white font-medium border border-transparent hover:border-white/20",
      glow: "bg-white/5",
      beamColor: "from-transparent via-white/50 to-transparent",
      iconColor: "text-slate-300",
    },
  };

  const currentVariant = variantStyles[variant];

  const sizeStyles: Record<ZenButtonSize, string> = {
    sm: "px-4 py-2 text-xs rounded-xl gap-2",
    md: "px-6 py-3 text-sm rounded-xl gap-2.5",
    lg: "px-8 py-4 text-base rounded-2xl gap-3",
    icon: "p-3 text-sm rounded-xl justify-center",
  };

  const currentSize = sizeStyles[size];

  const content = (
    <>
      {/* Micro-sparkle floating particles on hover */}
      {isHovered && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <span className="absolute top-1 left-3 w-1 h-1 rounded-full bg-white animate-ping opacity-75" />
          <span className="absolute bottom-2 right-4 w-1.5 h-1.5 rounded-full bg-white animate-pulse opacity-90" />
          <span className="absolute top-3 right-6 w-1 h-1 rounded-full bg-white opacity-60 animate-ping delay-200" />
        </span>
      )}

      {/* Border beam sweeping light sweep around border */}
      {borderBeam && isHovered && (
        <span className="pointer-events-none absolute -inset-[1px] rounded-[inherit] overflow-hidden p-[1px]">
          <span
            className={`absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_70%,rgba(255,255,255,0.85)_88%,transparent_100%)]`}
          />
        </span>
      )}

      {/* Ambient Pulsing Glow Backdrop */}
      <span
        className={`pointer-events-none absolute -inset-1 rounded-[inherit] ${currentVariant.glow} blur-md transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2.5 font-medium tracking-wide">
        {Icon && iconPosition === "left" && (
          <Icon
            className={`${
              size === "lg" ? "w-5 h-5" : size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
            } shrink-0 ${currentVariant.iconColor} group-hover:rotate-6 transition-transform duration-300`}
          />
        )}
        {children && <span>{children}</span>}
        {Icon && iconPosition === "right" && (
          <Icon
            className={`${
              size === "lg" ? "w-5 h-5" : size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
            } shrink-0 ${currentVariant.iconColor} group-hover:translate-x-1 transition-transform duration-300`}
          />
        )}
      </span>
    </>
  );

  const sharedClasses = `group relative inline-flex items-center justify-center select-none outline-none cursor-pointer active:scale-95 transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${currentVariant.container} ${currentSize} ${className}`;

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovered ? "transform 0.08s ease-out" : "transform 0.35s ease-out",
      }}
    >
      {href ? (
        <Link
          href={href}
          onClick={handleClick as any}
          className={sharedClasses}
        >
          {content}
        </Link>
      ) : (
        <button
          onClick={handleClick}
          disabled={disabled}
          className={sharedClasses}
          {...props}
        >
          {content}
        </button>
      )}
    </div>
  );
}
