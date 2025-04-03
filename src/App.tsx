import React from 'react';
import './App.css';
import DriversDisplay from './components/DriversDisplay';
import { SWRConfig } from 'swr';

function App() {
  return (
    <SWRConfig 
      value={{
        fetcher: (url: string) => fetch(url).then(res => res.json())
      }}
    >
      <div className="App">
        <main>
          <DriversDisplay />
        </main>
      </div>
    </SWRConfig>
  );
}

export default App;
