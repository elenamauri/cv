const STORAGE_KEY = "cv-modular-v1";
const ZOOM_KEY = "cv-modular-zoom";

const DESC =
  "Driven by the intersection of human cognition and computational technology, I offer a unique profile combining neuroscientific research with advanced UX/HCI expertise. With hands-on experience in neural signal processing (P300 spellers) and a background in experimental psychology, I possess strong quantitative skills and proficiency in Python and MATLAB. My current professional experience as a UX Designer has refined my ability to model complex systems and analyze user behavior—capabilities that I aim to apply to the development of biologically realistic neural networks and individual-based biomarkers in the visual cortex.";

const PRIVACY =
  "Autorizzo il trattamento dei dati personali contenuti nel mio curriculum vitae in base all’art. 13 del D. Lgs. 196/2003 e all’art. 13 del GDPR (Regolamento UE 2016/679).";

let seq = 1;
let zoom = 1;
let openPanels = null;
let state;

const editor = document.getElementById("editor");
const sheet = document.getElementById("sheet");
const preview = document.getElementById("preview");
const params = new URLSearchParams(location.search);
const bare = params.get("bare") === "1";

function uid() {
  seq += 1;
  return "n" + seq;
}

function seg(id, text, weight, color) {
  return { id, text, weight, color: color || "#222" };
}

function bullet(id, label, text, enabled) {
  return { id, enabled, label, text };
}

function skillItem(id, text) {
  return { id, enabled: true, text };
}

function skillGroup(id, title, enabled, gap, items) {
  return { id, enabled, title, gap, items };
}

