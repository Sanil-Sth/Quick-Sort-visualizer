# QuickSort Visualizer

An interactive, step-by-step visualization of the QuickSort algorithm — built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, no dependencies. Just open `index.html` in a browser.

![QuickSort Visualizer](https://img.shields.io/badge/algorithm-quicksort-E07B2F?style=flat-square) ![Vanilla JS](https://img.shields.io/badge/built%20with-vanilla%20js-F1C40F?style=flat-square) ![No Build Step](https://img.shields.io/badge/no%20build%20step-required-2ECC71?style=flat-square)

---

## Features

- **Step-by-step playback** — play, pause, go forward, go backward through every atomic operation
- **6 color-coded bar states** — idle, active window, pivot, comparing, swapping, sorted
- **Call stack panel** — live view of the recursive call stack as the algorithm runs
- **4 array presets** — Random, Sorted, Reverse Sorted, Nearly Sorted
- **Custom array input** — enter your own comma-separated integers (1–100, up to 20 values)
- **Array size slider** — 5 to 20 elements
- **Speed slider** — 80ms (fast) to 1500ms (slow)
- **Draggable panel divider** — resize the controls and chart panels by dragging the handle
- **Keyboard shortcut** — press `R` to reset the panel layout at any time

---

## Getting Started

No installation needed.

```bash
git clone https://github.com/Sanil-Sth/Quick-Sort-visualizer.git
cd Quick-Sort-visualizer
```

Then open `index.html` in any modern browser. That's it.

---

## Project Structure

```
Quick-Sort-visualizer/
├── index.html
├── css/
│   ├── tokens.css        ← all design tokens / CSS variables
│   ├── reset.css         ← box-sizing and base reset
│   ├── layout.css        ← two-column viewport layout
│   ├── components.css    ← buttons, sliders, inputs, panels
│   ├── bars.css          ← bar chart and bar elements
│   └── animations.css    ← keyframes and transitions
└── js/
    ├── state.js          ← single global state object + constants
    ├── algorithm.js      ← recordQuickSort() — pure computation, zero DOM
    ├── renderer.js       ← renderStep(n) — pure DOM writes, zero logic
    ├── controls.js       ← all event listeners and UI wiring
    ├── resizer.js        ← drag-to-resize panel divider
    └── main.js           ← app entry point
```

Each file has a single responsibility. The algorithm runs completely first, recording every atomic step into a `steps[]` array. Playback is pure rendering — `renderStep(n)` reads `steps[n]` and updates the DOM, making backward stepping trivial (just restore from `arraySnapshot`).

---

## How QuickSort Works

QuickSort is a divide-and-conquer sorting algorithm:

1. Pick a **pivot** element (last element in this implementation — Lomuto partition scheme)
2. **Partition** the array so all elements smaller than the pivot go left, larger go right
3. The pivot is now in its **final sorted position**
4. **Recurse** on the left and right subarrays

Average time complexity: **O(n log n)**  
Worst case (already sorted): **O(n²)**  
Space complexity: **O(log n)** call stack

---

## Bar Color Legend

| Color | State |
|-------|-------|
| 🔵 Blue | Active partition window |
| 🔴 Red | Current pivot |
| 🟡 Yellow | Being compared |
| 🟠 Orange | Being swapped |
| 🟢 Green | Permanently sorted |
| ⬜ Gray | Idle |

---

## Controls

| Control | Action |
|---------|--------|
| `▶ Play` | Start auto-playback |
| `⏸ Pause` | Pause playback |
| `← Prev` | Step backward (restores from snapshot) |
| `Next →` | Step forward |
| `↺` | Reset to beginning |
| Speed slider | Adjust playback speed (80ms – 1500ms) |
| Size slider | Change array size (5 – 20 elements) |
| Drag divider | Resize control and chart panels |
| `R` key | Reset panel layout to default |
| Double-click divider | Reset panel layout to default |

---

## Built With

- **HTML5** — semantic markup, zero inline styles
- **CSS3** — custom properties, CSS Grid, keyframe animations
- **Vanilla JavaScript** — ES6+, no frameworks, no bundler

---

*Made by [Sanil-Sth](https://github.com/Sanil-Sth)*
