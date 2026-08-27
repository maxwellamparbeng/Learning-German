import React, { useState } from "react";
import { 
  ChallengeProgress, 
  ChallengeDay, 
  ChallengeItem, 
  ChallengeLevel,
  ChallengeDirection,
  GrammarTopic
} from "../types/challenge";
import { 
  Trophy, 
  Flame, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  RotateCw, 
  Play, 
  BookOpen, 
  MessageSquare, 
  Award, 
  AlertCircle, 
  Volume2, 
  X, 
  Zap, 
  Target, 
  Plus, 
  RefreshCw, 
  Clock, 
  Layers, 
  FileText, 
  HelpCircle, 
  ExternalLink,
  ArrowLeftRight
} from "lucide-react";
import { speakGerman } from "../utils/speechService";
import { getGrammarTopicForDay, getGrammarTopicsForLevel } from "../data/challenge_grammar";

interface ChallengeDashboardProps {
  challenge: ChallengeProgress | null;
  onOpenSetup: () => void;
  onStartDayPractice: (dayNumber: number) => void;
  onResetChallenge: () => void;
  onUpdateDirection?: (newDir: ChallengeDirection) => void;
}

export const ChallengeDashboard: React.FC<ChallengeDashboardProps> = ({
  challenge,
  onOpenSetup,
  onStartDayPractice,
  onResetChallenge,
  onUpdateDirection
}) => {
  const [selectedDayDetails, setSelectedDayDetails] = useState<ChallengeDay | null>(null);
  const [showDifficultModal, setShowDifficultModal] = useState(false);
  const [showGrammarSyllabusModal, setShowGrammarSyllabusModal] = useState(false);
  const [selectedGrammarTopic, setSelectedGrammarTopic] = useState<GrammarTopic | null>(null);

  // Audio helper
  const playAudio = (text: string) => {
    speakGerman(text);
  };

  // No active challenge state
  if (!challenge) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-md text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#1cb0f6] to-[#58cc02] flex items-center justify-center mx-auto text-white shadow-lg">
            <Trophy className="w-10 h-10 fill-white drop-shadow-sm" />
          </div>

          <div className="max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#1cb0f6] block mb-1">
              Structured German Mastery
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              30-Day Vocabulary, Phrases &amp; Grammar Challenge
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base mt-2 leading-relaxed">
              Supercharge your German learning with a structured 30-day adaptive roadmap.
              Master an entire CEFR proficiency level (A1, A2, B1, or B2) with daily grammar lessons, vocabulary, phrases, intelligent spaced repetition, and interactive drills!
            </p>
          </div>

          {/* Level preview cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left pt-2">
            {[
              { level: "A1", label: "Beginner", items: "150+ Vocab & 30 Grammar Topics", color: "border-emerald-200 bg-emerald-50/50 text-emerald-800" },
              { level: "A2", label: "Elementary", items: "250+ Vocab & 30 Grammar Topics", color: "border-blue-200 bg-blue-50/50 text-blue-800" },
              { level: "B1", label: "Intermediate", items: "400+ TELC & 30 Grammar Topics", color: "border-purple-200 bg-purple-50/50 text-purple-800" },
              { level: "B2", label: "Upper Inter", items: "500+ Items & 30 Grammar Topics", color: "border-amber-200 bg-amber-50/50 text-amber-800" }
            ].map((card) => (
              <div key={card.level} className={`p-4 rounded-2xl border ${card.color}`}>
                <span className="text-xs font-black uppercase px-2 py-0.5 rounded-md bg-white shadow-2xs inline-block mb-1">
                  {card.level}
                </span>
                <strong className="text-xs font-bold block text-slate-800">{card.label}</strong>
                <span className="text-[11px] text-slate-500 block mt-0.5">{card.items}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={onOpenSetup}
              className="px-8 py-4 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-base uppercase tracking-wider shadow-lg border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>Choose Level &amp; Start Challenge</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Challenge Metrics
  const totalItemsCount = Object.keys(challenge.items).length;
  const allItems = Object.values(challenge.items) as ChallengeItem[];
  const allDays = Object.values(challenge.days) as ChallengeDay[];

  const masteredItems = allItems.filter(i => i.learningState === "MASTERED");
  const difficultItems = allItems.filter(i => i.learningState === "DIFFICULT");
  const reviewDueItems = allItems.filter(i => i.learningState === "REVIEW" || i.learningState === "LEARNING");
  const completedDays = allDays.filter(d => d.status === "completed").length;
  const grammarCompletedCount = allDays.filter(d => d.status === "completed" && d.grammarCompleted).length;
  
  const vocabLearnedCount = allItems.filter(i => i.contentType === "vocab" && i.timesSeen > 0).length;
  const phrasesLearnedCount = allItems.filter(i => i.contentType === "phrase" && i.timesSeen > 0).length;

  const progressPercent = Math.min(100, Math.round((completedDays / challenge.durationDays) * 100));

  // Determine current active day
  const currentDayNum = challenge.currentDay || 1;
  const currentDayData = challenge.days[currentDayNum];
  const todayGrammarTopic = getGrammarTopicForDay(challenge.level, currentDayNum);
  const allLevelGrammarTopics = getGrammarTopicsForLevel(challenge.level);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* HERO BANNER & TODAY'S MISSION */}
      <div className="bg-gradient-to-r from-[#1cb0f6] via-[#235390] to-[#58cc02] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-white border border-white/30">
                {challenge.level} German Challenge
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-xs font-bold text-white/90">
                Day {completedDays} of {challenge.durationDays} Completed
              </span>
              {todayGrammarTopic && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-400/25 backdrop-blur-md text-xs font-black text-amber-200 border border-amber-300/40">
                  📐 Grammar: {todayGrammarTopic.title}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {completedDays >= challenge.durationDays 
                ? "🏆 30-Day Challenge Completed!" 
                : `Day ${currentDayNum}: Today's Learning Goal`}
            </h2>

            <p className="text-xs sm:text-sm text-white/90 font-medium max-w-lg leading-relaxed">
              {completedDays >= challenge.durationDays
                ? "You have conquered all 30 days! Practice any day, explore the grammar syllabus, or review difficult items below."
                : todayGrammarTopic 
                  ? `Today's Grammar: "${todayGrammarTopic.title} (${todayGrammarTopic.englishTitle})" plus daily vocabulary, phrases, and practice drills!`
                  : `Ready for your daily practice? Learn new vocabulary & key phrases with spaced review and interactive exercises.`}
            </p>

            {/* Progress Bar */}
            <div className="pt-2 max-w-md">
              <div className="flex justify-between text-xs font-bold text-white/90 mb-1.5">
                <span>Overall Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-300 to-[#58cc02] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action CTA Box */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/30 text-center shrink-0 min-w-[200px] shadow-lg">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-300 mb-2">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{challenge.currentStreak} Day Streak</span>
            </div>

            {completedDays < challenge.durationDays ? (
              <button
                onClick={() => onStartDayPractice(currentDayNum)}
                className="w-full py-3.5 px-6 rounded-xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-sm uppercase tracking-wider shadow-md border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Day {currentDayNum}</span>
              </button>
            ) : (
              <button
                onClick={() => onStartDayPractice(1)}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RotateCw className="w-4 h-4 text-emerald-600" />
                <span>Practice Recap</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* KEY STATISTICS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
            <Clock className="w-3.5 h-3.5 text-[#1cb0f6]" />
            <span>Days Completed</span>
          </div>
          <strong className="text-xl font-black text-slate-900">
            {completedDays} / {challenge.durationDays}
          </strong>
          <span className="text-[11px] text-slate-400 block mt-0.5">{challenge.durationDays - completedDays} days left</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Grammar Topics</span>
          </div>
          <strong className="text-xl font-black text-slate-900">
            {grammarCompletedCount || completedDays} / 30
          </strong>
          <span className="text-[11px] text-purple-600 font-bold block mt-0.5">
            {challenge.level} Curriculum
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Words &amp; Phrases</span>
          </div>
          <strong className="text-xl font-black text-slate-900">
            {vocabLearnedCount + phrasesLearnedCount} / {challenge.totalVocabCount + challenge.totalPhraseCount}
          </strong>
          <span className="text-[11px] text-slate-400 block mt-0.5">{masteredItems.length} Mastered</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
            <Target className="w-3.5 h-3.5 text-amber-500" />
            <span>Average Accuracy</span>
          </div>
          <strong className="text-xl font-black text-slate-900">
            {challenge.averageAccuracy || 0}%
          </strong>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">+{challenge.totalXPEarned} XP Earned</span>
        </div>
      </div>

      {/* STUDY TRANSLATION DIRECTION SWITCH BAR */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1cb0f6] flex items-center justify-center shrink-0 border border-blue-100">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Translation Mode
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#ddf4ff] text-[#1cb0f6]">
                Switchable Anytime
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {(challenge.direction || "de-to-en") === "de-to-en" 
                ? "🇩🇪 German ➔ 🇬🇧 English: Prompts in German, practice English translations (Comprehension)."
                : (challenge.direction || "de-to-en") === "en-to-de"
                ? "🇬🇧 English ➔ 🇩🇪 German: Prompts in English, practice German recall & spelling (Active Production)."
                : "🔀 Mixed Mode: Alternating bi-directional recall for 360° mastery."}
            </p>
          </div>
        </div>

        {/* Direction Switch Pill Group */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => onUpdateDirection?.("de-to-en")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              (challenge.direction || "de-to-en") === "de-to-en"
                ? "bg-white text-[#1cb0f6] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🇩🇪 DE ➔ 🇬🇧 EN
          </button>
          <button
            type="button"
            onClick={() => onUpdateDirection?.("en-to-de")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              challenge.direction === "en-to-de"
                ? "bg-white text-[#58cc02] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🇬🇧 EN ➔ 🇩🇪 DE
          </button>
          <button
            type="button"
            onClick={() => onUpdateDirection?.("mixed")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              challenge.direction === "mixed"
                ? "bg-white text-purple-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🔀 Mixed
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS & SYLLABUS ACCESS */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              Curriculum &amp; Adaptive Tools
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowGrammarSyllabusModal(true)}
              className="text-xs font-bold text-purple-700 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>30-Day {challenge.level} Grammar Syllabus</span>
            </button>

            {difficultItems.length > 0 && (
              <button
                onClick={() => setShowDifficultModal(true)}
                className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl border border-red-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Drill Difficult Items ({difficultItems.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* State Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
            <span className="text-emerald-800 font-bold block">✨ Mastered</span>
            <strong className="text-lg font-black text-emerald-900">{masteredItems.length} items</strong>
          </div>

          <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200">
            <span className="text-blue-800 font-bold block">🔄 Spaced Review</span>
            <strong className="text-lg font-black text-blue-900">{reviewDueItems.length} items</strong>
          </div>

          <div className="bg-red-50 p-2.5 rounded-xl border border-red-200">
            <span className="text-red-800 font-bold block">⚠️ Needs Practice</span>
            <strong className="text-lg font-black text-red-900">{difficultItems.length} items</strong>
          </div>

          <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-200">
            <span className="text-purple-800 font-bold block">📐 Grammar Topics</span>
            <strong className="text-lg font-black text-purple-900">30 Blueprint Units</strong>
          </div>
        </div>
      </div>

      {/* 30-DAY ROADMAP & CALENDAR GRID */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              30-Day Challenge Roadmap ({challenge.level})
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Click on any day to start or recap that day&apos;s grammar, vocabulary &amp; drills
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#58cc02]"></span> Done</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#1cb0f6]"></span> Current</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Locked</span>
          </div>
        </div>

        {/* 30-Day Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 gap-2.5">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((dayNum) => {
            const dayData = challenge.days[dayNum];
            const isCompleted = dayData?.status === "completed";
            const isCurrent = dayNum === currentDayNum && !isCompleted;
            const isLocked = !isCompleted && !isCurrent && dayData?.status === "locked";
            const dayGrammar = getGrammarTopicForDay(challenge.level, dayNum);

            let tileStyle = "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed";
            if (isCompleted) {
              tileStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 hover:border-emerald-400 cursor-pointer shadow-2xs";
            } else if (isCurrent) {
              tileStyle = "bg-[#ddf4ff] border-[#1cb0f6] text-[#1cb0f6] ring-4 ring-[#ddf4ff] cursor-pointer shadow-sm";
            } else if (!isLocked) {
              tileStyle = "bg-white border-slate-300 text-slate-700 hover:border-slate-400 cursor-pointer";
            }

            return (
              <button
                key={dayNum}
                onClick={() => {
                  if (!isLocked) {
                    onStartDayPractice(dayNum);
                  }
                }}
                disabled={isLocked}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between min-h-[105px] relative ${tileStyle}`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[11px] font-black uppercase">Day {dayNum}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  {isLocked && <Lock className="w-3 h-3 text-slate-400 shrink-0" />}
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-[#1cb0f6] animate-ping shrink-0" />}
                </div>

                <div className="my-1">
                  {dayGrammar ? (
                    <p className="text-[11px] font-black text-slate-800 line-clamp-2 leading-tight">
                      {dayGrammar.title}
                    </p>
                  ) : (
                    <span className="text-lg font-black">{dayNum}</span>
                  )}
                </div>

                <div className="text-[10px] font-bold flex items-center justify-between w-full pt-1 border-t border-slate-200/50">
                  {isCompleted ? (
                    <span className="text-emerald-700">{dayData?.accuracy || 100}% Acc</span>
                  ) : isCurrent ? (
                    <span className="text-[#1cb0f6] font-black">Today&apos;s Task</span>
                  ) : (
                    <span className="text-slate-500">{dayData?.newVocabIds?.length || 5}+ words</span>
                  )}
                  {dayGrammar && (
                    <span className="text-[9px] px-1 bg-purple-100 text-purple-700 rounded font-bold">
                      Grammar
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CHALLENGE SETTINGS & RESET ACTIONS */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <RotateCw className="w-4 h-4 text-slate-400" />
          <span>Need to switch level or restart? You can manage your challenge anytime.</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onOpenSetup}
            className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
          >
            Switch Level
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset this 30-Day Challenge? Your progress for this challenge will restart.")) {
                onResetChallenge();
              }
            }}
            className="px-3 py-2 bg-white hover:bg-red-50 border border-red-200 text-red-600 font-bold rounded-xl transition-colors cursor-pointer"
          >
            Reset Challenge
          </button>
        </div>
      </div>

      {/* 30-DAY GRAMMAR SYLLABUS MODAL */}
      {showGrammarSyllabusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-purple-700">
                <Layers className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900">
                  {challenge.level} Complete 30-Day Grammar Syllabus
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowGrammarSyllabusModal(false);
                  setSelectedGrammarTopic(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedGrammarTopic ? (
              /* Topic Detail View */
              <div className="overflow-y-auto flex-1 space-y-4 pr-1 text-xs">
                <button
                  onClick={() => setSelectedGrammarTopic(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  ← Back to Syllabus List
                </button>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
                  <span className="text-[11px] font-black uppercase text-purple-700 block">
                    Day {selectedGrammarTopic.dayNumber} • {challenge.level} Level
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-1">{selectedGrammarTopic.title}</h4>
                  <p className="text-xs font-bold text-purple-800">{selectedGrammarTopic.englishTitle}</p>
                  <p className="text-xs text-slate-600 mt-2">{selectedGrammarTopic.summary}</p>
                </div>

                {/* Rules */}
                <div className="space-y-2">
                  <strong className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                    Grammar Rules
                  </strong>
                  {selectedGrammarTopic.rules.map((r, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="font-black text-slate-900 block">{r.rule}</strong>
                      <p className="text-slate-600 mt-0.5">{r.explanation}</p>
                      {r.formula && (
                        <span className="inline-block mt-1 font-mono text-[11px] text-purple-800 bg-purple-100 px-2 py-0.5 rounded font-bold">
                          {r.formula}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Examples */}
                <div className="space-y-2">
                  <strong className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                    Example Sentences
                  </strong>
                  {selectedGrammarTopic.examples.map((ex, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-2">
                      <div>
                        <p className="font-black text-slate-900">&ldquo;{ex.german}&rdquo;</p>
                        <p className="text-slate-500 mt-0.5">&ldquo;{ex.english}&rdquo;</p>
                        {ex.note && <span className="text-[10px] text-purple-600 font-bold mt-1 block">💡 {ex.note}</span>}
                      </div>
                      <button
                        onClick={() => playAudio(ex.german)}
                        className="p-1.5 bg-[#ddf4ff] hover:bg-[#1cb0f6] text-[#1cb0f6] hover:text-white rounded-lg transition-colors shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Topic Index List */
              <div className="overflow-y-auto flex-1 space-y-2 pr-1">
                {allLevelGrammarTopics.map((topic) => {
                  const dayData = challenge.days[topic.dayNumber];
                  const isDayDone = dayData?.status === "completed";
                  return (
                    <div
                      key={topic.id}
                      onClick={() => setSelectedGrammarTopic(topic)}
                      className="p-3.5 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-200 transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center shrink-0">
                          {topic.dayNumber}
                        </span>
                        <div>
                          <h4 className="text-xs font-black text-slate-900 group-hover:text-purple-900">
                            {topic.title}
                          </h4>
                          <p className="text-[11px] text-slate-500">{topic.englishTitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isDayDone && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-md">
                            Mastered
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => {
                setShowGrammarSyllabusModal(false);
                setSelectedGrammarTopic(null);
                onStartDayPractice(currentDayNum);
              }}
              className="w-full py-3.5 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Practice Today&apos;s Lesson (Day {currentDayNum})</span>
            </button>
          </div>
        </div>
      )}

      {/* DIFFICULT WORDS DRILL MODAL */}
      {showDifficultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900">
                  Difficult Items to Master ({difficultItems.length})
                </h3>
              </div>
              <button
                onClick={() => setShowDifficultModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-2.5 pr-1">
              {difficultItems.map((item) => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-red-50/50 border border-red-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{item.german}</h4>
                    <p className="text-xs text-slate-600">{item.english}</p>
                    {item.examples && item.examples[0] && (
                      <p className="text-[11px] text-slate-500 italic mt-1">&ldquo;{item.examples[0].de}&rdquo;</p>
                    )}
                  </div>
                  <button
                    onClick={() => playAudio(item.german)}
                    className="w-8 h-8 rounded-xl bg-white hover:bg-red-100 text-red-600 border border-red-200 flex items-center justify-center transition-colors shadow-2xs shrink-0"
                    title="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setShowDifficultModal(false);
                onStartDayPractice(currentDayNum);
              }}
              className="w-full py-3 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Practice Now</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
