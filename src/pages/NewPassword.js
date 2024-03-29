import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import util from "../util/util";
// import Home from "./Home";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavigationBar";

export default class NewPassword extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      timestamp: "",
      signature: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  notifyPass = () => {
    toast.success("Password reset succesfull, Proceed to Login", {
      autoClose: 2000,
    });
  };

  validateForm() {
    // let formField = this.state.formField;
    let errors = {};
    let formIsValid = true;

    if (!this.state.password) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (this.state.password !== this.state.confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "*password mismatch.";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const { user_id, timestamp, signature, password } = this.state;
      axios
        .post(
          `${util.API_BASE_URL}accounts/reset-password/`,
          { user_id, timestamp, signature, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          if (data.status === 200 || data !== undefined) {
            console.log(data.status);
            this.notifyPass();
            this.setState({ password: "", confirmPassword: "" });
            //   window.localStorage.setItem("token_id", data.data.token);
            //   window.localStorage.setItem("username", data.data.email);
            //   window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.log(error);
          // if (error.status === 400) window.location.href = "/";
        });
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const user_id = query.get("user_id");
    const timestamp = query.get("timestamp");
    const signature = query.get("signature");
    if (user_id) {
      this.setState({ user_id: user_id });
    }
    if (timestamp) {
      this.setState({ timestamp: timestamp });
    }
    if (signature) {
      this.setState({ signature: signature });
    }
  }

  render() {
    return (
      <>
        {/* <Home /> */}
        <div className=" container-fluid">
          <NavBar />
          <hr className=" p-0 m-0" />
          <div className="row justify-content-center ">
            <div
              className="col-lg-4 mt-5 p-4 col-sm"
              style={{ border: "1px solid #eeeeee" }}
            >
              <h4 className="p-2 text-center mb-4">
                Please input new password
              </h4>
              <Form onSubmit={this.onSubmit}>
                <Form.Group>
                  {/* <Form.Label>User Id</Form.Label> */}
                  <Form.Control
                    type="text"
                    name="email"
                    value={this.state.user_id}
                    onChange={this.changeHandler}
                    // readOnly
                    hidden
                    placeholder="Enter user Id"
                    required
                  />
                </Form.Group>

                <Form.Group>
                  {/* <Form.Label>Timestamp</Form.Label> */}
                  <Form.Control
                    type="text"
                    name="password"
                    hidden
                    value={this.state.timestamp}
                    onChange={this.changeHandler}
                    // readOnly
                    placeholder="Timestamp"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  {/* <Form.Label>Signature</Form.Label> */}
                  <Form.Control
                    type="text"
                    name="signature"
                    // readOnly
                    hidden
                    value={this.state.signature}
                    onChange={this.changeHandler}
                    placeholder="Signature"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    // readOnly
                    onChange={this.changeHandler}
                    value={this.state.password}
                    placeholder="New Password"
                  />
                </Form.Group>
                <span style={{ color: "#dd2b0e", fontSize: "0.875rem" }}>
                  {this.state.errors["password"]}
                </span>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Confirm new Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    // readOnly
                    onChange={this.changeHandler}
                    value={this.state.confirmPassword}
                    placeholder="Confirm Password"
                  />
                </Form.Group>
                <span style={{ color: "#dd2b0e", fontSize: "0.875rem" }}>
                  {this.state.errors["confirmPassword"]}
                </span>
                <Button
                  className="w-100 mt-5"
                  variant="success"
                  type="submit"
                  style={{ background: "#58B852", color: "#ffffff" }}
                >
                  Send
                </Button>
                <ToastContainer />
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
