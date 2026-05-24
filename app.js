const storageKey = "domaci-rytmus-meal-plans-v2";
const shoppingStorageKey = "domaci-rytmus-shopping-v1";
const tasksStorageKey = "domaci-rytmus-tasks-v1";
const settingsStorageKey = "domaci-rytmus-settings-v1";
const checkinsStorageKey = "domaci-rytmus-checkins-v1";
const notesStorageKey = "domaci-rytmus-notes-v1";
const rhythmStorageKey = "domaci-rytmus-rhythm-v1";
const favoritesStorageKey = "domaci-rytmus-favorites-v1";
const weeklyStorageKey = "domaci-rytmus-weekly-v1";
const pantryStorageKey = "domaci-rytmus-pantry-v1";
const householdStorageKey = "domaci-rytmus-household-id-v1";
const firebaseSdkVersion = "10.12.5";

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
  weekly: loadWeeklyState(),
  pantry: loadPantryState(),
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
const smartTipList = document.querySelector("#smartTipList");
const weekPrepCount = document.querySelector("#weekPrepCount");
const weekModeButtons = document.querySelectorAll("[data-week-mode] button");
const cookingModeButtons = document.querySelectorAll("[data-cooking-mode] button");
const busyDayList = document.querySelector("#busyDayList");
const weekPrepList = document.querySelector("#weekPrepList");
const homeMealVisualValue = document.querySelector("#homeMealVisualValue");
const homeTaskVisualValue = document.querySelector("#homeTaskVisualValue");
const homeShoppingVisualValue = document.querySelector("#homeShoppingVisualValue");
const homeMealMeter = document.querySelector("#homeMealMeter");
const homeTaskMeter = document.querySelector("#homeTaskMeter");
const homeShoppingMeter = document.querySelector("#homeShoppingMeter");
const homeStartEmpty = document.querySelector("#homeStartEmpty");
const restoreDemoButton = document.querySelector("#restoreDemoButton");
const familyHandoffTitle = document.querySelector("#familyHandoffTitle");
const familyHandoffDetail = document.querySelector("#familyHandoffDetail");
const familyHandoffList = document.querySelector("#familyHandoffList");
const weeklyCompassScore = document.querySelector("#weeklyCompassScore");
const weeklyCompassTitle = document.querySelector("#weeklyCompassTitle");
const weeklyCompassDetail = document.querySelector("#weeklyCompassDetail");
const weeklyCompassSignals = document.querySelector("#weeklyCompassSignals");
const budgetTitle = document.querySelector("#budgetTitle");
const budgetDetail = document.querySelector("#budgetDetail");
const budgetValue = document.querySelector("#budgetValue");
const budgetBar = document.querySelector("#budgetBar");
const favoriteQuickList = document.querySelector("#favoriteQuickList");
const favoriteLibraryCount = document.querySelector("#favoriteLibraryCount");
const quickMealHint = document.querySelector("#quickMealHint");
const quickMealList = document.querySelector("#quickMealList");
const pantryCookHint = document.querySelector("#pantryCookHint");
const pantryCookList = document.querySelector("#pantryCookList");
const simpleMealsButton = document.querySelector("#simpleMealsButton");
const shoppingProgressText = document.querySelector("#shoppingProgressText");
const shoppingProgressBar = document.querySelector("#shoppingProgressBar");
const hideDoneShoppingButton = document.querySelector("#hideDoneShoppingButton");
const stockCount = document.querySelector("#stockCount");
const stockList = document.querySelector("#stockList");
const pantryCount = document.querySelector("#pantryCount");
const pantryForm = document.querySelector("#pantryForm");
const pantryName = document.querySelector("#pantryName");
const pantryList = document.querySelector("#pantryList");
const quickTaskHint = document.querySelector("#quickTaskHint");
const quickTaskList = document.querySelector("#quickTaskList");
const checkinMessage = document.querySelector("#checkinMessage");
const moodButtons = document.querySelectorAll("[data-mood]");
const rhythmButtons = document.querySelectorAll("[data-rhythm]");
const dailyNote = document.querySelector("#dailyNote");
const themeToggle = document.querySelector("#themeToggle");
const densityToggle = document.querySelector("#densityToggle");
const noteToggle = document.querySelector("#noteToggle");
const scaleRange = document.querySelector("#scaleRange");
const scaleValue = document.querySelector("#scaleValue");
const displayDensityButtons = document.querySelectorAll("[data-density-value]");
const visualStyleButtons = document.querySelectorAll("[data-visual-value]");
const backdropButtons = document.querySelectorAll("[data-backdrop-value]");
const familyProfileButtons = document.querySelectorAll("[data-profile-value]");
const memberForm = document.querySelector("#memberForm");
const memberName = document.querySelector("#memberName");
const memberRole = document.querySelector("#memberRole");
const memberList = document.querySelector("#memberList");
const familyCodeDetail = document.querySelector("#familyCodeDetail");
const familyCodeButton = document.querySelector("#familyCodeButton");
const joinFamilyForm = document.querySelector("#joinFamilyForm");
const joinFamilyCode = document.querySelector("#joinFamilyCode");
const monthlyBudgetInput = document.querySelector("#monthlyBudgetInput");
const monthlyBudgetStatus = document.querySelector("#monthlyBudgetStatus");
const exportDataButton = document.querySelector("#exportDataButton");
const importDataButton = document.querySelector("#importDataButton");
const importDataInput = document.querySelector("#importDataInput");
const resetAllButton = document.querySelector("#resetAllButton");
const settingsStatus = document.querySelector("#settingsStatus");
const toast = document.querySelector("#toast");
const syncStatusDot = document.querySelector("#syncStatusDot");
const googleLoginButton = document.querySelector("#googleLoginButton");
const googleLogoutButton = document.querySelector("#googleLogoutButton");
const accountEyebrow = document.querySelector("#accountEyebrow");
const accountTitle = document.querySelector("#accountTitle");
const accountDetail = document.querySelector("#accountDetail");
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

const prepSteps = [
  { key: "meals", label: "Potvrdiť jedlá" },
  { key: "stock", label: "Skontrolovať zásoby" },
  { key: "shopping", label: "Pripraviť veľký nákup" },
  { key: "busy", label: "Označiť rušné dni" },
  { key: "prep", label: "Vybrať 2 veci dopredu" },
];

const stockBasics = ["Mlieko", "Vajcia", "Jogurty", "Ovocie", "Pečivo", "Ryža", "Cestoviny", "Zelenina"];

const pantryStarter = ["Ryža", "Cestoviny", "Vajcia", "Mlieko"];

const pantryRecipeIdeas = [
  { name: "Vaječná omeleta so zeleninou", typeKey: "dinner", needs: ["Vajcia", "Zelenina"] },
  { name: "Cestoviny s paradajkovou omáčkou", typeKey: "dinner", needs: ["Cestoviny", "Paradajkový základ"] },
  { name: "Ryžová kaša s ovocím", typeKey: "breakfast", needs: ["Ryža", "Mlieko", "Ovocie"] },
  { name: "Jogurtová miska s ovocím", typeKey: "snack", needs: ["Jogurty", "Ovocie"] },
  { name: "Zeleninová polievka zo zásob", typeKey: "dinner", needs: ["Zelenina", "Pečivo"] },
  { name: "Palacinky zo špajze", typeKey: "afternoon", needs: ["Múka", "Vajcia", "Mlieko"] },
];

const weekModeCopy = {
  normal: "Bežný týždeň",
  busy: "Rušný týždeň",
  budget: "Lacnejší týždeň",
  light: "Ľahší týždeň",
};

