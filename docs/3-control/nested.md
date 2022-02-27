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
//https://frontend-fun.github.io/react-hooks-typescript-tome/3-control/primitives.html#string-interpolation

const movieCSV = ghibliMovies.map(
    (movie: Movie): string =>
        // Convenient String Interpolation; could have just used + operator too
        `  ${movie.name},${movie.released},${movie.seen ? "Seen" : "Not Seen"}`
).join("\n");
console.log("Movie CSV:");
console.log(movieCSV);

console.log("***************************************************");

// Make a new list where we re-release all the movies to be this year
const rereleasedMovies = ghibliMovies.filter(
    // The parentheses around the curly braces are CRITICAL!
    (movie: Movie): Movie => ({...movie, released: 2022})
);
console.log("Rereleased Year:", rereleasedMovies[0].released);

console.log("***************************************************");

// Relabel the old movies as "Ghibli Classic: WHATEVER"
const relabeledMovies = ghibliMovies.filter(
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

// Find an array's object with a less specific field value:
// Find a movie in the list released after 2000
const post2000Movie = ghibliMovies.find(
    (movie: Movie): boolean => movie.released >= 2000
);
console.log("A movie released after 2000:", post2000Movie.name);

// Find the oldest movie
const oldestMovie = ghibliMovies.reduce(
    (currentOldest: Movie, movie: Movie): Movie =>
        // Flip the < to be a > for the newest movie
        (movie.released < currentOldest.released ? movie : currentOldest)
);
console.log("Oldest movie:", oldestMovie.name, "in", oldestMovie.released);

// Add a new movie to the end
const ghibliWithMonoke = [...ghibliMovies, {
    name: "Princess Mononoke",
    released: 1997,
    seen: true
}];
console.log("Last movie is:", ghibliWithMonoke.slice(-1)[0].name);

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