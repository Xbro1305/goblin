import { FaArrowDown, FaArrowUp, FaMinus, FaPlus } from "react-icons/fa";
import bg from "../../assets/images/Group 756.png";
import { SiTether } from "react-icons/si";
import { RiBtcLine } from "react-icons/ri";
import { PiCurrencyEth } from "react-icons/pi";
import { BiImage } from "react-icons/bi";

export const Home = () => {
  const headerClass =
    " text-[30px] bg-[linear-gradient(90deg,#4CA11F_0%,#B3DD25_100%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] font-bold";
  return (
    <div className="flex flex-col px-[16px_!important] py-[30px_!important] gap-[20px]">
      <img src={bg} className="background hidden lg:flex" alt="" />
      <h2 className={headerClass}>Добрый вечер!</h2>

      <div className="flex flex-col gap-[27px] p-[10px_!important] md:p-[20px_!important] bg-[#FAFAFA] rounded-[10px]">
        <div className="flex items-center justify-between mb-[10px] w-full">
          <div className="flex flex-col gap-[10px]">
            <h3 className="text-[20px]">Общий баланс:</h3>
            <h1 className="hidden md:flex font-bold text-[46px]">0,00 $</h1>
          </div>
        </div>
        <div className="flex items-center md:justify-center gap-[10px] md:gap-[15px]">
          <button className="flex flex-col items-center justify-center text-[#A4A4A4] gap-[5px]">
            <span className="[background:linear-gradient(180deg,_#4CA11F_0%,_#B3DD25_100%)] rounded-[50%] h-[35px] w-[35px] flex items-center justify-center mb-[5px]">
              <FaPlus className="text-[#fff]" />
            </span>{" "}
            Купить
          </button>{" "}
          <button className="flex flex-col items-center justify-center text-[#A4A4A4] gap-[5px]">
            <span className="[background:linear-gradient(180deg,_#4CA11F_0%,_#B3DD25_100%)] rounded-[50%] h-[35px] w-[35px] flex items-center justify-center mb-[5px]">
              <FaMinus className="text-[#fff]" />
            </span>{" "}
            Продать
          </button>{" "}
          <span className="hidden md:flex h-[25px] mx-[25px_!important] mb-[15px_!important] bg-[#A4A4A4] w-[1px]"></span>
          <button className="flex flex-col items-center justify-center text-[#A4A4A4] gap-[5px]">
            <span className="bg-[#A4A4A4] rounded-[50%] h-[35px] w-[35px] flex items-center justify-center mb-[5px]">
              <FaArrowDown className="text-[#fff]" />
            </span>{" "}
            Пополнение
          </button>{" "}
          <button className="flex flex-col items-center justify-center text-[#A4A4A4] gap-[5px]">
            <span className="bg-[#A4A4A4] rounded-[50%] h-[35px] w-[35px] flex items-center justify-center mb-[5px]">
              <FaArrowUp className="text-[#fff]" />
            </span>{" "}
            Вывод
          </button>
        </div>
        <div className="flex flex-col gap-[10px] lg:hidden">
          <div className="flex items-cnter w-full justify-between">
            <p className="flex items-center gap-[5px] text-[#6B7280] text-[16px]">
              USDT <SiTether className="text-[#26A17B] text-[20px]" />
            </p>
            <p className="text-[20px] font-bold">0.00 USDT</p>
          </div>{" "}
          <div className="flex items-cnter w-full justify-between">
            <p className="flex items-center gap-[5px] text-[#6B7280] text-[16px]">
              BTC <RiBtcLine className="text-[#F7931A] text-[20px]" />
            </p>
            <p className="text-[20px] font-bold">0.00 </p>
          </div>{" "}
          <div className="flex items-cnter w-full justify-between">
            <p className="flex items-center gap-[5px] text-[#6B7280] text-[16px]">
              USDT <PiCurrencyEth className="text-[#627EEA] text-[20px]" />
            </p>
            <p className="text-[20px] font-bold">0.00 USDT</p>
          </div>
        </div>
      </div>
      <h2 className={headerClass}>Новости</h2>
      <div className="rounded-[12px] bg-[#F1F1F1] flex flex-col md:grid md:grid-cols-[repeat(auto-fill,minmax(230px,300px))] gap-[10px] p-[20px_!important]">
        <div className="flex flex-col gap-[10px] bg-[#fff] md:bg-[transparent] rounded-[10px]">
          <div className="flex flex-col gap-[10px] md:flex-col-reverse">
            <h3 className="p-[10px_!important] text-[14px] font-normal md:py-[0_!important]">
              Название новости
            </h3>
            <div className="w-full aspect-[4/3] bg-[#E2E2E2] flex items-center justify-center md:rounded-[10px]">
              <BiImage className="text-[#C8C8C8] text-[96px]" />
            </div>
          </div>
          <div className="flex items-center justify-between w-full p-[10px_!important] mb-[10px_!important] md:py-[0_!important]">
            <h3 className="text-[14px] font-normal">Содержание новости</h3>
            <p className="text-[8px]">Дата публикации</p>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-[10px] bg-[#fff] md:bg-[transparent] rounded-[10px]">
          <div className="flex flex-col gap-[10px] md:flex-col-reverse">
            <h3 className="p-[10px_!important] text-[14px] font-normal md:py-[0_!important]">
              Название новости
            </h3>
            <div className="w-full aspect-[4/3] bg-[#E2E2E2] flex items-center justify-center md:rounded-[10px]">
              <BiImage className="text-[#C8C8C8] text-[96px]" />
            </div>
          </div>
          <div className="flex items-center justify-between w-full p-[10px_!important] mb-[10px_!important] md:py-[0_!important]">
            <h3 className="text-[14px] font-normal">Содержание новости</h3>
            <p className="text-[8px]">Дата публикации</p>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-[10px] bg-[#fff] md:bg-[transparent] rounded-[10px]">
          <div className="flex flex-col gap-[10px] md:flex-col-reverse">
            <h3 className="p-[10px_!important] text-[14px] font-normal md:py-[0_!important]">
              Название новости
            </h3>
            <div className="w-full aspect-[4/3] bg-[#E2E2E2] flex items-center justify-center md:rounded-[10px]">
              <BiImage className="text-[#C8C8C8] text-[96px]" />
            </div>
          </div>
          <div className="flex items-center justify-between w-full p-[10px_!important] mb-[10px_!important] md:py-[0_!important]">
            <h3 className="text-[14px] font-normal">Содержание новости</h3>
            <p className="text-[8px]">Дата публикации</p>
          </div>
        </div>
      </div>
    </div>
  );
};
