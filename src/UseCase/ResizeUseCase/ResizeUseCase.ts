import DragAndDropUseCase from '../DragAndDropUseCase/DragAndDropUseCase';
import { Frame } from '../../common/Frame';
import { Point } from '../../common/Point';
import { Corners } from '../../common/CornersIDs';

export default class ResizeUseCase
{
    private readonly dragAndDropUseCase: DragAndDropUseCase;
    private cornerType: Corners = Corners.topLeft;
    private shapeFrame: Frame = {leftTopPoint: {top: 0, left: 0}, width: 0, height: 0};
    private doOnChangeSizeCallbacks: Array<Function> = [];
    private doOnResizeCallbacks: Array<Function> = [];

    constructor(scope: Frame)
    {
        this.dragAndDropUseCase = new DragAndDropUseCase(scope);

        this.dragAndDropUseCase.doOnMove((delta: Point) => this.callbackOnMoveCorner(delta));
        this.dragAndDropUseCase.doOnMouseUp((delta: Point) => this.callbackOnMouseUpCorner(delta));
    }

    public mouseDown(element: HTMLElement, event: MouseEvent, type: Corners, shapeFrame: Frame): void
    {
        this.shapeFrame = shapeFrame;
        this.cornerType = type;
        this.dragAndDropUseCase.mouseDown(element, event);
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
        this.doOnChangeSizeCallbacks.map((callback: Function) => callback(this.getResultFrame(delta)))
    }

    private callbackOnMouseUpCorner(delta: Point): void
    {
        this.doOnResizeCallbacks.map((callback: Function) => callback(this.getResultFrame(delta)))
    }

    private getResultFrame(delta: Point): Frame
    {
        let newFrame: Frame = this.shapeFrame;

        switch (this.cornerType)
        {
            case Corners.topLeft:
                newFrame = {
                    leftTopPoint: {top: this.shapeFrame.leftTopPoint.top + delta.top, left: this.shapeFrame.leftTopPoint.left + delta.left},
                    width: this.shapeFrame.width - delta.left,
                    height: this.shapeFrame.height - delta.top
                };
                break;
            case Corners.topRight:
                newFrame = {
                    leftTopPoint: {top: this.shapeFrame.leftTopPoint.top + delta.top, left: this.shapeFrame.leftTopPoint.left},
                    width: this.shapeFrame.width + delta.left,
                    height: this.shapeFrame.height - delta.top
                };
                break;
            case Corners.bottomRight:
                newFrame = {
                    leftTopPoint: {top: this.shapeFrame.leftTopPoint.top, left: this.shapeFrame.leftTopPoint.left},
                    width: this.shapeFrame.width + delta.left,
                    height: this.shapeFrame.height + delta.top
                };
                break;
            case Corners.bottomLeft:
                newFrame = {
                    leftTopPoint: {top: this.shapeFrame.leftTopPoint.top, left: this.shapeFrame.leftTopPoint.left + delta.left},
                    width: this.shapeFrame.width - delta.left,
                    height: this.shapeFrame.height + delta.top
                };
                break;
        }

        if (newFrame.width < 15)
        {
            this.shapeFrame.width = 15;
        }

        if (newFrame.height < 15)
        {
            this.shapeFrame.height = 15;
        }

        if (newFrame.height >= 15 && newFrame.width >= 15)
        {
            this.shapeFrame = newFrame;
        }

        return this.shapeFrame;
    }
}