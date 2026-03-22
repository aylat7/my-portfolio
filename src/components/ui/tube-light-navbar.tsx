"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const isClickScrolling = useRef(false);

  // Track which section is in view
  useEffect(() => {
    const sectionIds = items.map(item => item.url.replace('#', ''));
    const sectionMap = new Map(items.map(item => [item.url.replace('#', ''), item.name]));

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const name = sectionMap.get(entry.target.id);
            if (name) setActiveTab(name);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (item: NavItem) => {
    setActiveTab(item.name);
    isClickScrolling.current = true;
    const el = document.querySelector(item.url);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    // Re-enable observer after scroll finishes
    setTimeout(() => { isClickScrolling.current = false; }, 1000);
  };

  return (
    <div className={cn(
      "fixed bottom-6 sm:top-0 left-1/2 -translate-x-1/2 z-[200] sm:pt-6 pointer-events-none",
      className
    )}>
      <div className="flex items-center gap-3 bg-forest-900/80 border border-forest-600/50 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg pointer-events-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => handleClick(item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-cream-muted hover:text-forest-300",
                isActive && "bg-forest-700 text-forest-300"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-forest-300/5 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-forest-300 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-forest-300/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-forest-300/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-forest-300/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
