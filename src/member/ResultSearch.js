import React, {useEffect, useState} from 'react';
import './Style.css'; // CSS 파일을 import
import {Link, useLocation, useNavigate} from 'react-router-dom';
import logoImage from '../img/semohan-logo.png';
import toMain from "../img/toMain.png";
import searchBtn from "../img/search.png";
import searchImage from "../img/search.png";
import example from "../img/buffetjpg.jpg";
import bookmarkImage from "../img/bookmark-white.png";
import axios from "axios";

function ResultSearch() {
    const navigate = useNavigate();

    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (location.state && location.state.results) {
            setSearchResults(location.state.results);
        }
    }, [location.state]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        axios.get('/restaurant/search', {
            params: {
                location: searchTerm,
                menu: searchTerm,
                name: searchTerm
            }
        })
            .then(response => {
                setSearchResults(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the search data!', error);
            });
    };

    return (
        <div id="newBody">
            <header>
                <img src={logoImage} alt="logo"/>
            </header>
            <div id="searchBar">
                <img src={toMain} alt="toMain" onClick={() => navigate('/mainNoLogin')}/>
                <input type="text"
                       name="search"
                       className="search"
                       // value={검색어}
                       value={searchTerm}
                       onChange={handleSearchChange}
                />
                <img className="headerImg" src={searchImage} onClick={handleSearchClick} alt="search"/>
            </div>

            <div id="main_noLogin">
                <div className="image-grid">
                    {/*식당 수만큼*/}
                    {searchResults.map((restaurant, index) => (
                    <div className="image-container">
                        <img className="resImg" src={restaurant.image} alt="search"/>
                        <img className="bookmark-image" src={bookmarkImage} onClick={{/*클릭마다 사진 바뀜, 스크랩 등록+취소*/}}/>
                        <span className="image-caption">{restaurant.name}</span>
                    </div>
                    ))}
                    {/*<div className="image-container">*/}
                    {/*    <img className="resImg" src={example/*식당사진*!/ alt="search"/>*/}
                    {/*    <img className="bookmark-image" src={bookmarkImage} onClick={/!*클릭마다 사진 바뀜, 스크랩 등록+취소*!/}/>*/}
                    {/*    <span className="image-caption">뷔페1</span>*/}
                    {/*</div>*/}
                    {/*<div className="image-container">*/}
                    {/*    <img className="resImg" src={example/*식당사진*!/ alt="search"/>*/}
                    {/*    <img className="bookmark-image" src={bookmarkImage} onClick={/!*클릭마다 사진 바뀜, 스크랩 등록+취소*!/}/>*/}
                    {/*    <span className="image-caption">뷔페1</span>*/}
                    {/*</div><div className="image-container">*/}
                    {/*    <img className="resImg" src={example/*식당사진*!/ alt="search"/>*/}
                    {/*    <img className="bookmark-image" src={bookmarkImage} onClick={/!*클릭마다 사진 바뀜, 스크랩 등록+취소*!/}/>*/}
                    {/*    <span className="image-caption">뷔페1</span>*/}
                    {/*</div><div className="image-container">*/}
                    {/*    <img className="resImg" src={example/*식당사진*!/ alt="search"/>*/}
                    {/*    <img className="bookmark-image" src={bookmarkImage} onClick={/!*클릭마다 사진 바뀜, 스크랩 등록+취소*!/}/>*/}
                    {/*    <span className="image-caption">뷔페1</span>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}

export default ResultSearch;
