import React from "react";
import TestDriveBookingForm from "../../components/book-test-ride/book-test-ride";
import bikeImg from "../../../public/images/illustrations/bike.svg";

const BookRide = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <TestDriveBookingForm />
        </div>

        <div className="col-md-6 p-5">
          <img src={bikeImg} alt="bike" />
        </div>
      </div>
    </div>
  );
};

export default BookRide;
