
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

    public map(coll: { [key: string]: boolean }) {
        const scope = new CssSelection(this);
        Object.keys(coll || {}).forEach(key => scope.select(key, coll[key]));
        return scope.toString();
    }

    public select(name: string, enabled: boolean) {
        const scope = new CssSelection(this);
        return scope.select(name, enabled);
    }

    public bind<T extends Function>(target: T): T {
        return target.bind(this);
    }

}

export class CssSelection {

    private _container: { [key: string]: boolean } = {};

    constructor(private context: CssResolver) { }

    public select(name: string, enabled: boolean) {
        const v = this.context.name(name);
        if (!v) throw new CssResolveError(`css className [${name}] is not found.`);
        this._container[this.context.name(name)] = enabled;
        return this;
    }

    public toString() {
        return Object.keys(this._container).filter(i => !!this._container[i]).join(" ");
    }

}

