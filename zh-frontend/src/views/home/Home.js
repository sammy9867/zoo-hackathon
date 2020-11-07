import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Report, Donate, Tree } from '../../components';
import "./Home.css";

export const Home = () => {
    return (
        <div className="home">
            <div className="bg-image">
                <div className="content">
                    <h2>Save forests,</h2>
                    <h2>get rewarded.</h2>

                    <Link to="/game">
                         <button className="start-game">BEGIN</button>
                    </Link>
                </div>

                <div className="icons">
                    <ul className="icon-ul">
                        <li className="icon-li">
                             <span> <Monitor /> </span>
                             <p>Monitor satellite images</p>
                        </li>
                        <li className="icon-li">
                             <span> <Report /> </span>
                             <p>Report suspected illegal logging</p>
                        </li>

                        <li className="icon-li">
                             <span> <Donate /> </span>
                             <p>Donate to charity from points earned</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="second"> 
                <Tree />
            </div>
        </div>
    );
}