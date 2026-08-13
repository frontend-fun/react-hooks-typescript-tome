# Textbook Revision Report — August 2026

A full audit of the tome (`docs/`) for errors, misleading content, and out-of-date material, cross-checked against the companion tasks repo and autograder.

> **Status update (Aug 13, second pass):** Checkboxes below reflect the current state of the repo. Most P0/P1/P2 items were fixed by your commits `00164f6` and `ce5d8ca`; all P3 items except the screenshot re-shoot were fixed by the P3 cleanup pass (which also completed the ToC-link and `currentTotal` fixes your commits started). A follow-up pass then fixed the nested.md merge-conflict guidance, the strict-null `find` lines, and the re-render/"remount" paragraph. **Remaining:**
> 1. ~~nested.md merge-conflict guidance~~ *(FIXED — conflict section added with per-file keep-ours/take-theirs instructions)*
> 2. ~~nested.md:117/126 strict-null `find` access~~ *(FIXED — live lines now use `?.`)*
> 3. GitHub authentication paragraph in environment.md (P1) — **deferred by author decision**
> 4. ~~components.md re-render/"remount" paragraph~~ *(FIXED — rewritten around component-type identity and remount-destroys-state)*
> 5. objects.md:45-49 — "logs `undefined`" claims that are actually TS compile errors (P1) — open
> 6. complex.md:380 — `//` comment rendered as JSX text (P1; the state.md instance was fixed) — open
> 7. components.md task section — one-line merge-conflict warning (P1 remnant of the task-state item) — open
> 8. state.md:476 — `match(...)[0]` strict-null error (P2) — **deferred by author decision**
> 9. `change-base-repo-pr-alt.png` screenshot re-shoot (P3) — open
> 10. The two cross-repo decisions (task-state branch refresh; autograder coverage config) — open

**Method.** Every chapter was read line-by-line. Every substantive code snippet was type-checked verbatim against the course's actual toolchain (TypeScript 4.9.5, React 18.3.1, react-bootstrap 2.10.4, `--strict`, from the tasks repo's own `node_modules`); runtime-output claims were executed in Node 22. The book's git command sequences for all 10 tasks were replayed in order in a throwaway clone of the tasks repo. Every task branch's tests and the autograder's staging suites were compared against the book's task descriptions. All ~55 unique external URLs were checked. Neither the tasks repo nor the autograder was modified.

**Priorities.**

| Level | Meaning |
|---|---|
| **P0** | Outright broken: code that doesn't compile, wrong claimed output, or instructions that fail when followed verbatim |
| **P1** | Extremely misleading: teaches a wrong mental model, or a spec that contradicts itself/the autograder |
| **P2** | Painfully out of date: dead links, pre-2022 UI instructions, stale ecosystem claims |
| **P3** | Minor polish: typos, wrong cross-references, cosmetic inconsistencies |

**One systemic note that explains many P0s:** the embedded in-browser editor (`docs/assets/js/runnable_ts.js`) uses `ts.transpile()` — transpile-only, **no type checking**, ES3 target, sloppy-mode eval. Many snippets "work" when run in the book but fail immediately when a student pastes them into VS Code / the tasks repo (implicit globals, redeclarations, type errors). That's how most of the broken snippets below survived unnoticed. Every snippet flagged P0 was verified to fail under the course's real compiler settings.

---

## P0 — Outright broken (fix before the semester)

### The one that destroys student work

