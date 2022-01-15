import { Point } from '../../../Сommon/Point';

export default interface IDragAndDropUseCaseView
{
    mouseDown(currentPosition: Point): void;
    doOnMove(callback: Function): void;
    doOnMouseUp(callback: Function): void;
}