import { useState, useMemo } from "react";

const questions = {
  important: [
    { q: "Tell me about yourself.", a: "Start with your education, mention 1–2 key projects or skills, and end with why you're excited about this role. Keep it under 90 seconds." },
    { q: "What is your greatest strength?", a: "Pick one relevant skill (e.g., problem-solving, quick learning). Back it with a specific example." },
    { q: "Where do you see yourself in 5 years?", a: "Show ambition aligned with the company. E.g., 'I want to grow into a senior developer role, mastering full-stack development while contributing to impactful products.'" },
    { q: "Explain a project you've built end-to-end.", a: "Cover: problem it solves → tech stack → your specific role → challenges → outcome. Be concise and quantify impact if possible." },
    { q: "What is the difference between == and === in JavaScript?", a: "== checks value with type coercion (e.g., '5' == 5 is true). === checks both value AND type (e.g., '5' === 5 is false). Always prefer ===." },
    { q: "What is a JOIN in SQL?", a: "JOIN combines rows from two tables based on a related column. Types: INNER (matching rows only), LEFT (all from left + matches), RIGHT, FULL OUTER." },
    { q: "What are Python list comprehensions?", a: "A concise way to create lists. E.g., [x*2 for x in range(5)] produces [0,2,4,6,8]. Cleaner than writing a full for-loop." },
    { q: "What is the virtual DOM in React?", a: "A lightweight in-memory copy of the real DOM. React updates the virtual DOM first, diffs the changes, then applies only the minimal updates to the real DOM — making it fast." },
  ],
  hr: [
    { q: "Tell me about yourself.", a: "Briefly cover your background, key skills, and what excites you about this opportunity. Aim for 60–90 seconds, ending with a forward-looking statement." },
    { q: "What is your greatest strength?", a: "Choose one strength with a concrete example. E.g., 'I'm a strong problem-solver — during my final project, I debugged a critical performance issue that reduced load time by 40%.'" },
    { q: "What is your greatest weakness?", a: "Name a real but improvable weakness, then show what you're doing about it. E.g., 'I used to over-explain things, so I've been practicing concise communication.'" },
    { q: "Why do you want to work here?", a: "Research the company. Mention their product, culture, or growth trajectory and link it to your goals. Avoid generic answers like 'good company.'" },
    { q: "Where do you see yourself in 5 years?", a: "Show growth ambition aligned with the role. E.g., 'I aim to be a strong contributor and eventually lead a small team on high-impact features.'" },
    { q: "Why should we hire you?", a: "Combine your skills, eagerness to learn, and any relevant experience. Show you've done research and are ready to contribute from day one." },
    { q: "Do you prefer working alone or in a team?", a: "Show adaptability. 'I enjoy both — I can focus independently on complex tasks and also collaborate well to share ideas and solve problems together.'" },
    { q: "How do you handle pressure or tight deadlines?", a: "Describe a method: break the task down, prioritize, communicate early. Give a brief example from a project or exam situation." },
    { q: "Tell me about a challenge you faced and how you overcame it.", a: "Use the STAR method: Situation → Task → Action → Result. Keep it concise and end with the positive outcome." },
    { q: "Do you have any questions for us?", a: "Always say yes. Ask about team structure, tech stack, onboarding, or growth opportunities. It shows genuine interest." },
  ],
  python: [
    { q: "What are Python's key features?", a: "Interpreted, dynamically typed, high-level, supports OOP and functional paradigms, vast standard library, and readable syntax." },
    { q: "What is the difference between a list and a tuple?", a: "Lists are mutable (can be changed), tuples are immutable (cannot be changed). Use tuples for fixed data, lists for collections that change." },
    { q: "What are decorators in Python?", a: "Functions that wrap another function to extend its behavior without modifying it. Common use: @staticmethod, @property, @login_required. Syntax: @decorator above the function." },
    { q: "What is a generator in Python?", a: "A function that yields values one at a time using the yield keyword. Memory-efficient for large data since it doesn't load everything into memory at once." },
    { q: "Explain list comprehension.", a: "[expr for item in iterable if condition]. E.g., [x**2 for x in range(10) if x % 2 == 0] returns squares of even numbers." },
    { q: "What is the difference between deepcopy and shallow copy?", a: "Shallow copy duplicates the outer object but references nested objects. Deep copy duplicates everything including nested structures. Use copy.deepcopy() for the latter." },
    { q: "What is *args and **kwargs?", a: "*args lets a function accept any number of positional arguments as a tuple. **kwargs accepts any number of keyword arguments as a dictionary." },
    { q: "What is GIL in Python?", a: "Global Interpreter Lock — a mutex that allows only one thread to execute Python bytecode at a time. It limits true multi-threading for CPU-bound tasks but doesn't affect I/O-bound tasks." },
    { q: "What are Python's data types?", a: "int, float, complex, str, bool, list, tuple, set, frozenset, dict, bytes, None." },
    { q: "What is the difference between is and ==?", a: "== checks if values are equal. is checks if both variables point to the same object in memory." },
  ],
  sql: [
    { q: "What is the difference between WHERE and HAVING?", a: "WHERE filters rows before aggregation. HAVING filters groups after GROUP BY. You can't use aggregate functions in WHERE." },
    { q: "Explain the different types of JOINs.", a: "INNER JOIN: only matching rows. LEFT JOIN: all from left + matches. RIGHT JOIN: all from right + matches. FULL OUTER: all rows from both tables." },
    { q: "What is a primary key vs foreign key?", a: "Primary key uniquely identifies each row in a table. Foreign key is a column that references the primary key of another table, enforcing referential integrity." },
    { q: "What is normalization?", a: "Organizing data to reduce redundancy. 1NF: atomic values. 2NF: no partial dependencies. 3NF: no transitive dependencies. Reduces data duplication and anomalies." },
    { q: "What is an index in SQL?", a: "A data structure that speeds up SELECT queries by allowing faster lookups. Trade-off: slows down INSERT/UPDATE/DELETE. Use on frequently searched columns." },
    { q: "What is the difference between DELETE, TRUNCATE, and DROP?", a: "DELETE removes specific rows (can be rolled back). TRUNCATE removes all rows fast (can't be rolled back in most DBs). DROP removes the entire table structure." },
    { q: "What is a subquery?", a: "A query nested inside another query. E.g., SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)." },
    { q: "What is ACID in databases?", a: "Atomicity (all or nothing), Consistency (data remains valid), Isolation (transactions don't interfere), Durability (committed data persists). Ensures reliable transactions." },
    { q: "What is GROUP BY used for?", a: "Groups rows with the same values in specified columns so aggregate functions (COUNT, SUM, AVG) can be applied per group." },
  ],
  java: [
    { q: "What is OOP and its four pillars?", a: "Object-Oriented Programming. Pillars: Encapsulation (hiding data), Inheritance (reusing code), Polymorphism (many forms), Abstraction (hiding complexity)." },
    { q: "What is the difference between abstract class and interface?", a: "Abstract class can have concrete methods and state. Interface (Java 8+) can have default methods but is primarily a contract. A class can implement multiple interfaces but extend only one abstract class." },
    { q: "What is the difference between == and .equals() in Java?", a: "== compares object references (memory address). .equals() compares the actual content. Always use .equals() for String comparisons." },
    { q: "What is the Java Collections Framework?", a: "A set of interfaces and classes for storing and manipulating groups of objects. Key: List (ArrayList, LinkedList), Set (HashSet), Map (HashMap, TreeMap), Queue." },
    { q: "What is multithreading in Java?", a: "Executing multiple threads simultaneously. Implement via Thread class or Runnable interface. Use synchronized keyword to prevent race conditions." },
    { q: "What is exception handling in Java?", a: "Using try-catch-finally blocks to handle runtime errors. Checked exceptions must be handled; unchecked (RuntimeException) don't have to be." },
    { q: "What is the difference between ArrayList and LinkedList?", a: "ArrayList uses dynamic array — fast random access O(1), slow insertions in middle. LinkedList uses doubly linked list — fast insertions O(1), slow random access O(n)." },
    { q: "What is JVM, JRE, and JDK?", a: "JVM runs bytecode. JRE = JVM + standard libraries (to run Java). JDK = JRE + compiler + tools (to develop Java)." },
    { q: "What is method overloading vs overriding?", a: "Overloading: same method name, different parameters (compile-time). Overriding: subclass redefines a parent class method (runtime polymorphism)." },
  ],
  javascript: [
    { q: "What is the difference between let, const, and var?", a: "var is function-scoped and hoisted. let is block-scoped, not hoisted to a usable state. const is block-scoped and cannot be reassigned. Prefer const, then let." },
    { q: "What is a closure in JavaScript?", a: "A function that remembers the variables from its outer scope even after the outer function has returned. Used for data privacy and factory functions." },
    { q: "What is the event loop?", a: "JavaScript is single-threaded. The event loop processes the call stack, then picks tasks from the callback queue. This enables async behavior without blocking." },
    { q: "What is Promise and async/await?", a: "Promise represents a future value (pending/resolved/rejected). async/await is syntactic sugar on Promises — makes async code look synchronous and easier to read." },
    { q: "What is the difference between null and undefined?", a: "undefined means a variable was declared but not assigned. null is an intentional empty value. typeof null is 'object' (a historical JS bug)." },
    { q: "What is prototypal inheritance?", a: "Objects inherit properties via a prototype chain. When a property isn't found on an object, JS looks up the chain to its prototype, then its prototype's prototype, etc." },
    { q: "What is hoisting?", a: "JS moves function declarations and var declarations to the top of their scope before execution. Only the declaration is hoisted, not the initialization." },
    { q: "What are arrow functions and how do they differ from regular functions?", a: "Arrow functions have a shorter syntax and do NOT have their own this — they inherit this from the surrounding context. Cannot be used as constructors." },
    { q: "What is event delegation?", a: "Instead of adding event listeners to each child, add one listener to a parent and use event.target to identify which child was clicked. Efficient for dynamic lists." },
    { q: "Explain debounce vs throttle.", a: "Debounce delays execution until after a pause (e.g., search input). Throttle limits execution to once per interval (e.g., scroll events). Both optimize performance." },
  ],
  react: [
    { q: "What is the virtual DOM and why does React use it?", a: "An in-memory representation of the real DOM. React diffs the virtual DOM with each update and applies only the minimum changes needed — making UI updates efficient." },
    { q: "What are React hooks?", a: "Functions that let you use state and lifecycle features in functional components. Key hooks: useState, useEffect, useContext, useRef, useMemo, useCallback." },
    { q: "What is the difference between useState and useReducer?", a: "useState is for simple state. useReducer is for complex state logic with multiple transitions — similar to Redux pattern. useReducer(reducer, initialState) returns [state, dispatch]." },
    { q: "What is useEffect and when does it run?", a: "Runs side effects after render. With no deps array: every render. With []: only on mount. With [dep]: when dep changes. Return a cleanup function to prevent memory leaks." },
    { q: "What is prop drilling and how do you avoid it?", a: "Passing props through many layers of components. Avoid with React Context, or state management libraries like Zustand or Redux." },
    { q: "What is React.memo?", a: "A higher-order component that memoizes a component's output. It prevents re-renders if props haven't changed. Useful for performance in large lists." },
    { q: "What is the key prop in lists?", a: "A unique identifier React uses to track list items during re-renders. Without it, React may inefficiently re-render or reorder items. Use stable IDs, not array indexes." },
    { q: "What is controlled vs uncontrolled component?", a: "Controlled: form input value is managed by React state. Uncontrolled: managed by the DOM using refs. Controlled is preferred for validation and predictability." },
    { q: "What is the Context API?", a: "A way to share data globally without prop drilling. Create context with createContext(), provide it with <Context.Provider value={...}>, consume with useContext()." },
    { q: "What is lazy loading in React?", a: "Loading components only when needed using React.lazy() and Suspense. Reduces initial bundle size and improves page load speed." },
  ],
  nodejs: [
    { q: "What is Node.js and why is it used?", a: "A JavaScript runtime built on Chrome's V8 engine. Non-blocking, event-driven I/O makes it ideal for scalable network applications and APIs." },
    { q: "What is the event loop in Node.js?", a: "Node processes async operations (I/O, timers) via an event loop. After the call stack is empty, it processes events from the queue — enabling non-blocking operations." },
    { q: "What is middleware in Node.js?", a: "Functions that execute in the request-response cycle. Can modify req/res, end the cycle, or call next(). Used for logging, auth, error handling, parsing." },
    { q: "What is npm?", a: "Node Package Manager — used to install, share, and manage JavaScript packages/dependencies. package.json tracks dependencies; node_modules contains installed packages." },
    { q: "What is the difference between require and import?", a: "require is CommonJS (synchronous, Node.js default). import is ES Modules (asynchronous, modern standard). Node.js supports both; import requires .mjs or 'type: module'." },
    { q: "What is a stream in Node.js?", a: "An abstract interface for reading/writing data in chunks, rather than loading it all into memory. Types: Readable, Writable, Duplex, Transform. Great for file I/O." },
    { q: "What is process.env?", a: "An object containing the user's environment variables. Used to store secrets like API keys or config (e.g., PORT, DB_URL) separately from code using .env files." },
    { q: "How does Node.js handle concurrency without multiple threads?", a: "Using the event loop and async I/O. Blocking operations are offloaded to the OS or thread pool (via libuv), and their callbacks are queued when complete." },
  ],
  express: [
    { q: "What is Express.js?", a: "A minimal, flexible Node.js web framework for building REST APIs and web apps. It simplifies routing, middleware, and request/response handling." },
    { q: "How do you define routes in Express?", a: "app.get('/path', (req, res) => res.send('Hello')). Methods: get, post, put, delete, patch. Use app.use() for middleware on all routes." },
    { q: "What is middleware and how does it work?", a: "A function (req, res, next) that runs between receiving the request and sending the response. Call next() to pass control to the next middleware." },
    { q: "What is the difference between app.use() and app.get()?", a: "app.use() applies middleware to all HTTP methods and can match partial paths. app.get() only matches GET requests on the exact path." },
    { q: "How do you handle errors in Express?", a: "Define an error-handling middleware with 4 params: (err, req, res, next). It catches errors passed via next(err) from any preceding middleware." },
    { q: "What is req.params vs req.query vs req.body?", a: "req.params: route params (/user/:id). req.query: URL query string (?name=abc). req.body: data in POST/PUT request body (needs body-parser or express.json() middleware)." },
    { q: "What is CORS and how do you enable it in Express?", a: "Cross-Origin Resource Sharing — a security policy restricting requests from different origins. Enable with the cors package: app.use(cors()). Configure origins for production." },
    { q: "What is Express Router?", a: "A mini Express app used to modularize route handling. Create with express.Router(), define routes on it, then mount with app.use('/prefix', router)." },
  ],
  projects: [
    { q: "Walk me through your most significant project.", a: "Cover: Problem statement → Tech stack → Your specific contribution → Challenges → Outcome/impact. Keep it under 3 minutes. Use metrics if possible." },
    { q: "What challenges did you face and how did you solve them?", a: "Be specific. Name the actual issue (e.g., 'API latency was causing 3s load times'), your approach (caching with Redis), and the result (reduced to 300ms)." },
    { q: "Why did you choose this tech stack?", a: "Show intentionality. E.g., 'I used React for the dynamic UI because of its component reusability, and Node.js for the backend since it allowed me to use one language throughout.'" },
    { q: "How did you handle version control in your project?", a: "Describe using Git: feature branches, meaningful commit messages, pull requests for review. Mention if you used GitHub/GitLab and any CI/CD workflows." },
    { q: "How would you improve your project if you had more time?", a: "Shows growth mindset. Mention realistic improvements: add testing, improve performance, add auth, better error handling, or scale the architecture." },
    { q: "How did you handle authentication in your project?", a: "Describe the method: JWT tokens, OAuth (Google login), or session-based auth. Mention secure practices like hashing passwords with bcrypt and storing tokens securely." },
    { q: "Describe the architecture of your project.", a: "Explain the structure: frontend (React), backend (Node/Express), database (MongoDB/PostgreSQL), and how they communicate via REST or GraphQL APIs." },
    { q: "How did you test your application?", a: "Mention any testing done: manual testing, unit tests (Jest), or integration tests. If minimal, be honest and mention you'd add more tests as a next step." },
    { q: "What was your most difficult bug and how did you fix it?", a: "Describe the symptom, how you debugged (console logs, breakpoints, reading docs/Stack Overflow), and the root cause + fix. Shows problem-solving process." },
  ],
};

