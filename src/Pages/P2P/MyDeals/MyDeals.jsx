import React, { useEffect, useState } from "react";
import styles from "./MyDeals.module.scss";
import bg from "../../../assets/images/Group 756.png";
import { TbCopy } from "react-icons/tb";
import { BsChatLeftDots } from "react-icons/bs";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";
import api from "../../../api";
import { jwtDecode } from "jwt-decode";

export const MyDeals = () => {
  const [page, setPage] = useState("active");
  const [allDeals, setAllDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCurrentUser(jwtDecode(token));
    }
  }, []);

  useEffect(() => {
    api.get("/deal/my-deals")
      .then((res) => {
        setAllDeals(res.data);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Ошибка загрузки сделок", {
          variant: "error",
          autoHideDuration: 2000,
        });
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      });
  }, []);

  useEffect(() => {
    if (page === "all") {
      setFilteredDeals(allDeals);
    } else { // active
      setFilteredDeals(allDeals.filter(deal => deal.status !== "COMPLETED" && deal.status !== "CANCELLED"));
    }
  }, [page, allDeals]);

  return (
    <div className={styles.myOrders}>
      <img src={bg} className="background" alt="" />
      <h1 className="h1 title">My Deals</h1>
      <div className={styles.myOrders_content}>
        <div className={styles.myOrders_content_top}>
          <section className={styles.myOrders_content_top_section}>
            <p
              className="p"
              onClick={() => setPage("active")}
              style={
                page === "active"
                  ? { borderBottom: "2px solid var(--green)", color: "#000" }
                  : { color: "#2A2E2B71" }
              }
            >
              Active
            </p>
            <p
              className="p"
              onClick={() => setPage("all")}
              style={
                page === "all"
                  ? { borderBottom: "2px solid var(--green)", color: "#000" }
                  : { color: "#2A2E2B71" }
              }
            >
              All
            </p>
          </section>
        </div>
        <div className={styles.myOrders_content_main}>
          {filteredDeals?.map((item) => {
            const myRole = item.buyer.id === currentUser?.userId ? 'BUYER' : 'SELLER';
            return (
              <Link
                to={`/deal/${item.id}`}
                key={item.id}
                className={styles.myOrders_content_item}
              >
                <div className={styles.myOrders_content_item_top}>
                  <section>
                    <p className="p">
                      <span
                        style={{
                          color:
                            myRole === "SELLER" ? "#BE1600" : "#4e865a",
                        }}
                      >
                        {myRole === 'SELLER' ? 'SELL' : 'BUY'}
                      </span>{" "}
                      USDT
                    </p>
                    <span className="span">
                      {new Date(item.order.createdAt).toLocaleString()}
                    </span>
                  </section>
                  <div>
                    <section
                      className={styles.myOrders_content_item_top_section}
                    >
                      <p>Перейти {">      "} </p>
                    </section>
                  </div>
                </div>
                <section className={styles.myOrders_content_item_section}>
                  <span className="span">Amount</span>
                  <p className="p" style={{ fontWeight: "600" }}>
                    {item.order.amount} USDT
                  </p>
                </section>
                <section className={styles.myOrders_content_item_section}>
                  <span className="span">Price</span>
                  <p className="p">{item.order.price} RUB</p>
                </section>
                <section className={styles.myOrders_content_item_section}>
                  <span className="span">Order No.</span>
                  <p className="p">
                    {item.order.id}
                    <TbCopy
                      style={{ color: "#2A2E2B71", cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        enqueueSnackbar("Скопировано", {
                          variant: "success",
                          autoHideDuration: 2000,
                        });
                        navigator.clipboard.writeText(item.order.id);
                      }}
                    />
                  </p>
                </section>
                <section className={styles.myOrders_content_item_section}>
                  <span className="span">Профиль {">"}</span>
                  <p className="p">
                    <BsChatLeftDots />
                  </p>
                </section>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};