export const FOUNDER = {
  name: "Vaibhav Tripathi",
  os: "VAIBHAV.OS",
  version: "v3.2.1",
  email: "vaibhavtrip2108@gmail.com",
  phone: "+91-7755809090",
  linkedin: "https://www.linkedin.com/in/vaibhav-tripathi-/",
  github: "https://github.com/210802",
};

export const HERO_LINES = [
  { text: "Most people build websites.", tone: "steel" },
  { text: "I build systems.", tone: "accent" },
  { text: "Some became products.", tone: "steel" },
  { text: "Some will become companies.", tone: "accent" },
] as const;

export const MARQUEE_WORDS = ["BUILD", "SHIP", "AUTOMATE", "SCALE", "REPEAT"];

export const ORIGIN_PANELS = [
  {
    era: "ISSUE #01",
    title: "Curious Student",
    bubble: "Why does this work? No, really — why?",
    caption: "Takes everything apart. Puts half of it back together. Keeps the questions.",
    glyph: "spark",
  },
  {
    era: "ISSUE #02",
    title: "Builder",
    bubble: "What if I just... made it myself?",
    caption: "First scripts, first bots, first all-nighters. Code becomes a power tool.",
    glyph: "wrench",
  },
  {
    era: "ISSUE #03",
    title: "AI Explorer",
    bubble: "This thing can reason. Everything changes.",
    caption: "Goes deep on models, agents, and automation. Starts wiring intelligence into everything.",
    glyph: "brain",
  },
  {
    era: "ISSUE #04",
    title: "Product Creator",
    bubble: "A demo is nice. A product is leverage.",
    caption: "Ships LifeOS and PRAGMA. Learns that distribution is a system too.",
    glyph: "box",
  },
  {
    era: "ISSUE #05",
    title: "Founder",
    bubble: "Now we compound.",
    caption: "Products become companies. Systems run while he sleeps. The flag goes up.",
    glyph: "flag",
  },
] as const;

export const BRAIN_NODES = [
  { id: "ai", label: "AI", x: 50, y: 18, size: 1.5 },
  { id: "systems", label: "Systems", x: 50, y: 55, size: 1.6 },
  { id: "finance", label: "Finance", x: 14, y: 38, size: 1.1 },
  { id: "automation", label: "Automation", x: 82, y: 34, size: 1.2 },
  { id: "products", label: "Products", x: 26, y: 78, size: 1.25 },
  { id: "trading", label: "Trading", x: 10, y: 62, size: 1 },
  { id: "behavior", label: "Behavior Design", x: 74, y: 80, size: 1.1 },
  { id: "business", label: "Business", x: 90, y: 62, size: 1.2 },
] as const;

export const BRAIN_EDGES: [string, string][] = [
  ["ai", "systems"],
  ["ai", "automation"],
  ["ai", "finance"],
  ["systems", "products"],
  ["systems", "automation"],
  ["systems", "behavior"],
  ["systems", "business"],
  ["finance", "trading"],
  ["finance", "systems"],
  ["automation", "business"],
  ["products", "behavior"],
  ["products", "business"],
  ["trading", "systems"],
];

export const PRODUCTS = [
  {
    id: "lifeos",
    kicker: "PRODUCT 001 / LIVE",
    name: "LifeOS",
    tagline: "A personal operating system for life.",
    problem:
      "Habit apps treat behavior like a checklist. Streaks break, motivation fades, and the app gets deleted by February.",
    insight:
      "People don't fail at habits — they fail at systems. Design the environment, the feedback loops, and the defaults, and behavior follows.",
    pillars: ["Habit tracking", "Goal tracking", "Behavior design"],
    architecture: ["Capture", "Loop engine", "Feedback", "Identity"],
    vision:
      "An OS layer for human behavior: every goal decomposed into loops, every loop instrumented, every win compounding into identity.",
    status: "live",
    cta: { label: "Open live demo", href: "https://lifeos-app-usli.vercel.app/" },
    accent: "accent",
  },
  {
    id: "pragma",
    kicker: "PRODUCT 002 / OPEN SOURCE",
    name: "PRAGMA",
    tagline: "Financial intelligence infrastructure for post-disbursement monitoring.",
    problem:
      "Lenders go dark the moment money leaves the account. Risk signals surface months late — in defaults, not in data.",
    insight:
      "The market gap isn't credit scoring before the loan. It's continuous intelligence after it. Monitoring is the missing half of lending.",
    pillars: ["Post-disbursement monitoring", "Risk signal pipeline", "Early-warning system"],
    architecture: ["Ingest", "Signal extraction", "Risk engine", "Alerts"],
    vision:
      "The default monitoring layer between capital and borrowers — infrastructure every lender plugs into, not a dashboard they glance at.",
    status: "open",
    cta: { label: "View repository", href: "https://github.com/210802/PRAGMA" },
    accent: "steel",
  },
  {
    id: "lumiere",
    kicker: "PRODUCT 003 / INTERNAL",
    name: "Lumiere Studio",
    tagline: "An editing system that turns content creation into a pipeline.",
    problem:
      "Creative work dies in the in-between: file handoffs, version chaos, repeated manual cuts. Editors spend hours on everything except editing.",
    insight:
      "Treat production like software: a pipeline with stages, automation between them, and AI doing the repetitive passes.",
    pillars: ["Workflow automation", "Editing pipeline", "AI-assisted production"],
    architecture: ["Intake", "Auto-cut", "Review", "Publish"],
    vision:
      "A studio where one operator ships what used to take a team — the pipeline is the team.",
    status: "private",
    cta: { label: "Currently private", href: null },
    accent: "sun",
  },
] as const;

