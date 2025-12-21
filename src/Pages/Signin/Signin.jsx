import React, { useState } from "react";
import styles from "../Login/Login.module.scss";
import { Input } from "../../Components/Input/Input";
import { CiLock, CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import api from "../../api";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar("Пароли не совпадают", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }

    api.post("/auth/register", { username, password, email })
      .then(() => {
        enqueueSnackbar("Регистрация прошла успешно!", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(error.response?.data?.message || "Ошибка регистрации", {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <h1 className={`header-30 ${styles.loginTitle}`}>Регистрация</h1>
        <p className="text-16">
          Создайте аккаунт, чтобы начать пользоваться платформой.
        </p>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <Input
            value={email}
            name="email"
            onChange={(value) => setEmail(value)}
            placeholder={
              <p>
                <CiUser /> Почта
              </p>
            }
          />
          <Input
            value={username}
            name="username"
            onChange={(value) => setUsername(value)}
            placeholder={
              <p>
                <CiUser /> Имя пользователя
              </p>
            }
          />
          <Input
            onChange={(value) => setPassword(value)}
            value={password}
            name="password"
            type="password"
            placeholder={
              <p>
                <CiLock /> Пароль
              </p>
            }
          />
          <Input
            onChange={(value) => setConfirmPassword(value)}
            value={confirmPassword}
            type="password"
            placeholder={
              <p>
                <CiLock /> Пароль (повторите)
              </p>
            }
          />
          <button type="submit" className="green-button">
            Зарегистрироваться
          </button>
          <Link to="/login" className="link">
            Уже есть аккаунт? <u>Войти</u>
          </Link>
        </form>
      </div>
    </div>
  );
};