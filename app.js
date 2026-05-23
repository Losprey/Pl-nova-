const storageKey = "domaci-rytmus-meal-plans-v2";
const shoppingStorageKey = "domaci-rytmus-shopping-v1";
const tasksStorageKey = "domaci-rytmus-tasks-v1";
const settingsStorageKey = "domaci-rytmus-settings-v1";
const checkinsStorageKey = "domaci-rytmus-checkins-v1";
const notesStorageKey = "domaci-rytmus-notes-v1";
const rhythmStorageKey = "domaci-rytmus-rhythm-v1";
const favoritesStorageKey = "domaci-rytmus-favorites-v1";

const mealTypes = [
  { key: "breakfast", label: "Raňajky", icon: "🌅" },
  { key: "snack", label: "Desiata", icon: "🍎" },
  { key: "lunch", label: "Obed", icon: "🍽️" },
  { key: "afternoon", label: "Olovrant", icon: "🧁" },
  { key: "dinner", label: "Večera", icon: "🌙" },
];

const starterPlans = {
  kids: {
    current: {
      label: "Tento týždeň",
      range: "6. apríla - 12. apríla",
      days: [
        ["Pondelok, 6. apríla", ["Ovsená kaša", "Jablko", "Kuracie rizoto", "Jogurt s ovocím", "Zeleninová polievka"]],
        ["Utorok, 7. apríla", ["Chlieb s nátierkou", "Banán", "Cestoviny so syrom", "Tvaroh", "Palacinky s džemom"]],
        ["Streda, 8. apríla", ["Krupicová kaša", "Hruška", "Morčacie guľky", "Kukuričné chrumky", "Toast so zeleninou"]],
      ],
    },
    next: {
      label: "Budúci týždeň",
      range: "13. apríla - 19. apríla",
      days: [
        ["Pondelok, 13. apríla", ["Chlebík vo vajíčku s avokádom a ovocím", "Kapsička", "Tvarohové guľky", "Výživa s jogurtom", "Kukuričná polievka"]],
        ["Utorok, 14. apríla", ["Kaša", "Ovocie", "Spaghetti Bolognese", "Termix", "Pečené zemiaky s hráškom"]],
        ["Streda, 15. apríla", ["Jogurt s granolou", "Mrkvové tyčinky", "Ryža s kuracím mäsom", "Banánový chlebík", "Paradajková polievka"]],
        ["Štvrtok, 16. apríla", ["Rožok s maslom", "Kapsička", "Losos so zemiakmi", "Ovocný šalát", "Cestoviny s pestom"]],
      ],
    },
  },
  adults: {
    current: {
      label: "Tento týždeň",
      range: "6. apríla - 12. apríla",
      days: [
        ["Pondelok, 6. apríla", ["Vajíčka so špenátom", "Proteínový jogurt", "Kuracie kari", "Orechy", "Šalát s tuniakom"]],
        ["Utorok, 7. apríla", ["Avokádový toast", "Smoothie", "Hovädzí vývar", "Tvaroh", "Rizoto s hubami"]],
      ],
    },
    next: {
      label: "Budúci týždeň",
      range: "13. apríla - 19. apríla",
      days: [
        ["Pondelok, 13. apríla", ["Omeleta s avokádom", "Skyr s malinami", "Morčací steak s batatmi", "Hummus so zeleninou", "Tekvicová polievka"]],
        ["Utorok, 14. apríla", ["Overnight oats", "Jablko s arašidovým maslom", "Spaghetti Bolognese", "Cottage cheese", "Grilovaná zelenina s quinoou"]],
        ["Streda, 15. apríla", ["Ražný chlieb s lososom", "Hruška", "Cícerové kari", "Kefír", "Kurací šalát"]],
      ],
    },
  },
};

const starterTasks = {
  kids: {
    current: [
      { id: "starter:kids:current:1", title: "Nachystať desiatové boxy", priority: "high", due: "", done: false },
      { id: "starter:kids:current:2", title: "Skontrolovať pitný režim", priority: "normal", due: "", done: false },
      { id: "starter:kids:current:3", title: "Doplniť ovocie do zásoby", priority: "low", due: "", done: true },
    ],
    next: [
      { id: "starter:kids:next:1", title: "Vybrať jedlá na budúci týždeň", priority: "high", due: "", done: false },
      { id: "starter:kids:next:2", title: "Pripraviť nákup podľa jedálnička", priority: "normal", due: "", done: false },
      { id: "starter:kids:next:3", title: "Skontrolovať školské desiaty", priority: "normal", due: "", done: false },
    ],
  },
  adults: {
    current: [
      { id: "starter:adults:current:1", title: "Navariť základ na dva obedy", priority: "high", due: "", done: false },
      { id: "starter:adults:current:2", title: "Doplniť proteínové snacky", priority: "normal", due: "", done: false },
    ],
    next: [
      { id: "starter:adults:next:1", title: "Naplánovať obedové porcie", priority: "high", due: "", done: false },
      { id: "starter:adults:next:2", title: "Skontrolovať zásoby v špajzi", priority: "normal", due: "", done: false },
      { id: "starter:adults:next:3", title: "Pripraviť večere po tréningu", priority: "low", due: "", done: false },
    ],
  },
};

const state = {
  audience: "kids",
  week: "next",
  plans: loadPlans(),
  shopping: loadShoppingState(),
  tasks: loadTasksState(),
  settings: loadSettingsState(),
  checkins: loadCheckinsState(),
  notes: loadNotesState(),
  rhythm: loadRhythmState(),
  favorites: loadFavoritesState(),
  activeTab: "home",
};

