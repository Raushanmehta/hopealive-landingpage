"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface ModalContextType {
  isOpen: boolean;
  openModal: (customTitle?: string, customDesc?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Join Our Mission");
  const [description, setDescription] = useState(
    "Fill in your details below to get involved, volunteer, or support our ongoing community projects."
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const openModal = (customTitle?: string, customDesc?: string) => {
    if (customTitle) setTitle(customTitle);
    if (customDesc) setDescription(customDesc);
    setSubmitted(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFullName("");
      setEmail("");
      setIsOpen(false);
    }, 1800);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-[#ea580c] animate-bounce" />
              <h4 className="text-xl font-bold font-poppins text-white">
                Thank You!
              </h4>
              <p className="text-sm text-[#d6c4b8]">
                We have received your details and will get in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#c4b1a6] mb-1.5 font-poppins">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#ea580c] focus:bg-white/10 focus:outline-none transition-colors font-poppins text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#c4b1a6] mb-1.5 font-poppins">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#ea580c] focus:bg-white/10 focus:outline-none transition-colors font-poppins text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-leaf w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#ea580c] text-[#ffffff] font-poppins font-bold text-sm tracking-wide rounded-xl shadow-lg hover:bg-[#c2410c] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Submit Information</span>
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
}

export function useAppModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useAppModal must be used within a ModalProvider");
  }
  return context;
}

