import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import {
  BiCheckCircle,
  BiChevronDown,
  BiGitBranch,
  BiWallet,
} from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { FaChartBar, FaUser } from "react-icons/fa";
import SberLogo from "./assets/Sber_logo.svg";
import TinkoffLogo from "./assets/Tinkoff_logo.svg";
import Cashlogo from "./assets/Cash.svg";
import CardLogo from "./assets/Credit_card.svg";
import { Input } from "../../Components/Input/Input";
import { NumericFormat } from "react-number-format";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { Loader } from "../../Components/Loader/Loader";
import api from "../../api";
import { BsCash, BsClock, BsCoin } from "react-icons/bs";
import { LuTrash2 } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import QRCode from "react-qr-code";

export const Profile = () => {
  const [page, setPage] = React.useState("transaction");
  const [balance, setBalance] = React.useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/transactions/balance`)
      .then((response) => {
        setBalance(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.profile}>
      {loading && <Loader />}
      <div className={styles.profile_navigation}>
        <div
          className={
            page == "USDT"
              ? styles.profile_navigation_item_active
              : styles.profile_navigation_item
          }
          onClick={() => setPage("USDT")}
        >
          <BsCoin />
          {balance.usdtBalance} <span>USDT</span>
        </div>{" "}
        <div
          className={
            page == "TRX"
              ? styles.profile_navigation_item_active
              : styles.profile_navigation_item
          }
          onClick={() => setPage("TRX")}
        >
          <BsCoin />
          {balance.trxBalance} <span>TRX</span>
        </div>{" "}
        <div
          className={
            page == "ETH"
              ? styles.profile_navigation_item_active
              : styles.profile_navigation_item
          }
          onClick={() => setPage("ETH")}
        >
          <BsCoin />
          {balance.trxBalance} <span>ETH</span>
        </div>{" "}
        {navigationItems.map((item) => (
          <div
            key={item.id}
            className={
              page == item.key
                ? styles.profile_navigation_item_active
                : styles.profile_navigation_item
            }
            onClick={() => setPage(item.key)}
          >
            {item.icon} {item.name}
          </div>
        ))}
      </div>
      <div className={styles.profile_content}>
        {navigationItems?.find((item) => item.key == page)?.page || (
          <Action currency={page} />
        )}
      </div>
    </div>
  );
};

const Info = () => {
  const [user, setUser] = React.useState({});
  const [balance, setBalance] = React.useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get(`/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        if (err.response?.status == 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      });

    api
      .get(`/api/transactions/balance`)
      .then((response) => {
        setBalance(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles?.profile_info}>
      <div>
        <h2 className={styles.profile_info_name}>
          {/* Геннадий Орлов Александрович */}
          {user?.fullName || "Имя не указано"}
        </h2>
        <p className={styles.profile_info_verification}>
          <BiCheckCircle style={{ fontSize: "22px" }} /> Верифицирован
        </p>
      </div>
      <div className={styles.profile_info_lines}>
        <div>
          <p>Количество СДЕЛОК В P2P</p>
          <span></span>
        </div>{" "}
        <div>
          <p>% УСПЕШНЫХ СДЕЛОК В P2P</p>
          <span></span>
        </div>{" "}
        <div>
          <p>Количество ОТМЕНЁНЫХ СДЕЛОК В P2P</p>
          <span></span>
        </div>{" "}
        <div>
          <p>Количество ОТДАННЫХ USDT В ПРОЦЕССИНГЕ</p>
          <span></span>
        </div>
      </div>
      <div className={styles.profile_info_status}>
        <h2>Статус на рынкe:</h2>
        <p>
          <span></span> Онлайн меняла
        </p>
        <div>
          <button className="green-button">Добавить курьера</button>
          <button className="green-button">Получить статус обменника</button>
        </div>
      </div>
      {/* Почта: {user?.email} <br />
      Дата регистрации:{" "}
      {user?.created_at
        ? new Date(user.created_at).toLocaleDateString()
        : ""}{" "}
      <br />
      Крипто кошельки:{" "}
      {user?.wallets?.map((wallet) => {
        return (
          <div key={wallet?.id}>
            <p>Адрес: {wallet?.address}</p>
            <p>Блокчейн: {wallet?.currency}</p>
            <p>Баланс: {wallet.balance}</p>
          </div>
        );
      })} */}
    </div>
  );
};

