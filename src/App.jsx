import "./App.css"
import Header from "./componentes/header/Header"
import Footer from "./componentes/footer/Footer"
import NavBar from "./componentes/nav/Nav"
import Login from "./pages/login/Login"

export default function App(){
    return(
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <Footer></Footer>
        </div>
    )
}