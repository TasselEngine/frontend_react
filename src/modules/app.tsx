import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Main, Layout } from "@modules/root";
import { Management } from "@modules/manage";
import { Error404 } from "@modules/errors";
import { Stores, createRouterConfig, RouteCollection } from "@utils";

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
