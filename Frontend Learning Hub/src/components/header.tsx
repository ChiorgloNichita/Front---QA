"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { BookOpen, Menu, X, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Главная", exact: true },
  { href: "/topics", label: "Темы", exact: false },
  { href: "/search", label: "Поиск", exact: true },
  { href: "/about", label: "О проекте", exact: true },
  { href: "/contact", label: "Контакты", exact: true },
  { href: "/profile", label: "Профиль", exact: true },
  { href: "/register", label: "Регистрация", exact: true },
  { href: "/login", label: "Вход", exact: true },
];

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-400 text-white">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Frontend Learning Hub</span>
          <span className="sm:hidden bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">FLH</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              asChild
              className={cn(
                "text-sm",
                isActive(pathname, link.href, link.exact) &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t md:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="container mx-auto flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                asChild
                className={cn(
                  "w-full justify-start",
                  isActive(pathname, link.href, link.exact) &&
                    "bg-accent text-accent-foreground"
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
