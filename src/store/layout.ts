import { Reactive, Computed, Action } from "../utils/mobx.util";

export enum LayoutType {
    Common = 0,
    Management = 1
}

export interface NavigeItem {
    path: string;
    label: string;
}

const commonGroup: NavigeItem[] = [
    { path: "/", label: "Home" },
    { path: "/error", label: "Error" },
    { path: "/manage", label: "Management" },
];

const manageGroup: NavigeItem[] = [
    { path: "/", label: "Home" },
    { path: "/error", label: "Error" },
];

export class LeftContainer {

    @Reactive()
    private type: LayoutType = LayoutType.Common;

    @Computed()
    public get isCommon() { return this.type === LayoutType.Common; }

    @Computed()
    public get list() { return this.type === LayoutType.Common ? commonGroup : manageGroup; }

    @Action()
    public changeType(type: LayoutType) {
        this.type = type;
    }

}

export const LayoutData = {
    left: new LeftContainer()
};

