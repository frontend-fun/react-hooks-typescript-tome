---
layout: default
title: Nested Examples
nav_order: 5.1
parent: Complex Representations
---

# Nested Examples

[&laquo; Return to the Chapter Index](index.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

So things get complicated here. You can't make a web application with just a string. You need complicated nested states. In this chapter, we provide some example Apps that bridge the gap between the more complex nested data we saw in the TypeScript chapter with the more complex views and controllers we saw in the State chapter.

## Editing an Object in an Array with a Given Value

In the example app below, there is a list of movies that can be either `seen` or `not seen` based on a button click. The `changeMovieSeen` function demonstrates how we can immutably manipulate the array of movies using the `map` method. In this case, we are checking based on the `name` of each movie.

```tsx
interface Movie {
  name: string
  released: number
  seen: boolean
}

const INITIAL_MOVIES: Movie[] = [
  {name: "Kiki's Delivery Service", released: 1989, seen: true},
  {name: "Ponyo", released: 2008, seen: false},
  {name: "Howl's Moving Castle", released: 2004, seen: true},
  {name: "Castle in the Sky", released: 1986, seen: true},
  {name: "Arietty", released: 2010, seen: false},
  {name: "Whisper of the Heart", released: 1995, seen: false}
]

export function App(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  
  function changeMovieSeen(movieName: string, newSeen: boolean) {
    // Need to map a new version of the array
    const modifiedMovies = movies.map((movie: Movie): Movie =>
      // If this movie is the target movie
      (movie.name === movieName) ?
        // Return a new modified movie
        {...movie, seen: newSeen} :
        // Otherwise return the movie unchanged
        {...movie}));
    // Update the movies array to be the new version
    setMovies(modifiedMovies);
  }

  // Render each movie in a bulleted list
  return <div>
    <ol>
      {(movies.map((movie: Movie): JSX.Element => 
        <li>
          {movie.name} ({movie.released}): 
          <Button onClick={()=>changeMovieSeen(movie.name, !movie.seen)}>
            {movie.seen ? 'Seen' : 'Not seen'}
          </Button>
      </li>))}
    </ol>
  </div>;
}
```

## Removing an Object with a Given Value

In this example, we show a list of movies, each with a button next to them. Clicking the button removes the given movie from the list (once again by checking for its name). This example uses `filter` to achieve the effect of creating a new array without the old data.

```tsx
interface Movie {
  name: string
  released: number
  seen: boolean
}

const INITIAL_MOVIES: Movie[] = [
  {name: "Kiki's Delivery Service", released: 1989, seen: true},
  {name: "Ponyo", released: 2008, seen: false},
  {name: "Howl's Moving Castle", released: 2004, seen: true},
  {name: "Castle in the Sky", released: 1986, seen: true},
  {name: "Arietty", released: 2010, seen: false},
  {name: "Whisper of the Heart", released: 1995, seen: false}
]

export function App(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  
  function removeMovieByName(movieName: string) {
    // Need to map a new version of the array
    const modifiedMovies = movies.filter(
      (movie: Movie): Movie =>
        // If this movie is the target movie
        movie.name !== movieName
    );
    // Update the movies array to be the new version
    setMovies(modifiedMovies);
  }

  // Render each movie in a bulleted list
  return <div>
    <ol>
      {(movies.map((movie: Movie): JSX.Element => 
        <li key={movie.name}>
          {movie.name} ({movie.released}): 
          <Button onClick={()=>removeMovieByName(movie.name)}>
            Remove
          </Button>
      </li>))}
    </ol>
  </div>;
}
```

## Adding a New Object

This example shows off adding a new `Movie` to the end of the array of movies, incorporating information from a Form. When a Movie is added, the Movie will have the appropriate data. An alternative approach would be to create a new "blank" movie and provide users with the ability to edit existing movies. Either way, we use the unpacking trick to create a new array with the new element at the end.

```tsx
interface Movie {
  name: string
  released: number
  seen: boolean
}

const INITIAL_MOVIES: Movie[] = [
  {name: "Kiki's Delivery Service", released: 1989, seen: true},
  {name: "Ponyo", released: 2008, seen: false},
  {name: "Howl's Moving Castle", released: 2004, seen: true},
  {name: "Castle in the Sky", released: 1986, seen: true},
  {name: "Arietty", released: 2010, seen: false},
  {name: "Whisper of the Heart", released: 1995, seen: false}
];

// Simplify type definition of the Change Event
type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

// Simplify the Component's parameter's type
interface AddMovieBoxParams {
  // Consumes a function that consumes the name and released date
  //  and returns nothing (because it's passed to a React State Setter).
  // This is passed in much later
  appendMovie: (n: string, r: number)=>void
}

export function AddMovieBox({appendMovie}: AddMovieBoxParams): JSX.Element {
  // These will be the values for the new Movie
  const [name, setName] = useState<string>('New Movie');
  const [released, setReleased] = useState<number>(2022);

  // Provide forms for editing the new movie
  // And also a button to append the movie
  return <div>
    <Form>
      <Form.Group controlId="formMovieName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" value={name}
          onChange={(event: ChangeEvent) => setName(event.target.value)} />
      </Form.Group>
    </Form>
    <Form>
      <Form.Group controlId="formMovieReleased">
        <Form.Label>Released:</Form.Label>
        <Form.Control type="number" value={released}
          onChange={(event: ChangeEvent) => setReleased(event.target.value)} />
      </Form.Group>
    </Form>
    <Button onClick={()=>appendMovie(name, released)}>Append</Button>
  </div>;
}

export function App(): JSX.Element {
  // The entire list of all movies
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  
  function appendMovie(name: string, released: number) {
    // Making a new array of movies, with an additional extra one
    const modifiedMovies = [...movies, {
      name: name, released: released, seen: false
    }];
    // Update the movies array to be the new version
    setMovies(modifiedMovies);
  }

  // Render each movie in a bulleted list, with an AddMovieBox below
  return <div>
    <ol>
      {(movies.map((movie: Movie): JSX.Element => 
        <li key={movie.name}>
          {movie.name} ({movie.released})
      </li>))}
    </ol>
    <AddMovieBox appendMovie={appendMovie}></AddMovieBox>
  </div>;
}
```

## Inserting an Object at a Given Location

This next example allows for a more complicated operation: duplicating a Movie that already exists in the array, placing the duplicate next to the original via `splice`. An alternative approach would be to follow the previous example and provide forms for adding a new Movie with specific data, or to always create a blank (editable) Movie.

```tsx
interface Movie {
  name: string
  released: number
  seen: boolean
}

const INITIAL_MOVIES: Movie[] = [
  {name: "Kiki's Delivery Service", released: 1989, seen: true},
  {name: "Ponyo", released: 2008, seen: false},
  {name: "Howl's Moving Castle", released: 2004, seen: true},
  {name: "Castle in the Sky", released: 1986, seen: true},
  {name: "Arietty", released: 2010, seen: false},
  {name: "Whisper of the Heart", released: 1995, seen: false}
];

export function App(): JSX.Element {
  // The entire list of all movies
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  
  function duplicateMovie(targetName: string) {
    // Find the target movie's index
    const targetMovieIndex = movies.findIndex((movie: Movie):boolean =>
      // Returns `true` if this is the movie with the target name
      movie.name === targetName);
    // Access the original movie
    const originalMovie = movies[targetMovieIndex];
    // Make a modified duplicate
    const copiedMovie = {...originalMovie, name: "Copy of "+originalMovie.name};
    // Make a new array based on the old array
    const modifiedMovies = [... movies];
    // Splice in the `copiedMovie` in the correct location (`1+targetMovieIndex`), with `0` deletions
    modifiedMovies.splice(1+targetMovieIndex, 0, copiedMovie);
    // Update the movies array to be the new version
    setMovies(modifiedMovies);
  }

  // Render each movie in a bulleted list, with an AddMovieBox below
  return <div>
    <ol>
      {(movies.map((movie: Movie): JSX.Element => 
        <li key={movie.name}>
          {movie.name} ({movie.released}):
          <Button onClick={()=>duplicateMovie(movie.name)}>Duplicate</Button>
      </li>))}
    </ol>
  </div>;
}
```

A downside with the approach of duplication in this way is deciding what to set as the name (which must be unique in the application as coded). In the next chapter, we will discuss the critical idea of unique IDs for data.

##

# Record State

A common alternative to an "array of objects" is a "record of objects", mapping IDs (often strings or numbers) to each object. This takes advantage of the algorithmic time complexity of hash-based data structures to quickly speed up accessing a specific object. This is necessarily more complicated. 

Unfortunately, we don't really have time to explain this idea in more depth. In future versions of the Tome, we definitely will write up a cool bunch of paragraphs here. But for now, we're just telling you that it exists and suggesting you play with it more if you get the chance.

<!--
# Writing Your Own Tests

You're going to need to start writing your own tests soon, as the applications get bigger and more complicated. We have a little bit of advice.

## Happy Paths

When writing tests, you often focus on what your application should do.

## Mocking

In the previous chapter, we had to write tests for the `TwoDice` component, which relied on random number generation. The whole point of random numbers is to make things more random. This presents a challenge when we want to *deterministically* test our applications.

# Supporting Multiple Languages

https://betterprogramming.pub/add-multi-language-support-in-react-js-a771c9ab31c3

## Data Organization

Organize State Structure Based on Data Types, Not Components

> For example, a blogging app might need to track who is logged in, information on authors and posts, and perhaps some info on what screen is active. A good state structure might look like `{auth, posts, users, ui}`. A bad structure would be something like `{loginScreen, usersList, postsList}`.

`postsList` sounds like a good Component, a View that renders the Model. But the actual Model itself is not the list on the screen, but the underlying abstraction of the current `posts`.

-->

# No Task

We had no time to put together a Task here. Catch your breath, because the next chapter is a doozy!

Let's take a look at a [Full Application &raquo;](../5-complex/complex.md)