function createState(preset) {
  const ux = preset === "ux";
  const researchSkills = [
    skillGroup("sk-prog", "Programming", !ux, 12, [
      skillItem("py", "Python (NumPy, Pandas, MNE)"),
      skillItem("mat", "MATLAB (EEGLAB, FieldTrip)"),
      skillItem("rlang", "R"),
    ]),
    skillGroup("sk-neuro", "Neuroimaging", !ux, 12, [
      skillItem("eeg", "EEG/ERP Analysis (P300)"),
      skillItem("bci", "Familiarity with BCI protocols"),
      skillItem("fmri", "Theoretical knowledge of fMRI/MEG"),
    ]),
    skillGroup("sk-model", "Modeling & Stats", !ux, 12, [
      skillItem("bayes", "Bayesian statistics"),
      skillItem("ml", "Machine Learning basics"),
      skillItem("sig", "Signal processing"),
    ]),
  ];
  const uxSkills = [
    skillGroup("sk-design", "Design & Prototyping", ux, 12, [
      skillItem("sketch", "Sketch"),
      skillItem("figma", "Figma"),
      skillItem("adobe", "Adobe Suite"),
      skillItem("axure", "Axure"),
    ]),
    skillGroup("sk-web", "Web Platforms", ux, 12, [
      skillItem("shopify", "Shopify"),
      skillItem("elementor", "Elementor"),
      skillItem("framer", "Framer"),
      skillItem("wp", "WordPress"),
    ]),
    skillGroup("sk-dev", "Development", ux, 12, [
      skillItem("html", "HTML"),
      skillItem("css", "CSS"),
      skillItem("cpp", "C++"),
      skillItem("js", "JavaScript"),
    ]),
    skillGroup("sk-research", "User Research & Analysis", ux, 16, [
      skillItem("heur", "Heuristic Analysis"),
      skillItem("ia", "Information Architecture (IA)"),
      skillItem("dt", "Design Thinking Workshops"),
      skillItem("hotjar", "Hotjar"),
      skillItem("clarity", "Clarity"),
      skillItem("data", "Data Analysis - Python, R"),
    ]),
  ];

  const education = {
    id: "mod-edu",
    kind: "education",
    enabled: true,
    title: "Education",
    entries: [
      {
        id: "edu-msc",
        enabled: true,
        editorLabel: "Master",
        dates: "September 2021 - December 2023",
        segments: [
          seg("msc-a", "Master’s in ", 400),
          seg("msc-b", "Human-Computer Interaction", 400, "#0059e7"),
          seg("msc-c", ", University of Trento", 400),
        ],
        bullets: [
          bullet(
            "msc-th",
            "Thesis:",
            "Brain-Computer Interfaces and Reading Abilities: a Study on the Efficacy of a P300-BCI Training",
            !ux
          ),
          bullet(
            "msc-ks",
            "Key Skills:",
            "Signal processing, Brain-Computer Interface (BCI), Feature extraction, Python/MATLAB coding",
            !ux
          ),
        ],
      },
      {
        id: "edu-bsc",
        enabled: true,
        editorLabel: "Bachelor",
        dates: "September 2017 - July 2020",
        segments: [
          seg("bsc-a", "Bachelor’s in ", 400),
          seg("bsc-b", "Psychological Science,", 400, "#0059e7"),
          seg("bsc-c", " University of Padova", 400),
        ],
        bullets: [
          bullet(
            "bsc-th",
            "Thesis:",
            "The effect of residence on numerical discrimination ability with an automated device in a teleost fish: Poecilia reticulata",
            !ux
          ),
          bullet(
            "bsc-ks",
            "Key Skills:",
            "Experimental design, Behavioral analysis, Animal models of cognition, Statistical analysis (R/SPSS).",
            !ux
          ),
        ],
      },
    ],
  };

  const experience = {
    id: "mod-exp",
    kind: "experience",
    enabled: true,
    title: ux ? "Experience" : "Work Experience",
    entries: [
      {
        id: "job-boraso-r",
        enabled: !ux,
        editorLabel: "Boraso · ricerca",
        dates: "March 2024 – October 2024 | July 2025 – Present",
        segments: [
          seg("br-a", "UX/UI Designer @ ", 700),
          seg("br-b", "Boraso", 700, "#0059e7"),
          seg("br-c", " (Conversion Marketing Agency)", 400),
        ],
        bullets: [
          bullet("br-1", "", "Applied User-Centered Design principles to complex digital systems, focusing on data visualization and human-computer workflows.", true),
          bullet("br-2", "", "Conducted extensive user research and data analysis, translating empirical findings into functional system requirements.", true),
          bullet("br-3", "", "Managed end-to-end project lifecycles.", true),
        ],
      },
      {
        id: "job-boraso-ux",
        enabled: ux,
        editorLabel: "Boraso · UX",
        dates: "March 2024 – October 2024 | July 2025 – Present",
        segments: [
          seg("bu-a", "UX/UI Designer @ ", 700),
          seg("bu-b", "Boraso", 700, "#0059e7"),
          seg("bu-c", " (Conversion Marketing Agency)", 400),
        ],
        bullets: [
          bullet("bu-1", "", "Lead end-to-end design for large-scale international Shopify stores.", true),
          bullet("bu-2", "", "Conduct Heuristic Evaluations and co-design workshops to align business goals with user needs.", true),
          bullet("bu-3", "", "Create Information Architecture in close collaboration with SEO teams to optimize for both usability and organic findability.", true),
          bullet("bu-4", "", "Create user flows, high-fidelity wireframes, and interactive prototypes for complex e-commerce ecosystems.", true),
        ],
      },
      {
        id: "job-sioux",
        enabled: ux,
        editorLabel: "Sioux",
        dates: "October 2024 – July 2025",
        segments: [
          seg("sx-a", "UX/UI Designer @ ", 700),
          seg("sx-b", "Sioux", 700, "#0059e7"),
          seg("sx-c", " (Communication Agency)", 400),
        ],
        bullets: [
          bullet("sx-1", "", "Focused on Digital Brand Identity and UI design for communication-driven projects.", true),
          bullet("sx-2", "", "Translated brand values into cohesive and impactful visual interfaces.", true),
        ],
      },
      {
        id: "job-free",
        enabled: ux,
        editorLabel: "Freelance",
        dates: "September 2023 - Present",
        segments: [
          seg("fr-a", "UX/UI Designer - Freelance", 400),
          seg("fr-b", "", 700, "#0059e7"),
          seg("fr-c", "", 400),
        ],
        bullets: [
          bullet("fr-1", "", "Design and development of mobile and web applications.", true),
          bullet("fr-2", "", "Creation of high-end portfolio websites, emphasizing visual storytelling and professional identity.", true),
        ],
      },
    ],
  };

  return {
    header: {
      name: "Elena Mauri",
      roleEnabled: ux,
      role: "UX Designer",
      location: "Vigonovo (VE) - 16/04/1998",
      contacts: [
        { id: "c-phone", enabled: true, linked: false, text: "+39 3662405010", href: "" },
        { id: "c-mail", enabled: true, linked: true, text: "elenamauri32@gmail.com", href: "mailto:elenamauri32@gmail.com" },
        { id: "c-in", enabled: true, linked: true, text: "Linkedin Profile", href: "https://www.linkedin.com/in/elena-mauri-48aa3a210/" },
        { id: "c-web", enabled: ux, linked: true, text: "Portfolio", href: "https://www.elenamauri.com" },
      ],
    },
    description: { enabled: !ux, text: DESC },
    skills: ux ? uxSkills.concat(researchSkills) : researchSkills.concat(uxSkills),
    right: ux ? [experience, education] : [education, experience],
    privacy: { enabled: true, text: PRIVACY },
  };
}

function isValid(value) {
  return Boolean(value && value.header && value.description && value.privacy && Array.isArray(value.skills) && Array.isArray(value.right));
}

const COPY_FIXES = [
  ["Septemver", "September"],
  ["Septemer", "September"],
  ["Dicember", "December"],
  ["University di ", "University of "],
  ["Wordpress", "WordPress"],
  ["Javascript", "JavaScript"],
  ["Matlab", "MATLAB"],
  ["|  July", "| July"],
  ["  (", " ("],
  ["Machine Learning basics ", "Machine Learning basics"],
  ["functional system requirements ", "functional system requirements."],
  ["e all’art. 13 GDPR 679/16.", "e all’art. 13 del GDPR (Regolamento UE 2016/679)."],
];

