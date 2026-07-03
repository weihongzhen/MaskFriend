import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CharacterSelect } from './pages/CharacterSelect';
import { ChatPage } from './pages/ChatPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterSelect />} />
        <Route path="/chat/:characterId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}
