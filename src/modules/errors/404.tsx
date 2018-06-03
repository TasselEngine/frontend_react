import React from "react";
import { NavigationBase, Reactive } from "@utils";

export class Page404 extends NavigationBase {

    constructor(props: {}) {
        super(props);
    }

    componentWillMount() {
        console.log("404 page mount");
    }

    render() {
        return (
            <div>
                <h2>404</h2>
            </div>
        );
    }

}
