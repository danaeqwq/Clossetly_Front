import "./App.css"
import "./styles/global.css"
import Explorar from "./pages/explorar/Explorar"
import Header from "./componentes/header/Header"
import Nav from "./componentes/nav/Nav"
import Footer from "./componentes/footer/Footer"
export default function App(){
    return(
        <div>
            <Header></Header>
            <Nav></Nav>
            <Explorar></Explorar>
            <Footer></Footer>
        </div>
    )
}
