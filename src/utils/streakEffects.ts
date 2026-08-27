/**
 * Streak milestone calculation, sound synthesis, and particle effects
 */

export const STREAK_MILESTONES = [3, 5, 7, 10, 14, 21, 30, 50, 75, 100, 200, 365] as const;

export interface StreakMilestoneInfo {
  milestone: number;
  title: string;
  badgeEmoji: string;
  description: string;
}

export const MILESTONE_DETAILS: Record<number, StreakMilestoneInfo> = {
  3: { milestone: 3, title: "Spark Starter", badgeEmoji: "🥉", description: "3-day streak! Your German habit is ignited." },
  5: { milestone: 5, title: "High Five", badgeEmoji: "✋", description: "5 days strong! Consistency is building fast." },
  7: { milestone: 7, title: "Week Warrior", badgeEmoji: "🥈", description: "Full 7-day week mastered! Outstanding dedication." },
  10: { milestone: 10, title: "Double Digits", badgeEmoji: "🔟", description: "10-day streak! You are unstoppable." },
  14: { milestone: 14, title: "Fortnight Master", badgeEmoji: "🥇", description: "2 whole weeks of daily practice!" },
  21: { milestone: 21, title: "Habit Forged", badgeEmoji: "🧠", description: "21 days! Psychology proves it: German is now a habit." },
  30: { milestone: 30, title: "Monthly Champion", badgeEmoji: "👑", description: "30-day streak! A full month of German mastery." },
  50: { milestone: 50, title: "Half Century", badgeEmoji: "🛡️", description: "50 days! Extraordinary stamina and progress." },
  75: { milestone: 75, title: "Diamond Focus", badgeEmoji: "💎", description: "75 days! Fluent instincts are taking over." },
  100: { milestone: 100, title: "Century Legend", badgeEmoji: "🌟", description: "100 days of Deutsch! Absolute mastery legend." },
  200: { milestone: 200, title: "Grandmaster", badgeEmoji: "🔮", description: "200 consecutive days of immersion!" },
  365: { milestone: 365, title: "Year Titan", badgeEmoji: "🏆", description: "365 days! A full year of German devotion." }
};

export function isStreakMilestone(days: number): boolean {
  return STREAK_MILESTONES.includes(days as any);
}

export function getNextMilestone(currentDays: number): number {
  for (const m of STREAK_MILESTONES) {
    if (m > currentDays) return m;
  }
  return currentDays + 100;
}

/**
 * Play a synthesized celebration fanfare using the native Web Audio API
 */
export function playStreakCelebrationChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    // Melodic fanfare notes (frequencies in Hz: C5, E5, G5, C6, G5, C6)
    const notes = [
      { freq: 523.25, time: 0, duration: 0.12 },
      { freq: 659.25, time: 0.1, duration: 0.12 },
      { freq: 783.99, time: 0.2, duration: 0.14 },
      { freq: 1046.5, time: 0.32, duration: 0.28 },
      { freq: 1318.5, time: 0.46, duration: 0.38 }
    ];

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
    masterGain.connect(ctx.destination);

    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);

      noteGain.gain.setValueAtTime(0.001, ctx.currentTime + note.time);
      noteGain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + note.time + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.time + note.duration);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(ctx.currentTime + note.time);
      osc.stop(ctx.currentTime + note.time + note.duration);
    });
  } catch (err) {
    // Audio context may be restricted before user interaction
    console.debug("Web audio playback bypassed:", err);
  }
}
