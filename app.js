const storageKey = "domaci-rytmus-meal-plans-v2";

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

function savePlans() {
  localStorage.setItem(storageKey, JSON.stringify(state.plans));
}

function currentPlan() {
  return state.plans[state.audience][state.week];
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
  renderPlan();
});

document.querySelector(".audience-toggle").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-audience]");
  if (!button) return;
  state.audience = button.dataset.audience;
  setActiveButton(".audience-toggle button", "audience", state.audience);
  renderPlan();
});

document.querySelector("#addMealButton").addEventListener("click", () => {
  openMealDialog("add");
});

document.querySelector("#resetPlanButton").addEventListener("click", () => {
  state.plans = normalizePlans(starterPlans);
  savePlans();
  renderPlan();
});

document.querySelector(".sync-button").addEventListener("click", () => {
  state.plans = normalizePlans(starterPlans);
  savePlans();
  renderPlan();
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

  if (editMealIndex.value) {
    const dayIndex = Number(editDayIndex.value);
    const mealIndex = Number(editMealIndex.value);
    plan.days[dayIndex].meals[mealIndex] = nextMeal;
  } else {
    plan.days[Number(mealDay.value)].meals.push(nextMeal);
  }

  savePlans();
  renderPlan();
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
    renderPlan();
  }
});

document.querySelector(".bottom-nav").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-tab]");
  if (!button) return;
  document.querySelectorAll(".bottom-nav button").forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
});

renderPlan();
