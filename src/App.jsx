import "./App.css"
import Header from "./componentes/header/Header"
import Footer from "./componentes/footer/Footer"
import NavBar from "./componentes/nav/Nav"
import Favoritos from "./pages/favoritos/favoritosCompra/FavoritosCompra";

export default function App(){
    return(
        <div>
            <Header></Header>
            <NavBar></NavBar>
            <Favoritos></Favoritos>
            <Footer></Footer>
        </div>
    )
}
