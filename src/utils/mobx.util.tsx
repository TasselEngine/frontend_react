import { default as uuid } from "uuid/v4";
import { observable, computed, action, trace } from "mobx";
import { observer, Provider, inject, Observer } from "mobx-react";
import React from "react";

/**
 * Store injections container
 * ---
 *
 * @description provide a way to connect store name with store constructor at runtime.
 * @author Big Mogician
 * @class InjectableStoreContainer
 */
class InjectableStoreContainer {

    private relations: Map<IConstructor<any>, string> = new Map<IConstructor<any>, string>();

    /**
     * add a relation
     * @description
     * @author Big Mogician
     * @param {IConstructor<any>} type constructor
     * @param {string} name store name
     * @memberof InjectableStoreContainer
     */
    public add(type: IConstructor<any>, name: string) {
        if (this.relations.get(type)) {
            throw new Error("duplicate store.");
        } else {
            this.relations.set(type, name);
        }
    }

    /**
     * get the store name with constructor
     * @description
     * @author Big Mogician
     * @param {IConstructor<any>} type constructor
     * @returns  {string|null} name
     * @memberof InjectableStoreContainer
     */
    public get(type: IConstructor<any>): string | null {
        return this.relations.get(type) || null;
    }

}

/** all the relations. */
const _relations = new InjectableStoreContainer();

/** the stores for Provider component. */
const _stores: { [key: string]: any } = {};
console.log(_stores);

export type IStoreClass<T> = IConstructor<T>;

/**
 * Get store manually
 * ---
 *
 * @description
 * @author Big Mogician
 * @export
 * @template T
 * @param {IConstructor<T>} type the store constructor
 * @returns  {T|null} instance
 */
export function getStore<T>(type: IConstructor<T>): T | undefined {
    const key = _relations.get(type) as string;
    return !!key ? _stores[key] : undefined;
}

/**
 * Reactive component decorator factory
 * ---
 *define a mobx component, this method connect @inject(...) and @observer(...) from mobx.
 * @description
 * @author Big Mogician
 * @export
 * @param {...IStoreClass<any>[]} stores stores to be injected
 * @returns  decorator
 */
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

export function AlwaysUpdate() {
    return function <T>(target: IConstructor<T>) {
        target.prototype.shouldComponentUpdate = () => true;
    };
}

/**
 * Store decorator factory
 * ---
 *define a mobx store, name is not necessary, an uuid will be used as name if no name provided.
 * @description
 * @author Big Mogician
 * @export
 * @param {string} [name] store name
 * @returns  decorator
 */
export function Store(name?: string) {
    return function <T>(target: IConstructor<T>) {
        const selector = name || `STATE-${target.name}-${uuid()}`;
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

export const ReactiveComponent = Observer;

export const DEBUG = trace;

/**
 * Component with stores
 * ---
 * provide a method to get store with store constructor.
 * @description
 * @author Big Mogician
 * @export
 * @class StoreComponent
 * @extends {React.Component<P, S, SS>}
 * @template P props
 * @template S state
 * @template SS -
 */
export class StoreComponent<P= {}, S= {}, SS = never> extends React.Component<P, S, SS> {

    private _storeMaps!: Map<IConstructor<any>, any>;

    constructor(props: any) {
        super(props);
    }

    /** get store with it's constructor */
    protected getStore<T>(type: IConstructor<T>): T {
        return getStore(type) as T;
    }

}

/**
 * Provider component wrapper.
 */
export class Stores extends React.Component {

    render() {
        return (<Provider {..._stores}>{this.props.children}</Provider>);
    }
}
