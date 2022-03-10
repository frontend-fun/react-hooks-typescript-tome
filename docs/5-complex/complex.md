---
layout: default
title: Full Application
nav_order: 5.2
parent: Complex Representations
---

# Full Application

Coming soon
{: .label .label-yellow }

**Oops! This page is not yet ready. Please be patient while we finish it up.**

[&laquo; Return to the Chapter Index](index.md)

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

Building a real application is difficult. You may understand each piece, but that is not the same as knowing how to glue all the pieces together. Most of the work you do as a software engineer is actually gluing existing components together, in fact. Granted, here we are going to have to make the new components too, and that will be hard too.

The real trick, however, is that all of this becomes easier with good planning. You never just jump into coding without thinking, you really want to follow a process. A simplified version of a more sophisticated process we will eventually show you is as follows:

1. Gather requirements
2. Sketch the application
3. Develop the data model
4. Build a "Minimally Viable" version
5. Iterate

# Movie Records

A client has requested a website where they can record movies that they are interested in watching or have already watched, in order to share with their friends when deciding movie night. Eventually, the website will need a sophisticated backend to persist data long term, but for now they want a simple site that works with some data they have already prepared. Dubbing this application the `Movie Records` site, they have contracted us to make a Minimal Viable version.

## Gathering Requirements

The first order of business was to meet with the client and discuss what exactly they wanted the application to do. This led to a list of user requirements.

* Users must be able to view a list of movies
* Users can see the title, description, release date, and rating of the movie
* Users should be able to edit movie's attributes
* Users should be able to add a new movie
* Users should be able to remove an existing movie
* Users can indicate if they have seen and/or liked a movie
* Users should be able to quickly play the trailer of the movie
* Users should be able to play some of the movie's soundtrack

We would probably want more detail in this list, and we should also get a better handle on who the users will be and what their specific needs will be. But for now, we will stick to this simple list.

## Sketching the Application

With the requirements in hand, we sat down and made an initial sketch of the Movie Records application's View. This could have been done with software like Figma or PowerPoint, but we used pencil-and-paper (whiteboards are also popular). In some places, we added annotations to highlight interactive components or aspects of the Control that might not be visible.

![An initial sketch of the Movie Records application](../assets/images/../../images/movie_records_sketch.png)

This initial version incorporated features that we did not end up implementing, like the ability to filter records or to insert movies at arbitrary places. We also did not end up following this exact UI placement for some elements (e.g., the buttons, the editor layout).

However, the value of the sketch is in syncing up the development team and ironing out some important questions in a more concrete way. Another benefit is that this is relatively easy to translate to specific components once we got started on development.

We showed this sketch to the client (making sure to remind them that it was a very rough draft) and made sure they were happy with what they say. They mentioned how some of the features were less important (e.g., filtering, keywords), and that helped convince us to drop them from our minimal viable product.

## Developing the Data Model

Far more important than any actual code is the development of the data model for our application. Remember, the State lives at the heart of all applications - all the control flow exists merely in service of manipulating the state. You should spend time before making components thinking about the state of your application, and where that state lives.

"Where the State lives" in React means, what components need to call `useState`, so that the relevant state variables and state setters can be passed down to the children who need them. Your goal is to keep the state high enough up in the hierarchy that everyone has access who needs it, without going higher than necessary. Unfortunately, that often means that the highest component (which might be `App`, but might be some other specialized component like `MovieRecords` or `MovieApp` that lives in `App`) will contain a signficant amount of State. That State might only be in a single data structure (an Array, Object, or Record), but will still represent most of the data for the application.

Here were our initial thoughts on the State:

* At the top-level, there is an array of movies
* Each movie has a title, release year, description, rating, and a unique ID
* Each movie has an array of songs
* A song has a name, who made the song, and a unique ID
* Each movie can either be seen or unseen, liked or not liked, and we wanted to track when that information changes

These thoughts about the state led us to the following three Interfaces:

