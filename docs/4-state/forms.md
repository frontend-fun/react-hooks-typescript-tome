---
layout: default
title: Forms
nav_order: 4.2
parent: Using State
---

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>


# Forms for Editing State

* Form with K states
  * User input pattern, with link to big collection of other input types
    * Textbox
      * Simple string
      * Have to parse as number
    * Checkbox
    * Textarea
    * Select menu
  * How to test each input form type
    * Simulating user event
    * Finding things by their role
    * Finding some text
    * Dangerous fallback: test-id

# Forms in General

You can see a lot more information about Bootstrap and its Forms here: <https://react-bootstrap.github.io/forms/overview/>

## Label


## Events (onChange)

# Specific Components

## Textbox


```tsx
export function App(): JSX.Element {
    const [name, setName] = useState<string>("Your name here.");

    return <>
}
```

## Checkbox

## Textarea

## Select Menu