function fixCopy(value) {
  if (typeof value === "string") {
    const text = COPY_FIXES.reduce((current, [from, to]) => current.split(from).join(to), value);
    return text
      .replace(/project lifecycles(?!\.)/g, "project lifecycles.")
      .replace(/e-commerce ecosystems(?!\.)/g, "e-commerce ecosystems.");
  }
  if (Array.isArray(value)) return value.map(fixCopy);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, fixCopy(item)]));
  }
  return value;
}

function load() {
  const preset = params.get("preset");
  if (preset === "ux" || preset === "research") return createState(preset);
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (isValid(saved)) return fixCopy(saved);
  } catch (err) {
    /* ignore broken storage */
  }
  return createState("research");
}

function persist() {
  if (bare) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function splitBind(bind) {
  const parts = bind.split(":");
  return { type: parts[0], id: parts[1], key: parts.slice(2).join(":") };
}

function resolve(bind) {
  const { type, id, key } = splitBind(bind);
  if (type === "header") return { obj: state.header, key: id };
  if (type === "description") return { obj: state.description, key: id };
  if (type === "privacy") return { obj: state.privacy, key: id };
  if (type === "contact") return { obj: state.header.contacts.find((item) => item.id === id), key };
  if (type === "skill") return { obj: state.skills.find((item) => item.id === id), key };
  if (type === "skillitem") {
    for (const group of state.skills) {
      const item = group.items.find((entry) => entry.id === id);
      if (item) return { obj: item, key };
    }
  }
  if (type === "module") return { obj: state.right.find((item) => item.id === id), key };
  if (type === "entry") {
    for (const module of state.right) {
      const entry = module.entries.find((item) => item.id === id);
      if (entry) return { obj: entry, key };
    }
  }
  if (type === "segment") {
    for (const module of state.right) {
      for (const entry of module.entries) {
        const segment = entry.segments.find((item) => item.id === id);
        if (segment) return { obj: segment, key: key || "text" };
      }
    }
  }
  if (type === "bullet") {
    for (const module of state.right) {
      for (const entry of module.entries) {
        const item = entry.bullets.find((bulletItem) => bulletItem.id === id);
        if (item) return { obj: item, key };
      }
    }
  }
  return null;
}

function locate(scope, id) {
  if (scope === "contacts") {
    return { list: state.header.contacts, index: state.header.contacts.findIndex((item) => item.id === id) };
  }
  if (scope === "skills") {
    return { list: state.skills, index: state.skills.findIndex((item) => item.id === id) };
  }
  if (scope === "right") {
    return { list: state.right, index: state.right.findIndex((item) => item.id === id) };
  }
  if (scope === "skill-items") {
    for (const group of state.skills) {
      const index = group.items.findIndex((item) => item.id === id);
      if (index >= 0) return { list: group.items, index };
    }
  }
  if (scope === "entries") {
    for (const module of state.right) {
      const index = module.entries.findIndex((item) => item.id === id);
      if (index >= 0) return { list: module.entries, index, parent: module };
    }
  }
  if (scope === "bullets") {
    for (const module of state.right) {
      for (const entry of module.entries) {
        const index = entry.bullets.findIndex((item) => item.id === id);
        if (index >= 0) return { list: entry.bullets, index, parent: entry };
      }
    }
  }
  return null;
}

function whichPreset() {
  const now = JSON.stringify(state);
  if (now === JSON.stringify(createState("research"))) return "research";
  if (now === JSON.stringify(createState("ux"))) return "ux";
  return "custom";
}

function captureOpen() {
  const nodes = editor.querySelectorAll("details[data-panel]");
  if (!nodes.length) return;
  openPanels = new Set();
  nodes.forEach((node) => {
    if (node.open) openPanels.add(node.dataset.panel);
  });
}

function panelOpen(id, fallback) {
  if (openPanels === null) return fallback;
  return openPanels.has(id);
}

function dis(scope, id, dir) {
  const loc = locate(scope, id);
  if (!loc || loc.index < 0) return "disabled";
  const next = loc.index + dir;
  if (next < 0 || next >= loc.list.length) return "disabled";
  return "";
}

function visibleTitle(entry) {
  const text = entry.segments.map((item) => item.text).join("").replace(/\s+/g, " ").trim();
  return text || "Voce";
}

function blankJob() {
  const id = uid();
  return {
    id,
    enabled: true,
    editorLabel: "",
    dates: "Mese anno – Mese anno",
    segments: [
      seg(uid(), "Ruolo @ ", 700),
      seg(uid(), "Azienda", 700, "#0059e7"),
      seg(uid(), " (dettaglio)", 400),
    ],
    bullets: [bullet(uid(), "", "Descrizione dell’attività.", true)],
  };
}

function blankEdu() {
  return {
    id: uid(),
    enabled: true,
    editorLabel: "",
    dates: "Anno – Anno",
    segments: [
      seg(uid(), "Corso in ", 400),
      seg(uid(), "Titolo", 400, "#0059e7"),
      seg(uid(), ", Istituto", 400),
    ],
    bullets: [],
  };
}

function renderEditor() {
  const preset = whichPreset();
  const badge = preset === "custom" ? "Modifiche rispetto ai preset" : "Uguale al preset selezionato";
  editor.innerHTML = `
    <div class="editor-head">
      <h1>CV modulare</h1>
      <p>La testata resta comune. Descrizione, gruppi di skill, esperienza e formazione si accendono, si spengono e si riordinano senza cambiare il layout.</p>
      <div class="preset-row">
        <button type="button" data-action="preset" data-preset="research" class="${preset === "research" ? "is-active" : ""}">Ricerca</button>
        <button type="button" data-action="preset" data-preset="ux" class="${preset === "ux" ? "is-active" : ""}">UX Designer</button>
      </div>
      <p class="preset-badge" data-preset-badge>${badge}</p>
      <div class="zoom-row">
        <button type="button" data-action="zoom" data-zoom="1" class="${zoom === 1 ? "is-active" : ""}">100%</button>
        <button type="button" data-action="zoom" data-zoom="1.25" class="${zoom === 1.25 ? "is-active" : ""}">125%</button>
        <button type="button" data-action="zoom" data-zoom="1.5" class="${zoom === 1.5 ? "is-active" : ""}">150%</button>
      </div>
      <div class="head-actions">
        <button type="button" data-action="print">Esporta PDF</button>
      </div>
    </div>
    <div class="editor-body">
      ${headerBlock()}
      ${descriptionBlock()}
      ${skillsBlock()}
      ${rightBlock()}
      ${privacyBlock()}
    </div>
  `;
  fillEditor();
}

function headerBlock() {
  return `
    <section class="block">
      <h2>Intestazione</h2>
      <p class="hint">Sempre visibile, uguale nei due preset. Ruolo e portfolio si attivano a parte.</p>
      <label class="field">Nome<input type="text" data-bind="header:name"></label>
      <label class="check"><input type="checkbox" data-toggle="header:roleEnabled"> Mostra ruolo</label>
      <label class="field">Ruolo<input type="text" data-bind="header:role"></label>
      <label class="field">Luogo e data<input type="text" data-bind="header:location"></label>
      <h2>Contatti</h2>
      ${state.header.contacts.map((contact) => contactBlock(contact)).join("")}
      <button type="button" class="mini" data-action="add-contact">Aggiungi contatto</button>
    </section>
  `;
}

function contactBlock(contact) {
  return `
    <div class="panel ${contact.enabled ? "" : "is-off"}">
      <div class="panel-bar">
        <label class="switch"><input type="checkbox" data-toggle="contact:${contact.id}:enabled"><span></span></label>
        <span class="bar-label">${esc(contact.text)}</span>
        <span class="spacer"></span>
        <button type="button" class="mini" data-action="up" data-scope="contacts" data-id="${contact.id}" ${dis("contacts", contact.id, -1)}>Su</button>
        <button type="button" class="mini" data-action="down" data-scope="contacts" data-id="${contact.id}" ${dis("contacts", contact.id, 1)}>Giù</button>
        <button type="button" class="mini danger" data-action="remove" data-scope="contacts" data-id="${contact.id}">Elimina</button>
      </div>
      <label class="field">Testo<input type="text" data-bind="contact:${contact.id}:text"></label>
      <label class="check"><input type="checkbox" data-toggle="contact:${contact.id}:linked"> Link sottolineato</label>
      ${contact.linked ? `<label class="field">URL<input type="text" data-bind="contact:${contact.id}:href"></label>` : ""}
    </div>
  `;
}

function descriptionBlock() {
  return `
    <section class="block">
      <div class="panel-bar">
        <label class="switch"><input type="checkbox" data-toggle="description:enabled"><span></span></label>
        <h2>Descrizione</h2>
      </div>
      <p class="hint">Modulo unico sotto la testata. Nel preset Ricerca è acceso, in UX Designer è spento.</p>
      <textarea rows="7" data-bind="description:text"></textarea>
    </section>
  `;
}

function skillsBlock() {
  return `
    <section class="block">
      <h2>Competenze</h2>
      <p class="hint">Colonna sinistra. Ogni gruppo si spegne, si riordina e mantiene il divisore tra i gruppi attivi.</p>
      ${state.skills.map((group) => skillBlock(group)).join("")}
      <button type="button" class="mini" data-action="add-skill-group">Aggiungi gruppo</button>
    </section>
  `;
}

function skillBlock(group) {
  const open = panelOpen("skill-" + group.id, false) ? "open" : "";
  return `
    <div class="panel ${group.enabled ? "" : "is-off"}">
      <div class="panel-bar">
        <label class="switch"><input type="checkbox" data-toggle="skill:${group.id}:enabled"><span></span></label>
        <span class="bar-label" data-bar="${group.id}">${esc(group.title)}</span>
        <span class="spacer"></span>
        <button type="button" class="mini" data-action="up" data-scope="skills" data-id="${group.id}" ${dis("skills", group.id, -1)}>Su</button>
        <button type="button" class="mini" data-action="down" data-scope="skills" data-id="${group.id}" ${dis("skills", group.id, 1)}>Giù</button>
      </div>
      <details data-panel="skill-${group.id}" ${open}>
        <summary>Testi del gruppo</summary>
        <label class="field">Titolo<input type="text" data-bind="skill:${group.id}:title"></label>
        ${group.items.map((item) => skillItemBlock(item)).join("")}
        <button type="button" class="mini" data-action="add-skill-item" data-id="${group.id}">Aggiungi competenza</button>
        <button type="button" class="mini danger" data-action="remove" data-scope="skills" data-id="${group.id}">Elimina gruppo</button>
      </details>
    </div>
  `;
}

function skillItemBlock(item) {
  return `
    <div class="item-row">
      <label class="switch"><input type="checkbox" data-toggle="skillitem:${item.id}:enabled"><span></span></label>
      <input type="text" data-bind="skillitem:${item.id}:text">
      <button type="button" class="mini" data-action="up" data-scope="skill-items" data-id="${item.id}" ${dis("skill-items", item.id, -1)}>Su</button>
      <button type="button" class="mini" data-action="down" data-scope="skill-items" data-id="${item.id}" ${dis("skill-items", item.id, 1)}>Giù</button>
      <button type="button" class="mini danger" data-action="remove" data-scope="skill-items" data-id="${item.id}">✕</button>
    </div>
  `;
}

function rightBlock() {
  return `
    <section class="block">
      <h2>Colonna destra</h2>
      <p class="hint">Esperienza e formazione si riordinano e si spengono. Le singole voci fanno lo stesso.</p>
      ${state.right.map((module) => moduleBlock(module)).join("")}
    </section>
  `;
}

function moduleBlock(module) {
  const open = panelOpen("module-" + module.id, true) ? "open" : "";
  const addLabel = module.kind === "education" ? "Aggiungi percorso" : "Aggiungi esperienza";
  return `
    <div class="panel ${module.enabled ? "" : "is-off"}">
      <div class="panel-bar">
        <label class="switch"><input type="checkbox" data-toggle="module:${module.id}:enabled"><span></span></label>
        <span class="bar-label" data-bar="${module.id}">${esc(module.title)}</span>
        <span class="spacer"></span>
        <button type="button" class="mini" data-action="up" data-scope="right" data-id="${module.id}" ${dis("right", module.id, -1)}>Su</button>
        <button type="button" class="mini" data-action="down" data-scope="right" data-id="${module.id}" ${dis("right", module.id, 1)}>Giù</button>
      </div>
      <details data-panel="module-${module.id}" ${open}>
        <summary>Voci</summary>
        <label class="field">Titolo sezione<input type="text" data-bind="module:${module.id}:title"></label>
        ${module.entries.map((entry) => entryBlock(entry)).join("")}
        <button type="button" class="mini" data-action="add-entry" data-id="${module.id}">${addLabel}</button>
      </details>
    </div>
  `;
}

function entryBlock(entry) {
  const open = panelOpen("entry-" + entry.id, false) ? "open" : "";
  const role = entry.segments[0];
  return `
    <div class="panel ${entry.enabled ? "" : "is-off"}">
      <div class="panel-bar">
        <label class="switch"><input type="checkbox" data-toggle="entry:${entry.id}:enabled"><span></span></label>
        <span class="bar-label" data-bar="${entry.id}">${esc(visibleTitle(entry))}</span>
        ${entry.editorLabel ? `<span class="tag">${esc(entry.editorLabel)}</span>` : ""}
        <span class="spacer"></span>
        <button type="button" class="mini" data-action="up" data-scope="entries" data-id="${entry.id}" ${dis("entries", entry.id, -1)}>Su</button>
        <button type="button" class="mini" data-action="down" data-scope="entries" data-id="${entry.id}" ${dis("entries", entry.id, 1)}>Giù</button>
        <button type="button" class="mini danger" data-action="remove" data-scope="entries" data-id="${entry.id}">Elimina</button>
      </div>
      <details data-panel="entry-${entry.id}" ${open}>
        <summary>Testi</summary>
        <label class="check"><input type="checkbox" data-weight-for="${role.id}" ${role.weight === 700 ? "checked" : ""}> Ruolo in grassetto</label>
        <label class="field">Ruolo<input type="text" data-bind="segment:${entry.segments[0].id}:text"></label>
        <label class="field">Evidenza blu<input type="text" data-bind="segment:${entry.segments[1].id}:text"></label>
        <label class="field">Chiusura<input type="text" data-bind="segment:${entry.segments[2].id}:text"></label>
        <label class="field">Date<input type="text" data-bind="entry:${entry.id}:dates"></label>
        ${entry.bullets.map((item) => bulletBlock(item)).join("")}
        <button type="button" class="mini" data-action="add-bullet" data-id="${entry.id}">Aggiungi punto</button>
      </details>
    </div>
  `;
}

function bulletBlock(item) {
  return `
    <div class="panel ${item.enabled ? "" : "is-off"}">
      <div class="panel-bar">
        <label class="switch"><input type="checkbox" data-toggle="bullet:${item.id}:enabled"><span></span></label>
        <span class="bar-label">Punto</span>
        <span class="spacer"></span>
        <button type="button" class="mini" data-action="up" data-scope="bullets" data-id="${item.id}" ${dis("bullets", item.id, -1)}>Su</button>
        <button type="button" class="mini" data-action="down" data-scope="bullets" data-id="${item.id}" ${dis("bullets", item.id, 1)}>Giù</button>
        <button type="button" class="mini danger" data-action="remove" data-scope="bullets" data-id="${item.id}">Elimina</button>
      </div>
      <label class="field">Etichetta<input type="text" data-bind="bullet:${item.id}:label" placeholder="Thesis:"></label>
      <label class="field">Testo<textarea rows="2" data-bind="bullet:${item.id}:text"></textarea></label>
    </div>
  `;
}

function privacyBlock() {
  return `
    <section class="block">
      <div class="panel-bar">
        <label class="switch"><input type="checkbox" data-toggle="privacy:enabled"><span></span></label>
        <h2>Nota privacy</h2>
      </div>
      <p class="hint">Resta in fondo alla colonna sinistra, allineata al contenuto più lungo.</p>
      <textarea rows="3" data-bind="privacy:text"></textarea>
    </section>
  `;
}

function fillEditor() {
  editor.querySelectorAll("[data-bind]").forEach((el) => {
    const ref = resolve(el.dataset.bind);
    if (!ref?.obj) return;
    el.value = ref.obj[ref.key] ?? "";
  });
  editor.querySelectorAll("[data-toggle]").forEach((el) => {
    const ref = resolve(el.dataset.toggle);
    if (!ref?.obj) return;
    el.checked = Boolean(ref.obj[ref.key]);
  });
}

function renderSheet() {
  const skills = state.skills.filter((group) => group.enabled);
  const modules = state.right.filter((module) => module.enabled);
  sheet.innerHTML = `
    <header class="header">
      <div class="identity">
        <div class="identity-name">
          <div class="name" data-bind="header:name" contenteditable="plaintext-only" data-placeholder="Nome"></div>
          ${state.header.roleEnabled ? `<div class="role" data-bind="header:role" contenteditable="plaintext-only" data-placeholder="Ruolo"></div>` : ""}
        </div>
        <div class="location" data-bind="header:location" contenteditable="plaintext-only" data-placeholder="Luogo e data"></div>
      </div>
      <div class="contact">
        ${state.header.contacts.filter((contact) => contact.enabled).map(renderContact).join("")}
      </div>
    </header>
    ${state.description.enabled ? `<section class="card desc" data-sheet="description"><p data-bind="description:text" contenteditable="plaintext-only" data-multiline="true" data-placeholder="Descrizione"></p></section>` : ""}
    <div class="columns">
      <div class="col-left${state.privacy.enabled ? " has-privacy" : ""}">
        ${skills.length ? `<section class="card skills" data-sheet="skills">${skills.map((group, index) => renderSkillGroup(group, index < skills.length - 1)).join("")}</section>` : ""}
        ${state.privacy.enabled ? `<p class="privacy" data-sheet="privacy" data-bind="privacy:text" contenteditable="plaintext-only" data-multiline="true"></p>` : ""}
      </div>
      <div class="col-right">
        ${modules.map(renderModule).join("")}
      </div>
    </div>
  `;
  fillSheet();
  sheet.style.zoom = bare ? "1" : String(zoom);
}

function renderContact(contact) {
  if (contact.linked) {
    return `<a href="${esc(contact.href || "#")}" data-bind="contact:${contact.id}:text" contenteditable="plaintext-only" data-placeholder="Contatto"></a>`;
  }
  return `<p data-bind="contact:${contact.id}:text" contenteditable="plaintext-only" data-placeholder="Contatto"></p>`;
}

function renderSkillGroup(group, withDivider) {
  const items = group.items.filter((item) => item.enabled);
  return `
    <div class="skill-group">
      <h3 data-bind="skill:${group.id}:title" contenteditable="plaintext-only" data-placeholder="Titolo"></h3>
      <div class="skill-list" style="--gap: ${Number(group.gap) || 12}px">
        ${items.map((item) => `<div class="skill-item" data-bind="skillitem:${item.id}:text" contenteditable="plaintext-only" data-placeholder="Competenza"></div>`).join("")}
      </div>
    </div>
    ${withDivider ? `<img class="divider" src="assets/divider.svg" width="168" height="1" alt="">` : ""}
  `;
}

function renderModule(module) {
  const entries = module.entries.filter((entry) => entry.enabled);
  return `
    <section class="card" data-sheet="${module.id}">
      <div class="section">
        <h2 class="section-title" data-bind="module:${module.id}:title" contenteditable="plaintext-only" data-placeholder="Titolo"></h2>
        ${entries.map((entry) => renderEntry(entry, module.kind)).join("")}
      </div>
    </section>
  `;
}

function renderEntry(entry, kind) {
  const bullets = entry.bullets.filter((item) => item.enabled && (item.label || item.text));
  return `
    <div class="entry ${kind === "education" ? "entry-edu" : "entry-job"}">
      <p class="line">${entry.segments.map((item) => `<span class="seg w${item.weight} ${String(item.color).toLowerCase() === "#0059e7" ? "accent" : ""}" data-bind="segment:${item.id}:text" contenteditable="plaintext-only"></span>`).join("")}</p>
      <p class="dates" data-bind="entry:${entry.id}:dates" contenteditable="plaintext-only" data-placeholder="Date"></p>
      ${bullets.length ? `<ul>${bullets.map((item) => `<li>${item.label ? `<span class="b-label" data-bind="bullet:${item.id}:label" contenteditable="plaintext-only"></span> ` : ""}<span class="b-text" data-bind="bullet:${item.id}:text" contenteditable="plaintext-only"></span></li>`).join("")}</ul>` : ""}
    </div>
  `;
}

function fillSheet() {
  sheet.querySelectorAll("[data-bind]").forEach((el) => {
    const ref = resolve(el.dataset.bind);
    if (!ref?.obj) return;
    el.textContent = ref.obj[ref.key] ?? "";
  });
}

function attrSelector(bind) {
  return `[data-bind="${String(bind).replace(/"/g, '\\"')}"]`;
}

