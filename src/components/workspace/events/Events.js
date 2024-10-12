import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideBarNav from '../../nav/SideBarNav.js'
import '../Workspace-Component.css'

export default function Event(){
  
  return (
    <div className="flex-container">
      <div className="flex-child-left">
        <SideBarNav/>
      </div>
      <div className="flex-child-right">
        <div>Events</div>  
      </div>
    </div>    
    );
};
