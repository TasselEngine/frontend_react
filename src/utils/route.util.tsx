import React from "react";
import { default as uuid } from "uuid/v4";
import { Route, Redirect, Switch } from "react-router-dom";

/**
 * Represent the interface struct of Tassel Router
 * @description
 * @author Big Mogician
 * @export
 * @interface IRouter
 */
export interface IRouter {
    routes: IRouteNode[];
}

/**
 * Represent the interface struct of Tassel Route
 * @description
 * @author Big Mogician
 * @export
 * @interface IRoute
 * @template P props
 * @template S state
 * @template T -
 */
export interface IRoute<P, S, T> {
    key?: string;
    path?: string;
    component?: IConstructor<React.Component<P, S, T>>;
    children?: IRouteNode[];
    exact?: boolean;
    isolate?: boolean;
    redirect?: string;
    otherwise?: IConstructor<React.Component<P, S, T>>;
}

/** Represent the interface struct of Tassel Route */
export type IRouteNode = IRoute<any, any, any>;

/**
 * Create Router Config
 * ---
 *
 * @description
 * @author Big Mogician
 * @export
 * @param {IRouteNode[]} routes routes collection tobe created
 * @returns {IRouter} config
 */
export function createRouterConfig(routes: IRouteNode[]): IRouter {
    return { routes: recRoutes(routes) };
}

/**
 * Route Collection Component
 * ---
 *
 * @description
 * @author Big Mogician
 * @export
 * @class RouteCollection
 * @extends {React.Component<{ config: IRouter }>}
 */
export class RouteCollection extends React.Component<{ config: IRouter }> {
    render() {
        return (
            <Switch>
                {this.props.config.routes.map(i => {
                    if (i.redirect) {
                        return (<Redirect {...this.props} key={i.key} from={i.path} to={i.redirect} exact={i.exact} />);
                    }
                    const component = SectionRoute(i);
                    return (<Route {...this.props} key={i.key} path={i.path} exact={i.exact} component={component} />);
                })}
            </Switch>
        );
    }
}

type ISectionNode = (props: any) => (JSX.Element | null);

/** Save the component struct for reusing. */
const RouteCache = new Map<IRouteNode, ISectionNode>();

/**
 * Create a section route component
 * ---
 *
 * @description
 * @author Big Mogician
 * @param {IRouteNode} config route config
 * @returns  {ISectionNode} component creator
 */
function SectionRoute(config: IRouteNode): ISectionNode {
    const cache = RouteCache.get(config);
    if (cache) return cache;
    const route = config;
    const Comp: any = route.component || route.otherwise;
    const hasChildren = !!route.children;
    const component: ISectionNode = (props: any) => {
        const content = hasChildren ? (
            <React.Fragment>
                <Switch>
                    {buildRoutes(route.children || [], props)}
                    {buildRedirect(route.children || [], props)}
                </Switch>
            </React.Fragment>
        ) : null;
        return !Comp ? content : (<Comp {...props}>{content}</Comp>);
    };
    RouteCache.set(config, component);
    return component;
}

/**
 * Build routes components for children
 * @description
 * @author Big Mogician
 * @param {IRouteNode[]} routes
 * @param {*} props
 * @returns
 */
function buildRoutes(routes: IRouteNode[], props: any) {
    return (routes || [])
        .filter(r => !r.redirect && !r.otherwise)
        .map(i => (<Route {...props} key={i.key} path={i.path} exact={i.exact} component={i.component as any} />));
}

/**
 * Build redirect component if nesessary.
 * @description
 * @author Big Mogician
 * @param {IRouteNode[]} routes
 * @param {*} props
 * @returns
 */
function buildRedirect(routes: IRouteNode[], props: any) {
    return (routes || []).filter(r => !!r.redirect || !!r.otherwise).map(i => {
        if (!!i.otherwise) {
            return <Route {...props} key={i.key} component={i.otherwise} />;
        }
        return <Redirect {...props} key={i.key} from={i.path} to={i.redirect} exact={i.exact} />;
    });
}

/**
 * Parse the route and children
 * ---
 *
 * @description connect the route prefix and create unique key for each route node.
 * @author Big Mogician
 * @param {IRouteNode[]} routes config.routes
 * @param {IRouteNode} [current] cuttent route(if has)
 * @param {IRouteNode} [parent] outer route(if has)
 * @returns  {IRouteNode[]} return the config.routes been parsed
 */
function recRoutes(routes: IRouteNode[], current?: IRouteNode, parent?: IRouteNode): IRouteNode[] {
    if (current) {
        current.exact = (current.exact === undefined && !current.children) ? true : current.exact;
        current.path = connectPath(current, !current.isolate ? parent : undefined);
        current.redirect = connectPath(current, !current.isolate ? parent : undefined, true);
    }
    routes.forEach(route => {
        route.key = uuid();
        recRoutes(route.children || [], route, current);
    });
    return routes;
}

/**
 * connect the route prefix
 * @description
 * @author Big Mogician
 * @param {IRouteNode} [r] current node
 * @param {IRouteNode} [parent] outer node
 * @param {boolean} [isRedirect=false] is redirect component(default is false)
 * @returns {(string | undefined)} final path or redirect path
 */
function connectPath(r?: IRouteNode, parent?: IRouteNode, isRedirect: boolean = false): string | undefined {
    if (isRedirect) {
        return (!parent || !(r && r.redirect)) ?
            (r && r.redirect) :
            ((parent.path || "/") + ((r && r.redirect) || ""));
    } else {
        return (!parent) ?
            (r && r.path) :
            ((parent.path || "/") + ((r && r.path) || ""));
    }
}

