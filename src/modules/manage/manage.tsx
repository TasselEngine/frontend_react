import React from "react";
import { LayoutData, LayoutType } from "../../store/layout";
import { Mobx } from "../../utils/mobx.util";

export class TasselManage extends React.Component<{}, {}> {

    constructor(props: {}) {
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
