import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Main, Layout } from "./root";
import { Management } from "./manage";
import { Error404 } from "./errors";
import { createRouterConfig, RouteCollection } from "../utils/route.util";
import { Stores } from "../utils/mobx.util";

const router = createRouterConfig([
    { path: "/", component: Main },
    { path: "/:uid/manage", component: Management },
    {
        path: "/errors", children: [
            { path: "/notfound", component: Error404 },
            { path: "/baderror", component: Error404, isolate: true },
            { otherwise: Error404 },
        ]
    },
    { otherwise: Error404 },
]);

export class App extends React.Component {

    render() {
        return (
            <BrowserRouter >
                <Stores>
                    <Layout>
                        <RouteCollection config={router} />
                    </Layout>
                </Stores>
            </BrowserRouter>
        );
    }
}