function refreshPresetBadge() {
  const preset = whichPreset();
  const badge = editor.querySelector("[data-preset-badge]");
  if (badge) badge.textContent = preset === "custom" ? "Modifiche rispetto ai preset" : "Uguale al preset selezionato";
  editor.querySelectorAll("[data-action=preset]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.preset === preset);
  });
}

function entryBySegment(id) {
  for (const module of state.right) {
    for (const entry of module.entries) {
      if (entry.segments.some((item) => item.id === id)) return entry;
    }
  }
  return null;
}

function rerender(extraOpen) {
  const scroller = editor.querySelector(".editor-body");
  const editorTop = scroller ? scroller.scrollTop : 0;
  const previewTop = preview.scrollTop;
  captureOpen();
  if (extraOpen) {
    if (openPanels === null) openPanels = new Set();
    extraOpen.forEach((id) => openPanels.add(id));
  }
  renderEditor();
  renderSheet();
  const nextScroller = editor.querySelector(".editor-body");
  if (nextScroller) nextScroller.scrollTop = editorTop;
  preview.scrollTop = previewTop;
  persist();
}

function onEditorInput(event) {
  const el = event.target;
  if (!el.dataset || !el.dataset.bind) return;
  const ref = resolve(el.dataset.bind);
  if (!ref?.obj) return;
  ref.obj[ref.key] = el.value;
  const node = sheet.querySelector(attrSelector(el.dataset.bind));
  if (node) node.textContent = el.value;
  const { type, id } = splitBind(el.dataset.bind);
  if (type === "skill" || type === "module") {
    const bar = editor.querySelector(`[data-bar="${id}"]`);
    if (bar) bar.textContent = el.value;
  }
  if (type === "segment") {
    const entry = entryBySegment(id);
    const bar = entry && editor.querySelector(`[data-bar="${entry.id}"]`);
    if (bar) bar.textContent = visibleTitle(entry);
  }
  if (type === "contact" && el.dataset.bind.endsWith(":text")) {
    const bar = el.closest(".panel")?.querySelector(".bar-label");
    if (bar) bar.textContent = el.value;
  }
  refreshPresetBadge();
  persist();
}

