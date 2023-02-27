import React from 'react';
import ContextApi from './Context/ContextApi';
import './App.css';
import Table from './components/Table/Table';
import SearchName from './components/Search/SearchName';

function App() {
  return (
    <ContextApi>
      <SearchName />
      <Table />
    </ContextApi>
  );
}

export default App;