export const THINKING_CARDS = [
  {
    title: "How I Learn",
    stamp: "INPUT",
    body: "Build first, read second. I learn by colliding with the problem, then go to theory to explain the bruises. Every new domain gets a toy project in week one.",
  },
  {
    title: "How I Build",
    stamp: "LOOP",
    body: "Smallest system that survives contact with a real user. Ship the skeleton, instrument everything, let usage tell me where the muscle goes.",
  },
  {
    title: "How I Validate Ideas",
    stamp: "TEST",
    body: "An idea isn't validated by opinions — it's validated by behavior. I look for someone changing what they do because the thing exists. One real user beats fifty nods.",
  },
  {
    title: "How I Design Products",
    stamp: "SHAPE",
    body: "Start from the behavior I want to exist in the world, work backwards to the interface. Defaults are the product; screens are just where defaults live.",
  },
  {
    title: "How I Ship Fast",
    stamp: "SHIP",
    body: "Scope is the only real deadline tool. Cut surface, never quality. Automate the boring 80% so the interesting 20% gets all the attention.",
  },
] as const;

export const COMMAND_CENTER = {
  focus: { label: "CURRENT FOCUS", value: "PRAGMA risk engine v2", health: 92 },
  widgets: [
    {
      title: "PROJECTS / BUILDING",
      items: ["LifeOS — loop engine rewrite", "PRAGMA — signal pipeline", "Lumiere — auto-cut pass"],
      status: "ACTIVE",
    },
    {
      title: "EXPERIMENTS / RUNNING",
      items: ["Agentic monitoring swarms", "Habit-loop A/B cohorts", "LLM-graded edit QA"],
      status: "OBSERVING",
    },
    {
      title: "TECH / EXPLORING",
      items: ["Multi-agent orchestration", "Event-sourced backends", "On-device inference"],
      status: "SCANNING",
    },
    {
      title: "BOOKS / READING",
      items: ["The Innovator's Dilemma", "Thinking in Systems", "Working Backwards"],
      status: "QUEUED",
    },
  ],
  metrics: [
    { label: "Systems running", value: 7 },
    { label: "Products shipped", value: 3 },
    { label: "Experiments live", value: 5 },
    { label: "Ideas in queue", value: 23 },
  ],
};

export const TIMELINE = [
  { year: "T-4", type: "spark", title: "First script", note: "A scraper that saved 20 minutes a day. The leverage bug bites." },
  { year: "T-3", type: "fail", title: "Abandoned: social app", note: "Built for 4 months, launched to silence. Lesson: distribution is part of the build." },
  { year: "T-3", type: "ship", title: "Automation bots", note: "Internal tools for everyone who'd let me. Systems thinking starts here." },
  { year: "T-2", type: "spark", title: "AI deep dive", note: "Models become collaborators. Every project gets an intelligence layer." },
  { year: "T-2", type: "fail", title: "Killed: trading bot v1", note: "Profitable in backtest, humbled in production. Lesson: the market is the only judge." },
  { year: "T-1", type: "ship", title: "LifeOS ships", note: "A personal OS for behavior. First product with real daily users." },
  { year: "T-1", type: "ship", title: "PRAGMA ships", note: "Financial monitoring infrastructure goes public on GitHub." },
  { year: "NOW", type: "build", title: "Lumiere Studio", note: "The content pipeline runs itself a little more every week." },
  { year: "NEXT", type: "future", title: "The compound era", note: "Products into companies. Systems into moats. Watch this space." },
] as const;

export const REPOS = [
  { name: "PRAGMA", desc: "Post-disbursement monitoring platform", lang: "TypeScript", state: "public" },
  { name: "lifeos", desc: "Personal operating system for life", lang: "Next.js", state: "deployed" },
  { name: "lumiere-core", desc: "Editing pipeline engine", lang: "Python", state: "private" },
  { name: "agent-lab", desc: "Multi-agent orchestration experiments", lang: "Python", state: "public" },
] as const;

export const COMMITS = [
  "feat(pragma): wire early-warning thresholds into risk engine",
  "feat(lifeos): identity-based streak recovery loop",
  "chore(lumiere): batch auto-cut pass on intake queue",
  "fix(pragma): dedupe signal events across ingest shards",
  "feat(agent-lab): planner/executor split with shared memory",
];

export const MANIFESTO = [
  { line: "Build before permission.", tone: "accent" },
  { line: "Systems beat motivation.", tone: "ink" },
  { line: "Leverage compounds.", tone: "steel" },
  { line: "Automation scales effort.", tone: "ink" },
  { line: "Products outlive resumes.", tone: "accent" },
] as const;

export const CHAPTERS = [
  { id: "boot", num: "01", label: "Boot" },
  { id: "origin", num: "02", label: "Origin" },
  { id: "brain", num: "03", label: "Brain Map" },
  { id: "products", num: "04", label: "Products" },
  { id: "thinking", num: "05", label: "Thinking" },
  { id: "command", num: "06", label: "Command" },
  { id: "timeline", num: "07", label: "Timeline" },
  { id: "activity", num: "08", label: "Activity" },
  { id: "manifesto", num: "09", label: "Manifesto" },
  { id: "contact", num: "10", label: "Contact" },
] as const;
