import './App.css';
import BreweryList from './BreweryList';
import BreweryDetails from './BreweryDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BreweryList />} />
          <Route path="/:id" element={<BreweryDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
