import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideBarNav from '../../nav/SideBarNav.js'
import '../Workspace-Component.css'
import { Form, IconButton, TagInput, TagPicker, Panel, PanelGroup, Placeholder, Container, Header, Content, Footer, Sidebar, Loader, Button, ButtonToolbar, Accordion, Navbar } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';
import { BiNavigation } from 'react-icons/bi';
import axios from 'axios';
import { addClinicalTrialsInfo_ct_id_array, addClinicalTrialsInfo_ct_condition_names_array,  addClinicalTrialsInfo_ct_condition_names_map, resetClinicalTrialsInfo} from '../../../reducer/SearchClinicalTrialsReducer';
import {setUserConfiguration} from '../../../reducer/UserStateReducer';

export default function UserConfig(){
  const rareDiseaseList = useSelector((state) => state.gardDiseases.rareDiseases.items)
  const clinicalTrialsList = useSelector((state) => state.gardDiseases.rareDiseases.items)
  const userName = useSelector((state) => state.userState.userName)
  const userId = useSelector((state) => state.userState.userId)
  const clinicalTrialsIDList = useSelector((state) => state.searchClinicalTrials.clinicalTrialsInfo.ct_id_array)
  const clinicalTrialsConditionsList = useSelector((state) => state.searchClinicalTrials.clinicalTrialsInfo.ct_condition_names_array)
  const clinicalTrialsIDConditionsMap = useSelector((state) => state.searchClinicalTrials.clinicalTrialsInfo.ct_condition_names_map)

  const medicalResearchList = useSelector((state) => state.gardDiseases.rareDiseases.items)
  const ardentWebAppUrl = useSelector((state) => state.notification.initialization.ardent_web_app_url)
  const dispatch = useDispatch()
  const [userConfiguration, setUserConfiguration] = useState({
    userCfg : {
        rdSelector:[],
        ctSelector:[],
        medicalResearchSelector:[],
        txtRareDiseaseEdit:[],
        medicalResearchEdit:[]
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMedicalConditions, setIsLoadingMedicalConditions] = useState(false);
  const [isLoadingClinicalTrials, setIsLoadingMClinicalTrials] = useState(false);
  const useMountEffect = (fun) => useEffect(fun, [])

  const handleUserInput = (component, value, evt) => {
    // const { id, value } = evt.target;

    setUserConfiguration(prevState => ({
        ...prevState,
        userCfg: {
        ...prevState.userCfg, [component] : value,
        }
    }))
  }

  //update the placeholder text based on user choices
  useMountEffect(() => {
    const fetchActiveClinicalTrialInfoList = async (infoType) => {
        try {
            let ARDENT_WEB_APP_URL = ardentWebAppUrl!=='' ? ardentWebAppUrl : process.env.REACT_APP_ARDENT_WEB_APP_URL
            const headers = {
                "Content-Type": "application/json",
            };
    
            //Set the loader
            if(infoType==="ct_id_array")
                setIsLoadingMClinicalTrials(true)
            if(infoType==="ct_condition_names_array")
                setIsLoadingMedicalConditions(true)
    
            axios.get(ARDENT_WEB_APP_URL + "/services/clinical_trials_info_type/" + infoType, {headers})
            .then(response => {
                console.log(response.data);
                if(parseInt(response.status)===200){
                    // let processed_resp = extractSearchResults(response.data, clinicalTrialsSearchFormInput.formInput.rdQuestion + clinicalTrialsSearchFormInput.formInput.rdTextDiseaseEntry)
                    let processed_resp = response.data
                    if(infoType==="ct_id_array"){
                        dispatch(addClinicalTrialsInfo_ct_id_array(processed_resp))
                        setIsLoadingMClinicalTrials(false)
                    }
                    if(infoType==="ct_condition_names_array"){
                        dispatch(addClinicalTrialsInfo_ct_condition_names_array(processed_resp))
                        setIsLoadingMedicalConditions(false)
                    }
                    if(infoType==="ct_condition_names_map")
                        dispatch(addClinicalTrialsInfo_ct_condition_names_map(processed_resp))                                
                }
                else
                    dispatch(addClinicalTrialsInfo_ct_id_array([]))
                setIsLoading(false)
                })
                .catch(error => {
                    console.log(error);
                });
            } catch (error) {
            console.log('An error occurred while fetching search results', error)
            }
        }

    if (clinicalTrialsIDList === undefined | clinicalTrialsIDList.length <= 0){
        fetchActiveClinicalTrialInfoList("ct_id_array")
    }
    if (clinicalTrialsConditionsList === undefined | clinicalTrialsConditionsList.length <= 0){
        fetchActiveClinicalTrialInfoList("ct_condition_names_array")
    }
    if (clinicalTrialsIDConditionsMap === undefined | clinicalTrialsIDConditionsMap.length <= 0){
        fetchActiveClinicalTrialInfoList("ct_condition_names_map")
    }
  })

  const submitUserConfig = (e) => {
    setIsLoading(true)

    // console.log("The state of user choices: ", userConfiguration)
    try {
        let ARDENT_WEB_APP_URL = ardentWebAppUrl!=='' ? ardentWebAppUrl : process.env.REACT_APP_ARDENT_WEB_APP_URL
        const headers = {
            "Content-Type": "application/json",
        };

        // create the user configuration object
        let user_config_object = {
            rare_disease_name_config :  userConfiguration.userCfg.rdSelector.concat(userConfiguration.userCfg.txtRareDiseaseEdit),
            clinical_trial_id_config : userConfiguration.userCfg.ctSelector.concat(userConfiguration.userCfg.medicalResearchEdit),
            medical_research_config : userConfiguration.userCfg.medicalResearchSelector,
            user_name : userName,
            user_id : userId
        }

        axios.post(ARDENT_WEB_APP_URL + '/userconfig', user_config_object, {headers})
        .then(response => {
            console.log(response.data);
            if(parseInt(response.status)===200)
                dispatch(setUserConfiguration(userConfiguration))
            else
                dispatch(setUserConfiguration({}))
            
            setIsLoading(false)
            setIsLoadingMedicalConditions(false)
            setIsLoadingMClinicalTrials(false)
            
        })
        .catch(error => {
            console.log(error);
        });
        } catch (error) {
            console.log('An error occurred while fetching search results', error)
        }  
  };

  return (
    <div>
        {isLoading ? <Loader  backdrop size="md" content="Saving user choices..." /> : ''}
        <Form onSubmit={submitUserConfig}>
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
                                <Panel header="Rare Diseases" shaded>
                                    <div style={{"marginBottom" : "10px"}}>
                                        <div style={{"marginBottom" : "5px"}}>
                                            <h6>Select a rare disease from the list below</h6>
                                        </div>
                                        <TagPicker
                                        creatable
                                        data={rareDiseaseList.map(
                                            item => {
                                                    return item ? {label:item[1], value:item[1]} : {label:'', value:''}
                                                    }
                                        )} 
                                        onSelect={(value, item, evt) => handleUserInput("rdSelector", value, evt)}
                                        virtualized
                                        style={{ width: 400 }}
                                        menuStyle={{ width: 400 }}
                                        placeholder="Select one or more Rare Diseases"
                                        // onCreate={(value, item, evt) => {
                                        //     console.log('Created item: ', value)
                                        //     handleUserInput("rareDiseaseSelector", value, evt)
                                        // }}
                                        
                                        />
                                    </div>
                                    <div>
                                        <div style={{"marginBottom" : "5px"}}>
                                            <h6>Enter rare disease terms of interest (if not present in above list)</h6>
                                        </div>
                                        <TagInput style={{ width: 400 }} 
                                                trigger={'Enter'}
                                                placeholder="Press Enter after entering a rare disease term(s)"
                                                menuStyle={{ width: 300 }}
                                                onChange={(value, evt) => {
                                                    handleUserInput("txtRareDiseaseEdit", value, evt)
                                                }}                    
                                            />
                                    </div>

                                </Panel>                   
                            </div>

                            <div className='generic-search-container-description'>
                                <h4>Clinical Trials of Interest</h4>
                                <div style={{"marginBottom" : "5px"}}>
                                    <h6>Clinical trials for rare diseases are essential for developing new treatments and improving patient outcomes. These trials involve testing potential therapies in small groups of patients with specific rare conditions. Rare diseases present unique challenges and require specialized approaches due to the limited patient populations and often complex nature of these conditions.</h6>
                                </div>
                                <div style={{"marginBottom" : "5px"}}>
                                    <h6>Clinical trials for rare diseases require a unique approach that addresses the challenges of small patient populations, disease heterogeneity, and limited prior knowledge. By adopting innovative trial designs, leveraging technology, and fostering collaboration among researchers, clinicians, and patient advocacy groups, the field is making strides in developing much-needed treatments for rare disease patients. As research methodologies continue to evolve, there is hope for accelerated progress in rare disease therapeutics, ultimately improving the lives of millions affected by these conditions worldwide.</h6>
                                </div>
                            </div>

                            
                            <div className='generic-search-container-description'>
                            <Panel header="Clinical Trials" shaded>
                                <div style={{"marginBottom" : "10px"}}>
                                    {isLoadingMedicalConditions | isLoadingClinicalTrials ? <Loader  backdrop size="sm" content="Loading Medical Conditions and Clinical Trials data..." /> : ''}
                                    <div>                                        
                                        <div style={{"marginBottom" : "5px"}}>
                                            <h6>Select clinical trials area(s) from list below (selection will filter the list of associated clinical trials).</h6>
                                        </div>                                       
                                        <TagPicker
                                            creatable
                                            data={clinicalTrialsConditionsList.map(
                                                item => {
                                                        return item ? {label:item, value:item} : {label:'', value:''}
                                                        }
                                            )} 
                                            onSelect={(value, item, evt) => handleUserInput("medicalResearchSelector", value, evt)}
                                            virtualized
                                            style={{ width: 400 }}
                                            menuStyle={{ width: 400 }}
                                            placeholder="Select one or more Medical Conditions..."
                                            // onCreate={(value, item, evt) => {
                                            //     console.log('Created item: ', value)
                                            //     handleSelectionClinicalTrialsIdList("rdCTSelector", value, evt)
                                            // }}
                                        />
                                    </div>
                                    <div>
                                        {/* {isLoadingClinicalTrials ? <Loader  backdrop size="sm" content="Loading Clinical Trial IDs data..." /> : ''} */}
                                        <div style={{"marginBottom" : "5px"}}>
                                            <h6>Select clinical trials from the list below</h6>
                                        </div>                                        
                                        <TagPicker
                                            creatable
                                            data={clinicalTrialsIDList.map(
                                                item => {
                                                        return item ? {label:item, value:item} : {label:'', value:''}
                                                        }
                                            )} 
                                            onSelect={(value, item, evt) => handleUserInput("ctSelector", value, evt)}
                                            virtualized
                                            style={{ width: 400 }}
                                            menuStyle={{ width: 400 }}
                                            placeholder="Select one or more Clinical Trials..."
                                            // onCreate={(value, item, evt) => {
                                            //     console.log('Created item: ', value)
                                            //     handleSelectionClinicalTrialsConditionsLIst("rdCTSelector", value, evt)
                                            // }}
                                        />                                    
                                    </div>                                                                        
                                </div>                                
                                <p>or</p>
                                <div style={{"marginTop" : "5px", "marginBottom" : "10px"}}>
                                    <div style={{"marginBottom" : "5px"}}>
                                        <h6>Enter clinical trials by ID so that information can be retrieved and presented in your feed</h6>
                                    </div>
                                </div>
                                <TagInput style={{ width: 400 }} 
                                        trigger={'Enter'}
                                        placeholder="Enter Clinical Trials by ID/Title of interest"
                                        menuStyle={{ width: 300 }}
                                        onChange={(value, evt) => {
                                            handleUserInput("txtCTEdit", value, evt)
                                        }}                    
                                    />                    
                            </Panel>                    
                            </div>

                            <div className='generic-search-container-description'>
                                <h4>Medical Research of Interest</h4>
                                <h6>Medical research into rare diseases is a complex and challenging field that requires specialized approaches and dedicated efforts.</h6>
                                <br/>
                                <h6>Challenges in Rare Disease Research
                                    <li>Limited patient populations: The small number of affected individuals makes it difficult to conduct large-scale clinical trials.</li>
                                    <li>Diverse manifestations: Many rare diseases have varied symptoms and progression, complicating diagnosis and treatment development.</li>
                                    <li>Funding constraints: Limited commercial potential can lead to less investment from pharmaceutical companies.</li>
                                    <li>Lack of natural history data: There's often limited information about the progression and long-term effects of rare diseases.</li>
                                </h6>
                            </div>
                            <div className='generic-search-container-description'>
                            <Panel header="Enter terms related to Medical Research topics of interest" shaded>
                                <TagInput style={{ width: 400 }} 
                                    trigger={'Enter'}
                                    placeholder="Enter Medical Research terms of interest"
                                    menuStyle={{ width: 300 }}
                                    onChange={(value, evt) => {
                                        handleUserInput("medicalResearchEdit", value, evt)
                                    }}                    
                                />
                            </Panel>                                        
                            </div>
                            <div className='generic-search-container-description'>
                                <Form.Group controlId="rdQuestionSearchButton">
                                    <ButtonToolbar>
                                    <IconButton type="submit" appearance="primary" color="blue" icon={<EditIcon />}>
                                        Save Choices
                                    </IconButton>
                                    </ButtonToolbar>
                                </Form.Group>
                            </div>
                        </Content>
                    </div>            
                </div>
                </Container>
            </Container>            
        </Form>
        {isLoading ? <Loader backdrop size="md" content="Saving topics of interest..." /> : ''}      
    </div>
  );
};
