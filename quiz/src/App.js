import logo from './logo.svg';
import './App.css';
import Front from "./components/front.jsx"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='front'>
          <Front />
        </div>
      </header>
    </div>
  );
}

export default App;