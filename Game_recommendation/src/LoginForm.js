import { useState } from "react";
import { login, getUser } from "./services/auth";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const handleLogin = async () => {
        await login(username, password);
        const userData = await getUser();
        setUser(userData);
    };

    return (
        <div>
            {!user ? (
                <div>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div>Welcome, {user.username}!</div>
            )}
        </div>
    );
}

export default LoginForm;
