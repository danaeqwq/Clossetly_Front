
import Header from "./componentes/header/Header"
import Footer from "./componentes/footer/Footer"
import NavBar from "./componentes/nav/Nav"
import PreguntaFrecuentes from "./pages/preguntasFrecuentes/preguntaAbierta/PreguntaAbierta"
import Boutique from "./pages/boutique/Boutique"
import PropuestaDeIntercambio from "./pages/propuesta de intercambio/PropuestaDeIntercambio"
export default function App(){
    return(
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <PropuestaDeIntercambio/>
            <Footer></Footer>
        </div>
    )
}
