import { IShape } from '../../Model/Shape/IShape';
import ShapeViewNew from '../../View/ShapeView/ShapeViewNew';
import { Frame } from '../../Сommon/Frame';

export default class ShapePresenterNew
{
    private readonly shapeModel: IShape;
    private readonly shapeView: ShapeViewNew;
    private doOnDeleteShapeCallback: Array<Function> = [];
    private doOnChangeShapeCallback: Array<Function> = [];

    constructor(shape: IShape, shapeView: ShapeViewNew)
    {
        this.shapeModel = shape;
        this.shapeView = shapeView;

        shape.doOnChangeFrame(() =>
        {
            this.shapeView.setFrame(this.shapeModel.getFrame());
            this.doOnChangeShapeCallback.forEach((callback: Function) => callback(this.shapeView))
        });

        shape.doOnDelete(() => this.doOnDeleteShapeCallback.forEach((callback: Function) => callback(this.shapeView.getId())));
    }

    public getShapeModel(): IShape
    {
        return this.shapeModel;
    }

    public getShapeView(): ShapeViewNew
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