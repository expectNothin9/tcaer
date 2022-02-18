# React Introduction

## What is React?

A JavaScript library for building UIs (developd at ~~Facebook~~ Meta and released in 2013).

## Why React?

- npm trends: https://www.npmtrends.com/@angular/core-vs-react-vs-vue-vs-jquery
- awesome-react: https://github.com/enaqx/awesome-react

Thanks to massive ecosystem of React, it's easily to find examples, solutions or best practices while building a complicated application.

## How to develop React application?

Highly recommend to develop React through an integrated toolchain (e.g. [Create React App](https://github.com/facebook/create-react-app)).

- Take care tedious stuffs for you. For example, [Babel](https://babeljs.io/) for transpiling and [webpack](https://webpack.js.org/) for bundling.
- Live-editing CSS and JS in development.
- Don't require configuration to get started.

There are also online playgrounds to play around with React, such like [CodeSandbox](https://codesandbox.io/s/new)'s React template.

In addition, more [toolchains](https://en.reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains) out there for different purposes.

## Write React in **Functional Component** manner

**Functional Component** is a JavaScript function that return HTML or UI which is written in **JSX** syntax.

```js
const App = () => {
  return (
    <div className="app">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  )
}
```

- Component name should be **UpperCamelCase**
- Use [`arrow function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

## Pass data into Component through `props` argument

```js
const Greetings = (props) => (
  <>
    <h1>Hello, {props.userName}</h1>
    <h2>Start editing to see some magic happen!</h2>
  </>
)

const App = () => {
  return (
    <div className="app">
      <Greetings userName="CodeSandbox" />
    </div>
  )
}
```

- Variables should be **camelCase**
- Arrow function's `{}` can be omitted if you're going to return directly
- `<></>` is React fragment syntax (for component breaking **ONE** top level element rule)

## `PropTypes` check

```js
import PropTypes from 'prop-types'

const Greeting = ({ userName }) => (
  <>
    <h1>Hello {userName}</h1>
    <h2>Start editing to see some magic happen!</h2>
  </>
)
Greeting.propTypes = {
  userName: PropTypes.string.isRequired
}
```

- [Object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring) syntax
- `PropTypes` check is recommended to enhance code quality

## Conditional Rendering

```js
const DayNightEmoji = () => {
  const date = new Date()
  const hour = date.getHours()
  return hour >= 6 || hour < 18 ? <span>🌞</span> : <span>🌙</span>
}

const Greeting = ({ userName, withDayNight }) => (
  <>
    <h1>
      {withDayNight && <DayNightEmoji />}
      Hello {userName}
    </h1>
    <h2>Start editing to see some magic happen!</h2>
  </>
)
Greeting.propTypes = {
  userName: PropTypes.string.isRequired,
  withDayNight: PropTypes.bool
}
Greeting.defaultProps = {
  withDayNight: true
}
```

- There are several ways for conditional rendering

  - `&&`
  - `? :`
  - `if`
  - `switch`

- Fix `eslint` warnings and errors, or mute it after discussion
- `defaultProps` for assign default value

## Event handling

```js
const DevButton = () => (
  <button onClick={(event) => console.log(event.target.innerHTML)}>Dev Button</button>
)
```

## React Hooks

**Hooks** let you use state and other React features without writing a class. And **Hooks** are a new addition in React `16.8`

- `useState`, `useEffect`, `useContext`, `useRef`, `useCallback`

## `useState` hook

```js
import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="counter">
      <button onClick={() => setCount(count + 1)}>+</button>
      <p>{count}</p>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  )
}
```

- [Array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring) syntax
- `count` is state value (READ)
- `setCount` is a function let you change state (WRITE)
- `0` is initial value of state

## `useEffect` hook

```js
import { useEffect, useState } from 'react'

const RecordsList = () => {
  const [records, setRecords] = useState([])
  useEffect(() => {
    fetch('https://run.mocky.io/v3/a5b3eee6-b559-49f5-8623-94827078fee3')
      .then((resp) => resp.json())
      .then((resp) => setRecords(resp.data))
  }, [])
  return (
    <ul className="records-list">
      {records.map((record) => (
        <li key={record.id}>
          {record.name} {record.date} {record.temperature}
        </li>
      ))}
    </ul>
  )
}
```

- Mock API: https://run.mocky.io/v3/a5b3eee6-b559-49f5-8623-94827078fee3
- Things happened after rendering and without user interaction, for example
  - Fetch API automatically
  - Load data from `localStorage`
- `useEffect` will be executed after every render, so make sure you have correct **dependencies** (e.g. pass an **array** as **second argument** to `useEffect`)
  - Use [exhaustive-deps](https://github.com/facebook/react/issues/14920) rule to lint is highly recommended

```js
import { useState, useEffect } from 'react'

const PollingContent = () => {
  useEffect(() => {
    console.log('polling...')
    const timer = setInterval(() => console.log('polling...'), 5000)
    return () => clearInterval(timer)
  }, [])
  return <p>is polling...</p>
}

const PollingExample = () => {
  const [contentToggle, setContentToggle] = useState(false)
  return (
    <section className="polling-example">
      <button className="toggle-button" onClick={() => setContentToggle(!contentToggle)}>
        toggle
      </button>
      {contentToggle && <PollingContent />}
    </section>
  )
}
```

- `useEffect` with cleanup, for example: **timer**, your effect should return a function that perform the cleanup

## `useContext` hook

```js
import { createContext, useContext } from 'react'

export const LastNameContext = createContext()

const Me = () => {
  const lastName = useContext(LastNameContext)
  return <div>Me, lastName: {lastName}</div>
}

const Father = () => {
  return (
    <div>
      Father -&gt; <Me />
    </div>
  )
}

const Grandpa = () => {
  return (
    <div>
      Grandpa -&gt; <Father />
    </div>
  )
}

const ContextExample = () => {
  return (
    <LastNameContext.Provider value={'Wen'}>
      <Grandpa />
    </LastNameContext.Provider>
  )
}
```

- Share data without passing `props`
- Current **context value** is determined by the value prop of **nearest** `<MyContext.Provider>` above the calling component
  - Component need to be wrapped inside context provider
  - Context value can be overwritten

## More powerful but complicated `useContext` example, `<Snackbar>`

```js
// SnackbarContext.js
import { createContext, useContext, useState } from 'react'
import './Snackbar.css'

const SnackbarContext = createContext()

export const Snackbar = () => {
  const [snackbar, setSnackbar] = useContext(SnackbarContext)
  return snackbar ? (
    <div className="snackbar">
      <p className="message">{snackbar}</p>
      <button className="close-button" onClick={() => setSnackbar(undefined)}>
        X
      </button>
    </div>
  ) : null
}

export const SnackbarContextProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState()
  return (
    <SnackbarContext.Provider value={[snackbar, setSnackbar]}>{children}</SnackbarContext.Provider>
  )
}

export default SnackbarContext
```

```js
// App.js
import { SnackbarContextProvider, Snackbar } from './SnackbarContext'

export default function App() {
  return (
    <SnackbarContextProvider>
      <div className="App">
        {/* ... */}
        <Snackbar />
      </div>
    </SnackbarContextProvider>
  )
}
```

```js
// TiggerSnackbar.js
import SnackbarContext from './SnackbarContext'

const TiggerSnackbar = () => {
  const [, setSnackbar] = useContext(SnackbarContext)
  return <button onClick={() => setSnackbar('Hello Snackbar!')}>trigger snackbar</button>
}
```

- Manage snackbar state and forward it through context approach to give other components **READ**/**WRITE** abilities
  - `const [snackbar, setSnackbar] = useContext(SnackbarContext)`
- Entire application is wrapped in `<SnackbarContextProvider>`, so you can operate snackbar everywhere
- `<Snackbar>` for UI display according to shared state

## `useRef` hook

```js
import { useRef, useEffect, useState } from 'react'

const Ad = () => {
  const adRef = useRef()
  const [display, setDisplay] = useState(true)
  const handleClickOutsideCheck = (event) => {
    if (!adRef.current.contains(event.target)) {
      setDisplay(false)
    }
  }
  useEffect(() => {
    if (adRef.current) {
      document.addEventListener('mousedown', handleClickOutsideCheck)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCheck)
    }
  })
  return display ? (
    <div ref={adRef} className="ad">
      Advertisement
    </div>
  ) : null
}
```

- Allow you to **access the DOM**, if you pass a ref object to React with `<div ref={myRef} />`, React will set its `.current` property to the corresponding DOM node whenever that node changes
  - For example: click outside

## More essential concept of `useRef`

Allow you to create a **mutable** object that will keep the **same reference** between renders

- Mutable value dose NOT re-render UI

### Mutable v.s. Immutable

```js
useEffect(() => {
  if (records.length === 3) {
    setTimeout(() => {
      // mutable
      records.push({
        id: '4',
        name: 'Mutable',
        date: '2022-01-25',
        temperature: 36.5
      })
      setRecords(records)
    }, 5000)
  }
}, [records])
```

```js
useEffect(() => {
  if (records.length === 3) {
    setTimeout(() => {
      // immutable
      const newRecords = [
        ...records,
        {
          id: '4',
          name: 'Immutable',
          date: '2022-02-10',
          temperature: 36.5
        }
      ]
      setRecords(newRecords)
    }, 5000)
  }
}, [records])
```

- `...` is [spread syntax](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- Idea is you should write React application state in **immutable** style
- But if you have something want to store and change without causing re-render, then `useRef` might be a good choice

## `useCallback` hook

```js
import { useCallback, useState } from 'react'

const CheckInForm = () => {
  const [checkInName, setCheckInName] = useState('')
  const handleChangeCheckInName = useCallback((event) => {
    setCheckInName(event.target.value)
  }, [])
  return (
    <form className="check-in-form">
      <label htmlFor="check-in-name">
        Name:
        <input
          id="check-in-name"
          type="text"
          name="name"
          value={checkInName}
          onChange={handleChangeCheckInName}
          autoComplete="off"
        />
      </label>
    </form>
  )
}
```

- Personal recommendation `onSituation={handleSomething}` naming convention
- Returns a **memorized** callback
  - Just like `useEffect`, use [exhaustive-deps](https://github.com/facebook/react/issues/14920) rule to lint is highly recommended

## State management for complicated application

Use [Redux](https://redux.js.org/introduction/getting-started) (⭐️ [57.5k](https://github.com/reduxjs/redux))

## Add `className` on your component appropriately

- Readability of website
- Easy to debug or trace code
- Automation or tracking purpose

## Any question?

CodeSandbox: https://codesandbox.io/s/busy-mirzakhani-4riks
