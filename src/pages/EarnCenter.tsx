import React, { useState, useEffect, useRef } from "react";
import { AlertTriangle, Timer, Play } from "lucide-react";
import { AdContainer } from "../components/AdContainer";

export function EarnCenter() {
  const [credits, setCredits] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [isTaskActive, setIsTaskActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPaused, setIsPaused] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const DAILY_LIMIT = 20;
  const CREDITS_PER_TASK = 100;
  const DAILY_GOAL = DAILY_LIMIT * CREDITS_PER_TASK;

  useEffect(() => {
    const storedCredits = localStorage.getItem("omnivault_credits");
    const storedTasks = localStorage.getItem("omnivault_tasks_completed");
    const storedDate = localStorage.getItem("omnivault_tasks_date");
    
    const today = new Date().toDateString();
    
    if (storedCredits) setCredits(parseInt(storedCredits, 10));
    
    if (storedDate === today && storedTasks) {
      setTasksCompleted(parseInt(storedTasks, 10));
    } else {
      localStorage.setItem("omnivault_tasks_date", today);
      localStorage.setItem("omnivault_tasks_completed", "0");
      setTasksCompleted(0);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isTaskActive && timeLeft > 0) {
        setIsPaused(true);
        setAlertMsg("Attention: You must remain on this page to earn credits.");
      } else if (!document.hidden && isTaskActive && timeLeft > 0) {
        setIsPaused(false);
        setAlertMsg("");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isTaskActive, timeLeft]);

  useEffect(() => {
    if (isTaskActive && !isPaused && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTaskActive) {
      setIsTaskActive(false);
      
      const newCredits = credits + CREDITS_PER_TASK;
      const newTasks = tasksCompleted + 1;
      
      setCredits(newCredits);
      setTasksCompleted(newTasks);
      
      localStorage.setItem("omnivault_credits", newCredits.toString());
      localStorage.setItem("omnivault_tasks_completed", newTasks.toString());
      
      setAlertMsg(`Success! ${CREDITS_PER_TASK} credits have been deposited to your ledger.`);
      setTimeout(() => setAlertMsg(""), 5000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTaskActive, isPaused, timeLeft, credits, tasksCompleted]);

  const startTask = () => {
    if (tasksCompleted >= DAILY_LIMIT) {
      setAlertMsg("Daily limit reached. The ledger is closed for today.");
      return;
    }
    setIsTaskActive(true);
    setTimeLeft(60);
    setIsPaused(false);
    setAlertMsg("");
  };

  const progressPercentage = Math.min((credits / DAILY_GOAL) * 100, 100);

  return (
    <div className="space-y-8">
      <div className="border-b-4 border-ink pb-6 mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter mb-2">Daily Rewards</h1>
          <p className="font-serif italic text-xl">The Daily Exchange & Rewards</p>
        </div>
        <div className="border-newspaper p-4 bg-white text-center min-w-[200px]">
          <div className="text-xs uppercase tracking-widest font-bold mb-1">Personal Ledger</div>
          <div className="text-4xl font-serif font-black">{credits} <span className="text-lg">CR</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="border-newspaper p-8 bg-white/50">
            <h2 className="text-3xl font-serif font-bold mb-6 uppercase tracking-widest text-center border-b border-ink pb-4">Today's Opportunity</h2>

            {isTaskActive ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-8">
                <div className="text-8xl font-serif font-black tracking-tighter">
                  {timeLeft}<span className="text-4xl">s</span>
                </div>
                
                {isPaused ? (
                  <div className="border-2 border-ink p-4 bg-ink/5 text-ink font-serif font-bold flex items-center gap-3">
                    <AlertTriangle size={24} />
                    {alertMsg}
                  </div>
                ) : (
                  <div className="font-serif italic text-xl flex items-center gap-2 animate-pulse">
                    <Timer size={24} />
                    Viewing advertisement...
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
                <div className="max-w-md mx-auto font-serif text-lg leading-relaxed mb-4">
                  WANTED: Attentive individuals to view promotional materials. Compensation provided immediately upon completion of the 60-second viewing period.
                </div>
                <button
                  onClick={startTask}
                  disabled={tasksCompleted >= DAILY_LIMIT}
                  className="ink-press border-newspaper-thick px-12 py-4 text-xl font-serif font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  <Play size={24} />
                  Watch Daily Briefing
                </button>
                {alertMsg && (
                  <div className="font-serif font-bold italic text-lg mt-4 border-y border-ink py-2">
                    {alertMsg}
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-12 border-t-4 border-ink pt-8">
              <h4 className="text-center font-serif font-bold uppercase tracking-widest mb-4">Sponsored Content</h4>
              <AdContainer className="h-64 w-full bg-white" isRewarded={true} />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border-newspaper p-6 bg-white/50">
            <h3 className="font-serif font-bold uppercase tracking-widest mb-4 border-b border-ink pb-2">Market Performance (Daily Goal)</h3>
            <div className="flex justify-between text-sm font-serif font-bold mb-2">
              <span>0 CR</span>
              <span>{DAILY_GOAL} CR</span>
            </div>
            <div className="h-12 border-newspaper bg-white relative overflow-hidden flex items-end p-1 gap-1">
              {Array.from({ length: 20 }).map((_, i) => {
                const threshold = (i + 1) * (100 / 20);
                const isFilled = progressPercentage >= threshold;
                const height = 20 + Math.random() * 60 + (isFilled ? 20 : 0);
                return (
                  <div 
                    key={i} 
                    className={`flex-1 transition-all duration-500 ${isFilled ? 'bg-ink' : 'bg-ink/10'}`}
                    style={{ height: `${Math.min(height, 100)}%` }}
                  />
                );
              })}
              <div className="absolute inset-0 flex items-center justify-center mix-blend-difference text-white font-serif font-black text-xl">
                {Math.round(progressPercentage)}%
              </div>
            </div>
            <div className="text-center mt-2 font-serif text-sm italic">
              {tasksCompleted} of {DAILY_LIMIT} daily tasks completed
            </div>
          </div>

          <div className="border-newspaper p-6 bg-ink text-parchment">
            <h3 className="text-xl font-serif font-bold uppercase tracking-widest mb-6 text-center border-b border-parchment/30 pb-4">Rules of Engagement</h3>
            <ol className="space-y-6 font-serif list-decimal list-inside">
              <li className="pl-2">
                <strong className="block text-lg mb-1">Remain Present</strong>
                <span className="opacity-80 text-sm">The viewing tab must remain active. Switching tabs will halt the timer immediately.</span>
              </li>
              <li className="pl-2">
                <strong className="block text-lg mb-1">Maintain Focus</strong>
                <span className="opacity-80 text-sm">If the window loses focus, the countdown pauses until your attention returns.</span>
              </li>
              <li className="pl-2">
                <strong className="block text-lg mb-1">Prompt Payment</strong>
                <span className="opacity-80 text-sm">Upon reaching 0 seconds, 100 credits are instantly deposited to your local ledger.</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
