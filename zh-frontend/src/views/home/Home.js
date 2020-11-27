import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Report, Donate, Tree } from '../../components';
import "./Home.css";

export const Home = () => {

    return (
        <div className="home">
            <section className="first" style={{backgroundImage: 'url(' + process.env.PUBLIC_URL + '/images/forest3.jpg)' }}> 
                <article className="content">
                    <h2>Save forests,</h2>
                    <h2>Get rewarded</h2>
                    <Link to="/game">
                         <button className="start-game">BEGIN</button>
                    </Link>

                    <ul className="icons-ul">
                        <li className="icons-li">
                            <div>
                                <span> <Monitor /> </span>
                                <p>Monitor <br/> satellite <br/> images</p>
                            </div>  
                        </li>
                        <li className="icons-li">
                            <div>
                                <span> <Report /> </span>
                                <p>Report  <br/> suspected <br/> illegal logging</p>
                             </div>
                        </li>
                        <li className="icons-li">
                            <div>
                                <span> <Donate /> </span>
                                <p>Donate to <br/> charity from <br/> points earned</p>
                             </div>
                        </li>
                    </ul>
                </article>
            </section>

            <section className="second">
                <img src={process.env.PUBLIC_URL + '/images/forest-spy.png'} />
                 <article className="mission"> 
                    <h2>Our Mission</h2>
                    <p>To report on suspected illegal logging through satellite imagery.</p>
                </article>
            </section>

            <section className="third">
                <article className="tutorial">
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
                </article>
            </section>
        </div>
    );
}