import './App.css';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SearchBarPage from './pages/SearchBarPage';
// import RestaurantDetails from './components/RestaurantDetails';
import RestList from './components/RestList';
import Test from './components/test';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Test />} />
          {/* <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/searchbar" element={<SearchBarPage />} /> */}
          <Route path="/restlist" element={<RestList />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
