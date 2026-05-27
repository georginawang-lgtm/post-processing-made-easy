const searchInput = document.querySelector("#searchInput");
const cards = [...document.querySelectorAll(".step-card")];
const trackButtons = [...document.querySelectorAll(".track-btn")];
const visibleCount = document.querySelector("#visibleCount");

let activeTrack = "all";

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function cardMatches(card, query, track) {
  const tags = (card.dataset.tags || "").toLowerCase();
  const text = card.textContent.toLowerCase();
  const cardTrack = card.dataset.track || "";
  const queryOk = !query || tags.includes(query) || text.includes(query);
  const trackOk = track === "all" || cardTrack === track;
  return queryOk && trackOk;
}

function updateVisibleCount() {
  const visible = cards.filter((card) => !card.classList.contains("is-hidden")).length;
  if (visibleCount) visibleCount.textContent = String(visible);
}

function runFilters() {
  const query = searchInput.value.trim().toLowerCase();
  cards.forEach((card) => {
    const show = cardMatches(card, query, activeTrack);
    card.classList.toggle("is-hidden", !show);
  });
  updateVisibleCount();
}

searchInput.addEventListener("input", debounce(runFilters, 150));

trackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    trackButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeTrack = button.dataset.track || "all";
    runFilters();
  });
});

// Copy-to-clipboard buttons on all code blocks
document.querySelectorAll(".step-card pre").forEach((pre) => {
  const btn = document.createElement("button");
  btn.className = "copy-btn";
  btn.textContent = "Copy";
  btn.addEventListener("click", () => {
    const code = pre.querySelector("code");
    navigator.clipboard.writeText(code ? code.textContent : pre.textContent).then(() => {
      btn.textContent = "Copied!";
      setTimeout(() => { btn.textContent = "Copy"; }, 1500);
    });
  });
  pre.appendChild(btn);
});

// Collapsible cards — wrap content after h3 if card is tall
const COLLAPSE_THRESHOLD = 300;

cards.forEach((card) => {
  if (card.scrollHeight <= COLLAPSE_THRESHOLD) return;
  const h3 = card.querySelector("h3");
  if (!h3) return;

  const body = document.createElement("div");
  body.className = "card-body is-collapsed";

  let sibling = h3.nextElementSibling;
  while (sibling) {
    const next = sibling.nextElementSibling;
    body.appendChild(sibling);
    sibling = next;
  }
  card.appendChild(body);

  const expandBtn = document.createElement("button");
  expandBtn.className = "expand-btn";
  expandBtn.textContent = "Show more";
  expandBtn.addEventListener("click", () => {
    const collapsed = body.classList.toggle("is-collapsed");
    expandBtn.textContent = collapsed ? "Show more" : "Show less";
  });
  card.appendChild(expandBtn);
});

updateVisibleCount();
