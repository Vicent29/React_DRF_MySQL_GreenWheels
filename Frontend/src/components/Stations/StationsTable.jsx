import React from 'react'
import { Link } from 'react-router-dom'
import StationLine from './StationsLine'
import "./Stations.scss";

export default function StationsTable({ stations, deleteStation/*, changeStatusBike */ }) {

    return (
        <div className="d-flex justify-center overflow-auto max-h-screen">
        <table className="mytable table table-striped col-10 text-center bg-light mt-4">
          <thead className="sticky top-0" >
            <tr className="grey ">
              <th>ID</th>
              <th>Slug</th>
              <th>Name</th>
              <th>Long</th>
              <th>Lat</th>
              <th>Img</th>
              <th scope="col">
                <Link to="/addstation">
                  <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#ModalNewStation">New Bike</button>
                </Link>
              </th>
            </tr>
          </thead>
           <tbody>
                {stations.map(item => {
                    return <tr key={item.id}><StationLine station={item} deleteStation={deleteStation} /></tr>
                })}
            </tbody>
        </table>
      </div>
    );
}