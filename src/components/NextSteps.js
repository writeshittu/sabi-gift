import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
// import Add from "../images/Sabi-storepage/Add.svg";
// import addItem from "../images/Sabi-storepage/addItem.svg";
// import invite from "../images/Sabi-storepage/invite.svg";
// import manage from "../images/Sabi-storepage/manage.svg";
// import setup from "../images/Sabi-storepage/setup.svg";
import { Link } from "react-router-dom";
import SendInvite from "./SendInvite";

export class NextSteps extends Component {
  render() {
    return (
      <div className="row justify-content-around ">
        <Card
          id="myCards"
          className="shadow mb-3 grow"
          style={{ width: "12rem" }}
        >
          {/* <Link className=" text-link" to="/checklist"> */}
          <BsBell className="ml-3 mt-3" />
          <Card.Body className="stepsCard"></Card.Body>
          <Card.Footer className="cardFooter">
            <strong className="ml-1">1</strong>
            {/* <img className="ml-1 d-block pointer" src={addItem} alt="step1" /> */}
            <small className=" d-block">Add Items to the gift registry</small>
            {/* {!window.localStorage.event_type && (
              <p className="ml-1 d-block">Done</p>
            )}{" "} */}
            {/* <span className="text-right">+</span> */}
          </Card.Footer>
          {/* </Link> */}
        </Card>
        <Card
          id="myCards"
          className="shadow mb-3 grow"
          style={{ width: "12rem" }}
        >
          <SendInvite
            isSabiPartner={true}
            title="Invite Co-celebrant to your event "
            placeholder="Enter the Partner email ... "
            button={
              <>
                <BsBell className="ml-3 mt-3" />

                <Card.Body className="stepsCard2"></Card.Body>
                <Card.Footer className="cardFooter">
                  <strong className="ml-1">2</strong>
                  {/* <img
                    className="ml-1 d-block pointer"
                    src={Add}
                    alt="step2"
                  /> */}
                  {/* <span className="text-right">+</span> */}
                  <small className="d-block">Add Co-sabi Celebrant</small>
                </Card.Footer>
              </>
            }
          />
        </Card>
        <Card
          id="myCards"
          className="shadow mb-3 grow"
          style={{ width: "12rem" }}
        >
          <SendInvite
            isSabiPartner={false}
            title="Invite people to your event "
            placeholder="Enter the Guest email ... "
            button={
              <>
                <BsBell className="ml-3 mt-3" />

                <Card.Body className="stepsCard3"></Card.Body>
                <div>
                  <Card.Footer className="cardFooter">
                    <strong className="ml-1">3 </strong>
                    <small className="d-block">
                      Invite people to your Event
                    </small>
                    {/* <img
                    className="ml-1 d-block pointer"
                    src={invite}
                    alt="step3"
                  /> */}

                    {/* <span className="text-right">+</span> */}
                  </Card.Footer>
                </div>
              </>
            }
          />
        </Card>
        <Card
          id="myCards"
          className="shadow mb-3 grow"
          style={{ width: "12rem" }}
        >
          <Link className="text-link p-0" to="/manageregistry">
            <BsBell className="ml-3 mt-3" />

            <Card.Body className="stepsCard4"></Card.Body>
            <Card.Footer className="cardFooter">
              <strong className="ml-1">4</strong>
              <small className="d-block">Manage Event</small>
              {/* <img
                className="ml-1 d-block pointer"
                src={manage}
                alt="step4"
              />{" "} */}
              {/* <span className="text-right">+</span> */}
            </Card.Footer>
          </Link>
        </Card>
        <Card
          id="myCards"
          className="shadow mb-3 grow"
          style={{ width: "12rem" }}
        >
          <BsBell className="ml-3 mt-3" />

          <div>
            <Card.Body className="stepsCard5"></Card.Body>
            <Card.Footer className="cardFooter">
              <strong className="ml-1">5 </strong>
              <small className="d-block">Setup your Registry page</small>
              {/* <img
              className="ml-1 d-block pointer"
              src={setup}
              alt="step5"
            />{" "} */}
              {/* <span className="text-right">+</span> */}
            </Card.Footer>
          </div>
        </Card>
      </div>
    );
  }
}

export default NextSteps;