const cookingModeCopy = {
  normal: "Bežné varenie",
  "two-days": "Varenie na 2 dni",
  minimal: "Minimum varenia",
};

const mealIdeaBank = {
  kids: [
    { typeKey: "breakfast", name: "Jogurt s granolou a ovocím", mode: "normal" },
    { typeKey: "snack", name: "Ovocná kapsička a piškóty", mode: "busy" },
    { typeKey: "lunch", name: "Kuracie rizoto na dva dni", mode: "two-days" },
    { typeKey: "afternoon", name: "Tvaroh s banánom", mode: "light" },
    { typeKey: "dinner", name: "Cestoviny s paradajkovou omáčkou", mode: "minimal" },
    { typeKey: "dinner", name: "Zeleninová polievka s pečivom", mode: "budget" },
  ],
  adults: [
    { typeKey: "breakfast", name: "Overnight oats s malinami", mode: "normal" },
    { typeKey: "snack", name: "Skyr a orechy", mode: "busy" },
    { typeKey: "lunch", name: "Kuracie kari s ryžou na dva dni", mode: "two-days" },
    { typeKey: "afternoon", name: "Hummus so zeleninou", mode: "light" },
    { typeKey: "dinner", name: "Vaječná omeleta so šalátom", mode: "minimal" },
    { typeKey: "dinner", name: "Cícerové kari s ryžou", mode: "budget" },
  ],
};

const taskIdeaBank = [
  { title: "Vybrať 3 hlavné jedlá na týždeň", priority: "high", mode: "normal" },
  { title: "Pripraviť dve večere bez varenia", priority: "high", mode: "busy" },
  { title: "Skontrolovať zásoby pred veľkým nákupom", priority: "normal", mode: "normal" },
  { title: "Naplánovať jedno jedlo na dva dni", priority: "normal", mode: "two-days" },
  { title: "Vybrať lacnejšie jedlá zo zásob", priority: "normal", mode: "budget" },
  { title: "Nechať jeden večer úplne jednoduchý", priority: "low", mode: "light" },
];

const familyProfileCopy = {
  calm: {
    label: "Pokojná domácnosť",
    dashboard: "Držíme rytmus bez zbytočného tlaku.",
    taskHint: "Malé kroky",
  },
  busy: {
    label: "Rušná domácnosť",
    dashboard: "Najviac pomôžu rýchle jedlá a krátke kroky.",
    taskHint: "Rýchle kroky",
  },
  budget: {
    label: "Úsporná domácnosť",
    dashboard: "Rozpočet a zásoby majú teraz prednosť.",
    taskHint: "Úsporné kroky",
  },
};

const roleCopy = {
  parent: "Rodič",
  kid: "Dieťa",
  helper: "Pomocník",
};

const cloud = {
  enabled: false,
  ready: false,
  user: null,
  auth: null,
  db: null,
  api: {},
  unsubscribe: null,
  saveTimer: null,
  applyingRemote: false,
  householdId: "",
};

const categoryEstimate = {
  "Ovocie a zelenina": 18,
  Pečivo: 8,
  Mliečne: 16,
  "Mäso a ryby": 28,
  "Suché potraviny": 14,
  "Konzervy a omáčky": 10,
  Detské: 12,
  Ostatné: 10,
};

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
  const fallback = {
    theme: "dark",
    density: "compact",
    showNote: true,
    simpleMeals: false,
    hideDoneShopping: false,
    familyProfile: "calm",
    familyMembers: [
      { id: "member:1", name: "Mama", role: "parent" },
      { id: "member:2", name: "Deti", role: "kid" },
    ],
    familyCode: "",
    monthlyBudget: 0,
    scale: 100,
    displayDensity: "cozy",
    visualStyle: "home",
    backdrop: "soft",
    householdId: localStorage.getItem(householdStorageKey) || "",
    cloudUser: null,
  };

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

function loadWeeklyState() {
  try {
    return JSON.parse(localStorage.getItem(weeklyStorageKey)) || {};
  } catch {
    return {};
  }
}

function loadPantryState() {
  try {
    return JSON.parse(localStorage.getItem(pantryStorageKey)) || pantryStarter.map((name) => ({ id: `pantry:${slug(name)}`, name }));
  } catch {
    return pantryStarter.map((name) => ({ id: `pantry:${slug(name)}`, name }));
  }
}

function savePlans() {
  localStorage.setItem(storageKey, JSON.stringify(state.plans));
  scheduleCloudSave();
}

function saveShoppingState() {
  localStorage.setItem(shoppingStorageKey, JSON.stringify(state.shopping));
  scheduleCloudSave();
}

function saveTasksState() {
  localStorage.setItem(tasksStorageKey, JSON.stringify(state.tasks));
  scheduleCloudSave();
}

function saveSettingsState() {
  localStorage.setItem(settingsStorageKey, JSON.stringify(state.settings));
  if (state.settings.householdId) {
    localStorage.setItem(householdStorageKey, state.settings.householdId);
  }
  scheduleCloudSave();
}

function saveCheckinsState() {
  localStorage.setItem(checkinsStorageKey, JSON.stringify(state.checkins));
  scheduleCloudSave();
}

function saveNotesState() {
  localStorage.setItem(notesStorageKey, JSON.stringify(state.notes));
  scheduleCloudSave();
}

function saveRhythmState() {
  localStorage.setItem(rhythmStorageKey, JSON.stringify(state.rhythm));
  scheduleCloudSave();
}

function saveFavoritesState() {
  localStorage.setItem(favoritesStorageKey, JSON.stringify(state.favorites));
  scheduleCloudSave();
}

function saveWeeklyState() {
  localStorage.setItem(weeklyStorageKey, JSON.stringify(state.weekly));
  scheduleCloudSave();
}

function savePantryState() {
  localStorage.setItem(pantryStorageKey, JSON.stringify(state.pantry));
  scheduleCloudSave();
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

function applyNotePreference() {
  state.settings.showNote ??= true;
  document.body.dataset.note = state.settings.showNote ? "show" : "hide";
  noteToggle.checked = state.settings.showNote;
}

function applyMealMode() {
  document.body.dataset.mealMode = state.settings.simpleMeals ? "simple" : "full";
  simpleMealsButton.classList.toggle("is-active", state.settings.simpleMeals);
  simpleMealsButton.querySelector("span").textContent = state.settings.simpleMeals ? "Plný režim" : "Jednoducho";
}

function setActiveSetting(buttons, dataName, value) {
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset[dataName] === value);
  });
}

function applyPersonalization() {
  state.settings.scale ||= 100;
  state.settings.displayDensity ||= "cozy";
  state.settings.visualStyle ||= "home";
  state.settings.backdrop ||= "soft";

  document.body.style.setProperty("--ui-scale", String(state.settings.scale / 100));
  document.body.dataset.displayDensity = state.settings.displayDensity;
  document.body.dataset.visual = state.settings.visualStyle;
  document.body.dataset.backdrop = state.settings.backdrop;

  scaleRange.value = String(state.settings.scale);
  scaleValue.textContent = `${state.settings.scale}%`;
  setActiveSetting(displayDensityButtons, "densityValue", state.settings.displayDensity);
  setActiveSetting(visualStyleButtons, "visualValue", state.settings.visualStyle);
  setActiveSetting(backdropButtons, "backdropValue", state.settings.backdrop);
}

function ensureFamilySettings() {
  state.settings.familyProfile ||= "calm";
  state.settings.familyMembers ||= [
    { id: "member:1", name: "Mama", role: "parent" },
    { id: "member:2", name: "Deti", role: "kid" },
  ];
  state.settings.familyCode ||= "";
  state.settings.householdId ||= localStorage.getItem(householdStorageKey) || "";
  state.settings.cloudUser ||= null;
  state.settings.monthlyBudget = Number(state.settings.monthlyBudget || 0);
}

