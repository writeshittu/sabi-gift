import React, { Component } from 'react'
import SideBar from '../components/SideBar';
import {Card } from "react-bootstrap";
import DashboardNav from '../components/DashboardNav'
import CheckList from '../components/AddcheckList';
import { checkList } from "../components/imageData";


export class ManageRegistry extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <DashboardNav/>
                <hr/>
                <div className='row'>
                    <div className='col-1 sidebarMenu'>
                        <SideBar/>
                    </div>
                    <div className='col'>
                        <h1>Manage Registry</h1>
                        <p>This is where you manage your registry items.</p>
                        <div className='mx-auto text-center o-1' style={{width:'900px',height:'150px',border:'1px solid'}}>
                            <h6 className='py-2'>YOUR REGISTRY URL</h6>
                            <p>www.sabigifts.ng/registry/jimi2020</p>
                        </div>
                        <div className='manageReg text-center  mt-3'>
                            <h2 className='py-5 text-white'>Jimi & Joanna</h2>
                            <h5 className='text-white'>February 10, 2020 (14 days left)</h5>
                        </div>
                        <h2 className='mt-3'>Your Registry Checklist</h2>
                            <div className="mt-4 row justify-content-around">
                                <CheckList/>
                            </div>
                        <h2 className='mt-5'>Add items to your registry</h2>
                        <div className='row'>
                            <div className='col-1'>
                                <div className='card'>
                                {checkList.map((item, index) => (
                                    <Card id='myCards' key={index} style={{ width: "8rem" }}>
                                        <Card.Body>
                                        <Card.Img className="center rounded-circle" alt="items" src={item[0]} />
                                        </Card.Body>
                                        <Card.Text>
                                            <small className="p-1">{item[0]}</small>
                                            <small className="p-1">
                                                +
                                            </small>
                                        </Card.Text>
                                    </Card>
                                ))} 
                                </div>

                            </div>
                        </div>



                    </div>

                </div>
                
            </div>
        )
    }
}

export default ManageRegistry