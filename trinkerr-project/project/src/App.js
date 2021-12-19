import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import { SearchComponent } from './components/SearchComponent';
import { Navbar } from './components/Navbar';
import { WishListComponent } from './components/WishListComponent';

function App() {

  return (
    <div className="App">
     <Navbar/>
     
     <Routes>
       <Route path= '/' element={<SearchComponent/>}/>
       <Route path= '/wishList' element={<WishListComponent/>}/>

     </Routes>
    </div>
  );
}

export default App;
