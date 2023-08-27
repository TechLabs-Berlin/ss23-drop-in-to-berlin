import './App.css';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBarPage from './pages/SearchBarPage';
import DetailsPage from './pages/DetailsPage';
import RestList from './components/RestList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/rest/:id" element={<DetailsPage/>} />
          <Route path="/searchbar" element={<SearchBarPage />} />
          <Route path="/restlist" element={<RestList />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
