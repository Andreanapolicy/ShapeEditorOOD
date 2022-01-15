import { ISlide } from '../../Model/Slide/ISlide';
import CanvasViewNew from '../../View/CanvasView/CanvasViewNew';
import { ShapeType } from '../../Model/Type/ShapeType';
import { IShape } from '../../Model/Shape/IShape';
import ShapePresenterNew from '../ShapePresenter/ShapePresenterNew';
import ShapeViewNew from '../../View/ShapeView/ShapeViewNew';
import Selection from '../../View/SelectionView/Selection';

export default class CanvasPresenterNew
{
    private readonly model: ISlide;
    private readonly canvasView: CanvasViewNew;
    private readonly selection: Selection;
    private readonly shapesPresenters: Array<ShapePresenterNew> = [];

    constructor(model: ISlide)
    {
        this.model = model;
        this.selection = new Selection();
        this.canvasView = new CanvasViewNew();

        this.model.doOnAddShape((shapeModel: IShape) => this.addShape(shapeModel));
        this.canvasView.doOnAddShape((shapeType: ShapeType) => this.model.createShape(shapeType));

        this.canvasView.doOnSelectShape((index: number) => {
            const indexShapePresenter: ShapePresenterNew = this.shapesPresenters[index];
            this.selection.select(indexShapePresenter);
        });

        this.canvasView.doOnDeleteShape(() => {
            const selectedShapePresenter: ShapePresenterNew | null = this.selection.getSelected();
            if (selectedShapePresenter === null)
            {
                return;
            }

            this.model.removeShapeByIndex(selectedShapePresenter.getShapeView().getId());
        });

        this.canvasView.doOnUnselectShape(() => this.selection.unselect());
    }

    private addShape(shapeModel: IShape): void
    {
        const newShapeView: ShapeViewNew = new ShapeViewNew(this.shapesPresenters.length, shapeModel.getFrame(), shapeModel.getType());
        const newShapePresenter: ShapePresenterNew = new ShapePresenterNew(shapeModel, newShapeView);
        this.shapesPresenters.push(newShapePresenter);

        newShapePresenter.doOnChangeShape((shapeView: ShapeViewNew) => this.canvasView.changeShape(shapeView));
        newShapePresenter.doOnDeleteShape((index: number) => this.deleteShape(index));

        this.canvasView.addShape(newShapeView);
    }

    private deleteShape(index: number): void
    {
        this.shapesPresenters.splice(index, 1);
        this.canvasView.deleteShape(index);
    }
}