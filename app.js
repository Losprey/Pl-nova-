const storageKey = "domaci-rytmus-meal-plans-v2";
const shoppingStorageKey = "domaci-rytmus-shopping-v1";
const tasksStorageKey = "domaci-rytmus-tasks-v1";

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

const state = {
  audience: "kids",
  week: "next",
  plans: loadPlans(),
  shopping: loadShoppingState(),
  tasks: loadTasksState(),
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
const homeMealsList = document.querySelector("#homeMealsList");
const homeTasksList = document.querySelector("#homeTasksList");
const homeShoppingList = document.querySelector("#homeShoppingList");
const placeholderEyebrow = document.querySelector("#placeholderEyebrow");
const placeholderTitle = document.querySelector("#placeholderTitle");

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

const ingredientRules = [
  { match: ["chleb", "toast", "rožok"], items: ["Pečivo", "Maslo"] },
  { match: ["vajíč", "omeleta"], items: ["Vajcia"] },
  { match: ["avokád"], items: ["Avokádo"] },
  { match: ["ovoc", "jablko", "hruška", "banán", "malin"], items: ["Ovocie"] },
  { match: ["kapsič"], items: ["Ovocné kapsičky"] },
  { match: ["tvaroh", "cottage"], items: ["Tvaroh"] },
  { match: ["jogurt", "skyr", "kefír", "termix"], items: ["Jogurty a mliečne"] },
  { match: ["kaša", "oats"], items: ["Ovsené vločky", "Mlieko"] },
  { match: ["spaghetti", "cestoviny"], items: ["Cestoviny", "Paradajkový základ"] },
  { match: ["bolognese"], items: ["Mleté mäso"] },
  { match: ["kurac", "morčac"], items: ["Hydina"] },
  { match: ["ryža", "rizoto"], items: ["Ryža"] },
  { match: ["zemiak"], items: ["Zemiaky"] },
  { match: ["polievka", "vývar"], items: ["Zelenina do polievky"] },
  { match: ["losos", "tuniak"], items: ["Ryba"] },
  { match: ["šalát", "zelenin", "mrkv"], items: ["Zelenina"] },
  { match: ["hummus", "cícer"], items: ["Cícer"] },
  { match: ["orechy"], items: ["Orechy"] },
  { match: ["palacinky"], items: ["Múka", "Vajcia", "Mlieko"] },
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

function savePlans() {
  localStorage.setItem(storageKey, JSON.stringify(state.plans));
}

function saveShoppingState() {
  localStorage.setItem(shoppingStorageKey, JSON.stringify(state.shopping));
}

function saveTasksState() {
  localStorage.setItem(tasksStorageKey, JSON.stringify(state.tasks));
}

function currentPlan() {
  return state.plans[state.audience][state.week];
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
          rule.items.forEach((item) => {
            if (!items.has(item)) {
              items.set(item, {
                id: `auto:${slug(item)}`,
                name: item,
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
  return state.shopping.manual[contextKey()] || [];
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

  shoppingCount.textContent = `${openCount} z ${items.length}`;
  shoppingBadge.textContent = openCount > 9 ? "9+" : String(openCount);
  shoppingBadge.hidden = openCount === 0;

  shoppingList.innerHTML = items.length
    ? items
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

function renderTasks() {
  const tasks = currentTasks();
  const openCount = tasks.filter((task) => !task.done).length;

  tasksCount.textContent = `${openCount} otvorených`;
  tasksBadge.textContent = openCount > 9 ? "9+" : String(openCount);
  tasksBadge.hidden = openCount === 0;

  taskList.innerHTML = tasks.length
    ? tasks
        .map((task) => `
          <label class="task-item ${task.done ? "is-done" : ""}">
            <input type="checkbox" data-id="${task.id}" ${task.done ? "checked" : ""}>
            <span>
              <strong>${escapeHtml(task.title)}</strong>
              <span>${formatDueDate(task.due)}</span>
            </span>
            <span class="priority-pill ${task.priority}">${priorityLabel(task.priority)}</span>
            <button class="delete-task" type="button" data-id="${task.id}" aria-label="Odstrániť úlohu ${escapeHtml(task.title)}">
              ${buttonIcon("delete")}
            </button>
          </label>
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

function renderHome() {
  const meals = allMeals();
  const tasks = currentTasks();
  const openTasks = tasks.filter((task) => !task.done);
  const checked = new Set(checkedShoppingIds());
  const openShopping = shoppingItems().filter((item) => !checked.has(item.id));
  const plan = currentPlan();

  homeEyebrow.textContent = plan.label;
  homeTitle.textContent = plan.range;
  homeAudience.textContent = state.audience === "kids" ? "Deti" : "Dospelí";
  homeMealsCount.textContent = String(meals.length);
  homeTasksCount.textContent = String(openTasks.length);
  homeShoppingCount.textContent = String(openShopping.length);

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
  const editButton = event.target.closest(".edit-meal");
  const deleteButton = event.target.closest(".delete-meal");

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

shoppingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = shoppingName.value.trim();
  if (!name) return;

  const key = contextKey();
  const item = {
    id: `manual:${Date.now()}:${slug(name)}`,
    name,
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
});

taskList.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-task");
  if (!button) return;

  state.tasks[state.audience][state.week] = currentTasks().filter((task) => task.id !== button.dataset.id);
  saveTasksState();
  renderTasks();
  renderHome();
});

document.querySelectorAll("[data-jump-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(`.bottom-nav button[data-tab="${button.dataset.jumpTab}"]`)?.click();
  });
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
      (view.dataset.view === "placeholder" && !["home", "meals", "shopping", "tasks"].includes(state.activeTab));

    view.hidden = !isActive;
    view.classList.toggle("is-active", isActive);
  });

  if (!["home", "meals", "shopping", "tasks"].includes(state.activeTab)) {
    const labels = {
      home: "Domov",
      more: "Viac",
    };

    placeholderEyebrow.textContent = "Domáci Rytmus";
    placeholderTitle.textContent = `${labels[state.activeTab]} sa pripravuje`;
  }
});

renderCurrentView();
