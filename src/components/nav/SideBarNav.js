import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import TagIcon from '@rsuite/icons/Tag';
import TextImageIcon from '@rsuite/icons/TextImage';
import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IoVolumeHigh } from "react-icons/io5";
import SpeakerIcon from '@rsuite/icons/Speaker';
import SendIcon from '@rsuite/icons/Send';
import PeopleBranchIcon from '@rsuite/icons/PeopleBranch';
import WechatOutlineIcon from '@rsuite/icons/WechatOutline';
import PeoplesIcon from '@rsuite/icons/Peoples';
import GlobalIcon from '@rsuite/icons/Global';
import { Link } from 'react-router-dom';
import PlayOutlineIcon from '@rsuite/icons/PlayOutline';
import './SideBarNav.css'

export default function SideBarNav(){
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('1');
  return (
    // <div style={{ width: 300 }}>
    <div className='sidebar-sidenav'>
      <Sidenav expanded={expanded} defaultOpenKeys={['2', '7']}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item as={Link} to="/tabs/search-workspace" eventKey="1" icon={<PlayOutlineIcon />}>
              Simple Workspace
            </Nav.Item>
            {/* <Nav.Menu placement="rightStart" eventKey="2" title="Setup" icon={<MagicIcon />}>
              <Nav.Item as={Link} to="/workspace/setup/rare_diseases" eventKey="2-1">Rare Diseases</Nav.Item>
              <Nav.Item as={Link} to="/workspace/setup/clinical_trials" eventKey="2-2">Clinical Trials</Nav.Item>
              <Nav.Item as={Link} to="/workspace/setup/medical_research" eventKey="2-3">Medical Research</Nav.Item>
            </Nav.Menu>            
            <Nav.Item as={Link} to="/workspace/latest_developments" eventKey="3" icon={<SpeakerIcon />}>
              Latest Developments
            </Nav.Item>
            <Nav.Item as={Link} to="/workspace/bookmarks" eventKey="4" icon={<TagIcon />}>
              Bookmarks
            </Nav.Item>            
            <Nav.Item as={Link} to="/workspace/community" eventKey="5" icon={<PeoplesIcon />}>
              Community
            </Nav.Item>
            <Nav.Item as={Link} to="/workspace/companies" eventKey="6" icon={<PeoplesIcon />}>
              Companies
            </Nav.Item>            
            <Nav.Menu
              placement="leftStart"
              eventKey="7"
              title="Agencies"
              icon={<GlobalIcon />}
            >
              <Nav.Item as={Link} to="/workspace/agencies/fda" eventKey="7-1">FDA</Nav.Item>
              <Nav.Item as={Link} to="/workspace/agencies/ae" eventKey="7-2">Adverse Events</Nav.Item>
            </Nav.Menu>
            <Nav.Item as={Link} to="/workspace/events" eventKey="8" icon={<PeopleBranchIcon />}>
              Events
            </Nav.Item>
            <Nav.Item as={Link} to="/workspace/contact" eventKey="9" icon={<WechatOutlineIcon />}>
              Get in Touch
            </Nav.Item>             */}
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
      </Sidenav>
    </div>
  );
};
