import { Point } from '../../../Сommon/Point';
import { Corners } from '../../Type/CornersIDs';
import DragAndDropUseCaseView from '../DragAndDropUseCase/DragAndDropUseCaseView';

export default class ResizeUseCaseView
{
    private readonly dragAndDropUseCase: DragAndDropUseCaseView;
    private cornerType: Corners = Corners.topLeft;
    private doOnChangeSizeCallbacks: Array<Function> = [];
    private doOnResizeCallbacks: Array<Function> = [];

    constructor()
    {
        this.dragAndDropUseCase = new DragAndDropUseCaseView();

        this.dragAndDropUseCase.doOnMove((delta: Point) => this.callbackOnMoveCorner(delta));
        this.dragAndDropUseCase.doOnMouseUp((delta: Point) => this.callbackOnMouseUpCorner(delta));
    }

    public mouseDown(currentPosition: Point, type: Corners): void
    {
        this.cornerType = type;
        this.dragAndDropUseCase.mouseDown(currentPosition);
    }

    public doOnChangeSize(callback: Function): void
    {
        this.doOnChangeSizeCallbacks.push(callback);
    }

    public doOnResize(callback: Function): void
    {
        this.doOnResizeCallbacks.push(callback);
    }

    private callbackOnMoveCorner(delta: Point): void
    {
        this.doOnChangeSizeCallbacks.forEach((callback: Function) => callback(delta, this.cornerType))
    }

    private callbackOnMouseUpCorner(delta: Point): void
    {
        this.doOnResizeCallbacks.forEach((callback: Function) => callback(delta, this.cornerType))
    }
}