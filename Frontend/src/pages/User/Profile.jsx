import React, { useContext } from 'react'
import UpdateUser from "../../components/User/UpdateUser";
import UserRentProfile from '../../components/User/UserRentProfile';
import UserAdminProfile from '../../components/User/UserAdminProfile';
import AuthContextProvider from '../../context/AuthContext';
import Incident from "../../components/Incident/Incident";

export default function Profile() {
  const { isAdmin, user } = useContext(AuthContextProvider)

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
            {/* Rent Profile or User Admin */}
            {!user.opt_profile && (
              <div className="col-lg-8 h-[80vh] overflow-auto">
                <div className="card mb-4 bg-dark">
                    {isAdmin && (
                      <UserAdminProfile />
                    )}
                    {!isAdmin && (
                      <UserRentProfile />
                    )}
                </div>
              </div>
            )}
            {/* Incident */}
            {user.opt_profile && (
              <>
                <div className="col-lg-8 h-[80vh]">
                  <div className="card mb-4 bg-black ">
                    <Incident />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