* [Movie](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/interfaces/movie.ts#L4-L12)
* [Song](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/interfaces/song.ts#L1-L5)
* [Watch](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/interfaces/watch.ts#L1-L5)

As part of this process, we also made up some mock data to play with. This ended up being useful for testing our application too.

* [Ghibli Movies Data](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/data/ghibli_movies.json#L2-L20)

For the unique IDs in our movies, we actually used the ID for the movie's trailer on YouTube. Similarly, for our songs' unique IDs, we used their Spotify ID. This had a huge advantage when it came time to embed the trailers and songs into our webpage. There was a draw-back since we then couldn't edit the trailer video of a Movie in our application (since that uniquely identified the Movie!). Since we were making our own data, we had the freedom to make this choice, but often you will find that data comes pre-equipped with a good unique ID.

Notice that we do not actually store the `Watch` information in our `Movie` records in the example data. This is because we felt that that state was special and different from our movie records. First, that data is not intrinsic to the movie, so it felt inappropriate to keep it directly next to the description and released date. Further, we predict future versions of this application where multiple users will have their own watch records, and the movie records will eventually need to be kept more distinct from that watch data. Planning for the future is a tricky game - its entirely possible we will never end up making a future version, or we'll need to solve a completely different problem, or we'll want a different solution. Still, trying to plan a few steps ahead can pay off. Never let yourself get mired in pre-optimization, though, and remember [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it). 

After our application imports data initially, we need to make sure that the final result is a valid `Movie` object according to our interface before we use the data as our initial state. This means we must also include the `watched` attribute with the appropriate object inside. To that end, we had a little bit of logic in our application to handle pre-processing the movie data. Note that we carefully placed this logic OUTSIDE of the component; otherwise it will be unnecessarily recalculated each time our application renders. We only need to run this code once to set up our initial data.

* [Importing raw movie data](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/App.tsx#L5)
* [Preprocessing Movie Data](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/App.tsx#L9-L14)
* [Actually loading initial data](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/App.tsx#L29)

If you look at that last link, when we actually use the initial data post-processing, the line is shockingly simple. We use the `MOVIES` constant as the argument to `useState`. Yet the resulting `movies` state variable represents the vast majority of the data for our application! This can be a little disorienting for folks getting started, but just keep in mind how much data that little state variable is pointing to: multiple levels of nested arrays and objects!

## Building a Minimally Viable Version

### Rendering the Movie List

Since we have the data for our Movie List, we want to be able to see the Movies. This will let us know if our data is sane, and give us a better idea of what the application should look like.

* [Instantiating the `MovieList`](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/App.tsx#L69-L74)
* [Defining the `MovieList` component](https://github.com/frontend-fun/movie-records/blob/main/src/components/MovieList.tsx)

The `MovieList` component is really just responsible for calling `map` on the movies in order to in turn build up a whole stack of `MovieView` components. Notice how much we have to pass around state and setters, even though this component isn't using the state and setters themselves very much!

The `MovieView` component has a lot going on inside of it, hinting at all the future work that it will do. But it actually started off quite small. Looking carefully through the 

* [Defining the `MovieView` component](https://github.com/frontend-fun/movie-records/blob/main/src/components/MovieList.tsx)
* [Early version](https://github.com/frontend-fun/movie-records/blob/592b0ec4d2fb6a4e39c48f1a7134afaeda5bc30a/src/components/MovieView.tsx#L8-L27)
* [Showing the title](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/components/MovieView.tsx#L39)
* [Showing the released date](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/components/MovieView.tsx#L48)
* [Showing the description](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/components/MovieView.tsx#L53)

### Rendering the Song List

### Messing with State

We ended up creating several helper functions to streamline how we manipulated the Movies state. Notice how these functions are implemented as a closure over `movies` and `setMovies` (the variables are used inside the nested functions since they are availabel from the enclosing scope). An alternative approach would have been to define helper functions that live in their own separate file (similar to what we did for `arrays.ts`, `objects.ts`, and `nested.ts`), which would require us to pass around `movies` and `setMovies` to any component that wished to use them. There are advantages to providing a reduced interface, but also tradeoffs to keeping code localized to where the code is needed - you have to make decisions and think about performance and readability of your code.

* [State Setter Helper Functions](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/App.tsx#L32-L60)

### Watching a Movie

### Editing a Movie

### Deleting a Movie

### Adding a Movie

We had a Modal dialog box to organize the layout of a new movie more clearly.

* [Helper functions for the Modal](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/App.tsx#L62-L63)
* [Launch button for the Modal, and the Modal's instantiation](https://github.com/frontend-fun/movie-records/blob/21964cdddb05caec5d7cbf7e24110bd84a191fdc/src/App.tsx#L76-L89)
* [The actual Modal Component](https://github.com/frontend-fun/movie-records/blob/main/src/components/AddMovieModal.tsx)
* [The React Bootstrap Docs on using a Modal](https://react-bootstrap.github.io/components/modal/)

## Iterate

At this point, we have enough of a website that we should definitely show this version to a human. In fact, most likely, we should have been showing even earlier versions to the client throughout. For now, we are simply trying to get some practice in developing web applications, so we're relaxing our usual process a lot. In the next chapter, we'll talk more about the best practices for developing software in a maintainable way that leads to a successful product.

# 📝 Task - Quizzer

The task for this chapter is very different from previous ones. Up until now, we had the expectation that you would be able to achieve every subtask we set out, and that you would not proceed without finishing each part. However, that expectation might be unrealistic for this Task since we are establishing a lot of potential critiera. Your grade will be influenced by the amount of criteria that you complete, but we do not really expect you to finish all of the task 100%. Use this opportunity to learn what you can about writing a larger application!

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

