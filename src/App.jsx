import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const ssData = sessionStorage.getItem("_tstFormData");
    console.log("sessionData", ssData);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormItem) => ({
      ...prevFormItem,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    sessionStorage.setItem(
      "_tstFormData",
      JSON.stringify({
        username: formData.username,
        password: formData.password,
      })
    );

    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
    });

    setSuccess(true);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="header">TST</h1>
        <h2 className="header">Create Password</h2>
        <form onSubmit={handleSubmit} className="form-createPassword">
          <div>
            <label htmlFor="username" className="form-createPassword__label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-createPassword__input"
              placeholder="Please enter username"
            />
          </div>
          <div>
            <label htmlFor="password" className="form-createPassword__label">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-createPassword__input"
              placeholder="Please enter password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="form-createPassword__label"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-createPassword__input"
              placeholder="Please confirm password"
            />
          </div>
          {error && (
            <p className="form-createPassword__message form-createPassword__message--error">
              ❌ {error}
            </p>
          )}
          {success && (
            <p className="form-createPassword__message form-createPassword__message--info">
              ✅ Form data persisted to session storage!
            </p>
          )}
          <button type="submit" className="form-createPassword__submit">
            💾 Submit Form
          </button>
        </form>
        <p>Darren Martin</p>
      </div>
    </div>
  );
}

export default App;
