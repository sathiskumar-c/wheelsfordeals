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
    loan_tenure_options_months,
  } = emiDetails.emi;

  // State Management
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [duration, setDuration] = useState(default_duration_months);
  const [interestRate, setInterestRate] = useState(intrest_rate_percent);

  useEffect(() => {
    const maxLoan = (price * max_loan_percent_of_price) / 100;
    setLoanAmount(maxLoan);
    setDownPayment(price - maxLoan);
  }, [price, max_loan_percent_of_price]);

  const calculateEMI = () => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
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

  const generateAmortizationSchedule = () => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = duration;
    const { EMI } = calculateEMI();

    let schedule = [];
    let remainingBalance = P;

    for (let month = 1; month <= N; month++) {
      const interest = remainingBalance * R;
      const principal = EMI - interest;
      remainingBalance -= principal;

      schedule.push({
        month,
        openingBalance: remainingBalance + principal,
        principal: principal.toFixed(0),
        interest: interest.toFixed(0),
        closingBalance: Math.max(0, remainingBalance.toFixed(0)),
      });
    }

    return schedule;
  };

  const { EMI, totalInterest, totalPayable } = calculateEMI();
  const amortizationSchedule = generateAmortizationSchedule();

  // Show only first 12 months in table
  const displaySchedule = amortizationSchedule.slice(0, 12);

  return (
    <div className="emi-calculator-wrapper">
      {/* Header Section */}
      <div className="emi-header">
        <div className="emi-header-content">
          <p className="emi-financial-label">FINANCIAL PLANNING</p>
          <h2 className="emi-title">EMI Calculator</h2>
          <p className="emi-description">
            Precision-engineered loan projections. Adjust your parameters below to visualize
            your amortization schedule and total interest commitment.
          </p>
        </div>
        <div className="emi-header-buttons">
          <button className="btn-save-scenario">Save Scenario</button>
          <button className="btn-detailed-report">Get Detailed Report</button>
        </div>
      </div>

      {/* Main EMI Calculator */}
      <div className="emi-calculator">
        {/* Desktop/Tablet Layout */}
        <div className="emi-desktop">
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
              <label>Interest Rate (Annual)</label>
              <input
                type="range"
                min={1}
                max={20}
                step={0.5}
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              />
              <p>{interestRate}%</p>
            </div>

            <div className="control">
              <label>Loan Tenure</label>
              <input
                type="range"
                min={min_duration_months}
                max={max_duration_months}
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
              />
              <p>{duration} Months</p>
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

            <button className="eligibility-btn">Check Eligibility</button>
          </div>

          <div className="emi-output">
            <div className="emi-card">
              <p className="emi-label">MONTHLY INSTALLMENT (EMI)</p>
              <span className="emi-amount">₹{parseInt(EMI).toLocaleString()}</span>

              <div className="emi-breakdown">
                <div className="breakdown-item">
                  <p>PRINCIPAL</p>
                  <h6>₹{loanAmount.toLocaleString()}</h6>
                </div>
                <div className="breakdown-item">
                  <p>TOTAL INTEREST</p>
                  <h6>₹{totalInterest.toLocaleString()}</h6>
                </div>
                <div className="breakdown-item">
                  <p>TOTAL PAYMENT</p>
                  <h6>₹{totalPayable.toLocaleString()}</h6>
                </div>
              </div>
            </div>

            <div className="chart-section">
              <div className="chart-card">
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: loanAmount,
                          color: "#008B4D",
                        },
                        {
                          id: 1,
                          value: totalInterest,
                          color: "rgba(0, 139, 77, 0.3)",
                        },
                      ],
                      innerRadius: 45,
                      outerRadius: 80,
                    },
                  ]}
                  width={240}
                  height={240}
                />
              </div>
              <div className="chart-labels">
                <p>
                  <span style={{ background: "#008B4D" }}></span> Principal{" "}
                  <strong>₹{loanAmount.toLocaleString()}</strong>
                </p>
                <p>
                  <span style={{ background: "rgba(0, 139, 77, 0.3)" }}></span>{" "}
                  Interest{" "}
                  <strong>₹{totalInterest.toLocaleString()}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="emi-mobile">
          <div className="emi-card-mobile">
            <p className="emi-label">ESTIMATED MONTHLY PAYMENT</p>
            <span className="emi-amount-mobile">₹{parseInt(EMI).toLocaleString()}</span>
            <p className="emi-subtext">
              <span>PRINCIPAL: ₹{loanAmount.toLocaleString()}</span>
              <span>INTEREST: ₹{totalInterest.toLocaleString()}</span>
            </p>
          </div>

          <div className="mobile-controls">
            <div className="control-mobile">
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

            <div className="control-mobile">
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

            <div className="control-mobile">
              <label>Duration of Loan</label>
              <div className="tenure-buttons">
                {loan_tenure_options_months.map((month) => (
                  <button
                    key={month}
                    className={`tenure-btn ${duration === month ? "active" : ""}`}
                    onClick={() => setDuration(month)}
                  >
                    {month}m
                  </button>
                ))}
              </div>
            </div>

            <div className="control-mobile">
              <label>Interest Rate (%)</label>
              <input
                type="range"
                min={1}
                max={20}
                step={0.5}
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              />
              <p>{interestRate}%</p>
            </div>
          </div>

          <div className="payment-composition">
            <h5>PAYMENT COMPOSITION</h5>
            <div className="composition-chart">
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: loanAmount,
                        color: "#008B4D",
                      },
                      {
                        id: 1,
                        value: totalInterest,
                        color: "rgba(0, 139, 77, 0.3)",
                      },
                    ],
                    innerRadius: 30,
                    outerRadius: 60,
                  },
                ]}
                width={200}
                height={200}
              />
            </div>
            <div className="composition-details">
              <div className="detail-item">
                <span style={{ background: "#008B4D" }}></span>
                <div>
                  <p>Total Repayment</p>
                  <h6>₹{totalPayable.toLocaleString()}</h6>
                </div>
              </div>
              <div className="detail-item">
                <span style={{ background: "rgba(0, 139, 77, 0.3)" }}></span>
                <div>
                  <p>Total Interest</p>
                  <h6>₹{totalInterest.toLocaleString()}</h6>
                </div>
              </div>
            </div>
          </div>

          <button className="eligibility-btn-mobile">Check Eligibility</button>
        </div>

        {/* Amortization Schedule - Shows on Desktop for first 12 months */}
        <div className="amortization-section">
          <h4>AMORTIZATION SCHEDULE (Year 1)</h4>
          <div className="table-wrapper">
            <table className="amortization-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Opening Balance</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                {displaySchedule.map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td>₹{parseInt(row.openingBalance).toLocaleString()}</td>
                    <td>₹{parseInt(row.principal).toLocaleString()}</td>
                    <td>₹{parseInt(row.interest).toLocaleString()}</td>
                    <td>₹{parseInt(row.closingBalance).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

EMICalculator.propTypes = {
  price: PropTypes.number.isRequired,
  emiDetails: PropTypes.object.isRequired,
};

export default EMICalculator;