import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import AvailableItems from "./AvailableItems";
import DashboardNav from "./DashboardNav";
import Avatars from '../images/Sabi-storepage/Avatars.png'
import { checkList } from "./imageData";
import { GiReceiveMoney } from "react-icons/gi";
import { GrHome, GrFolder,GrBarChart } from "react-icons/gr";
import {BsFolder,BsGift,BsAlarm,BsBell} from "react-icons/bs";
import Product from "./Product";
import RegistryBar from "./ProgressBar";
import NextSteps from "./NextSteps";


export class Dashboard extends Component {
  render() {

    // const { Search } = Input;

    return (
      <div className='container-fluid'>
        <DashboardNav />
        <hr className='mt-0 mb-0'/>
        <Row className='mt-4'>
          <Col xs={1} md={1} lg={1} className="ml-4 justify-content-center sidebarMenu">
            <div classname='mt-4'>
                <div className='mt-3 text-center'>
                    <BsBell/>
                </div>
            <div className=' ml-2 mb-4'>
                <img src={Avatars} width='35px' alt='userImage'/>
            </div>
            <div className='ml-2'>
                <div className='py-4'>
                <GrHome size='30px'/>
                </div>
                <div className='py-4'>
                    <BsAlarm size='30px'/>
                </div>
                <div className='py-4'>
                    <GrFolder size='30px'/>
                </div>
                <div className='py-4'>
                    <GrBarChart size='30px'/>
                </div>
                <div className='py-4'>
                    <BsFolder size='30px'/>
                </div>
            </div>
            </div>
           
          </Col>
          <Col className=" content">
            <div className="row justify-content-around">
                <div className="py-5 text-left" style={{width: '500px',border: '1px solid',height:'150px'}}>
                  <p className='text-right'>Welcome Jimi,</p>
                  <p className='text-right'><strong>1 JANUARY, 2002</strong></p>
                </div>
                <div className="d-flex justify-content-between" >
                <div className='px-4' style={{width:'350px'}}>
                  <div className='d-flex justify-content-between align-items-center cashGift mb-3'>
                    <div className='p-3'>
                      <span className='d-block'><strong>Cash Gift</strong></span>
                      <small>Value of Cash gifts</small>
                    </div>
                    <div className='d-flex align-items-center p-3'>
                        <GiReceiveMoney size='30px'  color='#E6E6E6'/>
                        <div className='ml-3 align-items-center'>
                        <span class="badge badge-pill badge-success">cash</span>
                          <p>200,000</p>
                        </div>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center giftReceived'>
                    <div className='p-3'>
                      <span className='d-block'><strong>Gift Received</strong></span>
                      <small>Number of received</small>
                    </div>
                    <div className='d-flex align-items-center p-3'>
                        <BsGift size='30px' color='#E6E6E6'/>
                        <div className='ml-3 align-items-center'>
                        <span class="badge badge-pill badge-primary">Gifts</span>
                          <p>400,000</p>
                        </div>
                    </div>
                  </div>
                  
                </div>
                <RegistryBar number={5}/>
              </div>
            </div>
            <div className="2  ">
              <h5 className="mt-4 py-4 ">Next steps to take</h5>

              <NextSteps/>
              {/* <div className="row justify-content-around ">
                {imgCardlist.map((item) => (
                  <Card id='myCards' className='shadow' style={{ width: "12rem" }}>
                    <Card.Body>
                      <img className="center" alt="items" src={item.imageUrl} />
                    </Card.Body>
                    <Card.Text>
                      <h6 class="ml-1">{item.id + 1}</h6>
                      <small class="ml-1">
                        Add item to Gift registry{" "}
                        <span className="text-center">+</span>
                      </small>
                    </Card.Text>
                  </Card>
                ))}
              </div> */}
            </div>
            <div className="mt-5 py-5">
              <h5 className='mb-5'>Your Registry Checklist</h5>
              <div className="row justify-content-around">
              {checkList.map((item) => (
                  <Card id='myCards' style={{ width: "8rem" }}>
                    <Card.Body>
                      <Card.Img className="center rounded-circle" alt="items" src={item.imageUrl} />
                    </Card.Body>
                    <Card.Text>
                        <h6 class="p-1">{item.name}</h6>
                      <small class="p-1">
                          +
                      </small>
                    </Card.Text>
                  </Card>
                ))}
              </div>
            </div>
            <div className="mt-5 py-5 ">
              <h5 className="mb-5 ">Add items to your Registry</h5>
              <Row>
                <Col xs md={3} lg={3} className="availableItem">
                  <p>Filter</p>
                  <div className='row'>
                    <div className='mx-auto'>
                    <AvailableItems />
                    </div>
                  </div>
                  
                </Col>
                <Col xs md={9} lg={9} classname="">
                  <Product/>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div >
    );
  }
}

export default Dashboard;
