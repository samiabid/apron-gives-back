const actions = [
  {
    id: "hedgerow",
    name: "Plant native hedgerows",
    tag: "Habitat",
    nature: "Safe corridors for birds and pollinators.",
    people: "Quieter edges make the farm feel calmer and more sheltered.",
    captionNature: "Shelter arrives: birds, bees, and butterflies can move through the farm.",
    captionPeople: "For people, those living edges create a calmer place to walk, volunteer, and breathe.",
    returnToken: {
      label: "Calm",
      text: "Sheltered edges make outdoor time feel calmer and less exposed.",
      x: 26,
      y: 42
    },
    impact: { biodiversity: 24, climate: 10, wellbeing: 8 },
    icon: `<path d="M6 20c0-6 3-10 6-14 3 4 6 8 6 14"/><path d="M12 20V6"/><path d="M8 12h8"/>`
  },
  {
    id: "wildflowers",
    name: "Sow pollinator meadows",
    tag: "Wildlife",
    nature: "Colour, nectar, and more life underfoot.",
    people: "Colour and seasonal change lift mood and invite curiosity.",
    captionNature: "A meadow opens up: tiny visitors turn the field into a living network.",
    captionPeople: "For people, colour, scent, and movement make the farm feel restorative.",
    returnToken: {
      label: "Wonder",
      text: "Colour and movement invite curiosity, conversation, and attention.",
      x: 21,
      y: 67
    },
    impact: { biodiversity: 28, climate: 6, wellbeing: 13 },
    icon: `<circle cx="12" cy="8" r="2"/><path d="M12 10v10"/><path d="M8 12c-3 0-4-2-4-4 3 0 5 1 6 4"/><path d="M16 12c3 0 4-2 4-4-3 0-5 1-6 4"/>`
  },
  {
    id: "pond",
    name: "Create a wildlife pond",
    tag: "Water",
    nature: "Water for dry spells and new habitats.",
    people: "A cooler, reflective spot gives visitors a place to pause.",
    captionNature: "Water settles in: frogs, insects, and thirsty roots get a refuge.",
    captionPeople: "For people, water brings coolness, stillness, and a reason to slow down.",
    returnToken: {
      label: "Pause",
      text: "A reflective water spot gives visitors somewhere to slow down.",
      x: 78,
      y: 70
    },
    impact: { biodiversity: 18, climate: 24, wellbeing: 9 },
    icon: `<path d="M4 14c2-5 5-8 8-8s6 3 8 8"/><path d="M5 15c4 3 10 3 14 0"/><path d="M8 18h8"/>`
  },
  {
    id: "compost",
    name: "Build a compost cycle",
    tag: "Soil",
    nature: "Waste becomes soil, soil becomes food.",
    people: "Hands-on growing builds skills, agency, and confidence.",
    captionNature: "Nothing useful leaves the loop: scraps turn into richer soil.",
    captionPeople: "For people, learning the cycle turns climate care into something practical and hopeful.",
    returnToken: {
      label: "Agency",
      text: "Learning composting turns climate care into a practical skill.",
      x: 18,
      y: 78
    },
    impact: { biodiversity: 9, climate: 22, wellbeing: 8 },
    icon: `<path d="M7 7h10v12H7z"/><path d="M9 7V5h6v2"/><path d="M9 11h6"/><path d="M9 15h6"/>`
  },
  {
    id: "growing-beds",
    name: "Grow shared food beds",
    tag: "Food",
    nature: "Seasonal food connects soil, water, and wildlife.",
    people: "Shared harvests build belonging and food confidence.",
    captionNature: "Food starts growing close to home: care becomes visible, edible, and shared.",
    captionPeople: "For people, growing and sharing food turns the farm into a place of belonging.",
    returnToken: {
      label: "Belonging",
      text: "Shared harvests create reasons to gather, cook, and connect.",
      x: 51,
      y: 76
    },
    impact: { biodiversity: 9, climate: 14, wellbeing: 26 },
    icon: `<path d="M5 18h14"/><path d="M8 18V9"/><path d="M12 18V6"/><path d="M16 18v-8"/><path d="M8 9c-2 0-3-1-4-3 3 0 4 1 4 3"/><path d="M12 6c2 0 3-1 4-3-3 0-4 1-4 3"/>`
  },
  {
    id: "volunteer-hub",
    name: "Open a volunteer hub",
    tag: "People",
    nature: "More hands mean more care for the land.",
    people: "People learn, rest, connect, and build confidence.",
    captionNature: "More volunteers means more regular care for habitats, food beds, and soil.",
    captionPeople: "For people, the farm becomes social infrastructure: somewhere useful to belong.",
    returnToken: {
      label: "Confidence",
      text: "A welcoming hub helps people learn, rest, and feel useful.",
      x: 73,
      y: 53
    },
    impact: { biodiversity: 6, climate: 8, wellbeing: 32 },
    icon: `<path d="M4 11l8-6 8 6"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>`
  },
  {
    id: "rain-garden",
    name: "Shape rain gardens",
    tag: "Climate",
    nature: "Slower runoff, cooler days, healthier roots.",
    people: "Less flooding and heat stress make the space safer to use.",
    captionNature: "Rain is held where it falls: the farm becomes calmer in heat and heavy weather.",
    captionPeople: "For people, that resilience means safer paths, cooler visits, and less climate anxiety.",
    returnToken: {
      label: "Relief",
      text: "Cooler, safer paths reduce heat stress and flood worry.",
      x: 86,
      y: 82
    },
    impact: { biodiversity: 10, climate: 30, wellbeing: 10 },
    icon: `<path d="M7 14c0-4 5-9 5-9s5 5 5 9a5 5 0 0 1-10 0z"/><path d="M5 20h14"/>`
  }
];