const mealPlan = document.querySelector("#mealPlan");
const weekLabel = document.querySelector("#weekLabel");
const weekRange = document.querySelector("#weekRange");
const mealDialog = document.querySelector("#mealDialog");
const mealForm = document.querySelector("#mealForm");
const mealDay = document.querySelector("#mealDay");
const mealType = document.querySelector("#mealType");
const mealName = document.querySelector("#mealName");
const editDayIndex = document.querySelector("#editDayIndex");
const editMealIndex = document.querySelector("#editMealIndex");
const formMode = document.querySelector("#formMode");
const formTitle = document.querySelector("#formTitle");
const shoppingList = document.querySelector("#shoppingList");
const shoppingForm = document.querySelector("#shoppingForm");
const shoppingName = document.querySelector("#shoppingName");
const shoppingCount = document.querySelector("#shoppingCount");
const shoppingBadge = document.querySelector("#shoppingBadge");
const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskPriority = document.querySelector("#taskPriority");
const taskDue = document.querySelector("#taskDue");
const taskList = document.querySelector("#taskList");
const tasksCount = document.querySelector("#tasksCount");
const tasksBadge = document.querySelector("#tasksBadge");
const homeEyebrow = document.querySelector("#homeEyebrow");
const homeTitle = document.querySelector("#homeTitle");
const homeAudience = document.querySelector("#homeAudience");
const homeMealsCount = document.querySelector("#homeMealsCount");
const homeTasksCount = document.querySelector("#homeTasksCount");
const homeShoppingCount = document.querySelector("#homeShoppingCount");
const homeMealsHint = document.querySelector("#homeMealsHint");
const homeTasksHint = document.querySelector("#homeTasksHint");
const homeShoppingHint = document.querySelector("#homeShoppingHint");
const homeMealsList = document.querySelector("#homeMealsList");
const homeTasksList = document.querySelector("#homeTasksList");
const homeShoppingList = document.querySelector("#homeShoppingList");
const homeFavoritesList = document.querySelector("#homeFavoritesList");
const homeTodayLabel = document.querySelector("#homeTodayLabel");
const homeTodayTitle = document.querySelector("#homeTodayTitle");
const homeTodayDetail = document.querySelector("#homeTodayDetail");
const homeFocusIcon = document.querySelector("#homeFocusIcon");
const homeFocusLabel = document.querySelector("#homeFocusLabel");
const homeFocusTitle = document.querySelector("#homeFocusTitle");
const homeFocusDetail = document.querySelector("#homeFocusDetail");
const homeFocusButton = document.querySelector("#homeFocusButton");
const homeActionList = document.querySelector("#homeActionList");
const homeMealVisualValue = document.querySelector("#homeMealVisualValue");
const homeTaskVisualValue = document.querySelector("#homeTaskVisualValue");
const homeShoppingVisualValue = document.querySelector("#homeShoppingVisualValue");
const homeMealMeter = document.querySelector("#homeMealMeter");
const homeTaskMeter = document.querySelector("#homeTaskMeter");
const homeShoppingMeter = document.querySelector("#homeShoppingMeter");
const favoriteQuickList = document.querySelector("#favoriteQuickList");
const favoriteLibraryCount = document.querySelector("#favoriteLibraryCount");
const checkinMessage = document.querySelector("#checkinMessage");
const moodButtons = document.querySelectorAll("[data-mood]");
const rhythmButtons = document.querySelectorAll("[data-rhythm]");
const dailyNote = document.querySelector("#dailyNote");
const themeToggle = document.querySelector("#themeToggle");
const densityToggle = document.querySelector("#densityToggle");
const exportDataButton = document.querySelector("#exportDataButton");
const importDataButton = document.querySelector("#importDataButton");
const importDataInput = document.querySelector("#importDataInput");
const resetAllButton = document.querySelector("#resetAllButton");
const settingsStatus = document.querySelector("#settingsStatus");
const toast = document.querySelector("#toast");
const placeholderEyebrow = document.querySelector("#placeholderEyebrow");
const placeholderTitle = document.querySelector("#placeholderTitle");

const ingredientRules = [
  { match: ["chleb", "toast", "rožok"], items: [["Pečivo", "Pečivo"], ["Maslo", "Mliečne"]] },
  { match: ["vajíč", "omeleta"], items: [["Vajcia", "Mliečne"]] },
  { match: ["avokád"], items: [["Avokádo", "Ovocie a zelenina"]] },
  { match: ["ovoc", "jablko", "hruška", "banán", "malin"], items: [["Ovocie", "Ovocie a zelenina"]] },
  { match: ["kapsič"], items: [["Ovocné kapsičky", "Detské"]] },
  { match: ["tvaroh", "cottage"], items: [["Tvaroh", "Mliečne"]] },
  { match: ["jogurt", "skyr", "kefír", "termix"], items: [["Jogurty a mliečne", "Mliečne"]] },
  { match: ["kaša", "oats"], items: [["Ovsené vločky", "Suché potraviny"], ["Mlieko", "Mliečne"]] },
  { match: ["spaghetti", "cestoviny"], items: [["Cestoviny", "Suché potraviny"], ["Paradajkový základ", "Konzervy a omáčky"]] },
  { match: ["bolognese"], items: [["Mleté mäso", "Mäso a ryby"]] },
  { match: ["kurac", "morčac"], items: [["Hydina", "Mäso a ryby"]] },
  { match: ["ryža", "rizoto"], items: [["Ryža", "Suché potraviny"]] },
  { match: ["zemiak"], items: [["Zemiaky", "Ovocie a zelenina"]] },
  { match: ["polievka", "vývar"], items: [["Zelenina do polievky", "Ovocie a zelenina"]] },
  { match: ["losos", "tuniak"], items: [["Ryba", "Mäso a ryby"]] },
  { match: ["šalát", "zelenin", "mrkv"], items: [["Zelenina", "Ovocie a zelenina"]] },
  { match: ["hummus", "cícer"], items: [["Cícer", "Konzervy a omáčky"]] },
  { match: ["orechy"], items: [["Orechy", "Suché potraviny"]] },
  { match: ["palacinky"], items: [["Múka", "Suché potraviny"], ["Vajcia", "Mliečne"], ["Mlieko", "Mliečne"]] },
];

