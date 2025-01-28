import React, { useState } from "react";
import Register from "./Register";
import StatusWork from "../components/admin/StatusWork";
import TypeWork from "../components/admin/TypeWork";
import CityPlace from "../components/admin/CityPlace";
import OutWork from "../components/admin/OutWork";
import LevelWork from "../components/admin/LevelWork";
import MarridStatus from "../components/admin/MarridStatus";
import Disable from "../components/admin/Disable";
import UsersList from "../components/admin/UsersList";
import Reports from "../components/admin/Reports";
const Admin = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const [d, setD] = useState(false);
  const [e, setE] = useState(false);
  const [f, setF] = useState(false);
  const [g, setG] = useState(false);
  const [h, setH] = useState(false);
  const [i, setI] = useState(false);
  const [j, setJ] = useState(false);
  const clickA = () => {
    setA(true);
    setB(false);
    setD(false);
    setC(false);
    setE(false);
    setF(false);
    setG(false);
    setActiveButtonIndex(1);
  };
  const clickB = () => {
    setA(false);
    setB(true);
    setD(false);
    setC(false);
    setE(false);
    setF(false);
    setG(false);
    setActiveButtonIndex(2);
  };
  const clickC = () => {
    setA(false);
    setB(false);
    setC(true);
    setD(false);
    setE(false);
    setF(false);
    setG(false);
    setActiveButtonIndex(3);
  };
  const clickD = () => {
    setA(false);
    setB(false);
    setD(true);
    setC(false);
    setE(false);
    setF(false);
    setG(false);
    setActiveButtonIndex(4);
  };
  const clickE = () => {
    setA(false);
    setB(false);
    setD(false);
    setC(false);
    setE(true);
    setF(false);
    setG(false);
    setActiveButtonIndex(5);
  };
  const clickF = () => {
    setA(false);
    setB(false);
    setD(false);
    setC(false);
    setE(false);
    setF(true);
    setG(false);
    setActiveButtonIndex(6);
  };
  const clickG = () => {
    setA(false);
    setB(false);
    setD(false);
    setC(false);
    setE(false);
    setF(false);
    setG(true);
    setActiveButtonIndex(7);
  };
  const clickH = () => {
    setA(false);
    setB(false);
    setD(false);
    setC(false);
    setE(false);
    setF(false);
    setG(false);
    setH(true);
    setActiveButtonIndex(8);
  };
  const clickI = () => {
    setA(false);
    setB(false);
    setD(false);
    setC(false);
    setE(false);
    setF(false);
    setG(false);
    setH(false);
    setI(true);
    setActiveButtonIndex(9);
  };
  const clickJ = () => {
    setA(false);
    setB(false);
    setD(false);
    setC(false);
    setE(false);
    setF(false);
    setG(false);
    setH(false);
    setI(false);
    setJ(true);
    setActiveButtonIndex(10);
  };

  return (
    <div className=" w-full h-screen">
      <div className="">
        <div className="h-full grid grid-cols-4 gap-5">
          <div className=" h-full">
            <div className=" p-5 text-center text-white  border-l-2 border-white shadow-lg h-full  ">
              <a href="#" className="mb-1 font-bold text-xl">
                <strong>
                  <i className="glyphicon glyphicon-briefcase"></i> Admin Panel
                </strong>
              </a>
              <hr className="mb-5 mt-1" />

              <ul className="flex flex-col gap-4 items-center text-xl">
                <li
                  className={
                    activeButtonIndex === 1
                      ? "bg-white p-2 rounded-md shadow-md text-black cursor-pointer"
                      : "p-2 cursor-pointer"
                  }
                  onClick={() => clickA()}>
                  اضافة مستخدم جديد
                </li>

                <li
                  className={
                    activeButtonIndex === 9
                      ? "bg-white p-2 rounded-md shadow-md text-black cursor-pointer"
                      : "p-2 cursor-pointer"
                  }
                  onClick={() => clickI()}>
                  المستخدمين
                </li>
                <li
                  className={
                    activeButtonIndex === 10
                      ? "bg-white p-2 rounded-md shadow-md text-black cursor-pointer"
                      : "p-2 cursor-pointer"
                  }
                  onClick={() => clickJ()}>
                  البلاغات
                </li>
                <li
                  className={
                    activeButtonIndex === 2
                      ? "bg-white p-2 rounded-md shadow-md text-black cursor-pointer"
                      : "p-2 cursor-pointer"
                  }
                  onClick={() => clickB()}>
                  الحالة التعليمية
                </li>
                <li
                  className={
                    activeButtonIndex === 3
                      ? "bg-white p-2 rounded-md shadow-md text-black cursor-pointer"
                      : "p-2 cursor-pointer"
                  }
                  onClick={() => clickC()}>
                  المستوي التعليمي
                </li>
                <li
                  className={
                    activeButtonIndex === 4
                      ? "bg-white p-2 rounded-md shadow-md text-black cursor-pointer"
                      : "p-2 cursor-pointer"
                  }
                  onClick={() => clickD()}>
                  نوع العمل
                </li>
                <li
                  className={
                    activeButtonIndex === 5
                      ? "bg-white p-2 rounded-md shadow-md text-black cursor-pointer"
                      : "p-2 cursor-pointer"
                  }
                  onClick={() => clickE()}>
                  خارج قوة العمل
                </li>
                <li
                  className={
                    activeButtonIndex === 6
                      ? "bg-white p-2 rounded-md shadow-md text-black cursor-pointer"
                      : "p-2 cursor-pointer"
                  }
                  onClick={() => clickF()}>
                  الحالة الاجتماعية
                </li>
                <li
                  className={
                    activeButtonIndex === 7
                      ? "bg-white p-2 rounded-md shadow-md text-black cursor-pointer"
                      : "p-2 cursor-pointer"
                  }
                  onClick={() => clickG()}>
                  المحافظة
                </li>
                <li
                  className={
                    activeButtonIndex === 8
                      ? "bg-white p-2 rounded-md shadow-md text-black cursor-pointer"
                      : "p-2 cursor-pointer"
                  }
                  onClick={() => clickH()}>
                  الاعاقات
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full col-span-3 mt-10   text-xl">
            <div className="w-full ">
              {a ? (
                <Register />
              ) : b ? (
                <StatusWork />
              ) : c ? (
                <LevelWork />
              ) : d ? (
                <TypeWork />
              ) : e ? (
                <OutWork />
              ) : f ? (
                <MarridStatus />
              ) : g ? (
                <CityPlace />
              ) : h ? (
                <Disable />
              ) : i ? (
                <UsersList />
              ) : j ? (
                <Reports />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
