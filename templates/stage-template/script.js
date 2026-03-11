const PATH_ROWS = 11;
const PATH_COLUMNS = 5;
const STEP_DELAY_MS = 150;
const PLAYER_START = { row: 9, column: 1 };
const DIRECTION_PRIORITY = [
  { rowOffset: -1, columnOffset: 0 },
  { rowOffset: 0, columnOffset: 1 },
  { rowOffset: 1, columnOffset: 0 },
  { rowOffset: 0, columnOffset: -1 }
];
const CLICK_TARGET_OVERRIDES = new Map([
  ["9-5", { row: 9, column: 5 }],
  ["7-2", { row: 8, column: 2 }],
  ["6-5", { row: 7, column: 5 }],
  ["2-2", { row: 2, column: 3 }],
  ["8-5", { row: 10, column: 5 }],
  ["9-5", { row: 10, column: 5 }],
  ["5-1", { row: 5, column: 3 }],
  ["5-2", { row: 5, column: 3 }],
  ["5-4", { row: 6, column: 4 }],
  ["5-5", { row: 6, column: 4 }],
  ["10-2", { row: 11, column: 3 }],
  ["10-3", { row: 11, column: 3 }],
  ["10-4", { row: 11, column: 3 }]
]);
const PLAYER_LABEL = "Rei";
const HUMAN_LABELS = new Map([
  ["7-2", "Rald"],
  ["6-5", "Ise"],
  ["2-2", "Bjorn"]
]);

const gridElement = document.getElementById("grid");
const glowElement = document.getElementById("tile-glow");
const assetLayerElement = document.getElementById("asset-layer");
const playerElement = document.getElementById("player");
const placeholders = [
  { type: "box", startRow: 1, endRow: 1, startColumn: 1, endColumn: 2 },
  { type: "box", startRow: 1, endRow: 1, startColumn: 3, endColumn: 3 },
  { type: "box", startRow: 1, endRow: 1, startColumn: 4, endColumn: 5 },
  { type: "human", startRow: 2, endRow: 2, startColumn: 2, endColumn: 2 },
  { type: "box", startRow: 5, endRow: 5, startColumn: 1, endColumn: 2 },
  { type: "box", startRow: 5, endRow: 5, startColumn: 4, endColumn: 5 },
  { type: "human", startRow: 6, endRow: 6, startColumn: 5, endColumn: 5 },
  { type: "box", startRow: 7, endRow: 7, startColumn: 1, endColumn: 1 },
  { type: "human", startRow: 7, endRow: 7, startColumn: 2, endColumn: 2 },
  { type: "box", startRow: 8, endRow: 9, startColumn: 1, endColumn: 1 },
  { type: "box", startRow: 8, endRow: 9, startColumn: 5, endColumn: 5 },
  { type: "box", startRow: 10, endRow: 10, startColumn: 2, endColumn: 4 }
];
const walkableOccupiedTiles = new Set(["8-1", "9-1"]);
const colliderTiles = new Set();
const playerState = {
  row: PLAYER_START.row,
  column: PLAYER_START.column,
  isMoving: false
};

function createTile(row, column) {
  const tile = document.createElement("button");
  const isAlternateTile = (row + column) % 2 === 1;

  tile.type = "button";
  tile.className = `tile ${isAlternateTile ? "tile-alt" : ""}`.trim();
  tile.setAttribute("role", "gridcell");
  tile.setAttribute("aria-label", `Tile ${row + 1}-${column + 1}`);
  tile.dataset.row = String(row + 1);
  tile.dataset.column = String(column + 1);

  return tile;
}

function createPlaceholder({ type, startRow, endRow, startColumn, endColumn }) {
  const element = document.createElement("div");
  const isWalkableHighlight =
    type === "box" &&
    startRow === 8 &&
    endRow === 9 &&
    startColumn === 1 &&
    endColumn === 1;

  element.className = `${type}-placeholder${isWalkableHighlight ? " is-walkable-highlight" : ""}`;
  element.style.gridRow = `${startRow} / ${endRow + 1}`;
  element.style.gridColumn = `${startColumn} / ${endColumn + 1}`;
  element.textContent = getPlaceholderLabel(type, startRow, endRow, startColumn, endColumn);

  return element;
}

function getPlaceholderLabel(type, startRow, endRow, startColumn, endColumn) {
  if (type === "human" && startRow === endRow && startColumn === endColumn) {
    return HUMAN_LABELS.get(getTileKey(startRow, startColumn)) || formatPlaceholderLabel(startRow, endRow, startColumn, endColumn);
  }

  return formatPlaceholderLabel(startRow, endRow, startColumn, endColumn);
}

function formatPlaceholderLabel(startRow, endRow, startColumn, endColumn) {
  const rowLabel = startRow === endRow ? `${startRow}` : `${startRow}-${endRow}`;
  const columnLabel = startColumn === endColumn ? `${startColumn}` : `${startColumn}-${endColumn}`;

  return `${rowLabel}:${columnLabel}`;
}

function wait(duration) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

function triggerTileGlow(tile) {
  glowElement.style.setProperty("--glow-row", tile.dataset.row);
  glowElement.style.setProperty("--glow-column", tile.dataset.column);
  glowElement.classList.remove("is-active");
  void glowElement.offsetWidth;
  glowElement.classList.add("is-active");
}

function getTileKey(row, column) {
  return `${row}-${column}`;
}

