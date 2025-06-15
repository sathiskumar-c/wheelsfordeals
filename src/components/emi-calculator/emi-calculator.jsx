// React Imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// MUI Imports
import { PieChart } from "@mui/x-charts/PieChart";

// Local Imports
import "./emi-calculator.scss";

const EMICalculator = ({ price, emiDetails }) => {
  // Destructure
  const {
    intrest_rate_percent,
    emi_type,
    min_duration_months,
    max_duration_months,
    default_duration_months,
    max_loan_percent_of_price,
  } = emiDetails.emi;

  // State Management
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [duration, setDuration] = useState(default_duration_months);

  useEffect(() => {
    const maxLoan = (price * max_loan_percent_of_price) / 100;
    setLoanAmount(maxLoan);
    setDownPayment(price - maxLoan);
  }, [price, max_loan_percent_of_price]);

  const calculateEMI = () => {
    const P = loanAmount;
    const R = intrest_rate_percent / 12 / 100;
    const N = duration;

    let EMI = 0;
    if (emi_type === "flat") {
      EMI = ((P + P * R * N) / N).toFixed(0);
    } else {
      EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      EMI = EMI.toFixed(0);
    }

    const totalInterest = EMI * N - P;
    const totalPayable = parseInt(EMI * N);

    return {
      EMI,
      totalInterest,
      totalPayable,
    };
  };

  const { EMI, totalInterest, totalPayable } = calculateEMI();

  return (
    <div className="emi-calculator">
      <div className="emi-output">
        <div
          style={{ borderBottom: "1px solid #f6f6f6", paddingBottom: "10px" }}
        >
          <p className="mb-0 emi-amount-title">EMI starting from </p>
          <span className="emi-amount">
            ₹{parseInt(EMI).toLocaleString()} <span>per month</span>
          </span>
        </div>

        <div className="summary">
          <div className="summary__item">
            <p>Principal Loan Amount</p>
            <h6>₹{loanAmount.toLocaleString()}</h6>
          </div>
          <div className="summary__item">
            <p>Total Interest Payable</p>
            <h6>₹{totalInterest.toLocaleString()}</h6>
          </div>
          <div className="summary__total">
            <p>Total Amount Payable</p>
            <h6>₹{totalPayable.toLocaleString()}</h6>
          </div>
        </div>

        <div className="chart-card">
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: totalInterest,
                    color: "rgba(0,226,174,0.5)",
                  },
                  {
                    id: 1,
                    value: loanAmount,
                    color: "#00E2AE",
                  },
                ],
                innerRadius: 40,
                outerRadius: 70,
              },
            ]}
            width={200}
            height={200}
          />
          <div className="chart-labels">
            <p>
              <span style={{ background: "#00E2AE" }}></span> Principal
            </p>
            <p>
              <span style={{ background: "rgba(0,226,174,0.5)" }}></span>{" "}
              Interest
            </p>
          </div>
        </div>
      </div>

      <div className="emi-controls">
        <div className="control">
          <label>Loan Amount</label>
          <input
            type="range"
            min={100000}
            max={price}
            value={loanAmount}
            onChange={(e) => {
              const loan = parseInt(e.target.value);
              setLoanAmount(loan);
              setDownPayment(price - loan);
            }}
          />
          <p>₹{loanAmount.toLocaleString()}</p>
        </div>

        <div className="control">
          <label>Down Payment</label>
          <input
            type="range"
            min={0}
            max={price}
            value={downPayment}
            onChange={(e) => {
              const down = parseInt(e.target.value);
              setDownPayment(down);
              setLoanAmount(price - down);
            }}
          />
          <p>₹{downPayment.toLocaleString()}</p>
        </div>

        <div className="control">
          <label>Duration of Loan</label>
          <input
            type="range"
            min={min_duration_months}
            max={max_duration_months}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
          <p>{duration} Months</p>
        </div>

        <button className="eligibility-btn">Check Eligibility</button>
      </div>
    </div>
  );
};

EMICalculator.propTypes = {
  price: PropTypes.number.isRequired,
  emiDetails: PropTypes.object.isRequired,
};

export default EMICalculator;
