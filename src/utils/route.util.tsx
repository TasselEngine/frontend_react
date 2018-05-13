import React from "react";
import { default as uuid } from "uuid/v4";
import { Route, Redirect, Switch } from "react-router-dom";

export interface IConstroctor<T> {
    new(...args: any[]): T;
}

export interface IRouter {
    routes: IRouteNode[];
}

export interface IRoute<P, S, T> {
    key?: string;
    path?: string;
    component?: IConstroctor<React.Component<P, S, T>>;
    children?: IRouteNode[];
    exact?: boolean;
    isolate?: boolean;
    redirect?: string;
    otherwise?: IConstroctor<React.Component<P, S, T>>;
}

export type IRouteNode = IRoute<any, any, any>;

export function createRouterConfig(routes: IRouteNode[]) {
    return { routes: recRoutes(routes) };
}

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

const RouteCache = new Map<IRouteNode, ISectionNode>();

function SectionRoute(config: IRouteNode) {
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
}

function buildRoutes(routes: IRouteNode[], props: any) {
    return (routes || [])
        .filter(r => !r.redirect && !r.otherwise)
        .map(i => (<Route {...props} key={i.key} path={i.path} exact={i.exact} component={i.component as any} />));
}

function buildRedirect(routes: IRouteNode[], props: any) {
    return (routes || []).filter(r => !!r.redirect || !!r.otherwise).map(i => {
        if (!!i.otherwise) {
            return <Route {...props} key={i.key} component={i.otherwise} />;
        }
        return <Redirect {...props} key={i.key} from={i.path} to={i.redirect} exact={i.exact} />;
    });
}

function recRoutes(routes: IRouteNode[], current?: IRouteNode, parent?: IRouteNode) {
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

function connectPath(r?: IRouteNode, parent?: IRouteNode, isRedirect = false): string | undefined {
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

