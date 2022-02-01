---
layout: default
title: TypeScript
nav_order: 3
has_children: true
---

# Chapter 3 - TypeScript

[&laquo; Return to the Table of Contents](../index.md)

JavaScript is madness! The type system is very inconsistent and surprising. It's super easy to make mistakes that will take forever to debug, because JavaScript rarely throws errors - it will sooner just make values up then admit defeat. And you never really know what type of value you are working with when you stare at the code...

That's why we're going to be using TypeScript instead. TypeScript adds static types to JavaScript. That means when you declare a variable, you say what type of value it holds. The variable cannot hold other kinds of values. Similarly, when you define a function, you say what type of values it takes as parameters and what type of value it returns.

Otherwise, you will probably find TypeScript very similar to what you have done in languages like Python and Java. Still, there's a lot of weird stuff here too. In this chapter, we run through a ton of examples very quickly. You can probably skim the first section, but pay CLOSE attention to the rest of the sections! Stuff gets very complicated since we're working with IMMUTABLE data. Even if you have used JavaScript before, you might find our approach different.