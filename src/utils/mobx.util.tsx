import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

export function Mobx() {
    return observer;
}

export function Reactive() {
    return observable;
}

export function Computed() {
    return computed;
}

export function Action() {
    return action;
}
