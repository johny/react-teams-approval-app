# Approval flow example

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the project

In the project directory, first install the required dependencies with command `yarn`.

Then start the app in the development mode with command: `yarn start`.
It will open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To launch the test runner in the interactive watch mode run: `yarn test`.

## Architecture

The project is build with Typescript, React and Redux.
To simplify store ogranization I've decided to use [Redux Toolkit](https://redux-toolkit.js.org/)

App functionality is spit into two main features:
- teams (listing teams and its users)
- approvalSteps (displayed as an overlay when user chooses the team)

The `src/features` folder contains components and the state slice related to particular area.
Root level app component holds the `currentTeam` state which determines team that is under editing

### Data flow

- Initially the page loads lists of teams and users from the API
- When user selects team by clicking on it, the modal with approvalSteps is rendered, with the scope of current team
- Each change in redux store is synchronously stored to the LocalStorage. This state is also restored on initial load

### Limitations

- Very limited validations
- Default input values are not user friendly
- No editing of steps in between
- No validation of steps overlapping
- Limited tests

