import React, {useState} from 'react';
import { Loader, Button, Col } from 'rsuite';
import { Form, ButtonToolbar, FlexboxGrid, PanelGroup, Panel, Placeholder } from 'rsuite';
import { SchemaModel, StringType } from "schema-typed"
import axios from 'axios';

function GenericSearch(){
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [queryStr, setQueryStr] = React.useState({textarea: ""});
    const formRef = React.useRef()
    const hardPrompt = 'You\'re an expert health care researcher who wants to obtain a summarized information about a disease and any progress that has been made. Don\'t make up any details or hallucinate information. Your response should be in two paragraphs or less'
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const model = SchemaModel({ 
      textarea: StringType() 
          .isRequired("Enter search query here") 
          .maxLength(100) 
    })
  
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    const fetchSearchResults_fake = async () => {
        setIsLoading(true)
        await sleep(7000)
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
            setResponse(response.data)
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
            <Form ref={formRef} 
                model={model} 
                onChange={setQueryStr} 
                onSubmit={fetchSearchResults_fake} 
                fluid>
                <FlexboxGrid justify="start">
                    {/* <FlexboxGrid.Item as={Col} colspan={24} md={2}></FlexboxGrid.Item> */}
                    <FlexboxGrid.Item as={Col} colspan={24} md={10}>
                        <Form.Group controlId="textarea">
                            <Form.ControlLabel>Enter your question:</Form.ControlLabel>
                            <FlexboxGrid justify="start">
                                <FlexboxGrid.Item as={Col} colspan={24} md={16}>
                                    <Form.Control rows={5} name="textarea"/>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                                    <ButtonToolbar>
                                        {/* <FlexboxGrid.Item md={6}> */}
                                            <Button appearance="primary" type="submit">Search</Button>
                                        {/* </FlexboxGrid.Item> */}
                                    </ButtonToolbar>
                                </FlexboxGrid.Item> 
                            </FlexboxGrid>                           
                        </Form.Group>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={14}>
                        <Panel header="Search Results" shaded>
                            {isLoading ? 
                            <div>
                                <Placeholder.Paragraph graph="circle" active />
                                <Loader center content="retrieving answer..." />
                            </div> 
                            : 
                            <div>
                                <PanelGroup accordion bordered>
                                    <Panel header="Panel 1" defaultExpanded>
                                    <Placeholder.Paragraph />
                                    </Panel>
                                    <Panel header="Panel 2">
                                    <Placeholder.Paragraph />
                                    </Panel>
                                    <Panel header="Panel 3">
                                    <Placeholder.Paragraph />
                                    </Panel>
                                </PanelGroup>
                            </div>}
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Form>
        </div>
    );
}

export default GenericSearch;