import React from "react";
import Link from "next/link";
import { Home, Heart } from "lucide-react";
import { site } from "@/data";

export default function NotFound() {
    const data = site.notFound;

    return (
        <main className="bg-[#f8f6f0] min-h-screen">
            <section
                aria-label="404 Page Not Found"
                className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-12 md:py-20 lg:py-24 overflow-hidden"
            >
                <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                    {/* Stylized 404 number display */}
                    <div className="relative my-2 select-none">
                        <span className="font-poppins font-black text-8xl sm:text-9xl lg:text-[140px] tracking-tighter text-[#1f2c16] leading-none block">
                            {data.code}
                        </span>
                    </div>

                    {/* Section headline text title */}
                    <h1 className="font-poppins font-bold text-3xl sm:text-5xl lg:text-[54px] text-[#1b2715] tracking-tight leading-[1.15] mt-6 mb-4">
                        {data.headline}
                    </h1>

                    {/* Section descriptive narrative paragraph */}
                    <p className="font-poppins text-sm sm:text-base lg:text-lg text-[#556350] leading-relaxed max-w-2xl mb-10">
                        {data.description}
                    </p>

                    {/* Action navigation link buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        {data.primaryCta && (
                            <Link
                                href={data.primaryCta.href}
                                className="btn-leaf inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#feff02] text-[#121a0d] hover:bg-[#1f2c16] hover:text-[#feff02] font-poppins font-bold text-sm tracking-wide rounded-xl shadow-lg transition-all cursor-pointer w-full sm:w-auto select-none"
                            >
                                <Home size={16} strokeWidth={2.6} />
                                <span>{data.primaryCta.label}</span>
                            </Link>
                        )}
                        {data.secondaryCta && (
                            <Link
                                href={data.secondaryCta.href}
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#1f2c16] hover:bg-[#2d5a27] text-white rounded-full font-poppins font-semibold text-sm tracking-wide transition-all border border-[#1b2715]/10 w-full sm:w-auto shadow-md"
                            >
                                <Heart size={16} className="text-[#feff02]" />
                                <span>{data.secondaryCta.label}</span>
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

