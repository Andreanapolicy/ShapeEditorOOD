import SelectionViewNew from './SelectionViewNew';
import ShapePresenterNew from '../../Presenter/ShapePresenter/ShapePresenterNew';
import { Point } from '../../Сommon/Point';
import DragAndDropUseCaseNew from '../../UseCase/DragAndDropUseCase/DragAndDropUseCaseNew';
import { Scope } from '../Type/Scope';
import { Frame } from '../../Сommon/Frame';

export default class Selection
{
    private readonly selectionView: SelectionViewNew;
    private shapePresenter: ShapePresenterNew | null = null;

    constructor()
    {
        this.selectionView = new SelectionViewNew();
        this.selectionView.doOnMoveShape((delta: Point) => {
            if (this.shapePresenter === null)
            {
                return;
            }

            const newFrame: Frame | null = DragAndDropUseCaseNew.getResultFrame(delta, this.shapePresenter.getShapeModel().getFrame(), Scope);

            if (newFrame === null)
            {
                return;
            }
            this.shapePresenter.setNewFrameToView(newFrame);
        });

        this.selectionView.doOnChangeFrame((delta: Point) => {
            if (this.shapePresenter === null)
            {
                return;
            }
            const newFrame: Frame | null = DragAndDropUseCaseNew.getResultFrame(delta, this.shapePresenter.getShapeModel().getFrame(), Scope);

            if (newFrame === null)
            {
                this.shapePresenter.setNewFrameToModel(this.shapePresenter.getShapeView().getFrame());
                return;
            }

            this.shapePresenter.setNewFrameToModel(newFrame);
        });
    }

    public select(shapePresenter: ShapePresenterNew): void
    {
        if (this.shapePresenter !== null)
        {
            this.unselect();
        }

        this.shapePresenter = shapePresenter;
        this.selectionView.select(shapePresenter.getShapeView());
    }

    public unselect(): void
    {
        if (this.shapePresenter !== null)
        {
            this.selectionView.unselect(this.shapePresenter.getShapeView());
            this.shapePresenter = null;
        }
    }

    public getSelected(): ShapePresenterNew | null
    {
        return this.shapePresenter;
    }
}