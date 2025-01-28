import React, { useEffect, useState } from "react";
import { registerUser } from "../redux//slicers/authSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const Register = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [notify, setNotify] = useState("");
  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");

  const userDetails = useSelector((state) => state.users);
  const { error, user, loading, success } = userDetails;
  const [permission, setPermission] = useState({ first: "", second: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API_URI = "/api/user/register";
  const handleSubmit = async () => {
    console.log(permission);

    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      if (username == "" || password == "") {
        toast.error("الرجاء ادخال جميع البيانات");
      }
      if (username.length < 3) {
        toast.error("الرجاء ادخال  اسم  يحتوي علي 3 احراف علي الاقل");
      }
      if (password.length < 6) {
        toast.error(
          "الرجاء ادخال  كلمة سر  تحتوي علي 6 احراف او 6 ارقام علي الاقل"
        );
      }
      const res = await axios.post(
        API_URI,
        { username, password, permission },
        config
      );

      if (res?.data?.data) {
        setNotify(toast.success("تم اضافة حساب جديد"));

        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setNotify(toast.error(error));
    }
  };
  const handlePermissionChange = (e) => {
    setPermission({
      ...permission,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (error) {
      setNotify(toast.error(error));
    }
  }, [error]);
  const API_URI_CITY = "/api/city";
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URI_CITY);
        setData(res?.data?.data);
      } catch (error) {
        setNotify(toast.error(error));
      }
    };
    fetchData();
  }, []);
  return (
    <section className="text-white   flex flex-col  items-center  w-full mx-auto">
      <div>
        <span className="text-white">{notify}</span>
        <ToastContainer position="top-right" />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className=" font-bold p-5 max-md:w-80 max-sm:w-60 w-3/4 flex flex-col items-center ">
            <h1 className="text-xl font-bold leading-tight  text-white bg-gray-950 p-2 w-1/2 rounded-md mb-5 text-center">
              اضافة حساب جديد
            </h1>
            <div className="flex flex-col items-start w-1/2">
              <label className="text-xl font-medium text-white mb-2">
                الاسم
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-md bg-gray-800 w-full p-2 border-2 border-gray-400"
                placeholder="الاسم"
                required=""
              />
            </div>
            <div className="flex flex-col items-start w-1/2">
              <label className="text-xl font-medium text-white mb-2 ">
                الرقم السري
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md bg-gray-800  w-full p-2 border-2 border-gray-400"
                placeholder="الرقم السري"
              />
            </div>
            <div className="flex flex-col items-start w-1/2">
              <label className="text-xl font-medium text-white mb-2 ">
                نوع التحكم
              </label>
              <select
                name="first"
                id="countries"
                className="bg-gray-800 p-1 rounded-sm w-full border-2 border-gray-400"
                value={permission.first}
                onChange={(e) => handlePermissionChange(e)}>
                <option value="" selected disabled>
                  اختر
                </option>
                <option value="المحافظة">المحافظة</option>
                <option value="القسم">القسم</option>
                <option value="الشياخة">الشياخة</option>
              </select>
            </div>

            {permission.first == "الشياخة" ? (
              <div>
                <div className="flex flex-col  w-auto p-1">
                  <label>
                    المحافظة <span className="text-red-700">*</span>
                  </label>

                  <select
                    className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}>
                    <option value="" selected disabled hidden>
                      اختر
                    </option>

                    {data &&
                      data
                        ?.filter(
                          (v, i, a) =>
                            a.findIndex((v2) => v["city"] === v2["city"]) === i
                        )
                        ?.map((x, i) => <option key={i}>{x["city"]}</option>)}
                  </select>
                </div>
                <div className="flex flex-col  w-auto p-1">
                  <label>
                    المركز/الحي<span className="text-red-700">*</span>
                  </label>
                  <select
                    disabled={!city}
                    id="countries"
                    className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
                    placeholder="ادخل المركز/الحي"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}>
                    <option value="" selected disabled hidden>
                      اختر
                    </option>

                    {city &&
                      data &&
                      data
                        .filter((x, i) => x["city"] == city)
                        ?.map((y, i) => <option key={i}>{y["place"]}</option>)}
                  </select>
                </div>
                <div className="flex flex-col  w-auto p-1">
                  <label>
                    القرية/الشياخة<span className="text-red-700">*</span>
                  </label>
                  <select
                    name="second"
                    disabled={!place}
                    id="countries"
                    className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
                    placeholder="ادخل القرية/الشياخة"
                    value={permission.second}
                    onChange={(e) => handlePermissionChange(e)}>
                    <option value="" selected disabled hidden>
                      اختر
                    </option>

                    {place &&
                      data &&
                      data
                        ?.filter((x, i) => x["place"] == place)
                        ?.map((x, i) =>
                          x["shiek"].map((y, i) => <option key={i}>{y}</option>)
                        )}
                  </select>
                </div>
              </div>
            ) : permission.first == "القسم" ? (
              <div>
                <div className="flex flex-col  w-auto p-1">
                  <label>
                    المحافظة <span className="text-red-700">*</span>
                  </label>

                  <select
                    className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}>
                    <option value="" selected disabled hidden>
                      اختر
                    </option>

                    {data &&
                      data
                        ?.filter(
                          (v, i, a) =>
                            a.findIndex((v2) => v["city"] === v2["city"]) === i
                        )
                        ?.map((x, i) => <option key={i}>{x["city"]}</option>)}
                  </select>
                </div>
                <div className="flex flex-col  w-auto p-1">
                  <label>
                    المركز/الحي<span className="text-red-700">*</span>
                  </label>
                  <select
                    name="second"
                    disabled={!city}
                    id="countries"
                    className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
                    placeholder="ادخل المركز/الحي"
                    value={permission.second}
                    onChange={(e) => handlePermissionChange(e)}>
                    <option value="" selected disabled hidden>
                      اختر
                    </option>

                    {city &&
                      data &&
                      data
                        .filter((x, i) => x["city"] == city)
                        ?.map((y, i) => <option key={i}>{y["place"]}</option>)}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col  w-auto p-1">
                  <label>
                    المحافظة <span className="text-red-700">*</span>
                  </label>

                  <select
                    disabled={!permission.first}
                    name="second"
                    className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
                    value={permission.second}
                    onChange={(e) => handlePermissionChange(e)}>
                    <option value="" selected disabled hidden>
                      اختر
                    </option>

                    {data &&
                      data
                        ?.filter(
                          (v, i, a) =>
                            a.findIndex((v2) => v["city"] === v2["city"]) === i
                        )
                        ?.map((x, i) => <option key={i}>{x["city"]}</option>)}
                  </select>
                </div>
              </div>
            )}

            <div className="mt-10">
              <button
                type="submit"
                className="w-full  bg-cyan-700 text-white  p-2 rounded-md mt-2 mb-2 "
                onClick={() => handleSubmit()}>
                اضافة حساب{" "}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Register;
