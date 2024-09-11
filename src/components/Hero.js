import React, {useState} from 'react';
import '../App.css';
import { TrySearchButton } from './TrySearchButton';
import './Hero.css';
import { Drawer, Button, Placeholder, Col } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'
import GenericSearch from './search/GenericSearch';

function Hero() {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const [queryStr, setQueryStr] = React.useState({textarea: ""});
  const formRef = React.useRef()
  // const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref}/>);

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };



  // const fetchSearchResults = async () => {
  //   if (!formRef.current.check()) { 
  //     console.error("Form error") 
  //     return
  //   }
  //   try {
  //     // await fetch(`http://35.193.161.194:2000/services/pubmed_abstracts/`,
  //     await fetch(`http://127.0.0.1:2000/services/pubmed_abstracts/`,
  //       {
  //         method: "POST",
  //         // mode: 'no-cors',          
  //         headers: new Headers({
  //           "Content-Type": "application/json"
  //         }),
  //         body: JSON.stringify({
  //           name: "string",
  //           description: "string",
  //           prompt: hardPrompt,
  //           query: queryStr.textarea,
  //           llm: "string"
  //       })
  //      }).then(resp => resp.json())
  //     .then(data => { setResponse(JSON.stringify(data).replaceAll('\",\"success\":true', '')
  //         .replaceAll('\"results\":\"','') .replaceAll('\\n', '\n').slice(1,-1)) })
  //         .catch(err => { console.log(err) }); 
  //         setIsLoading(false)      
  //   } catch (error) {
  //     console.log('An error occurred while fetching search results', error)
  //   }    
  //   };

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
          <Drawer size='sm' placement={placement} open={open} onClose={() => setOpen(false)}>
            <Drawer.Header>
              <Drawer.Title>Rare Dieases Search</Drawer.Title>
              <Drawer.Actions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>  
              </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
              <GenericSearch/>
            </Drawer.Body>
          </Drawer>
      </div>
    </div>
  );
}

export default Hero;