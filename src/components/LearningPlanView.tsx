import React, { useState, useEffect } from "react";
import { 
  GraduationCap, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Volume2, 
  ArrowRight, 
  Trophy, 
  Clock, 
  Award, 
  HelpCircle, 
  MessageSquare, 
  Check, 
  Flame,
  Zap,
  Target,
  Mic
} from "lucide-react";
import { LEARNING_PLANS, LevelPlan, LearningUnit } from "../data/learning_plans";
import { LessonContext } from "../types";
import { speakGerman } from "../utils/speechService";

interface LearningPlanViewProps {
  selectedLevel: string | null;
  setSelectedLevel: (level: string | null) => void;
  onNavigateToPractice: (theme?: string, level?: string) => void;
  onNavigateToPhrases: (theme?: string, level?: string) => void;
  onNavigateToQuiz: (level?: string) => void;
  onNavigateToVoiceCoach?: (context: LessonContext) => void;
}

export const LearningPlanView: React.FC<LearningPlanViewProps> = ({
  selectedLevel,
  setSelectedLevel,
  onNavigateToPractice,
  onNavigateToPhrases,
  onNavigateToQuiz,
  onNavigateToVoiceCoach,
}) => {
  // Current active level tab in the learning plan (A1, A2, B1, or B2)
  const [activePlanLevel, setActivePlanLevel] = useState<"A1" | "A2" | "B1" | "B2">(
    selectedLevel === "A2" ? "A2" : selectedLevel === "B1" ? "B1" : selectedLevel === "B2" ? "B2" : "A1"
  );

  // Expanded units map (unitId -> boolean)
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    "a1-u1": true,
    "a2-u1": true,
    "b1-u1": true,
    "b2-u1": true,
  });

  // Completed action items state persisted in localStorage
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("german_plan_checklist");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync selectedLevel if user changes dropdown elsewhere
  useEffect(() => {
    if (selectedLevel && (selectedLevel === "A1" || selectedLevel === "A2" || selectedLevel === "B1" || selectedLevel === "B2")) {
      setActivePlanLevel(selectedLevel as "A1" | "A2" | "B1" | "B2");
    }
  }, [selectedLevel]);

  // Persist completed items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("german_plan_checklist", JSON.stringify(completedItems));
    } catch (e) {}
  }, [completedItems]);

  const currentPlan: LevelPlan = LEARNING_PLANS[activePlanLevel];

  // Toggle unit expansion
  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  // Toggle item completion
  const toggleItemCompletion = (itemKey: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  // Text to speech playback helper with natural pitch and neural voices
  const playGermanAudio = (text: string) => {
    speakGerman(text);
  };

  // Calculate completion percentage for current level
  const totalLevelItems = currentPlan.units.reduce((acc, unit) => acc + unit.actionItems.length, 0);
  const completedLevelItems = currentPlan.units.reduce((acc, unit) => {
    const unitCompleted = unit.actionItems.filter((_, idx) => completedItems[`${unit.id}-${idx}`]).length;
    return acc + unitCompleted;
  }, 0);
  const progressPercent = totalLevelItems > 0 ? Math.round((completedLevelItems / totalLevelItems) * 100) : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Banner: Interactive Level Tabs Header */}
      <div className="bg-white border-2 border-slate-200 border-b-4 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700 shadow-xs border border-emerald-200">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Structured Learning Plans
                <span className="text-xs bg-[#ffc800] text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  A1 - B2
                </span>
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-medium">
                Step-by-step roadmap to master German grammar, themes, vocabulary, and phrases for every CEFR level.
              </p>
            </div>
          </div>

          {/* Level Switcher Selector Pills */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-200 gap-1 self-start md:self-center overflow-x-auto max-w-full">
            {(["A1", "A2", "B1", "B2"] as const).map((lvl) => {
              const plan = LEARNING_PLANS[lvl];
              const isActive = activePlanLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => {
                    setActivePlanLevel(lvl);
                    setSelectedLevel(lvl);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? `${plan.colorTheme.activeTabBg} border-b-2 font-black shadow-xs translate-y-[-1px]`
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  <span>{lvl}</span>
                  <span className="text-[10px] opacity-80 font-bold hidden sm:inline">
                    {lvl === "A1" ? "Beginner" : lvl === "A2" ? "Elementary" : lvl === "B1" ? "Intermediate" : "Upper-Int"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Level Overview Card */}
        <div className={`p-5 rounded-2xl border-2 ${currentPlan.colorTheme.border} bg-gradient-to-r ${currentPlan.colorTheme.bgGradient} space-y-4`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-extrabold px-3 py-0.5 rounded-full border ${currentPlan.colorTheme.badgeBg}`}>
                  {currentPlan.badge}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Est. {currentPlan.estimatedHours}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">{currentPlan.title}</h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">{currentPlan.subtitle}</p>
            </div>

            {/* Progress Badge */}
            <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-xs flex items-center gap-3 shrink-0">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" className="text-slate-100" fill="transparent" />
                  <circle 
                    cx="24" 
                    cy="24" 
                    r="20" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    className={currentPlan.colorTheme.badgeText}
                    strokeDasharray={125.6}
                    strokeDashoffset={125.6 - (125.6 * progressPercent) / 100}
                    strokeLinecap="round"
                    fill="transparent" 
                  />
                </svg>
                <span className="absolute text-xs font-black text-slate-800">{progressPercent}%</span>
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Level Progress</span>
                <span className="text-xs font-black text-slate-800">
                  {completedLevelItems} of {totalLevelItems} Goals
                </span>
              </div>
            </div>
          </div>

          {/* CEFR Learning Outcomes */}
          <div className="bg-white/80 p-3.5 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
            <span className="font-extrabold text-slate-700 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <Target className="w-4 h-4 text-emerald-600" />
              Target Outcome ({currentPlan.cefrTitle}):
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              {currentPlan.targetOutcome}
            </p>
          </div>

          {/* Grammar Highlights Tags */}
          <div>
            <span className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              Key Grammar Milestones for {activePlanLevel}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentPlan.grammarHighlights.map((gh, idx) => (
                <span key={idx} className="bg-white/90 border border-slate-200 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-2xs flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-400" />
                  {gh}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Units List Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          {activePlanLevel} Learning Units ({currentPlan.units.length} Modules)
        </h3>
        <button
          onClick={() => {
            const allExpanded = currentPlan.units.every(u => expandedUnits[u.id]);
            const newMap: Record<string, boolean> = {};
            currentPlan.units.forEach(u => { newMap[u.id] = !allExpanded; });
            setExpandedUnits(newMap);
          }}
          className="text-xs font-black text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          {currentPlan.units.every(u => expandedUnits[u.id]) ? "Collapse All" : "Expand All"}
        </button>
      </div>

      {/* Modules / Units Accordion List */}
      <div className="space-y-4">
        {currentPlan.units.map((unit) => {
          const isExpanded = !!expandedUnits[unit.id];
          const unitCompletedCount = unit.actionItems.filter((_, idx) => completedItems[`${unit.id}-${idx}`]).length;
          const isUnitFullyDone = unitCompletedCount === unit.actionItems.length && unit.actionItems.length > 0;

          return (
            <div
              key={unit.id}
              className={`bg-white border-2 border-b-4 rounded-3xl transition-all shadow-xs overflow-hidden ${
                isUnitFullyDone 
                  ? "border-emerald-300 bg-emerald-50/20" 
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Unit Header Bar */}
              <div
                onClick={() => toggleUnit(unit.id)}
                className="p-4 md:p-5 flex items-center justify-between gap-3 cursor-pointer select-none hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-10 h-10 rounded-2xl font-black text-sm flex items-center justify-center shrink-0 border-2 shadow-xs ${
                    isUnitFullyDone
                      ? "bg-emerald-500 text-white border-emerald-600"
                      : `${currentPlan.colorTheme.badgeBg}`
                  }`}>
                    {isUnitFullyDone ? <Check className="w-5 h-5 stroke-[3]" /> : unit.unitNumber}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base leading-snug truncate">
                        {unit.title}
                      </h4>
                      {isUnitFullyDone && (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Completed 🎉
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                      {unit.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  {/* Quick direct Voice Coach button in unit header */}
                  {onNavigateToVoiceCoach && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToVoiceCoach({
                          unitId: unit.id,
                          unitTitle: unit.title,
                          level: activePlanLevel,
                          grammarFocus: unit.grammarFocus,
                          starterText: `Hallo! Ich lerne gerade das Modul "${unit.title}" (${activePlanLevel}). Lass uns eine Sprechübung machen!`,
                          keyPhrases: unit.keyPhrases
                        });
                      }}
                      className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                      title="Practice speaking this lesson with AI Voice Coach"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Voice Coach</span>
                    </button>
                  )}

                  {/* Progress fraction badge */}
                  <span className="text-xs font-black text-slate-400 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl hidden md:inline">
                    {unitCompletedCount}/{unit.actionItems.length} Done
                  </span>

                  <button 
                    type="button" 
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Unit Content Body */}
              {isExpanded && (
                <div className="p-4 md:p-6 border-t-2 border-slate-100 bg-slate-50/50 space-y-5">
                  
                  {/* Grammar Focus Callout */}
                  <div className="bg-amber-50/80 border-2 border-amber-200 p-3.5 rounded-2xl text-xs space-y-1">
                    <span className="font-extrabold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
                      Grammar Focus:
                    </span>
                    <p className="text-amber-800 font-semibold leading-relaxed">
                      {unit.grammarFocus}
                    </p>
                  </div>

                  {/* Checklist: Action Items & Goals */}
                  <div className="space-y-2">
                    <span className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                      Unit Learning Objectives &amp; Checklist:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {unit.actionItems.map((item, idx) => {
                        const itemKey = `${unit.id}-${idx}`;
                        const isDone = !!completedItems[itemKey];

                        return (
                          <div
                            key={idx}
                            onClick={() => toggleItemCompletion(itemKey)}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                              isDone
                                ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            <button
                              type="button"
                              className={`mt-0.5 rounded-lg transition-colors ${
                                isDone ? "text-emerald-600" : "text-slate-300"
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>
                            <span className={`text-xs font-bold leading-snug ${isDone ? "line-through opacity-80" : ""}`}>
                              {item}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Key Phrases Showcase with Audio */}
                  <div className="space-y-2">
                    <span className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                      Essential Unit Phrases:
                    </span>
                    <div className="space-y-2">
                      {unit.keyPhrases.map((kp, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                        >
                          <div>
                            <span className="block text-xs font-extrabold text-slate-900">
                              {kp.german}
                            </span>
                            <span className="block text-[11px] font-medium text-slate-500">
                              {kp.english}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => playGermanAudio(kp.german)}
                            className="p-2 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 text-slate-600 rounded-xl transition-all cursor-pointer shrink-0"
                            title="Listen to German pronunciation"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Practice Navigation CTA Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-2.5 border-t border-slate-200">
                    {onNavigateToVoiceCoach && (
                      <button
                        type="button"
                        onClick={() => onNavigateToVoiceCoach({
                          unitId: unit.id,
                          unitTitle: unit.title,
                          level: activePlanLevel,
                          grammarFocus: unit.grammarFocus,
                          starterText: `Hallo! Ich lerne gerade das Modul "${unit.title}" auf Niveau ${activePlanLevel}. Lass uns eine Sprechübung dazu machen!`,
                          keyPhrases: unit.keyPhrases
                        })}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl border-b-4 border-indigo-800 active:translate-y-[1px] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Mic className="w-4 h-4 text-amber-300 fill-amber-300" />
                        Practice Speaking with Voice Coach
                      </button>
                    )}

                    {unit.themes[0] && (
                      <button
                        type="button"
                        onClick={() => onNavigateToPractice(unit.themes[0], activePlanLevel)}
                        className="px-4 py-2.5 bg-[#58cc02] hover:bg-[#46a302] text-white text-xs font-black rounded-xl border-b-4 border-[#46a302] active:translate-y-[1px] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <BookOpen className="w-4 h-4" />
                        Practice Unit Vocabulary
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onNavigateToPhrases(unit.themes[0], activePlanLevel)}
                      className="px-4 py-2.5 bg-[#1cb0f6] hover:bg-[#1899d6] text-white text-xs font-black rounded-xl border-b-4 border-[#1899d6] active:translate-y-[1px] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Practice Unit Phrases
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigateToQuiz(activePlanLevel)}
                      className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-xl border-b-4 border-purple-800 active:translate-y-[1px] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Test {activePlanLevel} Knowledge
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Level Completion Certificate Trophy Box */}
      {progressPercent === 100 && (
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 border-4 border-amber-600 text-amber-950 p-6 rounded-3xl text-center space-y-3 shadow-lg animate-bounce duration-1000">
          <div className="inline-block p-4 bg-white rounded-full shadow-md text-4xl">
            🏆
          </div>
          <h3 className="text-2xl font-black tracking-tight">
            Congratulations! {activePlanLevel} Level Fully Mastered!
          </h3>
          <p className="text-sm font-extrabold max-w-lg mx-auto opacity-90">
            You have completed all learning objectives for {currentPlan.cefrTitle}. You are ready to advance to the next level!
          </p>
          {activePlanLevel !== "B2" && (
            <button
              onClick={() => {
                const nextLvl = activePlanLevel === "A1" ? "A2" : activePlanLevel === "A2" ? "B1" : "B2";
                setActivePlanLevel(nextLvl);
                setSelectedLevel(nextLvl);
              }}
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md hover:bg-slate-800 transition-all cursor-pointer"
            >
              Advance to Next Level ({activePlanLevel === "A1" ? "A2" : activePlanLevel === "A2" ? "B1" : "B2"}) <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

    </div>
  );
};
