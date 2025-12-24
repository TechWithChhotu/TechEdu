import TechEdu from "../src/assets/TechEdu.png";

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      <h1 className="text-4xl font-bold text-green-500">TechEdu 🚀</h1>
      <img src={TechEdu} alt="TechEdu" className="w-32 h-32" />
    </div>
  );
}

export default App;
