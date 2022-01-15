import SelectionView from './SelectionView';
import ShapePresenter from '../../Presenter/ShapePresenter/ShapePresenter';
import { Point } from '../../Сommon/Point';
import DragAndDropUseCase from '../../UseCase/DragAndDropUseCase/DragAndDropUseCase';
import { Scope } from '../Type/Scope';
import { Frame } from '../../Сommon/Frame';
import ResizeUseCase from '../../UseCase/ResizeUseCase/ResizeUseCase';
import { Corners } from '../Type/CornersIDs';

export default class Selection
{
    private readonly selectionView: SelectionView;
    private shapePresenter: ShapePresenter | null = null;

    constructor()
    {
        this.selectionView = new SelectionView();
        this.selectionView.doOnMoveShape((delta: Point) => {
            if (this.shapePresenter === null)
            {
                return;
            }

            const newFrame: Frame | null = DragAndDropUseCase.getResultFrame(delta, this.shapePresenter.getShapeModel().getFrame(), Scope);

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
            const newFrame: Frame | null = DragAndDropUseCase.getResultFrame(delta, this.shapePresenter.getShapeModel().getFrame(), Scope);

            if (newFrame === null)
            {
                this.shapePresenter.setNewFrameToModel(this.shapePresenter.getShapeView().getFrame());
                return;
            }

            this.shapePresenter.setNewFrameToModel(newFrame);
        });

        this.selectionView.doOnResizeWhileMovingShape((delta: Point, cornerType: Corners) => {
            if (this.shapePresenter === null)
            {
                return;
            }
            const newFrame: Frame | null = ResizeUseCase.getResultFrame(delta, this.shapePresenter.getShapeModel().getFrame(), cornerType);

            if (newFrame === null)
            {
                return;
            }
            this.shapePresenter.setNewFrameToView(newFrame);
        });

        this.selectionView.doOnResizeWhileMouseUpShape((delta: Point, cornerType: Corners) => {
            if (this.shapePresenter === null)
            {
                return;
            }
            const newFrame: Frame | null = ResizeUseCase.getResultFrame(delta, this.shapePresenter.getShapeModel().getFrame(), cornerType);

            if (newFrame === null)
            {
                this.shapePresenter.setNewFrameToModel(this.shapePresenter.getShapeView().getFrame());
                return;
            }

            this.shapePresenter.setNewFrameToModel(newFrame);
        });
    }

    public select(shapePresenter: ShapePresenter): void
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

    public getSelected(): ShapePresenter | null
    {
        return this.shapePresenter;
    }
}