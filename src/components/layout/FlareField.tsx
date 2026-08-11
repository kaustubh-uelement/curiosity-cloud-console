import React from "react";

/* ============================================================
   FlareField Component
   Atmospheric background gradient lighting matching DESIGN_SYSTEM.md
   section 6.1: 9 ambient colored radial flares slowly drifting
   on independent orbital cycles behind the glass surfaces.
   ============================================================ */

const FLARES = [
  { c: "124,58,237", x: "-8%", y: "-12%", s: "46vw", d: 46, delay: 0, o: 0.42 },
  { c: "34,211,238", x: "62%", y: "-18%", s: "52vw", d: 58, delay: -8, o: 0.44 },
  { c: "79,70,229", x: "72%", y: "22%", s: "34vw", d: 40, delay: -20, o: 0.38 },
  { c: "37,99,235", x: "-14%", y: "34%", s: "40vw", d: 64, delay: -30, o: 0.34 },
  { c: "245,158,11", x: "34%", y: "48%", s: "38vw", d: 52, delay: -12, o: 0.24 },
  { c: "124,58,237", x: "68%", y: "62%", s: "42vw", d: 70, delay: -44, o: 0.34 },
  { c: "14,165,233", x: "6%", y: "72%", s: "36vw", d: 48, delay: -26, o: 0.4 },
  { c: "79,70,229", x: "44%", y: "86%", s: "44vw", d: 60, delay: -5, o: 0.32 },
  { c: "34,211,238", x: "80%", y: "92%", s: "32vw", d: 38, delay: -17, o: 0.36 },
];

export function FlareField() {
  return (
    <div className="flarefield" aria-hidden="true">
      {FLARES.map((f, i) => (
        <span
          key={i}
          className={`flare flare-${i % 3}`}
          style={
            {
              "--c": f.c,
              "--o": f.o,
              left: f.x,
              top: f.y,
              width: f.s,
              height: f.s,
              animationDuration: `${f.d}s`,
              animationDelay: `${f.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
