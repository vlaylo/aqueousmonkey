import React from 'react';
import classes from './DetailedInformation.css'

const DetailedInformation = (props) => {
    return (
         //VOTING HISTORY
       <div className={classes.Card}>
            <div className={classes.Heading}>{props.title}</div>
            <div className={classes.History}>{props.children}
                <div className={classes.Subheading}></div>
            </div>
       </div>
    )
}

export default DetailedInformation;