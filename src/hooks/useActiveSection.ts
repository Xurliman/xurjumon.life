"use client";

import { useState, useEffect, useRef } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("");
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;

  useEffect(() => {
    function getActive() {
      const ids = idsRef.current;
      const navbarOffset = 100;

      // If scrolled to bottom of page, activate last section
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
        const lastId = ids[ids.length - 1];
        if (lastId) {
          setActiveSection(lastId);
          return;
        }
      }

      // Find the section whose top is closest to (but above) the viewport top + offset
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= navbarOffset) {
          current = id;
        }
      }

      if (current) {
        setActiveSection(current);
      } else if (ids.length > 0) {
        // If none have scrolled past, default to first section
        setActiveSection(ids[0]);
      }
    }

    getActive();
    window.addEventListener("scroll", getActive, { passive: true });
    return () => window.removeEventListener("scroll", getActive);
  }, []);

  return activeSection;
}
