import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './home/Home';
import SignUp from './signUp/SignUp';
import LogIn from './login/LogIn';
import Categories from './categories/Categories';
import GroceryList from './groceryList/GroceryList';
import Stores from './stores/Stores';
import Items from './items/Items';

function App() {

  const testEnd = 'hello'

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/sign-up' element={<SignUp />} />
          <Route exact path='/login' element={<LogIn />} />
          <Route exact path='/categories' element={<Categories />} />
          <Route exact path='/grocery-list' element={<GroceryList />} />
          <Route exact path='/stores' element={<Stores />} />
          <Route exact path={'/categories/' + testEnd} element={<Items />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
