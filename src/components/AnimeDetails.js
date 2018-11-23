import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAnimeDetails } from '../queries/queries';
/* this.props.data.Media
averageScore: 89
bannerImage: "https://s3.anilist.co/media/anime/banner/21745-5psGR43Ck4RZ.jpg"
coverImage:
large: "https://s3.anilist.co/media/anime/cover/medium/nx21745-CEq1O4v9d6IQ.png"
medium: "https://s3.anilist.co/media/anime/cover/small/nx21745-CEq1O4v9d6IQ.png"
__typename: "MediaCoverImage"
__proto__: Object
description: "Final season of the Monogatari Series, part 4/5. Contains the arcs Mayoi Hell, Hitagi Rendezvous, and Ougi Dark from the Owarimonogatari light novels.↵<br><br>↵"That is—the end of your youth." On the morning of the appointed day of the college entrance examinations, Koyomi Araragi headed towards North Shirahebi Shrine. What awaits him there with an unexpected smiling face is the slice of the sword that marks the final decisive battle—All of the "stories" now meet their resolution!<br><br>↵(Source: Bakemonogatari Wiki)"
episodes: 7
genres: Array(3)
0: "Comedy"
1: "Mystery"
2: "Supernatural"
length: 3
__proto__: Array(0)
id: 21745
idMal: 35247
title:
userPreferred: "Owarimonogatari (Ge)"
*/
class AnimeDetails extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                AnimeDetails
            </div>
        );
    }
}

export default graphql(getAnimeDetails, {
    options: props => ({
        variables: {
            id: props.match.params.id
        }
    })
})(AnimeDetails);
