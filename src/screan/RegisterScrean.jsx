import { useState } from "react";
import "./Registerscrean.css";
import { Register } from "../servis/auth";

const RegisterScreen = () => {
  const registerFields = { name: "name", email: "email", password: "password" };
  const initialForm = {
    [registerFields.name]: "",
    [registerFields.email]: "",
    [registerFields.password]: "",
  };

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
      const data = await Register(form.name, form.email, form.password);
      if (data.success) {
        setMessage("✅ Usuario registrado y correo enviado.");
        setForm(initialForm);
      } else {
        setMessage(`❌ ${data.message || "Error desconocido"}`);
      }
    } catch (error) {
      console.error("[REGISTER ERROR]:", error);
      setMessage("❌ Ocurrió un error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="RegisterPage">
      <div className="RegisterPage__container">
        <h1 className="RegisterPage__title">Regístrate</h1>
        <form className="RegisterPage__form" onSubmit={handleSubmit}>
          <label className="RegisterPage__label">Nombre de Usuario</label>
          <input
            type="text"
            placeholder="Escribe tu nombre de usuario"
            value={form[registerFields.name]}
            name={registerFields.name}
            onChange={onInputChange}
            className="RegisterPage__input"
            required
          />

          <label className="RegisterPage__label">Email</label>
          <input
            type="email"
            placeholder="Escribe tu Email"
            value={form[registerFields.email]}
            name={registerFields.email}
            onChange={onInputChange}
            className="RegisterPage__input"
            required
          />

          <label className="RegisterPage__label">Contraseña</label>
          <input
            type="password"
            placeholder="Escribe tu contraseña"
            value={form[registerFields.password]}
            name={registerFields.password}
            onChange={onInputChange}
            className="RegisterPage__input"
            required
          />

          <button
            type="submit"
            className="RegisterPage__button"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {message && <p className="RegisterPage__message">{message}</p>}
      </div>
    </div>
  );
};

export default RegisterScreen;
