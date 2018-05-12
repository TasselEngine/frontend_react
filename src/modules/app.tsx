import React from "react";
import { BrowserRouter, Router, Route, Redirect, Link } from "react-router-dom";
import { TasselMain } from "./main/main";
import { TasselLayout } from "./main/layout";
import { Page404 } from "./errors/404";
import { TasselManage } from "./manage/manage";
import { Mobx } from "../utils/mobx.util";

export class App extends React.Component<{}, {}> {

    render() {
        console.log("app refresh");
        return (
            <BrowserRouter >
                <TasselLayout>
                    <Route exact path='/' component={TasselMain} />
                    <Route path="/manage" component={TasselManage} />
                    <Route path="/error" component={Page404} />
                </TasselLayout>
            </BrowserRouter>
        );
    }
}
