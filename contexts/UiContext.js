import { createContext, useState } from 'react'

export const UiContext = createContext()

const INITIAL_STATE = {
  openMenu: false
}


export const UiContextProvider = ({ children }) => {
  const [uiContextState, setUiContextState] = useState(INITIAL_STATE)

  return (
    <UiContext.Provider value={{
      uiContextState, setUiContextState
    }}>
      {children}
    </UiContext.Provider>
  )
}