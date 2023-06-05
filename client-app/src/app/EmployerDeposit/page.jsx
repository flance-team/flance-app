"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = `http://localhost:3000`;

const EmployerDeposit = () => {
  const [balance, setBalance] = useState({});

  const getBalance = async () => {
    const response = await axios.get(
      `${baseUrl}/transactions/employer/balance`,
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    setBalance(response.data);
  };

  useEffect(() => {
    // localStorage.setItem(
    //   "access_token",
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtcEBtYWlsLmNvbSIsInJvbGUiOiJlbXBsb3llciIsImlkIjoxLCJpYXQiOjE2ODU4NjQ0NzB9.SJOzBp4WOuQJ9zZyPE8DQe0efUp2KDODEH2RwzFg0T8"
    // );
    getBalance();
  }, []);

  console.log(balance);

  return (
    <div className="min-w-screen">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Your Deposit</h1>
            <p className="py-6">
              You can easily view your pay off balance by logging into your
              online account. The pay off balance can be accessed and checked at
              any time through the dedicated mobile app..
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="flex">
                <label className="label">
                  <span className="label-text text-xl">Balance: </span>
                </label>
                <h2 className="self-center">
                  {balance.balance > 0 ? <h1>Rp</h1> : null}
                  {balance.balance}
                </h2>
              </div>
              <div className="form-control">
                <label htmlFor="">Amount you want to withdraw</label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Withdraw</button>
              </div>
              <div className="form-control">
                <label htmlFor="">Amount you want to deposit</label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Deposit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDeposit;