- [x] ~~**`docs/3-control/nested.md` — the `task-nested` merge ALWAYS conflicts with zero guidance.**~~ *(FIXED: a "Merge Conflicts" section modeled on state.md's now follows the git commands in the task section. It states the per-file resolution explicitly — keep YOURS for `src/objects.ts` (your solved work; accepting incoming erases it), take OURS for `src/objects.test.ts`, `src/data/questions.json`, and `src/interfaces/question.ts` — and warns against "Accept All Incoming". The cross-repo alternative — rebuilding `task-nested` on top of `task-objects` — remains available if you ever want the merge to be clean.)*

### Snippets that don't compile or produce wrong output

Chapter 3 (`docs/3-control/`):

- [x] ~~`primitives.md` — nonexistent `^^` (xor) operator~~ *(fixed in your commits; section also re-headed "Comparison and Logical Operators" in the P3 pass)*
- [x] ~~`primitives.md` — `sayHello()` called without its required argument~~ *(fixed in your commits)*
- [x] ~~`primitives.md` — `1+3 !== "4"` cross-type comparison TS refuses~~ *(fixed in your commits: now `1 + 3 !== 5`)*
- [x] ~~`arrays.md` — map-vs-foreach block: redeclared `doubled` + loop that didn't double~~ *(fixed in your commits)*
- [x] ~~`arrays.md` — reduce block redeclared `const sum` ×3 and `let currentTotal` ×2~~ *(your commits renamed the sums; the P3 pass completed it by renaming the remaining duplicate `currentTotal` → `runningTotal` in the for-style variant)*
- [x] ~~`objects.md` — `console.log("Before": ...)` colon-for-comma~~ *(fixed in your commits)*
- [x] ~~`objects.md` — missing paren on `Object.keys(lookupState)`~~ *(fixed in your commits)*
- [x] ~~`nested.md` — `movie === "Castle in the Sky"` object/string comparison + front-insertion logic bug~~ *(fixed in your commits: now `movie.name ===`)*
- [x] ~~`nested.md` — `splice(..., { ... }];` bracket mismatch~~ *(fixed in your commits)*
- [x] ~~`nested.md` — `kiki` etc. assigned without `const`/`let`~~ *(fixed in your commits)*
- [x] ~~`nested.md:113-117, 126` — `find` result used without handling `undefined`~~ *(FIXED: the live lines now use `castleInTheSky?.released` and `post2000Movie?.name`, with a tightened comment explaining why `find` forces optional chaining under strict TS.)*
- [x] ~~`nested.md` — email capstone: missing comma + `name:` vs required `subject:`~~ *(fixed in your commits)*

Chapter 4 (`docs/4-state/`):

- [x] ~~`components.md` — `<li>...</num>` closing-tag mismatch~~ *(fixed in your commits)*
- [x] ~~`components.md` — `makePriceCalculator(.7)` claimed as 7% tax~~ *(fixed in your commits)*
- [x] ~~`forms.md` — `function textboxCallback(...) => {` invalid syntax~~ *(fixed in your commits)*
- [x] ~~`forms.md` — Horizontal Layout: string passed to `number` state setter~~ *(fixed in your commits)*

Chapter 5/7 (`docs/5-complex/`, `docs/7-extras/`):

- [x] ~~`examples.md` — first example's extra closing paren~~ *(fixed in your commits)*
- [x] ~~`examples.md` — filter callback annotated `: Movie` instead of `: boolean`~~ *(fixed in your commits)*
- [x] ~~`examples.md` — `setReleased(event.target.value)` string into number setter~~ *(fixed in your commits: now `parseInt(...) || 0`)*
- [x] ~~`wrapping.md` — "a CORRECT version" snippet missing function return type~~ *(fixed in your commits)*

Chapter 1 / index:

- [x] ~~`index.md:27` — ToC link to nonexistent page~~ *(your commit changed the filename but kept the wrong directory `5-examples/`; completed in the P3 pass → `5-complex/examples.md`)*
- [x] ~~`environment.md` — wrong GitHub Actions workflow name~~ *(fixed in your commits: "Deploy main branch as website")*

## P1 — Extremely misleading

- [x] ~~`state.md` — TwoDice spec self-contradictory vs. autograder~~ *(fixed in your commits: now "both 1 (snake eyes)" → Lose, "equal (and not 1)" → Win, matching the tests)*
- [ ] **`task-state` branch is stale — merge conflicts the book doesn't fully cover.** *(PARTIALLY addressed: state.md now tells students to delete a resurrected `.eslintrc.json` and keep `.eslintrc.js` — the key mitigation. Still missing: a one-line conflict warning in components.md's task section, since the `.eslintrc.json` conflict can recur on the `task-components` merge. The underlying cause is cross-repo — see Cross-repo decisions.)*
- [x] ~~`components.md:666-670` — wrong mental model of child re-rendering; "remount" used to mean its opposite~~ *(FIXED: the three paragraphs now explain the real mechanism — children re-render with the parent and React diffs by component type to update in place; nested components declare new functions each render, so React sees a different type, unmounts the old subtree, and remounts fresh, destroying its DOM and any State — and the "TypeScript" reference-equality claim now correctly says JavaScript.)*
- [ ] **`objects.md:45-49` — "Fields are case-sensitive; this logs `undefined`" (`drBart.Title`, `emptyObject.name`).** *(STILL OPEN)* True only in plain JS — TypeScript rejects both at compile time (TS2551/TS2339), which is TS's core value proposition. The embedded editor masks this. Fix: comment the lines out and say "JavaScript would log `undefined`; TypeScript catches this as a compile error."
- [ ] **`complex.md:380` — `<div>// Existing component instantiations go here ...</div>` renders the `//` text literally.** *(STILL OPEN — the equivalent bug in state.md was fixed in your commits.)* Fix: `{/* ... */}` or prose outside the JSX.
- [x] ~~`examples.md` — Heart Name capstone missing `type Inboxes`~~ *(fixed in your commits)*
- [x] ~~`arrays.md` — reduce signature spec `initialValue: X` should be `Y`~~ *(fixed in your commits)*
- [x] ~~`primitives.md` — Prettier quote-direction claim backwards~~ *(fixed in your commits)*
- [ ] **`environment.md` (clone/push flow) — no GitHub authentication guidance.** *(OPEN — deferred by author decision)* Password auth over HTTPS died in 2021; students without Git Credential Manager (mostly macOS/Linux) hit "Authentication failed" at first push with no help. Add one short paragraph: browser sign-in popup (GCM) → do that; otherwise `gh auth login`, a PAT, or SSH keys, with a link to GitHub's docs.
- [x] ~~`objects.md` — jest filter example names nonexistent `makeQuiz`~~ *(fixed in your commits)*

