import './App.css'
import {useEffect, useState} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import CompetitionPage from "./components/CompetitionPage/CompetitionPage.tsx";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import {isAuthenticated} from "./utils/auth-utils.ts";
import RegisterPage from "./components/RegisterPage/RegisterPage.tsx";
import UserPage from "./components/UserPage/UserPage.tsx";


function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(isAuthenticated());
    }, []);

    if (!authenticated) {
        return (
            <>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage/>} />
                        <Route path="/register" element={<RegisterPage/>} />
                    </Routes>
                </HashRouter>
            </>
        );
    }

    return (
        <>
            <HashRouter>
                {authenticated && <Navbar/>}
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/competition/:id" element={<CompetitionPage/>}/>
                    <Route path="/user" element={<UserPage/>}/>
                </Routes>
            </HashRouter>
        </>
    );
}

export default App
