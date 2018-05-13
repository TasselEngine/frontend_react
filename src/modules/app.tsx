import React from "react";
import { BrowserRouter, Router, Route, Redirect, Link } from "react-router-dom";
import { Mobx } from "../utils/mobx.util";
import { Main, Layout } from "./root";
import { Management } from "./manage";
import { Error404 } from "./errors";
import { createRouterConfig, RouteCollection } from "../utils/route.util";

const router = createRouterConfig([
    { path: "/", component: Main, exact: true },
    { path: "/:uid/manage", component: Management },
    {
        path: "/errors", children: [
            { path: "/notfound", component: Error404 },
            { path: "/baderror", component: Error404, isolate: true },
        ]
    },
]);

console.log(router);

export class App extends React.Component {

    render() {
        return (
            <BrowserRouter >
                <Layout>
                    <RouteCollection config={router} />
                </Layout>
            </BrowserRouter>
        );
    }
}
