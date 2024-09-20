import React, {useState, useEffect} from 'react';
import { Loader, Button, Col } from 'rsuite';
import { Form, ButtonToolbar, FlexboxGrid, PanelGroup, Panel, Placeholder } from 'rsuite';
import { SchemaModel, StringType } from "schema-typed"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { addSearchResult, resetSearchResult } from "../../reducer/SearchPubmedArticlesReducer"

function GenericSearch(){
    // const [open, setOpen] = React.useState(false);
    // const [placement, setPlacement] = React.useState();
    const [queryStr, setQueryStr] = React.useState({textarea: ""});
    const formRef = React.useRef()
    const hardPrompt = 'You\'re an expert health care researcher who wants to obtain a summarized information about a disease and any progress that has been made. Don\'t make up any details or hallucinate information. Your response should be in two paragraphs or less'
    const ardentWebAppUrl = useSelector((state) => state.notification.initialization.ardent_web_app_url)
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
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
        setIsLoaded(false)
        setIsLoading(true)
        if (!formRef.current.check()) { 
          console.error("Form error") 
          return
        }
        try {
            let ARDENT_WEB_APP_URL = ardentWebAppUrl!=='' ? ardentWebAppUrl : process.env.REACT_APP_ARDENT_WEB_APP_URL
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
                    dispatch(addSearchResult({"question": queryStr.textarea, "answer": response.data.results}))
                else
                    dispatch(addSearchResult({"question": queryStr.textarea, "answer": 'No answer retrieved'}))            
                setIsLoading(false)
                setIsLoaded(true)
            })
            .catch(error => {
                console.log(error);
            });
            } catch (error) {
                console.log('An error occurred while fetching search results', error)
            }
            setIsLoaded(true)
      };

    return (
        <div>
            <FlexboxGrid>
                <FlexboxGrid.Item className='search-container' as={Col} colspan={10}>
                    <Panel header="Enter your question:" bordered shaded>
                        <Form ref={formRef} 
                                model={model} 
                                onChange={setQueryStr} 
                                onSubmit={fetchSearchResults}>
                            <div style={{"marginBottom" : "20px"}}>
                                <Form.Group controlId="textarea">
                                    <FlexboxGrid.Item as={Col} colspan={16}>
                                        <Form.Control rows={5} name="textarea"/>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item as={Col} colspan={4}>
                                        <ButtonToolbar>
                                            <Button appearance="primary" type="submit">Search</Button>
                                        </ButtonToolbar>
                                        <br/>
                                    </FlexboxGrid.Item>
                                </Form.Group>
                            </div>
                        </Form>
                    </Panel>                    
                </FlexboxGrid.Item>
                <FlexboxGrid.Item className='search-container' as={Col} colspan={12}>
                    <Panel header="Search Results" shaded>
                        {isLoading ? 
                        <div>
                            <Placeholder.Paragraph graph="circle" active />
                            <Loader center content="Retrieving answer..." />
                        </div> 
                        : (isLoaded ?
                        <div>
                            <PanelGroup accordion bordered>
                                {searchResultsDisplay.map(function(object, i){
                                    return isLoading ? <Panel header={object.question} key={i}><Placeholder.Paragraph/></Panel> : 
                                    <Panel header={object.question} key={i}><p>{object.answer}</p></Panel>
                                })}
                            </PanelGroup>
                        </div> : 
                        <div>
                            <Placeholder.Paragraph graph="circle" />
                        </div>)}
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
}

export default GenericSearch;