const ProfileTransaction = () => {
  const [transactionType, setTransactionType] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [currency, setCurrency] = React.useState("USDT");
  const [isOpen, setIsOpen] = React.useState(false);
  const [currencyColor, setCurrencyColor] = React.useState("#86C239");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isCodeSent, setIsCodeSent] = React.useState(false);

  const handleInnerSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(1);
  };

  const CurrencySelector = () => (
    <div className={styles.profile_transaction_currency}>
      <div className={styles.profile_transaction_select}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={styles.profile_transaction_select_value}
        >
          <p style={{ color: currencyColor }}> {currency}</p>
          <BiChevronDown />
        </div>

        {isOpen && (
          <div className={styles.profile_transaction_select_list}>
            <div
              className={styles.profile_transaction_select_item}
              onClick={() => {
                setCurrency("USDT");
                setIsOpen(false);
                setCurrencyColor("#86C239");
              }}
            >
              USDT
            </div>
            <div
              className={styles.profile_transaction_select_item}
              onClick={() => {
                setCurrency("BTC");
                setIsOpen(false);
                setCurrencyColor("#e9a907");
              }}
            >
              BTC
            </div>
            <div
              className={styles.profile_transaction_select_item}
              onClick={() => {
                setCurrency("ETH");
                setIsOpen(false);
                setCurrencyColor("#1291d9");
              }}
            >
              ETH
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const handleTranslate = () => {
    setIsCodeSent(true);

    const internalConfig = {
      method: "POST",
      url: `/api/transactions/internal-transfer`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      data: {
        recipientEmail: address,
        amount,
        currency,
      },
    };

    const externalConfig = {
      method: "POST",
      url: `/api/transactions/external-transfer`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      data: {
        externalAddress: address,
        amount,
        currency,
      },
    };

    if (address == "" || amount == "" || currency == "" || isCodeSent == true) {
      return;
    }

    api
      .post(
        transactionType == 0 ? internalConfig.url : externalConfig.url,
        transactionType == 0 ? internalConfig.data : externalConfig.data
      )
      .then((response) => {
        console.log(response.data);
        setIsModalOpen(3);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setCode("");
        setIsCodeSent(false);
      });
  };

  return (
    <div className={styles.profile_transaction}>
      <div className={styles.profile_transaction_top}>
        <div
          className={
            transactionType == 0
              ? styles.profile_transaction_top_item_active
              : ""
          }
          onClick={() => setTransactionType(0)}
        >
          Внутренний перевод
        </div>
        <div
          className={
            transactionType == 1
              ? styles.profile_transaction_top_item_active
              : ""
          }
          onClick={() => setTransactionType(1)}
        >
          Внешний перевод
        </div>
      </div>
      {transactionType == 0 ? (
        <>
          <h1 className={styles.profile_transaction_title}>
            Введите адрес для перевода внутри биржи
          </h1>
          <form
            className={styles.profile_transaction_form}
            onSubmit={(e) => handleInnerSubmit(e)}
          >
            <div className={styles.profile_transaction_adress_input}>
              <input
                type="text"
                name="email"
                placeholder="Почта  "
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <h1>Выберите крипто</h1>
            <CurrencySelector />
            <h1>Напишите количество</h1>
            <div
              style={{ flex: 1 }}
              className={styles.profile_transaction_amount_input}
            >
              <NumericFormat
                required
                thousandSeparator=" "
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                decimalSeparator=","
                value={amount}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setAmount(value);
                }}
                placeholder="Количество"
                className={styles.profile_transaction_amount_input}
              />
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>

            <div className={styles.profile_transaction_amount}>
              {amount}
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>
            <button
              type="submit"
              className={`"red-button" ${styles.profile_transaction_sendButton}`}
            >
              Отправить
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className={styles.profile_transaction_title}>
            Введите адрес внешнего кошелька
          </h1>
          <form
            className={styles.profile_transaction_form}
            onSubmit={(e) => handleInnerSubmit(e)}
          >
            <div className={styles.profile_transaction_adress_input}>
              <input
                type="text"
                name="email"
                placeholder="Адрес кошелька"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <h1>Выберите крипто</h1>
            <CurrencySelector />
            <h1>Напишите количество</h1>
            <div
              style={{ flex: 1 }}
              className={styles.profile_transaction_amount_input}
            >
              <NumericFormat
                required
                thousandSeparator=" "
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                decimalSeparator=","
                value={amount}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setAmount(value);
                }}
                placeholder="Количество"
                className={styles.profile_transaction_amount_input}
              />
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>

            <div className={styles.profile_transaction_amount}>
              {amount}
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>
            <button
              type="submit"
              className={`"red-button" ${styles.profile_transaction_sendButton}`}
            >
              Отправить
            </button>
          </form>
        </>
      )}

      {isModalOpen == 1 && (
        <div className={styles.modal}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(2);
            }}
            className={styles.modal_content}
          >
            <h1>Введите код</h1>
            <p>
              Введите код, отправленный вам на почту для подтверждения перевода
              в <br />
              <b> {amount}</b>{" "}
              <b style={{ color: currencyColor }}>{currency}</b>
            </p>
            <Input
              type="text"
              placeholder={<p>Код с почты</p>}
              value={code}
              onChange={(value) => setCode(value)}
            />
            <button type="submit" className="green-button">
              Перевести
            </button>
            <button
              className="red-button"
              onClick={() => {
                setIsModalOpen(false);
                setCode("");
              }}
            >
              Отмена
            </button>
          </form>
        </div>
      )}

      {isModalOpen == 2 && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h1>Подтвердите действие</h1>
            <p>
              Вы уверенны что хотите перевести ваши средста на другой кошелек?
            </p>
            <Input value={address} readonly={true} />
            <p className={styles.modal_amount}>
              <b>{amount}</b>
              <b style={{ color: currencyColor }}>{currency}</b>
            </p>
            <button
              onClick={() => handleTranslate()}
              className="green-button"
              style={{ marginTop: "20px" }}
            >
              Подтверждаю
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setCode("");
              }}
              className="red-button"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {isModalOpen == 3 && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h1 style={{ color: "#86C239" }}>Успешно!</h1>
            <p>Перевод успешно выполнен</p>
            <p>
              Сумма перевода
              <b> {amount}</b>{" "}
              <b style={{ color: currencyColor }}>{currency}</b>
            </p>
            <p>На аккаунт:</p>
            <Input value={address} readonly={true} />
            <button
              className="link"
              onClick={() => {
                setIsModalOpen(false);
                setCode("");
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const TransactionHistory = () => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    api
      .get(`/api/transactions/transactions`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className={styles.profile_transaction_history}>
      <h1>
        <BsClock style={{ color: "#86C239" }} />
        История транзакций
      </h1>
      <table className={styles.profile_transaction_history_table}>
        <tr className={styles.profile_transaction_history_table_head}>
          <th>ID</th>
          <th>Почта</th>
          <th>Сумма</th>
          <th>Дата</th>
        </tr>
        <div className={styles.profile_transaction_history_table_body}>
          {/* {transactionHistory.map((transaction) => (
            <div key={transaction.id}>
              <p>{transaction.id}</p>
              <p>{transaction.address}</p>
              <p>
                {transaction.amount}
                <p
                  style={{
                    color:
                      transaction.currency == "USDT"
                        ? "#86C239"
                        : transaction.currency == "BTC"
                        ? "#e9a907"
                        : "#1291d9",
                  }}
                >
                  {transaction.currency}
                </p>
              </p>
              <p>{transaction.date}</p>
            </div>
          ))} */}

          {data.length ? (
            data.map((transaction) => (
              <div key={transaction.id}>
                <p>{transaction.id}</p>
                <p>
                  {transaction.direction == "IN" ? (
                    <GoArrowDownLeft />
                  ) : (
                    <GoArrowUpRight />
                  )}

                  {transaction.type == "INTERNAL"
                    ? transaction.direction == "IN"
                      ? transaction.senderEmail
                      : transaction.recipientEmail
                    : transaction.direction == "IN"
                    ? transaction.senderAddress
                    : transaction.receiverAddress}
                </p>
                <p>
                  {transaction.amount}
                  <p
                    style={{
                      color:
                        transaction.currency == "USDT"
                          ? "#86C239"
                          : transaction.currency == "BTC"
                          ? "#e9a907"
                          : "#1291d9",
                    }}
                  >
                    {transaction.currency}
                  </p>
                </p>
                <p>{transaction.createdAt.split("T")[0]}</p>
              </div>
            ))
          ) : (
            <p>Нет транзакций</p>
          )}
        </div>
      </table>
    </div>
  );
};

const Action = ({ currency }) => {
  return (
    <div className={styles.profile_action}>
      <div className={styles.profile_action_top}>
        <div>
          Действия с{" "}
          <span
            style={{
              color:
                currency == "USDT"
                  ? "#86C239"
                  : currency == "TRX"
                  ? "#e9a907"
                  : "#1291d9",
            }}
          >
            {currency}
          </span>
        </div>
        <select>
          <option value="">Выбрать сеть</option>
        </select>
      </div>
      <div className={styles.profile_action_body}>
        <div>
          <p>
            <BiWallet /> Ввод
          </p>
          <textarea name="" id=""></textarea>
        </div>

        <div>
          <p>
            <BiWallet /> Вывод
          </p>
          <textarea name="" id=""></textarea>
        </div>
      </div>
      <div className={styles.profile_action_bottom}>
        <div className={styles.profile_action_bottom_left}>
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Криптоадрес для пополнения"
            />
            <button className="green-button">Скопировать</button>
          </div>{" "}
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Криптоадрес для вывода"
            />
            <button className="red-button">Вывести</button>
          </div>
        </div>
        <div className={styles.profile_action_bottom_right}>
          <QRCode
            value="https://osiyohometex.uz"
            fgColor="#21A30C"
            bgColor="#f2f2f2"
          />
        </div>
      </div>
    </div>
  );
};

const PaymentMethods = () => {
  const [openedModal, setOpenedModal] = React.useState(null);

  const methods = [
    {
      name: "Тинькофф",
      type: "bank",
      number: "4040 4004 4004 4494",
      holder: "СВЕТЛАНА ОЛЕГОВНА БУМ",
      logo: <img src={TinkoffLogo} alt="Tinkoff Logo" />,
    },
    {
      name: "Сбербанк",
      type: "bank",
      number: "4040 4004 4004 4494",
      holder: "СВЕТЛАНА ОЛЕГОВНА БУМ",
      logo: <img src={SberLogo} alt="Sberbank Logo" />,
    },
    {
      name: "Онлайн перевод",
      type: "online",
      number: "4040 4004 4004 4494",
      holder: "СВЕТЛАНА ОЛЕГОВНА БУМ",
      logo: <img src={CardLogo} alt="Card Logo" />,
    },
    {
      name: "Наличные",
      type: "cash",
      number: "4040 4004 4004 4494",
      holder: "СВЕТЛАНА ОЛЕГОВНА БУМ",
      logo: <img src={Cashlogo} alt="Cash Logo" />,
    },
  ];

  return (
    <div className={styles.profile_payments}>
      <h2>Способы оплаты</h2>
      <div className={styles.profile_payments_list}>
        {methods.map((method, index) => (
          <div key={index} className={styles.profile_payments_item}>
            <div className={styles.profile_payments_item_logo}>
              {method.logo}
              {method.name}
            </div>
            <div className={styles.profile_payments_item_info}>
              <p>{method.number}</p>
              <p>{method.holder}</p>
            </div>
            <div className={styles.profile_payments_item_action}>
              <button className="link">
                <TbEdit />
              </button>
              <button className="link" style={{ color: "#ED5E3F" }}>
                <LuTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className={`green-button ${styles.profile_payments_addbtn}`}
        onClick={() => setOpenedModal("add")}
      >
        Добавить
      </button>
      {openedModal == "add" && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h1>Выберите способ оплаты</h1>
            <p style={{ marginBottom: "20px" }}>
              Время, которое потребуется для автообновления страницы
            </p>
            {methods.map((method, index) => (
              <div
                key={index}
                className={styles.profile_payments_modal_item}
                onClick={() => setOpenedModal("details")}
              >
                <p>
                  {method.logo}
                  {method.name}
                </p>

                <button>+</button>
              </div>
            ))}

            <button
              className="link"
              style={{ marginTop: "30px" }}
              onClick={() => setOpenedModal(null)}
            >
              Вернуться назад
            </button>
          </div>
        </div>
      )}

      {openedModal == "details" && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h1>Добавить способ оплаты</h1>
            <p style={{ marginBottom: "20px" }}>
              Время, которое потребуется для автообновления страницы
            </p>

            <Input
              type="text"
              placeholder={
                <p
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaUser style={{ fontSize: "18px" }} /> ФИО
                </p>
              }
            />
            <Input
              type="text"
              placeholder={
                <p
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <BiWallet style={{ fontSize: "18px" }} /> Номер счета
                </p>
              }
            />

            <button className="green-button" style={{ marginTop: "20px" }}>
              Добавить
            </button>
            <button
              className="link"
              style={{ marginTop: "10px" }}
              onClick={() => setOpenedModal("add")}
            >
              Вернуться назад
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Referral = () => {
  return (
    <div className={styles.profile_referral}>
      <div className={styles.profile_referral_link}>
        <h2>Пригласительная ссылка</h2>
        <p>Ссылка</p>
        <button className="green-button">COPY</button>
      </div>
      <div className={styles.profile_info_lines}>
        <div>
          <p>Заработано</p>
          <span></span>
        </div>{" "}
        <div>
          <p>ВАШ % ОТ КОМИССИЙ</p>
          <span></span>
        </div>{" "}
        <div>
          <p>КОЛИЧЕСТВО ПОДКЛЮЧЕННЫХ АККАУНТОВ</p>
          <span></span>
        </div>{" "}
      </div>
    </div>
  );
};

const navigationItems = [
  {
    name: "Перевод",
    id: 1,
    key: "transaction",
    icon: <GrTransaction />,
    page: <ProfileTransaction />,
  },
  {
    name: "Статистика",
    id: 2,
    key: "statistics",
    icon: <FaChartBar />,
    page: <Info />,
  },
  {
    name: "История транзакций",
    id: 3,
    key: "transactions",
    icon: <BsClock />,
    page: <TransactionHistory />,
  },
  {
    name: "Способы оплаты",
    id: 4,
    key: "payment-methods",
    icon: <BiWallet />,
    page: <PaymentMethods />,
  },
  {
    name: "Реферальная системя",
    icon: <BiGitBranch />,
    id: 5,
    key: "referral",
    page: <Referral />,
  },
];
