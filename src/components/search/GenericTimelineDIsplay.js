import { Timeline, Loader, CheckIcon } from 'rsuite';
import React, {useState, useEffect} from 'react';

function GenericTimelineDisplay({timelineData, timelineNodeIconArray}){    
    return(
        <div>
            <Timeline className="custom-timeline">
                {timelineData.map(function(object, i){
                    return <Timeline.Item dot={<CheckIcon style={{ background: '#15b215', color: '#fff' }} />}>
                        <p>{object.answer}</p>
                    </Timeline.Item>
                })}                                
            </Timeline>            
        </div>
    )
}

export default GenericTimelineDisplay;