const shoppingCategoryOrder = [
  "Ovocie a zelenina",
  "Pečivo",
  "Mliečne",
  "Mäso a ryby",
  "Suché potraviny",
  "Konzervy a omáčky",
  "Detské",
  "Ostatné",
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizePlans(source) {
  const copy = clone(source);

  Object.values(copy).forEach((audience) => {
    Object.values(audience).forEach((week) => {
      week.days = week.days.map(([name, meals]) => ({
        name,
        meals: meals.map((meal, index) => (
          typeof meal === "string"
            ? { typeKey: mealTypes[index]?.key || "dinner", name: meal }
            : meal
        )),
      }));
    });
  });

  return copy;
}

function loadPlans() {
  const fallback = normalizePlans(starterPlans);

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    return stored || fallback;
  } catch {
    return fallback;
  }
}

function loadShoppingState() {
  try {
    return JSON.parse(localStorage.getItem(shoppingStorageKey)) || { checked: {}, manual: {} };
  } catch {
    return { checked: {}, manual: {} };
  }
}

function loadTasksState() {
  const fallback = clone(starterTasks);

  try {
    return JSON.parse(localStorage.getItem(tasksStorageKey)) || fallback;
  } catch {
    return fallback;
  }
}

function loadSettingsState() {
  const fallback = { theme: "dark", density: "compact" };

  try {
    return { ...fallback, ...(JSON.parse(localStorage.getItem(settingsStorageKey)) || {}) };
  } catch {
    return fallback;
  }
}

function loadCheckinsState() {
  try {
    return JSON.parse(localStorage.getItem(checkinsStorageKey)) || {};
  } catch {
    return {};
  }
}

function loadNotesState() {
  try {
    return JSON.parse(localStorage.getItem(notesStorageKey)) || {};
  } catch {
    return {};
  }
}

function loadRhythmState() {
  try {
    return JSON.parse(localStorage.getItem(rhythmStorageKey)) || {};
  } catch {
    return {};
  }
}

function loadFavoritesState() {
  try {
    return JSON.parse(localStorage.getItem(favoritesStorageKey)) || [];
  } catch {
    return [];
  }
}

function savePlans() {
  localStorage.setItem(storageKey, JSON.stringify(state.plans));
}

function saveShoppingState() {
  localStorage.setItem(shoppingStorageKey, JSON.stringify(state.shopping));
}

function saveTasksState() {
  localStorage.setItem(tasksStorageKey, JSON.stringify(state.tasks));
}

function saveSettingsState() {
  localStorage.setItem(settingsStorageKey, JSON.stringify(state.settings));
}

function saveCheckinsState() {
  localStorage.setItem(checkinsStorageKey, JSON.stringify(state.checkins));
}

function saveNotesState() {
  localStorage.setItem(notesStorageKey, JSON.stringify(state.notes));
}

function saveRhythmState() {
  localStorage.setItem(rhythmStorageKey, JSON.stringify(state.rhythm));
}

function saveFavoritesState() {
  localStorage.setItem(favoritesStorageKey, JSON.stringify(state.favorites));
}

function applyTheme() {
  document.body.dataset.theme = state.settings.theme;
  themeToggle.checked = state.settings.theme === "light";
}

function applyDensity() {
  state.settings.density ||= "compact";
  document.body.dataset.density = state.settings.density;
  densityToggle.checked = state.settings.density === "compact";
}

function addDays(date, count) {
  const next = new Date(date);
  next.setDate(next.getDate() + count);
  return next;
}

function currentMonday() {
  const today = new Date();
  const day = today.getDay() || 7;
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  monday.setDate(monday.getDate() - day + 1);
  return monday;
}

function formatShortDate(date) {
  return new Intl.DateTimeFormat("sk-SK", { day: "numeric", month: "long" }).format(date);
}

function dateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function formatDayName(date) {
  const weekday = new Intl.DateTimeFormat("sk-SK", { weekday: "long" }).format(date);
  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}, ${formatShortDate(date)}`;
}

function weekMeta(weekKey) {
  const start = addDays(currentMonday(), weekKey === "next" ? 7 : 0);
  const end = addDays(start, 6);

  return {
    label: weekKey === "next" ? "Budúci týždeň" : "Tento týždeň",
    range: `${formatShortDate(start)} - ${formatShortDate(end)}`,
    start,
  };
}

function ensureSevenDays(plan) {
  while (plan.days.length < 7) {
    plan.days.push({ name: "", meals: [] });
  }
}

function currentPlan() {
  const basePlan = state.plans[state.audience][state.week];
  const meta = weekMeta(state.week);
  ensureSevenDays(basePlan);

  return {
    ...basePlan,
    label: meta.label,
    range: meta.range,
    days: basePlan.days.map((day, index) => ({
      ...day,
      name: formatDayName(addDays(meta.start, index)),
    })),
  };
}

function contextKey() {
  return `${state.audience}:${state.week}`;
}

function currentTasks() {
  state.tasks[state.audience] ||= {};
  state.tasks[state.audience][state.week] ||= [];
  return state.tasks[state.audience][state.week];
}

function mealTypeFor(key) {
  return mealTypes.find((type) => type.key === key) || mealTypes[0];
}

function buttonIcon(kind) {
  const paths = {
    edit: "M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3zM13.8 8.2l3 3",
    delete: "M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3",
    favorite: "M12 3.8l2.5 5.1 5.6.8-4 3.9.9 5.5-5-2.7-5 2.7.9-5.5-4-3.9 5.6-.8z",
  };

  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[kind]}"></path></svg>`;
}

