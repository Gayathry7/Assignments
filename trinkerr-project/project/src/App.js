import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import { SearchComponent } from './components/SearchComponent';
import { Navbar } from './components/Navbar';
import { WishListComponent } from './components/WishListComponent';

function App() {

  return (
    <div className="App">
       <h2>Hey...</h2>
        <p>Enjoy searching the Stocks and Add all your favourite stocks to your watch list !</p>
            <br/>
            <hr/>
            <br/>


     <Navbar/>
     
     <Routes>
       <Route path= '/' element={<SearchComponent/>}/>
       <Route path= '/watchList' element={<WishListComponent/>}/>

     </Routes>
    </div>
  );
}

export default App;
