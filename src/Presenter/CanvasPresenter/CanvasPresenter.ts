import { ISlide } from '../../Model/Slide/ISlide';
import CanvasView from '../../View/CanvasView/CanvasView';
import { ShapeType } from '../../Model/Type/ShapeType';
import { IShape } from '../../Model/Shape/IShape';
import ShapePresenter from '../ShapePresenter/ShapePresenter';
import ShapeView from '../../View/ShapeView/ShapeView';
import Selection from '../../View/SelectionView/Selection';

export default class CanvasPresenter
{
    private readonly model: ISlide;
    private readonly canvasView: CanvasView;
    private readonly selection: Selection;
    private readonly shapesPresenters: Array<ShapePresenter> = [];

    constructor(model: ISlide)
    {
        this.model = model;
        this.selection = new Selection();
        this.canvasView = new CanvasView();

        this.model.doOnAddShape((shapeModel: IShape) => this.addShape(shapeModel));
        this.canvasView.doOnAddShape((shapeType: ShapeType) => this.model.createShape(shapeType));

        this.canvasView.doOnSelectShape((id: string) => {
            const indexShapePresenter: ShapePresenter | undefined = this.shapesPresenters.find((shapePresenter: ShapePresenter) =>
                shapePresenter.getShapeView().getUUID() === id);

            if (indexShapePresenter === undefined)
            {
                return;
            }

            this.selection.select(indexShapePresenter);
        });

        this.canvasView.doOnDeleteShape(() => {
            const selectedShapePresenter: ShapePresenter | null = this.selection.getSelected();
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
        const newShapeView: ShapeView = new ShapeView(shapeModel.getFrame(), shapeModel.getType());
        const newShapePresenter: ShapePresenter = new ShapePresenter(shapeModel, newShapeView);
        this.shapesPresenters.push(newShapePresenter);

        newShapePresenter.doOnChangeShape((shapeView: ShapeView) => this.canvasView.changeShape(shapeView));
        newShapePresenter.doOnDeleteShape((id: string) => this.deleteShape(id));

        this.canvasView.addShape(newShapeView);
    }

    private deleteShape(id: string): void
    {
        this.shapesPresenters.filter((shapesPresenter: ShapePresenter) => shapesPresenter.getShapeView().getUUID() !== id);
        this.canvasView.deleteShape(id);
    }
}