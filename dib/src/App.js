import './App.css';
import MainPage from './pages/MainPage/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import RestList from './components/RestaurantList/RestaurantList';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/rest/:id" element={<DetailsPage/>} />
          <Route path="/searchbar" element={<SearchBar />} />
          <Route path="/restlist" element={<RestList />} />
          <Route path="/search/:query" element={<SearchResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