function slug(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generatedShoppingItems() {
  const items = new Map();

  currentPlan().days.forEach((day) => {
    day.meals.forEach((meal) => {
      const mealName = meal.name.toLowerCase();

      ingredientRules.forEach((rule) => {
        if (rule.match.some((term) => mealName.includes(term))) {
          rule.items.forEach(([item, category]) => {
            if (!items.has(item)) {
              items.set(item, {
                id: `auto:${slug(item)}`,
                name: item,
                category,
                source: "Z jedálnička",
                automatic: true,
              });
            }
          });
        }
      });
    });
  });

  return [...items.values()];
}

function manualShoppingItems() {
  return (state.shopping.manual[contextKey()] || []).map((item) => ({
    category: "Ostatné",
    ...item,
  }));
}

function shoppingItems() {
  return [...generatedShoppingItems(), ...manualShoppingItems()];
}

function checkedShoppingIds() {
  return state.shopping.checked[contextKey()] || [];
}

function setCheckedShoppingIds(ids) {
  state.shopping.checked[contextKey()] = ids;
  saveShoppingState();
}

function renderShopping() {
  const checked = new Set(checkedShoppingIds());
  const items = shoppingItems();
  const openCount = items.filter((item) => !checked.has(item.id)).length;
  const groups = shoppingCategoryOrder
    .map((category) => ({
      category,
      items: items.filter((item) => (item.category || "Ostatné") === category),
    }))
    .filter((group) => group.items.length);

  shoppingCount.textContent = `${openCount} z ${items.length}`;
  shoppingBadge.textContent = openCount > 9 ? "9+" : String(openCount);
  shoppingBadge.hidden = openCount === 0;

  shoppingList.innerHTML = groups.length
    ? groups
        .map((group) => `
          <section class="shopping-category">
            <div class="shopping-category-header">
              <h3>${group.category}</h3>
              <span>${group.items.filter((item) => !checked.has(item.id)).length} z ${group.items.length}</span>
            </div>
            ${group.items
              .map((item) => {
          const isDone = checked.has(item.id);
          const source = item.automatic ? item.source : "Ručne pridané";
          const deleteButton = item.automatic
            ? `<span aria-hidden="true"></span>`
            : `
              <button class="delete-shopping" type="button" data-id="${item.id}" aria-label="Odstrániť položku ${escapeHtml(item.name)}">
                ${buttonIcon("delete")}
              </button>
            `;

          return `
            <label class="shopping-item ${isDone ? "is-done" : ""}">
              <input type="checkbox" data-id="${item.id}" ${isDone ? "checked" : ""}>
              <span>
                <strong>${escapeHtml(item.name)}</strong>
                <span>${source}</span>
              </span>
              ${deleteButton}
            </label>
          `;
        })
        .join("")}
          </section>
        `)
        .join("")
    : `<div class="empty-state">Zatiaľ tu nič nie je. Pridaj jedlo alebo položku ručne.</div>`;
}

function priorityLabel(priority) {
  return {
    high: "Dôležitá",
    normal: "Bežná",
    low: "Nízka",
  }[priority] || "Bežná";
}

function formatDueDate(value) {
  if (!value) return "Bez termínu";
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("sk-SK", { day: "numeric", month: "long" }).format(date);
}

function taskSuggestion(task) {
  if (task.done) return "Hotovo. Môžeš to nechať tak alebo si pripraviť ďalší malý krok.";
  if (task.priority === "high") return "Daj tomu 10 minút a potom sa rozhodni, či treba pokračovať.";
  if (task.due) return "Skús si k tomu pridať krátky čas v dni, nech to nevisí v hlave.";
  return "Ak je to väčšie, rozdeľ to na jednu drobnú vec, ktorá sa dá urobiť hneď.";
}

function taskBucket(task) {
  if (task.done) return "done";
  if (task.priority === "high") return "now";
  if (task.due || task.priority === "normal") return "week";
  return "later";
}

function taskRow(task) {
  return `
    <label class="task-item ${task.done ? "is-done" : ""}">
      <input type="checkbox" data-id="${task.id}" ${task.done ? "checked" : ""}>
      <span>
        <strong>${escapeHtml(task.title)}</strong>
        <span>${formatDueDate(task.due)}</span>
        <em class="task-suggestion">${escapeHtml(taskSuggestion(task))}</em>
      </span>
      <span class="priority-pill ${task.priority}">${priorityLabel(task.priority)}</span>
      <button class="delete-task" type="button" data-id="${task.id}" aria-label="Odstrániť úlohu ${escapeHtml(task.title)}">
        ${buttonIcon("delete")}
      </button>
    </label>
  `;
}

function renderTasks() {
  const tasks = currentTasks();
  const openCount = tasks.filter((task) => !task.done).length;
  const groups = [
    { key: "now", title: "Teraz", hint: "Najbližšie malé kroky" },
    { key: "week", title: "Tento týždeň", hint: "Veci, ktoré stačí držať v rytme" },
    { key: "later", title: "Keď bude čas", hint: "Bez tlaku, len aby sa nestratili" },
    { key: "done", title: "Hotové", hint: "Už netreba nosiť v hlave" },
  ].map((group) => ({
    ...group,
    tasks: tasks.filter((task) => taskBucket(task) === group.key),
  })).filter((group) => group.tasks.length);

  tasksCount.textContent = `${openCount} otvorených`;
  tasksBadge.textContent = openCount > 9 ? "9+" : String(openCount);
  tasksBadge.hidden = openCount === 0;

  taskList.innerHTML = groups.length
    ? groups
        .map((group) => `
          <section class="task-group ${group.key}">
            <div class="task-group-header">
              <span>${group.title}</span>
              <em>${group.hint}</em>
              <strong>${group.tasks.length}</strong>
            </div>
            ${group.tasks.map(taskRow).join("")}
          </section>
        `)
        .join("")
    : `<div class="empty-state">Zatiaľ tu nie sú žiadne úlohy.</div>`;
}

function allMeals() {
  return currentPlan().days.flatMap((day) =>
    day.meals.map((meal) => ({ ...meal, dayName: day.name, type: mealTypeFor(meal.typeKey) }))
  );
}

function emptyMiniRow(text) {
  return `<div class="empty-state">${text}</div>`;
}

function currentMood() {
  return state.checkins[dateKey()] || "";
}

function moodMessage(mood) {
  return {
    calm: "Dnes to môže ísť pokojne. Stačí držať rytmus a nič nepreháňať.",
    busy: "Dnes je toho viac. Vyber si len najbližší krok a zvyšok počká.",
    tired: "Dnes šetri energiu. Pomôže rýchly plán a jednoduché jedlá.",
  }[mood] || "Vyber náladu dňa a appka sa tomu prispôsobí.";
}

function renderCheckin() {
  const mood = currentMood();
  checkinMessage.textContent = moodMessage(mood);
  moodButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mood === mood);
  });
}

