import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'
import Routes from './routes'
import Header from './components/Header'

function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
