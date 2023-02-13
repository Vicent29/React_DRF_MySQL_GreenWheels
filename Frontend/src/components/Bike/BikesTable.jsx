import React from "react";
import { Link } from "react-router-dom";
import BikesLine from "./BikesLine";
import "./Bike.scss";

export default function BikesTable({
  bikes,
  deleteBike /*, changeStatusBike */,
}) {
  return (
    <div className="d-flex justify-center">
      <table className="mytable table table-striped col-10 text-center bg-light mt-4">
        <thead>
          <tr className="grey">
            <th>ID</th>
            <th>ID_slot</th>
            <th>Status</th>
            <th>PFM</th>
            <th>Img_bike</th>
            <th scope="col">
              <Link to="/addbike">
                <button className="btn btn-outline-info">New Bike</button>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((item) => {
            return (
              <tr key={item.id}>
                <BikesLine bike={item} deleteBike={deleteBike} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


