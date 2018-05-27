import React from "react";
import { default as uuid } from "uuid/v4";
import MediaQuery from 'react-responsive';
import css from "./waters.scss";
import { parse } from "@utils";

const { bind, map } = parse(css);

export interface FallProps {
    width?: number | string;
    data?: any;
    datas?: Array<any>;
    template?: React.Component | ((prop?: any) => JSX.Element);
}

export class Fall extends React.Component<FallProps> {

    private columns !: number;

    private createContent(columns: 1 | 2 | 3 | 4) {
        const Anner = this.props.template as any;
        const content = (data: any) => (<Anner data={data}></Anner>);
        const col = bind(columns === 1 ? "col-12" : columns === 2 ? "col-6" : columns === 3 ? "col-4" : "col-3");
        const datas = this.props.datas || [];
        const queue: (any[])[] = [];
        datas.forEach((i, index) => {
            if (!i.key) { i.key = uuid(); }
            const v = index % columns;
            if (!queue[v]) { queue[v] = []; }
            queue[v].push(i);
        });
        return (matches: boolean) => {
            if (!!matches) {
                this.columns = columns;
                console.log("init");
                console.log(columns);
                return (
                    <React.Fragment>
                        <div className={col}>{queue[0].map(i => (generate(col, i.key, content(i))))}</div>
                        {columns >= 2 ? <div className={col}>{queue[1].map(i => (generate(col, i.key, content(i))))}</div> : null}
                        {columns >= 3 ? <div className={col}>{queue[2].map(i => (generate(col, i.key, content(i))))}</div> : null}
                        {columns === 4 ? <div className={col}>{queue[3].map(i => (generate(col, i.key, content(i))))}</div> : null}
                    </React.Fragment>
                );
            }
            return null;
        };
    }

    render() {
        const styles = {
            width: this.props.width || "100%"
        };
        const create = this.createContent.bind(this);
        return (
            <div className={bind("row")} style={styles}>
                <MediaQuery minWidth={1280} >{create(4)}</MediaQuery>
                <MediaQuery minWidth={1024} maxWidth={1279} >{create(3)}</MediaQuery>
                <MediaQuery minWidth={600} maxWidth={1023} >{create(2)}</MediaQuery>
                <MediaQuery maxWidth={599} >{create(1)}</MediaQuery>
            </div>
        );
    }

}

function generate(col_css: string, key: number | string, content: JSX.Element) {
    return <div key={key}>{content}</div>;
}