const selected = new Set();
const scores = { biodiversity: 0, climate: 0, wellbeing: 0 };
const actionList = document.querySelector("#actions");
const farm = document.querySelector("#farm");
const caption = document.querySelector("#caption");
const resultTitle = document.querySelector("#result-title");
const resultCopy = document.querySelector("#result-copy");
const resetButton = document.querySelector("#reset");
const gameState = document.querySelector("#game-state");
const turnPill = document.querySelector("#turn-pill");
const restoredCount = document.querySelector("#restored-count");
const progressBar = document.querySelector("#progress-bar");
const tokenLayer = document.querySelector("#return-tokens");
const returnsCount = document.querySelector("#returns-count");
const returnNote = document.querySelector("#return-note");
const collectedReturns = new Set();

function renderCaption(action) {
  caption.replaceChildren();
  [
    ["Nature", action.captionNature],
    ["People", `${action.captionPeople} Click "${action.returnToken.label}" to collect that return.`]
  ].forEach(([label, text]) => {
    const line = document.createElement("span");
    const strong = document.createElement("strong");
    strong.textContent = `${label}:`;
    line.append(strong, ` ${text}`);
    caption.append(line);
  });
}

function renderActions() {
  actionList.innerHTML = actions
    .map(
      (action) => `
        <button class="action-card" type="button" data-action="${action.id}">
          <span class="action-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${action.icon}</svg></span>
          <span>
            <span class="action-name">${action.name}</span>
            <span class="action-effect"><strong>Nature</strong> ${action.nature}</span>
            <span class="action-effect"><strong>People</strong> ${action.people}</span>
          </span>
          <span class="action-tag">${action.tag}</span>
        </button>
      `
    )
    .join("");
}

function clampScore(value) {
  return Math.min(100, value);
}

