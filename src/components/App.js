import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './home/Home';
import Categories from './categories/Categories';
import FormFood from './foods/FormFood';
import GroceryList from './groceryList/GroceryList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/categories' element={<Categories />} />
          <Route exact path='/grocery-list' element={<GroceryList />} />
          <Route exact path='/search' element={<FormFood />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
