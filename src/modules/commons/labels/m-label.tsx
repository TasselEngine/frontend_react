import React from "react";

export interface XLabelProps {
    value: string;
    color?: string;
}

export interface XLabelState {
    value: string;
    style: any;
}

export class MLabel extends React.PureComponent<XLabelProps, XLabelState> {

    private style: any;

    constructor(props: XLabelProps) {
        super(props);
        this.state = {
            value: props.value,
            style: {
                color: props.color || "#000"
            }
        };
    }

    render() {
        return (
            <label style={this.state.style}>{this.state.value}</label>
        );
    }

}
