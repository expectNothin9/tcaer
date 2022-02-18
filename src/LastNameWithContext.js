import { createContext, useContext } from 'react'

export const LastNameContext = createContext()

const Me = () => {
  const lastName = useContext(LastNameContext)
  return <div>Me, lastName: {lastName}</div>
}

const Father = () => (
  <div>
    Father -&gt; <Me />
  </div>
)

const Grandpa = () => (
  <div>
    Grandpa -&gt; <Father />
  </div>
)

const LastNameWithContext = () => {
  return (
    <LastNameContext.Provider value={'Wen'}>
      <div className="last-name-example">
        <Grandpa />
      </div>
    </LastNameContext.Provider>
  )
}

export default LastNameWithContext
