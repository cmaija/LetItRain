import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Upload from './views/upload/Upload'
import ReportContextProvider from './contexts/Reports'

function App() {
  return (
    <ReportContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Upload />} />
        </Routes>
      </Router>
    </ReportContextProvider>
  )
}
export default App
