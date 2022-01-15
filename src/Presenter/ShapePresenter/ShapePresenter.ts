import { IShape } from '../../Model/Shape/IShape';
import ShapeView from '../../View/ShapeView/ShapeView';
import { Frame } from '../../Сommon/Frame';

export default class ShapePresenter
{
    private readonly shapeModel: IShape;
    private readonly shapeView: ShapeView;
    private doOnDeleteShapeCallback: Array<Function> = [];
    private doOnChangeShapeCallback: Array<Function> = [];

    constructor(shape: IShape, shapeView: ShapeView)
    {
        this.shapeModel = shape;
        this.shapeView = shapeView;

        shape.doOnChangeFrame(() =>
        {
            this.shapeView.setFrame(this.shapeModel.getFrame());
            this.doOnChangeShapeCallback.forEach((callback: Function) => callback(this.shapeView))
        });

        shape.doOnDelete(() => this.doOnDeleteShapeCallback.forEach((callback: Function) => callback(this.shapeView.getUUID())));
    }

    public getShapeModel(): IShape
    {
        return this.shapeModel;
    }

    public getShapeView(): ShapeView
    {
        return this.shapeView;
    }

    public setNewFrameToModel(frame: Frame): void
    {
        this.shapeModel.setFrame(frame);
    }

    public setNewFrameToView(frame: Frame): void
    {
        this.shapeView.setFrame(frame);
        this.doOnChangeShapeCallback.forEach((callback: Function) => callback(this.shapeView))
    }

    public doOnDeleteShape(callback: Function): void
    {
        this.doOnDeleteShapeCallback.push(callback);
    }

    public doOnChangeShape(callback: Function): void
    {
        this.doOnChangeShapeCallback.push(callback);
    }
}