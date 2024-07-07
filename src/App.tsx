import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import First from "./pages/First"
import Second from "./pages/Second"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/dashboard" element={<Second />} />
      </Routes>
    </Router>
  )
}

export default App