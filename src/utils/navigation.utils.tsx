import React from "react";
import * as H from "history";
import { LayoutType, LeftContainer } from "@stores/layout";
import { StoreComponent, getStore } from "@utils/mobx.util";

/**
 * Navigation Properties Struct
 * -----
 *
 * @description The interface of navigation props
 * @author Big Mogician
 * @export
 * @interface NavigationProps
 */
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

/**
 * Navigateable basement component
 * ---
 *
 * @description
 * @author Big Mogician
 * @export
 * @class NavigationBase
 * @extends {(React.Component<(P & NavigationProps), S, SS>)}
 * @template P props
 * @template S state
 * @template SS -
 */
export class NavigationBase<P = {}, S = {}, SS = never> extends React.Component<(P & NavigationProps), S, SS> {

    protected get params() { return this.props.match.params; }

    private _query = {};
    protected get queries() { return this._query; }

    constructor(props: any, protected type: LayoutType = LayoutType.Common) {
        super(props);
        this._query = cutQueries(this.props.location.search);
        const left = getStore(LeftContainer);
        if (left) {
            left.changeType(type);
        }
    }

}

/**
 * Management navigatable basement
 * ---
 * For manage module components.
 * @description For manage module components.
 * @author Big Mogician
 * @export
 * @class ManagementBase
 * @extends {(NavigationBase<(P & NavigationProps), S, SS>)}
 * @template P props
 * @template S state
 * @template SS -
 */
export class ManagementBase<P = {}, S = {}, SS = never> extends NavigationBase<(P & NavigationProps), S, SS> {

    constructor(props: any, protected type: LayoutType = LayoutType.Management) {
        super(props, type);
    }

}

/**
 * Cur the query string into object.
 * @description
 * @author Big Mogician
 * @param {string} search query string
 * @returns  {any} queries object
 */
function cutQueries(search: string): any {
    const query: any = {};
    if (!search) return query;
    (search || "").substring(1).split("&").forEach(q => {
        const [k, v] = q.split("=");
        query[k] = v;
    });
    return query;
}
