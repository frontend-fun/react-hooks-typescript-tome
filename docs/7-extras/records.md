---
layout: default
title: Record Types
nav_order: 7.2
parent: The Lost Chapters
---

[&laquo; Return to The Lost Chapters](index.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

# Record Type

The `Record` type is used to describe a certain kind of object, where all the fields are the same type (usually strings) and all values of those fields are another homogenous type. The concept is basically the same as what other languages might call dictionaries, hash tables, maps, or an associative array. A simple example would be something like a "Record that maps strings to numbers":

```tsx
const grades: Record<string, number> = {
    "Ada": 97,
    "Babbage": 68,
    "Captain": 37,
    "Pumpkin": 100
};

console.log(grades);
console.log(grades['Ada']);

const moreGrades = {...grades, "Dr. Bart": 83};

console.log(moreGrades["Dr. Bart"]);
```

At the end of the day, the actual value stored in `grades` is just an object, the same as any objects we have seen before. However, from TypeScript's perspective, the *type* of fields and values in the object are heavily restricted. You cannot assign non-numbers to the fields of the object stored in `grades`. However, unlike an Interface, we can add new members as needed.

Ironically, the `Record` type doesn't actually meet all the usual requirements of what [Wikipedia calls a Record type](https://en.wikipedia.org/wiki/Record_(computer_science)), since they cannot have heterogenous members (aka two members with different types) and the fields are fixed (i.e., you can add new members to a TypeScript Record). Wikipedia's definition of Records are more similar to how we use Interfaces.

In fact, we recommend thinking of Records as if they were like Arrays, except you can index using any type (efficiently!) instead of just numbers. Since objects are implemented with Hash Maps, you get O(1) expected runtime performance for indexing, again similar to Arrays. We can traverse Records, add and delete elements, and generally treat them like any other collection.

This is why Records are amazing!

# Traversing Records

Going through the elements of a Record ends up being very similar to going through an array. We will still use `map`, but we must first convert the Record to an Array using one of three possible special built-in functions:

* `Object.keys` to iterate through the field names
* `Object.values` to iterate through the field values
* `Object.entries` to iterate through the field's names and values at the same time

These functions consume an object (in this case, a `Record`) and produce an array from its keys and/or values. Let's look at a simple example:

```tsx
const GRADES: Record<string, number> = {
    "Ada": 97,
    "Babbage": 68,
    "Captain": 37,
    "Pumpkin": 100
};

function App(): JSX.Element {
  return <ul>
    {Object.keys(GRADES).map((user: string) => (
        <li>User: {user}</li>
    ))}
  </ul>;
}
```

If `GRADES` had been an array of strings `["Ada", "Babbage", "Captain", "Pumpkin"]` then we could have used `.map` directly. But since instead we had a Record, we needed to use `Object.keys(GRADES)` instead.

Now let's access the values instead of the keys.

```tsx
const GRADES: Record<string, number> = {
    "Ada": 97,
    "Babbage": 68,
    "Captain": 37,
    "Pumpkin": 100
};

function App(): JSX.Element {
  return <ul>
    {Object.values(GRADES).map((grade: number) => (
        <li>Grade: {grade}</li>
    ))}
  </ul>;
}
```

Accessing both the keys and the values together gets slightly more complicated. The data returned from `Object.entries` is an "an array of arrays, where each inner array has length 2, with the first element being each key and the second element being each value." We use array destructuring to unpack the inner pairs into the parameters.

```tsx
const GRADES: Record<string, number> = {
    "Ada": 97,
    "Babbage": 68,
    "Captain": 37,
    "Pumpkin": 100
};

function App(): JSX.Element {
  return <ul>
    {Object.entries(GRADES).map(([user, grade]: [string, number]) => (
        <li>{user}: {grade}</li>
    ))}
  </ul>;
}
```

If you're having a hard time following the data transformation, it might be helpful to know what the `Object.entries(GRADES)` expression produces:

```tsx
[ [ "Ada", 97 ], [ "Babbage", 68 ], [ "Captain", 37 ], [ "Pumpkin", 100 ] ]
```

An array of arrays, where each inner array is a pair of elements representing each key and value.

# Traversing NESTED Records

Just like other collection types, you can nest records inside of records (and arrays and other objects!). This can be disorienting at first, but the rules are consistent with each other. Looking at an example is often helpful.

```tsx
interface Submission {
    score: number,
    late: boolean
}

// Map assignments to (a Map of students to submissions)
const grades: Record<string, Record<string, Submission>> = {
    "Task 1": {
        "Ada": {
            score: 97,
            late: false
        },
        "Babbage": {
            score: 68,
            late: true
        }
    },
    "Task 2": {
        "Ada": {
            score: 100,
            late: false
        },
        "Babbage": {
            score: 35,
            late: true
        }
    }
};

function App(): JSX.Element {
  return <ul>
    {Object.entries(grades).map(([assignment, submissions]: [string, Record<string, Submission>]) => (
        Object.entries(submissions).map(([user, submission]: [string, Submission]) => (
            <li>{user} scored a {submission.score} on {assignment}</li>
        ))
    ))}
  </ul>;
}
```

The `grades` variable is holding three layers of objects: two layers of records and then an interface. The code may be confusing, but if you consider the types they should be helpful in navigating what you have at any given moment.

# Updating Nested Records

Beyond traversing, Records are essentially just regular objects. You can use the same operations we learned before on objects to manipulate them. However, there is a trick we can use when creating new objects based off old objects where the field to be edited is dynamic (i.e., a variable instead of a string literal). We wrap the variable inside of square brackets:

```tsx
interface Submission {
    score: number,
    late: boolean
}

// Use a type variable to avoid having to retype such a long type expression!
type SubmissionRecord = Record<string, Record<string, Submission>>;

// Map assignments to (a Map of students to submissions)
const INITIAL_GRADES: SubmissionRecord = {
    "Task 1": {
        "Ada": {
            score: 97,
            late: false
        },
        "Babbage": {
            score: 68,
            late: true
        }
    },
    "Task 2": {
        "Ada": {
            score: 100,
            late: false
        },
        "Babbage": {
            score: 35,
            late: true
        }
    }
};

function App(): JSX.Element {
    const [grades, setGrades] = useState<SubmissionRecord>(INITIAL_GRADES);

    function editScore(assignment: string, user: string, newScore: number) {
        setGrades({
            // Keep all the other fields the same
            ...grades,
            // But use the assignment parameter. Without the brackets this would be treated as
            //  "assignment", AKA the string literal instead of the variable.
            [assignment]: {
                // Copy all the other fields unchanged...
                ... grades[assignment],
                // But again update the user's grade dynamically
                [user]: {
                    late: grades[assignment][user].late,
                    score: newScore
                }
            }
        })
    }

    return <ul>
    {Object.entries(grades).map(([assignment, submissions]: [string, Record<string, Submission>]) => (
        Object.entries(submissions).map(([user, submission]: [string, Submission]) => (
            <li>
                {user} scored a {submission.score} on {assignment}.
                <Button onClick={()=>editScore(assignment, user, submission.score+1)}>Increase by 1</Button>
            </li>
        ))
    ))}
</ul>;
}
```