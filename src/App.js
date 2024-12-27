import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PediatricsTable from './components/PediatricsTable';
import Header from './components/Header';
import { patientsData } from './data/sampleData';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Header />
        <div style={{ padding: '20px' }}>
          <PediatricsTable data={patientsData} />
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default App;