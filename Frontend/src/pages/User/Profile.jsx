import React from 'react'
import UpdateUser from "../../components/User/UpdateUser";
import UserRentProfile from '../../components/User/UserRentProfile';

export default function Profile() {

  return (
    <>
      <section>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body  bg-gray-300 rounded  text-center">
                  <UpdateUser />
                </div>
              </div>
            </div>
            <div className="col-lg-8 h-[80vh] overflow-auto">
              <div className="card mb-4 bg-dark">
                <UserRentProfile />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
