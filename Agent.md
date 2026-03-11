# Agent.md

## Purpose
This project is a mobile-first browser prototype for a portrait puzzle or mini-game board.

The current scope is intentionally narrow:
- build and refine the board layout
- preserve a clean tile-based foundation
- keep the code easy to extend with future assets, interactions, and gameplay

## Working Rules
- Use only `index.html`, `style.css`, and `script.js` unless the user asks for more structure.
- Keep the implementation dependency-free: HTML, CSS, and vanilla JavaScript only.
- Preserve the portrait/mobile-first presentation.
- On desktop, keep the game inside a centered tall mobile-style frame.
- Treat the board as the core product surface. Avoid adding HUD, buttons, labels, score, dialogue, or decorative clutter unless explicitly requested.
- Keep the tile system grid-based and square.
- Keep layout math explicit and easy to reason about.
- Prefer modular DOM generation in `script.js` over hardcoding repeated tile markup in HTML.
- Make new placeholder assets replaceable later with real sprites or images.

## Current Board Model
- The visible board is a centered `5 x 11` path.
- The full board shell behaves like a `7 x 13` canvas.
- One tile of empty margin is preserved on the left, right, top, and bottom.
- Side gaps are reserved for future decoration or gameplay objects.
- The tile floor currently uses alternating light placeholder colors.

## Placeholder Rules
- `box` placeholders may span horizontally or vertically across multiple tiles.
- `human` placeholders are currently rendered as circles.
- Placeholder coordinates are defined in `script.js`.
- Placeholder labels are temporary and should be easy to remove later.

## Editing Guidelines
- When changing layout, update `guidelines.md` if the change affects spacing, board dimensions, tile behavior, placeholder rules, or visual conventions.
- Keep CSS variables at the top of `style.css` as the source of truth for board sizing.
- Keep rendering helpers in `script.js` small and single-purpose.
- Do not bake gameplay logic into the layout layer unless specifically requested.

## File Responsibilities
- `index.html`: minimal structure for the portrait frame, board shell, tile grid, and overlay layers
- `style.css`: board sizing, responsive layout, tile appearance, placeholder visuals
- `script.js`: tile generation, placeholder generation, coordinate-driven placement
