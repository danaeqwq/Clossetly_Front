import "./App.css"
import "./styles/global.css"
import Login from "./pages/login/Login"
import Header from "./componentes/header/Header"
import Nav from "./componentes/nav/Nav"
import Footer from "./componentes/footer/Footer"
export default function App(){
    return(
        <div>
            <Header></Header>
            <Nav></Nav>
            <Login></Login>
            <Footer></Footer>
        </div>
    )
}