// Options that would leave zero bottles are disabled, so the quiz can never land on an empty browse page.

const QUIZ_STYLES = [
  { value: "Red", hint: "From bright and juicy to deep and powerful." },
  { value: "White", hint: "From crisp and zesty to round and rich." },
  { value: "Rosé", hint: "Dry, fresh and pink." },
  { value: "Sparkling", hint: "Bubbles for any occasion." }
];

const QUIZ_QUESTIONS = {
  style: { title: "What are you in the mood for?", skip: "Not sure" },
  taste: { title: "How do you like it?", skip: "Not sure" },
  price: { title: "What's your budget per bottle?", skip: "No limit" }
};

const QUIZ_ORDER = ["style", "taste", "price"];

let quizStep = 0;
let quizAnswers = {};
let quizOpener = null;
let quizInerted = [];

function quizSteps() {
  const askTaste = !quizAnswers.style || TASTE_STYLES.includes(quizAnswers.style);
  return QUIZ_ORDER.filter(key => key !== "taste" || askTaste);
}

function quizMatches(p, answers) {
  if (answers.style && p.style !== answers.style) return false;
  if (answers.taste && tasteOf(p) !== answers.taste) return false;
  if (answers.price) {
    const bucket = PRICE_BUCKETS.find(b => b.key === answers.price);
    if (bucket && !bucket.test(p)) return false;
  }
  return true;
}

// Counts for a step only consider the answers given before it, so going back never shows stale numbers.
function answersBefore(stepKey) {
  const before = {};
  for (const key of quizSteps()) {
    if (key === stepKey) break;
    if (quizAnswers[key]) before[key] = quizAnswers[key];
  }
  return before;
}

function quizOptions(stepKey) {
  if (stepKey === "style") return QUIZ_STYLES.map(s => ({ value: s.value, label: s.value, hint: s.hint }));
  if (stepKey === "taste") {
    return TASTES.map(t => ({ value: t.key, label: t.label, hint: t.hint[quizAnswers.style] || t.hint.any }));
  }
  return PRICE_BUCKETS.map(b => ({ value: b.key, label: b.label, hint: "" }));
}

function bottleLabel(n) {
  return `${n} bottle${n === 1 ? "" : "s"}`;
}

function ensureQuizMounted() {
  if (document.querySelector("[data-quiz]")) return;
  const backdrop = document.createElement("div");
  backdrop.className = "quiz-backdrop";
  backdrop.setAttribute("data-quiz-backdrop", "");
  const dialog = document.createElement("div");
  dialog.className = "quiz";
  dialog.setAttribute("data-quiz", "");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", "quiz-title");
  document.body.append(backdrop, dialog);
}

function renderQuiz({ focusTitle = false } = {}) {
  const dialog = document.querySelector("[data-quiz]");
  if (!dialog) return;
  const steps = quizSteps();
  const stepKey = steps[quizStep];
  const question = QUIZ_QUESTIONS[stepKey];
  const before = answersBefore(stepKey);

  const optionsHtml = quizOptions(stepKey).map((o, i) => {
    const n = PRODUCTS.filter(p => quizMatches(p, { ...before, [stepKey]: o.value })).length;
    const selected = quizAnswers[stepKey] === o.value;
    return `
      <button type="button" class="quiz-option ${selected ? "is-selected" : ""}" data-quiz-answer="${i}" ${selected ? `aria-current="true"` : ""} ${n === 0 ? "disabled" : ""}>
        <span class="quiz-option__text">
          <span class="quiz-option__label">${esc(o.label)}</span>
          ${o.hint ? `<span class="quiz-option__hint">${esc(o.hint)}</span>` : ""}
        </span>
        <span class="quiz-option__count">${n === 0 ? "None" : bottleLabel(n)}</span>
      </button>`;
  }).join("");

  dialog.innerHTML = `
    <div class="quiz__head">
      <span class="quiz__eyebrow">Help me choose</span>
      <button type="button" class="quiz__close" data-quiz-close>Close</button>
    </div>
    <div class="quiz__step">Step ${quizStep + 1} of ${steps.length}</div>
    <div class="quiz__progress"><span style="width:${Math.round(((quizStep + 1) / steps.length) * 100)}%"></span></div>
    <h2 class="quiz__title" id="quiz-title" tabindex="-1">${question.title}</h2>
    <div class="quiz__options">${optionsHtml}</div>
    <div class="quiz__foot">
      ${quizStep > 0 ? `<button type="button" class="quiz__back" data-quiz-back>Back</button>` : ""}
      <button type="button" class="quiz__skip" data-quiz-skip>${question.skip}</button>
    </div>`;

  // A new question gets focus on its heading so screen readers announce it; on open the dialog label already does.
  const target = focusTitle
    ? dialog.querySelector("#quiz-title")
    : dialog.querySelector(".quiz-option.is-selected:not(:disabled)") || dialog.querySelector(".quiz-option:not(:disabled)");
  if (target) target.focus();
}

