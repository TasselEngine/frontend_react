import { Reactive, Computed, Action, Store, Observable } from "@utils";

export enum LayoutType {
    Common = 0,
    Management = 1
}

export enum AppTheme {
    Light = 'light',
    Dark = 'dark'
}

export enum PageBackground {
    Transparent = 'transparent',
    Default = 'default'
}

export interface NavigeItem {
    path: string;
    label: string;
}

const commonGroup: NavigeItem[] = [
    { path: "/", label: "Home" },
    { path: "/errors/notfound", label: "404" },
    {
        get path() { return "/" + Number((Math.random() * 1000).toFixed(2)) + "/manage?user=" + Math.random() * 1000; },
        label: "Management"
    },
    { path: "/errors/46thbserhse", label: "OtherError" },
    { path: "/46thbserhse", label: "Otherwise" },
];

const manageGroup: NavigeItem[] = [
    { path: "/", label: "Home" },
    { path: "/errors/notfound", label: "404" },
    { path: "/errors/46thbserhse", label: "OtherError" },
    { path: "/46thbserhse", label: "Otherwise" },
];

@Store()
export class ApplicationState {

    @Observable()
    private theme: AppTheme = AppTheme.Light;

    @Computed()
    public get isLightTheme() { return this.theme === AppTheme.Light; }

    @Action()
    public changeTheme(theme: AppTheme) {
        this.theme = theme;
    }

}

@Store()
export class LeftContainer {

    @Observable()
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

@Store()
export class PageState {

    @Observable()
    private background: PageBackground = PageBackground.Default;

    @Computed()
    public get isTransparent() { return this.background === PageBackground.Transparent; }

    @Action()
    public changeBackground(background: PageBackground) {
        this.background = background;
    }

}

