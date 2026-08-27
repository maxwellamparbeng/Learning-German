import React, { useState, useMemo } from "react";
import { 
  Trophy, 
  X, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Flame, 
  ArrowRight,
  Zap,
  Target
} from "lucide-react";
import { ChallengeLevel, ChallengeContentType, ChallengeDirection } from "../types/challenge";
import { getChallengePreview } from "../utils/challengeEngine";
import { ArrowLeftRight } from "lucide-react";

interface ChallengeSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartChallenge: (level: ChallengeLevel, contentType: ChallengeContentType, direction: ChallengeDirection) => void;
  initialLevel?: ChallengeLevel;
}

export const ChallengeSetupModal: React.FC<ChallengeSetupModalProps> = ({
  isOpen,
  onClose,
  onStartChallenge,
  initialLevel = "B1"
}) => {
  const [selectedLevel, setSelectedLevel] = useState<ChallengeLevel>(initialLevel);
  const [contentType, setContentType] = useState<ChallengeContentType>("both");
  const [direction, setDirection] = useState<ChallengeDirection>("de-to-en");

  const preview = useMemo(() => {
    return getChallengePreview(selectedLevel, contentType);
  }, [selectedLevel, contentType]);

  if (!isOpen) return null;

  const levelDescriptions: Record<ChallengeLevel, { title: string; desc: string; badgeColor: string }> = {
    A1: { title: "A1 Beginner", desc: "Essential daily basics, greetings & foundation words", badgeColor: "bg-emerald-500 text-white" },
    A2: { title: "A2 Elementary", desc: "Practical conversational vocab & situational expressions", badgeColor: "bg-blue-500 text-white" },
    B1: { title: "B1 Intermediate (TELC)", desc: "Work, lifestyle, opinions & connected conversation", badgeColor: "bg-purple-500 text-white" },
    B2: { title: "B2 Upper Intermediate", desc: "Professional, academic & nuanced German expressions", badgeColor: "bg-amber-500 text-white" }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1cb0f6] via-[#235390] to-[#58cc02] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
              <Trophy className="w-7 h-7 text-yellow-300 fill-yellow-300 drop-shadow-sm" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-white/80 block">Challenge Mode</span>
              <h2 className="text-2xl font-black tracking-tight">30-Day German Challenge</h2>
            </div>
          </div>
          <p className="text-sm text-white/90 font-medium leading-relaxed max-w-md">
            Master an entire German proficiency level through structured daily learning, spaced review, and adaptive practice in 30 days!
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Step 1: Select Level */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5">
              1. Choose Language Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(["A1", "A2", "B1", "B2"] as ChallengeLevel[]).map((lvl) => {
                const isSelected = selectedLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#1cb0f6] bg-[#ddf4ff] shadow-sm translate-y-[-2px]"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <span className={`inline-block px-2 py-0.5 rounded-lg text-xs font-black mb-1 ${levelDescriptions[lvl].badgeColor}`}>
                      {lvl}
                    </span>
                    <span className="block text-xs font-bold text-slate-700">
                      {lvl === "A1" ? "Beginner" : lvl === "A2" ? "Elementary" : lvl === "B1" ? "Intermediate" : "Upper Inter"}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-2 italic">
              {levelDescriptions[selectedLevel].desc}
            </p>
          </div>

          {/* Step 2: Content Type */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5">
              2. Select Content Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: "both" as ChallengeContentType, label: "Full Course", icon: Sparkles, desc: "Vocab + Phrases + Daily Grammar" },
                { id: "grammar" as ChallengeContentType, label: "Grammar Only", icon: Layers, desc: "30 Days of Rules & Drills" },
                { id: "vocab" as ChallengeContentType, label: "Vocabulary", icon: BookOpen, desc: "Single words & declensions" },
                { id: "phrases" as ChallengeContentType, label: "Phrases Only", icon: MessageSquare, desc: "Everyday expressions" }
              ].map((t) => {
                const isSelected = contentType === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setContentType(t.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-[#58cc02] bg-[#d7ffb8] shadow-sm translate-y-[-2px]"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Icon className={`w-4 h-4 ${isSelected ? "text-[#58cc02]" : "text-slate-500"}`} />
                      <span className="text-xs font-black text-slate-800">{t.label}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 leading-tight">{t.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Translation Direction */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
                3. Study Direction (Switchable Anytime)
              </label>
              <span className="text-[11px] font-bold text-[#1cb0f6] bg-[#ddf4ff] px-2 py-0.5 rounded-md flex items-center gap-1">
                <ArrowLeftRight className="w-3 h-3" />
                EN-DE / DE-EN
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { 
                  id: "de-to-en" as ChallengeDirection, 
                  label: "🇩🇪 DE ➔ 🇬🇧 EN", 
                  title: "German ➔ English",
                  desc: "German prompt, test English meaning. Ideal for comprehension & reading." 
                },
                { 
                  id: "en-to-de" as ChallengeDirection, 
                  label: "🇬🇧 EN ➔ 🇩🇪 DE", 
                  title: "English ➔ German",
                  desc: "English prompt, test German recall & spelling. Ideal for active speaking." 
                },
                { 
                  id: "mixed" as ChallengeDirection, 
                  label: "🔀 Mixed (DE ⇄ EN)", 
                  title: "Bi-directional",
                  desc: "Alternating German & English prompts for 360° mastery." 
                }
              ].map((d) => {
                const isSelected = direction === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDirection(d.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-[#1cb0f6] bg-[#ddf4ff] shadow-sm translate-y-[-2px]"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="mb-1">
                      <span className="text-xs font-black text-slate-900 block">{d.label}</span>
                      <span className="text-[11px] font-bold text-[#235390] block">{d.title}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 leading-tight">{d.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#1cb0f6]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  {selectedLevel} German — 30-Day Plan Preview
                </span>
              </div>
              <span className="text-xs font-black px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                30 Days
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {preview.totalGrammarTopics > 0 && (
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                  <span className="text-slate-500 block">Grammar Topics</span>
                  <strong className="text-slate-900 font-extrabold text-sm">{preview.totalGrammarTopics} Topics (A1–B2)</strong>
                  <span className="text-[11px] text-slate-400 block mt-0.5">1 structured topic + drills / day</span>
                </div>
              )}

              {preview.totalVocab > 0 && (
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                  <span className="text-slate-500 block">Total Vocabulary</span>
                  <strong className="text-slate-900 font-extrabold text-sm">{preview.totalVocab} words</strong>
                  <span className="text-[11px] text-slate-400 block mt-0.5">≈ {preview.vocabPerDayAvg} new words/day</span>
                </div>
              )}

              {preview.totalPhrases > 0 && (
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                  <span className="text-slate-500 block">Total Key Phrases</span>
                  <strong className="text-slate-900 font-extrabold text-sm">{preview.totalPhrases} phrases</strong>
                  <span className="text-[11px] text-slate-400 block mt-0.5">≈ {preview.phrasesPerDayAvg} new phrases/day</span>
                </div>
              )}

              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                <span className="text-slate-500 block">Review &amp; Drills</span>
                <strong className="text-emerald-700 font-bold text-xs flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Adaptive Spaced Repetition
                </strong>
                <span className="text-[11px] text-slate-400 block mt-0.5">Interactive quiz &amp; cloze tests</span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                <span className="text-slate-500 block">Estimated Practice</span>
                <strong className="text-slate-900 font-bold text-xs flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {preview.estimatedDailyMinutes}
                </strong>
                <span className="text-[11px] text-slate-400 block mt-0.5">Fits easily into any schedule</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/3 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onStartChallenge(selectedLevel, contentType, direction)}
              className="w-full sm:w-2/3 py-3.5 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-sm uppercase tracking-wider shadow-md border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Start 30-Day Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