function onEditorChange(event) {
  const el = event.target;
  if (el.dataset.weightFor) {
    const ref = resolve(`segment:${el.dataset.weightFor}:text`);
    if (!ref?.obj) return;
    ref.obj.weight = el.checked ? 700 : 400;
    rerender();
    return;
  }
  if (!el.dataset.toggle) return;
  const ref = resolve(el.dataset.toggle);
  if (!ref?.obj) return;
  ref.obj[ref.key] = el.checked;
  rerender();
}

function onEditorClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button || button.disabled) return;
  const action = button.dataset.action;
  if (action === "print") {
    exportPdf();
    return;
  }
  if (action === "zoom") {
    zoom = Number(button.dataset.zoom);
    localStorage.setItem(ZOOM_KEY, String(zoom));
    sheet.style.zoom = String(zoom);
    editor.querySelectorAll("[data-action=zoom]").forEach((item) => {
      item.classList.toggle("is-active", Number(item.dataset.zoom) === zoom);
    });
    return;
  }
  if (action === "preset") {
    const name = button.dataset.preset;
    if (whichPreset() === "custom" && !confirm("Sostituire il CV attuale con questo preset?")) return;
    state = createState(name);
    openPanels = null;
    preview.scrollTop = 0;
    renderEditor();
    renderSheet();
    persist();
    return;
  }
  if (action === "up" || action === "down") {
    const loc = locate(button.dataset.scope, button.dataset.id);
    if (!loc || loc.index < 0) return;
    const next = loc.index + (action === "up" ? -1 : 1);
    if (next < 0 || next >= loc.list.length) return;
    const [item] = loc.list.splice(loc.index, 1);
    loc.list.splice(next, 0, item);
    rerender();
    return;
  }
  if (action === "remove") {
    const loc = locate(button.dataset.scope, button.dataset.id);
    if (!loc || loc.index < 0) return;
    loc.list.splice(loc.index, 1);
    rerender();
    return;
  }
  if (action === "add-contact") {
    const item = { id: uid(), enabled: true, linked: true, text: "Nuovo contatto", href: "https://" };
    state.header.contacts.push(item);
    rerender();
    return;
  }
  if (action === "add-skill-group") {
    const group = skillGroup(uid(), "Nuovo gruppo", true, 12, [skillItem(uid(), "Nuova competenza")]);
    state.skills.push(group);
    rerender(["skill-" + group.id]);
    return;
  }
  if (action === "add-skill-item") {
    const group = state.skills.find((item) => item.id === button.dataset.id);
    if (!group) return;
    group.items.push(skillItem(uid(), "Nuova competenza"));
    rerender(["skill-" + group.id]);
    return;
  }
  if (action === "add-entry") {
    const module = state.right.find((item) => item.id === button.dataset.id);
    if (!module) return;
    const entry = module.kind === "education" ? blankEdu() : blankJob();
    module.entries.push(entry);
    rerender(["entry-" + entry.id, "module-" + module.id]);
    return;
  }
  if (action === "add-bullet") {
    let parent = null;
    for (const module of state.right) {
      parent = module.entries.find((entry) => entry.id === button.dataset.id);
      if (parent) break;
    }
    if (!parent) return;
    parent.bullets.push(bullet(uid(), "", "Nuovo punto", true));
    rerender(["entry-" + parent.id]);
  }
}

