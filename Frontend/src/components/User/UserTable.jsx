import React from "react";
import UserLine from "./UserLine";
import "./User.scss";

export default function UserTable({users, changeStatus}) {
  return (
    <div className="d-flex justify-center overflow-auto h-[80vh]">
      <table className="mytable table table-striped lg:col-10 md:col-12 text-center bg-light mt-4">
        <thead className="sticky top-0" >
          <tr className="grey"fixed>
            <th>ID</th>
            <th>Img</th>
            <th>FName</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr key={item.id}>
                <UserLine user={item} changeStatus={changeStatus}/>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


