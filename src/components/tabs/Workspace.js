import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideBarNav from '../nav/SideBarNav.js'
import './Workspace.css';

export default function Workspace(){
  
  return (
    <div className="flex-container">
      <div className="flex-workspace-child-left">
        <SideBarNav/>
      </div>
      <div className="flex-workspace-child-right">
        <div>Test</div>  
      </div>
    </div>    
    );
};
