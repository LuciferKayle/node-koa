import React from 'react';
import Home from './pages/home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Detail from './pages/detail';
import MicroPage from './pages/microPage';

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/micropage" component={MicroPage}/>
      </Router>
    </div>
  );
}

export default App;
