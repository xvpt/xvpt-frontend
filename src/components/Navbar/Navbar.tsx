import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AuthorizeToken} from "../../entities.ts";

function Navbar() {
    const [username, setUsername] = useState<string | null>()
    const navigate = useNavigate();

    const navigateToUser = () => {
        navigate('/user');
    }

    useEffect(() => {
        const item = localStorage.getItem("token");
        if (item === null) return; // not login
        const token: AuthorizeToken = JSON.parse(item);
        setUsername(token.username);
    }, []);

    return (<>
        <nav className="shadow-2xl  p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">🍍XVPT</div>
                <div className="space-x-6">
                    <Link to="/" className="hover:text-blue-300">主页</Link>
                    {username && <Link to="/user" className="hover:text-blue-300" onClick={navigateToUser}>{username}</Link>}
                </div>
            </div>
        </nav>
    </>);
}

export default Navbar;