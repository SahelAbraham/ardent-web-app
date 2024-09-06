import '../../App.css'
import { Form, Panel, Placeholder, Container, Header, Content, Footer, Sidebar, Whisper, Input, Tooltip, InlineEdit, TagPicker, IconButton, ButtonToolbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import axios from 'axios';
import { addClinicalTrialSearchResult, resetClinicalTrialSearchResult } from '../../reducer/SearchClinicalTrialsReducer';

export default function SearchWorkspace() {
  const rareDiseaseList = useSelector((state) => state.gardDiseases.rareDiseases.items)
  const [isLoading, setIsLoading] = useState(false);
  const hardPrompt =  "You're an expert health care researcher who wants to obtain a summarized information about a disease and any progress that has been made. Don't make up any details or hallucinate information"
  const rareDiseaseMap = rareDiseaseList.map(
    item => ({ label: item, value: item })
  );

  const fetchActiveClinicalTrialSearchResults = async () => {
    setIsLoading(true)
    
    try {
        let ARDENT_WEB_APP_URL = process.env.REACT_APP_ARDENT_WEB_APP_URL
        let data = {
            name: "string",
            description: "string",
            prompt: hardPrompt,
            query: queryStr.textarea,
            llm: "string"
        }
        const headers = {
            "Content-Type": "application/json",
        };
        axios.post(ARDENT_WEB_APP_URL + '/services/pubmed_abstracts/', data, {headers})
        .then(response => {
            console.log(response.data);
            if(parseInt(response.status)==200)
                dispatch(addClinicalTrialSearchResult({"question": queryStr.textarea, "answer": response.data.results}))
            else
                dispatch(addSearchResult({"question": queryStr.textarea, "answer": 'No answer retrieved'}))            
            setIsLoading(false)
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
      <Container>
        <Header></Header>
        <Container>
          <Sidebar>
            <div className='workspace'>
            </div>
          </Sidebar>
          <Content>
            <Panel header="Recruiting Trials for Rare Diseases" bordered shaded>
              <div className='search-workspace-ct-parent'>
                <Form onSubmit={fetchActiveClinicalTrialSearchResults}>
                  <div class='search-workspace-ct-child'>
                    <Form.Group controlId="rdSelector">
                    
                      <InlineEdit
                        placeholder="Select rare disease ..."
                        style={{ width: 180 }}
                        defaultValue={['']}
                      >
                        <TagPicker data={rareDiseaseMap} block />
                      </InlineEdit>                    
                    </Form.Group>
                  </div>                    
                  <div class='search-workspace-ct-child'>or</div>
                  <div class='search-workspace-ct-child'>
                    <Form.Group controlId="rdSelector">
                      <InlineEdit placeholder="Type a rare disease..." style={{ width: 150 }} />
                    </Form.Group>
                  </div>                  
                  <div class='search-workspace-ct-child'>
                    <Form.Group controlId="rdEdit">
                      <IconButton color="blue" icon={<PlusRoundIcon />} size="lg" />                      
                    </Form.Group>
                  </div>
                  <div class='search-workspace-ct-child'>
                    <Form.Group controlId="rdQuestion">
                      <Whisper trigger="focus" speaker={<Tooltip>Enter a more defined question for the search if needed</Tooltip>}>
                        <Input style={{ width: 300 }} as="textarea" rows={3} placeholder="Default question: Retrieve actively recruiting clinical trials related to the selected/entered rare disease" />
                      </Whisper>
                    </Form.Group>
                  </div>
                  <div class='search-workspace-ct-child'>
                    <Form.Group controlId="rdQuestion">
                      <ButtonToolbar>
                        <IconButton type="submit" appearance="primary" color="blue" icon={<SearchIcon />}>
                          Search
                        </IconButton>
                      </ButtonToolbar>
                    </Form.Group>                      
                  </div>
                </Form>
              </div>
              <Panel header="Panel title" shaded>
                <Placeholder.Paragraph />
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