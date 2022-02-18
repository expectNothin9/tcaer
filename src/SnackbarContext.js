import { createContext, useContext, useState } from 'react'

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