function onSheetInput(event) {
  const el = event.target.closest("[data-bind]");
  if (!el) return;
  const ref = resolve(el.dataset.bind);
  if (!ref?.obj) return;
  ref.obj[ref.key] = el.textContent;
  const field = editor.querySelector(attrSelector(el.dataset.bind));
  if (field && field !== document.activeElement) field.value = el.textContent;
  const { type, id } = splitBind(el.dataset.bind);
  if (type === "segment") {
    const entry = entryBySegment(id);
    const bar = entry && editor.querySelector(`[data-bar="${entry.id}"]`);
    if (bar) bar.textContent = visibleTitle(entry);
  }
  refreshPresetBadge();
  persist();
}

function onSheetKeydown(event) {
  if (event.key !== "Enter") return;
  const el = event.target.closest("[data-bind]");
  if (!el || el.dataset.multiline === "true") return;
  event.preventDefault();
}

function onSheetPaste(event) {
  const el = event.target.closest("[data-bind]");
  if (!el) return;
  event.preventDefault();
  const text = event.clipboardData.getData("text/plain");
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;
  selection.deleteFromDocument();
  selection.getRangeAt(0).insertNode(document.createTextNode(text));
  selection.collapseToEnd();
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

function onSheetClick(event) {
  const link = event.target.closest("a");
  if (!link) return;
  if (event.metaKey || event.ctrlKey) return;
  event.preventDefault();
}

function fitPrintPage() {
  const previousZoom = sheet.style.zoom;
  sheet.style.zoom = "1";
  const width = Math.ceil(sheet.offsetWidth);
  const height = Math.ceil(sheet.offsetHeight);
  sheet.style.zoom = previousZoom;
  let style = document.getElementById("print-page");
  if (!style) {
    style = document.createElement("style");
    style.id = "print-page";
    document.head.appendChild(style);
  }
  style.textContent = `@page { size: ${width}px ${height}px; margin: 0; }`;
}

async function exportPdf() {
  await document.fonts.ready;
  fitPrintPage();
  window.print();
}

function bind() {
  editor.addEventListener("input", onEditorInput);
  editor.addEventListener("change", onEditorChange);
  editor.addEventListener("click", onEditorClick);
  sheet.addEventListener("input", onSheetInput);
  sheet.addEventListener("keydown", onSheetKeydown);
  sheet.addEventListener("paste", onSheetPaste);
  sheet.addEventListener("click", onSheetClick);
  window.addEventListener("beforeprint", fitPrintPage);
}

function init() {
  if (bare) document.body.classList.add("bare");
  const storedZoom = Number(localStorage.getItem(ZOOM_KEY));
  if (!bare && (storedZoom === 1 || storedZoom === 1.25 || storedZoom === 1.5)) zoom = storedZoom;
  state = load();
  renderEditor();
  renderSheet();
  bind();
}

init();
