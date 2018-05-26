import React from "react";
import { NavigationBase } from "@utils";
import { MLabel } from "@modules/commons/labels/m-label";
import { Waterfall } from "@modules/commons/waters";

interface IModel {
    content: string;
}

const template = (props: { data: IModel }) => (
    <div>{props.data.content}</div>
);

export class TasselMain extends NavigationBase {

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        console.log("main page mount");
    }

    render() {
        const data = { content: "123456" };
        return (
            <div>
                <MLabel value={"123456"} color="red"></MLabel>
                <Waterfall data={data} template={template} />
            </div>
        );
    }

}
