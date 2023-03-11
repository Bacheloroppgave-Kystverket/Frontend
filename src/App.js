import "./App.css";
import AppBar from "./components/openBridge/AppBar";
import Card from "./components/openBridge/Card";
import Sessions from "./pages/Sessions";

function App() {
  return (
    <div className="App">
      <AppBar />
      <div>
        <Sessions />
      </div>
    </div>
  );
}

export default App;
