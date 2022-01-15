import { ISlide } from '../../Model/Slide/ISlide';
import CanvasView from '../../View/CanvasView/CanvasView';
import { ShapeType } from '../../Model/Type/ShapeType';
import { IShape } from '../../Model/Shape/IShape';
import ShapePresenter from '../ShapePresenter/ShapePresenter';
import ShapeView from '../../View/ShapeView/ShapeView';
import Selection from '../../View/SelectionView/Selection';
import IShapePresenter from '../ShapePresenter/IShapePresenter';
import ICanvasView from '../../View/CanvasView/ICanvasView';
import IShapeView from '../../View/ShapeView/IShapeView';

export default class CanvasPresenter
{
    private readonly model: ISlide;
    private readonly canvasView: ICanvasView;
    private readonly selection: Selection;
    private readonly shapesPresenters: Array<IShapePresenter> = [];

    constructor(model: ISlide)
    {
        this.model = model;
        this.selection = new Selection();
        this.canvasView = new CanvasView();

        this.model.doOnAddShape((shapeModel: IShape) => this.addShape(shapeModel));
        this.canvasView.doOnAddShape((shapeType: ShapeType) => this.model.createShape(shapeType));

        this.canvasView.doOnSelectShape((id: string) => {
            const indexShapePresenter: IShapePresenter | undefined = this.shapesPresenters.find((shapePresenter: IShapePresenter) =>
                shapePresenter.getShapeView().getUUID() === id);

            if (indexShapePresenter === undefined)
            {
                return;
            }

            this.selection.select(indexShapePresenter);
        });

        this.canvasView.doOnDeleteShape(() => {
            const selectedShapePresenter: IShapePresenter | null = this.selection.getSelected();
            if (selectedShapePresenter === null)
            {
                return;
            }

            this.model.removeShapeByUUID(selectedShapePresenter.getShapeModel().getUUID());
        });

        this.canvasView.doOnUnselectShape(() => this.selection.unselect());
    }

    private addShape(shapeModel: IShape): void
    {
        const newShapeView: IShapeView = new ShapeView(shapeModel.getFrame(), shapeModel.getType());
        const newShapePresenter: IShapePresenter = new ShapePresenter(shapeModel, newShapeView);
        this.shapesPresenters.push(newShapePresenter);

        newShapePresenter.doOnChangeShape((shapeView: IShapeView) => this.canvasView.changeShape(shapeView));
        newShapePresenter.doOnDeleteShape((id: string) => this.deleteShape(id));

        this.canvasView.addShape(newShapeView);
    }

    private deleteShape(id: string): void
    {
        this.shapesPresenters.filter((shapesPresenter: IShapePresenter) => shapesPresenter.getShapeView().getUUID() !== id);
        this.canvasView.deleteShape(id);
    }
}