function renderRhythm() {
  const done = new Set(state.rhythm[dateKey()] || []);
  rhythmButtons.forEach((button) => {
    button.classList.toggle("is-done", done.has(button.dataset.rhythm));
  });
}

function renderDailyNote() {
  dailyNote.value = state.notes[dateKey()] || "";
}

function isFavoriteMeal(name) {
  return state.favorites.includes(name);
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

function progressPercent(done, total) {
  if (!total) return 100;
  return Math.max(0, Math.min(100, Math.round((done / total) * 100)));
}

function todaySummary(meals, openTasks, openShopping) {
  const firstMeal = meals[0];
  if (firstMeal) {
    return {
      label: "Dnes doma",
      title: firstMeal.name,
      detail: `${firstMeal.type.label} v pláne. Keď bude treba, vieš ho upraviť v jedálničku.`,
    };
  }

  if (openTasks.length) {
    return {
      label: "Dnes doma",
      title: openTasks[0].title,
      detail: "Najbližšia vec, ktorú stačí posunúť o jeden malý krok.",
    };
  }

  if (openShopping.length) {
    return {
      label: "Dnes doma",
      title: openShopping[0].name,
      detail: "Jedna položka z nákupu, ktorú sa oplatí zobrať pri najbližšej príležitosti.",
    };
  }

  return {
    label: "Dnes doma",
    title: "Doma to vyzerá pokojne",
    detail: "Nie je tu nič, čo by si teraz musel riešiť.",
  };
}

function nextMealSlot() {
  const plan = currentPlan();
  const dayIndex = plan.days.findIndex((day) => day.meals.length < mealTypes.length);
  const safeDayIndex = dayIndex === -1 ? 0 : dayIndex;
  const usedTypes = new Set(plan.days[safeDayIndex].meals.map((meal) => meal.typeKey));
  const type = mealTypes.find((item) => !usedTypes.has(item.key)) || mealTypes[mealTypes.length - 1];
  return { dayIndex: safeDayIndex, typeKey: type.key };
}

function addFavoriteToPlan(name) {
  const slot = nextMealSlot();
  currentPlan().days[slot.dayIndex].meals.push({ typeKey: slot.typeKey, name });
  savePlans();
  renderCurrentView();
  showToast("Pridané do jedálnička z obľúbených.");
}

function renderFavoriteLibrary() {
  favoriteLibraryCount.textContent = `${state.favorites.length} ${state.favorites.length === 1 ? "jedlo" : "jedál"}`;
  favoriteQuickList.innerHTML = state.favorites.length
    ? state.favorites
        .map((name) => `
          <div class="favorite-chip-row">
            <span class="favorite-chip-icon" aria-hidden="true">★</span>
            <strong>${escapeHtml(name)}</strong>
            <button type="button" data-favorite-add="${escapeHtml(name)}">Pridať</button>
          </div>
        `)
        .join("")
    : `<div class="empty-state">Označ hviezdičkou jedlá v pláne a vytvoríš si vlastnú knižnicu.</div>`;
}

function buildDashboardActions(meals, openTasks, openShopping) {
  const actions = [];

  if (openTasks.length) {
    const urgent = openTasks.find((task) => task.priority === "high") || openTasks[0];
    actions.push({
      icon: "✓",
      title: urgent.title,
      detail: `${priorityLabel(urgent.priority)} · ${formatDueDate(urgent.due)}`,
      tab: "tasks",
      tone: urgent.priority === "high" ? "urgent" : "normal",
    });
  }

  if (openShopping.length) {
    actions.push({
      icon: "🛒",
      title: "Doplniť nákup",
      detail: `${openShopping.length} položiek ešte čaká`,
      tab: "shopping",
      tone: "shopping",
    });
  }

  if (!meals.length) {
    actions.push({
      icon: "🍽️",
      title: "Naplánovať jedlá",
      detail: "Týždeň zatiaľ nemá jedlá",
      tab: "meals",
      tone: "normal",
    });
  } else if (meals.length < 10) {
    actions.push({
      icon: "🍽️",
      title: "Doplniť jedálniček",
      detail: `${meals.length} jedál je zatiaľ v pláne`,
      tab: "meals",
      tone: "normal",
    });
  }

  if (!actions.length) {
    actions.push({
      icon: "✓",
      title: "Dnes je to pod kontrolou",
      detail: "Jedlá, úlohy aj nákup vyzerajú pripravené",
      tab: "home",
      tone: "calm",
    });
  }

  return actions.slice(0, 3);
}

function renderHome() {
  const meals = allMeals();
  const tasks = currentTasks();
  const openTasks = tasks.filter((task) => !task.done);
  const doneTasks = tasks.length - openTasks.length;
  const checked = new Set(checkedShoppingIds());
  const shopping = shoppingItems();
  const openShopping = shopping.filter((item) => !checked.has(item.id));
  const plan = currentPlan();
  const mood = currentMood();

  homeEyebrow.textContent = plan.label;
  homeTitle.textContent = plan.range;
  homeAudience.textContent = state.audience === "kids" ? "Deti" : "Dospelí";
  homeMealsCount.textContent = String(meals.length);
  homeTasksCount.textContent = String(openTasks.length);
  homeShoppingCount.textContent = String(openShopping.length);
  homeMealsHint.textContent = meals.length === 1 ? "jedlo v pláne" : "jedál v pláne";
  homeTasksHint.textContent = openTasks.length === 1 ? "otvorená úloha" : "otvorených úloh";
  homeShoppingHint.textContent = openShopping.length === 1 ? "položka chýba" : "položiek chýba";
  homeMealVisualValue.textContent = String(meals.length);
  homeTaskVisualValue.textContent = `${doneTasks}/${tasks.length || 0}`;
  homeShoppingVisualValue.textContent = `${shopping.length - openShopping.length}/${shopping.length || 0}`;
  homeMealMeter.style.width = `${progressPercent(meals.length, 21)}%`;
  homeTaskMeter.style.width = `${progressPercent(doneTasks, tasks.length)}%`;
  homeShoppingMeter.style.width = `${progressPercent(shopping.length - openShopping.length, shopping.length)}%`;

  const today = todaySummary(meals, openTasks, openShopping);
  homeTodayLabel.textContent = today.label;
  homeTodayTitle.textContent = today.title;
  homeTodayDetail.textContent = today.detail;

  const actions = buildDashboardActions(meals, openTasks, openShopping);
  const focus = actions[0];

  homeFocusIcon.textContent = focus.icon;
  homeFocusLabel.textContent = mood === "tired"
    ? "Stačí jeden malý krok"
    : focus.tone === "urgent"
      ? "Najdôležitejšie teraz"
      : "Najbližší krok";
  homeFocusTitle.textContent = focus.title;
  homeFocusDetail.textContent = focus.detail;
  homeFocusButton.dataset.jumpTab = focus.tab;
  homeFocusButton.textContent = focus.tab === "home" ? "Hotovo" : "Otvoriť";

  homeActionList.innerHTML = actions
    .map((action) => `
      <button class="action-row ${action.tone}" type="button" data-jump-tab="${action.tab}">
        <span class="action-icon" aria-hidden="true">${action.icon}</span>
        <span>
          <strong>${escapeHtml(action.title)}</strong>
          <span>${escapeHtml(action.detail)}</span>
        </span>
      </button>
    `)
    .join("");
  renderCheckin();

  homeMealsList.innerHTML = meals.length
    ? meals
        .slice(0, 4)
        .map((meal) => `
          <div class="mini-row">
            <span class="mini-icon" aria-hidden="true">${meal.type.icon}</span>
            <span>
              <strong>${escapeHtml(meal.name)}</strong>
              <span>${meal.dayName}</span>
            </span>
            <span class="mini-tag">${meal.type.label}</span>
          </div>
        `)
        .join("")
    : emptyMiniRow("Zatiaľ nie sú naplánované žiadne jedlá.");

  homeTasksList.innerHTML = openTasks.length
    ? openTasks
        .slice(0, 4)
        .map((task) => `
          <div class="mini-row">
            <span class="mini-icon" aria-hidden="true">✓</span>
            <span>
              <strong>${escapeHtml(task.title)}</strong>
              <span>${formatDueDate(task.due)}</span>
            </span>
            <span class="mini-tag">${priorityLabel(task.priority)}</span>
          </div>
        `)
        .join("")
    : emptyMiniRow("Všetky úlohy sú hotové.");

  homeShoppingList.innerHTML = openShopping.length
    ? openShopping
        .slice(0, 4)
        .map((item) => `
          <div class="mini-row">
            <span class="mini-icon" aria-hidden="true">🛒</span>
            <span>
              <strong>${escapeHtml(item.name)}</strong>
              <span>${item.automatic ? "Z jedálnička" : "Ručne pridané"}</span>
            </span>
            <span class="mini-tag">Kúpiť</span>
          </div>
        `)
        .join("")
    : emptyMiniRow("Nákup je vybavený.");

  homeFavoritesList.innerHTML = state.favorites.length
    ? state.favorites
        .slice(0, 4)
        .map((name) => `
          <div class="mini-row">
            <span class="mini-icon" aria-hidden="true">★</span>
            <span>
              <strong>${escapeHtml(name)}</strong>
              <span>Osvedčené u vás doma</span>
            </span>
            <span class="mini-tag">Tip</span>
          </div>
        `)
        .join("")
    : emptyMiniRow("Označ hviezdičkou jedlá, ku ktorým sa chcete vracať.");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderPlan() {
  const plan = currentPlan();
  weekLabel.textContent = plan.label;
  weekRange.textContent = plan.range;

  mealPlan.innerHTML = plan.days
    .map((day, dayIndex) => {
      const rows = day.meals.length
        ? day.meals
            .map((meal, mealIndex) => {
              const type = mealTypeFor(meal.typeKey);

              return `
                <div class="meal-row">
                  <span class="meal-emoji" aria-hidden="true">${type.icon}</span>
                  <span class="meal-type">${type.label}</span>
                  <span class="plate" aria-hidden="true">🍽️</span>
                  <span class="meal-name">${escapeHtml(meal.name)}</span>
                  <button class="favorite-meal ${isFavoriteMeal(meal.name) ? "is-active" : ""}" type="button" data-meal-name="${escapeHtml(meal.name)}" aria-label="Obľúbené jedlo ${escapeHtml(meal.name)}">
                    ${buttonIcon("favorite")}
                  </button>
                  <button class="edit-meal" type="button" data-day="${dayIndex}" data-meal="${mealIndex}" aria-label="Upraviť ${type.label.toLowerCase()}">
                    ${buttonIcon("edit")}
                  </button>
                  <button class="delete-meal" type="button" data-day="${dayIndex}" data-meal="${mealIndex}" aria-label="Odstrániť ${type.label.toLowerCase()}">
                    ${buttonIcon("delete")}
                  </button>
                </div>
              `;
            })
            .join("")
        : `<div class="empty-state">Tento deň zatiaľ nemá žiadne jedlá.</div>`;

      return `
        <article class="day-card">
          <div class="day-header">
            <h3>${day.name}</h3>
            <p>${day.meals.length} jedál</p>
          </div>
          ${rows}
        </article>
      `;
    })
    .join("");
}

function renderCurrentView() {
  renderPlan();
  renderShopping();
  renderTasks();
  renderHome();
  renderFavoriteLibrary();
  renderCheckin();
  renderRhythm();
  renderDailyNote();
  applyTheme();
  applyDensity();
  settingsStatus.textContent = state.settings.theme === "light" ? "Svetlá téma" : "Tmavá téma";
}

function fillFormOptions() {
  const plan = currentPlan();

  mealDay.innerHTML = plan.days
    .map((day, index) => `<option value="${index}">${day.name}</option>`)
    .join("");

  mealType.innerHTML = mealTypes
    .map((type) => `<option value="${type.key}">${type.icon} ${type.label}</option>`)
    .join("");
}

function openMealDialog(mode, dayIndex = 0, mealIndex = "") {
  const plan = currentPlan();
  const meal = mealIndex === "" ? null : plan.days[dayIndex].meals[mealIndex];

  fillFormOptions();
  formMode.textContent = mode === "edit" ? "Úprava jedla" : "Nové jedlo";
  formTitle.textContent = mode === "edit" ? "Upraviť jedlo" : "Pridať do jedálnička";
  editDayIndex.value = mode === "edit" ? String(dayIndex) : "";
  editMealIndex.value = mode === "edit" ? String(mealIndex) : "";
  mealDay.value = String(dayIndex);
  mealDay.disabled = mode === "edit";
  mealType.value = meal?.typeKey || mealTypes[0].key;
  mealName.value = meal?.name || "";
  mealDialog.showModal();
  mealName.focus();
}

function closeMealDialog() {
  mealDialog.close();
  mealDay.disabled = false;
  mealForm.reset();
}

function setActiveButton(selector, dataName, value) {
  document.querySelectorAll(selector).forEach((button) => {
    button.classList.toggle("is-active", button.dataset[dataName] === value);
  });
}

document.querySelector(".week-switch").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-week]");
  if (!button) return;
  state.week = button.dataset.week;
  setActiveButton(".switch-option", "week", state.week);
  renderCurrentView();
});

