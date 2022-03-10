---
layout: default
title: Complex Representation
nav_order: 5
---

# Complex Representation

Coming soon
{: .label .label-yellow }

**Oops! This page is not yet ready. Please be patient while we finish it up.**

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

# Complex Representation

So things get complicated here. You can't make a web application with just a string. You need complicated nested states.

## Editing an Object in an Array with a Given Value

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

## Record State

* record state
  * change value of object
  * add key to record, remove key from record

# Writing Your Own Tests


## Happy Paths

When writing tests, you often focus on what your application should do.

## Mocking

In the previous chapter, we had to write tests for the `TwoDice` component, which relied on random number generation. The whole point of random numbers is to make things more random. This presents a challenge when we want to *deterministically* test our applications.

# Supporting Multiple Languages

<!-- https://betterprogramming.pub/add-multi-language-support-in-react-js-a771c9ab31c3 -->

## Data Organization

Organize State Structure Based on Data Types, Not Components

> For example, a blogging app might need to track who is logged in, information on authors and posts, and perhaps some info on what screen is active. A good state structure might look like `{auth, posts, users, ui}`. A bad structure would be something like `{loginScreen, usersList, postsList}`.

`postsList` sounds like a good Component, a View that renders the Model. But the actual Model itself is not the list on the screen, but the underlying abstraction of the current `posts`.



# TODO: Finish these

A complex example in a github repository that models an application where we have a complex nested object.

* list of object states
  * State gone wrong: Ultimately we escalate to multiple levels of nested state. We have some specific examples where that breaks down when done incorrectly.
* list of list of object states
* record of list of object states

# Task

List of Quizzes
    Each quiz has a title, description, due_date, draft

Button to add a quiz at a certain location (modal with title/description/due_date/draft)
Button to add a quiz at the end
Button to show/hide editor for quiz question
  Ability to edit the title/description/due_date/draft of a specific quiz
Button to remove a quiz
Button to remove all draft quizzes
Button to publish all quizzes
Button to assign weekly due dates (based on modal with start/end?)

# Example

Record of Movies


* Users must be able to view a list of movies
* Users can see the title, description, and rating of the movie
* Users should be able to edit movie's attributes
* Users can indicate if they have seen or liked a movie
* Users can filter the movies based on whether they have seen them
* Movies should have a playable youtube trailer
* Songs should have a preview button