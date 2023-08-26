import './App.css';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import RestDetails from './components/RestDetails';
import RestList from './components/RestList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/rest/:id" element={<RestDetails />} />
          <Route path="/searchbar" element={<SearchBar />} />
          <Route path="/restlist" element={<RestList />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
