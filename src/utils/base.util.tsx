import React from "react";
import { LeftContainer, PageState, ApplicationState, LayoutType, PageBackground, AppTheme } from "@stores/layout";
import { getStore, StoreComponent } from "@utils";

export class TasselComponent<P= {}, S= {}, SS = never> extends StoreComponent<P, S, SS> {

  private _appState: ApplicationState = this.getStore(ApplicationState);

  protected get isLightTheme() { return this._appState && this._appState.isLightTheme; }

  constructor(props: any) {
    super(props);
  }

  protected changeTheme(state: AppTheme) {
    const app = this._appState || (this._appState = this.getStore(ApplicationState) as ApplicationState);
    if (app) {
      app.changeTheme(state);
    }
  }

}
