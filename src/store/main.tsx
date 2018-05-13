import { observable, computed } from "mobx";

class Todo {

    public id = Math.random();

    @observable
    public value = 0;

    @observable
    public finished = false;

    @computed
    public get computedValue() { return this.value * 1000; }

}

export const todo = new Todo();

