import React, { Component } from 'react';
import axios from 'axios';

import MovieItem from './components/MovieItem';
import Loading from '../../common/loading.js';
import {
    HomeContainer,
    MovieContainer,
} from './style';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mvList: [],
            isLoading: true,
            isLoadingMore: false
        }
    }

    componentWillMount() {
        this.getMvList();
    }

    render() {
        let { mvList, isLoading ,isLoadingMore } = this.state;
        return (
            <HomeContainer>
                <MovieContainer>
                    <div className="tag-title">热门单曲</div>

                    <div className="main-container">
                        {
                            isLoading ? <Loading/> :
                            mvList.map((item) => {
                                return <MovieItem data={item} key={item._id}></MovieItem>
                            })
                        }
                    </div>

                    <div className="load-more">
                        {
                            isLoadingMore ?  <i className="iconfont iconjiazai"></i> : null
                        }
                        &nbsp;
                        加载更多    
                    </div>

                </MovieContainer>
            </HomeContainer>
        )


    }

    getMvList() {
        let that = this;
        axios.get('/api/v0/movie').then(res => {
            let movies = res.data.movies;
            that.setState(() => ({ mvList: movies, isLoading: false}));
        }).catch(err => {
            console.log(err);
        });
    }
}

export default Home;
