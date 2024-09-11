import { Panel, FlexboxGrid, Divider } from 'rsuite';
import './Description.css'

function Description() {
  return(
    <div>      
      <FlexboxGrid justify="space-around">
        <FlexboxGrid.Item colspan={10}>
          <h2>The origins of ARDENT</h2>
          <Panel>
          <div>          
            <h4>Built by the Abraham family and NovoMorpho, ARDENT is an AI powered system for getting
              the most up to date information and clinical trials related to rare diseases. Beyond an understanding
              of a rare disease and the clinical trials surrounding it, the most important ally in the fight of one's
              life is our community.
            </h4>
            <br/>
            <h4>Information is one piece of the puzzle.e are working hard to help patients and families find help from
              the community at large. In our own experience, it was critical to find a community of fellow patients from all around
              the world in order to sift through research, treatment options to pursue and even avoid.
            </h4>
            <br/>
            <h4>ARDENT uses Google's Gemini API to provide a natural language rendering of relevant and the latest research and data about 
              rare diseases to those who need it, and serves to connect potential patients with the clinical trials that could possibly provide a solution.
            </h4>
          </div>
        </Panel>
        </FlexboxGrid.Item>
        <Divider vertical="true"></Divider>
        <FlexboxGrid.Item colspan={10}>
          <Panel className='background'>
          </Panel>
        </FlexboxGrid.Item>
    </FlexboxGrid>

    </div>
  )
}

export default Description;