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
                             <p>Monitor <br /> satellite <br/> images</p>
                        </li>
                        <li className="icon-li">
                             <span> <Report /> </span>
                             <p>Report <br /> suspected <br/> illegal logging</p>
                        </li>

                        <li className="icon-li">
                             <span> <Donate /> </span>
                             <p>Donate to <br /> charity from <br/> points earned</p>
                        </li>
                    </ul>


                </div>
            </div>

            <div className="mission"> 
               <Tree />
               <div className="mission-content">
                   <h2>Our Mission</h2>
                   <p>To report on suspected illegal logging through satellite imagery</p>
               </div>
            </div>

            <div className="tutorial"> 
                {/* <image src="https://img.techpowerup.org/201107/tutorial.png" alt="tutorial"/> */}
                <ul className="tutorial-ul">
                    <h2>How it works?</h2>
                    <li>
                       <p>1. You will spawn at a random forest location with a birds-eye view.</p> 
                    </li>
                    <li>
                       <p>2. Navigate through the satellite map, looking for patches of missing trees.</p> 
                    </li>
                    <li>
                       <p>3. Once you find any evidence of illegal logging, report it.</p> 
                    </li>
                    <li>
                       <p>4. You'll earn points which will be converted into donations for your chosen charity.</p> 
                    </li>
                </ul>

                <div>
                </div>
                
            </div>
        </div>
    );
}