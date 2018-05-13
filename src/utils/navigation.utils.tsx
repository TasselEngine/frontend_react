import React from "react";
import * as H from "history";
import { LayoutType, LayoutData } from "../store/layout";

export interface NavigationProps {
    history: H.History;
    match: {
        isExact: boolean;
        params: any;
        path: string;
        url: string;
    };
    location: {
        hash: string;
        key: string;
        pathname: string;
        search: string;
        state?: string;
    };
    routes?: any;
    staticContext?: any;
}

export class NavigationBase<P = {}, S = {}, SS = never> extends React.Component<(P & NavigationProps), S, SS> {

    protected get params() { return this.props.match.params; }

    private _query = {};
    protected get queries() { return this._query; }

    constructor(props: any, protected type: LayoutType = LayoutType.Common) {
        super(props);
        this._query = cutQueries(this.props.location.search);
        LayoutData.left.changeType(type);
    }

}

export class ManagementBase<P = {}, S = {}, SS = never> extends NavigationBase<(P & NavigationProps), S, SS> {

    constructor(props: any, protected type: LayoutType = LayoutType.Management) {
        super(props, type);
    }

}

function cutQueries(search: string) {
    const query: any = {};
    if (!search) return query;
    (search || "").substring(1).split("&").forEach(q => {
        const [k, v] = q.split("=");
        query[k] = v;
    });
    return query;
}
