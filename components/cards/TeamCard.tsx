"use client";

import React from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import { TwitterIcon, LinkedinIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { TeamMember } from "@/types";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="group relative bg-[#1f2c16] text-white rounded-3xl overflow-hidden hover:border-[#feff02]/40 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1">
      {/* Team member image container */}
      <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-[#162211]">
        <Image
          src={member.image}
          alt={member.alt || member.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f2c16] via-transparent to-black/20 pointer-events-none" />


      </div>

      {/* Team member biography details */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between -mt-6 relative z-10">
        <div>
          <h3 className="font-poppins font-bold text-xl text-white group-hover:text-[#feff02] transition-colors leading-snug">
            {member.name}
          </h3>
          <p className="mt-1 text-xs font-poppins font-semibold text-[#feff02] uppercase tracking-wider">
            {member.role}
          </p>
          <p className="mt-3 text-xs sm:text-sm text-[#b0bfae] font-poppins leading-relaxed line-clamp-3">
            {member.bio}
          </p>
        </div>

        {/* Social profiles action links */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[13px] font-poppins uppercase tracking-wider text-[#7e8f7c]">
            Connect
          </span>
          <div className="flex items-center gap-2">
            {member.socials?.map((social, idx) => {
              return (
                <a
                  key={idx}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-full bg-[#2a3c20] border border-white/10 flex items-center justify-center text-white/90 hover:bg-[#feff02] hover:text-[#121a0d] hover:border-[#feff02] transition-all cursor-pointer"
                  aria-label={`${member.name} ${social.platform}`}
                >
                  {social.platform === "linkedin" && <LinkedinIcon size={18} />}
                  {social.platform === "twitter" && <TwitterIcon size={18} />}
                  {social.platform === "facebook" && <FacebookIcon size={18} />}
                  {social.platform === "email" && <Mail size={18} />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
