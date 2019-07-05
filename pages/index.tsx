import React from 'react';
import {NextContext} from "next";
import Link from 'next/link';
import {getShows, Show} from "../api/api";

interface Props {
    shows: Show[]
}

export default class extends React.Component<Props> {

    static getInitialProps = async function (_context: NextContext) {
        const shows = await getShows();
        console.log(`Show data fetched. Count: ${shows.length}`);
        return {shows};
    };

    render() {
        return (
            <div>
                <h1>Home</h1>
                <hr/>
                <ul>
                    {
                        this.props.shows.map(show => (
                            <li key={show.id}>
                                <Link href={`/show?id=${show.id}`}>
                                    <a>{show.name}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
