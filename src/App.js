import './App.css'

import Greeting from './Greeting'
import Counter from './Counter'
import RecordsList from './RecordsList'
import PollingExample from './PollingExample'
import LastNameWithContext from './LastNameWithContext'
import LastNameWithoutContext from './LastNameWithoutContext'
import { SnackbarContextProvider, Snackbar } from './SnackbarContext'
import Ad from './Ad'
import CheckInForm from './CheckInForm'

const App = () => {
  return (
    <SnackbarContextProvider>
      <div className="app">
        <Greeting userName="CodeSandbox" />
        <Counter />
        <CheckInForm />
        <RecordsList />
        <PollingExample />
        <LastNameWithContext />
        <LastNameWithoutContext />
        <Snackbar />
        <Ad />
      </div>
    </SnackbarContextProvider>
  )
}

export default App
