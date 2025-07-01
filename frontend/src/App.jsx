import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navebar';
import Home from './pages/home';
import Portfolio from './pages/portfolio';
import Contact from './pages/contact';
import ServicePage from './pages/service';
import QuotePage from './pages/GetQuote';

import SplashCursor from '../SplashCursor'



function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* PixelTrail background */}
      <div className="fixed inset-0 z-[-1]">
        
<SplashCursor />
      </div>

      <Router>
        <Navbar />
        <div className="pt-20 px-4 md:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/quotepage" element={<QuotePage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
