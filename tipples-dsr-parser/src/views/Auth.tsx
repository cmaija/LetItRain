import { useContext, useEffect, useState } from 'react'
import AuthContextProvider, { AuthContext } from '../contexts/Auth'

const Auth = () => {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext)
  const [coa, setCoa] = useState<any | null>()
  useEffect(() => {
    ;(async () => {
      if (loggedIn === true) {
        try {
          // Get posts from server
          const getCoa = await fetch(`${import.meta.env.SERVER_URL}/coa`)
          setCoa(await getCoa.json())
        } catch (err) {
          console.error(err)
        }
      }
    })()
  }, [loggedIn])

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.SERVER_URL}/auth/logout`, {
        method: 'POST',
      })
      // Check login state again
      checkLoginState()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <h3>Dashboard</h3>
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </>
  )
}
