import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../App";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
    const context = useContext(MyContext);
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        context.setIsHeaderFooter(true);
    }, [context]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/user/signup", {
                UserName: formData.username,
                email: formData.email,
                password: formData.password,
            });

            alert(response.data.Message);
            setFormData({ username: "", email: "", password: "" });
            history.push("/play/instructions"); 
        } catch (error) {
            alert(error.response?.data?.Message || "Error during sign-up.");
        }
    };

    return (
        <section className="section signin signup">
            <div className="container pt-5">
                <div className="box card shadow border-0">
                    <form className="mt-2" onSubmit={handleSignUp}>
                        <h2 className="text-center p-2" style={{ color: "black", fontWeight: "600", fontSize: "35px" }}>
                            Sign Up
                        </h2>
                        <div className="form">
                            <TextField
                                className="w-100 textfiled"
                                name="username"
                                label="UserName"
                                type="text"
                                required
                                variant="standard"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form">
                            <TextField
                                className="w-100 textfiled"
                                name="email"
                                label="Email"
                                type="email"
                                required
                                variant="standard"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form">
                            <TextField
                                className="w-100 textfiled"
                                name="password"
                                label="Password"
                                type="password"
                                required
                                variant="standard"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex align-items-center mt-4 mb-3">
                            <Button type="submit" style={{ background: '#337ab7', color: "white" }} className="btn-blue btn-lg btn-big col">
                                Sign Up
                            </Button>
                            <Link to="/">
                                <Button variant="outlined" className="btn-lg btn-big col ml-2">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                        <p className="inline-text pb-5">
                            Already Registered?{" "}
                            <Link to="/signup" className="border-effect ">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
