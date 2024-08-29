import React, {useState} from 'react';
import '../App.css';
import { TrySearchButton } from './TrySearchButton';
import './Hero.css';
import { Drawer, Button, Placeholder, Col } from 'rsuite';
import { Form, ButtonToolbar, Input } from 'rsuite';
import { FlexboxGrid, Divider } from 'rsuite';
import { SchemaModel, StringType } from "schema-typed"
import 'rsuite/dist/rsuite.min.css'

function Hero() {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const [queryStr, setQueryStr] = React.useState({textarea: ""});
  const formRef = React.useRef()
  // const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref}/>);

  const hardPrompt = 'You\'re an expert health care researcher who wants to obtain a summarized information about a disease and any progress that has been made. Don\'t make up any details or hallucinate information. Your response should be in two paragraphs or less'
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const model = SchemaModel({ 
    textarea: StringType() 
        .isRequired("Enter search query here") 
        .maxLength(100) 
  })

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };

  const fetchSearchResults = async () => {
    if (!formRef.current.check()) { 
      console.error("Form error") 
      return
    }
    try {
      await fetch(`http://35.193.161.194:2000/services/pubmed_abstracts/`,
        {
          method: 'POST',
          mode: 'no-cors',          
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            name: "string",
            description: 'string',
            prompt: hardPrompt,
            query: queryStr.textarea,
            llm: 'string',
        })
       }).then(resp => resp.json())
          .then(data => { setResponse(JSON.stringify(data).replaceAll('\",\"success\":true', '')
          .replaceAll('\"results\":\"','') .replaceAll('\\n', '\n').slice(1,-1)) })
          .catch(err => { console.log(err) }); 
          setIsLoading(false)      
    } catch (error) {
      console.log('An error occurred while fetching search results', error)
    }    
    };

  return (
    <div>
      <div className='hero-container'>
        <video src='/videos/video-6.mp4' autoPlay loop muted />
        <h2>ARDENT finds Answers</h2>
        <p>Get the latest research and clinical trials information on any Rare Disease</p>
        <div className='hero-btns'>
          {!open && 
            <TrySearchButton           
              className='btns'
              buttonStyle='btn--primary'
              buttonSize='btn--large'
              onClick={() => handleOpen('bottom')}
            >
              Try a Search!
            </TrySearchButton>}
        </div>
      </div>
      <div className='hero-container-search'>
          <Drawer size='md' placement={placement} open={open} onClose={() => setOpen(false)}>
            <Drawer.Header>
              <Drawer.Title>Search latest information about Rare Dieases</Drawer.Title>
              <Drawer.Actions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>  
              </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
              <div>
                <Form ref={formRef} 
                model={model} 
                onChange={setQueryStr} 
                onSubmit={fetchSearchResults} 
                fluid>
                  <FlexboxGrid justify="center">
                    <FlexboxGrid.Item as={Col} colspan={24} md={6}></FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                      <Form.Group controlId="textarea">
                        <Form.ControlLabel>Enter your question:</Form.ControlLabel>
                        <Form.Control rows={5} name="textarea"/>
                      </Form.Group>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={6}></FlexboxGrid.Item>
                  </FlexboxGrid>
                  <FlexboxGrid justify="center">
                    <ButtonToolbar>
                      <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                        <Button appearance="primary" type="submit">Search</Button>
                      </FlexboxGrid.Item>
                    </ButtonToolbar>                
                  </FlexboxGrid>                
                </Form>
                </div>
            </Drawer.Body>
          </Drawer>
      </div>
    </div>
  );
}

export default Hero;