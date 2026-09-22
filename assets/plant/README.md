# Interactive garden

Original pixel art, drawn with Canvas 2D. No external dependencies or image requests.

- `sprites.js`: palette and pixel patterns for leaves, flowers, fruit and soil.
- `plant.css`: placement, responsive layout and interaction hint.
- `plant.js`: growth → ripe → falling fruit → seed → new growth.

Pointer entry (mouse), click, touch and native button keyboard activation nurture the plant. Two fruits fade next to the parent; one drops to the lower soil. The new sprout stays rooted at the lower landing spot. Subsequent generations grow and reseed in that same lower patch, without moving back up. Random breezes animate the leaves. Rendering pauses while the component or document is hidden. Reduced motion disables idle growth and wind; direct interaction remains available.

Tune `base`/`landing` for soil heights, the growth rates in `frame`, and the increment in `interact`. `data-phase` and `data-growth` on the button expose the displayed stage for inspection.
