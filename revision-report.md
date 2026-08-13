# Textbook Revision Report — August 2026

A full audit of the tome (`docs/`) for errors, misleading content, and out-of-date material, cross-checked against the companion tasks repo and autograder.

**Method.** Every chapter was read line-by-line. Every substantive code snippet was type-checked verbatim against the course's actual toolchain (TypeScript 4.9.5, React 18.3.1, react-bootstrap 2.10.4, `--strict`, from the tasks repo's own `node_modules`); runtime-output claims were executed in Node 22. The book's git command sequences for all 10 tasks were replayed in order in a throwaway clone of the tasks repo. Every task branch's tests and the autograder's staging suites were compared against the book's task descriptions. All ~55 unique external URLs were checked. Neither the tasks repo nor the autograder was modified.

**Priorities.**

| Level | Meaning |
|---|---|
| **P0** | Outright broken: code that doesn't compile, wrong claimed output, or instructions that fail when followed verbatim |
| **P1** | Extremely misleading: teaches a wrong mental model, or a spec that contradicts itself/the autograder |
| **P2** | Painfully out of date: dead links, pre-2022 UI instructions, stale ecosystem claims |
| **P3** | Minor polish: typos, wrong cross-references, cosmetic inconsistencies |

**Headline numbers:** 22 P0 items, 10 P1, ~12 P2, ~45 P3. Almost everything is fixable **textbook-side only** — only two items genuinely invite a change to the tasks/autograder repos, and both have textbook-only mitigations (see [Cross-repo decisions](#cross-repo-decisions)).

**One systemic note that explains many P0s:** the embedded in-browser editor (`docs/assets/js/runnable_ts.js`) uses `ts.transpile()` — transpile-only, **no type checking**, ES3 target, sloppy-mode eval. Many snippets "work" when run in the book but fail immediately when a student pastes them into VS Code / the tasks repo (implicit globals, redeclarations, type errors). That's how most of the broken snippets below survived unnoticed. Every snippet flagged P0 was verified to fail under the course's real compiler settings.

---

## P0 — Outright broken (fix before the semester)

### The one that destroys student work

- [ ] **`docs/3-control/nested.md:399-408` — the `task-nested` merge ALWAYS conflicts, and the book gives zero guidance.** `task-objects` is not an ancestor of `task-nested`; the branch independently re-adds `objects.test.ts`, `data/questions.json`, and `interfaces/question.ts`. Replaying the book's commands verbatim, `git merge upstream/task-nested` stops with add/add conflicts in exactly those three files for **every** student, plus `src/objects.ts` for anyone who solved the objects task. Worse, the correct resolution is opposite per file (keep **ours** for `objects.ts`, take **theirs** for the other three) — resolving "theirs" wholesale silently wipes the student's graded `objects.ts` solution. The chapter never mentions merge conflicts (the book's first conflict guidance appears later, in state.md).
  **Fix (textbook-only):** add a merge-conflict section to nested.md mirroring state.md:550-553, stating explicitly which side to keep per file. **Cross-repo alternative** (higher bar): rebuild `task-nested` on top of `task-objects` so the merge is clean.

### Snippets that don't compile or produce wrong output

Chapter 3 (`docs/3-control/`) — all verified under TS 4.9.5 strict:

- [ ] **`primitives.md:287`** — "You have `&&` (and) and `||` (or) and `^^` (xor)." **There is no `^^` operator in JavaScript/TypeScript** — it's a SyntaxError. Delete the xor claim (or mention `!==` on booleans as the xor idiom).
- [ ] **`primitives.md:212-218`** — `sayHello();` and `console.log(sayHello());` call a `(name: string) => void` function with no argument — TS2554 ×2, and this is the snippet the whole section's explanation hangs on. Call it with an argument.
- [ ] **`primitives.md:274`** — `console.log(1+3 !== "4");` — TypeScript refuses to compile number-vs-string comparison (TS2367). Use `1 + 3 !== 5` and mention that TS blocks cross-type comparisons.
- [ ] **`arrays.md:182-198`** — the map-vs-foreach "equivalent" block: (a) `doubled` is declared twice (TS2451); (b) the loop body is `doubled.push(price)` — **it doesn't double**, so the "equivalent" loop produces `[13, 7, 8, 2]` instead of `[26, 14, 16, 4]`, and the embedded editor happily prints the wrong output. Fix: `doubled.push(2 * price)` and rename the loop's variable (or split blocks).
- [ ] **`arrays.md:323-346`** — the reduce block declares `const sum` three times and `let currentTotal` twice in one runnable block (TS2451 ×5). Split into separate fenced blocks or use distinct names.
- [ ] **`objects.md:111`** — `console.log("Before": myPhone.batteryLeft);` — colon instead of comma; syntax error even in the embedded editor. Fix: `"Before:",`.
- [ ] **`objects.md:244`** — `Object.keys(lookupState);` missing a closing paren; kills the whole runnable Records block. Add `)`.
- [ ] **`nested.md:148`** — `movie === "Castle in the Sky"` compares a `Movie` object to a string (TS2367); and even as JS, `findIndex` returns −1 so the subsequent `splice(1 + castleIndex, ...)` inserts at the **front** instead of after the movie. Fix: `movie.name === "Castle in the Sky"`.
- [ ] **`nested.md:150-154`** — `splice(..., { ... }];` — call opened with `(`, closed with `}]`; the whole large runnable example dies. Fix: `});`.
- [ ] **`nested.md:191,194,197`** — `kiki = {...}` etc. with no `const`/`let` (TS2304 ×9). Works in the embedded editor only via sloppy-mode implicit globals — exactly the sloppiness the book warns against. Prefix with `const`.
- [ ] **`nested.md:108-120`** — `castleInTheSky.released` after `.find(...)` — `find` returns `Movie | undefined`, so this is TS18048 under the exact strict settings students use for the nested task. Use `?.` and add one sentence about `find` possibly returning `undefined`.
- [ ] **`nested.md:330-351`** — the deep-copy email capstone: missing comma between `tags:` and `recipients:` (TS1005), and the email literals use `name:` where the `Email` interface requires `subject:` (TS2345). Two-line fix.

Chapter 4 (`docs/4-state/`):

- [ ] **`components.md:194`** — `<li key={num}>{num}</num>` — closing tag mismatch (TS17002). Ironically presented as the snippet that "works" next to the intentionally broken one. Fix: `</li>`.
- [ ] **`components.md:532-533`** — `makePriceCalculator(.7)` with the claim "At a 7% tax rate... $9.99 is now" — `.7` is a **70%** rate; it prints 16.983, not the 10.69 the 7% claim implies, and the "equivalent" two-parameter version above correctly uses `.07`. Fix: `.7` → `.07`.
- [ ] **`forms.md:113`** — `function textboxCallback(event: ...) => {` — a `function` declaration can't have `=>` (TS1144). Drop the `=>` or make it a `const` arrow.
- [ ] **`forms.md:233,249-251`** — Horizontal Layout example: `useState<number>(2022)` fed `event.target.value` (a string) — TS2345, and it contradicts the Number Input section immediately above it, which correctly teaches that the value is a string. Fix: `useState<string>("2022")` like the earlier example.

Chapter 5/7 (`docs/5-complex/`, `docs/7-extras/`):

- [ ] **`examples.md:48-54`** — the **first example of the chapter** has one extra closing paren (`{...movie}));` → `{...movie});`). TS1005.
- [ ] **`examples.md:100-102`** — filter callback annotated `(movie: Movie): Movie` but returns a boolean (TS2322); the comment above also says "map" for a `filter`. Fix: `: boolean`.
- [ ] **`examples.md:172-173`** — `setReleased(event.target.value)` passes a string to a `number` state setter (TS2345); at runtime it would store a string in the new movie. Fix: `setReleased(parseInt(event.target.value) || 0)`.
- [ ] **`wrapping.md:105`** — the snippet **explicitly labeled "a CORRECT version"** doesn't parse: `setTeams: (t: Team[])` is missing the function return type. Fix: `setTeams: (t: Team[]) => void`. (Especially damaging since the page's whole point is "this version is right.")

Chapter 1 (`docs/1-setup/`, `docs/index.md`) — broken instructions/links:

- [ ] **`index.md:27`** — the book's own table of contents links to `5-examples/index.md`, which doesn't exist (the file is `5-complex/examples.md`). Students get a 404 from the ToC.
- [ ] **`environment.md:78`** — tells students to click a GitHub Actions workflow named "Deploy dev build on main push"; the actual workflow in the tasks repo is named **"Deploy main branch as website"**. Update the text (and the `run_workflow.png` screenshot if convenient).

## P1 — Extremely misleading

- [ ] **`state.md:638-639` — TwoDice spec is self-contradictory and disagrees with the autograder.** Both bullets say "When the two states are equal" (one says Lose, the other Win). The actual tests: both dice equal **1** (snake eyes) → `Lose`; equal and not 1 → `Win`. Literal compliance is impossible. Fix (textbook-only; the tests are internally consistent): bullet 1 → "When the two states are both 1 (snake eyes)... `Lose`"; bullet 2 → "When the two states are equal (and not 1)... `Win`".
- [ ] **`state.md:543-553` + `components.md:602-610` — `task-state` branch is stale, producing merge conflicts the book doesn't cover.** `task-state` missed the "Big 2024 update" refresh: it's the only branch still carrying `.eslintrc.json` (and lacking `.eslintrc.js`). Verified by simulation: merging `upstream/task-state` conflicts on `.eslintrc.json`, `src/nested.ts`, and `src/nested.test.ts`; the next merge (`task-components`) conflicts on `.eslintrc.json` again — and components.md has **no** conflict warning at all. A student who keeps `.eslintrc.json` ends up with two ESLint configs, which can break `npm run lint`. **Preferred fix is cross-repo** (refresh `task-state` like the other branches — see Cross-repo decisions); textbook-only mitigation: extend state.md's conflict note ("delete `.eslintrc.json` if the merge resurrects it; keep `.eslintrc.js`") and add a one-line conflict warning to components.md.
- [ ] **`components.md:574-578` — wrong mental model of child re-rendering, and "remount" used to mean its opposite.** The passage says React "could *remount* (aka reuse)" properly-defined children and only re-renders because it can't tell if props changed. Both halves are wrong: React 18 re-renders **all** children when a parent re-renders (skipping requires `React.memo`), and *remount* means unmount+mount fresh (DOM destroyed, **state reset**) — which is exactly the real penalty of the nested-component anti-pattern the section is warning about, and it goes unmentioned ("small inefficiencies"). Also "TypeScript only believes they are equal" — that's JavaScript runtime reference equality, not TypeScript. Rewrite the paragraph around: nested component = new component *type* every render → React unmounts and remounts the subtree, destroying its DOM and state.
- [ ] **`objects.md:40-44`** — "Fields are case-sensitive; this logs `undefined`" (`drBart.Title`). True only in plain JS — TypeScript rejects it at compile time (TS2551 "Did you mean 'title'?"), which is TS's core value proposition. The embedded editor masks this. Fix: keep the lines commented out and say "JavaScript would log `undefined`; TypeScript catches this as a compile error."
- [ ] **`state.md:177`** — `{visible && <div>Hello!</div>}  //JSX allows us to mix code and HTML` — inside JSX children `//` is **not** a comment; it renders as visible page text, contradicting the described output (and it type-checks clean, so nothing warns). Same bug pattern at **`complex.md:376-378`** (`// Existing component instantiations go here` as JSX children). Fix: `{/* ... */}` or move the comment out.
- [ ] **`examples.md:530-640` (Heart Name capstone)** — the snippet re-declares `Contact`, `Email`, `INBOXES` (signaling it's standalone) but omits `type Inboxes = Record<string, Email[]>`, so copied verbatim it fails TS2304. Add the type alias inside the snippet.
- [ ] **`arrays.md:310-316`** — the reduce signature spec says `initialValue: X`; it must be `Y` (the accumulator/result type). As written it breaks the moment students reduce to a different type than the elements. Fix: `initialValue: Y`.
- [ ] **`primitives.md:55`** — "Prettier will change double quotes into single quotes, and the linter will complain about single quotes" — **backwards**. The tasks repo's `.prettierrc` has no `singleQuote` setting, so Prettier enforces double quotes. Fix: "...change single quotes into double quotes."
- [ ] **`environment.md:98-108, 161-167`** — the clone/push flow never mentions GitHub authentication. Password auth over HTTPS died in 2021; students without Git Credential Manager (mostly macOS/Linux) hit "Authentication failed" at first push with no guidance. Add one short paragraph: browser sign-in popup (GCM) → do that; otherwise `gh auth login`, a PAT, or SSH keys, with a link to GitHub's docs.
- [ ] **`objects.md:354`** — tells students to filter jest by function name "e.g., `makeQuiz`" — no such function exists in `objects.ts` (exports are `makeBlankQuestion`, `isCorrect`, ...). The filter matches zero tests, which looks like everything passes. Fix: use `makeBlankQuestion`.

## P2 — Painfully out of date

- [ ] **Dead react-bootstrap doc links (404) — 5 URLs, 3 files.** Their docs moved under `/docs/`; the fix is inserting `/docs` into the path (all verified 200):
  - `2-app/editing.md:215` → `https://react-bootstrap.github.io/docs/layout/grid/`
  - `4-state/forms.md:27` → `.../docs/forms/overview/`
  - `4-state/forms.md:227` → `.../docs/forms/layout/#horizontal-form`
  - `5-complex/complex.md:134` → `.../docs/components/list-group/`
  - `5-complex/complex.md:270` → `.../docs/components/modal/`
- [ ] **`environment.md:35` — "Install Node... You can use the LTS version."** In August 2026, "LTS" means Node 24 (22 is in maintenance), and this 2022-era toolchain is untested there; "use LTS" scatters students across versions. (Verified: no OpenSSL issue with CRA 5 — webpack 5 fixed that — and the course demonstrably runs on Node 22.) Fix: name a version: "Install Node 22 (LTS). Newer versions may work but are not tested with our tooling. Verify with `node --version` and `npm --version`." (The current text also says to verify `node` with `npm --version` — wrong command.)
- [ ] **`environment.md:66`** — "Scroll down to the 'Github Pages' section" describes the pre-2022 settings page; Pages is now a left-sidebar item under "Code and automation". The book's own screenshot already shows the sidebar, contradicting the text.
- [ ] **`state.md:485-497` (echoed `components.md:582-596`) — bare `element.click()` taught, but every course test wraps clicks in `act`.** Under React 18.3 + RTL 16, bare `.click()` produces "not wrapped in act(...)" console errors, and every provided test in the tasks repo uses `await act(async () => { button.click(); })` — a construct the book never explains, though students read those test files constantly. Add a short note explaining the `act` wrapper (or teach `fireEvent.click`). No task changes needed — the tests are already correct.
- [ ] **`forms.md:176-177`** — the Textbox walkthrough references `'Alien'`/`2022` and "the second hook"/`released`, but the snippet being walked through has exactly one hook (`name`). Leftover from an earlier two-field version; rewrite the two steps.
- [ ] **`forms.md:707,709`** — "`MultipleChoiceQuestions`" (heading and prose); the repo component/file/test are singular `MultipleChoiceQuestion`. Drop the "s" twice.
- [ ] **`state.md:450`** — `someText.match(/(\d\d?)/)[0]` fails the course's strict tsconfig (TS2531, match can return null). Fix: `?.[0]`.
- [ ] **`objects.md:282-290`** — two `function checkIfCorgi` definitions in one snippet (TS2393 duplicate implementation in VS Code; runs only in the embedded editor). Comment out or rename the second.
- [ ] **`concepts.md:89,97`** — Knockout listed among popular frameworks; hooks described as "the new fancy hotness" replacing classes "in the late 2010s". In 2026: hooks are simply the standard, class components are legacy, Knockout is dead. Reword.
- [ ] **`branching.md:72`** — "a new file appeared named `src/text.Test.tsx`" — the actual file is `src/text.test.tsx` (lowercase); students searching for the wrong name won't find it.
- [ ] **`nested.md:84-87`** — "re-release all the movies to be this year" with `released: 2022`. Drop "this year" or update.
- [ ] **`components.md:50`, `forms.md:187`, and similar** — `reactjs.org/docs/...` links now redirect to `legacy.reactjs.org` (frozen pre-18 docs). They still load, but the modern equivalents live at react.dev (`/learn/rendering-lists`, etc.). Worth updating when touched.

## P3 — Minor (batch-fix in one editing pass)

**Wrong cross-references / naming**
- [ ] `components.md:644` — ShoveBox path is `src/bad-components/ShoveBox.tsx`, not `src/ShoveBox.tsx`.
- [ ] `complex.md:114` — "Final version of the `MovieView` component" links to `MovieList.tsx`; `MovieView.tsx` exists — point there.
- [ ] `complex.md:168` — "`useReduce`" → `useReducer`.
- [ ] `objects.md:10` — back-link says "Return to TypeScript Objects" but points to arrays.md; should say "Return to Arrays".
- [ ] `branching.md:8` — link text "Return to Environment Setup" points to the chapter index, not environment.md.
- [ ] `components.md:122` — "That `name` variable" — the example's variable is `color`.
- [ ] `components.md:156` — "onClick will be `() => updateChosen(blue)`" — should be the string `'Blue'`.
- [ ] `components.md:411` — "the `Reveal` component" — the component is `RevealButtons`.
- [ ] `state.md:620` — "The initial number of attempts is 4" — tests only assert 0 < n < 10; optionally soften to "e.g., 4".
- [ ] `components.md:4` + `forms.md:4` — both pages have `nav_order: 4.2`; forms should be 4.3 (sidebar order ambiguous).

**Small factual/pedagogical slips**
- [ ] `branching.md:64` — "`-b` means create-branch-if-needed" — `git checkout -b` errors if the branch exists; say "creates a new branch and switches to it".
- [ ] `objects.md:154` — "a class has methods and an interface does not" — interfaces declare method *signatures*; say "no method implementations".
- [ ] `objects.md:171-172` — logs `ada.age` instead of `olderAda.age`, defeating the incremented-copy demonstration.
- [ ] `objects.md:221-231` — `capitol` (the building) used for the capital city, in an interface field students copy.
- [ ] `nested.md:167-174` — the MovieDetails map hardcodes `seen: true` instead of `movie.seen`, silently corrupting data in an example about faithful mapping.
- [ ] `primitives.md:114` — "always define variables using `let`" contradicts the const-first style of the rest of the chapter/course.
- [ ] `primitives.md:281-287` — comparison operators (`<`, `>`, ...) listed under "Logical Operators"; they're relational (fold into the `^^` fix).
- [ ] `arrays.md:152` — "insert 499 after the 8 (aka after index 2)" — the 8 is at index 1; the element lands *at* index 2.
- [ ] `arrays.md:376` — sort's compare function described as "the second argument"; it's the first and only.
- [ ] `arrays.md:39-47` — stub functions with `// ...` bodies and declared return types error (TS2355) if pasted; add `return 0;` or a note.
- [ ] `components.md:56` — hook bail-out described as "reference equality"; it's `Object.is` (value equality for primitives).
- [ ] `components.md:67` — `addPerson(name)` parameter unused (body pushes `newName`); lint noise in copyable code.
- [ ] `components.md:75` — `<input type="textbox">` isn't a valid type; use `type="text"`.
- [ ] `components.md:200-219` — the intentionally broken example also produces duplicate `key` values (two 0s); add a parenthetical so the extra console warning isn't mysterious.
- [ ] `state.md:515` — "React's Testing Library provides... its `expect` function" — `expect` is Jest's; the DOM matchers come from jest-dom.
- [ ] `state.md:519` — `toBe` described as "exact same reference in memory" — it uses `Object.is`; `expect(5).toBe(5)` passes.
- [ ] `forms.md:57` — `disabled={canEdit}` is inverted for the stated intent; should be `disabled={!canEdit}`.
- [ ] `forms.md:295` — "`Form.Input`" doesn't exist in react-bootstrap 2.x; should be `Form.Control`.
- [ ] `forms.md:438` — Multi-Checkbox: "user can select any one of them" → "any number of them".
- [ ] `forms.md:610` — `toBeChecked()` "make sure a textbox or radio has a check" → "checkbox or radio".
- [ ] `saving.md:78-79` — `key={value}` with random ints 0–99: duplicate keys likely; use the index.
- [ ] `saving.md:120-121` — `const filename = event.target.files[0]` is a `File` object, not a filename; rename to `file`.
- [ ] `records.md:43` — "index using any type" — JS object keys are strings/symbols; "any type" describes `Map`. Say "strings".
- [ ] `concepts.md:77` — "JavaScript is the only language that runs directly in modern web-browsers" — WebAssembly; say "only *scripting* language".
- [ ] Missing `key` props in exemplary code (console warnings): `examples.md:63`; inbox Apps (~330-340, ~613-624); every `map` in `records.md` (68, 89, 108, 160, 230-234).
- [ ] `environment.md:171` — "Environments page from the right sidebar" — labeled "Deployments" in current GitHub UI.
- [ ] `environment.md:38` — Chrome Web Store link 301-redirects to `chromewebstore.google.com`; update.
- [ ] `environment.md:62-74` — ordered list numbered 2, 4, 5, 6; renumber.
- [ ] `docs/images/change-base-repo-pr-alt.png` — screenshot shows old upstream `UD-CISC275-S22/tasks`; flow still correct, but re-shoot when convenient.

**Typos (one pass):** "termainal" (environment.md:139, branching.md:90); "since that it does a fetch" (branching.md:62); "renrender", "newcomers thing will work", "(also kind 'destructuring')" (components.md:56, 229, 335); "useState.And" missing space (state.md:126), "make it yellow"→"make it red" comment (state.md:254), "than an error"→"then" (state.md:412), unbalanced backtick (state.md:436); "The The second time", "saved"→"loaded" (saving.md:97); "signficant", "Commiting", "availabel", "heirarchy", "critiera", "to he Final Project", "vaccuum" (complex.md:70, 158, 164, 197, 309, 401, 431); "Arietty"→"Arrietty" (nested.md:40, 223, 281; examples.md:39, 90, 139, 222); "Monoke"→"Mononoke" (nested.md:135, 140, 146); "Naussica"→"Nausicaä" (nested.md:145).

---

## Cross-repo decisions

Only two findings genuinely invite changes outside the textbook. Everything else above is textbook-only.

1. **Refresh the stale `task-state` branch** (see P1 above). This is the one cross-repo change worth real consideration: the branch missed the 2024 refresh that all other task branches got (via `update-branches`), and it's the direct cause of the `.eslintrc.json` conflicts in both the state and components merges. If you refresh it the same way the other branches were refreshed, the P1 textbook mitigation shrinks to nearly nothing. If not, ship the textbook mitigation (tell students which side to keep, and to delete `.eslintrc.json`).
2. **Autograder coverage threshold is dead config** (informational — no student harm). `grading.config` declares `CONFIG_COVERAGE_THRESHOLD_LINES=80`, but `tools/jest_to_gradescope.py` (lines 82–88, marked TODO) hardcodes 50% for the 5-point coverage item and ignores the config. Passing the instructor tests clears 50%, so students are fine — but if you believe the 80% gate is live, it isn't. Fix only if 80% was intended.
3. *(Optional)* **Pin Node via `engines`** in the tasks `package.json` to match whatever version the book names. Purely defensive; the book fix alone (naming Node 22) is probably enough.
4. *(Alternative, higher effort)* **Rebuild `task-nested` on top of `task-objects`** to eliminate the always-conflicting merge (P0 #1). The textbook-only fix (conflict instructions) is much cheaper and pedagogically defensible — students must learn conflict resolution anyway — but the current situation, where the *naive* resolution destroys graded work with no warning, is not tenable.

## Verified aligned — no action needed

To save you re-checking: these were explicitly verified and are fine.

- **Task branch names, order, and grading:** every branch the book names exists; book task order exactly matches autograder numbering (`01-main` … `10-forms`); each autograder suite matches its branch's tests file-for-file; the Quizzer correctly has no autograder (rubric + **Canvas** submission in complex.md is consistent, not an error).
- **Task specs vs. tests:** editing.md's 7 HTML/CSS milestones, the components task ("four broken components", DoubleHalf commented out in App.tsx), all five form-component specs (CheckAnswer, GiveAttempts, EditMode, ChangeColor, MultipleChoiceQuestion), and RevealAnswer/ChangeType/CycleHoliday all match the actual test files. TwoDice is the only spec mismatch (P1 above).
- **Git flows:** the merges for html-css, functions, arrays, objects, forms, and quizzer are clean as written; `task-state → task-components → task-forms` are genuinely chained, matching the book's "checkout previous solved branch" instructions. Only nested (P0) and state/components (P1) conflict.
- **Code that checks out:** all 9 TSX snippets in editing.md, the react-bootstrap `onChange` typings throughout forms.md, the records.md traversals, the saving.md localStorage/upload snippets, and wrapping.md's "wrong idea" example (which misbehaves exactly as claimed — correct pedagogy) all compile clean against the real course toolchain.
- **Links/CDN:** the embedded-editor CDN assets (React 17 UMD, TS 4.9.5, Ace) all load; movie-records links and site live; MDN/getbootstrap/typescriptlang/learngitbranching/create-react-app.dev links live. (The runner pinning React 17 while tasks use 18 is harmless today since the runner doesn't type-check, but keep it in mind if you ever upgrade the widgets.)

## Suggested order of attack

1. **(~1 hr)** The two student-blocking items: nested.md merge-conflict section (P0 #1) and the TwoDice spec (P1). These are the ones that cost students grades.
2. **(~2 hrs)** The 21 broken-snippet P0s — each is a one-to-three-line mechanical fix; every one has a verified error message and fix above.
3. **(~1 hr)** P1 wording fixes (re-render mental model, quotes direction, reduce signature, GitHub auth paragraph, `makeQuiz`) and the five react-bootstrap link fixes.
4. **(~1 hr)** Decide the two cross-repo questions (task-state refresh; coverage config), since those may want lead time before the semester.
5. **(when convenient)** One batch editing pass over the P3 list.
