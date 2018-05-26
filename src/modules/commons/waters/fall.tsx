import React from "react";
import MediaQuery from 'react-responsive';
import css from "./waters.scss";
import { parse } from "@utils";

const { bind, map } = parse(css);

export interface FallProps {
    width?: number | string;
    data?: any;
    template?: React.Component | ((prop?: any) => JSX.Element);
}

export class Fall extends React.Component<FallProps> {

    render() {
        const styles = {
            width: this.props.width || "100%"
        };
        const Anner = this.props.template as any;
        const col03 = bind("col-3");
        const col04 = bind("col-4");
        const col06 = bind("col-6");
        const col12 = bind("col-12");
        return (
            <div className={bind("row")} style={styles}>
                <MediaQuery minWidth={1280}>
                    <div className={col03}>{<Anner data={this.props.data}></Anner>}</div>
                    <div className={col03}>{<Anner data={this.props.data}></Anner>}</div>
                    <div className={col03}>{<Anner data={this.props.data}></Anner>}</div>
                    <div className={col03}>{<Anner data={this.props.data}></Anner>}</div>
                </MediaQuery>
                <MediaQuery minWidth={1024} maxWidth={1279}>
                    <div className={col04}>{<Anner data={this.props.data}></Anner>}</div>
                    <div className={col04}>{<Anner data={this.props.data}></Anner>}</div>
                    <div className={col04}>{<Anner data={this.props.data}></Anner>}</div>
                </MediaQuery>
                <MediaQuery minWidth={600} maxWidth={1023}>
                    <div className={col06}>{<Anner data={this.props.data}></Anner>}</div>
                    <div className={col06}>{<Anner data={this.props.data}></Anner>}</div>
                </MediaQuery>
                <MediaQuery maxWidth={599}>
                    <div className={col12}>{<Anner data={this.props.data}></Anner>}</div>
                </MediaQuery>
            </div>
        );
    }

}
