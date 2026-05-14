
import NavBar from "./Sections/Navbar.jsx";
import Hero from "./Sections/Hero.jsx";
import About from "./Sections/About.jsx";
import Treatments from "./Sections/Treatments.jsx";
import Beforeafter from "./Sections/Beforeafter.jsx";
import Choose from "./Sections/Choose.jsx";
import Doctorsection from "./Sections/Doctorsection.jsx"
import Testimonials from './Sections/Testimonials';
import Pricing from './Sections/Pricing.jsx'
import Cta from './Sections/Cta.jsx'
import Contactsection  from './Sections/Contactsection.jsx'
import Footer from "./Sections/Footer.jsx";
function App() {
  return (
    <>
      <NavBar />
      <Hero/>
      <About/>
      <Treatments/>
      <Beforeafter/>
      <Choose/>
      <Doctorsection/>
      <Testimonials/>
      <Pricing/>
      <Cta/>
      <Contactsection />
      <Footer/>
    </>
  );
}

export default App;