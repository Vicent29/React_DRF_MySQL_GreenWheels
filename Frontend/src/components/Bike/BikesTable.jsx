import React from "react";
import { Link } from "react-router-dom";
import BikesLine from "./BikesLine";
import "./Bike.scss";
import FormBike from "./BikeForm";

export default function BikesTable({bikes, slots, deleteBike , changeStatusBike, updateBike}) {
  return (
    <div className="d-flex justify-center overflow-auto max-h-screen">
      <FormBike/>
      <table className="mytable table table-striped col-10 text-center bg-light mt-4">
        <thead className="sticky top-0" >
          <tr className="grey className="fixed>
            <th>ID</th>
            <th>ID_slot</th>
            <th>Status</th>
            <th>PFM</th>
            <th>Img_bike</th>
            <th scope="col">
              {/* <Link to="/addbike"> */}
                <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#ModalNewBike">New Bike</button>
              {/* </Link> */}
            </th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((item) => {
            return (
              <tr key={item.id}>
                <BikesLine bike={item} slots={slots} deleteBike={deleteBike} changeStatusBike={changeStatusBike} updateBike={updateBike}/>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


