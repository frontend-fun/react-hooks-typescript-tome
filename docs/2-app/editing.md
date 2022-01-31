---
layout: default
title: Basic HTML and CSS
nav_order: 2.2
parent: Basic Application
---

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

# Introduction

Okay, so let's actually mess with our web application.

We're always going to start with our base Component, which is named `App`. The examples you see here are all meant to model what you will do in your actual `App.tsx` file's `App` component. We'll learn way more about Components in a later chapter. For now, just focus on the HTML and CSS we're putting into our page.

# Editing HTML

Make some tweaks to the HTML content of the page. View the changes in the browser.

## HTML Tags

In general, all HTML tags are written with angle brackets (`<h1>`). You gotta have a start tag and an end tag (`<h1>` and `</h1>`) surrounding the content. Tags can be nested inside of other tags.

## Headers

Let's start with a basic tag, the first-level header `h1`.

```tsx
export function App(): JSX.Element {
    return <h1>This is header text</h1>;
}
```

There's also `h2`, `h3`, and so on.

## Text (Paragraph)

```tsx
export function App(): JSX.Element {
    return <p>This is just a paragraph of text. It can go onto multiple lines, if you want.</p>;
}
```

## Div

What if we want both header and text? We need to group them together under one parent. That parent shouldn't be visible. This is the purpose of the `div` (short for "division", as in "to group together") tag.

```tsx
export function App(): JSX.Element {
    return <div>
        <h1>Hello World</h1>
        <p>How are you doing today?</p>
    </div>;
}
```

## Fragments

A weird thing we can do in JSX is to have tagless chunks of code using empty angle brackets.

```tsx
export function App(): JSX.Element {
    // Won't need to use this very much
    return <>
        <h1>Hello World</h1>
        <p>How are you doing today?</p>
    </>;
}
```

We won't do this too often, but I wanted to show it off. It's useful when you REALLY don't want to have to have a `div`.

## List

There are two kinds of lists, unordered (`ul`) with bullets and ordered (`ol`) with numbers. They each have list items (`li`).

```tsx
export function App(): JSX.Element {
    return <div>
        Unordered List:
        <ul>
            <li>First thing</li>
            <li>Another thing</li>
            <li>A third item</li>
        </ul>
        Ordered List:
        <ol>
            <li>First thing</li>
            <li>Another thing</li>
            <li>A third item</li>
        </ol>
    </div>;
}
```

## Images

Embedding an image (`img`) tag requires us to specify an *attribute*. These are `name="value"` pairs inside of the start tag.

The two attributes relevant for an `img` tag are the `src` (the URL of the source image to display) and the `alt` (alternative text to display if the image fails to load for some reason).

```tsx
export function App(): JSX.Element {
    return <div>
        <h1>Hello World</h1>
        <img src="../assets/images/pet-ada.jpg" alt="A picture of my dog Ada" />
    </div>;
}
```

If you look closely, this tag doesn't have an end tag (there's no `</img>`). Instead, it's just a "self-closing" tag (`<img/>`).

## Passing Tests

Run:

```sh
$> npm run test
```

If you are failing the first N tests, then we need to fix them.

## Editing CSS

1. Make some text bigger
2. Change the background color
3. Put an icon in the page
4. Float the image, put padding and border around the image

## Making a Button

1. Make a Bootstrap Button
2. Console log a message when you press the button
3. Testing a button (provide an example test, then have them make their own too)

* JS API stuff: Time/date, random, maybe fetch, vibrate, barcode detection, camera, geolocation, sensor API, speech, web cryptography.

