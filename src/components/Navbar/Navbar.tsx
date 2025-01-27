import {Link, useNavigate} from "react-router-dom";
import keycloak from "../../utils/keycloak.ts";
import {useEffect, useState} from "react";
import {KeycloakProfile} from "keycloak-js";

function Navbar() {
    const [profile, setProfile] = useState<KeycloakProfile | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (keycloak.authenticated) {
            // 加载用户资料
            keycloak.loadUserProfile()
                .then((profileData) => {
                    setProfile(profileData);
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Failed to load user profile:", error);
                });
        }
    }, [keycloak]);

    return (<>
        <nav className="shadow-2xl  p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">🍍XVPT</div>
                <div className="space-x-6">
                    <Link to="/" className="hover:text-blue-300">主页</Link>
                    <Link to="/user" className="hover:text-blue-300">{profile?.username}</Link>
                </div>
            </div>
        </nav>
    </>);
}

export default Navbar;