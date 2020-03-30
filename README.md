## Work From Roam

An application to find the nearest free workspaces for the remote workers in all of us. We are a team of developers and UX designers who met while attending our respective bootcamps at General Assembly. We are currently working towards our very first MVP.


## Getting Started

In order to run on localhost, you need a valid google maps [api key](https://developers.google.com/maps/documentation/javascript/get-api-key). You must create a `.env.local` file inside ./src to save your key in the following format:
`REACT_APP_GOOGLE_API_KEY={enter_valid_api_key}`

### Installation

Install dependencies with
```bash
npm install
```
Run the development server with
```bash
npm start
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Map Component Cheat Sheet

```
<Map />
```

### Event Handlers

##### onClick

also see: onDblclick, onRightclick
```
    onClick={this.handleClick}
```
```
    // handleClick is a method
    handleClick = (props, map, event) => {
        // gives you access to all map props
        // gives you access to the map object
        // event object
    }
```
##### onDragend

also see onDragstart
```
    onDragend={this.handleDrag}
```
```
    handleDrag = (props, map) => {
        // gives you access to all map props
        // gives you access to the map object
    }
```
##### onZoom_changed
```
    onZoom_changed={this.handleZoom}
```
```
    handleZoom = (props, map) => {
        // gives you access to all map props
        // gives you access to the map object
    }
```
##### onCenter_changed
```
    onCenter_changed={this.handleCenter_change}
```
```
    handleClick = (props, map) => {
        // gives you access to all map props
        // gives you access to the map object
    }
```
##### onBounds_changed
```
    onBound_changed={this.handleBounds_change}
```
```
    handleBounds_change = (props, map) => {
        // gives you access to all map props
        // gives you access to the map object
    }
```

## Available Scripts

In the project directory, you can run:
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
