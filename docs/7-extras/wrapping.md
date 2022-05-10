---
layout: default
title: Re-wrapping States
nav_order: 7.4
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

# Wrong Idea: Re-wrapping States

When you pass state down through components, you often want to work with only SOME of the original data. For example, a specific field instead of an entire object. A common misconception that arises is that you have to "rewrap" the state inside of a new `useState`. This is worse than unnecessary - it is wrong!

When you call `useState`, you create a new bit of state in that place of the app. You can pass in an initial value, but once the application begins, the new state is completely independent of the old state. This means that local modifications to that state will NOT be represented in the parent components.

Run the example below and try adding new names. You will observe that the Count is out of date with the actual list of names. The local `names` array *is* updated; otherwise the app would not render that part correctly. However, we never modify the original `teams` array's data, so that part of the app doesn't change.

```tsx
interface Team {
  title: string;
  members: string[];
}

function TeamView({team}: {team: Team}): JSX.Element {
  const [names, setNames] = useState<string[]>(team.members);
  const [newName, setNewName] = useState<string>("Ada");
  
  function addMember() {
    setNames([...names, newName]);
  }
  
  return <div>
    <strong>{team.title}: </strong>
    <ul>
      { names.map(
        (name: string) => (
          <li key={name}>{name}</li>
      ))}
      <li>
        <Form.Group controlId="formNewName" as={Row}>
          <Form.Label column sm={3}>New Member:</Form.Label>
          <Col>
            <Form.Control
              value={newName}
              onChange={(event) => setNewName(event.target.value)} />
          </Col>
          <Col>
            <Button onClick={addMember}>Add</Button>
          </Col>
        </Form.Group>
      </li>
    </ul>
    <div>
    </div>
  </div>;
}

function App(): JSX.Element {
  const [teams, setTeams] = useState<Team[]>([
    {title: "Theory", members: ["Turing", "Knuth"]},
    {title: "Types", members: ["Liskov", "Church"]}
  ]);
  
  return <div>
    <h3>Team Counts</h3>
    <ul>
      { teams.map(
        (team: Team) => (
          <li key={team.title}>{team.title}: {team.members.length}</li>
        )
      )}
    </ul>
    <h3>Team Members</h3>
    <div>
      { teams.map(
        (team: Team) => (
          <TeamView team={team} key={team.title}></TeamView>
        )
      )}
    </div>
  </div>;
}
```

Let us look at a CORRECT version of the above code. Notice how much extra state we are forced to pass around! We need both `teams` and `setTeams` so that we can properly update the parent's state. This is why you might create a function like `addMember` inside of the parent and pass that down instead. But fundamentally, we need that function to be messing with the parent state and not a redundant child state!

```tsx

interface Team {
  title: string;
  members: string[];
}

// Need to pass in the `teams` and `setTeams` to modify them!
function TeamView(
  {team, teams, setTeams}: {team: Team, teams: Team[], setTeams: (t: Team[])}
): JSX.Element {
  // You *can* have a temporary variable like `names`, or use `team.members` directly
  const names = team.members;
  // And we still need this useState too
  const [newName, setNewName] = useState<string>("Ada");
  
  // But you *must* use `setTeams`, not some local useState!
  // And in fact the work is more complicated because of the nested state!
  function addMember() {
    setTeams(teams.map(
      (originalTeam: Team): Team => (
        // Is this the team we are editing?
        originalTeam.title !== team.title ?
          // If not, leave it be
          originalTeam :
          // Otherwise, modify the team's members
          {
            title: team.title,
            members: [...team.members, newName]
          }
      )
    ));
  }
  
  return <div>
    <strong>{team.title}: </strong>
    <ul>
      { names.map(
        (name: string) => (
          <li key={name}>{name}</li>
      ))}
      <li>
        <Form.Group controlId="formNewName" as={Row}>
          <Form.Label column sm={3}>New Member:</Form.Label>
          <Col>
            <Form.Control
              value={newName}
              onChange={(event) => setNewName(event.target.value)} />
          </Col>
          <Col>
            <Button onClick={addMember}>Add</Button>
          </Col>
        </Form.Group>
      </li>
    </ul>
    <div>
    </div>
  </div>;
}

function App(): JSX.Element {
  const [teams, setTeams] = useState<Team[]>([
    {title: "Theory", members: ["Turing", "Knuth"]},
    {title: "Types", members: ["Liskov", "Church"]}
  ]);
  
  return <div>
    <h3>Team Counts</h3>
    <ul>
      { teams.map(
        (team: Team) => (
          <li key={team.title}>{team.title}: {team.members.length}</li>
        )
      )}
    </ul>
    <h3>Team Members</h3>
    <div>
      { teams.map(
        (team: Team) => (
          // We have to pass in this extra state to make this all work!
          // That's why sometimes you make helper functions here instead of there.
          <TeamView
            team={team}
            teams={teams}
            setTeams={setTeams}
            key={team.title}></TeamView>
        )
      )}
    </div>
  </div>;
}
```

A sneaky exception to when the state still gets coupled together is if you accidentally are mutating objects and arrays instead of creating new ones. This is the worst of all worlds: state appears to update, but re-renders erratically. You'll be in a nightmare of debugging if you are mutating state AND rewrapping states!