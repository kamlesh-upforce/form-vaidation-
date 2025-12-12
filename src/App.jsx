// src/App.jsx
import React from 'react';
import PostalCodeForm from './PostalCodeForm';
// You might also want to remove the default styles in src/index.css or src/App.css
// for a cleaner starting point.

function App() {
  return (
    <div className="App">
      {/* Render the validation form */}
      <PostalCodeForm />
    </div>
  );
}

export default App;