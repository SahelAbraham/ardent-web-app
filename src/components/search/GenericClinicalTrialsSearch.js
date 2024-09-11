import { Form, Whisper, Input, Tooltip, InlineEdit, TagPicker, IconButton, ButtonToolbar, Notification, useToaster } from 'rsuite';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import SearchIcon from '@rsuite/icons/Search';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import { addClinicalTrialSearchResult, resetClinicalTrialSearchResult } from '../../reducer/SearchClinicalTrialsReducer';
import processed_mock_resp from '../../mockData/ctlist.json'

function GenericClinicalTrialsSearch({timelineData, timelineNodeIconArray}){
    const hardPrompt =  "You're an expert health care researcher who wants to obtain a summarized information about a disease and any progress that has been made. Don't make up any details or hallucinate information"
    const defaultClinicalTrialQuestion = "Retrieve actively recruiting clinical trials related to the selected/entered rare disease"
    const dispatch = useDispatch()
    const searchCTDiseaseResultsDisplay = useSelector((state) => state.searchClinicalTrials.clinicalTrialSearchResults.items)
    const rareDiseaseList = useSelector((state) => state.gardDiseases.rareDiseases.items)
    const rareDiseaseMap = rareDiseaseList.map(
      item => ({ label: item, value: item })
    );
    const [defaultCTQueryPlaceholder, setDefaultCTQueryPlaceholder] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [resolvedCTDisease, setResolvedCTDisease] = useState(false);
    const [clinicalTrialsSearchFormInput, setClinicalTrialsSearchFormInput] = useState({formInput : {
        rdSelector : "",
        rdTextDiseaseEntry: "",
        rdQuestion : "Give me up to date information about ",
        rdQuestionSearchButtonFlag : false
        }});
        
        const handleClinicalTrialsSearchWorkspaceChange = (val, evt) => {
        const { id, value } = evt.target;

        setClinicalTrialsSearchFormInput(prevState => ({
            ...prevState,
            formInput: {
            ...prevState.formInput, [id] : value,
            }
        }))
    }
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

    const fetchActiveClinicalTrialSearchResults = async (e) => {
        setIsLoading(true)
        // Resolve the CT diseases state from two components
        let resolvedCTDisease = ""
        if (clinicalTrialsSearchFormInput.formInput.rdTextDiseaseEntry !== ""){
            resolvedCTDisease = clinicalTrialsSearchFormInput.formInput.rdTextDiseaseEntry
            setResolvedCTDisease(resolvedCTDisease)
        }
        else if (clinicalTrialsSearchFormInput.formInput.rdSelector !== ""){
            resolvedCTDisease = clinicalTrialsSearchFormInput.formInput.rdSelector
            setResolvedCTDisease(resolvedCTDisease)
        }

        let resolvedQuestion = clinicalTrialsSearchFormInput.formInput.rdQuestion === "" ? defaultClinicalTrialQuestion : clinicalTrialsSearchFormInput.formInput.rdQuestion
        resolvedQuestion += resolvedCTDisease

        //check if the search has to be executed. The question to be used is in resolvedQuestion
        let executeSearchFlag = true
        if(searchCTDiseaseResultsDisplay.some((item) => item.question.toLowerCase() === resolvedQuestion.toLowerCase()))
          executeSearchFlag = false

        if(executeSearchFlag){
          if (process.env.REACT_APP_USE_MOCK_DATA){
            dispatch(addClinicalTrialSearchResult({"question": "Give me up to date information about Duchenne Muscular Dystrophy", 
              "condition" : "Duchenne Muscular Dystrophy",
              "answer": processed_mock_resp}))
          }
          else{
            try {
                let ARDENT_WEB_APP_URL = process.env.REACT_APP_ARDENT_WEB_APP_URL
                let data = {
                    name: "string",
                    description: "string",
                    prompt: hardPrompt,
                    query: resolvedQuestion,
                    llm: "string"
                }
                const headers = {
                    "Content-Type": "application/json",
                };
                axios.post(ARDENT_WEB_APP_URL + "/services/clinical_trials/", data, {headers})
                .then(response => {
                    console.log(response.data);
                    if(parseInt(response.status)===200){
                        // let processed_resp = extractSearchResults(response.data, clinicalTrialsSearchFormInput.formInput.rdQuestion + clinicalTrialsSearchFormInput.formInput.rdTextDiseaseEntry)
                        let processed_resp = response.data
                        dispatch(addClinicalTrialSearchResult({"question": clinicalTrialsSearchFormInput.formInput.rdQuestion, 
                                                                "condition" : resolvedCTDisease,
                                                                "answer": processed_resp}))
                    }
                    else
                        dispatch(addClinicalTrialSearchResult({"question": clinicalTrialsSearchFormInput.formInput.rdQuestion, 
                                                                "condition" : resolvedCTDisease,
                                                                "answer": 'No answer retrieved'}))
                    setIsLoading(false)
                  })
                  .catch(error => {
                      console.log(error);
                  });
                } catch (error) {
                console.log('An error occurred while fetching search results', error)
                }
              }//else - mock data
        }
        else{
          toaster.push(
            <Notification type="warning" header="Search already executed" closable>
              Search: <i>{resolvedQuestion}</i> has already been executed. Please review the results!!
            </Notification>,
            {label: 'topEndbottomEnd', value: 'bottomEnd'})
        }
    };

    return(
        <div className='search-workspace-ct-parent'>
                <Form 
                  onSubmit={fetchActiveClinicalTrialSearchResults}
                  >                  
                  <div class='search-workspace-ct-child'>
                    <Form.Group controlId="rdQuestion">
                      <Whisper trigger="focus" placement="bottom" speaker={<Tooltip>Enter a more defined question for the search if needed</Tooltip>}>
                        <Input name="rdQuestion" style={{ width: 300 }} as="textarea" rows={3} 
                          onChange={(val, evt)=>{
                            handleClinicalTrialsSearchWorkspaceChange(val, evt)
                          }}                        
                        //   placeholder="Default question: Retrieve actively recruiting clinical trials related to the selected/entered rare disease" 
                            placeholder = {defaultCTQueryPlaceholder}/>
                      </Whisper>
                    </Form.Group>
                  </div>
                  <div class='search-workspace-ct-child'>
                    {/* <Form.Group controlId="rdEdit">
                      <IconButton color="blue" icon={<PlusRoundIcon />} size="lg" />                      
                    </Form.Group> */}
                    <p>and</p>
                  </div>
                  <div class='search-workspace-ct-child'>
                    <Form.Group name="rdSelector" controlId="rdSelector">
                    
                      <InlineEdit
                        placeholder="Select rare disease ..."
                        style={{ width: 180 }}
                        defaultValue={['']}
                      >
                        <TagPicker name="rdSelector" data={rareDiseaseMap} block
                          onChange={(val, evt)=>{
                            handleClinicalTrialsSearchWorkspaceChange(val, evt)
                          }}/>
                      </InlineEdit>                    
                    </Form.Group>
                  </div>
                  <div class='search-workspace-ct-child'>or</div>
                  <div class='search-workspace-ct-child'>
                    <Form.Group name="rdTextDiseaseEntry" controlId="rdTextDiseaseEntry">
                      <InlineEdit name="rdTextDiseaseEntry" placeholder="Type a rare disease..." style={{ width: 300 }} 
                        onChange={(val, evt)=>{
                          handleClinicalTrialsSearchWorkspaceChange(val, evt)
                        }}                      
                      />
                    </Form.Group>
                  </div>                  
                  <div class='search-workspace-ct-child'>
                    <Form.Group controlId="rdQuestionSearchButton">
                      <ButtonToolbar>
                        <IconButton type="submit" appearance="primary" color="blue" icon={<SearchIcon />}>
                          Search
                        </IconButton>
                      </ButtonToolbar>
                    </Form.Group>                      
                  </div>
                </Form>
              </div>
    )
}

export default GenericClinicalTrialsSearch;