import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

export const AuthContext = createContext<any | null>(null)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [user, setUser] = useState(null)

  const checkLoginState = useCallback(async () => {
    try {
      const data: Response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/logged_in`,
        {
          method: 'GET ',
        }
      )
      const { logged_in: isLoggedIn, user } = await data.json()
      setLoggedIn(isLoggedIn)
      user && setUser(user)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    checkLoginState()
  }, [checkLoginState])

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
