import '../../App.css'
import { Panel, Placeholder } from 'rsuite';
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
import { InlineEdit, TagPicker } from 'rsuite';
import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function SearchWorkspace() {
  const rareDiseaseList = useSelector((state) => state.gardDiseases.rareDiseases.items)

  const rareDiseaseMap = rareDiseaseList.map(
    item => ({ label: item, value: item })
  );

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
                <div class='search-workspace-ct-child'>
                  <InlineEdit
                    placeholder="Select rare disease ..."
                    style={{ width: 180 }}
                    defaultValue={['']}
                  >
                    <TagPicker data={rareDiseaseMap} block />
                  </InlineEdit>                  
                </div>
                <div class='search-workspace-ct-child'>or</div>                
                <div class='search-workspace-ct-child'><InlineEdit placeholder="Type a rare disease..." style={{ width: 150 }} /></div>
              </div>              
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