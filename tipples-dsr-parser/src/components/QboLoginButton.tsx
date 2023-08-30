const Login = () => {
  const handleLogin = async () => {
    try {
      // Authenticates the user on the server with quickbooks
      const authUri = await fetch(`${import.meta.env.SERVER_URL}/authorize`, {
        method: 'GET',
      })
      const url = await authUri.json()
      console.log(url)

      // Open auth popup
      var parameters = 'location=1,width=800,height=650'
      parameters +=
        ',left=' +
        (screen.width - 800) / 2 +
        ',top=' +
        (screen.height - 650) / 2
      var win = window.open(url, 'connectPopup', parameters)
      var pollOAuth = window.setInterval(function () {
        try {
          if (win?.document.URL.indexOf('code') != -1) {
            window.clearInterval(pollOAuth)
            win?.close()
            location.reload()
          }
        } catch (e) {
          console.log(e)
        }
      }, 100)
      // Navigate to consent screen
      window.location.assign(url)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <h3>Login to Dashboard</h3>
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </>
  )
}

export default Login
