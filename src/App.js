import "./App.css";
import Login from "./component/Login";

function App() {

  return (
    <div className="bg-green-700 flex flex-col items-center justify-center min-h-screen space-y-10">
      <div className="text-center text-4xl">Chat App</div>
      <div>
        <div>
          <Login />
        </div>
      </div>
    </div>
  );
}

export default App;
