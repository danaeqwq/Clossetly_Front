import "./App.css"
import Header from "./componentes/header/Header";
import Footer from "./componentes/footer/Footer";
import Nav from "./componentes/nav/Nav";
import PropuestaDeIntercambio from "./pages/propuesta de intercambio/PropuestaDeIntercambio";

export default function App() {
  return (
    <>
      <Header seccion="Propuesta de intercambio" />
      <Nav />
      <PropuestaDeIntercambio />
      <Footer />
    </>
  );
}
