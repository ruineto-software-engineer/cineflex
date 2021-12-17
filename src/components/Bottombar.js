import { Fragment } from 'react';

export default function Bottombar(props) {
    return(
      <Fragment>
        <div className='bottombar'>
          <div className='bottombar-content'>
            <div className='bottombar-img-content'>
              <img className='bottombar-img' alt={`${props.title} posterURL`} src={props.posterURL}/>
            </div>
          </div>

          <p className='bottombar-title'>{props.title}</p>
        </div>
      </Fragment>
    );
}