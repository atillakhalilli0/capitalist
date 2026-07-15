"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { useCategories } from "@/hooks/useCategories";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { data: categoriesData } = useCategories();

  const navCategories = (categoriesData ?? [])
    .filter((category) => !category.parentCategoryId)
    .map((category) => ({ name: category.name, href: `/${category.slug}` }));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md transition-colors duration-300">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-black tracking-tighter text-foreground hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            aria-label="Kapitalist Ana Səhifə"
          >
            <span className="text-accent">KAPİTALİST</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navCategories.map((category) => {
              const isActive = pathname === category.href;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`relative text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none py-2 ${
                    isActive ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {category.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-accent" />
                  )}
                </Link>
              );
            }).slice(5)}
          </nav>

          {/* Action Bar */}
          <div className="flex items-center gap-2">
            <Link
              href="/axtaris"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors duration-200"
              aria-label="Axtarış səhifəsi"
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>

            <ThemeToggle />

            <Link
              href="/#abune"
              className="hidden md:inline-flex items-center justify-center rounded-md bg-accent px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Abunə ol
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-label="Mobil menyu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 flex flex-col bg-background/98 p-6 backdrop-blur-lg lg:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-6 py-8">
            {navCategories.map((category) => {
              const isActive = pathname === category.href;
              return (
                <Link
                  key={category.href}
                  onClick={() => setMobileMenuOpen(false)}
                  href={category.href}
                  className={`text-lg font-bold uppercase tracking-[0.2em] transition-colors ${
                    isActive ? "text-accent" : "text-foreground"
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-border pt-6 flex flex-col gap-4">
            <Link
              href="/#abune"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-md bg-accent py-4 text-sm font-bold uppercase tracking-[0.15em] text-accent-foreground hover:opacity-90"
            >
              Abunə ol
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
