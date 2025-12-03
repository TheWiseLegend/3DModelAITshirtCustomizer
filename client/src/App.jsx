import Canvas from './canvas/index.jsx';
import Cuztomizer from './pages/Customizer.jsx';
import Home from './pages/Home.jsx';
function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Cuztomizer />
      <Canvas />
    </main>
  );
}

export default App;
