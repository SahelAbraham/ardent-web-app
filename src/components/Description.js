import { useMediaQuery, Panel, FlexboxGrid, Divider, Stack, Col } from 'rsuite';
import './Description.css'
import YouTube, { YouTubeProps } from 'react-youtube';

function Description() {
  const [isMobile] = useMediaQuery('(max-width: 700px)');
  let opts = {}
  opts = isMobile ?
  {
    height: '195',
    width: '320',
    playerVars: {
      autoplay: 1,
    },
  } : 
  {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };
  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  return(
    <div className='description-container'>
      <Stack>
          <FlexboxGrid justify="space-around">
          {/* <Stack direction={isMobile ? 'column' : 'row'} spacing={2} style={{"marginBottom" : "20px", "alignItems":"left"}}> */}
            <FlexboxGrid.Item as={Col} colspan={20}>
                <Panel>
                    <div className='description-text'>
                      <h2>The origins of ARDENT</h2>
                      <p>Built by the Abraham family and NovoMorpho, ARDENT is an AI powered system for getting
                        the most up to date information and clinical trials related to rare diseases. Beyond an understanding
                        of a rare disease and the clinical trials surrounding it, the most important ally in the fight of one's
                        life is our community.
                      </p>
                      
                      <p>Information is one piece of the puzzle. We are working hard to help patients and families find help from
                        the community at large. In our own experience, it was critical to find a community of fellow patients from all around
                        the world in order to sift through research, treatment options to pursue and even avoid.
                      </p>
                      
                      <p>ARDENT uses Google's Gemini API to provide a natural language rendering of relevant and the latest research and data about 
                        rare diseases to those who need it, and serves to connect potential patients with the clinical trials that could possibly provide a solution.
                      </p>
                    </div>
                </Panel>
                <Panel>
                  <div className='description-text'>
                    <p>View our submission for the <a href="https://ai.google.dev/competition"> Gemini API </a> competition.</p>
                  </div>          
                </Panel>        
                <Panel style={{margin : "20px"}}>
                  <div>
                    <YouTube videoId="w9lXcEj5tXY" opts={opts} onReady={onPlayerReady} />
                  </div>              
                </Panel>
            </FlexboxGrid.Item>
            {/* <Divider vertical/>
            <FlexboxGrid.Item as={Col} colspan={10}>
              <Panel className='background'/>
            </FlexboxGrid.Item> */}
            {/* </Stack>  */}
        </FlexboxGrid>
      </Stack>
    </div>
  )
}

export default Description;