import React from 'react';
import { useFeed } from '../../../../hooks';
import { UserFeed } from './user-feed';
import './style.css';

export const UserFeedList = () => {
    const { feeds, isLoading } =  useFeed();

    return (
        <div className="feed">
            { isLoading ? "Loading.." :
            <ul className="feed-ul">
                {feeds.map((feed) => {
                    return(
                        <UserFeed 
                            key = {feed._id}
                            description = {feed.description}
                            report = {feed.report}
                            reward = {feed.reward}
                            donation = {feed.donation}
                            location = {feed.location}
                            createdAt = {feed.createdAt}
                        />
                        );
                })}   
            </ul> }
        </div>
    )
}