document.querySelector(".audience-toggle").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-audience]");
  if (!button) return;
  state.audience = button.dataset.audience;
  setActiveButton(".audience-toggle button", "audience", state.audience);
  renderCurrentView();
});

document.querySelector("#addMealButton").addEventListener("click", () => {
  openMealDialog("add");
});

document.querySelector("#resetPlanButton").addEventListener("click", () => {
  state.plans = normalizePlans(starterPlans);
  savePlans();
  renderCurrentView();
});

document.querySelector(".sync-button").addEventListener("click", () => {
  state.plans = normalizePlans(starterPlans);
  savePlans();
  renderCurrentView();
});

document.querySelector("#closeDialogButton").addEventListener("click", closeMealDialog);
document.querySelector("#cancelDialogButton").addEventListener("click", closeMealDialog);

mealDialog.addEventListener("click", (event) => {
  if (event.target === mealDialog) {
    closeMealDialog();
  }
});

mealForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const plan = currentPlan();
  const name = mealName.value.trim();
  const nextMeal = { typeKey: mealType.value, name };

  if (!name) return;

  if (editMealIndex.value !== "") {
    const dayIndex = Number(editDayIndex.value);
    const mealIndex = Number(editMealIndex.value);
    plan.days[dayIndex].meals[mealIndex] = nextMeal;
  } else {
    plan.days[Number(mealDay.value)].meals.push(nextMeal);
  }

  savePlans();
  renderCurrentView();
  closeMealDialog();
});

