import styled from 'styled-components';

export const HomeContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 60px;
    margin-top: 24px;
`

export const MovieContainer = styled.div`

    .tag-title {
        margin: 20px 0 32px;
        height: 33px;
        font-size: 24px;
        font-weight: 700;
        color: #353535;
        line-height: 33px;
        -webkit-box-flex: 1;
    }

    .main-container {
        min-height: 600px;
        position: relative;

        .mv-item-link {    
            display: inline-block;
            margin: 0 16px 24px 0;
            
            &:nth-of-type(5n) {
                margin-right: 0;
            }
        }
    }


    .load-more {
        box-sizing: border-box;
        cursor: pointer;
        width: 600px;
        margin: 0 auto;
        border-radius: 20px;
        background-color: #a5a5a5;
        height: 40px;
        margin: 30px auto 60px;
        padding: 10px 15px;
        text-align: center;
        font-size: 15px;
        border-radius: 20px;
        color: #fff;
        background-color: #a5a5a5;
        display: block;

        .iconjiazai {
            display: inline-block;
            animation: loading 1s linear 0s infinite;
            -webkit-animation: loading 1s linear 0s infinite;

        }
        @keyframes loading {                    
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        @-webkit-keyframes loading {                    
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
    }
`

export const MovieItemContainer = styled.div`
    display: inline-block;
    position: relative;
    width: 227px;
    height: 296px;
    border-radius: 4px;
    background: #fff;
    -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,.01), 0 6px 12px 0 rgba(0,0,0,.06);
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.01), 0 6px 12px 0 rgba(0,0,0,.06);
    color: #353535;
    overflow: hidden;
    -webkit-transition: transform .3s ease-in-out;
    transition: transform .3s ease-in-out;

    &:hover {
        transform: translate3d(0,-8px,0);
    }

    .mv-item-cover {
        width: 100%;
        height: 170px;
        vertical-align: top;
    }
`

export const MovieItemDetail = styled.div`
    position: relative;
    box-sizing: border-box;
    padding: 8px 12px 0;
    overflow: hidden;
    height: 126px;

    .name {
        display: block;
        height: 22px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .author-name {
        float: left;
        height: 18px;
        line-height: 18px;
        padding: 0 5px;
        font-size: 12px;
        text-align: center;
        color: #888;
        background: #e8eaed;
        border-radius: 2px;
        margin-top: 10px;   
    }

    .score-count {  
        position: absolute;
        padding: 8px 12px 0;
        bottom: 18px;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-item: center;

        .iconfont {
            margin-right: 8px;
            font-size: 12px;
            cursor: pointer;
        }

        .iconicon_comment:hover::before {
            color: yellow;
            transform: scale(1.2,1.2);
        }

        .iconaixin:hover::before {
            color: red;
            transform: scale(1.2,1.2);
        }
    }

`

export const ScrollTopBtn = styled.div`
    position: fixed;
    bottom: 100px;
    right: 40px;
    z-index: 1040;
    border: 1px solid #dcdcdc;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;

`