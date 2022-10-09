import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Contact from './components/Contact';


function App() {
  
  
  return (
    <div className="App">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