## P2 — Painfully out of date

- [x] ~~Dead react-bootstrap doc links (5 URLs, 3 files)~~ *(all fixed in your commits — now under `/docs/`)*
- [x] ~~`environment.md` — "install Node LTS" ambiguity~~ *(fixed in your commits: names Node 22, verifies with `node --version` and `npm --version`)*
- [x] ~~`environment.md` — pre-2022 GitHub Pages "scroll down" instruction~~ *(fixed in your commits: left sidebar under "Code and automation")*
- [x] ~~`state.md` — bare `element.click()` vs. the course tests' `act` wrapper~~ *(fixed in your commits: now `await act(async () => addButton.click())`)*
- [x] ~~`forms.md` — Textbox walkthrough referencing a nonexistent second hook~~ *(fixed in your commits)*
- [x] ~~`forms.md` — `MultipleChoiceQuestions` plural vs. repo's singular~~ *(fixed in your commits)*
- [ ] **`state.md:476` — `someText.match(/(\d\d?)/)[0]` fails the course's strict tsconfig** (TS2531, match can return null). *(OPEN — deferred by author decision)* Fix: `?.[0]`.
- [x] ~~`objects.md` — duplicate `function checkIfCorgi` implementations~~ *(fixed in your commits: second renamed `checkIfCorgiAlternative`)*
- [x] ~~`concepts.md` — Knockout as popular framework; hooks as "new fancy hotness"~~ *(fixed in your commits: hooks "now the standard", Knockout dropped)*
- [x] ~~`branching.md` — `src/text.Test.tsx` wrong casing~~ *(fixed in your commits)*
- [x] ~~`nested.md` — "re-release all the movies to be this year" with 2022~~ *(fixed in your commits)*
- [x] ~~`reactjs.org` links redirecting to legacy docs~~ *(no `reactjs.org` links remain in docs/ after your commits)*

