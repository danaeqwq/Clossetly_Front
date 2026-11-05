
import Header from "./componentes/header/Header"
import Footer from "./componentes/footer/Footer"
import NavBar from "./componentes/nav/Nav"
import PreguntaFrecuentes from "./pages/preguntasFrecuentes/preguntaAbierta/PreguntaAbierta"
import Boutique from "./pages/boutique/Boutique"
export default function App(){
    return(
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <Boutique/>
            <Footer></Footer>
        </div>
    )
}
