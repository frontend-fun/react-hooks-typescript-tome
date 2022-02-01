---
layout: default
title: All the Concepts
nav_order: 2.1
parent: Basic Application
---

# All the Concepts

[&laquo; Return to the Chapter Index](index.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

# Introduction

This section is just gonna toss so many words and concepts at you. You're gonna be a little overwhelmed.

DO NOT PANIC.

Skim this and try to get a sense of everything. Most of it makes more sense in context. You can come back later and read it again to get a better understanding.

# What is an application?

You have made and used applications before. Any software, especially one with a User Interface, is an application. Browsers are applications, program editors are applications, Microsoft PowerPoint is an application... There are so many applications out there. They all are just programs that manipulate data on your computer.

Usually, when we talk about applications, we are thinking about software that is meant to be used by a human. Therefore, we want it to be human-friendly.

# What is a website?

You are in a website right now. This is a document (a "page") served over the internet and rendered in a browser. They can have interactive components, and usually link to other pages and websites.

# What is a web application?

There's technically no strict requirements to be a "web application". But essentially this is a website that is trying to act as an application, as opposed to a static document. If you can click buttons and complete tasks in the website, then it is probably a web application.

Our goal is to make web applications.

# What is HTML?

HTML stands for HyperText Markup Language. Basically this is the content and text of a website, similar to the idea of a Document in something like Word.

The HTML of the page is accessible as the "Document Object Model". The idea is that the entire page is a collection of "HTML Elements". Example elements are headers, paragraphs of text, images, links, buttons, and so much more. Each HTML Element can have attributes. Attributes vary by the type of element: links have URLS they redirect the user to, images have alternative text they render when the image fails to load, etc.

Elements can also have children elements, making the collection of elements into a Tree structure. Recall that a Tree data structure is an object that contains children of the same type. Some HTML Elements are explicitly designed to contain other HTML Elements (`div` for a logical divison of content, `body` for all the visible elements, `head` for loading scripts and metadata). The whole thing ends up very complicated to navigate.

You can see the HTML of a page by bringing up the Developer Console. In Chrome, you can right-click anywhere on the page and click "Inspect". You can also use `Option + ⌘ + J` (on macOS), or `Shift + CTRL + J` (on Windows/Linux). The console will either open up within your existing Chrome window, or in a new window. You may have to select the Elements tab.

HTML is a Markup language, not a normal programming language like Java or Python. Writing HTML is a lot more like writing a document in Word than writing a normal program.

# What is CSS?

CSS stands for Cascading Style Sheets. Basically it adds the formatting and color and style to a page by establishing rules. These rules affect page elements (e.g., "make all text bold and size 15 font", or "make any `div` with this name have this width and height"). There are tons of rules you can set and many ways to reference page elements. There's no way we can explain all of them. No one knows all of them, in fact, you just learn the big ones and google for the rest (true for HTML too). We will refer to the rules for an element as its `style`. You can see the `style` for an element in the Elements panel of the Developer Console.

A big idea in CSS is reusing styles with "Classes". This is kind of similar to classes in Object-Oriented Programming, in the sense that they let us avoid redundant code. But the similarities end there. In a `.css` file, you will see many rules defined around classes that can then be referenced in code to apply the same rules in multiple places.

# What is Bootstrap?

Making user interfaces is hard, and most people don't want to write a hundred complicated rules for each web application they are making. Fortunately, folks with decent taste in design have put together collections of rules that can be added to a page quickly and easily. We will be using a collection named "Bootstrap".

You have used tons of websites that use Bootstrap. It is very popular and looks okay without much customization.

TODO: Put an image of a Bootstrap website here

# What is JavaScript?

For better or worse, JavaScript is the programming language of the web. The original version of the language was originally written in like a week largely as just a toy experiment. Then it got really popular and everyone was like, "Oh no this language is actually really weird and annoying." So they spent most of the 2000s trying to fix it into something better. Nowadays, JavaScript is not a terrible language. Its name still has nothing to do with Java, though, that was just marketing to cash in on the popularity of Java.

You might think of JavaScript as combining aspects of Java and Python, although that is not its history and not entirely accurate. JavaScript is a dynamic language like Python and has many control structures like Java (index-based `for` loops, `while` loops, and `if`). It is Object-Oriented like both languages. However, its objects follow something called "Prototype-based Inheritance", which we don't have time to talk about. In fact, really JavaScript is multi-paradigm, just like modern Java and Python. The separation of programming languages is really an illusion, and we shouldn't worry too much about that.

Anyway, JavaScript is the only language that runs directly in modern web-browsers. This means that if you want to make websites with dynamic behavior (like making a popup when you click a button) then you need to write JavaScript. JavaScript is able to manipulate the Document Object Model via a special variable named `document`. You won't mess with the `document` directly very much, instead relying on React to do the messing around on your behalf. And in fact we won't even actually write real JavaScript.

# What is TypeScript?

We aren't going to be writing JavaScript, at least not really. That's because JavaScript is kind of a mess when it comes to data, and applications are too complicated to live in a world with messes. JavaScript's whole execution model is based on the idea of, "If anything goes wrong, let's pretend that it doesn't." This is fine when you are just trying to put a document on a screen. This is not fine when you are dealing with people's money, or health data, or grades. Therefore we are actually using **TypeScript**.

TypeScript is a modified version of JavaScript that adds in strict **static** typing. TypeScript compiles into JavaScript by removing all the extra static type information. The language is almost identical in terms of control strucures (`for` loops, `while` loops, `if` statements, etc.) and operators (`+`, `===`, `?`, etc.). The only real difference is that you have to specify the type of your variables, functions, and attributes. This will feel a lot like Java, or modern Python with optional static typing.

The big advantage here is that when you make a mistake using your data (e.g., accessing a field that does not exist, expecting a different type of value to be returned from a function, passing in the wrong argument to a function), you will get error messages. This is much better than what JavaScript would do: act like nothing is wrong but subtley act incorrectly, eventually causing data loss or bad user experiences. You may hate error messages, but you know what you hate even more? Getting fired because your website had a secret bug that ate your biggest customer's latest order. Embrace the error message, love the error messages.

# What is React?

You could make a web application with just HTML, CSS, and JavaScript. I mean, technically, that's all that will be executing in the browser. But that is really cumbersome because most of these tools weren't even designed to provide dynamic user experiences. Therefore, many generations of programmers have built libraries and frameworks that make it easier to build web applications. You may have heard of some popular ones like **Angular** or **Vue** or **Knockout** or **JQuery**. 

One of the most popular libraries/frameworks is **React**. The core idea of the library is to build reusable "Components" that isolate HTML, CSS, and JavaScript into little chunks. Thanks to React, you can keep the *state* of your application and its associated logic in neat little bundles that make it easier to build complicated websites.

Another key idea of React is the idea of "reacting" to state changes. When someone edits some text or presses a button, the state of the page changes. When the state changes, React will look at the components that need to change and re-render them on the screen. We'll learn WAY more about this as we go on. For now, just know that React is very good at knowing when things change and updating your screen, as long as you play by its rules.

# What are React Hooks?

React used to have developers build components using a Class-based syntax ("Class-based Components") where state was managed using object fields. In the late 2010s, this was replaced with Function-based Components using a new approach involving Hooks. We're going to spend like two chapters explaining how this works, so we'll put the details aside for now. The important thing to know is that React Hooks are the new fancy hotness, and Class-based Components are the old nonsense and we won't deal with them.

# What is JSX/TSX?

A really cool feature of React is that you can write HTML directly in your JavaScript. This is actually a really big deal. Normally, you have to wrap any dynamically generated HTML in JavaScript strings, and it's a nightmare trying to read and use it. But thanks to React, you can write `JSX` (or since we're using TypeScript, `TSX`).

