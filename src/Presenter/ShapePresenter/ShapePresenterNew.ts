import { IShape } from '../../Model/Shape/IShape';
import ShapeViewNew from '../../View/ShapeView/ShapeViewNew';

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

    public doOnDeleteShape(callback: Function): void
    {
        this.doOnDeleteShapeCallback.push(callback);
    }

    public doOnChangeShape(callback: Function): void
    {
        this.doOnChangeShapeCallback.push(callback);
    }
}