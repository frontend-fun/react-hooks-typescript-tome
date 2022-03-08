---
layout: default
title: Nested Data
nav_order: 3.4
parent: TypeScript
---

# Nested Data

[&laquo; Return to Objects](objects.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

So far, we have talked about arrays and we have talked about objects. These complicated data structures allow us to represent more interesting values. Now let's combine them and increase our power EVEN FURTHER.

Everything you need to know about working with nested data, you already learned when you worked with Objects and Arrays. It's the exact same rules and methods, just now they work inside of each other.

In this section, we're going to provide a whole bunch of examples with comments embedded. The ongoing example is a bunch of movies in a collection.

```typescript
interface Movie {
  name: string
  released: number
  seen: boolean
}

// Make an array of objects
const ghibliMovies: Movie[] = [
  {name: "Kiki's Delivery Service", released: 1989, seen: true},
  {name: "Ponyo", released: 2008, seen: false},
  {name: "Howl's Moving Castle", released: 2004, seen: true},
  {name: "Castle in the Sky", released: 1986, seen: true},
  {name: "Arietty", released: 2010, seen: false},
  {name: "Whisper of the Heart", released: 1995, seen: false}
];

// Filter all the movies we have not seen
// AKA only keep movies that not seen
const unseenMovies = ghibliMovies.filter(
    (movie: Movie): boolean => !movie.seen
);
console.log(ghibliMovies.length, "->", unseenMovies.length);

console.log("***************************************************");

// Make a new list of just the movie titles
const movieTitles = ghibliMovies.map(
    (movie: Movie): string => movie.name
);
console.log(movieTitles);

console.log("***************************************************");

// Add together the number of characters in the movie's titles
const totalCharacters = ghibliMovies.reduce(
    (currentSum: number, movie: Movie) => currentSum + movie.name.length
, 0);
console.log("Total Characters:", totalCharacters);

console.log("***************************************************");

// Create a CSV representation of the movies
// CSVs are just comma-separated values in a multi-line string
// If the single quotes and braces are confusing, look back at
// https://frontend-fun.github.io/react-hooks-typescript-tome/3-control/primitives.html#string-interpolation

const movieCSV = ghibliMovies.map(
    (movie: Movie): string =>
        // Convenient String Interpolation; could have just used + operator too
        `  ${movie.name},${movie.released},${movie.seen ? "Seen" : "Not Seen"}`
).join("\n");
console.log("Movie CSV:");
console.log(movieCSV);

console.log("***************************************************");

// Make a new list where we re-release all the movies to be this year
const rereleasedMovies = ghibliMovies.map(
    // The parentheses around the curly braces are CRITICAL!
    (movie: Movie): Movie => ({...movie, released: 2022})
);
console.log("Rereleased Year:", rereleasedMovies[0].released);

console.log("***************************************************");

// Relabel the old movies as "Ghibli Classic: WHATEVER"
const relabeledMovies = ghibliMovies.map(
    (movie: Movie): Movie => ({
        ...movie, 
        name: movie.released <= 2000 ?
            "Ghibli Classic: "+movie.name :
            movie.name 
    })
);
console.log(relabeledMovies[0].name, relabeledMovies[1].name);

console.log("***************************************************");

// Find an array's object with a specific field value:
// Find the release year of the movie "Castle in the Sky"
const castleInTheSky = ghibliMovies.find(
    (movie: Movie): boolean => movie.name === "Castle in the Sky"
);
console.log("Release year of Castle in the Sky:", castleInTheSky.released)

console.log("***************************************************");

// Find an array's object with a less specific field value:
// Find a movie in the list released after 2000
const post2000Movie = ghibliMovies.find(
    (movie: Movie): boolean => movie.released >= 2000
);
console.log("A movie released after 2000:", post2000Movie.name);

console.log("***************************************************");

// Find the oldest movie
const oldestMovie = ghibliMovies.reduce(
    (currentOldest: Movie, movie: Movie): Movie =>
        // Flip the < to be a > for the newest movie
        (movie.released < currentOldest.released ? movie : currentOldest)
);
console.log("Oldest movie:", oldestMovie.name, "in", oldestMovie.released);

console.log("***************************************************");

// Add a new movie to the end
const ghibliWithMonoke = [...ghibliMovies, {
    name: "Princess Mononoke",
    released: 1997,
    seen: true
}];
console.log("Last movie is:", ghibliWithMonoke.slice(-1)[0].name);

console.log("***************************************************");

// Insert an element after a specific existing element
// Add Naussica after Castle in the Sky
const myGhibliCollection = [...ghibliWithMonoke];
const castleIndex: number = myGhibliCollection.findIndex(
    (movie: Movie): boolean => movie === "Castle in the Sky"
);
myGhibliCollection.splice(1+castleIndex, 0, {
    name: "Nausicaä of the Valley of the Wind",
    released: 1984,
    seen: true
}];
console.log("Added:", myGhibliCollection[castleIndex+1].name);

console.log("***************************************************");

// Map to a new interface named `MovieDetails`
interface MovieDetails {
  title: string
  studio: string
  abbreviation: string
  released: number
  seen: boolean
}
const fullCollection: MovieDetails[] = myGhibliCollection.map(
    (movie: Movie): MovieDetails => ({
        title: movie.name,
        studio: "Studio Ghibli",
        abbreviation: movie.name.slice(0, 3),
        released: movie.released,
        seen: true
    })
);
console.log("First movie in full collection:", fullCollection[0].title);
```

# Shallow and Deep Copies

Most folks overestimate how much gets copied by default in modern programming languages. In a previous chapter, we discussed how you have to be explicit about copying an object (e.g., by unpacking the object with `...` into the object literal curly braces), or else you will simply end up with a *reference* instead of a second object.

```tsx
interface Movie {
  name: string
  released: number
  seen: boolean
}

// First instance
kiki = {name: "Kiki's Delivery Service", released: 1989, seen: true};

// No new object; `tonightsMovie` has the same reference as `kiki`
tonightsMovie = kiki;

// Now there's a new object!
kikiCopy = {...kiki};

// We mutably affect the original
kiki.seen = false;

// What do you expect that to do to the other "copies"?
console.log("Have I seen `kiki`?", kiki.seen);
console.log("Have I seen `tonightsMovie`?", tonightsMovie.seen);
console.log("Have I seen `kikiCopy`?", kikiCopy.seen);
```

However, the conversation becomes even more complicated when we copy nested data. When we say Nested Data, we mean situations where you have an array in an object, or an object in an array, or an object in an object, or an array in an array, or any other situation where you have a non-primitive data structure inside of a non-primitive data structure. You see, cloning the outer data structure does NOT clone the inner data structure! We refer to this behavior as a "Shallow Copy" of the original.

```tsx
interface Movie {
  name: string
  released: number
  seen: boolean
}

// Make an array of objects
const ghibliMovies: Movie[] = [
  {name: "Kiki's Delivery Service", released: 1989, seen: true},
  {name: "Ponyo", released: 2008, seen: false},
  {name: "Howl's Moving Castle", released: 2004, seen: true},
  {name: "Castle in the Sky", released: 1986, seen: true},
  {name: "Arietty", released: 2010, seen: false},
  {name: "Whisper of the Heart", released: 1995, seen: false}
];

// We need an extra object to be added
const newMovie = {
    name: "Nausicaä of the Valley of the Wind",
    released: 1984,
    seen: true
};

// Here's a reference to the original array; no copies at all
const moviesByStudioGhibli = ghibliMovies;

// Now we make a "shallow copy", which only copies one "layer" of references
const myMovieCollection = [...ghibliMovies];

// Adding a new element to the original array only mutates the original array
ghibliMovies.push(newMovie);
console.log("There are", ghibliMovies.length, "movies in `ghibliMovies`");
console.log("There are", moviesByStudioGhibli.length, "movies in `moviesByStudioGhibli`");
console.log("There are", myMovieCollection.length, "movies in `myMovieCollection`");

// But the first element is the same in all three collections, so modifying its `seen`
//   field means that the INNER CONTENTS of the two arrays has changed! But not the
//   inner references, just the contents inside of those inner objects.
ghibliMovies[0].seen = false;
console.log("Have I seen the first movie of `ghibliMovies`?", ghibliMovies[0].seen);
console.log("Have I seen the first movie of `moviesByStudioGhibli`?", moviesByStudioGhibli[0].seen);
console.log("Have I seen the first movie of `myMovieCollection`?", myMovieCollection[0].seen);
```

When a Shallow Copy just won't do, you need a "Deep Copy". This means that when you do the copy,
you also make fresh copies of all the inner objects. This requires more work: for arrays, we may no
longer simply rely on unpacking the array into an array literal constructor (`[...array]`), but instead
must `.map()` the array and specify how to construct each new element. Fortunately, we can still use the
unpacking approach for cloning an object; we just need to make sure we also update any fields containing
nested data.

An interesting syntactical issue appears when we try to return an object literal from an anonymous function:
the syntax for object literals (curly braces) and function bodies (also curly braces) overlaps, confusing the
TypeScript compiler. By default, TypeScript will assume you wanted to create a function body, so you have to
disambiguate by wrapping the curly braces in parentheses to make it clear that you want to create an object
and not specify the body of a function.

```tsx
interface Movie {
  name: string
  released: number
  seen: boolean
}

// Make an array of objects
const ghibliMovies: Movie[] = [
  {name: "Kiki's Delivery Service", released: 1989, seen: true},
  {name: "Ponyo", released: 2008, seen: false},
  {name: "Howl's Moving Castle", released: 2004, seen: true},
  {name: "Castle in the Sky", released: 1986, seen: true},
  {name: "Arietty", released: 2010, seen: false},
  {name: "Whisper of the Heart", released: 1995, seen: false}
];

// We need an extra object to be added
const newMovie = {
    name: "Nausicaä of the Valley of the Wind",
    released: 1984,
    seen: true
};

// Here's a reference to the original array; no copies at all
const moviesByStudioGhibli = ghibliMovies;

// Now we make a "shallow copy", which only copies one "layer" of references
const shallowCopy = [...ghibliMovies];

// And here is a true "deep copy"
const deepCopy = ghibliMovies.map((movie: Movie): Movie => ({...movie}));

// Updating the first element will not affect the deep copy!
ghibliMovies[0].seen = false;
console.log("Have I seen the first movie of `ghibliMovies`?", ghibliMovies[0].seen);
console.log("Have I seen the first movie of `moviesByStudioGhibli`?", moviesByStudioGhibli[0].seen);
console.log("Have I seen the first movie of `shallowCopy`?", shallowCopy[0].seen);
console.log("Have I seen the first movie of `deepCopy`?", deepCopy[0].seen);
```

The example above shows off cloning an array of objects, where each object only contains primitive data. But what if we had to clone
an array of objects where each object had an array of objects of primitive data? This may sound complicated, but its the same application
of rules as there has ever been. Let's look at another example where we have a bunch of complex data inside.

<!-- TODO: Probably need to swap this out for something that isn't a Deltarune reference so its more generally approachable -->

```tsx
interface Contact {
    name: string;
    address: string;    
}

interface Email {
    subject: string;
    body: string;
    sender: Contact;
    recipients: Contact[];
    tags: string[];
}

// Some example data
const myEmails = [
    {
        name: "Wanna be a BIG SHOT?",
        body: "HEY EVERY !! IT'S ME!!!",
        sender: { name: "Spamton", address: "spamton@g.spamton" },
        tags: ["spam", "offer", "junk"],
        recipients: [
            { name: "Kris", address: "krisscross@light.ner"}
        ]
    },
    {
        name: "RE: Simple Puppet",
        body: "Let me become your strength.",
        sender: { name: "Spamton", address: "spamton@g.spamton" },
        tags: ["correspondence", "sincere"]
        recipients: [
            { name: "Kris", address: "krisscross@light.ner"},
            { name: "Susie", address: "biggator@light.ner"},
            { name: "Ralsei", address: "littlegoat@dark.ner"}
        ]
    }
];

// Function to DEEP COPY an array of emails
function deepCloneEmails(emails: Email[]): Email[] {
    // Need to describe how to clone each element
    return emails.map((email: Email): Email => 
        ({
            // Unpack all existing fields so they stay the same
            ...email,
            // This field has non-primitive data, but its array has
            //   primitive data, so okay to shallow copy
            tags: [...email.tags],
            // This field is also non-primitive, but again its object has
            //   only primitive data, so okay to shallow copy
            sender: {...email.sender},
            // But this field is non-primitive AND has non-primitive data inside, so have
            //   to map the same way we did the outer array!
            recipients: email.recipients.map((contact: Contact): Contact =>
                // But okay to shallow copy inside because, again, all primitive in there
                ({...contact})),
        })
    );
}

// Make the DEEP COPY
const copiedEmails = deepCloneEmails(myEmails);

// Mutate the first email's first contact
myEmails[0].recipients[0].address = "stranger@gaster.net";

// And check the resulting data
console.log("The first email address of the first contact of `myEmails` is", myEmails[0].recipients[0].address);
console.log("The first email address of the first contact of `copiedEmails` is", copiedEmails[0].recipients[0].address);
```

There are shortcut approaches to doing a Deep Copy, but we do not recommend them:

1. Import a third-party library to deep copy for you.
2. Abuse `JSON.stringify` to serialize an object into a string and `JSON.parse` to deserialize the string back into an object.

There are several issues with these approaches. First, you may see performance impacts since the approaches know nothing about your data, although whether this is a problem varies over time, hardware, and context. Using a third-party library means additional dependencies, which potentially bring vulnerabilities, require updates of their own, and may mean a bloated website. In either case, any non-standard JSON-formatted data (e.g., anything besides objects, arrays, strings, numbers, and nulls) in your structure may fail to get copied correctly - this includes functions and many other useful kinds of data that we have not talked about.

Therefore, in general, we recommend sticking to the approaches for copying data that we have outlined in the previous section, rather than the shortcut approaches you will often find recommended by more experienced developers. Once you are an experienced developer, the choice is yours.

# 📝 Task - Nested Data

This will be a complex task! We have a LOT of functions to write.

As always, begin by pulling our changes, making a new branch, and merging in our changes.

```sh
$> git pull upstream main
$> git fetch upstream task-nested
$> git checkout -b solved-nested
$> git merge upstream/task-nested
```

You'll need to edit the `nested.ts` file.

Check your status with the tests by running:

```sh
$> npm run test:cov
```

If you are overwhelmed by the number of failing tests, you can focus on just one at a time by typing `t` and entering the name of the function you want to test (e.g., `getPublishedQuestions`). You can go back to running all the tests by typing `a`.

As you complete functions, use the `git add`/`git commit` or the Visual Studio Code interface to make small regular commits. Practice the habit now!

Once you are passing all the tests, you should be able to push your branch to the remote and make a Pull Request to `main`. We'll be checking your tests to make sure you pass!

```sh
$> git push --set-upstream origin solved-nested
```

Once you're done, we can start learning about more complex applications by [Using State &raquo;](../4-state/index.md)
