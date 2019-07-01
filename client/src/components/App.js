import React, { useContext } from 'react';
import '../styles/App.css';
import { Store } from '../store/Store'

function App() {
  const { state } = useContext(Store)
  return (
    <React.Fragment>
      {console.log(state, 'dashboard')}
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
