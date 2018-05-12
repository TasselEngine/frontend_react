import React from "react";
import { observer } from "mobx-react";

import "./app.css";
import { todo } from "../store/main";

@observer
export class Component extends React.Component<any, any> {

    public render() {
        return (
            <div>{this.props.tValue}</div>
        );
    }
}

@observer
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
            // const r = parseInt((Math.random() * 255) as any, 10);
            // const g = parseInt((Math.random() * 255) as any, 10);
            // const b = parseInt((Math.random() * 255) as any, 10);
            // this.setState({ style: { ...this.state.style, backgroundColor: `rgb(${r},${g},${b})` } });
            todo.value = Math.random() * 255;
        }, 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    public render() {
        return (
            <React.Fragment>
                <div style={this.state.style}>Hello world.</div>
                <Component tValue={todo.computedValue} />
            </React.Fragment>
        );
    }

}
