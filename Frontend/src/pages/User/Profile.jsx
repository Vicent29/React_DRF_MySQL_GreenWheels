// import React from 'react'
// import { useBikes } from '../../hooks/useBikes'
import UpdateUser from "../../components/User/UpdateUser";

export default function Profile() {
  // const { bikes, deleteBike } = useBikes()
  return (
    <>
      <section class>
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-4">
              <div class="card mb-4">
                <div class="card-body text-center">
                  <UpdateUser></UpdateUser>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card mb-4">
                <h3>Incidents</h3>
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                  <table className="text-center table table-bordered table-striped mb-0 table-light">
                    <thead className="bord_thead">
                      <tr>
                        <th scope="col">IMG</th>
                        <th scope="col">Name</th>
                        <th scope="col">Day</th>
                        <th scope="col">Hour</th>
                        <th scope="col">Satus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.reservas.length !== 0 ? (
                        state.reservas.map((reserve) => (
                          <tr key={reserve.id}>
                            <th scope="row">
                              <img
                                className="img_reserve"
                                src="https://architecturesideas.com/wp-content/uploads/2020/10/Guide-to-Restaurant-Tables-5.jpg"
                                alt=""
                              />
                            </th>
                            <td>Table {}</td>
                            <td>{reserve.dateini.split(" ")[0]}</td>
                            <td>
                              {reserve.dateini.split(" ")[2].split("h")[0]}:00
                            </td>
                            <td>
                              {reserve.is_confirmed === "accepted" ? (
                                <FontAwesomeIcon
                                  className="bg-green"
                                  icon={["fas", "check"]}
                                />
                              ) : reserve.is_confirmed === "pending" ? (
                                <FontAwesomeIcon
                                  className="bg-blue"
                                  icon={["fas", "arrows-rotate"]}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  className="bg-red"
                                  icon={["fas", "x"]}
                                />
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            <b>No Reserves Yet</b>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
