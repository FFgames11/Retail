# guidelines.md

## Project Goal
Build a clean mobile-first puzzle board prototype that runs directly in the browser with no dependencies.

## Active Layout Rules
- The experience is portrait-first.
- On mobile, the board fills the screen naturally.
- On desktop, the board is centered inside a tall mobile-style container.
- The playable floor is a narrow centered path.
- The path uses a `5 x 11` square tile grid.
- The full board shell uses `1 tile` of empty margin on all four sides, effectively reading as `7 x 13`.
- Left and right side spacing must remain visibly available for future assets.
- Tiles must remain square and must not stretch.
- The board should stay minimal: no HUD, buttons, labels, score, dialogue, or extra UI unless requested.

## Active Visual Rules
- Only show the floor tiles and empty side areas as the base layout.
- Tile colors are currently:
- `#FEFEFA`
- `#F0F8FF`
- Tiles alternate in a checker pattern.
- Placeholder objects may sit above the tiles in an overlay layer.

## Placeholder Rules
- `box` placeholders are rectangular stand-ins for future assets.
- `human` placeholders are temporary circles.
- Placeholders may span multiple tiles horizontally or vertically.
- Placeholder labels currently display their coordinates for layout review.

## Coordinate Conventions
- Coordinates are written as `row:column`.
- Horizontal spans use `row:start-end`, for example `5:1-2`.
- Vertical spans use `start-end:column`, for example `8-9:5`.
- Rows and columns are 1-based from the top-left tile of the playable `5 x 11` path.

## Current Placeholder Map
- `1:1-2` box
- `1:3` box
- `1:4-5` box
- `2:2` human
- `5:1-2` box
- `5:4-5` box
- `6:5` human
- `7:1` box
- `7:2` human
- `8-9:1` box
- `8-9:5` box
- `10:2-4` box

## Major Changes Log
- Initial prototype created as a portrait-only mobile game shell with an `11 x 5` grid.
- Grid spacing was updated to remove tile gaps.
- Tile colors were switched to an alternating two-color board.
- The layout was simplified to remove all text, HUD, and buttons.
- The board math was reworked so the path sits inside a `7 x 13` tile-based frame with one tile of margin on each side.
- The desktop frame sizing was corrected so left and right spacing render evenly.
- Tile colors were changed to `#FEFEFA` and `#F0F8FF`.
- A placeholder asset overlay layer was added above the tile grid.
- Box placeholders were upgraded from per-tile markers to span-based objects.
- A human placeholder type was added, then simplified to a circle marker.
- Placeholder labels were added to display coordinates directly on the board.
- A player placeholder was added as a blue-green circle with click-to-move board navigation.
- Board movement now uses shortest-path BFS with orthogonal movement only.
- Occupied placeholder tiles now act as colliders except `8-9:1`, which remains walkable.
- Tiles now show a single reusable glow animation on the most recently clicked tile, including collider clicks.
- The current approved board state was snapshotted to `templates/stage-template/` for future stage-based variations.
- A scene layer was added for stage scripting, including camera intro motion, NPC highlight states, speech bubbles, and bottom choice trays.
- Breakfast-task dialogue now keeps the camera zoomed on Rei and Rald until the main conversation resolves, while repeat reminder clicks stay unzoomed.
- Scene progression now hands the active glow from Rald to Bjorn and then to Ise, with a second Bjorn dialogue phase and a temporary bread reward marker above Rei.
- Board zoom was refactored to be pure center-based visual scaling on an inner world layer so the phone viewport stays centered and side gaps no longer shift the board during zoom.
- Decoration regions are now board-level frame areas on the top, bottom, left, and right, attached to the same scalable wrapper as the tile grid.

## Update Rule
Update this file whenever a major change affects:
- board dimensions
- spacing or alignment rules
- tile sizing behavior
- tile colors or board visual language
- placeholder types, spans, or coordinate conventions
- desktop or mobile framing behavior
