import React, { useEffect, useState } from "react";
import styles from "./Deal.module.scss";
import bg from "../../../assets/images/Group 756.png";
import { TbCopy } from "react-icons/tb";
import { enqueueSnackbar } from "notistack";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "../../../Components/Loader/Loader";
import api from "../../../api";
import Chat from "../../../Components/Chat/Chat";
import { jwtDecode } from "jwt-decode";

export const Deal = () => {
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCurrentUser(jwtDecode(token));
    } else {
      navigate('/login');
    }

    api.get(`/deal/${id}`)
      .then((res) => {
        setDeal(res.data);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response?.data?.message || "Ошибка загрузки сделки", {
          variant: "error",
          autoHideDuration: 2000,
        });
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleUpdateStatus = (status) => {
    setLoading(true);
    api.patch(`/deal/${id}/status`, { status })
      .then((res) => {
        setDeal(res.data);
        enqueueSnackbar(`Статус сделки обновлен на ${status}`, {
          variant: "success",
          autoHideDuration: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response?.data?.message || "Ошибка обновления статуса", {
          variant: "error",
          autoHideDuration: 2000,
        });
      })
      .finally(() => setLoading(false));
  };

  if (loading || !deal) {
    return <Loader />;
  }

  const isBuyer = currentUser?.userId === deal.buyer.id;
  const isSeller = currentUser?.userId === deal.seller.id;

  return (
    <div className={styles.myOrders}>
      {loading && <Loader />}
      <img src={bg} className="background" alt="" />
      <h1 className="h1 title">Deal No. {id}</h1>
      <div className={styles.myOrders_content}>
        <div className={styles.myOrders_content_main}>
          <div className={styles.myOrders_content_item}>
            <div className={styles.myOrders_content_item_top}>
              <section>
                <p className="p">
                  <span style={{ color: isBuyer ? "#4e865a" : "#BE1600" }}>
                    {isBuyer ? 'BUY' : 'SELL'}
                  </span>{" "}
                  USDT
                </p>
                <span className="span">
                  {new Date(deal.createdAt).toLocaleString()}
                </span>
              </section>
              <div>
                <section className={styles.myOrders_content_item_top_section}>
                  <p className="span2">Status: {deal.status}</p>
                  {deal.status === 'AWAITING_PAYMENT' && isBuyer && (
                    <button onClick={() => handleUpdateStatus('PAYMENT_CONFIRMED')} className="green-button">
                      Mark as Paid
                    </button>
                  )}
                  {deal.status === 'PAYMENT_CONFIRMED' && isSeller && (
                     <button onClick={() => handleUpdateStatus('COMPLETED')} className="green-button">
                       Confirm Payment
                     </button>
                  )}
                </section>
              </div>
            </div>
            <section className={styles.myOrders_content_item_section}>
              <span className="span">Amount</span>
              <p className="p" style={{ fontWeight: "600" }}>
                {deal.order.amount} USDT
              </p>
            </section>
            <section className={styles.myOrders_content_item_section}>
              <span className="span">Price</span>
              <p className="p">{deal.order.price} RUB</p>
            </section>
            <section className={styles.myOrders_content_item_section}>
              <span className="span">Order No.</span>
              <p className="p">
                {deal.order.id}
                <TbCopy
                  style={{ color: "#2A2E2B71", cursor: "pointer" }}
                  onClick={() => {
                    enqueueSnackbar("Скопировано", {
                      variant: "success",
                      autoHideDuration: 2000,
                    });
                    navigator.clipboard.writeText(deal.order.id);
                  }}
                />
              </p>
            </section>
          </div>
          {currentUser && <Chat dealId={id} currentUser={currentUser} />}
        </div>
      </div>
    </div>
  );
};