import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import { Steps, DatePicker } from "antd";
import { Form, Button, Col } from "react-bootstrap";
import Login from "../pages/Login";
import { StateContext } from "../Context";
import axios from "axios";
import util from "../util/util";

const { Step } = Steps;

export default class OtherEvent extends Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        "Yay, we love Celebrations! \n First off ... what's your name?",
        "What are you celebrating ?",
        " \n when is your Special day?",
        "How many guests are you inviting?",
      ],
      answers: ["", "", "", ""],
      firstOff: "",
      eventName: "",
      specialDay: "",
      noOfGuests: 0,
      currentIndex: 0,
      formValue: "",
      eventDate: null,
      formField: {},
      eventType: "",
      message: "",
      errors: "",
      errorMessage: "",
      signUpResponse: { successful: false },
      isValidated: false,
      isLogged: false,
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dateChange = this.dateChange.bind(this);
  }

  componentDidMount() {
    if (window.localStorage.token_id) {
      this.setState({ isLogged: true, currentIndex: 1 });
    }
    axios
      .get(`${util.API_BASE_URL}event-types/`, {
        "content-type": "multipart/form-data",
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data !== undefined) {
          let data = res.data;
          let eventtype;
          for (let i = 0; i < data.length; i++) {
            if (data[i].name === "Wedding") {
              eventtype = data[i].id;
            }
          }
          this.setState({ eventType: eventtype });
        }
        // console.log(this.state.eventType);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  handleChanger(e) {
    let formField = this.state.formField;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    formField[e.target.name] = value;
    this.setState({
      formField,
    });
    // console.log(formField);
  }

  dateChange(date, dateString) {
    this.setState({ eventDate: dateString });
    if (this.state.isLogged) {
      window.localStorage.setItem("evnt_date", dateString);
    }
    // console.log(date, dateString);
  }
  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  };
  mapEventdateAndNext = (e) => {
    e.preventDefault();
    if (this.state.eventDate !== null) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
      });
    }
  };

  validateField() {
    let errors = {};
    let fieldIsValid = true;
    if (!this.state.formValue) {
      fieldIsValid = false;
      errors["firstName"] = "*This field is required.";
    }

    this.setState({ errors: errors });
    console.log(fieldIsValid);
    return fieldIsValid;
  }

  mapValueAndNext = (e) => {
    e.preventDefault();
    // console.log(this.state.formValue);
    // console.log(this.state.currentIndex);
    let value = this.state.formValue;
    let currentIndex = this.state.currentIndex;

    // if (this.state.currentIndex > 3 ) {
    //   this.setState({ currentIndex: currentIndex + 1 });
    //   return;
    // }

    let answers = this.state.answers;
    answers[currentIndex] = value;
    this.setState({ answers: answers });
    // console.dir(this.state);
    // console.log(this.state.answers);
    if (this.validateField()) {
      this.setState({ currentIndex: currentIndex + 1 });
      this.setState({ formValue: this.state.answers[currentIndex + 1] });
    }
    if (this.state.isLogged) {
      window.localStorage.setItem("title", this.state.answers[1]);
    }
  };

  goBack = () => {
    let formValue = this.state.answers[this.state.currentIndex - 1];
    if (this.state.currentIndex <= 0) {
      return;
    }

    if (this.state.currentIndex <= 4) {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
      this.setState({ formValue: formValue });
      console.log(this.state.formValue);
    }
  };
  validateForm() {
    let formField = this.state.formField;
    let errors = {};
    console.log("called");
    let formIsValid = true;
    if (!formField["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof formField["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(formField["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }
    if (!formField["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }
    if (!formField["checked"]) {
      formIsValid = false;
      errors["checked"] = "*Check the box.";
    }

    if (formField["password"] !== formField["confirm_password"]) {
      formIsValid = false;
      errors["confirm_password"] = "*Password mismatch.";
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  }
  handleSubmit(event) {
    console.log(this.validateForm());

    event.preventDefault();
    if (this.validateForm()) {
      let formField = this.state.formField;
      const newUserInfo = new FormData();
      newUserInfo.append("first_name", this.state.answers[0]);
      newUserInfo.append("email", formField["email"]);
      newUserInfo.append("password", formField["password"]);
      newUserInfo.append(
        "event_type",
        window.localStorage.getItem("eventTypeId")
      );
      newUserInfo.append(
        "title",
        `${this.state.answers[0]}'s ${this.state.answers[1]}`
      );
      newUserInfo.append("event_date", this.state.eventDate);
      newUserInfo.append("no_guest", this.state.answers[3]);
      newUserInfo.append("spouse_name", "");
      newUserInfo.append("photo", "");
      window.localStorage.setItem("event_date", this.state.eventDate);
      axios
        .post(`${util.API_BASE_URL}accounts/register/`, newUserInfo, {
          "content-type": "multipart/form-data",
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 201 || response.status === 200) {
            // console.log(response.statusText);
            window.localStorage.setItem(
              "token_id",
              response.data["Registration Successful"].token
            );
            this.setState({
              message: `Dear ${this.state.answers[0]},We have sent you an email '${this.state.formField["email"]}' with your verification link.`,
            });
            window.location.href = "/updateprofile";
          }
        })
        .catch((error) => {
          console.dir(error);
          if (error.response.data.Error !== undefined) {
            this.setState({ errorMessage: error.response.data.Error });
          } else {
            this.setState({ errorMessage: error.response.data.password });
          }

          // console.log(error.response.data.Error);
          // console.log(error.response.data.password);
        });
    }
  }

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-4 d-none d-lg-flex align-items-center justify-content-center"
              style={{
                background: "rgb(114, 10, 10)",
                height: "100vh",
                opacity: "1",
              }}
            >
              <div className="mt-5">
                <Link className="" to="/">
                  <img
                    className="homeicon rounded-circle"
                    src={sabigift}
                    alt="SabiGift-Logo"
                  />
                </Link>

                <div>
                  <h4 className="text-white">WHY OUR SERVICES?</h4>
                </div>
                <Steps className="text-white" direction="vertical">
                  <Step
                    className="tail mb-3"
                    title="Lorem ipsum lorem ipsum"
                    description="Lorem ipsum lorem sioe"
                  />
                  <Step
                    className="tail mb-3"
                    title="Lorem ipsum lorem ipsum"
                    description="Lorem ipsum lorem sioe"
                  />
                  <Step
                    className="tail mb-3"
                    title="Lorem ipsum lorem ipsum"
                    description="Lorem ipsum lorem sioe"
                  />
                  <Step
                    className="tail mb-3"
                    title="Lorem ipsum lorem ipsum"
                    description="Lorem ipsum lorem sioe"
                  />
                  <Step
                    className="tail mb-3"
                    title="Lorem ipsum lorem ipsum"
                    description="Lorem ipsum lorem sioe"
                  />
                </Steps>
              </div>
            </div>
            <div className="col">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  color: "#888888",
                  height: "90vh",
                  fontFamily: "arial",
                }}
              >
                {this.state.currentIndex === 2 && (
                  <div>
                    {this.state.isLogged
                      ? (
                          "Hey " +
                          window.localStorage.name +
                          " " +
                          "! " +
                          this.state.questions[2]
                        )
                          .split("\n")
                          .map((text, index) => <h2 key={index}>{text}</h2>)
                      : (
                          "Hey " +
                          this.state.answers[0] +
                          " " +
                          "! " +
                          this.state.questions[2]
                        )
                          .split("\n")
                          .map((text, index) => <h2 key={index}>{text}</h2>)}
                    <div className="mt-4">
                      <form>
                        <DatePicker
                          className="registryInput"
                          required
                          onChange={this.dateChange}
                          disabledDate={this.disabledDate}
                        />
                        {this.state.currentIndex === 0 && (
                          <Button
                            type="submit"
                            className="registryBtn  py-2 px-4 rounded-pill"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Get started
                          </Button>
                        )}
                        {this.state.currentIndex > 0 && (
                          <Button
                            className="registryBtn px-5 py-2 rounded-pill "
                            onClick={
                              this.state.isLogged
                                ? (e) =>
                                    this.setState({
                                      currentIndex: this.state.currentIndex + 1,
                                    })
                                : (e) => this.mapEventdateAndNext(e)
                            }
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Button>
                        )}
                      </form>
                    </div>
                  </div>
                )}
                {this.state.currentIndex !== 2 && this.state.currentIndex < 3 && (
                  <div>
                    {this.state.questions[this.state.currentIndex]
                      .split("\n")
                      .map((text, index) => (
                        <h2 key={index}>{text}</h2>
                      ))}
                    {/* <h2>Yay, we love weddings! <br/>First off ... what's your name?</h2> */}
                    <div className="mt-4">
                      <form>
                        <p style={{ color: "#dd2b0e", fontSize: "0.875rem" }}>
                          {this.state.errors["firstName"]}
                        </p>
                        <input
                          value={this.state.formValue}
                          onChange={(e) =>
                            this.setState({ formValue: e.target.value })
                          }
                          className="p-2 registryInput"
                          name="firstName"
                          type="text"
                          placeholder="Enter Name"
                          pattern="[A-Za-z]"
                          required
                        />

                        {this.state.currentIndex === 0 && (
                          <Button
                            type="submit"
                            className=" registryBtn px-4 py-2 rounded-pill"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Get satrted
                          </Button>
                        )}
                        {this.state.currentIndex > 0 && (
                          <Button
                            type="submit"
                            className="registryBtn px-5 py-2 rounded-pill"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Button>
                        )}
                      </form>
                    </div>
                  </div>
                )}
                {this.state.currentIndex === 3 && (
                  <div>
                    {this.state.questions[this.state.currentIndex]
                      .split("\n")
                      .map((text, index) => (
                        <h2 key={index}>{text}</h2>
                      ))}
                    {/* <h2>Yay, we love weddings! <br/>First off ... what's your name?</h2> */}
                    <div className="mt-4">
                      <form>
                        <p style={{ color: "#dd2b0e", fontSize: "0.875rem" }}>
                          {this.state.errors["firstName"]}
                        </p>
                        <input
                          value={this.state.formValue}
                          onChange={(e) =>
                            this.setState({ formValue: e.target.value })
                          }
                          name="firstName"
                          className="p-2 registryInput"
                          type="number"
                          placeholder="Enter Number of Guest"
                          pattern="[0-9]"
                          required
                        />

                        {this.state.currentIndex === 0 && (
                          <Button
                            type="submit"
                            className="registryBtn py-2 px-4 rounded-pill "
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Get started
                          </Button>
                        )}
                        {this.state.currentIndex > 0 && (
                          <Button
                            className="registryBtn px-5 py-2 rounded-pill btn-outline-light"
                            onClick={
                              this.state.isLogged
                                ? (e) =>
                                    (window.location.href = "/updateprofile")
                                : (e) => this.mapValueAndNext(e)
                            }
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Button>
                        )}
                        {/* {this.state.currentIndex > 0 && (
                          <Link
                            to="/updateprofile"
                            className="registryBtn px-5 py-2 rounded-pill btn-outline-light"
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Link>
                        )} */}
                      </form>
                    </div>
                  </div>
                )}
                {this.state.currentIndex === 4 && (
                  <div className="">
                    <h2>
                      Good News! You can create <br />a free registry on
                      SabiGifts.
                    </h2>
                    <h2>Let's create your account.</h2>

                    <Form className="">
                      <Form.Row>
                        <Form.Group as={Col} controlId="formEmail">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            name="email"
                            type="email"
                            onChange={this.handleChanger}
                            placeholder="Enter Email Address"
                            required
                          />
                          <span
                            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                          >
                            {this.state.errors["email"]}
                          </span>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            name="password"
                            onChange={this.handleChanger}
                            type="password"
                            required
                            placeholder="*******"
                          />
                          <span
                            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                          >
                            {this.state.errors["password"]}
                          </span>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridConfirm">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control.Feedback type="invalid">
                            Empty
                          </Form.Control.Feedback>
                          <Form.Control
                            name="confirm_password"
                            onChange={this.handleChanger}
                            type="password"
                            placeholder="*********"
                            required
                          />
                          <span
                            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                          >
                            {this.state.errors["confirm_password"]}
                          </span>
                        </Form.Group>
                      </Form.Row>
                      <Form.Group id="formGridCheckbox">
                        <Form.Check
                          type="checkbox"
                          onChange={this.handleChanger}
                          name="checked"
                          label="I have read the Privacy Policy and agree to the Terms of Service."
                          required
                        />
                        <span
                          style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                        >
                          {this.state.errors["checked"]}
                        </span>
                      </Form.Group>
                      {this.state.errorMessage && !this.state.message && (
                        <p style={{ color: "red", textAlign: "center" }}>
                          {this.state.errorMessage}{" "}
                        </p>
                      )}
                      {this.state.message && (
                        <p style={{ color: "green", textAlign: "center" }}>
                          {this.state.message}{" "}
                        </p>
                      )}
                    </Form>
                  </div>
                )}
              </div>
              <div className="text-center">
                {this.state.currentIndex <= 0 && (
                  <span
                    onClick={() => (window.location.href = "/createregistry")}
                    className="px-4 py-2 "
                    style={{
                      cursor: "pointer",
                      background: "#ffffff",
                      border: "1px solid #DDDDDD",
                      borderRadius: "50px",
                    }}
                  >
                    Back
                  </span>
                )}
                {this.state.currentIndex >= 1 && this.state.currentIndex <= 3 && (
                  <span
                    onClick={() => this.goBack()}
                    className="px-4 py-2"
                    style={{
                      cursor: "pointer",
                      background: "#ffffff",
                      border: "1px solid #DDDDDD",
                      borderRadius: "50px",
                    }}
                  >
                    Back
                  </span>
                )}
                {this.state.currentIndex === 4 && (
                  <div className=" d-flex justify-content-around">
                    <span>
                      Already a member?
                      <Login signup={<span>Log in</span>} />
                    </span>
                    <Button
                      type="submit"
                      onClick={this.handleSubmit}
                      className="px-5 py-2"
                      style={{
                        cursor: "pointer",
                        fontSize: "0.25 rem",
                        background: "#AAAAAA",
                        border: "1px solid #DDDDDD",
                        borderRadius: "50px",
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
