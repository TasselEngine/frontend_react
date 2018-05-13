import React from "react";
import { LayoutData, LayoutType } from "../../store/layout";
import { NavigationBase } from "../../utils/navigation.utils";

export class TasselManage extends NavigationBase {

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        console.log("manage page mount");
        LayoutData.left.changeType(LayoutType.Management);
    }

    render() {
        return (
            <div>
                <h2>manage</h2>
            </div>
        );
    }

}
