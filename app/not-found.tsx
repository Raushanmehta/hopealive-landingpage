import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-[#f8f6f0] min-h-screen">
      <section
        aria-label="404 Page Not Found"
        className="relative w-full bg-[#f8f6f0] text-[#273813] px-4 md:px-12 py-24 md:py-32 overflow-hidden"
      >
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="relative my-2 select-none">
            <span className="font-poppins font-black text-8xl sm:text-9xl lg:text-[140px] tracking-tighter text-[#331600] leading-none block">
              404
            </span>
          </div>

          <h1 className="font-poppins font-bold text-3xl sm:text-5xl lg:text-[54px] text-[#273813] tracking-tight leading-[1.15] mt-6 mb-4">
            Page Not Found
          </h1>

          <p className="font-poppins text-sm sm:text-base lg:text-lg text-[#556350] leading-relaxed max-w-2xl mb-10">
            The page you are looking for does not exist or has been moved.
          </p>

          <Link
            href="/"
            className="btn-leaf inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#ea580c] text-[#ffffff] hover:bg-[#331600] hover:text-[#ea580c] font-poppins font-bold text-sm tracking-wide rounded-xl shadow-lg transition-all cursor-pointer select-none"
          >
            <Home size={16} strokeWidth={2.6} />
            <span>Back to Home</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

