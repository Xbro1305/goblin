import React, { useEffect, useState } from "react";
import styles from "./Me.module.scss";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { TbCopy } from "react-icons/tb";
import bg from "../../assets/images/Group 756.png";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { BiChevronRight, BiDislike, BiLike } from "react-icons/bi";
import { RiCoupon2Line } from "react-icons/ri";
import { IoCard } from "react-icons/io5";
import { HiUser } from "react-icons/hi";
import { GrNotification } from "react-icons/gr";
import { FaUserLock } from "react-icons/fa6";
import axios from "axios";
import { Loader } from "../../Components/Loader/Loader";
import api from "../../api";

export const Me = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get(`/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        if (err.response?.status == 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className={styles.profile}>
      {loading && <Loader />}
      <img src={bg} className="background" alt="" />
      <div className={styles.profile_top}>
        <section>
          <FaUser />
        </section>
        <div className={styles.profile_top_info}>
          <h1 className="h1">
            {user.email}
            <button
              onClick={() => {
                navigator.clipboard.writeText(user.email);
              }}
            >
              <TbCopy />
            </button>
          </h1>
          {/* <div>
            <p>
              <FiCheckCircle
                style={{ color: "#376C11", borderColor: "#376C11" }}
              />
              Email
            </p>{" "}
            <p>
              <FiAlertCircle
                style={{ color: "#BE1600", borderColor: "#BE1600" }}
              />
              SMS
            </p>{" "}
            <p>
              <FiCheckCircle
                style={{ color: "#376C11", borderColor: "#376C11" }}
              />
              Identity Verification
            </p>{" "}
            <p>
              <FiAlertCircle
                style={{ color: "#BE1600", borderColor: "#BE1600" }}
              />
              Deposit
            </p>
          </div> */}
        </div>
      </div>
      <div className={styles.profile_info}>
        <div className={styles.profile_info_left}>
          <div className={styles.profile_info_item}>
            <h1 className="h1">7</h1>
            <p className="p">Completed Order(s) in 30 days</p>
          </div>
          <div className={styles.profile_info_item}>
            <h1 className="h1">12</h1>
            <p className="p">All Completed Order(s)</p>
          </div>
          <div className={styles.profile_info_secondDiv}>
            <button>Buy</button>
            <span></span>
            <button>Sell</button>
          </div>
        </div>{" "}
        <div className={styles.profile_info_left}>
          <div className={styles.profile_info_item}>
            <h1 className="h1">63%</h1>
            <p className="p">Completed Rate Within 30 days</p>
          </div>
          <div className={styles.profile_info_item}>
            <h1 className="h1">100%</h1>
            <p className="p">Good Reting %</p>
          </div>
          <div className={styles.profile_info_secondDiv}>
            <button>
              <BiLike />
            </button>
            <span></span>
            <button>
              <BiDislike />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.profile_section}>
        <div className={styles.profile_section_item}>
          <section className="p">
            <RiCoupon2Line />
            P2P Coupon
          </section>
          <section className="span">
            <p>
              <BiChevronRight />
            </p>
          </section>
        </div>
        <div className={styles.profile_section_item}>
          <section className="p">
            <IoCard />
            Payment Method
          </section>
          <section className="span">
            <p>5</p>
            <p>
              <BiChevronRight />
            </p>
          </section>
        </div>
      </div>{" "}
      <div className={styles.profile_section_item}>
        <section className="p">
          <HiUser />
          Advertiser
        </section>
        <section>
          <p className="span">Apply Now </p>
          <p className="span">
            <BiChevronRight />
          </p>
        </section>
      </div>
      <div className={styles.profile_section}>
        <div className={styles.profile_section_item}>
          <section className="p">
            <BiLike />
            Leave Feedback
          </section>
          <section>
            <p className="span">100%</p>
            <p className="span">
              <BiChevronRight />
            </p>
          </section>
        </div>
        <div className={styles.profile_section_item}>
          <section className="p">
            <GrNotification />
            Manage Notifications
          </section>
          <section className="span">
            <p>5</p>
            <p>
              <BiChevronRight />
            </p>
          </section>
        </div>
      </div>{" "}
      <div className={styles.profile_section}>
        <div className={styles.profile_section_item}>
          <section className="p">
            <FaUserPlus />
            Followimg
          </section>
          <section>
            <p className="span"></p>
            <p className="span">
              <BiChevronRight />
            </p>
          </section>
        </div>
        <div className={styles.profile_section_item}>
          <section className="p">
            <FaUserLock />
            Manage the Blacklist
          </section>
          <section className="span">
            <p>5</p>
            <p>
              <BiChevronRight />
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
