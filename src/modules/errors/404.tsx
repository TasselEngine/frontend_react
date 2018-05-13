import React from "react";
import { LayoutData, LayoutType } from "../../store/layout";
import { Mobx } from "../../utils/mobx.util";
import { NavigationBase } from "../../utils/navigation.utils";

export class Page404 extends NavigationBase {

    constructor(props: {}) {
        super(props);
    }

    componentWillMount() {
        console.log("404 page mount");
        LayoutData.left.changeType(LayoutType.Common);
    }

    render() {
        return (
            <div>
                <h2>404</h2>
            </div>
        );
    }

}