function isFirebaseConfigured() {
  const config = window.DOMACI_RYTMUS_FIREBASE;
  return Boolean(
    config?.apiKey
      && config?.projectId
      && !String(config.apiKey).includes("YOUR_")
      && !String(config.projectId).includes("YOUR_")
  );
}

function householdDocIdFor(user) {
  return `home_${user.uid}`;
}

function currentHouseholdId() {
  ensureFamilySettings();
  return state.settings.householdId || cloud.householdId || "";
}

function cloudStatusText() {
  if (!cloud.enabled) return "Lokálny režim";
  if (!cloud.ready) return "Pripájam";
  if (!cloud.user) return "Neprihlásené";
  return cloud.householdId ? "Realtime zapnutý" : "Vyber domácnosť";
}

function bundleState() {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    updatedBy: cloud.user ? {
      uid: cloud.user.uid,
      name: cloud.user.displayName || cloud.user.email || "Člen domácnosti",
      email: cloud.user.email || "",
    } : null,
    plans: state.plans,
    shopping: state.shopping,
    tasks: state.tasks,
    settings: state.settings,
    checkins: state.checkins,
    notes: state.notes,
    rhythm: state.rhythm,
    favorites: state.favorites,
    weekly: state.weekly,
    pantry: state.pantry,
  };
}

function saveAllLocalOnly() {
  localStorage.setItem(storageKey, JSON.stringify(state.plans));
  localStorage.setItem(shoppingStorageKey, JSON.stringify(state.shopping));
  localStorage.setItem(tasksStorageKey, JSON.stringify(state.tasks));
  localStorage.setItem(settingsStorageKey, JSON.stringify(state.settings));
  localStorage.setItem(checkinsStorageKey, JSON.stringify(state.checkins));
  localStorage.setItem(notesStorageKey, JSON.stringify(state.notes));
  localStorage.setItem(rhythmStorageKey, JSON.stringify(state.rhythm));
  localStorage.setItem(favoritesStorageKey, JSON.stringify(state.favorites));
  localStorage.setItem(weeklyStorageKey, JSON.stringify(state.weekly));
  localStorage.setItem(pantryStorageKey, JSON.stringify(state.pantry));
  if (state.settings.householdId) {
    localStorage.setItem(householdStorageKey, state.settings.householdId);
  }
}

function applyRemoteBundle(payload) {
  if (!payload) return;
  cloud.applyingRemote = true;
  state.plans = payload.plans || state.plans;
  state.shopping = payload.shopping || state.shopping;
  state.tasks = payload.tasks || state.tasks;
  state.settings = { ...state.settings, ...(payload.settings || {}) };
  state.checkins = payload.checkins || state.checkins;
  state.notes = payload.notes || state.notes;
  state.rhythm = payload.rhythm || state.rhythm;
  state.favorites = payload.favorites || state.favorites;
  state.weekly = payload.weekly || state.weekly;
  state.pantry = payload.pantry || state.pantry;
  ensureSignedInMember();
  saveAllLocalOnly();
  renderCurrentView();
  cloud.applyingRemote = false;
}

function ensureSignedInMember() {
  if (!cloud.user) return;
  ensureFamilySettings();
  const memberName = cloud.user.displayName || cloud.user.email?.split("@")[0] || "Člen domácnosti";
  const exists = state.settings.familyMembers.some((member) => member.uid === cloud.user.uid);
  if (!exists) {
    state.settings.familyMembers = [
      { id: `member:${cloud.user.uid}`, uid: cloud.user.uid, name: memberName, role: "parent" },
      ...state.settings.familyMembers,
    ].slice(0, 8);
  }
  state.settings.cloudUser = {
    uid: cloud.user.uid,
    name: memberName,
    email: cloud.user.email || "",
    photoURL: cloud.user.photoURL || "",
  };
}

function renderCloudStatus() {
  const signedInName = cloud.user?.displayName || cloud.user?.email || "";
  document.body.dataset.cloud = cloud.user ? "signed-in" : cloud.enabled ? "ready" : "off";
  if (syncStatusDot) syncStatusDot.title = cloudStatusText();
  if (googleLoginButton) {
    googleLoginButton.disabled = !cloud.enabled || !cloud.ready;
    googleLoginButton.hidden = Boolean(cloud.user);
  }
  if (googleLogoutButton) googleLogoutButton.hidden = !cloud.user;
  if (accountEyebrow) accountEyebrow.textContent = cloudStatusText();
  if (accountTitle) accountTitle.textContent = cloud.user ? signedInName : "Prihlásenie cez Google";
  if (accountDetail) {
    accountDetail.textContent = !cloud.enabled
      ? "Doplň Firebase konfiguráciu a appka zapne Google login aj realtime domácnosť."
      : cloud.user
        ? `Domácnosť: ${currentHouseholdId() || "zatiaľ bez kódu"}. Zmeny sa ukladajú pre všetkých členov.`
        : "Po prihlásení môže domácnosť zdieľať jedlá, nákup a kroky v reálnom čase.";
  }
  if (settingsStatus) settingsStatus.textContent = cloudStatusText();
}

function scheduleCloudSave() {
  if (!cloud.ready || !cloud.user || !cloud.householdId || cloud.applyingRemote) return;
  clearTimeout(cloud.saveTimer);
  cloud.saveTimer = setTimeout(saveCloudNow, 650);
}

async function saveCloudNow() {
  if (!cloud.ready || !cloud.user || !cloud.householdId || cloud.applyingRemote) return;
  try {
    const { doc, setDoc } = cloud.api;
    await setDoc(doc(cloud.db, "households", cloud.householdId), bundleState(), { merge: true });
    renderCloudStatus();
  } catch (error) {
    console.error(error);
    showToast("Cloud uloženie zlyhalo. Lokálne dáta ostali v appke.");
  }
}

async function listenToHousehold(householdId) {
  if (!householdId || !cloud.ready) return;
  cloud.unsubscribe?.();
  cloud.householdId = householdId;
  state.settings.householdId = householdId;
  saveAllLocalOnly();

  const { doc, getDoc, setDoc, onSnapshot } = cloud.api;
  const ref = doc(cloud.db, "households", householdId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    await setDoc(ref, bundleState(), { merge: true });
  }

  cloud.unsubscribe = onSnapshot(ref, (nextSnapshot) => {
    if (!nextSnapshot.exists()) return;
    applyRemoteBundle(nextSnapshot.data());
    renderCloudStatus();
  }, (error) => {
    console.error(error);
    showToast("Realtime spojenie sa nepodarilo načítať.");
  });
}

async function handleAuthUser(user) {
  cloud.user = user;
  if (!user) {
    cloud.unsubscribe?.();
    cloud.unsubscribe = null;
    cloud.householdId = "";
    renderCloudStatus();
    return;
  }

  ensureFamilySettings();
  const householdId = currentHouseholdId() || householdDocIdFor(user);
  state.settings.householdId = householdId;
  cloud.householdId = householdId;
  ensureSignedInMember();
  saveSettingsState();
  renderCloudStatus();
  await listenToHousehold(householdId);
  showToast("Google účet je pripojený.");
}

