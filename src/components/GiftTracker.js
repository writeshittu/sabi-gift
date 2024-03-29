import React, { Component } from "react";
// import smartwatch from "../images/Sabi-storepage/smartwatch.jpg";
// import Button from './Button'
import { GrFavorite } from "react-icons/gr";
import DashboardNav from "./DashboardNav";
import SideBar from "./SideBar";
import { Button } from "react-bootstrap";
import axios from "axios";
import util from "../util/util";
import cashFund from "../images/Sabi-storepage/cashFund.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let styles = {
  boxShadow: "0px 2px 8px #00000022",
  borderRadius: "8px",
  opacity: 1,
};
export class GiftTracker extends Component {
  constructor() {
    super();
    this.state = {
      trackedItems: [],
      giftConverted: false,
      giftTrackerId: "",
      giftTracker: false,
      itemConvert: [],
      trackedCash: [],
    };
  }

  errorNotify = () =>
    toast.error("Gift already Converted as Cash!", { autoClose: 2000 });
  notify = () => toast.success("Item  converted to Cash!", { autoClose: 2000 });

  convertToCredit = (id) => {
    // let itemConvert = [];
    // itemConvert.push(id);
    // this.setState({
    //   itemConvert: itemConvert,
    // });

    const convertedItemDetail = new FormData();
    convertedItemDetail.append("status", "converted to cash");
    convertedItemDetail.append("gift_tracker", this.state.giftTrackerId);
    convertedItemDetail.append("item", id);
    axios
      .post(`${util.API_BASE_URL}convert-gift/`, convertedItemDetail, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201)
          // console.log(response);
          // let itemConvert = this.state.trackedItems;
          // itemConvert.splice(this.state.trackedItems.indexOf(id), 1);
          // this.setState({ itemConvert: itemConvert });
          this.setState({ giftConverted: true });
        this.notify();
      })
      .catch((error) => {
        console.dir(error);
        this.errorNotify();
      });
  };

  componentDidMount() {
    axios
      .get(
        `${util.API_BASE_URL}gift-tracker/?event=${window.localStorage.eventIID}`,
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token_id"),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        let trackedCash;
        let trackedGift;
        // console.log(res.data.results);
        if (res.data.results !== undefined) {
          let data = res.data.results;

          for (let i = 0; i < data.length; i++) {
            trackedGift = data[i].registry;
            trackedCash = data[i].custom_gift;
            this.setState({ giftTrackerId: data[i].id });
            if (trackedGift.length >= 1 || trackedCash.length >= 1) {
              this.setState({ giftTracker: true });
            }
          }
          // // for (let i = 0; i < trackedGift.length; i++) {
          // //   trackedGift[i].picture = trackedGift[i].picture.replace(
          // //     "image/upload/",
          // //     ""
          // //   );
          // }
          this.setState({ trackedItems: trackedGift });
          this.setState({ trackedCash: trackedCash });
          // console.log(this.state.trackedItems);
          // console.log(trackedGift);
        }
      })
      .catch((err) => {
        console.log(err);
        // this.setState({ emptyRegistry: true });
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <DashboardNav />
        <hr className="mt-0 mb-0" />
        <div className="row mt-4">
          <div className="col-1 ml-4 justify-content-center d-none d-lg-block">
            <SideBar isTracker="true" />
          </div>
          <div className="col-10 mx-auto px-2">
            <h2>Gift Tracker</h2>
            <p>
              We'll list all gifts the guests buy you on this page and your app.
              Here's a rundown on how to them get them home.
            </p>
            {!this.state.giftTracker && <div>No item available yet</div>}

            {this.state.trackedItems.map((item, index) => (
              <div
                key={index}
                className=" row d-flex justify-content-between"
                style={styles}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    width="100px"
                    alt="giftFromGuest"
                    className="m-4"
                  />
                  <div className="ml-2">
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <span>#{item.price}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div>
                    <Button
                      className="mb-1 shadow-lg"
                      style={{
                        background: "#6F64F8",
                        width: "158px",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      SEND NOW
                    </Button>
                  </div>
                  <div>
                    <Button
                      id={item.id}
                      onClick={() => this.convertToCredit(item.id)}
                      style={{
                        background: "#ededed",
                        color: "#2c2c2c",
                        borderBottomLeftRadius: "8px",
                      }}
                      disabled={this.state.itemConvert.indexOf(item.id) > -1}
                    >
                      <GrFavorite />
                      Convert to credit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {this.state.trackedCash.map((item, index) => (
              <div
                key={index}
                className=" row d-flex justify-content-between"
                style={styles}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={
                      item.image === "" || item.image === "null"
                        ? cashFund
                        : item.image
                    }
                    width="100px"
                    alt="giftFromGuest"
                    className="m-4"
                  />

                  <div className="ml-2">
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <span>#{item.contributed}</span>
                  </div>
                </div>
                {/* <div className="p-4">
                  <div>
                    <Button
                      className="mb-1 shadow-lg"
                      style={{
                        background: "#6F64F8",
                        width: "158px",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      SEND NOW
                    </Button>
                  </div>
                  <div>
                    <Button
                      id={item.id}
                      onClick={() => this.convertToCredit(item.id)}
                      style={{
                        background: "#ededed",
                        color: "#2c2c2c",
                        borderBottomLeftRadius: "8px",
                      }}
                      disabled={this.state.itemConvert.indexOf(item.id) > -1}
                    >
                      <GrFavorite />
                      Convert to credit
                    </Button>
                  </div>
                </div> */}
              </div>
            ))}
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default GiftTracker;
