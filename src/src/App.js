import React from 'react';
import Home from './pages/home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Detail from './pages/detail';

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:id" component={Detail} />
      </Router>
    </div>
  );
}

export default App;