function isInBounds(row, column) {
  return row >= 1 && row <= PATH_ROWS && column >= 1 && column <= PATH_COLUMNS;
}

function isWalkable(row, column) {
  return isInBounds(row, column) && !colliderTiles.has(getTileKey(row, column));
}

function getNeighbors(row, column) {
  return DIRECTION_PRIORITY
    .map(({ rowOffset, columnOffset }) => ({
      row: row + rowOffset,
      column: column + columnOffset
    }))
    .filter(({ row: nextRow, column: nextColumn }) => isWalkable(nextRow, nextColumn));
}

function buildColliderMap() {
  colliderTiles.clear();

  placeholders.forEach(({ startRow, endRow, startColumn, endColumn }) => {
    for (let row = startRow; row <= endRow; row += 1) {
      for (let column = startColumn; column <= endColumn; column += 1) {
        const key = getTileKey(row, column);

        if (!walkableOccupiedTiles.has(key)) {
          colliderTiles.add(key);
        }
      }
    }
  });
}

function findShortestPath(start, target) {
  if (!isWalkable(target.row, target.column)) {
    return null;
  }

  const startKey = getTileKey(start.row, start.column);
  const targetKey = getTileKey(target.row, target.column);

  if (startKey === targetKey) {
    return [];
  }

  const queue = [start];
  const visited = new Set([startKey]);
  const parents = new Map();

  while (queue.length > 0) {
    const current = queue.shift();
    const currentKey = getTileKey(current.row, current.column);

    if (currentKey === targetKey) {
      break;
    }

    getNeighbors(current.row, current.column).forEach((neighbor) => {
      const neighborKey = getTileKey(neighbor.row, neighbor.column);

      if (visited.has(neighborKey)) {
        return;
      }

      visited.add(neighborKey);
      parents.set(neighborKey, currentKey);
      queue.push(neighbor);
    });
  }

  if (!visited.has(targetKey)) {
    return null;
  }

  const path = [];
  let currentKey = targetKey;

  while (currentKey !== startKey) {
    const [row, column] = currentKey.split("-").map(Number);
    path.unshift({ row, column });
    currentKey = parents.get(currentKey);
  }

  return path;
}

function getAdjacentWalkableTiles(row, column) {
  return DIRECTION_PRIORITY
    .map(({ rowOffset, columnOffset }) => ({
      row: row + rowOffset,
      column: column + columnOffset
    }))
    .filter(({ row: nextRow, column: nextColumn }) => isWalkable(nextRow, nextColumn));
}

function resolveDestination(start, target) {
  const override = CLICK_TARGET_OVERRIDES.get(getTileKey(target.row, target.column));

  if (override) {
    const overridePath = findShortestPath(start, override);

    if (overridePath) {
      return { destination: override, path: overridePath };
    }
  }

  if (isWalkable(target.row, target.column)) {
    return { destination: target, path: findShortestPath(start, target) };
  }

  const candidates = getAdjacentWalkableTiles(target.row, target.column)
    .map((candidate, index) => {
      const path = findShortestPath(start, candidate);

      if (!path) {
        return null;
      }

      return {
        candidate,
        path,
        priority: index
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      if (left.path.length !== right.path.length) {
        return left.path.length - right.path.length;
      }

      return left.priority - right.priority;
    });

  if (candidates.length === 0) {
    return null;
  }

  return {
    destination: candidates[0].candidate,
    path: candidates[0].path
  };
}

function renderPlayer() {
  playerElement.style.setProperty("--player-row", String(playerState.row));
  playerElement.style.setProperty("--player-column", String(playerState.column));
}

async function movePlayerAlong(path) {
  if (!path || path.length === 0) {
    return;
  }

  playerState.isMoving = true;

  for (const step of path) {
    playerState.row = step.row;
    playerState.column = step.column;
    playerElement.classList.add("is-moving");
    renderPlayer();
    await wait(STEP_DELAY_MS);
  }

  playerElement.classList.remove("is-moving");
  playerState.isMoving = false;
}

async function handleTileClick(event) {
  const tile = event.target.closest(".tile");

  if (!tile) {
    return;
  }

  triggerTileGlow(tile);

  if (playerState.isMoving) {
    return;
  }

  const target = {
    row: Number(tile.dataset.row),
    column: Number(tile.dataset.column)
  };
  const start = {
    row: playerState.row,
    column: playerState.column
  };
  const resolvedMove = resolveDestination(start, target);

  if (!resolvedMove || !resolvedMove.path) {
    return;
  }

  await movePlayerAlong(resolvedMove.path);
}

function buildGrid() {
  const fragment = document.createDocumentFragment();

  for (let row = 0; row < PATH_ROWS; row += 1) {
    for (let column = 0; column < PATH_COLUMNS; column += 1) {
      fragment.appendChild(createTile(row, column));
    }
  }

  gridElement.appendChild(fragment);
}

function buildPlaceholders() {
  const fragment = document.createDocumentFragment();

  placeholders.forEach((placeholder) => {
    fragment.appendChild(createPlaceholder(placeholder));
  });

  assetLayerElement.appendChild(fragment);
}

function initializePlayer() {
  if (!isWalkable(playerState.row, playerState.column)) {
    return;
  }

  playerElement.textContent = PLAYER_LABEL;
  renderPlayer();
}

buildGrid();
buildColliderMap();
buildPlaceholders();
initializePlayer();
gridElement.addEventListener("click", (event) => {
  handleTileClick(event);
});
