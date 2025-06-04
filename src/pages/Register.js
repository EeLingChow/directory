import React, { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/register", form);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      //await fetchUser();
      navigate("/");
    } catch (err) {
        console.log(err);
        if (err.response?.status === 422) {
            const messages = err.response.data.errors;
            const firstError = Object.values(messages)[0][0];
            setError(firstError);
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 py-24 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="border w-full p-2 mb-2"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
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
        { loading ? (<p className="text-gray-500 text-sm">Registering...</p>) : (<button className="bg-green-500 text-white px-4 py-2" type="submit">
          Register
        </button>) }
      </form>
    </div>
  );
}

export default Register;