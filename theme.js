const widget = document.getElementById("widget");
const affirmationText = document.getElementById("affirmationText");

const themeBtn = document.getElementById("themeBtn");
const themeOptions = document.getElementById("themeOptions");

const fontBtn = document.getElementById("fontToggle");
const fontOptions = document.getElementById("fontOptions");

const sizeBtn = document.getElementById("sizeBtn");
const sizeOptions = document.getElementById("sizeOptions");

const params = new URLSearchParams(window.location.search);

/* ---------------- STATE ---------------- */
let state = {
  theme: params.get("theme") || localStorage.getItem("theme") || "beige",
  font: params.get("font") || localStorage.getItem("font") || "default",
  size: params.get("size") || localStorage.getItem("size") || "small"
};

const isEmbed = params.get("embed") === "true";

if (isEmbed) {
  const builder = document.querySelector(".builder-ui");
  if (builder) builder.style.display = "none";
}

/* ---------------- THEME ---------------- */
function setTheme(theme) {
  state.theme = theme;
  localStorage.setItem("theme", theme);

  widget.classList.remove("beige", "pink", "sage", "blue");
  widget.classList.add(theme);
}

/* ---------------- FONT ---------------- */
function setFont(font) {
  state.font = font;
  localStorage.setItem("font", font);

  widget.classList.remove("font-default", "font-serif", "font-mono");
  widget.classList.add(`font-${font}`);
}

/* ---------------- SIZE ---------------- */
function setSize(size) {
  state.size = size;
  localStorage.setItem("size", size);

  widget.classList.remove("small", "medium", "wide");
  widget.classList.add(size);
}

/* ---------------- EMBED LINK ---------------- */
function buildEmbedURL() {
  const base = window.location.origin + window.location.pathname;

  return `${base}?theme=${state.theme}&font=${state.font}&size=${state.size}&embed=true`;
}

/* ---------------- COPY LINK ---------------- */
const copyBtn = document.getElementById("copyLinkBtn");

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(buildEmbedURL());

  const msg = document.getElementById("copyMessage");

  if (msg) {
    msg.classList.remove("hidden");
    msg.classList.add("show");

    setTimeout(() => {
      msg.classList.remove("show");
      msg.classList.add("hidden");
    }, 2000);
  }
});

/* ---------------- AFFIRMATION ---------------- */
function loadAffirmation() {
  const random =
    affirmations[Math.floor(Math.random() * affirmations.length)];

  affirmationText.textContent = random;
}

/* ---------------- POPUPS ---------------- */
themeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  themeOptions.classList.toggle("hidden");
});

fontBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  fontOptions.classList.toggle("hidden");
});

if (sizeBtn) {
  sizeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sizeOptions.classList.toggle("hidden");
  });
}

/* ---------------- OPTIONS ---------------- */
document.querySelectorAll(".theme-circle").forEach(circle => {
  circle.addEventListener("click", () => {
    setTheme(circle.dataset.theme);
    themeOptions.classList.add("hidden");
  });
});

document.querySelectorAll(".font-option").forEach(option => {
  option.addEventListener("click", () => {
    setFont(option.dataset.font);
    fontOptions.classList.add("hidden");
  });
});

document.querySelectorAll(".size-option").forEach(option => {
  option.addEventListener("click", () => {
    setSize(option.dataset.size);
    sizeOptions.classList.add("hidden");
  });
});

/* ---------------- OUTSIDE CLICK ---------------- */
document.addEventListener("click", (e) => {
  if (!themeBtn.contains(e.target) && !themeOptions.contains(e.target)) {
    themeOptions.classList.add("hidden");
  }

  if (!fontBtn.contains(e.target) && !fontOptions.contains(e.target)) {
    fontOptions.classList.add("hidden");
  }

  if (
    sizeBtn &&
    !sizeBtn.contains(e.target) &&
    !sizeOptions.contains(e.target)
  ) {
    sizeOptions.classList.add("hidden");
  }
});

/* ---------------- INIT ---------------- */
setTheme(state.theme);
setFont(state.font);
setSize(state.size);
loadAffirmation();
