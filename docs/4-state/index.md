# Using State

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
