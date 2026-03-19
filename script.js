const PATH_ROWS = 11;
const PATH_COLUMNS = 5;
const STEP_DELAY_MS = 150;
const SCENE_INTRO_MS = 3000;
const CHOICE_DELAY_MS = 2000;
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
const ACTOR_LABELS = new Map([
  ["player", "Rei"],
  ["rald", "Rald"],
  ["ise", "Isei"],
  ["bjorn", "Bjorn"]
]);
const BOX_LABELS = new Map([
  ["1-1:1-2", "Bread Shelf"],
  ["1-1:3-3", "Can Shelf"],
  ["1-1:4-5", "Egg Shelf"],
  ["2-2:4-5", "Spill"],
  ["5-5:1-2", "Apple Shelf"],
  ["5-5:4-5", "Juice Shelf"],
  ["7-7:1-1", "Baskets"],
  ["8-9:1-1", "Carpet"],
  ["8-9:5-5", "Cabinet"],
  ["10-10:2-4", "Counter"]
]);
const CHOICE_COPY = {
  breakfast: {
    correct: "Bread, eggs, and orange juice.",
    wrong: "Bread, milk, and apples."
  },
  bjorn_bread: {
    correct: "Rald told me to ask you about the bread.",
    wrong: "I'm looking for tea."
  },
  bjorn_eggs: {
    correct: "I need eggs for breakfast.",
    wrong: "I need soap for cleaning."
  },
  ise: {
    correct: "Orange juice for breakfast.",
    wrong: "Tea for breakfast."
  }
};
const RALD_CONVERSATION_TILE = { row: 8, column: 2 };
const RALD_REMINDER_COPY = "Remember, Bread, eggs, and orange juice. Ask Bjorn for bread, ask Ise for the drinks, and talk to Bjorn for the eggs.";
const CONVERSATION_CAMERA_FOCUS = { row: 7.5, column: 2, scale: 1.45 };
const BJORN_CONVERSATION_TILE = { row: 2, column: 3 };
const BJORN_CONVERSATION_CAMERA_FOCUS = { row: 2, column: 2.5, scale: 1.45 };
const ISE_CONVERSATION_TILE = { row: 6, column: 4 };
const ISE_CONVERSATION_CAMERA_FOCUS = { row: 6, column: 4.5, scale: 1.45 };
const BREAD_SHELF_APPROACH_TILE = { row: 2, column: 1 };
const CABINET_TILE = { row: 10, column: 5 };
const SPILL_APPROACH_TILE = { row: 3, column: 4 };
const FINAL_RALD_TILE = { row: 8, column: 2 };
const FINAL_REPLY_DELAY_MS = 4000;
const REMINDER_BUBBLE_DELAY_MS = 5000;
const PLAYER_ITEM_DELAY_MS = 3000;
const CLEANING_DURATION_MS = 5000;
const BG_MUSIC_VOLUME = 0.3;
const CLICK_SFX_VOLUME = 0.3;
const OBTAIN_SFX_VOLUME = 0.3;
const GAME_COMPLETE_SFX_VOLUME = 0.3;
const DIALOGUE_AUDIO_BASE_PATH = "dialogues_tts";
const DIALOGUE_AUDIO_FILES = {
  rald_intro_1: "rald_intro_1.wav",
  rald_intro_2: "rald_intro_2.wav",
  rei_breakfast_correct: "rei_breakfast_correct.wav",
  rald_breakfast_resolved: "rald_breakfast_resolved.wav",
  rei_breakfast_wrong: "rei_breakfast_wrong.wav",
  rald_breakfast_wrong: "rald_breakfast_wrong.wav",
  rald_reminder: "rald_reminder.wav",
  bjorn_open_bread: "bjorn_open_bread.wav",
  rei_bread_request: "rei_bread_request.wav",
  bjorn_bread_reply: "bjorn_bread_reply.wav",
  rei_bjorn_wrong_tea: "rei_bjorn_wrong_tea.wav",
  bjorn_bread_wrong_reply: "bjorn_bread_wrong_reply.wav",
  bjorn_talk_to_isei: "bjorn_talk_to_isei.wav",
  ise_open: "ise_open.wav",
  rei_ise_correct: "rei_ise_correct.wav",
  ise_correct_reply: "ise_correct_reply.wav",
  rei_ise_wrong: "rei_ise_wrong.wav",
  ise_wrong_reply: "ise_wrong_reply.wav",
  bjorn_open_eggs: "bjorn_open_eggs.wav",
  rei_eggs_request: "rei_eggs_request.wav",
  bjorn_eggs_reply: "bjorn_eggs_reply.wav",
  rei_bjorn_wrong_soap: "rei_bjorn_wrong_soap.wav",
  bjorn_soap_reply: "bjorn_soap_reply.wav",
  rei_spill_blocked: "rei_spill_blocked.wav",
  bjorn_mop_hint_1: "bjorn_mop_hint_1.wav",
  bjorn_mop_hint_2: "bjorn_mop_hint_2.wav",
  bjorn_mop_confirm: "bjorn_mop_confirm.wav",
  bjorn_need_mop: "bjorn_need_mop.wav",
  bjorn_egg_access: "bjorn_egg_access.wav",
  rei_final_report: "rei_final_report.wav",
  rald_final_reply: "rald_final_reply.wav"
};

const gridElement = document.getElementById("grid");
const boardCameraElement = document.getElementById("board-world");
const glowElement = document.getElementById("tile-glow");
const floorLayerElement = document.getElementById("floor-layer");
const npcLayerElement = document.getElementById("npc-layer");
const assetLayerElement = document.getElementById("asset-layer");
const gameScreenElement = document.querySelector(".game-screen");
const playerElement = document.getElementById("player");
const bgMusicElement = document.getElementById("bg-music");
const bgMusicToggleElement = document.getElementById("bg-music-toggle");
const loadingScreenElement = document.getElementById("loading-screen");
const loadingBarFillElement = document.getElementById("loading-bar-fill");
const loadingTextElement = document.getElementById("loading-text");
const choiceTrayElement = document.getElementById("choice-tray");
const choiceAElement = document.getElementById("choice-a");
const choiceBElement = document.getElementById("choice-b");
const modalOverlay = document.getElementById("modal-overlay");
const emojiGrid = document.getElementById("emoji-grid");
const modalClose = document.getElementById("modal-close");
const congratsModal = document.getElementById("congrats-modal");
const resetButton = document.getElementById("reset-button");
const cleaningProgressWrap = document.getElementById("cleaning-progress-wrap");
const progressBarFill = document.getElementById("progress-bar-fill");
const clickSfx = new Audio("sfx/click.mp3");
const obtainSfx = new Audio("sfx/obtain.mp3");
const gameCompleteSfx = new Audio("sfx/game_complete.mp3");