const categories = [
  { id: "important", label: "⭐ Top Picks", icon: "★", color: "#f59e0b" },
  { id: "hr", label: "HR Interview", icon: "👤", color: "#8b5cf6" },
  { id: "python", label: "Python", icon: "🐍", color: "#3b82f6" },
  { id: "sql", label: "SQL", icon: "🗄️", color: "#06b6d4" },
  { id: "java", label: "Java", icon: "☕", color: "#f97316" },
  { id: "javascript", label: "JavaScript", icon: "⚡", color: "#eab308" },
  { id: "react", label: "React.js", icon: "⚛️", color: "#38bdf8" },
  { id: "nodejs", label: "Node.js", icon: "🟢", color: "#22c55e" },
  { id: "express", label: "Express.js", icon: "🚂", color: "#a3a3a3" },
  { id: "projects", label: "Projects", icon: "🛠️", color: "#ec4899" },
];

function QuestionCard({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "box-shadow 0.2s, transform 0.2s",
        animationDelay: `${index * 40}ms`,
      }}
      className="q-card"
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "18px 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
          color: "var(--text-primary)",
        }}
      >
        <span
          style={{
            minWidth: "26px",
            height: "26px",
            borderRadius: "50%",
            background: "var(--accent)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "700",
            flexShrink: 0,
            marginTop: "1px",
          }}
        >
          {index + 1}
        </span>
        <span style={{ flex: 1, fontSize: "14.5px", fontWeight: "550", lineHeight: "1.5", fontFamily: "var(--font-body)" }}>
          {q}
        </span>
        <span
          style={{
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            color: "var(--text-muted)",
            fontSize: "12px",
            flexShrink: 0,
            marginTop: "4px",
          }}
        >
          ▼
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            padding: "0 20px 18px 60px",
            fontSize: "13.5px",
            lineHeight: "1.7",
            color: "var(--text-secondary)",
            borderTop: "1px solid var(--border)",
            paddingTop: "14px",
          }}
        >
          {a}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("important");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    const src = questions[active] || [];
    if (!search.trim()) return src;
    const s = search.toLowerCase();
    return src.filter((item) => item.q.toLowerCase().includes(s) || item.a.toLowerCase().includes(s));
  }, [active, search]);

  const totalQ = Object.values(questions).flat().length;

  const css = dark
    ? {
        "--bg": "#0f1117",
        "--surface": "#161b27",
        "--card-bg": "#1c2333",
        "--border": "#2a3347",
        "--text-primary": "#e8eaf0",
        "--text-secondary": "#8d97ad",
        "--text-muted": "#576277",
        "--accent": "#f59e0b",
        "--accent-soft": "rgba(245,158,11,0.12)",
        "--sidebar-bg": "#13182280",
        "--font-display": "'Syne', sans-serif",
        "--font-body": "'DM Sans', sans-serif",
      }
    : {
        "--bg": "#f4f6fb",
        "--surface": "#ffffff",
        "--card-bg": "#ffffff",
        "--border": "#e2e8f0",
        "--text-primary": "#1a202c",
        "--text-secondary": "#4a5568",
        "--text-muted": "#a0aec0",
        "--accent": "#d97706",
        "--accent-soft": "rgba(217,119,6,0.1)",
        "--sidebar-bg": "#ffffffcc",
        "--font-display": "'Syne', sans-serif",
        "--font-body": "'DM Sans', sans-serif",
      };

  const activeCat = categories.find((c) => c.id === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-body); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
        .q-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.18); transform: translateY(-1px); }
        .nav-item { cursor: pointer; border-radius: 9px; transition: all 0.18s; }
        .nav-item:hover { background: var(--accent-soft) !important; }
        .fade-in { animation: fadeUp 0.4s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .sidebar { position: fixed !important; left: 0; top: 0; bottom: 0; z-index: 200; transform: translateX(-100%); transition: transform 0.3s; }
          .sidebar.open { transform: translateX(0); }
          .mobile-menu-btn { display: flex !important; }
          .main-content { padding: 16px !important; }
          .header-inner { padding: 12px 16px !important; }
          .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 150; display: none; }
          .overlay.show { display: block; }
        }
        @media (min-width: 769px) { .sidebar { transform: none !important; } }
      `}</style>

      <div style={{ ...css, minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)", fontFamily: "var(--font-body)" }}>

        {/* Mobile overlay */}
        <div className={`overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

        {/* Header */}
        <header style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
          <div className="header-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "14px 28px", display: "flex", alignItems: "center", gap: "16px" }}>
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: "8px", padding: "7px 10px", cursor: "pointer", color: "var(--text-primary)", fontSize: "16px" }}>
              ☰
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🎯</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "800", letterSpacing: "-0.3px", lineHeight: 1 }}>U Karthik's</div>
                <div style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.5px", textTransform: "uppercase" }}>Interview Prep for Freshers</div>
              </div>
            </div>

            {/* Search */}
            <div style={{ flex: 1, maxWidth: "380px", position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: "14px" }}>🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                style={{
                  width: "100%", padding: "9px 12px 9px 36px",
                  background: "var(--bg)", border: "1px solid var(--border)",
                  borderRadius: "9px", color: "var(--text-primary)",
                  fontSize: "13px", outline: "none", fontFamily: "var(--font-body)",
                  transition: "border-color 0.2s",
                }}
              />
            </div>

            <button
              onClick={() => setDark(!dark)}
              style={{ background: "var(--accent-soft)", border: "1px solid var(--border)", borderRadius: "9px", padding: "8px 14px", cursor: "pointer", color: "var(--text-primary)", fontSize: "14px", fontWeight: "500", whiteSpace: "nowrap" }}
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", minHeight: "calc(100vh - 65px)" }}>

          {/* Sidebar */}
          <aside className={`sidebar ${sidebarOpen ? "open" : ""}`} style={{ width: "240px", flexShrink: 0, borderRight: "1px solid var(--border)", background: "var(--surface)", padding: "20px 12px", overflowY: "auto" }}>
            <div style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600", padding: "0 10px 10px" }}>Categories</div>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="nav-item"
                onClick={() => { setActive(cat.id); setSearch(""); setSidebarOpen(false); }}
                style={{
                  padding: "10px 12px",
                  marginBottom: "3px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: active === cat.id ? "var(--accent-soft)" : "transparent",
                  borderLeft: active === cat.id ? `3px solid ${cat.color}` : "3px solid transparent",
                }}
              >
                <span style={{ fontSize: "16px" }}>{cat.icon}</span>
                <span style={{ fontSize: "13.5px", fontWeight: active === cat.id ? "600" : "400", color: active === cat.id ? "var(--text-primary)" : "var(--text-secondary)" }}>{cat.label}</span>
                <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--text-muted)", background: "var(--bg)", borderRadius: "20px", padding: "1px 7px" }}>
                  {questions[cat.id]?.length}
                </span>
              </div>
            ))}

            <div style={{ margin: "20px 10px 10px", padding: "14px", background: "var(--accent-soft)", borderRadius: "10px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "22px", fontFamily: "var(--font-display)", fontWeight: "800", color: "var(--accent)" }}>{totalQ}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Total Questions</div>
            </div>
          </aside>

          {/* Main */}
          <main className="main-content" style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>

            {/* Section header */}
            <div className="fade-in" style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${activeCat?.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                  {activeCat?.icon}
                </div>
                <div>
                  <h1 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px", color: "var(--text-primary)" }}>
                    {activeCat?.label}
                  </h1>
                  <p style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
                    {filtered.length} question{filtered.length !== 1 ? "s" : ""}
                    {search && ` matching "${search}"`}
                  </p>
                </div>
              </div>
              {active === "important" && (
                <div style={{ marginTop: "10px", padding: "12px 16px", background: "rgba(245,158,11,0.08)", borderRadius: "10px", border: "1px solid rgba(245,158,11,0.2)", fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  ⭐ <strong style={{ color: "var(--accent)" }}>Most Asked</strong> — These questions appear in almost every fresher interview. Master these first before diving into individual topics.
                </div>
              )}
            </div>

            {/* Quick category chips for mobile */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActive(cat.id); setSearch(""); }}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "20px",
                    border: `1px solid ${active === cat.id ? cat.color : "var(--border)"}`,
                    background: active === cat.id ? `${cat.color}18` : "transparent",
                    color: active === cat.id ? cat.color : "var(--text-muted)",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: active === cat.id ? "600" : "400",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.icon} {cat.label.replace("⭐ ", "")}
                </button>
              ))}
            </div>

            {/* Questions */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>No questions found</div>
                <div style={{ fontSize: "13px", marginTop: "6px" }}>Try a different search term</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }} key={active}>
                {filtered.map((item, i) => (
                  <div key={i} className="fade-in">
                    <QuestionCard q={item.q} a={item.a} index={i} />
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid var(--border)", textAlign: "center", fontSize: "12px", color: "var(--text-muted)" }}>
              Prepared by Ujgiri karthik
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
