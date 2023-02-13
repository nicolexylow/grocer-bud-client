// import React, { useState, useEffect } from 'react';
// import CategoryItem from '../categories/CategoryItem';
// import AddCategory from './AddCategory'

// const Categories = ({ categories }) => {
//   return (
//     <div>
//       {categories.map((category, index) => (
//         <CategoryItem key={index} category={category} />
//       ))}
//             <AddCategory />
//     </div>
//   );
// };

// export default Categories;
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from "firebase/auth";


const Categories = () => {

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
         
    }, [])

    return (
        <div>
            <NavBar />
            Hello from the categories page
        </div>
    )
}


