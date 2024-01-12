import './App.css';
import './components/Layout/Layout.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import About from './components/About';
import AboutNya from './components/AboutNya';
import AboutChristine from './components/AboutChristine';
import AboutPaula from './components/AboutPaula';
import AboutHenry from "./components/AboutHenry";
import AboutFrancis from "./components/AboutFrancis";
import ProfilePage from "./components/ProfilePage";
import { Map } from './components/Map';
import { NavigationBar } from './components/NavigationBar';
import { SignIn } from "./components/SignIn";
import { RegistrationForm } from "./components/Registration";
import JestExample from './components/JestExample';

function App() {
  return (
    <div className="App">

      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/aboutnya" element={<AboutNya />} />
          <Route exact path="/aboutChristine" element={<AboutChristine />} />
          <Route exact path="/aboutpaula" element={<AboutPaula />} />
          <Route exact path="/abouthenry" element={<AboutHenry />} />
          <Route exact path="/aboutfrancis" element={<AboutFrancis />} />
          <Route exact path = "/profile" element={<ProfilePage/>}/>
          <Route exact path="/map" element={<Map />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<RegistrationForm />} />
          <Route exact path="/jest" element={<JestExample />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
