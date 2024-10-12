import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideBarNav from '../../../nav/SideBarNav.js'
import '../../Workspace-Component.css'
import { Panel, PanelGroup, Placeholder, Container, Header, Content, Footer, Sidebar, Loader, Button, ButtonToolbar, Accordion, Navbar } from 'rsuite';

export default function RareDiseases(){
  return (
    <div>
      <Container>
        <Header></Header>
        <Container>
          <div className="flex-container">
            <div className="flex-child-left">
              <SideBarNav/>
            </div>
            <div className="flex-child-right">
              <Content>
                <div>

                </div>
              </Content>
            </div>            
          </div>
        </Container>
      </Container>
    </div>
    );
};
