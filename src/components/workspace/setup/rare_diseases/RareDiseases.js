import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideBarNav from '../../../nav/SideBarNav.js'
import '../../Workspace-Component.css'
import { Form, TagPicker, Panel, PanelGroup, Placeholder, Container, Header, Content, Footer, Sidebar, Loader, Button, ButtonToolbar, Accordion, Navbar, useToaster } from 'rsuite';
import { setNotifcation, resetNotification } from "../../../../reducer/NotificationReducer"

export default function RareDiseases(){
  const rareDiseaseList = useSelector((state) => state.gardDiseases.rareDiseases.items)
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const [clinicalTrialsSearchFormInput, setClinicalTrialsSearchFormInput] = useState({rdInput : {
    rdSelector : "",
    rdTextDiseaseEntry: "",
    rdQuestionSearchButtonFlag : false
    }});
  
  const setupRareDiseaseConfig = React.useRef();
  const toaster = useToaster();

  //update the placeholder text based on user choices
  useEffect(() => {
    let defaultCTQuery = "Default question: Give me up to date information about"
    let resolvedCTDisease = ""
    if (clinicalTrialsSearchFormInput.formInput !== undefined & clinicalTrialsSearchFormInput.formInput.rdTextDiseaseEntry !== ""){
        resolvedCTDisease = clinicalTrialsSearchFormInput.formInput.rdTextDiseaseEntry
    }
    else if (clinicalTrialsSearchFormInput.formInput !== undefined & clinicalTrialsSearchFormInput.formInput.rdSelector !== ""){
        resolvedCTDisease = clinicalTrialsSearchFormInput.formInput.rdSelector            
    }
    
    if (defaultCTQuery !== clinicalTrialsSearchFormInput.formInput.rdQuestion)
      defaultCTQuery = clinicalTrialsSearchFormInput.formInput.rdQuestion + resolvedCTDisease      
    else
      defaultCTQuery += resolvedCTDisease
    //update the text area
    setDefaultCTQueryPlaceholder(defaultCTQuery)
  }, [clinicalTrialsSearchFormInput])

  const handleSelectionRareDisease = (component, value, evt) => {
    // const { id, value } = evt.target;

    setClinicalTrialsSearchFormInput(prevState => ({
        ...prevState,
        formInput: {
        ...prevState.formInput, [component] : value,
        }
    }))
  }

  const setupRareDisease = (e) => {
    setIsLoading(true)
    if (!setupRareDiseaseConfig.current.check()) { 
        console.error("Config error") 
        return
    }            
    // createUserWithEmailAndPassword(auth, e.signup_email, e.signup_password)
    // .then((userCredential) => {
    //     // Signed up 
    //     const user = userCredential.user;
    //     setIsLoading(false)
    //     dispatch(setNotifcation({notifyFlag: "success", notifyMessage: "Saved Rare Disease choices!!"}))
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     setIsLoading(false)
    //     dispatch(setNotifcation({notifyFlag: "error", notifyMessage: "Unable to save Rare Disease choices. Please reach out to support"}))
    // });    
  };

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
                    <h4>Rare Disease(s) of Interest</h4>
                    <h6>There are around 7,000 rare diseases and the causes vary from changes in a person's genes or chromosomes, an infection or immune response and in some cases the cause is unknown.</h6>
                    <h6>Select the rare disease(s) of interest from the below list and the system will continually keep track of the latest developments in that disease area</h6>
                </div>
                <div className='generic-search-container-description'>
                  <Panel header="Select a rare disease from the list below" shaded>
                    <Form ref={setupRareDiseaseConfig}                        
                        onSubmit={setupRareDisease}>
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
                    <Form.Group>
                      <ButtonToolbar>
                          <Button appearance="primary" type="submit">Submit</Button>
                          <Button appearance="default">Cancel</Button>
                      </ButtonToolbar>
                    </Form.Group>
                  </Form> 
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
