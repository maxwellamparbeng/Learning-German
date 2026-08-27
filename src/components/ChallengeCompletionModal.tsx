import React from "react";
import { 
  Trophy, 
  Sparkles, 
  Award, 
  RotateCw, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  BookOpen, 
  MessageSquare, 
  X,
  Zap,
  Target
} from "lucide-react";
import { ChallengeProgress, ChallengeLevel, ChallengeItem } from "../types/challenge";

interface ChallengeCompletionModalProps {
  isOpen: boolean;
  challenge: ChallengeProgress;
  onClose: () => void;
  onReviewWeakWords: () => void;
  onRetakeChallenge: () => void;
  onStartNextLevel: (nextLevel: ChallengeLevel) => void;
}

export const ChallengeCompletionModal: React.FC<ChallengeCompletionModalProps> = ({
  isOpen,
  challenge,
  onClose,
  onReviewWeakWords,
  onRetakeChallenge,
  onStartNextLevel
}) => {
  if (!isOpen) return null;

  const allItems = Object.values(challenge.items) as ChallengeItem[];
  const masteredCount = allItems.filter(i => i.learningState === "MASTERED").length;
  const difficultCount = allItems.filter(i => i.learningState === "DIFFICULT").length;
  const vocabLearned = allItems.filter(i => i.contentType === "vocab" && i.timesSeen > 0).length;
  const phrasesLearned = allItems.filter(i => i.contentType === "phrase" && i.timesSeen > 0).length;

  const nextLevelMap: Record<ChallengeLevel, ChallengeLevel | null> = {
    A1: "A2",
    A2: "B1",
    B1: "B2",
    B2: null
  };
  const nextLevel = nextLevelMap[challenge.level];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Confetti & Gold Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 p-8 text-white text-center relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 border-2 border-white/40 shadow-lg animate-bounce">
            <Trophy className="w-10 h-10 text-yellow-100 fill-yellow-200 drop-shadow-md" />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-white/90 block mb-1">
            Grand Achievement Unlocked!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            🎉 30-DAY CHALLENGE COMPLETE!
          </h2>
          <p className="text-sm text-white/95 font-medium mt-1">
            {challenge.level} German Mastery Accomplished
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Badge Display */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-white flex items-center justify-center shadow-inner shrink-0">
              <Award className="w-8 h-8 fill-white" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
                Special Award Conferred
              </span>
              <h4 className="text-base font-black text-slate-900">
                🏆 30-Day {challenge.level} Vocabulary Master
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Completed 30 consecutive days of focused German vocabulary &amp; phrase training.
              </p>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {challenge.totalVocabCount > 0 && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-500 block">Vocabulary</span>
                <strong className="text-base font-black text-slate-900">
                  {vocabLearned} / {challenge.totalVocabCount}
                </strong>
              </div>
            )}

            {challenge.totalPhraseCount > 0 && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-500 block">Phrases</span>
                <strong className="text-base font-black text-slate-900">
                  {phrasesLearned} / {challenge.totalPhraseCount}
                </strong>
              </div>
            )}

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 block">Overall Accuracy</span>
              <strong className="text-base font-black text-emerald-600">
                {challenge.averageAccuracy}%
              </strong>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 block">Mastered Items</span>
              <strong className="text-base font-black text-indigo-600">
                {masteredCount} Items
              </strong>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 block">Total Challenge XP</span>
              <strong className="text-base font-black text-[#58cc02]">
                +{challenge.totalXPEarned} XP
              </strong>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 block">Longest Streak</span>
              <strong className="text-base font-black text-amber-600 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                {challenge.longestStreak || 30} Days
              </strong>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            {nextLevel && (
              <button
                onClick={() => onStartNextLevel(nextLevel)}
                className="w-full py-4 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-sm uppercase tracking-wider shadow-md border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Advance to {nextLevel} Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {difficultCount > 0 && (
              <button
                onClick={onReviewWeakWords}
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-amber-50 border-2 border-amber-200 text-amber-800 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Drill Weak / Difficult Words ({difficultCount})</span>
              </button>
            )}

            <div className="flex gap-2.5">
              <button
                onClick={onRetakeChallenge}
                className="flex-1 py-3 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Retake Challenge</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
