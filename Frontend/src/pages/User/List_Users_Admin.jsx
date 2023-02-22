import React, { useEffect } from "react";
import UserTable from "../../components/User/UserTable";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { users, getUsers, changeStatus } = useAuth();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <UserTable users={users} changeStatus={changeStatus} />
    </>
  );
}
