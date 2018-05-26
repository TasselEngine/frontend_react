
declare module "*.css" {
    const content: any;
    export default content;
}

declare module "*.scss" {
    const content: any;
    export default content;
}

/**
 * Represent the constructor of a class.
 * @description
 * @author Big Mogician
 * @export
 * @interface IConstructor
 * @template T
 */
declare interface IConstructor<T> {
    new(...args: any[]): T;
}

