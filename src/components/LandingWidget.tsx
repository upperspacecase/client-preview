// Static visual reproduction of the widget for the hero — not interactive.
// The real widget is in src/lib/ClientPreview.tsx.

export function LandingWidget() {
  return (
    <div className="w-[230px] rounded-xl bg-white border border-black/10 shadow-[0_12px_30px_rgba(15,23,42,0.18)] p-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs leading-none">⋮⋮</span>
          <span className="font-semibold text-[13px]">Preview</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <span className="w-4 h-4 inline-flex items-center justify-center text-[15px] leading-none">−</span>
          <span className="w-4 h-4 inline-flex items-center justify-center text-[15px] leading-none">×</span>
        </div>
      </div>
      <div className="text-[11px] text-gray-400 mt-0.5">Drag me</div>

      {/* Hero section */}
      <div className="mt-3">
        <div className="text-[12px] font-semibold text-gray-700 mb-1.5">Hero</div>
        <div className="space-y-0.5">
          <Row label="Variant A" active />
          <Row label="Variant B" />
          <Row label="Variant C" />
        </div>
      </div>

      {/* Theme section */}
      <div className="mt-3">
        <div className="text-[12px] font-semibold text-gray-700 mb-1.5">Theme</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-md bg-[var(--color-lavender-soft)] text-[var(--color-violet-deep)] text-[13px] font-medium">
            Light
          </button>
          <button className="px-3 py-1 rounded-md text-gray-600 text-[13px] font-medium border border-gray-200">
            Dark
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] text-gray-400 leading-snug">
        Previewing
        <br />
        dev mode
      </div>
    </div>
  );
}

function Row({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-2.5 py-1.5 rounded-md ${
        active ? "bg-[var(--color-lavender-soft)] text-[var(--color-violet-deep)] font-semibold" : "text-gray-700"
      }`}
    >
      <span className="text-[13px]">{label}</span>
      <span
        className={`w-2.5 h-2.5 rounded-full ${
          active ? "bg-[var(--color-violet)]" : "border-[1.5px] border-gray-300"
        }`}
      />
    </div>
  );
}
