import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideBarNav from '../../nav/SideBarNav.js'
import '../Workspace-Component.css'

export default function Contact(){
  
  return (
    <div className="flex-container">
      <div className="flex-child-left">
        <SideBarNav/>
      </div>
      <div className="flex-child-right">
        <div className='generic-search-container-description'>
          <h4>Ways to reach us</h4>
          <div style={{"marginBottom" : "5px"}}>
              <h4>
                <p>Chat with us — your ideas, questions, and feedback matter!</p>
                <div className="flex-container">
                  <div className="flex-child-left">                      
                    <img src={process.env.PUBLIC_URL + '/images/chat_launch.png'}/>
                    <p>Click on the chat button on the lower right</p>
                  </div>
                  <div className="flex-child-right">
                    <img src={process.env.PUBLIC_URL + '/images/chat_screenshot.png'}/>
                    <p>Enter your details to start chatting</p>
                  </div>                      
                </div>

                <p>Have questions or idea? Email us — we'd love to hear from you!: <a href="mailto:ardent@novomorpho.com?subject=Feedback%20from%20Ardent%20App">Email Us</a></p>
              </h4>
          </div>
        </div>
      </div>
    </div>    
    );
};