function openQuiz(opener) {
  ensureQuizMounted();
  quizOpener = opener || null;
  quizStep = 0;
  quizAnswers = {};
  quizInerted = [...document.body.children].filter(el => !el.matches("[data-quiz], [data-quiz-backdrop]") && !el.inert);
  quizInerted.forEach(el => (el.inert = true));
  document.querySelector("[data-quiz]").classList.add("is-open");
  document.querySelector("[data-quiz-backdrop]").classList.add("is-open");
  document.body.classList.add("quiz-open");
  renderQuiz();
}

function closeQuiz() {
  const dialog = document.querySelector("[data-quiz]");
  if (!dialog || !dialog.classList.contains("is-open")) return;
  dialog.classList.remove("is-open");
  document.querySelector("[data-quiz-backdrop]").classList.remove("is-open");
  document.body.classList.remove("quiz-open");
  quizInerted.forEach(el => (el.inert = false));
  quizInerted = [];
  if (quizOpener) quizOpener.focus();
}

function finishQuiz() {
  const params = new URLSearchParams();
  for (const key of quizSteps()) {
    if (quizAnswers[key]) params.set(key, quizAnswers[key]);
  }
  params.set("quiz", "1");
  window.location.href = "browse.html?" + params.toString();
}

function advanceQuiz() {
  if (quizStep >= quizSteps().length - 1) {
    finishQuiz();
    return;
  }
  quizStep += 1;
  renderQuiz({ focusTitle: true });
}

// A changed answer can invalidate later ones (e.g. switching to Sparkling drops the taste question).
function clearAnswersAfter(stepKey) {
  QUIZ_ORDER.slice(QUIZ_ORDER.indexOf(stepKey) + 1).forEach(key => delete quizAnswers[key]);
}

document.addEventListener("click", e => {
  const opener = e.target.closest("[data-quiz-open]");
  if (opener) {
    e.preventDefault();
    openQuiz(opener);
    return;
  }
  if (!document.querySelector("[data-quiz].is-open")) return;

  if (e.target.closest("[data-quiz-close]") || e.target.closest("[data-quiz-backdrop]")) {
    closeQuiz();
    return;
  }
  const stepKey = quizSteps()[quizStep];
  const answer = e.target.closest("[data-quiz-answer]");
  if (answer && !answer.disabled) {
    const option = quizOptions(stepKey)[Number(answer.getAttribute("data-quiz-answer"))];
    if (!option) return;
    if (quizAnswers[stepKey] !== option.value) clearAnswersAfter(stepKey);
    quizAnswers[stepKey] = option.value;
    advanceQuiz();
    return;
  }
  if (e.target.closest("[data-quiz-skip]")) {
    delete quizAnswers[stepKey];
    clearAnswersAfter(stepKey);
    advanceQuiz();
    return;
  }
  if (e.target.closest("[data-quiz-back]") && quizStep > 0) {
    quizStep -= 1;
    renderQuiz({ focusTitle: true });
  }
});

document.addEventListener("keydown", e => {
  const dialog = document.querySelector("[data-quiz].is-open");
  if (!dialog) return;
  if (e.key === "Escape") {
    closeQuiz();
    return;
  }
  if (e.key !== "Tab") return;
  const focusable = [...dialog.querySelectorAll("button:not(:disabled)")];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});
