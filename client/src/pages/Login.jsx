import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;

        try {
            const { data } = await axios.post("/login", {
                email,
                password,
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <form onSubmit={loginUser}>
                <div className="input-group">
                    <label htmlFor="email" className="input-group-text"></label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter Your email"
                        className="form-control"
                        value={data.email}
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                    />
                </div>
                <div className="input-group">
                    <label
                        htmlFor="password"
                        className="input-group-text"
                    ></label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        placeholder="Enter Your password"
                        className="form-control"
                        value={data.password}
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;
