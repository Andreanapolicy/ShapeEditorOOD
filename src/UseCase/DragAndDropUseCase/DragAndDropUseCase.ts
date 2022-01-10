import { Frame } from '../../Сommon/Frame';
import { Point } from '../../Сommon/Point';
import { DragAndDropState } from '../Type/DragAndDropState';

export default class DragAndDropUseCase
{
    private readonly scope: Frame;
    private currentCursorPosition: Point = {top: 0, left: 0};
    private doOnMoveCallbacks: Array<Function> = [];
    private doOnMouseUpCallbacks: Array<Function> = [];
    private state: DragAndDropState = DragAndDropState.none;

    constructor(scope: Frame)
    {
        this.scope = scope;
    }

    public mouseDown(event: MouseEvent): void
    {
        this.state = DragAndDropState.move;
        this.currentCursorPosition = {top: event.pageY, left: event.pageX};

        document.addEventListener('mousemove', (event) => this.moveElement(event));

        document.addEventListener('mouseup', (event: MouseEvent) =>
        {
            if (this.state === DragAndDropState.none)
            {
                return;
            }

            this.state = DragAndDropState.none;

            const delta: Point = {top: this.currentCursorPosition.top - event.pageY, left: this.currentCursorPosition.left - event.pageX};
            this.currentCursorPosition = {top: this.currentCursorPosition.top + delta.top, left: this.currentCursorPosition.left + delta.left};

            this.doOnMouseUpCallbacks.forEach((callback: Function) => callback(delta));
        });
    }

    public doOnMove(callback: Function): void
    {
        this.doOnMoveCallbacks.push(callback);
    }

    public doOnMouseUp(callback: Function): void
    {
        this.doOnMouseUpCallbacks.push(callback);
    }

    private moveElement(event: MouseEvent): void
    {
        if (this.state === DragAndDropState.none)
        {
            return;
        }

        if (!(event.pageX < this.scope.leftTopPoint.left + this.scope.width)
            || !(event.pageX > this.scope.leftTopPoint.left)
            || !(event.pageY < this.scope.leftTopPoint.top + this.scope.height)
            || !(event.pageY > this.scope.leftTopPoint.top))
        {
            return;
        }
        const delta: Point = {top: event.pageY - this.currentCursorPosition.top , left: event.pageX - this.currentCursorPosition.left};

        this.currentCursorPosition = {top: this.currentCursorPosition.top + delta.top, left: this.currentCursorPosition.left + delta.left};

        this.doOnMoveCallbacks.forEach((callback: Function) => callback(delta));
    }
}