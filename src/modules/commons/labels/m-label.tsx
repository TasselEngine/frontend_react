import React from "react";

interface XLabelProps {
    value: string;
    color?: string;
}

interface XLabelState {
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