const ITEM_POP_IMAGES = {
  Bread: "img/bread_pop.png",
  Eggs: "img/egg_pop.png",
  "Orange Juice": "img/orange_pop.png"
};

const PLACEHOLDER_IMAGE_CONFIG = {
  "bread-shelf": { src: "img/bread_shelf.png", mode: "overflow" },
  "can-shelf": { src: "img/can_shelf.png", mode: "overflow" },
  "egg-shelf": { src: "img/egg_shelf.png", mode: "overflow" },
  "apple-shelf": { src: "img/apple_shelf.png", mode: "overflow" },
  "juice-shelf": { src: "img/juice_shelf.png", mode: "overflow" },
  baskets: { src: "img/baskets.png", mode: "overflow" },
  cabinet: { src: "img/Cabinet.png", mode: "overflow" },
  counter: { src: "img/counter.png", mode: "overflow" },
  spill: { src: "img/spill.png", mode: "contained" }
};

const ACTOR_IMAGE_CONFIG = {
  player: { src: "img/Rei.png", mode: "overflow" },
  rald: { src: "img/Rald.png", mode: "overflow" },
  bjorn: { src: "img/Bjorn.png", mode: "overflow" },
  ise: { src: "img/Isei.png", mode: "overflow" }
};

const placeholders = [
  { id: "bread-shelf", type: "box", startRow: 1, endRow: 1, startColumn: 1, endColumn: 2 },
  { id: "can-shelf", type: "box", startRow: 1, endRow: 1, startColumn: 3, endColumn: 3 },
  { id: "egg-shelf", type: "box", startRow: 1, endRow: 1, startColumn: 4, endColumn: 5 },
  { type: "human", actorId: "bjorn", startRow: 2, endRow: 2, startColumn: 2, endColumn: 2 },
  { id: "spill", type: "box", startRow: 2, endRow: 2, startColumn: 4, endColumn: 5 },
  { id: "apple-shelf", type: "box", startRow: 5, endRow: 5, startColumn: 1, endColumn: 2 },
  { id: "juice-shelf", type: "box", startRow: 5, endRow: 5, startColumn: 4, endColumn: 5 },
  { type: "human", actorId: "ise", startRow: 6, endRow: 6, startColumn: 5, endColumn: 5 },
  { id: "baskets", type: "box", startRow: 7, endRow: 7, startColumn: 1, endColumn: 1 },
  { type: "human", actorId: "rald", startRow: 7, endRow: 7, startColumn: 2, endColumn: 2 },
  { id: "cabinet-left", type: "box", startRow: 8, endRow: 9, startColumn: 1, endColumn: 1 },
  { id: "cabinet", type: "box", startRow: 8, endRow: 9, startColumn: 5, endColumn: 5 },
  { id: "counter", type: "box", startRow: 10, endRow: 10, startColumn: 2, endColumn: 4 }
];
const walkableOccupiedTiles = new Set(["8-1", "9-1"]);
const colliderTiles = new Set();
const actorElements = new Map();
const playerState = {
  row: PLAYER_START.row,
  column: PLAYER_START.column,
  isMoving: false
};
const sceneState = {
  boardInputEnabled: false,
  interactionLocked: true,
  conversationActive: false,
  wrongChoiceDisabled: false,
  breakfastResolved: false,
  bjornBreadConversationDone: false,
  bjornResolved: false,
  breadObtained: false,
  iseResolved: false,
  bjornEggsStarted: false,
  spillMissionTriggered: false,
  eggShelfClickCount: 0,
  mopObtained: false,
  spillCleaned: false,
  eggObtained: false,
  activeDialogue: null
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

function createPlaceholder({ id, type, actorId, startRow, endRow, startColumn, endColumn }) {
  const element = document.createElement("div");
  const isWalkableHighlight =
    type === "box" &&
    startRow === 8 &&
    endRow === 9 &&
    startColumn === 1 &&
    endColumn === 1;

  const label = getPlaceholderLabel(type, actorId, startRow, endRow, startColumn, endColumn);

  element.className = `${type}-placeholder${isWalkableHighlight ? " is-walkable-highlight" : ""}`;

  element.style.gridRow = `${startRow} / ${endRow + 1}`;
  element.style.gridColumn = `${startColumn} / ${endColumn + 1}`;
  const imageConfig = id ? PLACEHOLDER_IMAGE_CONFIG[id] : ACTOR_IMAGE_CONFIG[actorId];
  if (imageConfig) {
    element.classList.add("has-placeholder-image");
    element.classList.add(imageConfig.mode === "contained" ? "is-contained-image" : "is-overflow-image");
    element.textContent = "";
    element.setAttribute("aria-label", label);

    const img = document.createElement("img");
    img.className = "placeholder-image";
    img.src = imageConfig.src;
    img.alt = "";
    img.draggable = false;
    element.appendChild(img);
  } else if (id === "cabinet-left") {
    element.textContent = "";
    element.setAttribute("aria-label", label);
  } else {
    element.textContent = label;
  }

  if (id) {
    element.dataset.boxId = id;
    if (id !== "cabinet" && id !== "cabinet-left") {
      element.classList.add("placeholder-interactive");
    }
  }

  if (actorId) {
    element.dataset.actorId = actorId;
    element.classList.add("placeholder-interactive");
    actorElements.set(actorId, element);
  }

  return element;
}

function getPlaceholderLabel(type, actorId, startRow, endRow, startColumn, endColumn) {
  if (type === "human" && startRow === endRow && startColumn === endColumn) {
    return ACTOR_LABELS.get(actorId) || formatPlaceholderLabel(startRow, endRow, startColumn, endColumn);
  }

  if (type === "box") {
    const boxKey = `${startRow}-${endRow}:${startColumn}-${endColumn}`;
    return BOX_LABELS.get(boxKey) || formatPlaceholderLabel(startRow, endRow, startColumn, endColumn);
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

function updateLoadingProgress(completed, total) {
  if (loadingBarFillElement) {
    loadingBarFillElement.style.width = `${(completed / total) * 100}%`;
  }

  if (loadingTextElement) {
    loadingTextElement.textContent = `Loading assets ${completed}/${total}`;
  }
}

function getPreloadImagePaths() {
  return [...new Set(
    Array.from(document.querySelectorAll("img"))
      .map((image) => image.getAttribute("src"))
      .filter(Boolean)
  )];
}

async function preloadAsset(assetPath) {
  try {
    const response = await fetch(assetPath, { cache: "force-cache" });

    if (!response.ok) {
      return;
    }

    await response.blob();
  } catch {
    // Ignore individual asset failures so one missing file does not block startup.
  }
}

async function preloadAssets() {
  const imagePaths = getPreloadImagePaths();
  const dialogueAudioPaths = Object.values(DIALOGUE_AUDIO_FILES).map((fileName) => `${DIALOGUE_AUDIO_BASE_PATH}/${fileName}`);
  const placeholderImagePaths = Object.values(PLACEHOLDER_IMAGE_CONFIG).map(({ src }) => src);
  const actorImagePaths = Object.values(ACTOR_IMAGE_CONFIG).map(({ src }) => src);
  const itemPopImagePaths = Object.values(ITEM_POP_IMAGES);
  const assetPaths = [
    ...imagePaths,
    ...placeholderImagePaths,
    ...actorImagePaths,
    ...itemPopImagePaths,
    "bg_music/bg.mp3",
    "sfx/click.mp3",
    "sfx/obtain.mp3",
    "sfx/game_complete.mp3",
    ...dialogueAudioPaths
  ];
  const totalAssets = assetPaths.length;
  let completedAssets = 0;

  updateLoadingProgress(0, totalAssets);

  await Promise.all(assetPaths.map(async (assetPath) => {
    await preloadAsset(assetPath);
    completedAssets += 1;
    updateLoadingProgress(completedAssets, totalAssets);
  }));

  if (loadingTextElement) {
    loadingTextElement.textContent = "Assets ready";
  }
}

async function hideLoadingScreen() {
  if (!loadingScreenElement) {
    return;
  }

  loadingScreenElement.classList.add("is-hidden");
  await wait(260);
  loadingScreenElement.hidden = true;
}

function initializeClickSfx() {
  clickSfx.volume = CLICK_SFX_VOLUME;
  clickSfx.preload = "auto";
  obtainSfx.volume = OBTAIN_SFX_VOLUME;
  obtainSfx.preload = "auto";
  gameCompleteSfx.volume = GAME_COMPLETE_SFX_VOLUME;
  gameCompleteSfx.preload = "auto";
}

function playClickSfx() {
  clickSfx.pause();
  clickSfx.currentTime = 0;
  clickSfx.play().catch(() => {});
}

function playObtainSfx() {
  obtainSfx.pause();
  obtainSfx.currentTime = 0;
  obtainSfx.play().catch(() => {});
}

function playGameCompleteSfx() {
  gameCompleteSfx.pause();
  gameCompleteSfx.currentTime = 0;
  gameCompleteSfx.play().catch(() => {});
}

function updateBackgroundMusicToggle() {
  if (!bgMusicElement || !bgMusicToggleElement) {
    return;
  }

  const isMuted = bgMusicElement.muted;
  const iconElement = bgMusicToggleElement.querySelector(".bg-music-toggle-icon");

  bgMusicToggleElement.setAttribute("aria-pressed", String(isMuted));
  bgMusicToggleElement.setAttribute("aria-label", isMuted ? "Unmute background music" : "Mute background music");

  if (iconElement) {
    iconElement.textContent = isMuted ? "🔇" : "🔊";
  }
}

function initializeBackgroundMusic() {
  if (!bgMusicElement) {
    return;
  }

  bgMusicElement.volume = BG_MUSIC_VOLUME;
  bgMusicElement.loop = true;
  updateBackgroundMusicToggle();

  const tryPlay = () => {
    bgMusicElement.play().catch(() => {});
  };

  tryPlay();

  const unlockPlayback = () => {
    tryPlay();
    document.removeEventListener("pointerdown", unlockPlayback);
    document.removeEventListener("keydown", unlockPlayback);
  };

  document.addEventListener("pointerdown", unlockPlayback, { once: true });
  document.addEventListener("keydown", unlockPlayback, { once: true });
}

function toggleBackgroundMusic() {
  if (!bgMusicElement) {
    return;
  }

  bgMusicElement.muted = !bgMusicElement.muted;
  updateBackgroundMusicToggle();

  if (!bgMusicElement.muted) {
    bgMusicElement.play().catch(() => {});
  }
}

function playDialogueAudio(audioKey, fallbackDuration = 0) {
  const fileName = DIALOGUE_AUDIO_FILES[audioKey];

  if (!fileName) {
    return wait(fallbackDuration);
  }

  return new Promise((resolve) => {
    const audio = new Audio(`${DIALOGUE_AUDIO_BASE_PATH}/${fileName}`);
    let resolved = false;

    const finish = () => {
      if (resolved) {
        return;
      }

      resolved = true;
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      resolve();
    };

    const handleEnded = () => {
      finish();
    };

    const handleError = () => {
      window.setTimeout(finish, fallbackDuration);
    };

    audio.addEventListener("ended", handleEnded, { once: true });
    audio.addEventListener("error", handleError, { once: true });
    audio.play().catch(() => {
      window.setTimeout(finish, fallbackDuration);
    });
  });
}

function clearBubble(hostElement) {
  const bubble = hostElement.querySelector(".speech-bubble");

  if (bubble) {
    bubble.remove();
  }
}

function clearAllBubbles() {
  clearBubble(playerElement);
  actorElements.forEach((element) => {
    clearBubble(element);
  });
}

function showBubble(hostElement, text, bubbleClassName) {
  clearBubble(hostElement);

  const bubble = document.createElement("div");

  bubble.className = `speech-bubble ${bubbleClassName}`;
  bubble.textContent = text;
  hostElement.appendChild(bubble);
}

function showActorBubble(actorId, text) {
  const actorElement = actorElements.get(actorId);

  if (!actorElement) {
    return;
  }

  showBubble(actorElement, text, "npc-bubble");
}

function showPlayerBubble(text) {
  showBubble(playerElement, text, "player-bubble");
}

async function showActorDialogue(actorId, text, audioKey, fallbackDuration) {
  clearAllBubbles();
  showActorBubble(actorId, text);
  await playDialogueAudio(audioKey, fallbackDuration);
}

async function showPlayerDialogue(text, audioKey, fallbackDuration) {
  clearAllBubbles();
  showPlayerBubble(text);
  await playDialogueAudio(audioKey, fallbackDuration);
}

function showPromptBubble(actorId) {
  const actorElement = actorElements.get(actorId);

  if (!actorElement) {
    return;
  }

  showBubble(actorElement, "!", "prompt-bubble");
}

function showPlayerItemToken(text) {
  let token = playerElement.querySelector(".player-item-token");

  if (!token) {
    token = document.createElement("div");
    token.className = "player-item-token";
    playerElement.appendChild(token);
  }

  token.textContent = "";
  token.setAttribute("aria-label", text);

  const imagePath = ITEM_POP_IMAGES[text];
  if (imagePath) {
    const img = document.createElement("img");
    img.className = "player-item-image";
    img.src = imagePath;
    img.alt = "";
    img.draggable = false;
    token.appendChild(img);
  } else {
    token.textContent = text;
  }

  token.classList.remove("is-visible", "is-glowing");
  void token.offsetWidth;
  token.classList.add("is-visible");
  token.classList.add("is-glowing");
}

function clearPlayerItemToken() {
  const token = playerElement.querySelector(".player-item-token");

  if (!token) {
    return;
  }

  token.classList.remove("is-visible", "is-glowing");
}

function setChoiceTrayVisible(isVisible) {
  choiceTrayElement.hidden = !isVisible;
  choiceTrayElement.classList.toggle("is-visible", isVisible);
}

function updateSceneInputState() {
  npcLayerElement?.classList.toggle("is-scene-locked", sceneState.interactionLocked);
  assetLayerElement.classList.toggle("is-scene-locked", sceneState.interactionLocked);
}

function setCameraFocus(row, column, scale) {
  const viewport = boardCameraElement.parentElement;
  const vw = viewport.clientWidth;
  const vh = viewport.clientHeight;
  
  // Use the actual rendered grid and path wrap dimensions
  const pathWrap = document.querySelector(".path-wrap");
  if (!pathWrap) return;

  const pathWidth = pathWrap.clientWidth;
  const pathHeight = pathWrap.clientHeight;
  const tileSize = pathWidth / PATH_COLUMNS;

  // Calculate the target center of the tile relative to the world center
  // The grid is centered in the board-world (which is vw x vh)
  const gridX = (vw - pathWidth) / 2;
  const gridY = (vh - pathHeight) / 2;
  
  const focusX = gridX + (column - 0.5) * tileSize;
  const focusY = gridY + (row - 0.5) * tileSize;
  
  // Calculate unscaled offset from center
  const dx = focusX - vw / 2;
  const dy = focusY - vh / 2;

  // Set zoom scale
  boardCameraElement.style.setProperty("--camera-scale", String(scale));

  // Clamping math:
  // To keep the world (size vw) from showing empty space when scaled by S:
  // The max pan allowed is (world_scaled_size - viewport_size) / (2 * scale)
  const limitX = scale <= 1 ? 0 : (vw * scale - vw) / (2 * scale);
  const limitY = scale <= 1 ? 0 : (vh * scale - vh) / (2 * scale);

  const panX = Math.max(-limitX, Math.min(limitX, -dx));
  const panY = Math.max(-limitY, Math.min(limitY, -dy));

  boardCameraElement.style.setProperty("--camera-pan-x", `${panX}px`);
  boardCameraElement.style.setProperty("--camera-pan-y", `${panY}px`);
}

function resetCameraFocus() {
  boardCameraElement.style.setProperty("--camera-pan-x", "0px");
  boardCameraElement.style.setProperty("--camera-pan-y", "0px");
  boardCameraElement.style.setProperty("--camera-scale", "1");
}

function setConversationCameraFocus() {
  setCameraFocus(
    CONVERSATION_CAMERA_FOCUS.row,
    CONVERSATION_CAMERA_FOCUS.column,
    CONVERSATION_CAMERA_FOCUS.scale
  );
}

function setBjornConversationCameraFocus() {
  setCameraFocus(
    BJORN_CONVERSATION_CAMERA_FOCUS.row,
    BJORN_CONVERSATION_CAMERA_FOCUS.column,
    BJORN_CONVERSATION_CAMERA_FOCUS.scale
  );
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

  placeholders.forEach(({ removed, startRow, endRow, startColumn, endColumn }) => {
    if (removed) {
      return;
    }

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

  if (playerState.isMoving || !sceneState.boardInputEnabled || sceneState.interactionLocked) {
    return;
  }

  triggerTileGlow(tile);

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

function renderChoiceState() {
  if (sceneState.activeDialogue === "bjorn_bread") {
    choiceAElement.textContent = CHOICE_COPY.bjorn_bread.correct;
    choiceBElement.textContent = CHOICE_COPY.bjorn_bread.wrong;
  } else if (sceneState.activeDialogue === "bjorn_eggs") {
    choiceAElement.textContent = CHOICE_COPY.bjorn_eggs.correct;
    choiceBElement.textContent = CHOICE_COPY.bjorn_eggs.wrong;
  } else if (sceneState.activeDialogue === "ise") {
    choiceAElement.textContent = CHOICE_COPY.ise.correct;
    choiceBElement.textContent = CHOICE_COPY.ise.wrong;
  } else {
    choiceAElement.textContent = CHOICE_COPY.breakfast.correct;
    choiceBElement.textContent = CHOICE_COPY.breakfast.wrong;
  }

  choiceBElement.disabled = sceneState.wrongChoiceDisabled;
}

async function handleCorrectChoice() {
  if (sceneState.activeDialogue === "bjorn_bread") {
    await handleBjornCorrectChoice();
    return;
  }

  if (sceneState.activeDialogue === "bjorn_eggs") {
    await handleBjornEggsCorrectChoice();
    return;
  }

  if (sceneState.activeDialogue === "ise") {
    await handleIseCorrectChoice();
    return;
  }

  setChoiceTrayVisible(false);
  sceneState.interactionLocked = true;
  updateSceneInputState();
  await showPlayerDialogue("Okay. Bread, eggs, and orange juice.", "rei_breakfast_correct", FINAL_REPLY_DELAY_MS);
  await showActorDialogue("rald", "Great. Ask Bjorn for bread, ask Ise for the drinks, and talk to Bjorn for the eggs.", "rald_breakfast_resolved", FINAL_REPLY_DELAY_MS);
  clearAllBubbles();
  resetCameraFocus();
  await wait(720);
  sceneState.breakfastResolved = true;
  actorElements.get("rald")?.classList.remove("is-highlighted");
  actorElements.get("bjorn")?.classList.add("is-highlighted");
  sceneState.boardInputEnabled = true;
  sceneState.interactionLocked = false;
  sceneState.conversationActive = false;
  sceneState.activeDialogue = null;
  updateSceneInputState();
  await showPromptBubble("bjorn");
}

async function handleWrongChoice() {
  if (sceneState.activeDialogue === "bjorn_bread") {
    await handleBjornWrongChoice();
    return;
  }

  if (sceneState.activeDialogue === "bjorn_eggs") {
    await handleBjornEggsWrongChoice();
    return;
  }

  if (sceneState.activeDialogue === "ise") {
    await handleIseWrongChoice();
    return;
  }

  setChoiceTrayVisible(false);
  sceneState.interactionLocked = true;
  sceneState.wrongChoiceDisabled = true;
  updateSceneInputState();
  await showPlayerDialogue("Bread, milk, and apples?", "rei_breakfast_wrong", 2000);
  await showActorDialogue("rald", "No, that's not what I asked for.", "rald_breakfast_wrong", 1700);
  clearAllBubbles();
  renderChoiceState();
  setChoiceTrayVisible(true);
}

async function handleBjornCorrectChoice() {
  setChoiceTrayVisible(false);
  sceneState.interactionLocked = true;
  updateSceneInputState();
  await showPlayerDialogue("Rald told me to ask you about the bread.", "rei_bread_request", 2000);
  await showActorDialogue("bjorn", "Check the shelf by the wall. That's where we keep it.", "bjorn_bread_reply", 2500);
  clearAllBubbles();
  resetCameraFocus();
  await wait(720);
  const breadShelf = document.querySelector('[data-box-id="bread-shelf"]');
  if (breadShelf) {
    breadShelf.classList.add("is-highlighted");
  }
  sceneState.bjornBreadConversationDone = true;
  sceneState.boardInputEnabled = true;
  sceneState.interactionLocked = false;
  sceneState.conversationActive = false;
  sceneState.activeDialogue = null;
  updateSceneInputState();
}

async function handleBjornEggsCorrectChoice() {
  setChoiceTrayVisible(false);
  sceneState.interactionLocked = true;
  updateSceneInputState();
  await showPlayerDialogue("I need eggs for breakfast.", "rei_eggs_request", 2000);
  await showActorDialogue("bjorn", "Sure, just take it from the Egg shelf.", "bjorn_eggs_reply", 2500);
  clearAllBubbles();
  resetCameraFocus();
  await wait(720);
  
  // Bjorn stops glowing, Egg shelf starts glowing
  actorElements.get("bjorn")?.classList.remove("is-highlighted");
  const eggShelf = document.querySelector('[data-box-id="egg-shelf"]');
  if (eggShelf) eggShelf.classList.add("is-highlighted");
  
  sceneState.bjornEggsStarted = true;
  sceneState.boardInputEnabled = true;
  sceneState.interactionLocked = false;
  sceneState.conversationActive = false;
  sceneState.activeDialogue = null;
  updateSceneInputState();
}

async function handleBjornEggsWrongChoice() {
  setChoiceTrayVisible(false);
  sceneState.interactionLocked = true;
  sceneState.wrongChoiceDisabled = true;
  updateSceneInputState();
  await showPlayerDialogue("I need soap for cleaning.", "rei_bjorn_wrong_soap", 2000);
  await showActorDialogue("bjorn", "Hm, I don't have that for you.", "bjorn_soap_reply", 2200);
  clearAllBubbles();
  renderChoiceState();
  setChoiceTrayVisible(true);
  sceneState.interactionLocked = false;
  updateSceneInputState();
}

async function handleBjornWrongChoice() {
  setChoiceTrayVisible(false);
  sceneState.interactionLocked = true;
  sceneState.wrongChoiceDisabled = true;
  updateSceneInputState();
  await showPlayerDialogue("I'm looking for tea.", "rei_bjorn_wrong_tea", 2000);
  await showActorDialogue("bjorn", "I don't have it here.", "bjorn_bread_wrong_reply", 2200);
  clearAllBubbles();
  renderChoiceState();
  setChoiceTrayVisible(true);
  sceneState.interactionLocked = false;
  updateSceneInputState();
}

async function handleIseCorrectChoice() {
  setChoiceTrayVisible(false);
  sceneState.interactionLocked = true;
  updateSceneInputState();
  await showPlayerDialogue("Orange juice for breakfast.", "rei_ise_correct", 2000);
  await showActorDialogue("ise", "Got it. Here, take this.", "ise_correct_reply", 2500);
  clearAllBubbles();
  resetCameraFocus();
  await wait(720);
  playObtainSfx();
  showPlayerItemToken("Orange Juice");
  await wait(PLAYER_ITEM_DELAY_MS);
  clearPlayerItemToken();
  actorElements.get("ise")?.classList.remove("is-highlighted");
  actorElements.get("bjorn")?.classList.add("is-highlighted");
  sceneState.iseResolved = true;
  sceneState.boardInputEnabled = true;
  sceneState.interactionLocked = false;
  sceneState.conversationActive = false;
  sceneState.activeDialogue = null;
  updateSceneInputState();
  await showPromptBubble("bjorn");
}

async function handleIseWrongChoice() {
  setChoiceTrayVisible(false);
  sceneState.interactionLocked = true;
  sceneState.wrongChoiceDisabled = true;
  updateSceneInputState();
  await showPlayerDialogue("Tea for breakfast.", "rei_ise_wrong", 2000);
  await showActorDialogue("ise", "Not quite. That's not what Rald asked for.", "ise_wrong_reply", 2200);
  clearAllBubbles();
  renderChoiceState();
  setChoiceTrayVisible(true);
  sceneState.interactionLocked = false;
  updateSceneInputState();
}

async function handleEggShelfClick() {
  if (sceneState.eggObtained || !sceneState.bjornEggsStarted) return;

  // If spill is cleaned, just claim the egg
  if (sceneState.spillCleaned) {
    handleClaimEgg();
    return;
  }

  sceneState.interactionLocked = true;
  sceneState.boardInputEnabled = false;
  updateSceneInputState();

  // Try to walk first (blocked by spill)
  const target = { row: 1, column: 5 };
  const start = { row: playerState.row, column: playerState.column };
  const res = resolveDestination(start, target);
  if (res) await movePlayerAlong(res.path);

  // Zoom in on Rei
  setCameraFocus(playerState.row, playerState.column, 1.55);
  await wait(720);
  await showPlayerDialogue("I can't get past this spill.", "rei_spill_blocked", 2500);

  // Zoom in on Bjorn
  setBjornConversationCameraFocus();
  await wait(1000); // Wait 1 second after zoom
  await showActorDialogue("bjorn", "There's a mop in the cabinet.", "bjorn_mop_hint_1", 3000);
  await showActorDialogue("bjorn", "Use that to clean the spill.", "bjorn_mop_hint_2", 3000);
  clearAllBubbles();
  
  const eggShelf = document.querySelector('[data-box-id="egg-shelf"]');
  if (eggShelf) eggShelf.classList.remove("is-highlighted");
  
  resetCameraFocus();
  await wait(720);
  
  const cabinet = document.querySelector('[data-box-id="cabinet"]');
  sceneState.spillMissionTriggered = true;
  if (cabinet) {
    cabinet.classList.add("is-highlighted");
    cabinet.classList.add("placeholder-interactive");
  }
  
  sceneState.interactionLocked = false;
  sceneState.boardInputEnabled = true;
  updateSceneInputState();
}

async function handleBreadShelfClick() {
  if (sceneState.breadObtained || !sceneState.breakfastResolved || sceneState.bjornResolved) {
    return;
  }

  sceneState.interactionLocked = true;
  updateSceneInputState();

  const path = findShortestPath(
    { row: playerState.row, column: playerState.column },
    BREAD_SHELF_APPROACH_TILE
  );

  if (path) {
    await movePlayerAlong(path);
  }

  sceneState.breadObtained = true;
  sceneState.bjornResolved = true;
  const breadShelf = document.querySelector('[data-box-id="bread-shelf"]');
  if (breadShelf) {
    breadShelf.classList.remove("is-highlighted");
  }

  playObtainSfx();
  showPlayerItemToken("Bread");
  await wait(PLAYER_ITEM_DELAY_MS);
  clearPlayerItemToken();

  actorElements.get("bjorn")?.classList.remove("is-highlighted");
  actorElements.get("ise")?.classList.add("is-highlighted");

  sceneState.interactionLocked = false;
  sceneState.boardInputEnabled = true;
  updateSceneInputState();
  await showPromptBubble("ise");
}

async function handleCabinetClick() {
  if (sceneState.mopObtained || !sceneState.spillMissionTriggered) return;
  
  sceneState.interactionLocked = true;
  updateSceneInputState();
  
  const path = findShortestPath({row: playerState.row, column: playerState.column}, CABINET_TILE);
  if (path) await movePlayerAlong(path);
  
  const emojis = ["🍎", "📦", "🧹", "🧤", "🥣", "🥛"];
  emojiGrid.innerHTML = "";
  emojis.forEach(emoji => {
    const btn = document.createElement("button");
    btn.className = "emoji-button";
    btn.textContent = emoji;
    btn.onclick = () => handleEmojiClick(emoji, btn);
    emojiGrid.appendChild(btn);
  });
  
  modalOverlay.classList.add("is-visible");
  modalOverlay.hidden = false;
}

async function handleEmojiClick(emoji, btn) {
  if (emoji === "🧹") {
    modalOverlay.classList.remove("is-visible");
    await wait(300);
    modalOverlay.hidden = true;
    
    sceneState.mopObtained = true;
    const cabinet = document.querySelector('[data-box-id="cabinet"]');
    if (cabinet) {
      cabinet.classList.remove("is-highlighted");
      cabinet.classList.remove("placeholder-interactive");
    }

    // Zoom on Bjorn
    setBjornConversationCameraFocus();
    await wait(720);
    await showActorDialogue("bjorn", "That's the one.", "bjorn_mop_confirm", 2500);
    clearAllBubbles();
    resetCameraFocus();
    await wait(720);
    
    const spill = document.querySelector('[data-box-id="spill"]');
    if (spill) spill.classList.add("is-highlighted");
    
    sceneState.interactionLocked = false;
    updateSceneInputState();
  } else {
    // Wrong choice
    modalOverlay.classList.remove("is-visible");
    await wait(300);
    modalOverlay.hidden = true;
    
    await showActorDialogue("bjorn", "You need a mop.", "bjorn_need_mop", 2000);
    clearAllBubbles();
    
    btn.classList.add("is-wrong");
    btn.disabled = true;
    
    // Re-appear modal
    modalOverlay.hidden = false;
    void modalOverlay.offsetWidth;
    modalOverlay.classList.add("is-visible");
  }
}

async function handleSpillClick() {
  if (sceneState.spillCleaned || !sceneState.mopObtained) return;

  sceneState.interactionLocked = true;
  updateSceneInputState();

  const path = findShortestPath({row: playerState.row, column: playerState.column}, SPILL_APPROACH_TILE);
  if (path) await movePlayerAlong(path);

  // Start cleaning animation
  clearAllBubbles();
  cleaningProgressWrap.hidden = false;
  progressBarFill.style.width = "0%";

  const duration = CLEANING_DURATION_MS;
  const startTime = Date.now();

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      progressBarFill.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        finishCleaning().then(resolve);
      }
    }, 50);
  });
}

async function finishCleaning() {
  cleaningProgressWrap.hidden = true;
  progressBarFill.style.width = "0%";
  sceneState.spillCleaned = true;
  const spillPlaceholder = placeholders.find(({ id }) => id === "spill");
  const spillElement = document.querySelector('[data-box-id="spill"]');

  if (spillPlaceholder) {
    spillPlaceholder.removed = true;
  }

  if (spillElement) spillElement.remove();
  
  buildColliderMap();
  
  // Bjorn dialogue triggers
  setBjornConversationCameraFocus();
  await wait(1000); // Wait 1 second after zoom
  await showActorDialogue("bjorn", "You can now get the egg.", "bjorn_egg_access", 3000);
  clearAllBubbles();
  resetCameraFocus();
  await wait(720);
  
  const eggShelf = document.querySelector('[data-box-id="egg-shelf"]');
  if (eggShelf) eggShelf.classList.add("is-highlighted");
  
  sceneState.interactionLocked = false;
  updateSceneInputState();
}
async function handleClaimEgg() {
  if (sceneState.eggObtained || !sceneState.spillCleaned) return;
  
  sceneState.interactionLocked = true;
  updateSceneInputState();
  
  const approachMove = resolveDestination(
    { row: playerState.row, column: playerState.column },
    { row: 1, column: 5 }
  );

  if (approachMove?.path) {
    await movePlayerAlong(approachMove.path);
  }
  
  sceneState.eggObtained = true;
  const eggShelf = document.querySelector('[data-box-id="egg-shelf"]');
  if (eggShelf) eggShelf.classList.remove("is-highlighted");
  
  playObtainSfx();
  showPlayerItemToken("Eggs");
  await wait(2000);
  clearPlayerItemToken();
  
  actorElements.get("bjorn")?.classList.remove("is-highlighted");
  actorElements.get("rald")?.classList.add("is-highlighted");
  
  sceneState.interactionLocked = false;
  updateSceneInputState();
  await showPromptBubble("rald");
}

async function handleFinalRaldConversation() {
  if (!sceneState.eggObtained) {
    handleResolvedRaldReminder();
    return;
  }
  
  sceneState.interactionLocked = true;
  sceneState.boardInputEnabled = false;
  updateSceneInputState();
  
  const path = findShortestPath({row: playerState.row, column: playerState.column}, FINAL_RALD_TILE);
  if (path) await movePlayerAlong(path);
  
  setConversationCameraFocus();
  await wait(720);
  
  await showPlayerDialogue("I got everything.", "rei_final_report", 3000);
  await showActorDialogue("rald", "Perfect. Now we can make breakfast.", "rald_final_reply", 3000);
  clearAllBubbles();
  
  playGameCompleteSfx();
  congratsModal.hidden = false;
  congratsModal.classList.add("is-visible");
}

async function startBreakfastConversation() {
  if (sceneState.conversationActive) {
    return;
  }

  sceneState.interactionLocked = true;
  sceneState.boardInputEnabled = false;
  updateSceneInputState();
  clearAllBubbles();

  const pathToRald = findShortestPath(
    { row: playerState.row, column: playerState.column },
    RALD_CONVERSATION_TILE
  );

  if (pathToRald) {
    await movePlayerAlong(pathToRald);
  }

  sceneState.conversationActive = true;
  sceneState.activeDialogue = "breakfast";
  setConversationCameraFocus();
  await wait(720);
  setChoiceTrayVisible(false);
  await showActorDialogue("rald", "Rei can you help me make breakfast?", "rald_intro_1", CHOICE_DELAY_MS);
  await showActorDialogue("rald", "I need bread, eggs, and orange.", "rald_intro_2", CHOICE_DELAY_MS);
  renderChoiceState();
  setChoiceTrayVisible(true);
  sceneState.interactionLocked = false;
  updateSceneInputState();
}

async function playSceneIntro() {
  sceneState.boardInputEnabled = false;
  sceneState.interactionLocked = true;
  updateSceneInputState();
  setCameraFocus(playerState.row, playerState.column, 1.55);
  await wait(SCENE_INTRO_MS);
  resetCameraFocus();
  await wait(720);
  actorElements.get("rald")?.classList.add("is-highlighted");
  await showPromptBubble("rald");
  sceneState.interactionLocked = false;
  updateSceneInputState();
}

async function handleResolvedRaldReminder() {
  if (sceneState.conversationActive) {
    return;
  }

  sceneState.interactionLocked = true;
  sceneState.boardInputEnabled = false;
  updateSceneInputState();
  clearAllBubbles();

  const pathToRald = findShortestPath(
    { row: playerState.row, column: playerState.column },
    RALD_CONVERSATION_TILE
  );

  if (pathToRald) {
    await movePlayerAlong(pathToRald);
  }

  await showActorDialogue("rald", RALD_REMINDER_COPY, "rald_reminder", REMINDER_BUBBLE_DELAY_MS);
  clearAllBubbles();
  sceneState.boardInputEnabled = true;
  sceneState.interactionLocked = false;
  updateSceneInputState();
}

async function startBjornConversation() {
  if (sceneState.conversationActive) return;

  if (sceneState.bjornBreadConversationDone && !sceneState.bjornResolved) {
    return;
  }
  
  if (sceneState.bjornResolved && !sceneState.iseResolved) {
    await showActorDialogue("bjorn", "Talk to Isei for the drinks.", "bjorn_talk_to_isei", 3000);
    clearAllBubbles();
    return;
  }
  
  if (sceneState.bjornResolved && sceneState.iseResolved && sceneState.bjornEggsStarted) {
    return;
  }

  sceneState.interactionLocked = true;
  sceneState.boardInputEnabled = false;
  updateSceneInputState();
  clearAllBubbles();

  const pathToBjorn = findShortestPath(
    { row: playerState.row, column: playerState.column },
    BJORN_CONVERSATION_TILE
  );

  if (pathToBjorn) {
    await movePlayerAlong(pathToBjorn);
  }

  sceneState.conversationActive = true;
  sceneState.activeDialogue = sceneState.iseResolved ? "bjorn_eggs" : "bjorn_bread";
  sceneState.wrongChoiceDisabled = false;
  setBjornConversationCameraFocus();
  await wait(720);
  setChoiceTrayVisible(false);
  await showActorDialogue(
    "bjorn",
    sceneState.iseResolved ? "Looking for something, Rei?" : "Need something, Rei?",
    sceneState.iseResolved ? "bjorn_open_eggs" : "bjorn_open_bread",
    CHOICE_DELAY_MS
  );
  renderChoiceState();
  setChoiceTrayVisible(true);
  sceneState.interactionLocked = false;
  updateSceneInputState();
}

async function startIseConversation() {
  if (sceneState.conversationActive || sceneState.iseResolved) {
    return;
  }

  sceneState.interactionLocked = true;
  sceneState.boardInputEnabled = false;
  updateSceneInputState();
  clearAllBubbles();

  const pathToIse = findShortestPath(
    { row: playerState.row, column: playerState.column },
    ISE_CONVERSATION_TILE
  );

  if (pathToIse) {
    await movePlayerAlong(pathToIse);
  }

  sceneState.conversationActive = true;
  sceneState.activeDialogue = "ise";
  sceneState.wrongChoiceDisabled = false;
  setCameraFocus(ISE_CONVERSATION_CAMERA_FOCUS.row, ISE_CONVERSATION_CAMERA_FOCUS.column, ISE_CONVERSATION_CAMERA_FOCUS.scale);
  await wait(720);
  setChoiceTrayVisible(false);
  await showActorDialogue("ise", "Rei, what do you need?", "ise_open", CHOICE_DELAY_MS);
  renderChoiceState();
  setChoiceTrayVisible(true);
  sceneState.interactionLocked = false;
  updateSceneInputState();
}

function handleActorClick(event) {
  const actorElement = event.target.closest(".placeholder-interactive");

  if (!actorElement || sceneState.interactionLocked) {
    return;
  }

  if (actorElement.dataset.actorId === "rald") {
    if (sceneState.breakfastResolved) {
      handleFinalRaldConversation();
      return;
    }

    startBreakfastConversation();
    return;
  }

  if (actorElement.dataset.actorId === "bjorn" && sceneState.breakfastResolved) {
    startBjornConversation();
    return;
  }

  if (actorElement.dataset.actorId === "ise" && sceneState.bjornResolved) {
    startIseConversation();
    return;
  }
  
  if (actorElement.dataset.boxId === "egg-shelf") {
    handleEggShelfClick();
    return;
  }

  if (actorElement.dataset.boxId === "bread-shelf") {
    handleBreadShelfClick();
    return;
  }
  
  if (actorElement.dataset.boxId === "cabinet") {
    handleCabinetClick();
    return;
  }
  
  if (actorElement.dataset.boxId === "spill") {
    handleSpillClick();
    return;
  }
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
  const assetFragment = document.createDocumentFragment();
  const npcFragment = document.createDocumentFragment();
  const floorFragment = document.createDocumentFragment();

  placeholders.forEach((placeholder) => {
    const element = createPlaceholder(placeholder);
    if (placeholder.id === "cabinet-left") {
      floorFragment.appendChild(element);
      return;
    }

    if (placeholder.type === "human") {
      npcFragment.appendChild(element);
      return;
    }

    assetFragment.appendChild(element);
  });

  floorLayerElement?.appendChild(floorFragment);
  npcLayerElement?.appendChild(npcFragment);
  assetLayerElement.appendChild(assetFragment);
}

function initializePlayer() {
  if (!isWalkable(playerState.row, playerState.column)) {
    return;
  }

  const playerImagePath = ACTOR_IMAGE_CONFIG.player?.src;
  if (playerImagePath) {
    let imageElement = playerElement.querySelector(".player-image");
    if (!imageElement) {
      imageElement = document.createElement("img");
      imageElement.className = "player-image";
      imageElement.alt = "";
      imageElement.draggable = false;
      playerElement.prepend(imageElement);
    }

    imageElement.src = playerImagePath;
    playerElement.classList.add("has-player-image");
  }

  playerElement.dataset.actorId = "player";
  playerElement.setAttribute("aria-label", PLAYER_LABEL);
  cleaningProgressWrap.hidden = true;
  progressBarFill.style.width = "0%";
  renderPlayer();
}

buildGrid();
buildColliderMap();
buildPlaceholders();
initializePlayer();
renderChoiceState();
updateSceneInputState();

gridElement.addEventListener("click", (event) => {
  handleTileClick(event);
});

gameScreenElement?.addEventListener("click", () => {
  playClickSfx();
}, true);

assetLayerElement.addEventListener("click", (event) => {
  handleActorClick(event);
});

npcLayerElement?.addEventListener("click", (event) => {
  handleActorClick(event);
});

choiceAElement.addEventListener("click", () => {
  handleCorrectChoice();
});

choiceBElement.addEventListener("click", () => {
  if (!sceneState.wrongChoiceDisabled) {
    handleWrongChoice();
  }
});

bgMusicToggleElement?.addEventListener("click", () => {
  toggleBackgroundMusic();
});

modalClose.onclick = () => {
  modalOverlay.classList.remove("is-visible");
  setTimeout(() => modalOverlay.hidden = true, 300);
  sceneState.interactionLocked = false;
  updateSceneInputState();
};

resetButton.onclick = () => {
  window.location.reload();
};

async function startGame() {
  await preloadAssets();
  initializeBackgroundMusic();
  initializeClickSfx();
  await hideLoadingScreen();
  playSceneIntro();
}

startGame();
