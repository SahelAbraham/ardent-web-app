import '../../App.css'
import { Panel, PanelGroup, Placeholder, Container, Header, Content, Footer, Sidebar, Loader, Button, ButtonToolbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import axios from 'axios';
import { defaultItemSize } from 'rsuite/esm/internals/Windowing';
import GenericClinicalTrialsSearch from '../search/GenericClinicalTrialsSearch'
import { addClinicalTrialDetails,  resetClinicalTrialDetails } from '../../reducer/SearchClinicalTrialsReducer';
import processed_mock_resp from '../../mockData/ctdetails.json'

export default function SearchWorkspace() {
  const [isLoading, setIsLoading] = useState(false);
  const searchCTDiseaseResultsDisplay = useSelector((state) => state.searchClinicalTrials.clinicalTrialSearchResults.items)
  const searchCTDetailsResultsDisplay = useSelector((state) => state.searchClinicalTrials.clinicalTrialDetails.items)
  const [searchCTDiseaseDisplay, setSearchCTDiseaseDisplay] = useState({});
  const [searchCTDetailsDisplay, setSearchCTDetailsDisplay] = useState({});
  const [nctId, setNctId] = useState("")
  const [ctDetailsLoading, setCTDetailsLoading] = useState(false);
  const [clinicalTrialsDetailsFlag, setClinicalTrialsDetailsFlag] = useState([]);
  const dispatch = useDispatch();

  const extractSearchResults = () => {
      let displayObject = {}
      for(const [key, value] of Object.entries(searchCTDiseaseResultsDisplay)){
          displayObject[key] = {}
          displayObject[key]["question"] = value.question
          displayObject[key]["answer"] = []
          if(value.constructor === Object){
              for(const subEntry in value.answer){
                displayObject[key]["answer"].push(value.answer[subEntry])
              }
          }
      }
      return displayObject
  }

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

    if (process.env.REACT_APP_USE_MOCK_DATA){
      dispatch(addClinicalTrialDetails({"nct_id": nct_id,
                                        "details": processed_mock_resp}))
    }
    else
    {
      try {
        let ARDENT_WEB_APP_URL = process.env.REACT_APP_ARDENT_WEB_APP_URL
        const headers = {
            "Content-Type": "application/json",
        };

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
          <Sidebar>
            <div className='workspace'>
            </div>
          </Sidebar>
          <Content>
            <Panel header="Clinical Trials for Rare Diseases" bordered shaded>
              <GenericClinicalTrialsSearch/>
              <Panel header="Clinical Trials information (Recruiting only)" shaded>
                {isLoading ? 
                  <div>
                      <Placeholder.Paragraph graph="circle" active />
                      <Loader center content="Retrieving answer..." />
                  </div> 
                  : 
                  <div>
                    <PanelGroup accordion bordered>
                      {Object.entries(searchCTDiseaseDisplay).map(([key, value]) => {
                        return (value !== null && value.answer != null) ? 
                          <Panel header={`Question: ${value.question}`} shaded>  
                            {value.answer.map((mapValue, mapKey) => (
                              <Panel header={`NCT ID: ${mapValue.nct_id} - ${mapValue.brief_title}`} key={mapKey}>
                                <p>{`Study Title: ${mapValue.official_title}`}</p>                                
                                {clinicalTrialsDetailsFlag.indexOf(mapValue.nct_id) > -1 ? 
                                  <Panel header={`Details for ${mapValue.nct_id}`} shaded>
                                      <p>Trial phase : {(Object.keys(searchCTDetailsDisplay).length <= 1) ? "Data not available" : (mapValue.nct_id !== searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["nct_id"] ? "Data not available" : searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["phase"])}</p>
                                      <p>Trial study type : {(Object.keys(searchCTDetailsDisplay).length <= 1) ? "Data not available" : (mapValue.nct_id !== searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["nct_id"] ? "Data not available" :  searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["study_type"])}</p>
                                      <p>Trial sponsor/lead : {(Object.keys(searchCTDetailsDisplay).length <= 1) ? "Data not available" : (mapValue.nct_id !== searchCTDetailsDisplay["details"]["clinical_trial_studies_sponsors"]["nct_id"] ? "Data not available" : searchCTDetailsDisplay["details"]["clinical_trial_studies_sponsors"]["name"])}</p>
                                      <p>Trial status : {(Object.keys(searchCTDetailsDisplay).length <= 1) ? "Data not available" : (mapValue.nct_id !== searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["nct_id"] ? "Data not available" : searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["overall_status"])}</p>
                                      <p>Trial enrollment : {(Object.keys(searchCTDetailsDisplay).length <= 1) ? "Data not available" : (mapValue.nct_id !== searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["nct_id"] ? "Data not available" : searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["enrollment"])}</p>
                                      <p>Trial start date: {(Object.keys(searchCTDetailsDisplay).length <= 1) ? "Data not available" : (mapValue.nct_id !== searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["nct_id"] ? "Data not available" : new Date(searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["created_at"]).toLocaleDateString('en-US'))}</p>
                                      <p>Trial completion date (expected/estimated): {(Object.keys(searchCTDetailsDisplay).length <= 1) ? "Data not available" : (mapValue.nct_id !== searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["nct_id"] ? "Data not available" : new Date(searchCTDetailsDisplay["details"]["clinical_trial_studies_info"]["completion_date"]).toLocaleDateString('en-US'))}</p>
                                    </Panel> :
                                    ctDetailsLoading ? <Button appearance="ghost" loading>Get more details</Button> : <Button appearance="ghost" onClick={() => fetchCTDetailsByNCT(mapValue.nct_id)}>Get more details</Button>
                                }
                              </Panel>
                            ))} 
                          </Panel>
                          : null;
                      })}
                    </PanelGroup>                      
                  </div>}
              </Panel>
            </Panel>
            <Panel header="Panel title" shaded>
              <Placeholder.Paragraph />
            </Panel>
            <Panel header="Panel title" shaded>
              <Placeholder.Paragraph />
            </Panel>
          </Content>
        </Container>
        <Footer>Footer</Footer>
      </Container>
    </div>
  );
}