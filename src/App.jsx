import "./App.css"
import Header from "./componentes/header/Header"
import Footer from "./componentes/footer/Footer"
import NavBar from "./componentes/nav/Nav"
import Micuenta from "./pages/miCuenta/editarEstilos/EditarEstilos"

export default function App(){
    return(
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <Micuenta />
            <Footer></Footer>
        </div>
    )
}
