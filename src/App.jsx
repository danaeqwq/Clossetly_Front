
import Header from "./componentes/header/Header"
import Footer from "./componentes/footer/Footer"
import NavBar from "./componentes/nav/Nav"
import PreguntaFrecuentes from "./pages/preguntasFrecuentes/preguntaAbierta/PreguntaAbierta"

export default function App(){
    return(
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <PreguntaFrecuentes />
            <Footer></Footer>
        </div>
    )
}