function updateScoreboard() {
  Object.entries(scores).forEach(([key, value]) => {
    const score = clampScore(value);
    document.querySelector(`#${key}-value`).textContent = `${score}%`;
    document.querySelector(`#${key}-bar`).style.width = `${score}%`;
  });

  const total = scores.biodiversity + scores.climate + scores.wellbeing;
  const chosen = selected.size;
  const peopleVisible = selected.has("volunteer-hub") || selected.has("growing-beds") || chosen >= 4;
  farm.dataset.people = String(peopleVisible);
  gameState.textContent = `${chosen} of ${actions.length} layers restored`;
  turnPill.textContent = chosen === 0 ? "Start anywhere" : chosen < actions.length ? "Keep restoring" : "Farm alive";
  restoredCount.textContent = `${chosen}/${actions.length} restored`;
  progressBar.style.width = `${(chosen / actions.length) * 100}%`;
  returnsCount.textContent = `${collectedReturns.size} human return${collectedReturns.size === 1 ? "" : "s"} collected`;

  if (chosen === 0) {
    resultTitle.textContent = "A quiet field is waiting.";
    resultCopy.textContent = "Each layer you add shows how regenerative farming can give back to nature and people.";
    return;
  }

  if (chosen < 4) {
    resultTitle.textContent = `${chosen} layer${chosen === 1 ? "" : "s"} of return`;
    resultCopy.textContent = "The field is starting to work as a system: habitat, water, food, and human connection reinforce each other.";
    return;
  }

  if (total < 230) {
    resultTitle.textContent = "A farm with momentum";
    resultCopy.textContent = "Your design is already helping wildlife recover, softening climate stress, and creating reasons for people to gather.";
    return;
  }

  resultTitle.textContent = "A living community farm";
  resultCopy.textContent = "This is the promise of Apron Community Farm: nature restored, resilience grown locally, and wellbeing rooted in shared work.";
}

function chooseAction(action) {
  if (selected.has(action.id)) return;
  selected.add(action.id);
  farm.setAttribute(`data-has-${action.id}`, "true");
  renderCaption(action);

  Object.entries(action.impact).forEach(([key, value]) => {
    scores[key] = clampScore(scores[key] + value);
  });

  const button = document.querySelector(`[data-action="${action.id}"]`);
  button.disabled = true;
  button.setAttribute("aria-pressed", "true");
  button.querySelector(".action-tag").textContent = "Done";
  caption.classList.remove("is-new");
  farm.classList.remove("is-celebrating");
  window.requestAnimationFrame(() => {
    caption.classList.add("is-new");
    farm.classList.add("is-celebrating");
  });
  updateScoreboard();
  createReturnToken(action);
}

function resetGame() {
  selected.clear();
  collectedReturns.clear();
  tokenLayer.replaceChildren();
  Object.keys(scores).forEach((key) => {
    scores[key] = 0;
  });
  actions.forEach((action) => {
    farm.setAttribute(`data-has-${action.id}`, "false");
  });
  farm.dataset.people = "false";
  document.querySelectorAll(".action-card").forEach((button) => {
    const action = actions.find((item) => item.id === button.dataset.action);
    button.disabled = false;
    button.setAttribute("aria-pressed", "false");
    button.querySelector(".action-tag").textContent = action.tag;
  });
  caption.textContent = "Pick an action on the left";
  returnNote.textContent = "Restore the farm, then click the glowing wellbeing returns that appear in the scene.";
  caption.classList.remove("is-new");
  farm.classList.remove("is-celebrating");
  updateScoreboard();
}

function createReturnToken(action) {
  const token = document.createElement("button");
  token.type = "button";
  token.className = "return-token";
  token.dataset.action = action.id;
  token.style.left = `${action.returnToken.x}%`;
  token.style.top = `${action.returnToken.y}%`;
  token.innerHTML = `<span>${action.returnToken.label}</span>`;
  token.setAttribute("aria-label", `Collect human return: ${action.returnToken.label}`);
  tokenLayer.append(token);
}

renderActions();
updateScoreboard();

actionList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = actions.find((item) => item.id === button.dataset.action);
  chooseAction(action);
});

resetButton.addEventListener("click", resetGame);

tokenLayer.addEventListener("click", (event) => {
  const token = event.target.closest(".return-token");
  if (!token || collectedReturns.has(token.dataset.action)) return;
  const action = actions.find((item) => item.id === token.dataset.action);
  collectedReturns.add(action.id);
  token.classList.add("is-collected");
  token.disabled = true;
  returnNote.textContent = action.returnToken.text;
  updateScoreboard();
  window.setTimeout(() => token.remove(), 560);
});
