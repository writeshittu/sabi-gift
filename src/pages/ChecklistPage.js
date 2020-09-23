import React, { Component } from "react";
import SideBar from "../components/SideBar";
import DashboardNav from "../components/DashboardNav";
import AvailableItems from "../components/AvailableItems";
import axios from "axios";
import util from "../util/util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "antd";
import { BsFillGridFill, BsListUl } from "react-icons/bs";
import { Card, Form, Table, ListGroup } from "react-bootstrap";
import { StateContext } from "../Context";

const { Search } = Input;
export class RegistryChecklist extends Component {
  static contextType = StateContext;
  constructor() {
    super();
    this.state = {
      products: [],
      allRegistryItem: [],
      emptyRegistry: false,
      gift: "",
      addItems: false,
      Products: [],
      selectedIds: [],
      quantity: {},
      filterData: [],
      search: null,
      listDisplay: false,
    };
  }

  handleQuantity = (e) => {
    let quantityNeeded = this.state.quantity;
    //  : ;
    quantityNeeded[e.target.name] = e.target.value;
    this.setState({ quantityNeeded: quantityNeeded });
    // console.log(quantityNeeded);
  };

  addToCart = (item) => {
    let itemsInCart = this.context.itemsInCart;
    itemsInCart.push(item);
    let selectedIds = this.state.selectedIds;
    selectedIds.push(item.id);
    this.setState({
      selectedIds: selectedIds,
      quantity: this.state.quantity + 1,
    });
  };

  onSearch = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  getIndexOfProduct = (id) => {
    for (let i = 0; i < this.state.Products.length; i++) {
      if (this.state.Products[i].id === id) {
        return i;
      }
    }

    return -1;
  };

