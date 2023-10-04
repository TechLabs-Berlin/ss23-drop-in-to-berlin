import './App.css';
import MainPage from './pages/MainPage/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import RestList from './components/RestaurantList/RestaurantListBE';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/rest/:id" element={<DetailsPage/>} />
          <Route path="/restlist" element={<RestList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
