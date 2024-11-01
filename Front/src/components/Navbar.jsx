import { Link } from "react-router-dom"

export default function Navbar(){
    return(
        <>
            <nav className=" w-full h-16 bg-sky-700 flex items-center justify-around">
                <Link to={'/'} className="text-white">Cadastrar</Link>
                <Link to={'/visualizar'}  className="text-white">Visualizar</Link>
                <Link to={'/atualizar'}  className="text-white">Atualizar</Link>
                <Link to={'/deletar'}  className="text-white">Deletar</Link>
            </nav>
        </>
    )
}