mealPlan.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest(".favorite-meal");
  const editButton = event.target.closest(".edit-meal");
  const deleteButton = event.target.closest(".delete-meal");

  if (favoriteButton) {
    const name = favoriteButton.dataset.mealName;
    const wasFavorite = isFavoriteMeal(name);
    state.favorites = wasFavorite
      ? state.favorites.filter((item) => item !== name)
      : [name, ...state.favorites].slice(0, 12);
    saveFavoritesState();
    renderCurrentView();
    showToast(wasFavorite ? "Odstránené z obľúbených." : "Pridané medzi obľúbené.");
    return;
  }

  if (editButton) {
    openMealDialog("edit", Number(editButton.dataset.day), Number(editButton.dataset.meal));
    return;
  }

  if (deleteButton) {
    currentPlan().days[Number(deleteButton.dataset.day)].meals.splice(Number(deleteButton.dataset.meal), 1);
    savePlans();
    renderCurrentView();
  }
});

favoriteQuickList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-favorite-add]");
  if (!button) return;
  addFavoriteToPlan(button.dataset.favoriteAdd);
});

shoppingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = shoppingName.value.trim();
  if (!name) return;

  const key = contextKey();
  const item = {
    id: `manual:${Date.now()}:${slug(name)}`,
    name,
    category: "Ostatné",
    automatic: false,
  };

  state.shopping.manual[key] = [...manualShoppingItems(), item];
  shoppingName.value = "";
  saveShoppingState();
  renderShopping();
});

shoppingList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[type='checkbox'][data-id]");
  if (!checkbox) return;

  const checked = new Set(checkedShoppingIds());
  if (checkbox.checked) {
    checked.add(checkbox.dataset.id);
  } else {
    checked.delete(checkbox.dataset.id);
  }

  setCheckedShoppingIds([...checked]);
  renderShopping();
  renderHome();
  if (checkbox.checked) showToast("Hotovo. O kúsok ľahší deň.");
});

