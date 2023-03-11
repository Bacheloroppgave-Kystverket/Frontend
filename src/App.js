import "./App.css";
import AppBar from "./components/AppBar";
import NormalButton from "./components/NormalButton";

function App() {
  return (
    <div className="App">
      <AppBar />
      <div>
        <NormalButton text="This is my button" />
      </div>
    </div>
  );
}

export default App;
