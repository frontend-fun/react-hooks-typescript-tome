---
layout: default
title: TypeScript Nested Data
nav_order: 3.4
parent: TypeScript
---

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>


## Arrays of Objects

So far, we have talked about arrays and we have talked about objects. These complicated data structures allow us to represent more interesting values. Now let's combine them and increase our power EVEN FURTHER.

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
)
console.log(unseenMovies);

// Make a new list of just the movie titles


// Add together the number of characters in the movie's titles

// Create a CSV representation of the movies

// Make a new list where we re-release all the movies to be this year

// Make the old movies seen

// Find the release year of the movie "Castle in the Sky"

// Find a movie in the list released after 2000

// Find the oldest movie

// Add a new movie to the end

// Add a new movie to the middle

// Map to a new interface named `MovieDetails`
interface MovieDetails {
  title: string
  studio: string
  abbreviation: string
  released: number
  seen: boolean
}
```
