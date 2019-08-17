import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import MovieItem from './components/MovieItem';
import Loading from '../../common/loading/loading';

import {
    HomeContainer,
    MovieContainer,
    ScrollTopBtn,
    OperateContainer
} from './style';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mvList: [],
            isLoading: true,
            isLoadingMore: false,
            page: 1,
            total: 0,
            showScrollTop: false
        }

        this.loadMore = this.loadMore.bind(this);
        this.scrollTop = this.scrollTop.bind(this);

    }

    componentWillMount() {
        this.bindScrollEvent();
        this.getMvList();
    }

    render() {
        let { mvList, isLoading, isLoadingMore, showScrollTop } = this.state;
        return (
            <HomeContainer>
                <OperateContainer>
                    <div className="main-container"> 
                        <input className="input-singer" ref={input => this.input = input} placeholder="输入歌手名称" text="text"/>
                        <div className="search-btn" onClick={this.search.bind(this)}>搜索</div>
                    </div> 
                </OperateContainer>
                

                <MovieContainer>
                    <div className="tag-title">热门单曲</div>

                    <div className="main-container">
                        {
                            isLoading ? <Loading /> :
                                mvList.map((item) => {
                                    return (
                                        <Link className="mv-item-link" to={`/detail/${item.MvId}`} key={item._id}>
                                            <MovieItem data={item}></MovieItem>
                                        </Link>)
                                })
                        }
                    </div>

                    <div className="load-more" onClick={this.loadMore}>
                        {
                            isLoadingMore ? <i className="iconfont iconjiazai"></i> : null
                        }
                        &nbsp;
                        加载更多
                    </div>

                </MovieContainer>

                {showScrollTop ?
                    (<ScrollTopBtn onClick={this.scrollTop}>
                        <i className="iconfont iconweibajiantoushang"></i>
                    </ScrollTopBtn>) : null
                }


            </HomeContainer>
        )
    }

    search() {
        const inpVal = this.input.value;


        if(!inpVal) {
            alert('输入singer名称');
            return false;
        }   

        axios.get(`/api/v0/movieload?singer=${inpVal}`).then(res => {
            window.location.reload();
            console.log(res);
        }).catch(err => {
            console.log(err);
        });

    }

    scrollTop() {
        const requestAnimationFrame = window.requestAnimationFrame
            || window.mozRequestAnimaionFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame;

        var doc = document.body.scrollTop ? document.body : document.documentElement;
        var scrollTop = doc.scrollTop;

        var top = function () {
            scrollTop = scrollTop + (0 - scrollTop) / 8;
            if (scrollTop < 1) {
                doc.scrollTop = 0;
                return;
            }
            doc.scrollTop = scrollTop;
            requestAnimationFrame(top);
        };

        top();
    }

    bindScrollEvent() {
        let that = this;
        window.addEventListener('scroll', function () {
            let scrollTop = document.documentElement.scrollTop;
            if (scrollTop > 300) {
                that.setState({
                    showScrollTop: true
                })
            } else {
                that.setState({
                    showScrollTop: false
                })
            }
        })

    }

    loadMore() {
        let { page, total } = this.state;
        let that = this;

        if (page * 10 > total) {
            return false;
        }

        this.setState(() => ({ isLoadingMore: true }));

        axios.get(`/api/v0/movie?page=${page + 1}&pageSize=10&createdAt=-1`).then(res => {
            let { movies, total } = res.data;
            let newMvList = [].concat(that.state.mvList).concat(movies);

            that.setState(() => ({
                mvList: newMvList,
                isLoadingMore: false,
                total: total,
                page: ++page
            }));
        }).catch(err => {
            console.log(err);
        });

    }

    getMvList(page = 1) {
        let that = this;
        axios.get(`/api/v0/movie?page=${page}&pageSize=10&createdAt=-1`).then(res => {
            let { movies, total } = res.data;
            that.setState(() => ({ mvList: movies, isLoading: false, total: total }));
        }).catch(err => {
            console.log(err);
        });
    }
}

export default Home;
