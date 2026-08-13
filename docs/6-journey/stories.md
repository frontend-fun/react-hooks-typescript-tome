---
layout: default
title: User Stories
nav_order: 6.1
parent: Your Own Application
---

# User Stories

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

- Write a user story that identifies a user, a capability, and a reason.
- Turn a user story into specific, testable acceptance criteria.
- Represent a story as a GitHub issue that a team can plan and complete.

# Describing Work from the User's Perspective

Before your team builds its final project, it needs to decide what the application should let people accomplish. A **user story** is a short description of a need from the perspective of the person who has it. A common format is:

> As a _[kind of user]_, I need _[capability]_ so that _[reason]_.

For example, imagine a team building an application for organizing a movie night:

> As a guest, I need to vote for a movie so that the group can choose what to watch.

The story identifies who cares, what they need, and why it matters. It deliberately does not prescribe a component hierarchy, state representation, or visual design. Those implementation decisions belong to the development team.

## Choosing Useful Stories

A useful story describes one outcome that provides value to a user. It should be small enough for the team to complete during a sprint but meaningful enough to demonstrate when it is done.

Compare these examples:

- **Too broad:** As a user, I need a complete movie-night application so that I can plan events.
- **Implementation-focused:** As a developer, I need a `VoteButton` component so that the application uses React.
- **Useful:** As a guest, I need to vote for a movie so that the group can choose what to watch.

The first story contains many different features and needs to be split. The second describes an implementation detail instead of a user's need. The third gives the team a focused outcome while leaving room to choose an appropriate implementation.

# Acceptance Criteria

A story explains why a feature matters; **acceptance criteria** explain what must be true for that story to be complete. They are specific, observable statements that the team and its stakeholders can verify.

The movie-voting story might have these criteria:

- Each movie displays its current vote count.
- A guest can add one vote to a movie.
- The updated count appears immediately after the guest votes.
- A guest cannot vote more than once for the same movie.

Useful acceptance criteria are:

- **Testable.** The team can demonstrate the behavior or write a test that verifies it.
- **Specific.** Everyone can agree whether the criterion has been met.
- **Bounded.** The criteria make the story's scope clear by identifying what the team is and is not promising.

"Voting works well" is not useful acceptance criteria because different people can interpret it differently. Concrete criteria move those disagreements into planning, before the team spends time building the wrong behavior.

## Acceptance Criteria and the Definition of Done

Acceptance criteria are specific to one story. A team's **Definition of Done** is a shared quality standard that applies to every story. For example, the voting story's acceptance criteria describe its behavior, while the Definition of Done might also require passing tests, a reviewed pull request, and integration into the main branch.

A story is complete only when it satisfies both.

# From Stories to GitHub Issues

During the final project, create a GitHub issue for each user story. Give the issue a concise title, include the story and its acceptance criteria in the description, and add any notes the team needs to understand its scope.

Before implementation begins, the team should be able to answer these questions:

1. Who benefits from this work?
2. What outcome will the user be able to achieve?
3. How will the team verify that the story is complete?
4. Is the story small enough to finish during one sprint?

The next section, [Agile Sprints](agile.md), explains how your team will prioritize these issues on a project board and select them for a sprint.
