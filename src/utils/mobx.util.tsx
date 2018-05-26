import { default as uuid } from "uuid/v4";
import { observable, computed, action } from "mobx";
import { observer, Provider, inject } from "mobx-react";
import React from "react";

class InjectableStoreContainer {

    private relations: Map<IConstructor<any>, string> = new Map<IConstructor<any>, string>();

    public add(type: IConstructor<any>, name: string) {
        if (this.relations.get(type)) {
            throw new Error("duplicate store.");
        } else {
            this.relations.set(type, name);
        }
    }

    public get(type: IConstructor<any>) {
        return this.relations.get(type);
    }

}

const _relations = new InjectableStoreContainer();

const _stores: { [key: string]: any } = {};

export type IStoreClass<T> = IConstructor<T>;

interface Readonly<T> {
    [prop: string]: any;
}

export function getStore<T>(type: IConstructor<T>) {
    const key = _relations.get(type) as string;
    return _stores[key];
}

export function Reactive(...stores: IStoreClass<any>[]) {
    return function <T>(target: IConstructor<T>) {
        const map = target.prototype._storeMaps = new Map();
        return inject(...(stores.map(i => {
            const key = _relations.get(i) as string;
            map.set(i, _stores[key]);
            return key;
        })))(observer(target as any));
    };
}

export function Store(name?: string) {
    return function <T>(target: IConstructor<T>, propertykey?: string, descpt?: any) {
        const selector = name || uuid();
        _relations.add(target, selector);
        _stores[selector] = new target();
        return target as IStoreClass<T>;
    };
}

export function Observable() {
    return observable;
}

export function Computed() {
    return computed;
}

export function Action() {
    return action;
}

export class StoreComponent<P= {}, S= {}, SS = never> extends React.Component<P, S, SS> {

    private _storeMaps!: Map<IConstructor<any>, any>;
    protected getStore<T>(type: IConstructor<T>): T { return this._storeMaps.get(type); }

    constructor(props: any) {
        super(props);
    }

}

export class Stores extends React.Component {

    public static add(type: IConstructor<any>) { }

    render() {
        return (<Provider {..._stores}>{this.props.children}</Provider>);
    }
}
