import { useState, useEffect } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    // Logic to check expiry of token (to be implemented)
    const isTokenValid = async (token) => {
        return true;
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');

        if (storedToken && isTokenValid(storedToken)) {
            setUser(localStorage.getItem('user-data') || { auth: storedToken, username: "not known" });
        }
    }, []);

    const login = async (credentials) => {
        setIsLoading(true); // Set loading state to true
        try {
            // Commented as the api was giving 400
            // const response = await fetch('https://dummyjson.com/auth/login', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     ...credentials,
            //     expiresInMins: 30
            //   }),
            // });

            const response = await new Promise((resolve, reject) => {
                resolve({
                    ok: true,
                    status: 200,
                    statusText: "OK",
                    json: () => ({
                        user: {
                            auth: Date.now(),
                            username: credentials?.username || "not known"
                        }
                    })
                });
            });


            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('auth_token', data.token);
                console.log("Logged In")
                setError(null);
                setUser(data.user);
                return true;
            } else {
                setError('Login failed. Please check your credentials.');
                return false;
            }
        } catch (err) {
            setError('Login error: ' + err.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    return { user, error, isLoading, login, logout };
};

export default useAuth;