import React, {useState} from "react";
import "./styles 1.css"

interface LoginProps {
    onLogin : (email:string, password:string) => void;

}

    const Login: React.FC<LoginProps> = ({onLogin}) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

         const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            onLogin(email, password)
        };

        return (
            <div className="login-container">
                <div className="login-box">
                    <div className="login-image"></div>
                    <div className="login-form">
                        <h2>Iniciar Sesión</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Email:</label>
                                <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input-field"
                                />
                            </div>
                            <div className="input-group">
                                <label>Contraseña:</label>
                                <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-field"
                                />
                            </div>
                            <button type="submit" className="login-button">Iniciar Sesión</button>
                        </form>
                        <div className="login-links">
                            <a href="#">¿Olvidaste tu contraseña tilin?</a>
                            <a href="#">Registrarse</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default Login;