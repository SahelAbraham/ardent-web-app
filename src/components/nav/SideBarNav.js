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
import Block from '@rsuite/icons/Block';
import Tools from '@rsuite/icons/Tools';
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
  const [featureFlag, setFeatureFlag] = useState(false)

  return (
    // <div style={{ width: 300 }}>
    <div className='sidebar-sidenav'>
      <Sidenav expanded={expanded} defaultOpenKeys={['8']}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item as={Link} to="/tabs/search-workspace" eventKey="1" icon={<PlayOutlineIcon />}>
              Simple Workspace
            </Nav.Item>
            <Nav.Item as={Link} to="/workspace/setup" eventKey="2" icon={<Tools />}>
              Setup
            </Nav.Item>            
            {/* <Nav.Menu placement="rightStart" eventKey="2" title="Setup" icon={<MagicIcon />}> */}
              {/* <Nav.Item as={Link} to="/workspace/setup/rare_diseases" eventKey="2-1">Rare Diseases</Nav.Item>
              <Nav.Item as={Link} to="/workspace/setup/clinical_trials" eventKey="2-2">Clinical Trials</Nav.Item>
              <Nav.Item as={Link} to="/workspace/setup/medical_research" eventKey="2-3">Medical Research</Nav.Item> */}
            {/* </Nav.Menu>             */}
            <Nav.Item as={Link} to="/workspace/wishlist" eventKey="4" icon={<MagicIcon />}>
              Wishlist
            </Nav.Item>  
            {featureFlag ?
            <div>
              <Nav.Item as={Link} to="/workspace/latest_developments" eventKey="3" icon={<SpeakerIcon />}>
                Latest Developments
              </Nav.Item>
              <Nav.Item as={Link} to="/workspace/bookmarks" eventKey="5" icon={<TagIcon />}>
                Bookmarks
              </Nav.Item>            
              <Nav.Item as={Link} to="/workspace/community" eventKey="6" icon={<PeoplesIcon />}>
                Community
              </Nav.Item>
              <Nav.Item as={Link} to="/workspace/companies" eventKey="7" icon={<PeoplesIcon />}>
                Companies
              </Nav.Item>            
              <Nav.Menu
                placement="leftStart"
                eventKey="8"
                title="Agencies"
                icon={<GlobalIcon />}
              >
                <Nav.Item as={Link} to="/workspace/agencies/fda" eventKey="8-1">FDA</Nav.Item>
                <Nav.Item as={Link} to="/workspace/agencies/nih" eventKey="8-2">NIH</Nav.Item>
              </Nav.Menu>
              <Nav.Item as={Link} to="/workspace/ae" eventKey="9" icon={<Block />}>
                Adverse Events
              </Nav.Item>            
              <Nav.Item as={Link} to="/workspace/events" eventKey="10" icon={<PeopleBranchIcon />}>
                Events
              </Nav.Item>
            </div>
            : ''}        
            <Nav.Item as={Link} to="/workspace/contact" eventKey="11" icon={<WechatOutlineIcon />}>
              Get in Touch
            </Nav.Item>            
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
      </Sidenav>
    </div>
  );
};
