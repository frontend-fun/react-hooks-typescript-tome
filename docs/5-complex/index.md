---
layout: default
title: Complex Representation
nav_order: 5
---

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

## Data Organization

Organize State Structure Based on Data Types, Not Components

> For example, a blogging app might need to track who is logged in, information on authors and posts, and perhaps some info on what screen is active. A good state structure might look like `{auth, posts, users, ui}`. A bad structure would be something like `{loginScreen, usersList, postsList}`.

`postsList` sounds like a good Component, a View that renders the Model. But the actual Model itself is not the list on the screen, but the underlying abstraction of the current `posts`.

# Patterns

## Array Edit Patterns

```typescript
const [prices, setPrices] = useState<number>([10, 8, 9, 7]);
```



### Inserting an element at an index



### Inserting an element after a value

const targetIndex = prices.findIndex()

### Edit element of array

IF THE ARRAY HAS PRIMITIVE DATA THAN THIS IS EASY. But rarely is that the case. Be warned and be prepared to go to a later section.

```typescript
const newPrices = [...prices];
newPrices[index] = 55;
setPrices(newPrices)
```


* Edit patterns
  * push, insert into array
  * edit element of array
  * pop, remove index, remove value


## Immutability

Fix an application where they try to do something like this:


```typescript
export function BrokenNames(): JSX.Element {
  const [people, setPeople] = useState<string[]>([]);
  const [newName, setNewName] = useState<string>("New Name");

  function addPerson() {
    // TODO
  }

  return <div>
    <ul>
      (people.map(
        (person: string): JSX.Element => <li>{person}</li>
      ))
    </ul>
    <input type="textbox" onChange={(event: ___) => setNewName(event.target.result)}/>
    <button onClick={addPerson}>Add Person</button>
  </div>;
}
```

Explain why each of these don't work.

```typescript
// String and string[] are not compatible
setPeople(newName);
```


```typescript
// Need to call setState
people.push(newName);
```

```typescript
// No detection of changed value, reference equality
people.push(newName);
setPeople(people)
```

```typescript
// You can't overwrite a constant
people = [...people, newName];
setPeople(people)
```

* list of primitive states
  * List of names of people, need to be able to add, remove, edit
  * List of numbers where you need to be reporting the sum at the end





* object state
  * Want to have a situation where they must know shallow vs deep equality
* record state
  * change value of object
  * add key to record, remove key from record

# List of Object States

## Editing an Object in an Array with a Given Value

```typescript
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

```typescript
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
        <li>
          {movie.name} ({movie.released}): 
          <Button onClick={()=>removeMovieByName(movie.name)}>
            Remove
          </Button>
      </li>))}
    </ol>
  </div>;
}
```

* list of object states
  * State gone wrong: Ultimately we escalate to multiple levels of nested state. We have some specific examples where that breaks down when done incorrectly.
* list of list of object states
* record of list of object states