shoppingList.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-shopping");
  if (!button) return;

  const key = contextKey();
  state.shopping.manual[key] = manualShoppingItems().filter((item) => item.id !== button.dataset.id);
  state.shopping.checked[key] = checkedShoppingIds().filter((id) => id !== button.dataset.id);
  saveShoppingState();
  renderShopping();
  renderHome();
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskName.value.trim();
  if (!title) return;

  currentTasks().push({
    id: `task:${Date.now()}:${slug(title)}`,
    title,
    priority: taskPriority.value,
    due: taskDue.value,
    done: false,
  });

  taskName.value = "";
  taskPriority.value = "normal";
  taskDue.value = "";
  saveTasksState();
  renderTasks();
  renderHome();
});

taskList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[type='checkbox'][data-id]");
  if (!checkbox) return;

  const task = currentTasks().find((item) => item.id === checkbox.dataset.id);
  if (!task) return;

  task.done = checkbox.checked;
  saveTasksState();
  renderTasks();
  renderHome();
  if (checkbox.checked) showToast("Zapísané ako hotové. Pekne.");
});

taskList.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-task");
  if (!button) return;

  state.tasks[state.audience][state.week] = currentTasks().filter((task) => task.id !== button.dataset.id);
  saveTasksState();
  renderTasks();
  renderHome();
});

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = dateKey();
    state.checkins[key] = state.checkins[key] === button.dataset.mood ? "" : button.dataset.mood;
    saveCheckinsState();
    renderHome();
  });
});

rhythmButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = dateKey();
    const done = new Set(state.rhythm[key] || []);
    if (done.has(button.dataset.rhythm)) {
      done.delete(button.dataset.rhythm);
    } else {
      done.add(button.dataset.rhythm);
    }
    state.rhythm[key] = [...done];
    saveRhythmState();
    renderRhythm();
    if (done.has(button.dataset.rhythm)) showToast("Rytmus dňa sa skladá po malých krokoch.");
  });
});

dailyNote.addEventListener("input", () => {
  state.notes[dateKey()] = dailyNote.value.trim();
  saveNotesState();
});

themeToggle.addEventListener("change", () => {
  state.settings.theme = themeToggle.checked ? "light" : "dark";
  saveSettingsState();
  renderCurrentView();
});

densityToggle.addEventListener("change", () => {
  state.settings.density = densityToggle.checked ? "compact" : "full";
  saveSettingsState();
  applyDensity();
  settingsStatus.textContent = densityToggle.checked ? "Kompaktný prehľad" : "Plný prehľad";
});

exportDataButton.addEventListener("click", () => {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    plans: state.plans,
    shopping: state.shopping,
    tasks: state.tasks,
    settings: state.settings,
    checkins: state.checkins,
    notes: state.notes,
    rhythm: state.rhythm,
    favorites: state.favorites,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `domaci-rytmus-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  settingsStatus.textContent = "Export hotový";
});

importDataButton.addEventListener("click", () => {
  importDataInput.click();
});

importDataInput.addEventListener("change", async () => {
  const file = importDataInput.files?.[0];
  if (!file) return;

  try {
    const payload = JSON.parse(await file.text());
    state.plans = payload.plans || state.plans;
    state.shopping = payload.shopping || state.shopping;
    state.tasks = payload.tasks || state.tasks;
    state.settings = payload.settings || state.settings;
    state.checkins = payload.checkins || state.checkins;
    state.notes = payload.notes || state.notes;
    state.rhythm = payload.rhythm || state.rhythm;
    state.favorites = payload.favorites || state.favorites;
    savePlans();
    saveShoppingState();
    saveTasksState();
    saveSettingsState();
    saveCheckinsState();
    saveNotesState();
    saveRhythmState();
    saveFavoritesState();
    renderCurrentView();
    settingsStatus.textContent = "Import hotový";
  } catch {
    settingsStatus.textContent = "Import zlyhal";
  } finally {
    importDataInput.value = "";
  }
});

resetAllButton.addEventListener("click", () => {
  if (!confirm("Naozaj vymazať lokálne dáta a vrátiť ukážkový stav?")) return;

  state.plans = normalizePlans(starterPlans);
  state.shopping = { checked: {}, manual: {} };
  state.tasks = clone(starterTasks);
  state.settings = { theme: "dark", density: "compact" };
  state.checkins = {};
  state.notes = {};
  state.rhythm = {};
  state.favorites = [];
  savePlans();
  saveShoppingState();
  saveTasksState();
  saveSettingsState();
  saveCheckinsState();
  saveNotesState();
  saveRhythmState();
  saveFavoritesState();
  renderCurrentView();
  settingsStatus.textContent = "Reset hotový";
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-jump-tab]");
  if (!button) return;
  document.querySelector(`.bottom-nav button[data-tab="${button.dataset.jumpTab}"]`)?.click();
});

document.querySelector(".bottom-nav").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-tab]");
  if (!button) return;
  state.activeTab = button.dataset.tab;

  document.querySelectorAll(".bottom-nav button").forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");

  document.querySelectorAll(".view").forEach((view) => {
    const isActive =
      view.dataset.view === state.activeTab ||
      (view.dataset.view === "placeholder" && !["home", "meals", "shopping", "tasks", "more"].includes(state.activeTab));

    view.hidden = !isActive;
    view.classList.toggle("is-active", isActive);
  });

  if (!["home", "meals", "shopping", "tasks", "more"].includes(state.activeTab)) {
    const labels = {
      home: "Domov",
      more: "Viac",
    };

    placeholderEyebrow.textContent = "Domáci Rytmus";
    placeholderTitle.textContent = `${labels[state.activeTab]} sa pripravuje`;
  }
});

renderCurrentView();
