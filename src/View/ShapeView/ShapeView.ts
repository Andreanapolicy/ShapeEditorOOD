import { Frame } from '../../common/Frame';
import { ShapeType } from '../../common/ShapeType';
import { IShape } from '../../Model/Shape/IShape';
import ShapePresenter from '../../Presenter/ShapePresenter/ShapePresenter';

export default class ShapeView
{
    private readonly type: ShapeType;
    private readonly shapePresenter: ShapePresenter;
    private readonly shape: IShape;
    private readonly id: string;
    private frame: Frame;
    private doOnChangeShapeCallback: Array<Function> = [];

    constructor(frame: Frame, type: ShapeType, shape: IShape, id: string)
    {
        this.frame = frame;
        this.type = type;
        this.shape = shape;
        this.id = id;
        this.shapePresenter = new ShapePresenter(shape);

        this.shapePresenter.doOnChangeShape((newFrame: Frame) => this.notifyAllObservers(newFrame))
    }

    public getFrame(): Frame
    {
        return this.frame;
    }

    public getType(): ShapeType
    {
        return this.type;
    }

    public getID(): string
    {
        return this.id;
    }

    public setFrame(newFrame: Frame): void
    {
        this.frame = newFrame;
        this.doOnChangeShapeCallback.map((callback: Function) => callback());
    }

    public changeFrame(newFrame: Frame): void
    {
        this.frame = newFrame;
        this.doOnChangeShapeCallback.map((callback: Function) => callback());

        this.shapePresenter.changeModelFrame(newFrame);
    }

    public getShape(): IShape
    {
        return this.shape;
    }

    public doOnChangeShape(callback: Function): void
    {
        this.doOnChangeShapeCallback.push(callback);
    }

    private notifyAllObservers(newFrame: Frame): void
    {
        this.doOnChangeShapeCallback.map((callback: Function) => callback(newFrame));
    }
}