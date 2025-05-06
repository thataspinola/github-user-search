import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Results } from './pages/Results'
import { RepoDetails } from './pages/RepoDetails'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results/:username" element={<Results />} />
        <Route path="/results/:username/repos/:repoName" element={<RepoDetails />} />
      </Routes>
    </Router>
  )
}
