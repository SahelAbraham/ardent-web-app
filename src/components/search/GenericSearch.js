import React, {useState, useEffect} from 'react';
import { Loader, Button, Col } from 'rsuite';
import { Form, ButtonToolbar, FlexboxGrid, PanelGroup, Panel, Placeholder } from 'rsuite';
import { SchemaModel, StringType } from "schema-typed"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { addSearchResult, resetSearchResult } from "../../reducer/searchPubmedArticlesReducer"

function GenericSearch(){
    // const [open, setOpen] = React.useState(false);
    // const [placement, setPlacement] = React.useState();
    const [queryStr, setQueryStr] = React.useState({textarea: ""});
    const formRef = React.useRef()
    const hardPrompt = 'You\'re an expert health care researcher who wants to obtain a summarized information about a disease and any progress that has been made. Don\'t make up any details or hallucinate information. Your response should be in two paragraphs or less'
    
    const [isLoading, setIsLoading] = useState(false);
    const searchResults = useSelector((state) => state.searchPubmedArticles.searchResults.items)
    const [searchResultsDisplay, setSearchResultsDisplay] = React.useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        if(searchResults){
            setSearchResultsDisplay(searchResults);
        }
    }, [searchResults]);

    const model = SchemaModel({ 
      textarea: StringType() 
          .isRequired("Enter search query here") 
          .maxLength(100) 
    })
  
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    // Fake mock api result
    const fetchSearchResults_fake = async () => {
        setIsLoading(true)
        await sleep(3000)        
        dispatch(addSearchResult({"question": queryStr.textarea, "answer": "This is the first result"}))
        await sleep(7000)
        dispatch(addSearchResult({"question": queryStr.textarea, "answer": "This is the second result"}))
        setIsLoading(false)
    }
  
    const fetchSearchResults = async () => {
        setIsLoading(true)
        if (!formRef.current.check()) { 
          console.error("Form error") 
          return
        }
        try {
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
          axios.post('http://35.193.161.194:2000/services/pubmed_abstracts/', data, {headers})
          .then(response => {
            console.log(response.data);
            if(parseInt(response.status)==200)
                dispatch(addSearchResult({"question": queryStr.textarea, "answer": response.data.results}))
            else
                dispatch(addSearchResult({"question": queryStr.textarea, "answer": 'No answer retrieved'}))
            // setResponse(response.data)
          })
          .catch(error => {
            console.log(error);
          });
        } catch (error) {
          console.log('An error occurred while fetching search results', error)
        }
        setIsLoading(false)
      };

    return (
        <div>
            <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item as={Col} colspan={8}>                        
                    <FlexboxGrid justify="space-between">
                        <Form ref={formRef} 
                            model={model} 
                            onChange={setQueryStr} 
                            onSubmit={fetchSearchResults}>
                            <Form.Group controlId="textarea">
                                <Form.ControlLabel>Enter your question:</Form.ControlLabel>
                                <FlexboxGrid.Item as={Col} colspan={16}>
                                    <Form.Control rows={5} name="textarea"/>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item as={Col} colspan={4}>
                                    <ButtonToolbar>
                                        <Button appearance="primary" type="submit">Search</Button>
                                    </ButtonToolbar>
                                </FlexboxGrid.Item>
                            </Form.Group>
                        </Form>
                    </FlexboxGrid>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={10}>
                    <Panel header="Search Results" shaded>
                        {isLoading ? 
                        <div>
                            <Placeholder.Paragraph graph="circle" active />
                            <Loader center content="Retrieving answer..." />
                        </div> 
                        : 
                        <div>
                            <PanelGroup accordion bordered>
                                {searchResultsDisplay.map(function(object, i){
                                    return <Panel header={object.question} key={i}><p>{object.answer}</p></Panel>;
                                })}
                            </PanelGroup>
                        </div>}
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
}

export default GenericSearch;