import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
const Dashboard = () => {
    const { user } = useContext(UserContext);

    return <>{!!user && <h5>{user.name}</h5>}</>;
};

export default Dashboard;