async function initCloud() {
  cloud.enabled = isFirebaseConfigured();
  renderCloudStatus();
  if (!cloud.enabled) return;

  try {
    const [appModule, authModule, firestoreModule] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${firebaseSdkVersion}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${firebaseSdkVersion}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${firebaseSdkVersion}/firebase-firestore.js`),
    ]);

    const app = appModule.initializeApp(window.DOMACI_RYTMUS_FIREBASE);
    cloud.auth = authModule.getAuth(app);
    cloud.db = firestoreModule.getFirestore(app);
    cloud.api = {
      GoogleAuthProvider: authModule.GoogleAuthProvider,
      signInWithPopup: authModule.signInWithPopup,
      signOut: authModule.signOut,
      onAuthStateChanged: authModule.onAuthStateChanged,
      doc: firestoreModule.doc,
      getDoc: firestoreModule.getDoc,
      setDoc: firestoreModule.setDoc,
      onSnapshot: firestoreModule.onSnapshot,
    };
    cloud.ready = true;
    cloud.api.onAuthStateChanged(cloud.auth, handleAuthUser);
    renderCloudStatus();
  } catch (error) {
    console.error(error);
    cloud.enabled = false;
    cloud.ready = false;
    renderCloudStatus();
    showToast("Firebase sa nepodarilo spustiť. Skontroluj konfiguráciu.");
  }
}

async function signInWithGoogle() {
  if (!cloud.ready) {
    showToast("Najprv doplň Firebase konfiguráciu.");
    return;
  }
  try {
    await cloud.api.signInWithPopup(cloud.auth, new cloud.api.GoogleAuthProvider());
  } catch (error) {
    console.error(error);
    showToast("Google prihlásenie sa nepodarilo.");
  }
}

async function signOutGoogle() {
  if (!cloud.ready) return;
  await cloud.api.signOut(cloud.auth);
  showToast("Odhlásené. Appka ostáva dostupná lokálne.");
}

async function createFamilyInviteCode() {
  if (!cloud.ready || !cloud.user) {
    showToast("Najprv sa prihlás cez Google.");
    return;
  }
  ensureFamilySettings();
  const code = `DOM-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const householdId = currentHouseholdId() || householdDocIdFor(cloud.user);
  const { doc, setDoc } = cloud.api;
  state.settings.householdId = householdId;
  state.settings.familyCode = code;
  cloud.householdId = householdId;
  saveSettingsState();
  await setDoc(doc(cloud.db, "familyCodes", code), {
    householdId,
    createdBy: cloud.user.uid,
    createdAt: new Date().toISOString(),
  });
  await listenToHousehold(householdId);
  renderFamilySettings();
  renderCloudStatus();
  showToast(`Kód ${code} je pripravený.`);
}

async function joinFamilyByCode(code) {
  if (!cloud.ready || !cloud.user) {
    showToast("Najprv sa prihlás cez Google.");
    return;
  }
  const normalized = code.trim().toUpperCase();
  if (!normalized) return;

  const { doc, getDoc } = cloud.api;
  const snapshot = await getDoc(doc(cloud.db, "familyCodes", normalized));
  if (!snapshot.exists()) {
    showToast("Taký domáci kód som nenašiel.");
    return;
  }

  state.settings.householdId = snapshot.data().householdId;
  state.settings.familyCode = normalized;
  cloud.householdId = snapshot.data().householdId;
  ensureSignedInMember();
  saveSettingsState();
  await listenToHousehold(cloud.householdId);
  renderCurrentView();
  showToast("Pripojené ku domácnosti.");
}

function familyMembers() {
  ensureFamilySettings();
  return state.settings.familyMembers.length
    ? state.settings.familyMembers
    : [{ id: "shared", name: "Spoločné", role: "helper" }];
}

function assigneeLabel(id) {
  if (!id || id === "shared") return "Spoločné";
  return familyMembers().find((member) => member.id === id)?.name || "Spoločné";
}

function nextAssignee(currentId) {
  const ids = ["shared", ...familyMembers().map((member) => member.id)];
  const index = ids.indexOf(currentId || "shared");
  return ids[(index + 1) % ids.length];
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

function weeklyContext() {
  const key = contextKey();
  state.weekly[key] ||= {
    mode: "normal",
    cooking: "normal",
    busyDays: [],
    prep: [],
    stock: [],
  };
  state.weekly[key].mode ||= "normal";
  state.weekly[key].cooking ||= "normal";
  state.weekly[key].busyDays ||= [];
  state.weekly[key].prep ||= [];
  state.weekly[key].stock ||= [];
  return state.weekly[key];
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

function pantryNames() {
  return new Set(state.pantry.map((item) => item.name.toLowerCase()));
}

function isInPantry(name) {
  const normalized = name.toLowerCase();
  return [...pantryNames()].some((pantryItem) => normalized.includes(pantryItem) || pantryItem.includes(normalized));
}

function renderShopping() {
  const checked = new Set(checkedShoppingIds());
  const items = shoppingItems();
  const visibleItems = state.settings.hideDoneShopping
    ? items.filter((item) => !checked.has(item.id))
    : items;
  const openCount = items.filter((item) => !checked.has(item.id)).length;
  const doneCount = items.length - openCount;
  const progress = progressPercent(doneCount, items.length);
  const groups = shoppingCategoryOrder
    .map((category) => ({
      category,
      items: visibleItems.filter((item) => (item.category || "Ostatné") === category),
    }))
    .filter((group) => group.items.length);

  shoppingCount.textContent = `${openCount} z ${items.length}`;
  shoppingBadge.textContent = openCount > 9 ? "9+" : String(openCount);
  shoppingBadge.hidden = openCount === 0;
  shoppingProgressText.textContent = `${progress} % vybavené`;
  shoppingProgressBar.style.width = `${progress}%`;
  hideDoneShoppingButton.textContent = state.settings.hideDoneShopping ? "Ukázať hotové" : "Skryť hotové";
  hideDoneShoppingButton.classList.toggle("is-active", state.settings.hideDoneShopping);

  shoppingList.innerHTML = groups.length
    ? groups
        .map((group) => `
          <section class="shopping-category">
            <div class="shopping-category-header">
              <h3>${group.category}</h3>
              <span>${group.items.filter((item) => !checked.has(item.id)).length} z ${group.items.length}</span>
              <button type="button" data-check-category="${escapeHtml(group.category)}">Vybaviť</button>
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
            <label class="shopping-item ${isDone ? "is-done" : ""} ${isInPantry(item.name) ? "is-pantry" : ""}">
              <input type="checkbox" data-id="${item.id}" ${isDone ? "checked" : ""}>
              <span>
                <strong>${escapeHtml(item.name)}</strong>
                <span>${isInPantry(item.name) ? "Máš doma v špajzi" : source}</span>
              </span>
              ${deleteButton}
            </label>
          `;
        })
        .join("")}
          </section>
        `)
        .join("")
    : `<div class="empty-state">${items.length ? "Hotové položky sú skryté. Nákup vyzerá čisto." : "Zatiaľ tu nič nie je. Pridaj jedlo alebo položku ručne."}</div>`;
}

function renderPantry() {
  pantryCount.textContent = `${state.pantry.length} ${state.pantry.length === 1 ? "vec" : "vecí"}`;
  pantryList.innerHTML = state.pantry.length
    ? state.pantry.map((item) => `
        <span class="pantry-chip">
          ${escapeHtml(item.name)}
          <button type="button" data-remove-pantry="${item.id}" aria-label="Odstrániť ${escapeHtml(item.name)}">×</button>
        </span>
      `).join("")
    : `<div class="empty-state">Pridaj veci, ktoré máte doma. Nákup bude múdrejší.</div>`;
}

function renderStockCheck() {
  const weekly = weeklyContext();
  const checked = new Set(weekly.stock || []);
  stockCount.textContent = `${checked.size}/${stockBasics.length}`;
  stockList.innerHTML = stockBasics
    .map((item) => `
      <label class="stock-item">
        <input type="checkbox" data-stock="${escapeHtml(item)}" ${checked.has(item) ? "checked" : ""}>
        <span>${escapeHtml(item)}</span>
      </label>
    `)
    .join("");
}

function buildSmartTips(meals, tasks, shopping, openShopping) {
  const tips = [];
  const dinners = meals.filter((meal) => meal.typeKey === "dinner").length;
  const favoriteToUse = state.favorites.find((name) => !meals.some((meal) => meal.name === name));
  const weekly = weeklyContext();
  const monthly = monthlySpendEstimate();
  const budget = state.settings.monthlyBudget || 0;

  if (budget && monthly > budget) {
    tips.push({
      icon: "€",
      title: "Rozpočet je nad limitom",
      detail: "Skús pozrieť lacnejšie jedlá alebo zásoby doma.",
      action: "more",
    });
  } else if (state.settings.familyProfile === "budget" && budget) {
    tips.push({
      icon: "€",
      title: "Držať nákup v rozpočte",
      detail: `${monthly} € z ${budget} € mesačne podľa aktuálneho zoznamu.`,
      action: "shopping",
    });
  }

  if (weekly.cooking === "two-days") {
    tips.push({
      icon: "2",
      title: "Naplánovať jedlá na dva dni",
      detail: "Vyber 2-3 jedlá, ktoré sa dajú použiť aj na ďalší deň.",
      action: "meals",
    });
  }

  if (weekly.mode === "busy") {
    tips.push({
      icon: "⏱",
      title: "Zjednodušiť rušné dni",
      detail: "Na označené dni sa hodia rýchle večere alebo zvyšky.",
      action: "meals",
    });
  }

  if (dinners < Math.min(3, currentPlan().days.length) && favoriteToUse) {
    tips.push({
      icon: "★",
      title: "Doplniť večeru z obľúbených",
      detail: favoriteToUse,
      action: "favorite",
      value: favoriteToUse,
    });
  }

  if (openShopping.length > 8) {
    tips.push({
      icon: "🛒",
      title: "Vybaviť nákup po kategóriách",
      detail: `${openShopping.length} položiek čaká v zozname`,
      action: "shopping",
    });
  }

  if (!tasks.some((task) => task.priority === "low" && !task.done)) {
    tips.push({
      icon: "✓",
      title: "Pridať krok na neskôr",
      detail: "Niečo, čo nemusí byť dnes, ale nech sa nestratí.",
      action: "tasks",
    });
  }

  if (!tips.length && shopping.length) {
    tips.push({
      icon: "✓",
      title: "Vyzerá to pripravené",
      detail: "Najbližšie stačí priebežne odškrtávať hotové veci.",
      action: "home",
    });
  }

  return tips.slice(0, 3);
}

function renderSmartTips(meals, tasks, shopping, openShopping) {
  const tips = buildSmartTips(meals, tasks, shopping, openShopping);
  smartTipList.innerHTML = tips.length
    ? tips.map((tip) => `
        <button class="smart-tip" type="button" data-tip-action="${tip.action}" data-tip-value="${escapeHtml(tip.value || "")}">
          <span aria-hidden="true">${tip.icon}</span>
          <strong>${escapeHtml(tip.title)}</strong>
          <em>${escapeHtml(tip.detail)}</em>
        </button>
      `).join("")
    : `<div class="empty-state">Žiadne smart tipy teraz netreba.</div>`;
}

function renderWeeklyPlanner() {
  const plan = currentPlan();
  const weekly = weeklyContext();
  const prepDone = new Set(weekly.prep || []);
  const busyDays = new Set(weekly.busyDays || []);

  weekModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === weekly.mode);
  });
  cookingModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.cooking === weekly.cooking);
  });

  busyDayList.innerHTML = plan.days
    .map((day, index) => `
      <button type="button" class="${busyDays.has(String(index)) ? "is-active" : ""}" data-busy-day="${index}">
        ${escapeHtml(day.name.split(",")[0])}
      </button>
    `)
    .join("");

  weekPrepCount.textContent = `${prepDone.size}/${prepSteps.length}`;
  weekPrepList.innerHTML = prepSteps
    .map((step) => `
      <label class="prep-item ${prepDone.has(step.key) ? "is-done" : ""}">
        <input type="checkbox" data-prep-step="${step.key}" ${prepDone.has(step.key) ? "checked" : ""}>
        <span>${escapeHtml(step.label)}</span>
      </label>
    `)
    .join("");
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
      <button class="assignee-pill" type="button" data-assign-task="${task.id}" aria-label="Priradiť krok ${escapeHtml(task.title)}">
        ${escapeHtml(assigneeLabel(task.assignee))}
      </button>
      <span class="priority-pill ${task.priority}">${priorityLabel(task.priority)}</span>
      <button class="delete-task" type="button" data-id="${task.id}" aria-label="Odstrániť krok ${escapeHtml(task.title)}">
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
    : `<div class="empty-state">Zatiaľ tu nie sú žiadne kroky.</div>`;
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

function weeklyReadiness(meals, tasks, shopping, openShopping) {
  const weekly = weeklyContext();
  const prepDone = weekly.prep?.length || 0;
  const stockDone = Math.max(weekly.stock?.length || 0, state.pantry.length);
  const openTasks = tasks.filter((task) => !task.done).length;
  const signals = [
    { label: "Jedlá", value: progressPercent(meals.length, 21) },
    { label: "Príprava", value: progressPercent(prepDone, prepSteps.length) },
    { label: "Zásoby", value: progressPercent(stockDone, Math.max(stockBasics.length, 1)) },
    { label: "Nákup", value: progressPercent(shopping.length - openShopping.length, shopping.length) },
  ];
  const score = Math.round(signals.reduce((sum, signal) => sum + signal.value, 0) / signals.length);

  let title = "Týždeň sa skladá";
  let detail = "Stačí doplniť pár miest a nákup bude prehľadnejší.";

  if (score >= 85 && openTasks <= 2) {
    title = "Týždeň je pripravený";
    detail = "Jedlá, nákup aj príprava vyzerajú pokojne. Teraz stačí držať rytmus.";
  } else if (meals.length < 10) {
    title = "Chýba pár jedál";
    detail = "Najväčší efekt bude mať rýchle doplnenie obedov a večerí.";
  } else if (openShopping.length > 8) {
    title = "Nákup je hlavný krok";
    detail = "Zoznam už existuje. Pomôže vybaviť ho po kategóriách.";
  } else if (prepDone < 3) {
    title = "Víkendová príprava pomôže";
    detail = "Stačí zaškrtnúť pár prípravných vecí a týždeň bude ľahší.";
  }

  return { score, title, detail, signals };
}

function renderWeeklyCompass(meals, tasks, shopping, openShopping) {
  const compass = weeklyReadiness(meals, tasks, shopping, openShopping);
  weeklyCompassScore.textContent = `${compass.score}%`;
  weeklyCompassTitle.textContent = compass.title;
  weeklyCompassDetail.textContent = compass.detail;
  weeklyCompassScore.parentElement.style.setProperty("--score", `${compass.score}%`);
  weeklyCompassSignals.innerHTML = compass.signals
    .map((signal) => `
      <span>
        <strong>${escapeHtml(signal.label)}</strong>
        <em>${signal.value}%</em>
      </span>
    `)
    .join("");
}

function nextOpenMealSlot(typeKey) {
  const plan = currentPlan();
  const dayIndex = plan.days.findIndex((day) => !day.meals.some((meal) => meal.typeKey === typeKey));
  return dayIndex === -1 ? nextMealSlot().dayIndex : dayIndex;
}

function mealIdeas() {
  const weekly = weeklyContext();
  const existing = new Set(allMeals().map((meal) => meal.name));
  const preferredModes = [weekly.cooking, weekly.mode, "normal"];
  const ideas = mealIdeaBank[state.audience]
    .filter((idea) => preferredModes.includes(idea.mode))
    .filter((idea) => !existing.has(idea.name));

  return [...ideas, ...mealIdeaBank[state.audience].filter((idea) => !existing.has(idea.name))]
    .filter((idea, index, list) => list.findIndex((item) => item.name === idea.name) === index)
    .slice(0, 5);
}

function renderQuickMealIdeas() {
  const weekly = weeklyContext();
  const ideas = mealIdeas();
  quickMealHint.textContent = weekly.mode === "busy" || weekly.cooking === "minimal"
    ? "Rýchle jedlá"
    : weekly.cooking === "two-days"
      ? "Na dva dni"
      : "Podľa týždňa";
  quickMealList.innerHTML = ideas.length
    ? ideas.map((idea) => {
        const type = mealTypeFor(idea.typeKey);
        return `
          <button type="button" data-quick-meal="${escapeHtml(idea.name)}" data-quick-meal-type="${idea.typeKey}">
            <span aria-hidden="true">${type.icon}</span>
            <strong>${escapeHtml(idea.name)}</strong>
            <em>${type.label}</em>
          </button>
        `;
      }).join("")
    : `<div class="empty-state">Návrhy sú už v pláne. Pridaj vlastné jedlo alebo použi obľúbené.</div>`;
}

function pantryCookIdeas() {
  const pantry = pantryNames();
  const existing = new Set(allMeals().map((meal) => meal.name));
  return pantryRecipeIdeas
    .map((idea) => {
      const matches = idea.needs.filter((need) => pantry.has(need.toLowerCase()));
      return { ...idea, matches };
    })
    .filter((idea) => idea.matches.length && !existing.has(idea.name))
    .sort((a, b) => b.matches.length - a.matches.length)
    .slice(0, 4);
}

function renderPantryCookIdeas() {
  const ideas = pantryCookIdeas();
  pantryCookHint.textContent = ideas.length ? `${ideas.length} tipy` : "Doplň špajzu";
  pantryCookList.innerHTML = ideas.length
    ? ideas.map((idea) => {
        const type = mealTypeFor(idea.typeKey);
        return `
          <button type="button" data-pantry-meal="${escapeHtml(idea.name)}" data-pantry-meal-type="${idea.typeKey}">
            <span aria-hidden="true">${type.icon}</span>
            <strong>${escapeHtml(idea.name)}</strong>
            <em>${idea.matches.length}/${idea.needs.length} doma</em>
          </button>
        `;
      }).join("")
    : `<div class="empty-state">Pridaj do špajze ryžu, vajcia, zeleninu alebo cestoviny a appka navrhne jedlá.</div>`;
}

function addQuickMeal(name, typeKey) {
  const dayIndex = nextOpenMealSlot(typeKey);
  currentPlan().days[dayIndex].meals.push({ typeKey, name });
  savePlans();
  renderCurrentView();
  showToast("Jedlo doplnené do najbližšieho voľného dňa.");
}

function taskIdeas() {
  const weekly = weeklyContext();
  const existing = new Set(currentTasks().map((task) => task.title));
  const preferredModes = [weekly.cooking, weekly.mode, "normal"];

  return taskIdeaBank
    .filter((idea) => preferredModes.includes(idea.mode))
    .filter((idea) => !existing.has(idea.title))
    .slice(0, 4);
}

function renderQuickTaskIdeas() {
  const ideas = taskIdeas();
  quickTaskHint.textContent = familyProfileCopy[state.settings.familyProfile]?.taskHint || (ideas.length === 1 ? "1 návrh" : `${ideas.length} návrhy`);
  quickTaskList.innerHTML = ideas.length
    ? ideas.map((idea) => `
        <button type="button" data-quick-task="${escapeHtml(idea.title)}" data-quick-task-priority="${idea.priority}">
          <strong>${escapeHtml(idea.title)}</strong>
          <span>${priorityLabel(idea.priority)}</span>
        </button>
      `).join("")
    : `<div class="empty-state">Najčastejšie kroky už máš pridané.</div>`;
}

function estimatedWeeklySpend() {
  return shoppingItems().reduce((sum, item) => sum + (categoryEstimate[item.category || "Ostatné"] || 10), 0);
}

function monthlySpendEstimate() {
  return estimatedWeeklySpend() * 4;
}

function renderBudget() {
  ensureFamilySettings();
  const budget = state.settings.monthlyBudget;
  const monthly = monthlySpendEstimate();
  const percent = budget ? progressPercent(monthly, budget) : 0;
  const profile = familyProfileCopy[state.settings.familyProfile] || familyProfileCopy.calm;

  budgetValue.textContent = budget ? `${monthly} € / ${budget} €` : `${monthly} €`;
  budgetBar.style.width = `${Math.min(percent, 100)}%`;
  budgetBar.classList.toggle("is-over", Boolean(budget && monthly > budget));
  budgetTitle.textContent = budget
    ? monthly > budget
      ? "Rozpočet je napnutý"
      : "Rozpočet vyzerá dobre"
    : "Nastav mesačný limit";
  budgetDetail.textContent = budget
    ? `${profile.label}: odhad mesiaca je ${percent} % z limitu.`
    : "Odhad vychádza z aktuálneho nákupného zoznamu krát 4 týždne.";
  monthlyBudgetInput.value = budget ? String(budget) : "";
  monthlyBudgetStatus.textContent = budget ? `Limit ${budget} €` : "Bez limitu";
}

function renderFamilySettings() {
  if (!familyCodeDetail || !familyCodeButton || !memberList) return;
  ensureFamilySettings();
  const profile = familyProfileCopy[state.settings.familyProfile] || familyProfileCopy.calm;

  setActiveSetting(familyProfileButtons, "profileValue", state.settings.familyProfile);
  familyCodeDetail.textContent = state.settings.familyCode
    ? `Kód ${state.settings.familyCode} pripojí druhého človeka do tej istej domácnosti.`
    : cloud.user
      ? "Vytvor kód a pošli ho druhému členovi domácnosti."
      : "Najprv sa prihlás cez Google, potom vytvoríš domáci kód.";
  familyCodeButton.textContent = state.settings.familyCode ? "Nový kód" : "Vytvoriť";
  familyCodeButton.disabled = !cloud.user;
  if (!cloud.user && settingsStatus) settingsStatus.textContent = profile.label;
  memberList.innerHTML = state.settings.familyMembers.length
    ? state.settings.familyMembers.map((member) => `
        <div class="member-chip">
          <span>${escapeHtml(member.name)}</span>
          <em>${roleCopy[member.role] || "Člen"}</em>
          <button type="button" data-remove-member="${member.id}" aria-label="Odstrániť ${escapeHtml(member.name)}">×</button>
        </div>
      `).join("")
    : `<div class="empty-state">Pridaj prvého člena domácnosti.</div>`;
}

function addQuickTask(title, priority) {
  currentTasks().push({
    id: `task:${Date.now()}:${slug(title)}`,
    title,
    priority,
    due: "",
    done: false,
  });
  saveTasksState();
  renderCurrentView();
  showToast("Krok pridaný.");
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
      detail: "Jedlá, kroky aj nákup vyzerajú pripravené",
      tab: "home",
      tone: "calm",
    });
  }

  return actions.slice(0, 3);
}

function restoreDemoData() {
  state.plans = normalizePlans(starterPlans);
  state.tasks = clone(starterTasks);
  state.shopping = { checked: {}, manual: {} };
  state.pantry = pantryStarter.map((name) => ({ id: `pantry:${slug(name)}`, name }));
  savePlans();
  saveTasksState();
  saveShoppingState();
  savePantryState();
  renderCurrentView();
  showToast("Ukážkový týždeň je späť.");
}

function renderFamilyHandoff(openTasks, openShopping) {
  const members = familyMembers();
  const buckets = [
    { id: "shared", name: "Spoločné", icon: "∞" },
    ...members.slice(0, 3).map((member) => ({ id: member.id, name: member.name, icon: member.name.slice(0, 1).toUpperCase() })),
  ];
  const waitingForSomeone = openTasks.filter((task) => task.assignee && task.assignee !== "shared").length;

  familyHandoffTitle.textContent = waitingForSomeone
    ? "Veci sú rozdelené"
    : "Zatiaľ je všetko spoločné";
  familyHandoffDetail.textContent = openShopping.length
    ? `${openShopping.length} položiek v nákupe. Pri krokoch klikni na meno a rozdeľte si ich.`
    : "Nákup je pokojný. Stačí si rozdeliť najbližšie domáce kroky.";

  familyHandoffList.innerHTML = buckets
    .map((bucket) => {
      const assigned = openTasks.filter((task) => (task.assignee || "shared") === bucket.id);
      return `
        <button class="handoff-card" type="button" data-jump-tab="tasks">
          <span aria-hidden="true">${escapeHtml(bucket.icon)}</span>
          <strong>${escapeHtml(bucket.name)}</strong>
          <em>${assigned.length} ${assigned.length === 1 ? "krok" : "kroky"}</em>
        </button>
      `;
    })
    .join("");
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
  const isEmptyHome = !meals.length && !tasks.length && !shopping.length;

  homeEyebrow.textContent = plan.label;
  homeTitle.textContent = plan.range;
  homeAudience.textContent = `${state.audience === "kids" ? "Deti" : "Dospelí"} · ${(familyProfileCopy[state.settings.familyProfile] || familyProfileCopy.calm).label.replace(" domácnosť", "")}`;
  homeMealsCount.textContent = String(meals.length);
  homeTasksCount.textContent = String(openTasks.length);
  homeShoppingCount.textContent = String(openShopping.length);
  homeMealsHint.textContent = meals.length === 1 ? "jedlo v pláne" : "jedál v pláne";
  homeTasksHint.textContent = openTasks.length === 1 ? "otvorený krok" : "otvorených krokov";
  homeShoppingHint.textContent = openShopping.length === 1 ? "položka chýba" : "položiek chýba";
  homeMealVisualValue.textContent = String(meals.length);
  homeTaskVisualValue.textContent = `${doneTasks}/${tasks.length || 0}`;
  homeShoppingVisualValue.textContent = `${shopping.length - openShopping.length}/${shopping.length || 0}`;
  homeMealMeter.style.width = `${progressPercent(meals.length, 21)}%`;
  homeTaskMeter.style.width = `${progressPercent(doneTasks, tasks.length)}%`;
  homeShoppingMeter.style.width = `${progressPercent(shopping.length - openShopping.length, shopping.length)}%`;
  homeStartEmpty.hidden = !isEmptyHome;
  renderFamilyHandoff(openTasks, openShopping);
  renderWeeklyCompass(meals, tasks, shopping, openShopping);
  renderBudget();
  renderSmartTips(meals, tasks, shopping, openShopping);

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
  homeActionList.closest(".next-actions").hidden = !homeActionList.children.length;
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
    : emptyMiniRow("Všetky kroky sú hotové.");

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
  smartTipList.closest(".smart-tips").hidden = !smartTipList.children.length;
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
  try {
    renderPlan();
    renderShopping();
    renderStockCheck();
    renderPantry();
    renderTasks();
    renderHome();
    renderFavoriteLibrary();
    renderQuickMealIdeas();
    renderPantryCookIdeas();
    renderQuickTaskIdeas();
    renderFamilySettings();
    renderBudget();
    renderWeeklyPlanner();
    renderCheckin();
    renderRhythm();
    renderDailyNote();
    applyTheme();
    applyDensity();
    applyNotePreference();
    applyMealMode();
    applyPersonalization();
    if (settingsStatus) {
      settingsStatus.textContent = cloud.enabled ? cloudStatusText() : state.settings.theme === "light" ? "Svetlá téma" : "Tmavá téma";
    }
    renderCloudStatus();
  } catch (error) {
    console.error(error);
    showToast("Appka narazila na chybu zobrazenia. Skús obnoviť stránku.");
  }
}

function setActiveTab(tab) {
  state.activeTab = tab;

  document.querySelectorAll(".bottom-nav [data-tab]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.tab === state.activeTab);
  });

  document.querySelectorAll(".view").forEach((view) => {
    const isKnown = ["home", "meals", "shopping", "tasks", "more"].includes(state.activeTab);
    const isActive = view.dataset.view === state.activeTab || (view.dataset.view === "placeholder" && !isKnown);

    view.hidden = !isActive;
    view.classList.toggle("is-active", isActive);
  });

  if (!["home", "meals", "shopping", "tasks", "more"].includes(state.activeTab)) {
    const labels = {
      home: "Domov",
      more: "Viac",
    };

    placeholderEyebrow.textContent = "Domáci Rytmus";
    placeholderTitle.textContent = `${labels[state.activeTab] || state.activeTab} sa pripravuje`;
  }
}

window.setActiveTab = setActiveTab;

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

weekModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    weeklyContext().mode = button.dataset.mode;
    saveWeeklyState();
    renderCurrentView();
    showToast(weekModeCopy[button.dataset.mode]);
  });
});

cookingModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    weeklyContext().cooking = button.dataset.cooking;
    saveWeeklyState();
    renderCurrentView();
    showToast(cookingModeCopy[button.dataset.cooking]);
  });
});

busyDayList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-busy-day]");
  if (!button) return;
  const weekly = weeklyContext();
  const busy = new Set(weekly.busyDays || []);
  if (busy.has(button.dataset.busyDay)) {
    busy.delete(button.dataset.busyDay);
  } else {
    busy.add(button.dataset.busyDay);
  }
  weekly.busyDays = [...busy];
  saveWeeklyState();
  renderWeeklyPlanner();
});

weekPrepList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-prep-step]");
  if (!checkbox) return;
  const weekly = weeklyContext();
  const prep = new Set(weekly.prep || []);
  if (checkbox.checked) {
    prep.add(checkbox.dataset.prepStep);
  } else {
    prep.delete(checkbox.dataset.prepStep);
  }
  weekly.prep = [...prep];
  saveWeeklyState();
  renderWeeklyPlanner();
});

document.querySelector("#addMealButton").addEventListener("click", () => {
  openMealDialog("add");
});

document.querySelector("#resetPlanButton").addEventListener("click", () => {
  state.plans = normalizePlans(starterPlans);
  savePlans();
  renderCurrentView();
});

simpleMealsButton.addEventListener("click", () => {
  state.settings.simpleMeals = !state.settings.simpleMeals;
  saveSettingsState();
  applyMealMode();
});

document.querySelector(".sync-button").addEventListener("click", () => {
  if (cloud.user) {
    saveCloudNow();
    showToast("Synchronizujem domácnosť.");
    return;
  }
  setActiveTab("more");
  showToast(cloud.enabled ? "Prihlás sa cez Google." : "Doplň Firebase konfiguráciu.");
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

quickMealList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-quick-meal]");
  if (!button) return;
  addQuickMeal(button.dataset.quickMeal, button.dataset.quickMealType);
});

pantryCookList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-pantry-meal]");
  if (!button) return;
  addQuickMeal(button.dataset.pantryMeal, button.dataset.pantryMealType);
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

pantryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = pantryName.value.trim();
  if (!name) return;
  if (!state.pantry.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
    state.pantry = [{ id: `pantry:${Date.now()}:${slug(name)}`, name }, ...state.pantry].slice(0, 30);
    savePantryState();
  }
  pantryName.value = "";
  renderCurrentView();
  showToast("Pridané do špajze.");
});

pantryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-pantry]");
  if (!button) return;
  state.pantry = state.pantry.filter((item) => item.id !== button.dataset.removePantry);
  savePantryState();
  renderCurrentView();
});

hideDoneShoppingButton.addEventListener("click", () => {
  state.settings.hideDoneShopping = !state.settings.hideDoneShopping;
  saveSettingsState();
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
  const categoryButton = event.target.closest("button[data-check-category]");
  if (categoryButton) {
    const ids = shoppingItems()
      .filter((item) => (item.category || "Ostatné") === categoryButton.dataset.checkCategory)
      .map((item) => item.id);
    setCheckedShoppingIds([...new Set([...checkedShoppingIds(), ...ids])]);
    renderShopping();
    renderHome();
    showToast("Kategória je vybavená.");
    return;
  }

  const button = event.target.closest(".delete-shopping");
  if (!button) return;

  const key = contextKey();
  state.shopping.manual[key] = manualShoppingItems().filter((item) => item.id !== button.dataset.id);
  state.shopping.checked[key] = checkedShoppingIds().filter((id) => id !== button.dataset.id);
  saveShoppingState();
  renderShopping();
  renderHome();
});

stockList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-stock]");
  if (!checkbox) return;
  const weekly = weeklyContext();
  const stock = new Set(weekly.stock || []);
  if (checkbox.checked) {
    stock.add(checkbox.dataset.stock);
  } else {
    stock.delete(checkbox.dataset.stock);
  }
  weekly.stock = [...stock];
  saveWeeklyState();
  renderStockCheck();
});

smartTipList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tip-action]");
  if (!button) return;

  if (button.dataset.tipAction === "favorite" && button.dataset.tipValue) {
    addFavoriteToPlan(button.dataset.tipValue);
    return;
  }

  setActiveTab(button.dataset.tipAction);
});

restoreDemoButton.addEventListener("click", restoreDemoData);

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

quickTaskList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-quick-task]");
  if (!button) return;
  addQuickTask(button.dataset.quickTask, button.dataset.quickTaskPriority);
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
  const assignButton = event.target.closest("[data-assign-task]");
  if (assignButton) {
    const task = currentTasks().find((item) => item.id === assignButton.dataset.assignTask);
    if (!task) return;
    task.assignee = nextAssignee(task.assignee);
    saveTasksState();
    renderTasks();
    renderHome();
    showToast(`Priradené: ${assigneeLabel(task.assignee)}.`);
    return;
  }

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

noteToggle.addEventListener("change", () => {
  state.settings.showNote = noteToggle.checked;
  saveSettingsState();
  applyNotePreference();
  settingsStatus.textContent = noteToggle.checked ? "Poznámka zobrazená" : "Poznámka skrytá";
});

scaleRange.addEventListener("input", () => {
  state.settings.scale = Number(scaleRange.value);
  saveSettingsState();
  applyPersonalization();
  settingsStatus.textContent = `Veľkosť ${state.settings.scale}%`;
});

displayDensityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.settings.displayDensity = button.dataset.densityValue;
    saveSettingsState();
    applyPersonalization();
    settingsStatus.textContent = "Hustota upravená";
  });
});

visualStyleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.settings.visualStyle = button.dataset.visualValue;
    saveSettingsState();
    applyPersonalization();
    settingsStatus.textContent = "Štýl upravený";
  });
});

backdropButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.settings.backdrop = button.dataset.backdropValue;
    saveSettingsState();
    applyPersonalization();
    settingsStatus.textContent = "Pozadie upravené";
  });
});

familyProfileButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.settings.familyProfile = button.dataset.profileValue;
    saveSettingsState();
    renderCurrentView();
    settingsStatus.textContent = familyProfileCopy[state.settings.familyProfile].label;
  });
});

memberForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = memberName.value.trim();
  if (!name) return;
  ensureFamilySettings();
  state.settings.familyMembers = [
    ...state.settings.familyMembers,
    { id: `member:${Date.now()}:${slug(name)}`, name, role: memberRole.value },
  ].slice(0, 8);
  memberName.value = "";
  memberRole.value = "parent";
  saveSettingsState();
  renderFamilySettings();
  renderHome();
  settingsStatus.textContent = "Člen pridaný";
});

memberList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-member]");
  if (!button) return;
  state.settings.familyMembers = state.settings.familyMembers.filter((member) => member.id !== button.dataset.removeMember);
  saveSettingsState();
  renderFamilySettings();
  settingsStatus.textContent = "Člen odstránený";
});

familyCodeButton?.addEventListener("click", () => {
  createFamilyInviteCode();
});

joinFamilyForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  joinFamilyByCode(joinFamilyCode.value);
  joinFamilyCode.value = "";
});

googleLoginButton?.addEventListener("click", signInWithGoogle);

googleLogoutButton?.addEventListener("click", signOutGoogle);

monthlyBudgetInput.addEventListener("input", () => {
  state.settings.monthlyBudget = Math.max(0, Number(monthlyBudgetInput.value || 0));
  saveSettingsState();
  renderBudget();
  settingsStatus.textContent = state.settings.monthlyBudget ? "Rozpočet uložený" : "Rozpočet vypnutý";
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
    weekly: state.weekly,
    pantry: state.pantry,
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
    state.weekly = payload.weekly || state.weekly;
    state.pantry = payload.pantry || state.pantry;
    savePlans();
    saveShoppingState();
    saveTasksState();
    saveSettingsState();
    saveCheckinsState();
    saveNotesState();
    saveRhythmState();
    saveFavoritesState();
    saveWeeklyState();
    savePantryState();
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
  state.settings = {
    theme: "dark",
    density: "compact",
    showNote: true,
    simpleMeals: false,
    hideDoneShopping: false,
    familyProfile: "calm",
    familyMembers: [
      { id: "member:1", name: "Mama", role: "parent" },
      { id: "member:2", name: "Deti", role: "kid" },
    ],
    familyCode: "",
    monthlyBudget: 0,
    scale: 100,
    displayDensity: "cozy",
    visualStyle: "home",
    backdrop: "soft",
    householdId: currentHouseholdId(),
    cloudUser: state.settings.cloudUser || null,
  };
  state.checkins = {};
  state.notes = {};
  state.rhythm = {};
  state.favorites = [];
  state.weekly = {};
  state.pantry = pantryStarter.map((name) => ({ id: `pantry:${slug(name)}`, name }));
  savePlans();
  saveShoppingState();
  saveTasksState();
  saveSettingsState();
  saveCheckinsState();
  saveNotesState();
  saveRhythmState();
  saveFavoritesState();
  saveWeeklyState();
  savePantryState();
  renderCurrentView();
  settingsStatus.textContent = "Reset hotový";
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-jump-tab]");
  if (!button) return;
  setActiveTab(button.dataset.jumpTab);
});

document.querySelector(".bottom-nav").addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;
  setActiveTab(button.dataset.tab);
});

document.querySelectorAll(".bottom-nav [data-tab]").forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

function handleTabActivation(event) {
  const button = event.target.closest?.(".bottom-nav [data-tab]");
  if (!button) return;
  setActiveTab(button.dataset.tab);
}

document.addEventListener("pointerup", handleTabActivation, true);
document.addEventListener("touchend", handleTabActivation, true);

renderCurrentView();
setActiveTab(state.activeTab);
initCloud();
