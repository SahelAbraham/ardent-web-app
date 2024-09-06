import '../../App.css'
import { Modal, Button, Placeholder, Panel, PanelGroup, FlexboxGrid, ButtonToolbar, Col } from 'rsuite';
import React, {useEffect, useState} from 'react';

export default function Login() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 

    return (
        <div>
            {/* <ButtonToolbar> */}
            <Button onClick={handleOpen}>Get the App!</Button>
            {/* </ButtonToolbar> */}
            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>App Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ width: 300, height: 100, position: 'relative' }}>
                        <PanelGroup>
                            <FlexboxGrid justify="space-between">
                                <FlexboxGrid.Item as={Col} colspan={12}>
                                    <Panel header="Get the IOS App" shaded>
                                        <Placeholder.Paragraph />
                                    </Panel>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item as={Col} colspan={12}>
                                    <Panel header="Get the Android App" shaded>
                                        <Placeholder.Paragraph />
                                    </Panel>  
                                </FlexboxGrid.Item>            
                            </FlexboxGrid>
                        </PanelGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>                    
                </Modal.Footer>
            </Modal>
        </div>
    );
}