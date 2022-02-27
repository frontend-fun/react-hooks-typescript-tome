---
layout: default
title: Forms
nav_order: 4.2
parent: Using State
---

# Forms

Coming soon
{: .label .label-yellow }

**Oops! This page is not yet ready. Please be patient while we finish it up.**

[&laquo; Return to Components](components.md)

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

# Testing Forms

First, let's look at the prefixes we can use:

No Match	1 Match	1+ Match	Await?
getBy	throw	return	throw	No
findBy	throw	return	throw	Yes
queryBy	null	return	throw	No
getAllBy	throw	array	array	No
findAllBy	throw	array	array	Yes
queryAllBy	[]	array	array	No

Next, let's look at the suffixes we can use:

* `ByLabelText` find by label or aria-label text content
* `ByPlaceholderText` find by input placeholder value
* `ByText` find by element text content
* `ByDisplayValue` find by form element current value
* `ByAltText` find by img alt attribute
* `ByTitle` find by title attribute or svg title tag
* `ByTestId` find by data-testid attribute
