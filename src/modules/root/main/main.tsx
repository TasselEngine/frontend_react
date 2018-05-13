import React from "react";
import { MLabel } from "../../commons/labels/m-label";
import { LayoutType, LayoutData } from "../../../store/layout";
import { Mobx } from "../../../utils/mobx.util";
import { NavigationBase } from "../../../utils/navigation.utils";

export class TasselMain extends NavigationBase {

    constructor(props: any) {
        super(props);
        console.log(this.params);
        console.log(this.queries);
    }

    componentWillMount() {
        console.log("main page mount");
        LayoutData.left.changeType(LayoutType.Common);
    }

    render() {
        return (
            <div>
                <MLabel value={"123456"} color="red"></MLabel>
            </div>
        );
    }

}
