import { useState, useEffect } from "react";
import { Flame, Sparkles, Trophy, Award, CheckCircle2, ChevronRight, X, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  STREAK_MILESTONES, 
  MILESTONE_DETAILS, 
  getNextMilestone, 
  playStreakCelebrationChime 
} from "../utils/streakEffects";

interface StreakHeaderCounterProps {
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  isMilestoneTriggered?: boolean;
  milestoneReason?: string | null;
  onClearMilestoneTrigger?: () => void;
  onManualTrigger?: () => void;
}

export function StreakHeaderCounter({
  streak,
  longestStreak,
  lastActiveDate,
  isMilestoneTriggered = false,
  milestoneReason = null,
  onClearMilestoneTrigger,
  onManualTrigger
}: StreakHeaderCounterProps) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLocalAnimating, setIsLocalAnimating] = useState(false);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  // Trigger animation whenever isMilestoneTriggered becomes true
  useEffect(() => {
    if (isMilestoneTriggered) {
      setIsLocalAnimating(true);
      setBannerMessage(milestoneReason || (streak > 1 ? `🎉 ${streak} DAYS STREAK!` : "🔥 STREAK STARTED!"));
      playStreakCelebrationChime();

      const timer = setTimeout(() => {
        setIsLocalAnimating(false);
        setBannerMessage(null);
        if (onClearMilestoneTrigger) {
          onClearMilestoneTrigger();
        }
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [isMilestoneTriggered, milestoneReason, streak, onClearMilestoneTrigger]);

  const handleManualTestCelebration = () => {
    setIsLocalAnimating(true);
    setBannerMessage(
      streak >= longestStreak && streak > 0
        ? `🔥 NEW RECORD: ${streak} DAYS!`
        : `🎉 MILESTONE CELEBRATION: ${streak} DAYS!`
    );
    playStreakCelebrationChime();

    if (onManualTrigger) {
      onManualTrigger();
    }

    setTimeout(() => {
      setIsLocalAnimating(false);
      setBannerMessage(null);
    }, 4500);
  };

  const nextMilestone = getNextMilestone(streak);
  const daysToNextMilestone = Math.max(1, nextMilestone - streak);
  const milestoneProgress = Math.min(100, Math.round((streak / nextMilestone) * 100));

  // Determine last 7 days of the current week for streak calendar dots
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // 0 = Mon, 6 = Sun
  const todayStr = today.toLocaleDateString("en-CA");
  const isPracticedToday = lastActiveDate === todayStr;

  return (
    <div className="relative inline-block">
      {/* Floating Animated Milestone / Record Popover Pill */}
      <AnimatePresence>
        {isLocalAnimating && bannerMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: -36, 
              scale: [0.8, 1.1, 1],
              transition: { duration: 0.4, ease: "backOut" } 
            }}
            exit={{ opacity: 0, y: -45, scale: 0.8, transition: { duration: 0.3 } }}
            className="absolute left-1/2 -translate-x-1/2 top-0 z-50 pointer-events-none whitespace-nowrap"
          >
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5 animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
              <span>{bannerMessage}</span>
              <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Particle Sparks on Animation */}
      <AnimatePresence>
        {isLocalAnimating && (
          <div className="absolute inset-0 pointer-events-none overflow-visible z-40">
            {/* Ember 1 */}
            <motion.div
              initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.5, x: -24, y: -30 }}
              transition={{ duration: 1.2, repeat: 2, repeatType: "reverse" }}
              className="absolute top-1 left-2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]"
            />
            {/* Ember 2 */}
            <motion.div
              initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.8, x: 28, y: -35 }}
              transition={{ duration: 1.4, repeat: 2, repeatType: "reverse", delay: 0.1 }}
              className="absolute top-1 right-2 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_#ea580c]"
            />
            {/* Ember 3 */}
            <motion.div
              initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.2, x: -12, y: -45 }}
              transition={{ duration: 1.1, repeat: 2, repeatType: "reverse", delay: 0.2 }}
              className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_#ef4444]"
            />
            {/* Ember 4 */}
            <motion.div
              initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.6, x: 18, y: -20 }}
              transition={{ duration: 1.3, repeat: 2, repeatType: "reverse", delay: 0.15 }}
              className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_8px_#fde047]"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Main Header Streak Counter Widget Button */}
      <motion.button
        type="button"
        id="header-streak-widget"
        onClick={() => setShowDetailsModal(true)}
        title="Click to view Streak records, daily history & milestones"
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.96 }}
        animate={
          isLocalAnimating
            ? {
                scale: [1, 1.22, 0.95, 1.12, 1],
                rotate: [0, -8, 8, -4, 4, 0],
                boxShadow: [
                  "0 0 0px rgba(255, 150, 0, 0)",
                  "0 0 20px rgba(255, 150, 0, 0.9), 0 0 40px rgba(239, 68, 68, 0.6)",
                  "0 0 10px rgba(255, 150, 0, 0.5)",
                  "0 0 0px rgba(255, 150, 0, 0)"
                ]
              }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 1.6, ease: "easeInOut" }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl shadow-xs border-2 border-b-4 transition-all duration-300 cursor-pointer select-none relative overflow-hidden ${
          isLocalAnimating
            ? "bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 border-orange-400 border-b-orange-600 ring-2 ring-orange-400/50"
            : streak > 0 
              ? "bg-orange-50/90 hover:bg-orange-100/90 border-orange-200 hover:border-orange-300 border-b-orange-300 active:border-b-2 active:translate-y-[2px]" 
              : "bg-slate-50 hover:bg-slate-100 border-slate-200 border-b-slate-300 active:border-b-2 active:translate-y-[2px]"
        }`}
      >
        {/* Animated Flame Icon */}
        <motion.div
          animate={
            isLocalAnimating
              ? {
                  scale: [1, 1.4, 0.9, 1.3, 1],
                  rotate: [0, -15, 15, -10, 10, 0],
                }
              : streak > 0
                ? { scale: [1, 1.12, 1], rotate: [0, -3, 3, 0] }
                : { scale: 1, rotate: 0 }
          }
          transition={
            isLocalAnimating
              ? { duration: 1.2, repeat: 2 }
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative shrink-0 flex items-center justify-center"
        >
          <Flame
            className={`w-5 h-5 transition-colors duration-300 ${
              isLocalAnimating
                ? "text-red-500 fill-orange-500 drop-shadow-[0_2px_8px_rgba(239,68,68,0.7)]"
                : streak > 0 
                  ? "text-[#ff9600] fill-[#ff9600] drop-shadow-[0_2px_4px_rgba(255,150,0,0.4)]" 
                  : "text-slate-400 fill-slate-300"
            }`}
          />
          {streak > 0 && (
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-1 -right-1 text-[9px]"
            >
              ✨
            </motion.span>
          )}
        </motion.div>

        {/* Text Details */}
        <div className="text-left">
          <span className={`block text-xs font-black leading-none ${
            isLocalAnimating 
              ? "text-orange-700 font-black" 
              : streak > 0 
                ? "text-[#ff9600]" 
                : "text-slate-500"
          }`}>
            {streak} {streak === 1 ? "DAY" : "DAYS"}
          </span>
          <div className="flex items-center gap-1">
            <span className={`text-[8px] font-extrabold uppercase tracking-wider ${
              isLocalAnimating 
                ? "text-orange-600 font-black" 
                : streak > 0 
                  ? "text-orange-400" 
                  : "text-slate-400"
            }`}>
              STREAK
            </span>
            {streak >= longestStreak && streak > 0 && (
              <span className="text-[8px] font-black text-amber-600 bg-amber-100 px-1 py-0.2 rounded-sm" title="All-time record!">
                🏆 BEST
              </span>
            )}
          </div>
        </div>
      </motion.button>

      {/* Streak Dashboard Details & Milestone Modal */}
      <AnimatePresence>
        {showDetailsModal && (
          <div 
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-2 border-orange-200 relative overflow-hidden space-y-5"
            >
              {/* Header Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" />
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header with Flame */}
              <div className="text-center pt-2">
                <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-amber-100 via-orange-100 to-red-100 rounded-3xl border-2 border-orange-300 flex items-center justify-center shadow-inner mb-3">
                  <Flame className="w-10 h-10 text-orange-500 fill-orange-500 drop-shadow-[0_4px_6px_rgba(234,88,12,0.4)] animate-pulse" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {streak} {streak === 1 ? "Day" : "Days"} Daily Streak
                </h3>
                <p className="text-xs font-bold text-slate-500 mt-0.5">
                  {isPracticedToday 
                    ? "🔥 You have practiced today! Your streak is safely extended." 
                    : "⏳ Practice any word or quiz today to keep your streak burning!"}
                </p>
              </div>

              {/* Stats Grid: Current vs All-time Record */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-orange-50/80 border border-orange-200 rounded-2xl p-3.5 text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block">Current Streak</span>
                  <div className="text-2xl font-black text-orange-600 mt-0.5 flex items-center justify-center gap-1">
                    <Flame className="w-5 h-5 fill-orange-500" />
                    <span>{streak} {streak === 1 ? "day" : "days"}</span>
                  </div>
                </div>

                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block">Longest Record</span>
                  <div className="text-2xl font-black text-amber-700 mt-0.5 flex items-center justify-center gap-1">
                    <Trophy className="w-5 h-5 fill-amber-500 text-amber-600" />
                    <span>{Math.max(streak, longestStreak)} {Math.max(streak, longestStreak) === 1 ? "day" : "days"}</span>
                  </div>
                </div>
              </div>

              {/* 7-Day Activity Weekly Strip */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Weekly Activity</span>
                  <span className="text-[10px] font-bold text-slate-500">
                    {isPracticedToday ? "✓ Active Today" : "Today: Pending"}
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 pt-1">
                  {weekDays.map((day, idx) => {
                    const isTodayDay = idx === currentDayIndex;
                    const isCompleted = isTodayDay ? isPracticedToday : (idx < currentDayIndex && streak > (currentDayIndex - idx));
                    
                    return (
                      <div key={day} className="flex flex-col items-center gap-1">
                        <span className={`text-[9px] font-bold ${isTodayDay ? "text-orange-600 font-black" : "text-slate-400"}`}>
                          {day}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${
                            isCompleted
                              ? "bg-orange-500 text-white border-orange-600 shadow-xs"
                              : isTodayDay
                                ? "bg-white border-2 border-orange-400 text-orange-500 animate-pulse"
                                : "bg-slate-100 text-slate-300 border-slate-200"
                          }`}
                        >
                          {isCompleted ? (
                            <Flame className="w-4 h-4 fill-white" />
                          ) : (
                            <span className="text-[10px] font-bold">•</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Milestone Roadmap Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{MILESTONE_DETAILS[nextMilestone]?.badgeEmoji || "🎯"}</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">
                        Next Milestone: {nextMilestone} Days
                      </h4>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {daysToNextMilestone === 1 ? "1 day to go!" : `${daysToNextMilestone} days to go`}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-orange-600">{milestoneProgress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-orange-200/60 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${milestoneProgress}%` }}
                  />
                </div>

                {MILESTONE_DETAILS[nextMilestone] && (
                  <p className="text-[11px] text-slate-600 italic">
                    "{MILESTONE_DETAILS[nextMilestone].description}"
                  </p>
                )}
              </div>

              {/* Milestones Showcase Badges */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Streak Milestones</span>
                <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto pr-1">
                  {STREAK_MILESTONES.slice(0, 8).map(m => {
                    const info = MILESTONE_DETAILS[m];
                    const isAchieved = streak >= m;
                    return (
                      <div
                        key={m}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          isAchieved
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
                        }`}
                      >
                        <span className="text-base block">{info?.badgeEmoji || "🏅"}</span>
                        <span className="text-[10px] font-black block mt-0.5">{m} Days</span>
                        <span className="text-[8px] font-semibold block leading-tight truncate">
                          {isAchieved ? "Unlocked" : "Locked"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Test / Replay Celebration Button & Close Button */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleManualTestCelebration}
                  className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 active:translate-y-0.5 border-b-4 border-red-700 text-white font-black py-3 rounded-2xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Test Milestone Animation 🔥</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 bg-slate-100 hover:bg-slate-200 active:translate-y-0.5 border-b-4 border-slate-300 text-slate-700 font-black py-3 rounded-2xl transition-all text-xs uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
