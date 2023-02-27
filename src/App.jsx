import React from 'react';
import ContextApi from './Context/ContextApi';
import './App.css';
import Table from './components/Table/Table';

function App() {
  return (
    <ContextApi>
      <Table />
    </ContextApi>
  );
}

export default App;
