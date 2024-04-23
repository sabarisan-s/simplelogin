import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        try {
            const { data } = await axios.post("/register", {
                name,
                email,
                password,
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                toast.success("Login successful welcome!");
                navigate("/login");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <form onSubmit={registerUser}>
                <div className="input-group">
                    <label htmlFor="name" className="input-group-text">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Your Name"
                        className="form-control"
                        value={data.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email" className="input-group-text">Email</label>
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
                    >Password</label>
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

                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