JSX and TSX are modified versions of JavaScript and TypeScript that allow you to embed HTML directly into the code. Files written in these modified languages have a different extension (`.jsx` instead of `.js`, and `.tsx` instead of `.ts`). If you try to run regular JSX/TSX in a browser, it won't work. Instead, we have to add a precompilation phase to our build process to convert the TSX into valid JavaScript.

# What is Node/NPM?

JavaScript has become so popular, people decided we needed to be able to write JavaScript without a browser. So folks developed `node` as a command-line JavaScript interpeter. That way, you can write JavaScript on your desktop the same way you write Python and Java. This is probably not a terrible thing, though opinions vary.

You will interact with `node` via its package manager, `npm`. The idea is that `npm` is responsible for installing libraries ("packages") and tracking their versions. You can also use `npm` to run command line JavaScript applications.

Now, all code that you write for the web application is eventually being run in the browser. So why is the command line involved? Because modern web applications are so complicated. All the code you write depends on many other complicated libraires, representing a massive "stack" of code isolated into packages. We build on the work of others. And in order to build those libraries together with your code, we have to "preprocess" your web application into a simpler form and deliver that "compiled" version to the browser. Plus there's also all the tooling for running unit tests, formatting your code, and much more.

Right now, creating a new blank React application with TypeScript support requires about 200Mb of libraries. This is insane, but welcome to the future. It is very convenient, albeit a bit bloated.

# Phew

Phew, that was a lot of text. Did anyone actually read that?

Well, either way, let's start editing some [Basic HTML and CSS &raquo;](../2-app/editing.md)