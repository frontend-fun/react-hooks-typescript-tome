---
layout: default
title: Saving and Loading
nav_order: 7.3
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

# Saving and Loading

There are many ways to achieve saving and loading. We'll talk about two ways here: using `localStorage` and downloading/uploading a file.

# Local Storage

Your browser has a dictionary named `localStorage` that you can set, get, and delete key/value pairs from. The values must be strings. This dictionary persists between page loads.

```tsx
localStorage.setItem("some unique key", "hello world");
console.log(localStorage.getItem("some unique key"));
```

Remember that you can use `JSON.stringify` and `JSON.parse` to convert any object/array/number/string/boolean/null into a string and back again.

```tsx
const someData = [{name: "Dr. Bart", score: 300}, {name: "Ellie Bart", score: 900}];
const someDataAsString = JSON.stringify(someData);

console.log(someData);
console.log(someData[0].name);

console.log(someDataAsString);

const rehydratedData = JSON.parse(someDataAsString);
console.log(rehydratedData);
console.log(rehydratedData[0].name);
```

Let's put it all together to have a component that remember its state between page loads!

```tsx
// Have some default initial data if the user is new
let loadedData = [29, 44, 55];

// You can make up your own key however you want, but make it unique!
const saveDataKey = "MY-PAGE-DATA";

// Check if the user's data already exists
const previousData = localStorage.getItem(saveDataKey);
// If the data doesn't exist, `getItem` returns null
if (previousData !== null) {
    loadedData = JSON.parse(previousData);
}

function App(): JSX.Element {
    const [data, setData] = useState<number[]>(loadedData);

    function addRandom() {
        const newNumber = Math.floor(Math.random() * 100);
        setData([...data, newNumber]);
    }

    function saveData() {
        localStorage.setItem(saveDataKey, JSON.stringify(data));
    }

    return <div>
        <ol>
            { data.map((value: number) => (
                <li key={value}>{value}</li>
            ))}
        </ol>
        <Button onClick={saveData}>Save Data</Button>
        <Button onClick={addRandom}>Add new random number</Button>
    </div>
}
```

Try running the example above and then:

1. Add new random number
2. Save
3. Run the example again
4. Add new random number
5. DO NOT save
6. Run the example again

The The second time you run the example, the number is retained. But the third time, the number is not retained since you didn't save. If you reload the page and run this example again, the data will be saved.

Clearing out the data is an exercise left to the reader. Use google.

# Downloading a File

[Example of downloading a CSV file.](https://stackoverflow.com/a/68146412/1718155)

Google for more examples.

You do NOT need any additional libraries to download or upload a file, if you're just making a CSV file. Do not over think this.

# Uploading a File

Here's some example code that will let you upload a file and store its contents into the state.

```tsx
function App(): JSX.Element {
    const [content, setContent] = useState<string>("No file data uploaded");

    function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        // Might have removed the file, need to check that the files exist
        if (event.target.files && event.target.files.length) {
            // Get the first filename
            const filename = event.target.files[0];
            // Create a reader
            const reader = new FileReader();
            // Create lambda callback to handle when we read the file
            reader.onload = (loadEvent) => {
                // Target might be null, so provide default error value
                const newContent =
                    loadEvent.target?.result || "Data was not loaded";
                // FileReader provides string or ArrayBuffer, force it to be string
                setContent(newContent as string);
            };
            // Actually read the file
            reader.readAsText(filename);
        }
    }

    return (
        <div>
            <pre style={{ overflow: "scroll", height: "100px" }}>{content}</pre>
            <Form.Group controlId="exampleForm">
                <Form.Label>Upload a file</Form.Label>
                <Form.Control type="file" onChange={uploadFile} />
            </Form.Group>
        </div>
    );
}
```