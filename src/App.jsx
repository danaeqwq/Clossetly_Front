import "./App.css"
import Header from "./componentes/header/Header"
import Footer from "./componentes/footer/Footer"
import NavBar from "./componentes/nav/Nav"
import Terminos from "./pages/terminos/Terminos"
import Explorar from "./pages/explorar/Explorar"
import Notificaciones from "./componentes/notificaciones/Notificaciones"
export default function App(){
    return(
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <Explorar></Explorar>
            <Footer></Footer>
        </div>
    )
}
