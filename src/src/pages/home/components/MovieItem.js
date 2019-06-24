import React from 'react';

import {
    MovieItemContainer,
    MovieItemDetail
} from '../style';

const MovieItem = (props) => {
    let info = props.data;
    return (
        <MovieItemContainer>
            <img className="mv-item-cover" src={info.cover} alt="mv-pic"/>
            <MovieItemDetail>
                <div className="name">{info.name}</div>
                <div className="author-name">{info.artistName}</div>
                <div className="score-count">
                    <i className="iconfont iconicon_comment"> {info.playCount} </i>     
                    <i className="iconfont iconaixin"> {info.score} </i>        
                </div>
            </MovieItemDetail>
        </MovieItemContainer>
    )
}

export default MovieItem;