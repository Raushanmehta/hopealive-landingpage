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
    "Become part of the movement. Share your time, skills, or resources to uplift communities in need."
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const openModal = (customTitle?: string | unknown, customDesc?: string | unknown) => {
    if (typeof customTitle === "string" && customTitle.trim()) {
      setTitle(customTitle);
    } else {
      setTitle("Join Our Mission");
    }
    if (typeof customDesc === "string" && customDesc.trim()) {
      setDescription(customDesc);
    } else {
      setDescription(
        "Become part of the movement. Share your time, skills, or resources to uplift communities in need."
      );
    }
    setSubmitted(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsOpen(false);
    }, 1800);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center items-center">
            <DialogTitle className="text-center">{title}</DialogTitle>
            <DialogDescription className="text-center max-w-md mx-auto">{description}</DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-[#ea580c] animate-bounce" />
              <h4 className="text-xl font-bold font-poppins text-white">
                Message Sent Successfully!
              </h4>
              <p className="text-sm text-[#d6c4b8]">
                Thank you for contacting us. Our team will reach out to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Input 1: Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#c4b1a6] mb-1 font-poppins">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#ea580c] focus:bg-white/10 focus:outline-none transition-colors font-poppins text-sm"
                />
              </div>

              {/* Input 2 & 3: Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#c4b1a6] mb-1 font-poppins">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#ea580c] focus:bg-white/10 focus:outline-none transition-colors font-poppins text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#c4b1a6] mb-1 font-poppins">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#ea580c] focus:bg-white/10 focus:outline-none transition-colors font-poppins text-sm"
                  />
                </div>
              </div>

              {/* Input 4: Subject */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#c4b1a6] mb-1 font-poppins">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#ea580c] focus:bg-white/10 focus:outline-none transition-colors font-poppins text-sm"
                />
              </div>

              {/* Input 5: Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#c4b1a6] mb-1 font-poppins">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="Write your message or inquiry here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#ea580c] focus:bg-white/10 focus:outline-none transition-colors font-poppins text-sm resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-leaf w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#ea580c] text-white font-poppins font-bold text-sm tracking-wide rounded-xl shadow-lg hover:bg-[#c2410c] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Submit Message</span>
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

export default ModalProvider;

