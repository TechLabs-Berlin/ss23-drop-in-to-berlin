import './App.css';
import { useContext, useEffect } from 'react';
import RestContext from './context/RestContext';
import RestList from './components/RestList';

function App() {

  const { fetchRandomRestaurants, restaurants } = useContext(RestContext);
  //destructuring to get fetchBooks function from the provider BooksContext





  return (
    <div>
      <RestList/>
    </div>
  );
}

export default App;
