import { Route, Routes } from 'react-router-dom'
import DeckDisplayAll from './DeckDisplayAll'
import Home from './Home'

/*Main app container with routing paths*/
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:deckName" element={<DeckDisplayAll />} />
      </Routes>
    </div>
  )
}

export default App
