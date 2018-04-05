import React from "react";

import "./app.css";

export class App extends React.Component<any, any> {

    private interval: any;

    constructor(props: any) {
        super(props);
        this.state = {
            style: {
                fontSize: "18px",
                fontWeight: "bold"
            }
        };
    }

    componentWillMount() {
        this.interval = setInterval(() => {
            const r = parseInt((Math.random() * 255) as any, 10);
            const g = parseInt((Math.random() * 255) as any, 10);
            const b = parseInt((Math.random() * 255) as any, 10);
            this.setState({ style: { ...this.state.style, backgroundColor: `rgb(${r},${g},${b})` } });
        }, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    public render() {
        return (
            <div style={this.state.style}>Hello world.</div>
        );
    }

}
