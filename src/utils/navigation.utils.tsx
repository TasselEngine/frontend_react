import React from "react";
import * as H from "history";
import { LayoutType, LeftContainer, PageBackground, AppTheme, PageState, ApplicationState } from "@stores/layout";
import { StoreComponent, getStore } from "./mobx.util";

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

    private _query = {};
    private _leftState?: LeftContainer;
    private _pageState?: PageState;
    private _appState?: ApplicationState;

    protected get queries() { return this._query; }
    protected get params() { return this.props.match.params; }

    protected get isLightTheme() { return this._appState && this._appState.isLightTheme; }
    protected get isPageTransparent() { return this._pageState && this._pageState.isTransparent; }

    constructor(props: any) {
        super(props);
        this._query = cutQueries(this.props.location.search);
        this.changePageType(LayoutType.Common);
        this.changeBackgroundState(PageBackground.Default);
    }

    protected changePageType(state: LayoutType) {
        const left = this._leftState || (this._leftState = getStore(LeftContainer) as LeftContainer);
        if (left) {
            left.changeType(state);
        }
    }

    protected changeBackgroundState(state: PageBackground) {
        const page = this._pageState || (this._pageState = getStore(PageState) as PageState);
        if (page) {
            page.changeBackground(state);
        }
    }

    protected changeTheme(state: AppTheme) {
        const app = this._appState || (this._appState = getStore(ApplicationState) as ApplicationState);
        if (app) {
            app.changeTheme(state);
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

    constructor(props: any) {
        super(props);
        this.changePageType(LayoutType.Management);
    }

}

export class TransparentPage<P = {}, S = {}, SS = never> extends NavigationBase<(P & NavigationProps), S, SS> {

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
