import ShapeView from '../../View/ShapeView/ShapeView';
import DragAndDropUseCase from '../../UseCase/DragAndDropUseCase/DragAndDropUseCase';
import { Frame } from '../../common/Frame';
import { Point } from '../../common/Point';
import ResizeUseCase from '../../UseCase/ResizeUseCase/ResizeUseCase';
import { Corners } from '../../common/CornersIDs';

export default class SelectionPresenter
{
    private readonly dragAndDropUseCase: DragAndDropUseCase;
    private readonly resizeUseCase: ResizeUseCase;
    private doOnMoveShapeCallbacks: Array<Function> = [];
    private doOnResizeShapeCallbacks: Array<Function> = [];
    private doOnChangeFrameCallbacks: Array<Function> = [];
    private shape: ShapeView | null = null;

    constructor(scope: Frame)
    {
        this.dragAndDropUseCase = new DragAndDropUseCase(scope);
        this.resizeUseCase = new ResizeUseCase(scope);

        this.dragAndDropUseCase.doOnMove((delta: Point) => this.callbackOnMoveShape(delta));
        this.dragAndDropUseCase.doOnMouseUp((delta: Point) => this.callbackOnMouseUpShape(delta));

        this.resizeUseCase.doOnChangeSize((newFrame: Frame) =>
            this.doOnResizeShapeCallbacks.forEach((callback: Function) => callback(newFrame)));
        this.resizeUseCase.doOnResize((newFrame: Frame) =>
            this.doOnChangeFrameCallbacks.forEach((callback: Function) => callback(newFrame)));
    }

    public cornerMouseDown(shape: ShapeView, corner: HTMLElement, event: MouseEvent): void
    {
        this.shape = shape;
        this.resizeUseCase.mouseDown(event, corner.id as Corners, shape.getFrame());
    }

    public shapeMouseDown(shape: ShapeView, event: MouseEvent): void
    {
        this.shape = shape;
        this.dragAndDropUseCase.mouseDown(event);
    }

    public doOnMoveShape(callback: Function): void
    {
        this.doOnMoveShapeCallbacks.push(callback);
    }

    public doOnResizeShape(callback: Function): void
    {
        this.doOnResizeShapeCallbacks.push(callback);
    }

    public doOnChangeFrame(callback: Function): void
    {
        this.doOnChangeFrameCallbacks.push(callback);
    }

    private getResultFrameAfterMovingShape(delta: Point): Frame | null
    {
        if (this.shape === null)
        {
            return null;
        }

        const currentShapeFrame: Frame = this.shape.getFrame();
        return {...currentShapeFrame, leftTopPoint: {top: currentShapeFrame.leftTopPoint.top + delta.top, left: currentShapeFrame.leftTopPoint.left + delta.left}};
    }

    private callbackOnMoveShape(delta: Point): void
    {
        const newFrame: Frame | null = this.getResultFrameAfterMovingShape(delta);
        if (newFrame === null)
        {
            return;
        }

        this.doOnMoveShapeCallbacks.forEach((callback: Function) => callback(newFrame))
    }

    private callbackOnMouseUpShape(delta: Point): void
    {
        const newFrame: Frame | null = this.getResultFrameAfterMovingShape(delta);
        if (newFrame === null)
        {
            return;
        }

        this.doOnChangeFrameCallbacks.forEach((callback: Function) => callback(newFrame))
    }
}