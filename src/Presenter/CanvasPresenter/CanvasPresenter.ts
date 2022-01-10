import { ISlide } from '../../Model/Slide/ISlide';
import { ShapeType } from '../../Model/Type/ShapeType';
import { IShape } from '../../Model/Shape/IShape';
import ShapeView from '../../View/ShapeView/ShapeView';

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

    public deleteShape(shape: ShapeView): void
    {
        this.model.removeShape(shape.getShape());
    }

    public doOnChangeModel(callback: Function): void
    {
        this.doOnChangeModelCallbacks.push(callback);
    }

    private notifyAllObservers(): void
    {
        this.doOnChangeModelCallbacks.forEach((callback: Function) => callback());
    }
}