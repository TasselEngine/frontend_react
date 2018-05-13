import React from "react";
import { MLabel } from "../../commons/labels/m-label";
import { LayoutType, LayoutData } from "../../../store/layout";
import { Mobx } from "../../../utils/mobx.util";

export class TasselMain extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
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
