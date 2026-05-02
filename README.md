# Client Preview

Stop Looming your clients — drop a 5KB widget on the live site and let them toggle the options themselves.

A small draggable widget that lives on your live deploy and toggles between design variants you've defined: a CSS class, a colour, a piece of copy, a swapped component. Your client sees the actual site with both options at their fingertips, makes the call, you ship.

- One component, one config object
- ~140 lines, zero dependencies, MIT licensed
- Draggable, persists to `localStorage`
- Visible in dev by default, gated behind `?preview=1` in production
- `Esc` to hide

## Install

The widget is a single file. Copy `src/lib/ClientPreview.tsx` into your project. No build step.

## Use

```tsx
import { ClientPreview, useVariant } from "@/lib/ClientPreview";

// Wrap your app once (in app/layout.tsx for Next.js App Router)
<ClientPreview
  controls={[
    {
      label: "Theme",
      options: [
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
      ],
      apply: (v) => document.body.setAttribute("data-theme", v),
    },
    {
      label: "Hero",
      options: [
        { value: "a", label: "Variant A" },
        { value: "b", label: "Variant B" },
      ],
    },
  ]}
>
  {children}
</ClientPreview>;

// Read the variant anywhere downstream
function Hero() {
  const v = useVariant("Hero");
  return v === "b" ? <HeroB /> : <HeroA />;
}
```

Two integration patterns:

- `apply` callback — fires on change. Good for side effects (toggle a class, set a CSS variable).
- `useVariant(label)` — for conditional rendering. Subscribes to changes.

Use one, the other, or both.

## Visibility rules

| Environment            | Default | Override                |
| ---------------------- | ------- | ----------------------- |
| `NODE_ENV=development` | Visible | `?preview=0` to hide    |
| `NODE_ENV=production`  | Hidden  | `?preview=1` to show    |

`Esc` toggles the panel.

## Run the demo locally

```bash
pnpm install
pnpm dev
```

Then open <http://localhost:3477>.

## License

MIT.
