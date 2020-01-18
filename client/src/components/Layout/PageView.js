import React from 'react';

const PageView = ( props ) => {
    return(
        <div className = {'page-view ' + props.class}>
            {props.children}
        </div>
    )
}

export default PageView;