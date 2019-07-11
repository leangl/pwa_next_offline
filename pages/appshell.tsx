import React from 'react'
import Router from "next/router"
import Error from 'next/error'

interface State {
    error: boolean
}

export default class extends React.Component<{}, State> {

    //@ts-ignore
    constructor(props) {
        super(props)
        this.state = {
            error: false
        }
    }

    static getInitialProps = async function () {
        return {};
    };

    componentDidMount() {
        Router.replace(location.href)
            .then(isSuccess => [isSuccess, null])
            .catch(error => [false, error])
            .then(([isSuccess, error]) => {
                if (!isSuccess) {
                    //First of all
                    window.stop();

                    console.error(`Appshell error, url: ${location.href}, error: ${error}`);

                    this.setState({
                        error: true
                    });
                }
            })
    }

    render() {
        const {error} = this.state
        return (
            <>
                {
                    error ?
                        //TODO: statusCode and title
                        <Error statusCode={404} title={"Page not found"}/>
                        :
                        <span>Loading...</span>
                }
            </>
        )
    }
}
