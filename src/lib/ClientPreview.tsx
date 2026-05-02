"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

export type Option = { value: string; label: string };

export type Control = {
  label: string;
  options: Option[];
  apply?: (value: string, prev: string | undefined) => void;
};

const Ctx = createContext<Record<string, string>>({});

export function useVariant(label: string): string | undefined {
  return useContext(Ctx)[label];
}

export function ClientPreview({
  controls = [],
  children,
  storageKey = "cp:v1",
  defaultVisibility = "auto",
}: {
  controls?: Control[];
  children: ReactNode;
  storageKey?: string;
  defaultVisibility?: "auto" | "show" | "hide";
}) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const c of controls) init[c.label] = c.options[0]?.value ?? "";
    return init;
  });

  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setValues((v) => ({ ...v, ...JSON.parse(raw) }));
      const rawPos = localStorage.getItem(storageKey + ":pos");
      if (rawPos) setPos(JSON.parse(rawPos));
    } catch {}
    const params = new URLSearchParams(window.location.search);
    const flag = params.get("preview");
    if (flag === "0") setVisible(false);
    else if (flag === "1") setVisible(true);
    else if (defaultVisibility === "show") setVisible(true);
    else if (defaultVisibility === "hide") setVisible(false);
    else setVisible(process.env.NODE_ENV !== "production");
    setHydrated(true);
  }, [storageKey, defaultVisibility]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(values));
    } catch {}
  }, [storageKey, values, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey + ":pos", JSON.stringify(pos));
    } catch {}
  }, [storageKey, pos, hydrated]);

  const prevRef = useRef<Record<string, string>>({});
  useEffect(() => {
    for (const c of controls) {
      if (c.apply && values[c.label] !== prevRef.current[c.label]) {
        c.apply(values[c.label], prevRef.current[c.label]);
      }
    }
    prevRef.current = values;
  }, [controls, values]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setVisible((v) => !v);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const dragRef = useRef({ active: false, sx: 0, sy: 0, bx: 0, by: 0 });
  useEffect(() => {
    function move(e: globalThis.PointerEvent) {
      const s = dragRef.current;
      if (!s.active) return;
      setPos({ x: s.bx + (e.clientX - s.sx), y: s.by + (e.clientY - s.sy) });
    }
    function up() {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      document.body.style.userSelect = "";
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("button")) return;
      dragRef.current = { active: true, sx: e.clientX, sy: e.clientY, bx: pos.x, by: pos.y };
      document.body.style.userSelect = "none";
    },
    [pos]
  );

  const set = useCallback((label: string, value: string) => {
    setValues((prev) => ({ ...prev, [label]: value }));
  }, []);

  const ctxValue = useMemo(() => values, [values]);

  return (
    <Ctx.Provider value={ctxValue}>
      {children}
      {hydrated && visible && (
        <div
          onPointerDown={onPointerDown}
          style={{
            ...panel,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
          }}
        >
          <div style={head}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1 }}>⋮⋮</span>
              <strong style={{ fontSize: 13 }}>Preview</strong>
            </span>
            <span style={{ display: "inline-flex", gap: 4 }}>
              <button
                type="button"
                aria-label="Hide"
                onClick={() => setVisible(false)}
                style={iconBtn}
              >
                ×
              </button>
            </span>
          </div>
          <div style={caption}>Drag me · Esc to toggle</div>
          {controls.map((c) => (
            <div key={c.label} style={{ marginTop: 12 }}>
              <div style={sectionLabel}>{c.label}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {c.options.map((o) => {
                  const active = values[c.label] === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => set(c.label, o.value)}
                      style={{
                        ...optBtn,
                        background: active ? "#ede9fe" : "transparent",
                        color: active ? "#4a30b8" : "#1f2937",
                        fontWeight: active ? 600 : 500,
                      }}
                    >
                      <span>{o.label}</span>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: active ? "#5b3fd6" : "transparent",
                          border: active ? "none" : "1.5px solid #d1d5db",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={footer}>
            Previewing
            <br />
            {process.env.NODE_ENV === "production" ? "production (?preview=1)" : "dev mode"}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

const panel: CSSProperties = {
  position: "fixed",
  top: 16,
  right: 16,
  zIndex: 99999,
  width: 232,
  padding: 14,
  borderRadius: 14,
  background: "#fff",
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
  fontFamily: "system-ui, -apple-system, sans-serif",
  color: "#111827",
  cursor: "move",
  touchAction: "none",
};

const head: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const caption: CSSProperties = { fontSize: 11, color: "#9ca3af", marginTop: 2 };

const sectionLabel: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 6,
};

const optBtn: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "8px 10px",
  border: "none",
  borderRadius: 8,
  fontSize: 13,
  cursor: "pointer",
  textAlign: "left",
};

const iconBtn: CSSProperties = {
  width: 22,
  height: 22,
  border: "none",
  background: "transparent",
  color: "#9ca3af",
  fontSize: 18,
  lineHeight: 1,
  cursor: "pointer",
  borderRadius: 4,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const footer: CSSProperties = {
  marginTop: 14,
  paddingTop: 10,
  borderTop: "1px solid #f3f4f6",
  fontSize: 11,
  color: "#9ca3af",
  lineHeight: 1.5,
};
