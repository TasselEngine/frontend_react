import React from "react";

import css from "./card.scss";
import { parse } from "@utils";

const { bind, map } = parse(css);

export interface CommonCardProps {
    padding?: string;
    margin?: string;
    background?: string;
    minHeight?: string;
}

export class CommonCard extends React.PureComponent<CommonCardProps> {

    render() {
        const {
            padding,
            background,
            margin,
            minHeight,
        } = this.props;
        const children: Array<JSX.Element> = this.parseChildren(this.props.children);
        console.log(children);
        return (
            <div style={({ padding, background, margin, minHeight, })} className={bind("card")}>
                <>{children.find(i => i.key === "header")}</>
                <>{children.find(i => i.key === "content")}</>
            </div>
        );
    }

    private parseChildren(children: React.ReactNode): JSX.Element[] {
        return ((Object.prototype.toString.call(children) !== "[onject Array]" ? [children] : children) || []) as any;
    }

}
