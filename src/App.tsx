import React from 'react';
import './App.css';
import DriversDisplay from './components/DriversDisplay';
import AppHeader from './components/AppHeader';
import { SWRConfig } from 'swr';

function App() {
  return (
    <SWRConfig 
      value={{
        fetcher: (url: string) => fetch(url).then(res => res.json())
      }}
    >
      <AppHeader />
      <div className="App">
        <main>
          <DriversDisplay />
        </main>
      </div>
    </SWRConfig>
  );
}

export default App;
