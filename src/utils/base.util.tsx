import React from "react";
import { LeftContainer, PageState, ApplicationState, LayoutType, PageBackground, AppTheme } from "@stores/layout";
import { getStore, StoreComponent } from "@utils";

export class TasselComponent<P= {}, S= {}, SS = never> extends StoreComponent<P, S, SS> {

  private _$appState = this.getStore(ApplicationState);

  protected get isLightTheme() { return this._$appState && this._$appState.isLightTheme; }

  constructor(props: any) {
    super(props);
  }

  protected changeTheme(state: AppTheme) {
    this._$appState.changeTheme(state);
  }

}