  notify = () => toast.success("Added to registry!", { autoClose: 2000 });
  addGiftToRegistry = (id) => {
    // console.log("clicked" + id);
    // let evtid = this.state.eventId;
    let eventId = window.localStorage.eventIID;
    let quantityNeeded = this.state.quantity;
    this.setState({ quantity: quantityNeeded });
    console.log(quantityNeeded);
    this.setState({ gift: id });
    let addeditem = {
      gifts: [Number(this.state.gift)],
      event: Number(eventId),
      quantity: Number(quantityNeeded["quantity"]),
    };

    axios
      .post(`${util.API_BASE_URL}add-registry/`, addeditem, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
        },
      })

      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          this.setState({ addSuccessfully: true });
          let products = this.state.Products;
          products.splice(this.getIndexOfProduct(id), 1);
          this.setState({ Products: products });
          this.notify();
        }
      })
      .catch((err) => {
        console.log(err);
        this.errorNotify();
      });
  };

  errorNotify = () =>
    toast.error("Error! request not processed", { autoClose: 2000 });
  successNotify = () =>
    toast.error("Removed from registry", { autoClose: 2000 });
  removeItemFromRegistry = (id) => {
    // console.log("clicked" + id);
    // let evtid = this.state.eventId;
    let eventId = window.localStorage.eventIID;
    this.setState({ gift: id });
    let addeditem = {
      gifts: Number(this.state.gift),
      event: Number(eventId),
    };

    axios
      .post(`${util.API_BASE_URL}remove-registry/`, addeditem, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
        },
      })

      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          this.setState({ addSuccessfully: true });
          let products = this.state.Products;
          products.splice(this.getIndexOfProduct(id), 1);
          this.setState({ Products: products });
          this.successNotify();
        }
      })
      .catch((err) => {
        console.log(err);
        this.errorNotify();
      });
  };

  componentDidMount() {
    axios
      .get(`${util.API_BASE_URL}registries/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })

      .then((response) => {
        // console.log(response.data);
        if (response.data !== undefined) {
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            data[i].picture = data[i].picture.replace("image/upload/", "");
          }
          this.setState({ allRegistryItem: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const items = this.state.allRegistryItem
      .filter((data) => {
        if (this.state.search == null) {
          return data;
        } else if (
          data.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
          data.description
            .toLowerCase()
            .includes(this.state.search.toLowerCase())
        ) {
          return data;
        }
        return null;
      })
      .map((data, index) => {
        return (
          <Card key={index} className="productCards col-sm-3 m-3">
            <div>
              <img
                className="card-img center grow"
                alt="items"
                src={data.picture}
                id={data.id}
              />
            </div>
            {/* <p className="card-img-overlay text-danger text-left mt-0 ml-0"></p> */}
            <span className="d-block ml-auto">#{data.price}</span>
            <Card.Body style={{ minHeight: "50px", padding: "5px" }}>
              <strong className="d-block" style={{ textOverflow: "ellipsis" }}>
                {data.name}
              </strong>
              <small>{data.description}</small>
            </Card.Body>
            <div></div>

            <ListGroup className="list-group-flush ">
              <Form.Row>
                <Form.Control
                  type="number"
                  className="col-4 p-2"
                  id={data.id}
                  name="quantity"
                  min="1"
                  onChange={this.handleQuantity}
                />

                <Form.Control
                  onClick={() => this.addGiftToRegistry(data.id)}
                  id={data.id}
                  type="button"
                  className="col-8 text-center"
                  style={{ background: "#6F64F8", color: "#FFFFFF" }}
                  value="Add to Registry"
                />
              </Form.Row>
            </ListGroup>
          </Card>
        );
      });

    return (
      <div className="container-fluid">
        <DashboardNav />
        {/* <hr className='mt-0'/> */}
        <div className="row mt-3">
          <div className="col-1 d-none d-lg-block">
            <SideBar />
          </div>
          <div className="col ml-5">
            <h1> Registry Checklist</h1>
            <p>This is where you manage your registry items.</p>
            <div className="row mt-5">
              <div className=" col-3 d-none d-md-block d-lg-block availableItem">
                <AvailableItems />
              </div>
              <div className="col">
                {/* <Product
                  Products={this.state.allRegistryItem}
                  showWishList={false}
                /> */}
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-8">
                      <small>7,618 results found in 5ms</small>
                    </div>
                    <div className="col d-none d-lg-block">
                      <select className="p-1">
                        <option>Default</option>
                        <option>...</option>
                        <option>...</option>
                      </select>
                      <span className="pointer p-2">
                        <BsFillGridFill
                          color={!this.state.listDisplay ? "#6F64F8" : ""}
                          size="25px"
                          onClick={() => {
                            this.setState({ listDisplay: false });
                          }}
                        />
                      </span>
                      <span className="pointer p-2">
                        <BsListUl
                          color={this.state.listDisplay ? "#6F64F8" : ""}
                          size="30px"
                          onClick={() => {
                            this.setState({ listDisplay: true });
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-10">
                      <Search
                        placeholder="Search here"
                        onChange={(e) => this.onSearch(e)}
                      />
                    </div>
                  </div>
                  {!this.state.listDisplay && (
                    <div className="row">
                      {items}
                      <ToastContainer />
                    </div>
                  )}

                  {this.state.listDisplay && (
                    <div className="row">
                      <Table hover>
                        <thead>
                          <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        {this.state.allRegistryItem
                          .filter((data) => {
                            if (this.state.search == null) {
                              return data;
                            } else if (
                              data.name
                                .toLowerCase()
                                .includes(this.state.search.toLowerCase()) ||
                              data.description
                                .toLowerCase()
                                .includes(this.state.search.toLowerCase())
                            ) {
                              return data;
                            }
                            return null;
                          })
                          .map((data, index) => {
                            return (
                              <tbody key={index}>
                                <tr>
                                  <td></td>
                                  <td>
                                    <img
                                      className=" img-fluid center grow"
                                      src={data.picture}
                                      width="90px"
                                      alt="itemImage"
                                    />
                                  </td>
                                  <td>{data.name}</td>
                                  <td>#{data.price}</td>
                                  <td></td>

                                  <td>
                                    <Form.Row>
                                      <Form.Control
                                        type="number"
                                        className="col-3 p-2"
                                        id={data.id}
                                        name="quantity"
                                        min="1"
                                        onChange={this.handleQuantity}
                                      />
                                      <Form.Control
                                        onClick={() =>
                                          this.addGiftToRegistry(data.id)
                                        }
                                        id={data.id}
                                        type="button"
                                        className="col-7 p-2 mr-0 text-center"
                                        style={{
                                          background: "#6F64F8",
                                          color: "#FFFFFF",
                                        }}
                                        value="Add to Registry"
                                      />
                                    </Form.Row>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                      </Table>

                      <ToastContainer />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistryChecklist;
