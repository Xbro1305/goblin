import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Input } from "../../Components/Input/Input";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { MdEmail } from "react-icons/md";
import api from "../../api";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/p2p/profile");
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/auth/login", { username, password })
      .then((response) => {
        const token = response.data.access_token;
        localStorage.setItem("token", token);
        navigate("/p2p/profile");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(error.response?.data?.message || "Ошибка входа", {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <h1 className={`header-30 ${styles.loginTitle}`}>Вход</h1>
        <p className="text-16">
          Войдите в свой аккаунт, чтобы начать торговать.
        </p>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <Input
            onChange={(value) => setUsername(value)}
            value={username}
            name="username"
            placeholder={
              <p>
                <MdEmail /> Имя пользователя
              </p>
            }
          />
          <Input
            onChange={(value) => setPassword(value)}
            value={password}
            type="password"
            name="password"
            placeholder={
              <p>
                <CiLock /> Пароль
              </p>
            }
          />
          <Link to="/reset-pass" className="link">
            Забыли пароль?
          </Link>
          <button type="submit" className="green-button">
            Войти
          </button>
          <Link to="/signin" className="link">
            Нет аккаунта? <u>Зарегистрироваться</u>
          </Link>
        </form>
      </div>
    </div>
  );
};