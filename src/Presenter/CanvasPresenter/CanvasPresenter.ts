import { ISlide } from '../../Model/Slide/ISlide';
import { ShapeType } from '../../common/ShapeType';
import { IShape } from '../../Model/Shape/IShape';

export default class CanvasPresenter
{
    private readonly model: ISlide;
    private doOnChangeModelCallbacks: Array<Function> = [];

    constructor(model: ISlide)
    {
        this.model = model;
        model.doOnAddShape(() => this.notifyAllObservers());
    }

    public addShape(type: ShapeType): IShape
    {
        return this.model.createShape(type);
    }

    public doOnChangeModel(callback: Function): void
    {
        this.doOnChangeModelCallbacks.push(callback);
    }

    private notifyAllObservers(): void
    {
        this.doOnChangeModelCallbacks.map((callback: Function) => callback());
    }
}