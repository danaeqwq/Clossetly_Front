import "./App.css"
import Header from "./componentes/header/Header"
import Footer from "./componentes/footer/Footer"
import NavBar from "./componentes/nav/Nav"
import PreguntaFrecuentes from "./pages/detalles/detalleConsulta/DetalleConsulta"

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
