import React, { useState, useEffect } from "react";
import styles from "./CreateOrder.module.scss";
import bg from "../../../assets/images/Group 756.png";
import { NumericFormat } from "react-number-format";
import { enqueueSnackbar } from "notistack";
import { Loader } from "../../../Components/Loader/Loader";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

export const CreateOrder = () => {
  const [type, setType] = useState("BUY");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState({ usdtBalance: 0, trxBalance: 0 });
  const navigate = useNavigate();

  // Load user balance
  useEffect(() => {
    api.get("/api/transactions/balance")
      .then((res) => setBalance(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const orderAmount = parseFloat(amount.replace(/,/g, ''));
    const orderPrice = parseFloat(price.replace(/,/g, ''));

    // Check balance for SELL orders
    if (type === 'SELL' && balance.usdtBalance < orderAmount) {
      enqueueSnackbar(`Недостаточно USDT на балансе. Требуется: ${orderAmount}, Доступно: ${balance.usdtBalance}`, {
        variant: "error",
        autoHideDuration: 3000,
      });
      setLoading(false);
      return;
    }

    const orderData = {
      type,
      amount: orderAmount,
      price: orderPrice,
    };

    api.post("/order", orderData)
      .then((res) => {
        enqueueSnackbar("Ордер успешно создан", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/p2p/orders");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response?.data?.message || "Ошибка создания ордера", {
          variant: "error",
          autoHideDuration: 2000,
        });
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.createOrder}>
      {loading && <Loader />}
      <img src={bg} className="background" alt="" />
      <div className={styles.createOrder_top}>
        <button
          className="p"
          onClick={() => setType("BUY")}
          style={
            type === "BUY"
              ? { color: "#000", borderBottom: "2px solid #215E04" }
              : { color: "#2A2E2B70" }
          }
        >
          Хочу купить
        </button>
        <button
          className="p"
          onClick={() => setType("SELL")}
          style={
            type === "SELL"
              ? { color: "#000", borderBottom: "2px solid #215E04" }
              : { color: "#2A2E2B70" }
          }
        >
          Хочу продать
        </button>
      </div>

      <form className={styles.createOrder_body} onSubmit={handleSubmit}>
        <div className={styles.createOrder_left}>
          <label>
            <p className="p">Криптовалюта</p>
            <select className={styles.createOrder_select} name="crypto" id="">
              <option value="usdt">USDT</option>
            </select>
          </label>
          {type === 'SELL' && (
            <div style={{ marginBottom: '10px', padding: '8px', background: '#f5f5f5', borderRadius: '4px' }}>
              <p className="p" style={{ fontSize: '12px', color: '#666' }}>
                Доступно: <strong>{balance.usdtBalance} USDT</strong>
              </p>
            </div>
          )}
          <label>
            <p className="p">Сумма</p>
            <NumericFormat
              className="span"
              value={amount}
              onValueChange={(values) => setAmount(values.value)}
              suffix=" USDT"
              thousandSeparator={true}
              fixedDecimalScale={true}
              allowNegative={false}
              allowLeadingZeros={false}
            />
          </label>
        </div>
        <div className={styles.createOrder_left}>
          <label>
            <p className="p">Фиат</p>
            <select
              className={styles.createOrder_select}
              name="currency"
              id=""
            >
              <option value="usdt">RUB</option>
            </select>
          </label>
          <label>
            <p className="p">Торговая цена</p>
            <NumericFormat
              className="span"
              value={price}
              onValueChange={(values) => setPrice(values.value)}
              suffix=" RUB"
              thousandSeparator={true}
              fixedDecimalScale={true}
              allowNegative={false}
              allowLeadingZeros={false}
            />
          </label>
          <label>
            <p className="p">&nbsp;</p>
            <button
              type="submit"
              className="green-button"
              style={{ height: "45px", boxShadow: "none" }}
            >
              Создать ордер
            </button>
          </label>
        </div>
      </form>
    </div>
  );
};