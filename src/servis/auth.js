import { ENVAIRMENT } from "../config/envairment";
// 🔹 Registro de usuario
export async function Register(name, email, password) {
  try {
    const body = { name, email, password };

    const res = await fetch(`${ENVAIRMENT.URL_API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.error || data.message || "Error en el registro",
      };
    }

    return {
      success: data.success ?? true,
      message: data.message ?? "Usuario registrado correctamente",
    };
  } catch (error) {
    console.error("🚨 Error de conexión o fetch:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
}

// 🔹 Inicio de sesión
export async function Login(email, password) {
  try {
    const body = { email, password };

    const res = await fetch(`${ENVAIRMENT.URL_API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.error || data.message || "Email o contraseña incorrectos",
      };
    }

    return {
      success: data.success ?? true,
      message: data.message ?? "Inicio de sesión exitoso",
      token: data.token ?? null,
      user: data.user ?? null,
    };
  } catch (error) {
    console.error("🚨 Error de conexión o fetch:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
}
