
export class CssResolveError extends Error {
    constructor(error: string) {
        super();
        this.name = "CssResolveError";
        this.message = error;
    }
}

export function parse(css: { [key: string]: string }) {
    const newC = new CssResolver(css || {});
    return {
        bind: newC.bind(newC.name),
        select: newC.bind(newC.select),
        map: newC.bind(newC.map)
    };
}

export class CssResolver {

    constructor(private css: { [key: string]: string }) { }

    public name(...names: string[]) {
        return names.map(i => this.css[i] || "").join(" ");
    }

    public map(): string;
    public map(coll: { [key: string]: boolean }): string;
    public map(series: Array<({ [key: string]: boolean } | string)>): string;
    public map(...args: any[]) {
        console.log(args);
        if (args.length === 0) { return ""; }
        const scope = new CssSelection(this);
        if (Object.prototype.toString.call(args[0]) === "[object Array]") {
            args[0].forEach((i: any) => this.mapTransform(i, scope));
            return scope.toString();
        }
        const coll = args[0];
        Object.keys(coll || {}).forEach(key => scope.select(key, coll[key]));
        return scope.toString();
    }

    public select(): CssSelection;
    public select(name: string): CssSelection;
    public select(name: string, enabled: boolean): CssSelection;
    public select(name?: string, enabled = true) {
        const scope = new CssSelection(this);
        return !name ? scope.select() : scope.select(name, enabled);
    }

    public bind<T extends Function>(target: T): T {
        return target.bind(this);
    }

    private mapTransform(coll: string | { [key: string]: boolean }, scope: CssSelection) {
        let needTransform = true;
        if (typeof (coll) === "string") needTransform = false;
        if (needTransform) {
            selectNames(coll, scope);
        } else {
            ignoreSelectNames(coll as string, scope);
        }
    }

}

export class CssSelection {

    private _container: { [key: string]: boolean } = {};

    constructor(private context: CssResolver) { }

    public select(): CssSelection;
    public select(name: string): CssSelection;
    public select(name: string, enabled: boolean): CssSelection;
    public select(name?: string, enabled: boolean = true): CssSelection {
        if (!name) return this;
        const v = this.context.name(name);
        if (!v) throw new CssResolveError(`css className [${name}] is not found.`);
        this._container[this.context.name(name)] = enabled;
        return this;
    }

    public outside(name: string, enabled = true) {
        this._container[name] = enabled;
        return this;
    }

    public toString() {
        return Object.keys(this._container).filter(i => !!this._container[i]).join(" ");
    }

}

function ignoreSelectNames(str: string, scope: CssSelection) {
    scope.outside(str, true);
    return scope;
}

function selectNames(coll: any, scope: CssSelection) {
    Object.keys(coll || {}).forEach(key => scope.select(key, coll[key]));
    return scope;
}

