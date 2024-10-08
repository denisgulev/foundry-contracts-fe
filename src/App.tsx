import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';

interface CurrentUserContextType {

  account: string | null;

  setAccount: React.Dispatch<React.SetStateAction<string | null>>;

}

export const CurrentUserContext = createContext<CurrentUserContextType>({

  account: null,

  setAccount: () => { },

});

const App: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  return (
    <CurrentUserContext.Provider value={{ account, setAccount }}>
      <div className="cyberpunk-app">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Router>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
