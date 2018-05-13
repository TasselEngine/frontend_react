import React from "react";
import { BrowserRouter, Router, Route, Redirect, Link } from "react-router-dom";
import { Mobx } from "../utils/mobx.util";
import { Main, Layout } from "./root";
import { Management } from "./manage";
import { Error404 } from "./errors";
import { IRouter, SectionRoute, createRouterConfig } from "../utils/route.util";

const router = createRouterConfig([
    { path: "/", component: Main, exact: true },
    { path: "/manage", component: Management },
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
                    {/* <Route exact path='/' component={Main} />
                    <Route path="/manage" component={Management} />
                    <Route path="/errors" >
                        <Route path="/errors/notfound" component={Error404} />
                    </Route> */}
                    {router.routes.map(i => (<SectionRoute key={i.key} config={i} />))}
                </Layout>
            </BrowserRouter>
        );
    }
}
