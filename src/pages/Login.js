import React, { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      //await fetchUser();
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="p-6 py-24 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="border w-full p-2 mb-2"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="border w-full p-2 mb-2"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="bg-green-500 text-white px-4 py-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;