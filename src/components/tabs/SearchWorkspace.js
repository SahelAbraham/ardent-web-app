import '../../App.css'
import { Panel, PanelGroup, Placeholder, Container, Header, Content, Footer, Sidebar, Loader, Button, ButtonToolbar, Accordion, Navbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import axios from 'axios';
import { defaultItemSize } from 'rsuite/esm/internals/Windowing';
import GenericClinicalTrialsSearch from '../search/GenericClinicalTrialsSearch'
import { addClinicalTrialDetails,  resetClinicalTrialDetails } from '../../reducer/SearchClinicalTrialsReducer';
import processed_mock_resp from '../../mockData/ctdetails.json'
import GenericSearch from '../search/GenericSearch';
import '../search/Search.css'
import { FaAngleDoubleDown, FaArrowAltCircleDown, FaArrowDown } from 'react-icons/fa';
import SideBarNav from '../nav/SideBarNav.js'
import './Workspace.css'

export default function SearchWorkspace() {
  const [isLoading, setIsLoading] = useState(false);
  const searchCTDiseaseResultsDisplay = useSelector((state) => state.searchClinicalTrials.clinicalTrialSearchResults.items)
  const searchCTDetailsResultsDisplay = useSelector((state) => state.searchClinicalTrials.clinicalTrialDetails.items)
  const [searchCTDiseaseDisplay, setSearchCTDiseaseDisplay] = useState({});
  const [searchCTDetailsDisplay, setSearchCTDetailsDisplay] = useState({});
  const [nctId, setNctId] = useState("")
  const [ctDetailsLoading, setCTDetailsLoading] = useState(false);
  const [clinicalTrialsDetailsFlag, setClinicalTrialsDetailsFlag] = useState([]);
  const ardentWebAppUrl = useSelector((state) => state.notification.initialization.ardent_web_app_url)
  const dispatch = useDispatch();

  const extractSearchResults = () => {
      let displayObject = {}
      for(const [key, value] of Object.entries(searchCTDiseaseResultsDisplay)){
          displayObject[key] = {}
          displayObject[key]["question"] = value.question
          displayObject[key]["answer"] = []
          if(value.constructor === Object){
              for(const subEntry in value.answer){
                if(subEntry==='incl_list')
                  displayObject[key]["answer"].push(value.answer[subEntry])
              }
          }
      }
      return displayObject
  }

  // const extractSearchResults = () => {
  //   let displayObject = {}
  //   for(const [key, value] of Object.entries(searchCTDiseaseResultsDisplay)){
  //       displayObject = {}
  //       displayObject["question"] = value.question
  //       displayObject["answer"] = []
  //       if(value.constructor === Object){
  //           for(const subEntry in value.answer){
  //             if(subEntry==='incl_list')
  //               displayObject["answer"].push(value.answer[subEntry])
  //           }
  //       }
  //   }
  //   return displayObject
  // }

  const extractClinicalTrialsDetails = (nctId) => {
    let displayObject = {}
    for(const [key, value] of Object.entries(searchCTDetailsResultsDisplay)){
      if(value["nct_id"] === nctId){
        displayObject = {}
        displayObject["nct_id"] = value["nct_id"]
        displayObject["details"] = value["details"]
      }
    }
    return displayObject
  }

  const fetchCTDetailsByNCT = (nct_id) => {
    console.log('The button has been clicked with the nct_id : ', nct_id)
    setCTDetailsLoading(true)
    setNctId(nct_id)

    if (process.env.REACT_APP_USE_MOCK_DATA==='true'){
      console.log("Using mock data to process", process.env.REACT_APP_USE_MOCK_DATA)
      dispatch(addClinicalTrialDetails({"nct_id": nct_id,
                                        "details": processed_mock_resp}))
    }
    else
    {
      try {
        let ARDENT_WEB_APP_URL = ardentWebAppUrl!=='' ? ardentWebAppUrl : process.env.REACT_APP_ARDENT_WEB_APP_URL
        const headers = {
            "Content-Type": "application/json",
        };
        setIsLoading(true)
        axios.post(ARDENT_WEB_APP_URL + "/services/clinical_trials/" + nct_id + "/study_info", {headers})
        .then(response => {
            console.log(response.data);
            if(parseInt(response.status)===200){
                // let processed_resp = extractSearchResults(response.data, clinicalTrialsSearchFormInput.formInput.rdQuestion + clinicalTrialsSearchFormInput.formInput.rdTextDiseaseEntry)
                let processed_resp = response.data
                dispatch(addClinicalTrialDetails({"nct_id": nct_id,
                                                  "details": processed_resp}))
            }
            else
                dispatch(addClinicalTrialDetails({"nct_id": nct_id,
                                                "details": "No details received"}))
            setIsLoading(false)
      })
      .catch(error => {
          console.log(error);
      });
      } catch (error) {
      console.log('An error occurred while fetching search results', error)
      }
    }
    setClinicalTrialsDetailsFlag(oldArray => [...oldArray, nct_id])
    setCTDetailsLoading(false)
  }

  useEffect(() => {
    setSearchCTDiseaseDisplay(extractSearchResults())
  }, [searchCTDiseaseResultsDisplay])

  useEffect(() => {
    setSearchCTDetailsDisplay(extractClinicalTrialsDetails(nctId))
  }, [searchCTDetailsResultsDisplay])

  return (
    <div>
      <Container>
        <Header></Header>
        <Container>
          <div className="flex-workspace-container">
            {/* <div className="flex-workspace-child-left"> */}
              <SideBarNav/>
            {/* </div> */}
            {/* <div className="flex-workspace-child-right"> */}
              <Content>
                <div>
                  <div className='generic-search-container-description'>
                      <h4>Try a Rare Disease Search</h4>
                      <h6>A Rare Disease definition is hard to pin down. In the United States, a disease that affects fewer than 200,000 people at any given time is considered a rare disease whereas the European Union considers a disease rare if it affects no more than 50 per 100,000 people. A disease can be rare in one region, but common in another. 
                      There are around 7,000 rare diseases, and an estimated 25–30 million Americans who suffer from one. However, worldwide that estimate goes up to over 300 million people. Rare diseases can be caused by changes in a person's genes or chromosomes, an infection or immune response but the cause is unknown for many diseases. 
                      Some rare diseases affect a specific body system, while others can cause cancer.</h6>
                      <h6>For individuals as well as families living with rare diseases, information is but the first step of a difficult and often lonely journey.</h6>
                      <h6>Our point of view, having experienced the pain, confusion and apprehensiveness of such a journey is to provide the most relevant and up to date information about everything you need to make informed decisions about your next steps.</h6>
                  </div>
                  <div className='generic-search-container-description'>
                    <Panel header="Learn about a specific rare disease - causes, symptoms and progress to a cure" shaded>
                      <GenericSearch/>
                    </Panel>                
                  </div>
                </div>

                <div>
                  <div className='generic-search-container-description'>
                    <h4>Clinical Trials for Rare Diseases</h4>
                    <h6>Clinical trials are research studies that test new medical interventions or make observations on people to determine if they are safe and effective. They are a key part of medical advances 
                      and are used to develop new ways to prevent, detect, or treat disease</h6>
                    <h6>Clinical trials follow a carefully designed plan that includes the tests, procedures, treatments, and eligibility requirements. The protocol also describes the study's goals, expected duration, and protections for participants. 
                      Studying rare diseases is challenging. Participant pools are small and restricted by rigid inclusion and exclusion criteria. There is often incomplete understanding of genotype–phenotype relationships. The below search will retrieved
                      clinical trials for your particular rare disease</h6>
                  </div>
                  <div className='generic-search-container-description'>
                    <Panel header="Search for clinical trials that are recruiting for finding cures to Rare Diseases. " shaded>
                      <GenericClinicalTrialsSearch/>
                      <Panel header="Clinical Trials information (Recruiting only)" shaded>
                        {isLoading ? 
                          <div>
                              <Placeholder.Paragraph graph="circle" active />
                              <Loader  backdrop size="md" content="Answering from clinical trials..." />
                          </div> 
                          : 
                          <div>
                            <Accordion bordered>
                              {Object.entries(searchCTDiseaseDisplay).map(([key, value]) => {
                                return ((value !== null && value.answer != null) ? 
                                  <Accordion.Panel header={`Question: ${value.question}`} shaded caretAs={FaArrowDown}>  
                                    {value.answer.map((mapValue, mapKey) => (                                      
                                      Object.keys(mapValue).length > 0 && mapValue !== null ?
                                        Object.values(mapValue).map((entry, entryIdx) => (
                                          <Accordion.Panel header={`NCT ID: ${entry.nct_id} - ${entry.brief_title}`} key={entryIdx} caretAs={FaArrowDown} defaultExpanded={true}>
                                            <p>{`Study Title: ${entry.official_title}`}</p>                                
                                            {clinicalTrialsDetailsFlag.indexOf(entry.nct_id) > -1 & searchCTDetailsResultsDisplay.length>0 ? 
                                              searchCTDetailsResultsDisplay.map(element => {
                                                 return (element["nct_id"]===entry.nct_id) ? 
                                                   <Panel header={`Details for ${entry.nct_id}`} shaded>
                                                    <p>Trial phase : {(Object.keys(clinicalTrialsDetailsFlag).length < 0) ? "Data not available" : (entry.nct_id !== element["nct_id"] ? "Data not available" : element["details"]["clinical_trial_studies_info"]["phase"])}</p>
                                                    <p>Trial study type : {(Object.keys(clinicalTrialsDetailsFlag).length < 0) ? "Data not available" : (entry.nct_id !== element["details"]["clinical_trial_studies_info"]["nct_id"] ? "Data not available" :  element["details"]["clinical_trial_studies_info"]["study_type"])}</p>
                                                    <p>Trial sponsor/lead : {(Object.keys(clinicalTrialsDetailsFlag).length < 0) ? "Data not available" : (entry.nct_id !== element["details"]["clinical_trial_studies_sponsors"]["nct_id"] ? "Data not available" : element["details"]["clinical_trial_studies_sponsors"]["name"])}</p>
                                                    <p>Trial status : {(Object.keys(clinicalTrialsDetailsFlag).length < 0) ? "Data not available" : (entry.nct_id !== element["details"]["clinical_trial_studies_info"]["nct_id"] ? "Data not available" : element["details"]["clinical_trial_studies_info"]["overall_status"])}</p>
                                                    <p>Trial enrollment : {(Object.keys(clinicalTrialsDetailsFlag).length < 0) ? "Data not available" : (entry.nct_id !== element["details"]["clinical_trial_studies_info"]["nct_id"] ? "Data not available" : element["details"]["clinical_trial_studies_info"]["enrollment"])}</p>
                                                    <p>Trial start date: {(Object.keys(clinicalTrialsDetailsFlag).length < 0) ? "Data not available" : (entry.nct_id !== element["details"]["clinical_trial_studies_info"]["nct_id"] ? "Data not available" : new Date(element["details"]["clinical_trial_studies_info"]["created_at"]).toLocaleDateString('en-US'))}</p>
                                                    <p>Trial completion date (expected/estimated): {(Object.keys(clinicalTrialsDetailsFlag).length < 0) ? "Data not available" : (entry.nct_id !== element["details"]["clinical_trial_studies_info"]["nct_id"] ? "Data not available" : new Date(element["details"]["clinical_trial_studies_info"]["completion_date"]).toLocaleDateString('en-US'))}</p>
                                                  </Panel> : ''
                                                }) :
                                                ctDetailsLoading ? <Button appearance="ghost" loading>Get more details</Button> : <Button appearance="ghost" onClick={() => fetchCTDetailsByNCT(entry.nct_id)}>Get more details</Button>                                                
                                              }
                                          </Accordion.Panel>)) : <p>No trials found</p>)
                                    )} 
                                  </Accordion.Panel>
                                  : <p>No trials found</p>)
                              })}
                            </Accordion>                      
                          </div>}
                      </Panel>
                    </Panel>
                  </div>
                </div>
              </Content>
            {/* </div>             */}
          </div>
          {/* <Sidebar>
            <div className='workspace'>
            </div>
          </Sidebar> */}
        </Container>
        {/* <Footer>Footer</Footer> */}
      </Container>
    </div>
  );
}