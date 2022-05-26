import { createContext, useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Cookies from 'js-cookie'
// import jwt from 'jsonwebtoken'


const INITIAL_STATE = {
  isLogged: false,
  user: {},
  address: {}
}

export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {

  const [ authState, setAuthState ] = useState(INITIAL_STATE)
  const { data, status } = useSession()

  useEffect(() => {
    if ( status === 'authenticated' ) {
      setLogged(data.user)
    }
  
  }, [ status, data ])

  const setLogged = (user) => {
    try {
      const address = Cookies.get('address') ? JSON.parse(Cookies.get('address')) : {}
      setAuthState({ user: { ...user }, address , isLogged: true })
    } catch (error) {
      logout()
    }
  }

  const logout = () => {
    Cookies.remove('cart')
    Cookies.remove('address')
    signOut()
  }


  //  Metetodos de login sin NextAuth
  /*
  useEffect(() => {
    if (Cookies.get('token')) {
      setLogged(Cookies.get('token'))
    }
  }, [])

  const setLogged = (token) => {
    try {
      const data = jwt.decode(token)
      const address = Cookies.get('address') ? JSON.parse(Cookies.get('address')) : {}
      setAuthState({ user: { ...data.user }, address , isLogged: true })
      Cookies.set('token', token)
    } catch (error) {
      logout()
    }
  }

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('cart')
    Cookies.remove('address')
    setAuthState(INITIAL_STATE)
  }
  */

  const setAddress = (address) => {
    setAuthState({ ...authState, address: { ...address }})
    Cookies.set('address', JSON.stringify(address))
  }

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState, setLogged, logout, setAddress }}>
      {children}
    </AuthContext.Provider>
  )
}