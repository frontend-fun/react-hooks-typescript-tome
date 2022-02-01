---
layout: default
title: Basic HTML and CSS
nav_order: 2.2
parent: Basic Application
---

# Basic HTML and CSS

[&laquo; Return to All the Concepts](concepts.md)

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

# Editing CSS

There are two ways to change the style of a elements. You can use the `style` attribute or edit the rules in the `App.css` file. Let's run through some quick examples.

## Add Border and Padding

```tsx
export function App(): JSX.Element {
    return <div style={{border: '1px solid blue', padding: '4px'}}>
        this will be surrounded by a border and padding.
    </div>
}
```

## Make Text Red

Create a `span` (as in "text that spans some region of space"), and then give it a `color` field in its tag.

```tsx
export function App(): JSX.Element {
    return <div>
        This is <span style={{color: 'red'}}>colored text</span>.
    </div>
}
```

## CSS Rules

Open the `src/App.css` file and look for the `.App-header` rule. Any element that has a `className` that includes `App-header` will have all of these style rules applied. You can change the `background-color` there from a hexadecimal color (e.g., `#282c34`) to something else.

There are tons of HTML color strings out there. Or you can learn how to specify colors in hexadecimal. Go wild.

# Bootstrap

We're going to use the Bootstrap library quite a lot. This is a really convenient library.

## Making a Button

Let's make a simple Bootstrap Button.

```tsx
export function App(): JSX.Element {
    return <div>
        <Button>Click Me</Button>
    </div>
}
```

You will need to add an import statement at the top of your file (something like `import {Button} from 'react-bootstrap';`). This should be easy to do in Visual Studio Code: hover over the red squiggles under the word `<Button`, click `Quick Fix`, and then choose the appropriate import.

The button does not do anything, which is sad. We'll give you some code so that something happens when you click the button.

```tsx
export function App(): JSX.Element {
    return <div>
        <Button onClick={ () => console.log("I am logged") }>Click Me</Button>
    </div>;
}
```

Now clicking the button will log `"I am logged"` to the console. Yay!

## Two Column Layout

Organize the page into at least two columns of layout.

```tsx
export function App(): JSX.Element {
    return <div>
        <Container>
            <Row>
                <Col>First column.</Col>
                <Col>
                    Second column.
                    You can put whatever you want in here, and it will be on the right side.
                    Maybe try adding an image?
                </Col>
            </Row>
        </Container>
    </div>;
}
```

# 📝 Task - HTML and CSS

Our next task is to edit the HTML and CSS of our application. We have prepared a bunch of new tests to help structure you.

```sh
$> git pull upstream
$> git checkout -b solved-html-css
$> git merge upstream/task-html-css
```

Run:

```sh
$> npm run test
```

Since we are now failing these tests, we need to fix them. Refer to the information in the page above to tackle each test in turn:

* Add a header
* Add an image with alt text
* Add a list with at least three elements
* Change the background color of the header area
* Add a bootstrap button
* Make the button log 'Hello World!` when clicked

THERE ARE TWO TASKS NOT REPRESENTED IN THE TESTS.

1. Have a two-column layout on the page somwhere
2. Put a red rectangle in each column using a `div` tag with `width`, `height`, and `backgroundColor` styles.

To earn full points, you must pass all the tests and also complete these two additional tasks.

Once you're done, we'll start learning more about [TypeScript &raquo;](../3-control/index.md)