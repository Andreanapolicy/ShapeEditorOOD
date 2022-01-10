import { IShape } from '../../Model/Shape/IShape';
import { Frame } from '../../common/Frame';

export default class ShapePresenter
{
    private readonly shape: IShape;
    private doOnChangeShapeCallbacks: Array<Function> = [];

    constructor(shape: IShape)
    {
        this.shape = shape;
        shape.doOnChangeFrame(() => this.notifyAllObservers());
        shape.doOnDelete(() => this.notifyAllObservers( {leftTopPoint: {top: 0, left: 0}, width: 0, height: 0}));
    }

    public doOnChangeShape(callback: Function): void
    {
        this.doOnChangeShapeCallbacks.push(callback);
    }

    public changeModelFrame(newFrame: Frame): void
    {
        this.shape.setFrame(newFrame);
    }

    private notifyAllObservers(frame: Frame = this.shape.getFrame()): void
    {
        this.doOnChangeShapeCallbacks.forEach((callback: Function) => callback(frame));
    }
}