## P3 — Minor *(all fixed in the P3 cleanup pass except the screenshot)*

**Wrong cross-references / naming**
- [x] `components.md` — ShoveBox path → `src/bad-components/ShoveBox.tsx`
- [x] `complex.md` — MovieView link now points to `MovieView.tsx`
- [x] `complex.md` — "`useReduce`" → `useReducer`
- [x] `objects.md` — back-link text now "Return to Arrays"
- [x] `branching.md` — "Return to Environment Setup" now links to `environment.md`
- [x] `components.md` — "That `name` variable" → `color`
- [x] `components.md` — onClick text now `updateChosen("Blue")`
- [x] `components.md` — "`Reveal` component" → `RevealButtons`
- [x] `state.md` — StartAttempt "initial number of attempts" softened ("the tests accept any value between 1 and 9")
- [x] `forms.md` — `nav_order` 4.2 → 4.3 (sidebar order now unambiguous)

**Small factual/pedagogical slips**
- [x] `branching.md` — `-b` explanation corrected ("creates a new branch and switches to it")
- [x] `objects.md` — interface distinction: "no method implementations (can declare signatures)"
- [x] `objects.md` — now logs `olderAda.age` (demonstration works)
- [x] `objects.md` — `capitol` → `capital` (all 6 occurrences)
- [x] `nested.md` — MovieDetails map now copies `seen: movie.seen`
- [x] `primitives.md` — const-first variable guidance
- [x] `primitives.md` — comparison operators no longer labeled "logical" (heading now "Comparison and Logical Operators")
- [x] `arrays.md` — "(aka at index 2)" parenthetical corrected
- [x] `arrays.md` — sort compare function no longer called "the second argument"
- [x] `arrays.md` — stub-function block now carries an "illustration only, won't compile" comment
- [x] `components.md` — hook bail-out described via `Object.is`; "renrender"/"hooks's" fixed
- [x] `components.md` — `addPerson` now uses its parameter
- [x] `components.md` — `type="textbox"` → `type="text"`
- [x] `components.md` — duplicate-key console warning now explained in the broken-keys example
- [x] `state.md` — Jest `expect` vs jest-dom matchers attribution corrected
- [x] `state.md` — `toBe` described via `Object.is` (primitives by value)
- [x] `forms.md` — `disabled={!canEdit}` (logic un-inverted)
- [x] `forms.md` — `Form.Input` → `Form.Control`
- [x] `forms.md` — "any number of them" (multi-checkbox)
- [x] `forms.md` — `toBeChecked` "checkbox or radio"
- [x] `saving.md` — list keys now use the index (no duplicate random keys)
- [x] `saving.md` — `filename` → `file` (it's a `File` object)
- [x] `records.md` — "index using strings" (not "any type")
- [x] `concepts.md` — "only *scripting* language" (WebAssembly exists)
- [x] Missing `key` props added: `examples.md` first example + both inbox Apps; all five `map`s in `records.md`
- [x] `environment.md` — "Deployments" sidebar label
- [x] `environment.md` — Chrome Web Store URL updated to `chromewebstore.google.com`
- [x] `environment.md` — ordered list renumbered 1-4
- [ ] `docs/images/change-base-repo-pr-alt.png` — screenshot still shows old upstream `UD-CISC275-S22/tasks`; flow is correct, needs a re-shoot when convenient *(cannot be fixed by text edit)*

**Typos** — [x] all fixed ("termainal" ×2, "since that it does", "renrender", "newcomers thing", "also kind", `useState`.And spacing, yellow→red comment, than→then, unbalanced backtick, "The The"/"saved"→"loaded", signficant/Commiting/availabel/heirarchy/critiera/"to he"/vaccuum, Arietty→Arrietty everywhere, Monoke→Mononoke, Naussica→Nausicaä)

---

## Cross-repo decisions *(both still open)*

1. **Refresh the stale `task-state` branch.** The branch missed the 2024 refresh that all other task branches got (via `update-branches`), and it's the direct cause of the `.eslintrc.json` conflicts in both the state and components merges. state.md now carries the textbook mitigation; refreshing the branch would make it unnecessary and would also fix the components-merge recurrence.
2. **Autograder coverage threshold is dead config** (informational — no student harm). `grading.config` declares `CONFIG_COVERAGE_THRESHOLD_LINES=80`, but `tools/jest_to_gradescope.py` (lines 82–88, marked TODO) hardcodes 50% for the 5-point coverage item and ignores the config. Passing the instructor tests clears 50%, so students are fine — but if you believe the 80% gate is live, it isn't. Fix only if 80% was intended.
3. *(Optional)* **Pin Node via `engines`** in the tasks `package.json` to match the Node 22 the book now names. Purely defensive.
4. *(Alternative, higher effort)* **Rebuild `task-nested` on top of `task-objects`** to eliminate the always-conflicting merge (the open P0). The textbook-only fix (conflict instructions) is much cheaper and pedagogically defensible — students must learn conflict resolution anyway — but the current situation, where the *naive* resolution destroys graded work with no warning, is not tenable.

## Verified aligned — no action needed

To save you re-checking: these were explicitly verified and are fine.

- **Task branch names, order, and grading:** every branch the book names exists; book task order exactly matches autograder numbering (`01-main` … `10-forms`); each autograder suite matches its branch's tests file-for-file; the Quizzer correctly has no autograder (rubric + **Canvas** submission in complex.md is consistent, not an error).
- **Task specs vs. tests:** editing.md's 7 HTML/CSS milestones, the components task ("four broken components", DoubleHalf commented out in App.tsx), all five form-component specs (CheckAnswer, GiveAttempts, EditMode, ChangeColor, MultipleChoiceQuestion), and RevealAnswer/ChangeType/CycleHoliday all match the actual test files. (TwoDice was the only mismatch — now fixed.)
- **Git flows:** the merges for html-css, functions, arrays, objects, forms, and quizzer are clean as written; `task-state → task-components → task-forms` are genuinely chained, matching the book's "checkout previous solved branch" instructions. Only nested (open P0) and state/components (partially mitigated P1) conflict.
- **Code that checks out:** all 9 TSX snippets in editing.md, the react-bootstrap `onChange` typings throughout forms.md, the records.md traversals, the saving.md localStorage/upload snippets, and wrapping.md's "wrong idea" example (which misbehaves exactly as claimed — correct pedagogy) all compile clean against the real course toolchain.
- **Links/CDN:** the embedded-editor CDN assets (React 17 UMD, TS 4.9.5, Ace) all load; movie-records links and site live; MDN/getbootstrap/typescriptlang/learngitbranching/create-react-app.dev links live. (The runner pinning React 17 while tasks use 18 is harmless today since the runner doesn't type-check, but keep it in mind if you ever upgrade the widgets.)

## Remaining work, in suggested order

1. **objects.md:45-49** — reframe the "logs undefined" lines as JS-vs-TS difference.
2. **complex.md:380** — change the `//` JSX comment to `{/* ... */}`.
3. **components.md task section** — one-line merge-conflict warning (the `.eslintrc.json` conflict can recur on the `task-components` merge).
4. **Cross-repo decisions** (task-state refresh; coverage config) — these may want lead time before the semester.
5. **Screenshot re-shoot** (`change-base-repo-pr-alt.png`) when convenient.
6. *Deferred by choice:* environment.md GitHub auth paragraph; state.md:476 `?.[0]`.
