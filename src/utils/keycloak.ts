import Keycloak from "keycloak-js";


// Configure Keycloak
const keycloak = new Keycloak({
    url: localStorage.getItem("keycloak-address") ?? "http://localhost:9000",
    realm: "xvpt-realm",
    clientId: "xvpt",
});

// Initialize Keycloak
export const initializeKeycloak = (): Promise<Keycloak> => {
    return new Promise((resolve, reject) => {
        keycloak
            .init({ onLoad: "login-required", pkceMethod: "S256" }) // Use login-required for automatic login
            .then((authenticated) => {
                if (authenticated) {
                    console.log("Authenticated");
                    resolve(keycloak);
                } else {
                    console.log("Not authenticated");
                    reject("Authentication failed");
                }
            })
            .catch((error) => {
                console.error("Error initializing Keycloak", error);
                reject(error);
            });
    });
};

// A function to handle logout
export const logout = () => {
    keycloak.logout();
};

// Get the access token
export const getToken = (): string | undefined => {
    return keycloak.token;
};

// Function to check if the user is authenticated
export const isAuthenticated = (): boolean => {
    return keycloak.authenticated ?? false;
};

export default keycloak;
