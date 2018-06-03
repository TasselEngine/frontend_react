import React from "react";
import * as H from "history";
import { LayoutType, LeftContainer, PageBackground, AppTheme, PageState, ApplicationState } from "@stores/layout";
import { StoreComponent, getStore } from "./mobx.util";
import { TasselComponent } from "@utils/base.util";

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
export class NavigationBase<P = {}, S = {}, SS = never> extends TasselComponent<(P & NavigationProps), S, SS> {

    private _query = {};
    private _leftState: LeftContainer = this.getStore(LeftContainer);
    private _pageState: PageState = this.getStore(PageState);

    protected get queries() { return this._query; }
    protected get params() { return this.props.match.params; }

    constructor(props: any) {
        super(props);
        this._query = cutQueries(this.props.location.search);
        this.changePageType(LayoutType.Common);
        this.changeBackgroundState(PageBackground.Default);
    }

    protected changePageType(state: LayoutType) {
        this._leftState && this._leftState.changeType(state);
    }

    protected changeBackgroundState(state: PageBackground) {
        this._pageState && this._pageState.changeBackground(state);
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
 * @extends {(NavigationBase<P, S, SS>)}
 * @template P props
 * @template S state
 * @template SS -
 */
export class ManagementBase<P = {}, S = {}, SS = never> extends NavigationBase<P, S, SS> {

    constructor(props: any) {
        super(props);
        this.changePageType(LayoutType.Management);
    }

}

export class TransparentPage<P = {}, S = {}, SS = never> extends NavigationBase<P, S, SS> {

    constructor(props: any) {
        super(props);
        this.changeBackgroundState(PageBackground.Transparent);
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
