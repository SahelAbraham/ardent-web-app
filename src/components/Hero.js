import React from 'react';
import '../App.css';
import { TrySearchButton } from './TrySearchButton';
import './Hero.css';
import { Drawer, Button, Placeholder, Col } from 'rsuite';
import { Form, ButtonToolbar, Input } from 'rsuite';
import { FlexboxGrid, Divider } from 'rsuite';

function Hero() {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
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
                <Form layout="horizontal">
                  <FlexboxGrid justify="center">
                    <FlexboxGrid.Item as={Col} colspan={24} md={6}></FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                      <Form.Group controlId="textarea">
                        <Form.ControlLabel>Enter your question:</Form.ControlLabel>
                        <Form.Control rows={5} name="textarea" accepter={Textarea} />
                      </Form.Group>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={6}></FlexboxGrid.Item>
                  </FlexboxGrid>
                  <FlexboxGrid justify="center">
                    <ButtonToolbar>
                      <FlexboxGrid.Item as={Col} colspan={24} md={6}><Button appearance="primary">Search</Button></FlexboxGrid.Item>
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