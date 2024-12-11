import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideBarNav from '../../../nav/SideBarNav.js'
import '../../Workspace-Component.css'
import { TagPicker, Panel, PanelGroup, Placeholder, Container, Header, Content, Footer, Sidebar, Loader, Button, ButtonToolbar, Accordion, Navbar } from 'rsuite';

export default function RareDiseases(){
  const rareDiseaseList = useSelector((state) => state.gardDiseases.rareDiseases.items)
  const [clinicalTrialsSearchFormInput, setClinicalTrialsSearchFormInput] = useState({rdInput : {
    rdSelector : "",
    rdTextDiseaseEntry: "",
    rdQuestionSearchButtonFlag : false
    }});
  
  const handleSelectionRareDisease = (component, value, evt) => {
    // const { id, value } = evt.target;

    setClinicalTrialsSearchFormInput(prevState => ({
        ...prevState,
        formInput: {
        ...prevState.formInput, [component] : value,
        }
    }))
  }

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
                <div className='generic-search-container-description'>
                    <h4>Rare Disease of Interest</h4>
                    <h6>There are around 7,000 rare diseases and the causes vary from changes in a person's genes or chromosomes, an infection or immune response and in some cases the cause is unknown.</h6>
                    <h6>Select the rare disease(s) of interest from the below list and the system will continually keep track of the latest developments in that disease area</h6>
                </div>
                <div className='generic-search-container-description'>
                  <Panel header="Select a rare disease from the list below" shaded>
                    <TagPicker
                      creatable
                      data={rareDiseaseList.map(
                        item => {
                                return item ? {label:item[1], value:item[1]} : {label:'', value:''}
                                }
                      )} 
                      onSelect={(value, item, evt) => handleSelectionRareDisease("rdSelector", value, evt)}
                      virtualized
                      style={{ width: 400 }}
                      menuStyle={{ width: 400 }}
                      placeholder="Select one or more Rare Diseases"
                      onCreate={(value, item, evt) => {
                        console.log('Created item: ', value)
                        handleSelectionRareDisease("rdSelector", value, evt)
                      }}
                    />
                  </Panel>
                  <Panel header="Enter rare disease terms of interest (if not present in above list)" shaded>
                    
                  </Panel>                    
                </div>
              </Content>
            </div>            
          </div>
        </Container>
      </Container>
    </div>
  );
};
