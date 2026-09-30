// Snippet collection rendered into the #snippets section by script.js
const SNIPPETS = [
  {
    title: "debounce",
    tags: ["function", "performance", "events"],
    description: "Delay calling a function until it hasn't been called for `wait` ms. Great for search inputs and resize handlers.",
    code: `const debounce = (fn, wait = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

// Usage
window.addEventListener("resize", debounce(() => console.log("resized!"), 200));`,
  },
  {
    title: "throttle",
    tags: ["function", "performance", "events"],
    description: "Call a function at most once every `limit` ms. Useful for scroll and mousemove handlers.",
    code: `const throttle = (fn, limit = 100) => {
  let waiting = false;
  return (...args) => {
    if (waiting) return;
    fn(...args);
    waiting = true;
    setTimeout(() => (waiting = false), limit);
  };
};`,
  },
  {
    title: "sleep",
    tags: ["async", "promise"],
    description: "Pause inside an async function for a given number of milliseconds.",
    code: `const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Usage
await sleep(1000); // waits 1 second`,
  },
  {
    title: "retry with backoff",
    tags: ["async", "promise", "network"],
    description: "Retry an async operation with exponential backoff — handy for flaky network requests.",
    code: `const retry = async (fn, retries = 3, delay = 500) => {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise((r) => setTimeout(r, delay));
    return retry(fn, retries - 1, delay * 2);
  }
};

// Usage
const data = await retry(() => fetch("/api/data").then((r) => r.json()));`,
  },
  {
    title: "fetch with timeout",
    tags: ["async", "network", "fetch"],
    description: "Abort a fetch request if it takes longer than `ms` using AbortSignal.timeout.",
    code: `const fetchWithTimeout = (url, ms = 5000, options = {}) =>
  fetch(url, { ...options, signal: AbortSignal.timeout(ms) });

// Usage
try {
  const res = await fetchWithTimeout("https://api.github.com", 3000);
} catch (err) {
  if (err.name === "TimeoutError") console.log("Request timed out");
}`,
  },
  {
    title: "groupBy",
    tags: ["array", "object"],
    description: "Group array items by a key. Uses the native Object.groupBy (ES2024).",
    code: `const people = [
  { name: "Ali", city: "Lahore" },
  { name: "Sara", city: "Karachi" },
  { name: "Omar", city: "Lahore" },
];

const byCity = Object.groupBy(people, (p) => p.city);
// { Lahore: [{…}, {…}], Karachi: [{…}] }`,
  },
  {
    title: "unique array",
    tags: ["array"],
    description: "Remove duplicates from an array, or from an array of objects by key.",
    code: `const unique = (arr) => [...new Set(arr)];

const uniqueBy = (arr, key) =>
  [...new Map(arr.map((item) => [item[key], item])).values()];

unique([1, 2, 2, 3]);                     // [1, 2, 3]
uniqueBy([{ id: 1 }, { id: 1 }], "id");   // [{ id: 1 }]`,
  },
  {
    title: "chunk array",
    tags: ["array"],
    description: "Split an array into smaller arrays of a given size — useful for pagination and batching.",
    code: `const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]`,
  },
  {
    title: "deep clone",
    tags: ["object"],
    description: "Deep copy objects (including Dates, Maps, Sets) with the built-in structuredClone.",
    code: `const original = { date: new Date(), nested: { list: [1, 2, 3] } };
const copy = structuredClone(original);

copy.nested.list.push(4);
console.log(original.nested.list); // [1, 2, 3] — untouched`,
  },
  {
    title: "copy to clipboard",
    tags: ["browser", "dom", "async"],
    description: "Copy text to the user's clipboard using the async Clipboard API.",
    code: `const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};`,
  },
  {
    title: "query string ↔ object",
    tags: ["browser", "url", "object"],
    description: "Convert URL query strings to objects and back with URLSearchParams.",
    code: `const parseQuery = (qs = location.search) =>
  Object.fromEntries(new URLSearchParams(qs));

const toQuery = (obj) => new URLSearchParams(obj).toString();

parseQuery("?page=2&sort=asc"); // { page: "2", sort: "asc" }
toQuery({ q: "js", page: 1 });  // "q=js&page=1"`,
  },
  {
    title: "format currency & numbers",
    tags: ["intl", "string", "number"],
    description: "Locale-aware number and currency formatting with Intl.NumberFormat — no library needed.",
    code: `const formatPKR = (n) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR" }).format(n);

const compact = (n) =>
  new Intl.NumberFormat("en", { notation: "compact" }).format(n);

formatPKR(1500);   // "Rs 1,500.00"
compact(1250000);  // "1.3M"`,
  },
  {
    title: "relative time",
    tags: ["intl", "date", "string"],
    description: "Human-friendly \"3 days ago\" strings with Intl.RelativeTimeFormat.",
    code: `const timeAgo = (date) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units = [["year", 31536000], ["month", 2592000], ["day", 86400],
                 ["hour", 3600], ["minute", 60], ["second", 1]];
  const diff = (date - Date.now()) / 1000;
  for (const [unit, secs] of units) {
    if (Math.abs(diff) >= secs || unit === "second")
      return rtf.format(Math.round(diff / secs), unit);
  }
};

timeAgo(new Date(Date.now() - 3 * 86400000)); // "3 days ago"`,
  },
  {
    title: "slugify",
    tags: ["string"],
    description: "Turn any title into a URL-friendly slug.",
    code: `const slugify = (str) =>
  str
    .normalize("NFKD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

slugify("Hello World! Café"); // "hello-world-cafe"`,
  },
  {
    title: "local storage with expiry",
    tags: ["browser", "storage"],
    description: "Save values to localStorage that automatically expire after a TTL.",
    code: `const store = {
  set(key, value, ttlMs) {
    localStorage.setItem(key, JSON.stringify({ value, exp: Date.now() + ttlMs }));
  },
  get(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { value, exp } = JSON.parse(raw);
    if (Date.now() > exp) {
      localStorage.removeItem(key);
      return null;
    }
    return value;
  },
};

store.set("token", "abc123", 60 * 60 * 1000); // 1 hour`,
  },
  {
    title: "read a file in Node.js",
    tags: ["node", "async", "fs"],
    description: "Read and parse a JSON file with the promise-based fs API in Node.js.",
    code: `import { readFile } from "node:fs/promises";

const readJSON = async (path) => JSON.parse(await readFile(path, "utf8"));

const pkg = await readJSON("./package.json");
console.log(pkg.name, pkg.version);`,
  },
];
