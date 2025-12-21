import React, { useEffect, useState } from "react";
import styles from "./Order.module.scss";
import bg from "../../../assets/images/Group 756.png";
import { TbCopy } from "react-icons/tb";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api";

export const Order = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/order/${id}`)
      .then((res) => setData(res.data))
      .catch(() =>
        enqueueSnackbar("что-то пошло не так", { variant: "error" })
      );
  }, [id]);

  const createDeal = () => {
    api.post("/deal", { orderId: Number(id) })
      .then((res) => {
        enqueueSnackbar("Сделка создана", { variant: "success" });
        navigate(`/deal/${res.data.id}`);
      })
      .catch((err) =>
        enqueueSnackbar(err.response?.data?.message || "что-то пошло не так", {
          variant: "error",
        })
      );
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.order}>
      <img src={bg} className="background" alt="" />
      <h1 className="h1 title">Order info</h1>
      <div className={styles.order_content}>
        <div className={styles.order_content_main}>
          <div className={styles.order_content_top}>
            <p className="p">
              <span
                style={{ color: data.type === "BUY" ? "#BE1600" : "#567e5f" }}
              >
                {data.type}
              </span>{" "}
              USDT
            </p>
          </div>
          <div className={styles.order_content_item}>
            <section className={styles.order_content_item_section}>
              <span className="span">Amount</span>
              <p className="p" style={{ color: "#BE1600", fontWeight: "600" }}>
                {data.amount} USDT
              </p>
            </section>
            <section className={styles.order_content_item_section}>
              <span className="span">Price</span>
              <p className="p">{data.price} RUB</p>
            </section>
            <section className={styles.order_content_item_section}>
              <span className="span">Order No.</span>
              <p className="p">
                {id}
                <span>
                  <TbCopy
                    style={{ color: "#2A2E2B71", cursor: "pointer" }}
                    onClick={() => {
                      enqueueSnackbar("Скопировано", {
                        variant: "success",
                        autoHideDuration: 2000,
                      });
                      navigator.clipboard.writeText(id);
                    }}
                  />
                </span>
              </p>
            </section>
            <section className={styles.order_content_item_section}>
              <span className="span">Order Time</span>
              <p className="p">{new Date(data.createdAt).toLocaleString()}</p>
            </section>
          </div>
        </div>
      </div>
      <button
        className="green-button"
        style={{
          width: "fit-content",
          padding: "7px 120px",
          fontWeight: "400",
          height: "auto",
          margin: "0 auto",
        }}
        onClick={createDeal}
      >
        Deal
      </button>
    </div>
  );
};