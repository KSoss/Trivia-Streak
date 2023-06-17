# Trivia Streak

Trivia Streak is a web-based trivia quiz application that allows users to test their knowledge across a variety of topics. Users can log in, answer trivia questions, and accumulate streak points for each correct answer in a row. The leaderboard displays the best streaks of all users, encouraging friendly competition.

Trivia Streak is currently live at [https://trivia-streak.web.app/](https://trivia-streak.web.app/)

## Features

- **User Authentication**: Users can create an account and log in to keep track of their progress. Google Authentication is implemented, allowing users to sign in with their Google account.

- **Trivia Questions**: Random trivia questions are fetched from the [Open Trivia Database API](https://opentdb.com/). Questions are presented in a multiple-choice format, providing an engaging and interactive experience.

- **Streak Scoring System**: For each consecutive correct answer, users earn streak points. The longer the streak, the higher the score.

- **Leaderboard**: The application includes a leaderboard that displays the highest streaks achieved by all users. This encourages friendly competition and engagement.

## Tech Stack 

- **Frontend**: [React](https://reactjs.org/) for UI components, [React Bootstrap](https://react-bootstrap.github.io/) for styling.
- **Backend**: [Firebase](https://firebase.google.com/) is used for user authentication, database storage, and hosting services.
- **State Management**: [React Context API](https://reactjs.org/docs/context.html) for managing global application state.
- **APIs**: [Open Trivia Database API](https://opentdb.com/) for fetching trivia questions.

## Getting Started

1. Fork and clone the repository
2. Installing dependencies with npm or yarn
3. (optional) Set up firebase database and importing you're own firebase configurations in a .env.local file. Will run without a database but will not allow log in features or data to be saved
4. Running the application locally with `npm run start`
