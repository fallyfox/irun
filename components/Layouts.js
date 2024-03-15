import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export function Layouts({children}) {
    return (
        <>
        <NavBar/>
        {children}
        <Footer/>
        </>
    )
}