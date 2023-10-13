interface QuickbooksUploaderProps {
  journalEntry?: {
    credits: {
      [account: string]: number
    }
    debits: {
      [account: string]: number
    }
  }
}

function QuickbooksUploader({ journalEntry }: QuickbooksUploaderProps) {
  function handleLogin() {}
  return (
    <>
      <div>Quickbooks Uploader</div>
      <div>{JSON.stringify(journalEntry)}</div>
      <div>
        <span>Login to Quickbooks</span>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  )
}
