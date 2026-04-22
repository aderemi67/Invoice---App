import "./index.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Invoice App</h1>
        <button className="btn">New Invoice</button>
      </header>

      <main className="container">
        <p>No invoices yet</p>
      </main>
    </div>
  );
}

export default App;