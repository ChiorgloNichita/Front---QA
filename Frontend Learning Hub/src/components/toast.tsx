"use client";

import { useState, useCallback, createContext, useContext, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  };

  const colors = {
    success: "border-green-500/30 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100",
    error: "border-destructive/30 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100",
    info: "border-primary/30 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = icons[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg min-w-[280px] max-w-[400px]",
                  colors[t.type],
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <p className="text-sm flex-1">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="shrink-0 rounded-md p-0.5 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
