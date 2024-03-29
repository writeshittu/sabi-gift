import React, { Component } from "react";
import { Modal, Form, Col } from "react-bootstrap";
import coupleimg from "../images/landing/coupleimg.png";
import { Link } from "react-router-dom";
import axios from "axios";
import util from "../util/util";

export default class Findevent extends Component {
  state = {
    result: [],
    searchedValue: "",
    error: "",
    successful: false,
    modalShow: false,
  };
  setModalHide = () => {
    this.setState({ modalShow: false });
  };

  setModalShow = () => {
    this.setState({ modalShow: true });
  };

  validateForm() {
    let error;
    let formIsValid = true;
    if (!this.state.searchedValue) {
      formIsValid = false;
      error = "*This field is required.";
    }
    if (typeof this.state.searchedValue !== "undefined") {
      if (!this.state.searchedValue.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        error = "*Please enter alphabet characters only.";
      }
    }
    this.setState({ error: error });
    return formIsValid;
  }

  onSearch = (event) => {
    this.setState({ searchedValue: event.target.value });
    console.log(this.state.searchedValue);
  };
  handleSearch = async (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let searchWord = this.state.searchedValue;
      try {
        axios
          .get(`${util.API_BASE_URL}events/?search=${searchWord}`)
          .then((res) => {
            //   console.log(res.data);
            this.setState({
              result: res.data,
              searchedValue: "",
              successful: true,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  render() {
    return (
      <>
        <button
          className="text-white text-decoration-none border-0 bg-success px-4 py-2 bannerBtn"
          style={{ outline: "0" }}
          onClick={() => this.setModalShow(true)}
        >
          Find an Event
        </button>
        <Modal
          size="lg"
          className=" p-4"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalShow}
          onHide={() => this.setModalHide(false)}
        >
          <Modal.Header className="text-center pl-4" closeButton>
            {/* <Modal.Title id="findevent"> */}
            <h2 className=" offset-1 text-center">
              Find an event Registry or Website
            </h2>
            {/* </Modal.Title> */}
          </Modal.Header>
          <Modal.Body className=" pl-5 p-3 mt-4 mb-3">
            <Form onSubmit={this.handleSearch}>
              <Form.Row>
                <Form.Group as={Col} controlId="Fname">
                  <Form.Control
                    name="search"
                    required
                    onChange={this.onSearch}
                    type="text"
                    value={this.state.searchedValue}
                    placeholder="Victor's Birthday"
                  />
                  <span style={{ color: "red" }}>{this.state.error}</span>
                </Form.Group>
                <Form.Group as={Col} md={2} controlId="btn">
                  <button
                    type="button"
                    onClick={this.handleSearch}
                    className="btn px-2"
                    style={{
                      backgroundColor: "#58B852",
                      color: "white",
                      width: "90px",
                    }}
                  >
                    Find
                  </button>
                </Form.Group>
              </Form.Row>
            </Form>
            <div className="row">
              {this.state.result.map((event, index) => (
                <div
                  key={index}
                  className="card p-0 m-2 col-lg-3 col-sm text-center"
                >
                  <div>
                    <img
                      className=" img-fluid"
                      src={coupleimg}
                      style={{ width: "200px" }}
                      alt="Card cap"
                    />
                  </div>
                  <p>{event.name}</p>
                  <div className="card-footer" style={{ cursor: "pointer" }}>
                    <Link
                      to={{ pathname: `registry/${event.slug}` }}
                      target="blank"
                    >
                      VIEW EVENT
                    </Link>
                  </div>
                </div>
              ))}
              {this.state.result.length <= 0 && this.state.successful && (
                <p className="text-center">Oops..., no event found !</p>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
