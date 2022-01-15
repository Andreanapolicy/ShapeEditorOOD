import { Point } from '../../Сommon/Point';
import { DragAndDropState } from '../Type/DragAndDropState';

export default class DragAndDropUseCaseView
{
    private currentCursorPosition: Point = {top: 0, left: 0};
    private sumDelta: Point = {top: 0, left: 0};
    private doOnMoveCallbacks: Array<Function> = [];
    private doOnMouseUpCallbacks: Array<Function> = [];
    private state: DragAndDropState = DragAndDropState.none;

    public mouseDown(currentPosition: Point): void
    {
        this.state = DragAndDropState.move;
        this.currentCursorPosition = currentPosition;
        this.sumDelta = {top: 0, left: 0};

        document.addEventListener('mousemove', (event: MouseEvent) => this.moveElement(event));

        document.addEventListener('mouseup', (event: MouseEvent) =>
        {
            if (this.state === DragAndDropState.none)
            {
                return;
            }

            this.state = DragAndDropState.none;

            this.calculateDelta(event);

            this.doOnMouseUpCallbacks.forEach((callback: Function) => callback(this.sumDelta));
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

        this.calculateDelta(event);

        this.doOnMoveCallbacks.forEach((callback: Function) => callback(this.sumDelta));
    }

    private calculateDelta(event: MouseEvent): void
    {
        const delta: Point = {top: event.pageY - this.currentCursorPosition.top, left: event.pageX - this.currentCursorPosition.left};
        this.sumDelta = {top: this.sumDelta.top + delta.top, left: this.sumDelta.left + delta.left};
        this.currentCursorPosition = {top: event.pageY, left: event.pageX};
    }
}