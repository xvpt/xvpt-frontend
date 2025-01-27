import './App.css'
import {initializeKeycloak, isAuthenticated} from "./utils/keycloak.ts";
import {useEffect, useState} from "react";
import LoadingPage from "./components/LoadingPage/LoadingPage.tsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import CompetitionInfo from "./components/CompetitionInfo/CompetitionInfo.tsx";


function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        initializeKeycloak()
            .then(() => {
                setAuthenticated(isAuthenticated());
            })
            .catch((error) => {
                console.error("Keycloak initialization failed", error);
            });
    }, []);

    return (
        <>
            <HashRouter>
                {authenticated && <Navbar/>}
                <Routes>
                    <Route path="/" element={(!authenticated) ? <LoadingPage/> : <HomePage/>}/>
                    <Route path="/competition/:id" element={<CompetitionInfo/>}/>
                </Routes>
            </HashRouter>
        </>
    );
}

export default App
