import "./App.css"
import Header from "./componentes/header/Header"
import Footer from "./componentes/footer/Footer"
import NavBar from "./componentes/nav/Nav"
import Terminos from "./pages/terminos/Terminos"

export default function App(){
    return(
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <Terminos></Terminos>
            <Footer></Footer>
        </div>
    )
}
