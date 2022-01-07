---
layout: default
title: Complex Representation
nav_order: 5
---


# Complex Representation

So things get complicated here. You can't make a web application with just a string. You need complicated nested states.

## Array Edit Patterns

```typescript
const [prices, setPrices] = useState<number>([10, 8, 9, 7]);
```

### Adding an element to the end (push)

We can use the "spread operator" (three periods, like `...`) to unpack an array.

```typescript
const pricesAtEnd = [...prices, 55];
// [10, 8, 9, 7, 55]

const pricesAtStart = [55, ...prices];
// [55, 10, 8, 9, 7]

const doublePrices = [...prices, ...prices];
// [10, 8, 9, 7, 10, 8, 9, 7]
```

### The Spread Operator

The `...` operator is not part of the `[  ]` square brackets. The square brackets are being used to create a new literal array. The `...` works separately. These dots work with function calls too.

```typescript
console.log(10, 8, 9, 7, 55);
// 10, 8, 9, 7, 55

console.log(prices);
// [10, 8, 9, 7, 55]

console.log(...prices);
// 10, 8, 9, 7, 55

console.log([...prices]);
// [10, 8, 9, 7, 55]
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

## Editing an Object in an Array at an Index

```typescript

interface Movie {
  name: string
  price: number
}

const INITIAL_MOVIES: Movie[] = [
  {name: "First", price: 1.99}, // TODO: ...
]

export function MovieListings(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  
  function changePrice(movieName: string, newPrice: number) {
    // Need to map a new version of the array
    return movies.map((movie: Movie): Movie =>
      // If this movie is not the target movie
      (movie.name !== movieName) ?
        // Return it unchanged
        {...movie} :
        // Otherwise make the new version of the movie
        {...movie, price: newPrice});
  }

  return <div>
    <ol>
      (movies.map((movie: Movie): JSX.Element => 
        <li>{movie.name}: {movie.price} 
          <button onClick={
            ()=>changePrice(movie.name, 2*movie.price)
          }>Increase price</button>
      </li>))
    </ol>
  </div>;
}
```

* list of object states
  * State gone wrong: Ultimately we escalate to multiple levels of nested state. We have some specific examples where that breaks down when done incorrectly.
* list of list of object states
* record of list of object states
