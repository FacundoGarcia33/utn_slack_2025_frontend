import { useState } from "react";
import { useNavigate } from "react-router";
import "./loginScrean.css";
import { Login } from "../servis/auth.js";

const LoginScreen = () => {
  const navigate = useNavigate();
  const loginFields = { email: "email", password: "password" };
  const initialForm = { [loginFields.email]: "", [loginFields.password]: "" };

  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await Login(form.email, form.password);

      if (data.success) {
        // 🔒 Guarda el token en localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        setMessage("✅ Inicio de sesión correcto.");
        setForm(initialForm);

        // Redirige después de un breve delay
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setMessage(`❌ ${data.message || "Email o contraseña incorrectos"}`);
      }
    } catch (error) {
      console.error("[LOGIN ERROR]:", error);
      setMessage("❌ Ocurrió un error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage__container">
        <h1 className="LoginPage__title">Iniciar Sesión</h1>
        <form className="LoginPage__form" onSubmit={handleSubmit}>
          <label className="LoginPage__label">Email</label>
          <input
            type="email"
            placeholder="Escribe tu Email"
            value={form[loginFields.email]}
            name={loginFields.email}
            onChange={onInputChange}
            className="LoginPage__input"
            required
          />

          <label className="LoginPage__label">Contraseña</label>
          <input
            type="password"
            placeholder="Escribe tu contraseña"
            value={form[loginFields.password]}
            name={loginFields.password}
            onChange={onInputChange}
            className="LoginPage__input"
            required
          />

          <button
            type="submit"
            className="LoginPage__button"
            disabled={loading}
          >
            {loading ? "Iniciando..." : "Ingresar"}
          </button>
        </form>

        {message && <p className="LoginPage__message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginScreen;
