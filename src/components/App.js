import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './home/Home';
import Categories from './categories/Categories';
import GroceryList from './groceryList/GroceryList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/categories' element={<Categories />} />
          <Route exact path='/grocery-list' element={<GroceryList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
