import React from 'react';
import ContextApi from './Context/ContextApi';
import './App.css';
import Table from './components/Table/Table';
import SearchName from './components/Search/SearchName';
import Filtered from './components/Filtered/Filtered';

function App() {
  return (
    <ContextApi>
      <SearchName />
      <Filtered />
      <Table />
    </ContextApi>
  );
}

export default App;
