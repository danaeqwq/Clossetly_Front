import "./App.css"
import Header from "./componentes/header/Header"
import Footer from "./componentes/footer/Footer"
import NavBar from "./componentes/nav/Nav"
import Login from "./pages/login/Login"
import Terminos from "./pages/terminos/Terminos"
import Explorar from "./pages/explorar/Explorar"
import Notificaciones from "./componentes/notificaciones/Notificaciones"
import MiArmario from "./pages/miArmario/MiArmario"
import Boutique from "./pages/boutique/Boutique"
export default function App(){
    return(
        <div>
            <Header seccion="Mi armario"></Header>
            <NavBar></NavBar>
            <MiArmario></MiArmario>
            <Footer></Footer>
        </div>
    )
}
