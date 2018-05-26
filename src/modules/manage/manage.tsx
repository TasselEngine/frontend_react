import React from "react";
import { ManagementBase } from "@utils/navigation.utils";

export class TasselManage extends ManagementBase {

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        console.log("manage page mount");
    }

    render() {
        return (
            <div>
                <h2>manage</h2>
            </div>
        );
    }

}
