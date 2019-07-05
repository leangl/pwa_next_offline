import React from 'react';
import {getShow, Show} from "../api/api";
import {NextContext} from "next";

interface Props {
    show: Show
}

export default class extends React.Component<Props> {

    static getInitialProps = async function (context: NextContext) {
        const {id} = context.query;
        const show = await getShow(id);
        console.log(`Fetched show: ${show.name}`);
        return {show};
    };

    render() {
        const {show} = this.props;
        return (
            <div>
                <h1>Show</h1>
                <hr/>
                <h2>{show.name}</h2>
                <p>{show.summary.replace(/<[/]?p>/g, '')}</p>
            </div>
        )
    }
}