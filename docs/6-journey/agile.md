---
layout: default
title: Agile Sprints
nav_order: 6.2
parent: Your Own Application
---

# Agile Sprints

[&laquo; Return to the Chapter Index](index.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

# Learning Objectives

By the end of this section, you will be able to:

- Explain the purpose of a sprint in agile development.
- Identify the key events in a sprint cycle.
- Use a project board to manage tasks as GitHub issues.

# The Problem Agile Answers

The old legacy way to organize a software project is called **Waterfall**: gather the requirements, design the whole system, build it, test it, and finally ship it. That approach can work when the requirements are stable and well understood. Software projects, however, often begin with uncertainty. Requirements change, users react differently than expected, and technical problems appear only after implementation begins.

**Agile** is a family of practices built around a shorter feedback loop: plan a little, build a working slice, show it to people, learn, and repeat. You will make incorrect assumptions either way; agile helps the team discover them early, while they are still relatively inexpensive to change. The [Agile Manifesto](https://agilemanifesto.org/) is the short 2001 statement of values behind this approach, and it is worth the two minutes it takes to read.

Neither model is a religion, although some people treat Agile that way. Agile done as empty ritual is common enough to be called [cargo-cult](https://en.wikipedia.org/wiki/Cargo_cult_programming) agile. The practices below matter because they help a team communicate, finish working software, and learn from evidence. Merely holding meetings does not make a project agile.

# Sprints

A **sprint** is a fixed window of time, usually one to four weeks, in which a team selects a small amount of work and tries to finish it to an agreed standard. The sprint length stays fixed, so the team must choose a realistic scope. At the end, the team should have a working **increment**: an improved version of the product that could be demonstrated or released.

Several terms help describe how work moves through a sprint:

- The **product backlog** contains work the product may need in the future, ordered by priority.
- The **sprint backlog** contains the work selected for the current sprint.
- **Acceptance criteria** describe observable conditions that a particular item must satisfy.
- The **Definition of Done** is the team's shared quality standard for all completed work. It might require passing tests, review by a teammate, and integration into the main branch.

The sprint cycle has four key events: **sprint planning**, **daily standups**, a **sprint review**, and a **sprint retrospective**. You will use this cycle with your team during the final project.

# Managing Work on a Project Board

For your final project, your team will represent backlog items and tasks as GitHub issues. An issue should describe one clear piece of work and include enough acceptance criteria for the team to tell when it is complete.

A GitHub project board makes the state of those issues visible. A simple board might use these columns:

- **Backlog** for work that has not been scheduled.
- **Ready** for work selected for the current sprint.
- **In Progress** for work someone is actively implementing.
- **In Review** for work waiting on review or integration.
- **Done** for work that satisfies its acceptance criteria and the Definition of Done.

The board is a shared model of the project, not a substitute for communication. Keep issues small enough to finish, assign an owner when work begins, link the relevant pull request, and update the board as the work changes. If an issue is too large to finish during one sprint, split it into smaller outcomes before starting it.

# The Sprint Cycle

## Sprint Planning

**Sprint Planning** takes place at the beginning of the sprint. The team agrees on a useful goal, selects backlog items that support it, and decides how to approach the work. Planning should answer three questions:

1. Why is this sprint valuable?
2. What can the team realistically finish during it?
3. How will the selected work get done?

Move the selected issues into the sprint backlog, confirm their acceptance criteria, and identify dependencies between them. Planning is not a promise that nothing will go wrong. It is the team's best forecast based on what they know now.

### Estimating Work

Nobody is perfectly accurate at estimating software work. Teams improve by comparing estimates with what actually happened and discussing surprises without blaming anyone.

One common estimation method uses **story points**, abstract units that compare the effort, complexity, and risk of backlog items. Story points are relative estimates, not a disguised number of hours. Teams often use a sequence such as 1, 2, 3, 5, 8, and 13 because uncertainty grows with the size of the work.

Teams sometimes estimate with **planning poker**:

1. The team discusses a backlog item and its acceptance criteria.
2. Each person privately chooses an estimate.
3. Everyone reveals their estimate at the same time.
4. People with different estimates explain what complexity or risk they noticed.
5. The team discusses the item and estimates again until it reaches a useful consensus.

The point is not the cards. Independent estimates expose assumptions that the team needs to discuss. A very large estimate is usually a signal to clarify or split the item.

## Daily Standup

A **daily standup** is a brief team synchronization during the sprint. Each person shares what has changed since the last standup, what they plan to do next, and anything blocking progress. The exact prompts matter less than the outcome: the team should leave knowing whether the sprint plan needs attention.

A standup is not a status report to a boss. Keep it short, surface blockers early, and move detailed problem-solving into a follow-up conversation with only the people who need to participate.

## Sprint Review

A **Sprint Review** happens near the end of the sprint. The team demonstrates the working increment to clients or other stakeholders and collects their reactions. The goal is to inspect the actual product, not to present a slide deck about work that is almost finished.

Sometimes it is useful to show an incomplete experiment or mockup to answer a specific question. Be explicit about its status. Misrepresenting unfinished work as complete creates bad decisions and worse expectations.

Reviews have two major benefits:

- **They force integration honesty.** A demonstration quickly surfaces features that work on one person's machine but not in the shared product.
- **They reveal course corrections early.** Stakeholders can react while a feature is days old instead of after months of work have accumulated around it.

Record the feedback that emerges during the review. It may change the product backlog, but it does not automatically become part of the sprint that is ending.

## Sprint Retrospective

A **Sprint Retrospective**, often shortened to **Retro**, is a meeting for the team to inspect how it worked and decide how to improve during the next sprint. The review examines the product; the retrospective examines the team's process.

### Start, Stop, Continue

One simple retrospective format asks each team member what the team should:

1. **Start** doing to improve its work.
2. **Stop** doing because it causes problems or provides little value.
3. **Continue** doing because it helped.

The names are not important. The team needs a structure that gives everyone a chance to contribute and produces at least one concrete improvement to try.

### Psychological Safety

**Psychological safety** is the belief that people will not be punished or humiliated for speaking up with ideas, questions, concerns, or mistakes. Without it, a retrospective cannot reveal the problems it is meant to address.

Focus on evidence and systems instead of blaming individuals. For example, "our pull requests waited two days for review" gives the team a process to improve. "My teammates are unreliable" does not identify an actionable change.

### Structured Retrospective Recipe

When your team is new to retrospectives, the following structure can help:

1. **Overview:** Recall what happened during the sprint, including successes, delays, and surprises.
2. **Reflection:** Have each person suggest something to start, stop, and continue.
3. **Focus:** Choose the highest-value improvement that the team can realistically try next sprint.
4. **Evidence:** Identify observations from the sprint that support making this change.
5. **Options:** Discuss the benefits, costs, and possible alternatives.
6. **Decision:** Define a specific action, an owner, and how the team will know whether it helped.

Retrospectives can provide strong examples when an interviewer asks how you improve your own process or collaborate through a difficult project. Be prepared to explain the evidence, the action your team chose, and what changed afterward.

# Using Sprints in Your Final Project

During the final project, each sprint repeats the same feedback loop:

1. Refine and prioritize the product backlog.
2. Plan a realistic sprint around a clear goal.
3. Build, review, test, and integrate small pieces of working software.
4. Use standups and the project board to coordinate throughout the sprint.
5. Demonstrate the increment and collect stakeholder feedback.
6. Retrospect on the team's process and choose an improvement for next time.

A sprint is successful when it produces useful evidence and a working increment, not when every original prediction turns out to be correct. Keep the time window fixed, protect the Definition of Done, and use what the team learns to make a better plan for the next sprint.
