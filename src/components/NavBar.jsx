import { NavLink } from 'react-router-dom'

const NavBar = () => {

    const testEnd = 'hello'
    return (
        <div>
            <NavLink to='/'>
                Home
            </NavLink>
            
            <NavLink to='/grocery-list'>
                Grocery List
            </NavLink>

            <NavLink to='/stores'>
                Stores
            </NavLink>

            <NavLink to={'/categories/' + testEnd}>
                Items
            </NavLink>
        </div>
    )
}

export default NavBar