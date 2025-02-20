# Doom Reactive State

Super simple reactive state management with fine-grained reactive DOM elements.

[![npm](https://img.shields.io/npm/v/doom-reactive-state?color=44CC11)](https://www.npmjs.com/package/doom-reactive-state)
&nbsp;
[![dependencies](https://img.shields.io/badge/dependencies-0-blue.svg?colorB=44CC11)](https://www.npmjs.com/package/doom-reactive-state?activeTab=dependencies)
&nbsp;
[![Test](https://github.com/AlessioCoser/doom-state-js/actions/workflows/test.yml/badge.svg)](https://github.com/AlessioCoser/doom-state-js/actions/workflows/test.yml)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/doom-reactive-state)
&nbsp;
[![license](https://img.shields.io/badge/license-MIT-blue.svg?colorB=007EC6)](https://spdx.org/licenses/MIT)

## Features
1. :gem: Zero dependencies
2. :zap: No compilation required
3. :surfer: Super-Easy reactive concepts (signal, effect, derive)
4. :four_leaf_clover: No magic, you create components that are simple HTMLElements
5. :blossom: Just a few lines of code
6. :hatching_chick: Only a single HTMLElement wrapper to enable a **fine-grained reactivity** on Element properties
7. :lipstick: Some helper functions to easily create common reactive HTMLElement such as `Div`, `P` and `Span`.

## Examples
You can find some examples here: [Examples](https://github.com/AlessioCoser/doom-reactive-state/tree/master/examples)

## Install
Use your preferred package manager:
- `npm install doom-reactive-state`
- `yarn add doom-reactive-state`
- `pnpm add doom-reactive-state`

## Getting Started

This is a simple increment counter component
```javascript
const { signal, Div, H2, Button, Span, d } = require("doom-reactive-state")

const App = () => {
  const [count, setCount] = signal(0)

  const onclick = () => setCount(count() + 1)

  return Div([
    H2(['Count: ', Span(d`${count}`)]),
    Button({ onclick }, 'increment'),
  ])
}

document.body.appendChild(App())
```

### With Node.js - only pure reactive state

1. Create a file called index.js
    ```javascript
    const { signal, effect } = require("doom-reactive-state")

    const [count, setCount] = signal(1)

    setInterval(() => setCount(count() + 1), 1000)

    effect(() => console.log(count()))
    ```
2. Run the file with node
    ```
    node index.js
    ```
3. You will see that every second the incremented number will be printed


### Use it directly inside the HTML
You can load the script from the github release url and start use it right away.
```html
<html>
  <head>
    <!-- other stuff -->
    <script src="https://github.com/AlessioCoser/doom-reactive-state/releases/download/1.1.2/doom-reactive-state.global.js"></script>
  </head>
  <body>
    <script type="application/javascript">
      function HelloWorldApp() {
        return doom.Span("Hello World!")
      }

      document.body.appendChild(HelloWorldApp());
    </script>
  </body>
</html>
```

# Contributing

## Run Tests
```
npm test
```

## Run Dev
this runs an application present in dev folder with vite
```
npm run dev
```

## Publish a new package version
If I want to publish the new `0.0.1` version I need to create and push a new `0.0.1` tag:
```bash
git tag 0.0.1
git push --tags
```
The Github Action will take care to publish the package with the tag name as version
