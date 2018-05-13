import React from "react";
import { default as uuid } from "uuid/v4";
import { Route } from "react-router-dom";

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
}

export type IRouteNode = IRoute<any, any, any>;

export function createRouterConfig(routes: IRouteNode[]) {
    return { routes: recRoutes(routes) };
}

class SubRouteContainer extends React.Component<{ routes: IRouteNode[] }> {
    render() {
        return (
            <React.Fragment>
                {this.props.routes.map(i => (
                    <Route {...this.props} key={i.key} path={i.path} exact={i.exact} component={i.component as any} />
                ))}
            </React.Fragment>
        );
    }
}

class SectionRoute extends React.Component<{ config: IRouteNode }> {
    render() {
        const route = this.props.config;
        const Comp: any = route.component;
        return (
            !Comp ?
                <SubRouteContainer {...this.props} routes={route.children || []} />
                :
                <Route {...this.props} path={route.path} exact={route.exact} render={props => (
                    <Comp {...props} routes={route.children} />
                )} />
        );
    }
}

export class RouteCollection extends React.Component<{ config: IRouter }> {
    render() {
        return this.props.config.routes.map(i => (<SectionRoute key={i.key} config={i} />));
    }
}

function recRoutes(routes: IRouteNode[], current?: IRouteNode, parent?: IRouteNode) {
    if (current && !current.isolate) {
        current.path = connectPath(current, parent);
    }
    routes.forEach(route => {
        route.key = uuid();
        recRoutes(route.children || [], route, current);
    });
    return routes;
}

function resolvePath(parentPath: string, currentNode: IRouteNode) {

}

function connectPath(r?: IRouteNode, parent?: IRouteNode): string | undefined {
    return (!parent || !r) ?
        (r && r.path) :
        ((parent.path || "/") +
            ((r.path || "").startsWith("/") ?
                r.path :
                ("/" + r.path)
            )
        );
}

