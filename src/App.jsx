import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from "./layout/Header.jsx";
import PageBody from "./layout/PageBody.jsx";
import Footer from "./layout/Footer.jsx";
import PRListPage from "./features/PRList/PRListPage.jsx";
import About from "./features/about/About.jsx";
import './assets/styles/App.css';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <PageBody>
          <Routes>
            <Route path="/" element={<PRListPage />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </PageBody>
        <Footer />
      </BrowserRouter>
    </>
  );
}
