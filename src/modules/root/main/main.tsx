import React from "react";
import { MLabel } from "@modules/commons/labels/m-label";
import { NavigationBase } from "@utils/navigation.utils";

export class TasselMain extends NavigationBase {

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        console.log("main page mount");
    }

    render() {
        return (
            <div>
                <MLabel value={"123456"} color="red"></MLabel>
            </div>
        );
    }

}
