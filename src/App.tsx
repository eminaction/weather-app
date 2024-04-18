import "react";
import "./App.css";
//import { useState } from 'react'
import "./App.css";

import Header from "./components/header/header";
import SearchBar from "./components/searchbar/searchbar.tsx";
// import Results from "./components/results/results";
import Footer from "./components/footer/footer";
import Share from "./components/share/share.tsx";

function App() {
  return (
    <>
      <Header />
      <>
        <SearchBar />
      </>

      <Footer />
      <Share />
    </>
  );
}

export default App;
