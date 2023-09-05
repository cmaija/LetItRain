import { Card } from './Card'

const Login = () => {
  const handleLogin = async () => {
    try {
      // Authenticates the user on the server with quickbooks
      const authUri = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/authorize`,
        {
          method: 'GET',
        }
      )
      const url = await authUri.json()
      console.log(url)

      window.open(url, '_self')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Card>
      <h3>Login to Quickbooks!</h3>
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </Card>
  )
}

export default Login
