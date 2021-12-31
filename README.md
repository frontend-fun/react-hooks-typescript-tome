# React Hooks + TypeScript Tome
Online site walking you through React Hooks+TypeScript frontend web development. Encourages specific "assignments" along the way to keep you engaged.

# Table of Contents

* Setup:
  * Setting up VSCode, Node
  * Test application with all the good bits
* Basic app
  * Basics of HTML, CSS, BootStrap
  * Function calls: Basic app with some text. They can style and change the text. Call some JS functions and output the results. 
  * JS API stuff: Time/date, random, maybe fetch, vibrate, barcode detection, camera, geolocation, sensor API, speech, web cryptography.
  * Buttons
  * Testing simplistic interfaces
* Basics of TypeScript
  * Basic types
  * Arrays, Interfaces, Nested Data
  * Map/Filter/Reduce/Every/All, `for` loops
  * DO NOT USE `for` and `while` loops
  * If statements, ternary `?` expressions
  * Tests: Monster mash exercises, rendered results in react. Test cases prove that they succeeded. Demand they use map, filter, and reduce rather than for loops. Just a subset tho, some are examples and some are problems. Gives a nice chance to cover types, pure functions, loops, conditionals, and other basics.
* Basic State
  * Data/control/visual one-way MVC architecture
  * Basic of useState concept
    * set entire state
    * Testing user interaction
    * Boolean state: visible/not visible, disabled/not disabled, text1/text2
    * Number state: counter, calculator
    * String state: Anagramer, pig-latin, etc?, something with emojis?
  * Passing down props, lifting state up
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
  * Dependent state based on other state
* Complex State
  * list of primitive states
    * List of names of people, need to be able to add, remove, edit
    * List of numbers where you need to be reporting the sum at the end
  * Edit patterns
    * push, insert into array
    * edit element of array
    * pop, remove index, remove value
  * object state
    * Want to have a situation where they must know shallow vs deep equality
  * record state
    * change value of object
    * add key to record, remove key from record
  * list of object states
    * State gone wrong: Ultimately we escalate to multiple levels of nested state. We have some specific examples where that breaks down when done incorrectly.
  * list of list of object states
  * record of list of object states
* Making your own
  * User stories
  * Agile
  * Sketching out your app

# Notes
