import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideBarNav from '../nav/SideBarNav.js'
import './Workspace.css';

export default function Workspace(){
  
  return (
    <div class="flex-container">
      <div class="flex-child magenta">
        <SideBarNav/>
      </div>
      <div class="flex-child green">
        <div>Test</div>  
      </div>
    </div>    
    );
};
