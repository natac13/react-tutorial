This is the tutorial of the React website but instead of using the cdn versions of **React** and **ReactDOM** I have used gulp and browserify to compile the JavaScript files together.

## Gulpfile

In order to write the gulpfile in ES6 syntax I needed to run
```
npm install babel-core babel-preset-es2015 babel-preset-react
```
Then create an **.babelrc** file with contents
```
{
    "presets": [
        "es2015",
        "react"
    ]
}
```

## server.js

There was some error with babel-core when trying to write this file using ES6 and running with `babel-node server.js`. So it is just written in ES5 so that I could move passed that speed bump.

## src

This directory is where I am writing the JavaScript code in ES6. Then with the gulp task 'build' browserify will bundle up main.js and place it in the public/js folder.

