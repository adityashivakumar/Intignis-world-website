import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom"; // 1. Added createPortal

interface NavItem {
  label: string;
  href: string;
}

interface Props {
  navigation: NavItem[];
  cta: NavItem;
  brandName: string;
}

export default function MobileMenu({ navigation, cta, brandName }: Props) {
  const [open, setOpen] = useState(false);
  const scrollYRef = useRef(0);
  const [mounted, setMounted] = useState(false); // 2. Added mounted state for safe SSR

  // Ensure portals only render on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock the background from scrolling while the menu is open.
  useEffect(() => {
    if (open) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
    };
  }, [open]);

  // Close on Escape or desktop resize
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function handleResize() {
      if (window.innerWidth >= 1024) setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 3. The menu panel is pulled out into a variable so we can portal it
  const menuPanel = (
    <div
      id="mobile-menu-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 top-[72px] z-[100] flex flex-col overflow-y-auto overscroll-contain bg-brand-paper px-6 pb-10 pt-4"
    >
      <nav className="flex flex-col gap-1" aria-label="Mobile">
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="border-b border-black/5 py-4 text-lg font-medium text-brand-ink"
          >
            {item.label}
          </a>
        ))}
      </nav>
      {cta && (
        <a
          href={cta.href}
          onClick={() => setOpen(false)}
          className="mt-8 inline-flex items-center justify-center rounded-sm bg-brand-navy px-5 py-3 text-sm font-semibold text-white"
        >
          {cta.label}
        </a>
      )}
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((v) => !v)}
        className="relative z-[70] flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-sm border border-black/10"
      >
        <span
          className={`h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span className={`h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {/* 4. Use createPortal to attach the menu to the body, escaping the header's blur trap */}
      {mounted && open && createPortal(menuPanel, document.body)}
    </div>
  );
}