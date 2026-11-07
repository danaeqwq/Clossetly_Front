
import Header from "./componentes/header/Header"
import Footer from "./componentes/footer/Footer"
import NavBar from "./componentes/nav/Nav"
import GestionPublicaciones from "./pages/admin/gestionPublicaciones/GestionPublicaciones"

export default function App(){
    return(
        <div>
            <Header seccion="Admin"></Header>
            <NavBar></NavBar>
            <GestionPublicaciones/>
            <Footer></Footer>
        </div>
    )
}
