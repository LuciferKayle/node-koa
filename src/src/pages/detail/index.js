import React, {Component} from 'react';
import Player from 'xgplayer';
import axios from 'axios';
import Loading from '../../common/loading/loading';

import {
    DetailContainer
} from './style';


class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mvUrl: '',
            loading: false,
            player: {}
        }
    }

    componentWillMount() {
        this.getMvInfo();
    }

    initPlayer(mvUrl,poster) {
        return new Promise((resolve,reject) => {
            try { 
                let player = new Player({
                    id: 'player-container',
                    url: mvUrl,
                    videoInit: true,
                    pip: true,
                    width: '100%',
                    height: '100%',
                    poster: poster,
                    playbackRate: [0.5, 0.75, 1, 1.5, 2],
                    defaultPlaybackRate: 1,
                });  
                this.setState({
                    player: player
                })
                resolve(player);
            } catch (error) {
                reject(error);
            }
        });
    }
    getMvInfo() {
        let id = this.props.match.params.id;
        this.setState({
            loading: true
        });
        axios.get(`/api/v0/movie/${id}`).then(res => {
            this.setState({
                loading: false,
                mvUrl: res.data.movie.video,
                poster: res.data.movie.cover
            });
            let {mvUrl,poster} = this.state;
            this.initPlayer(mvUrl,poster).then(res => {
                res.start();
            }).catch(err => {
                console.log(err);
            })

        }).catch(err => {
            console.log(err);
            this.setState({
                loading: false
            });
        }) 
    }

    render() {
        return (
            <DetailContainer className="detail-container">
                {this.state.loading && <Loading/>}
                <div id="player-container" className="player-container"></div>
            </DetailContainer>
        )
    }
    
}
;
export default Detail;