import { Frame } from '../../Сommon/Frame';
import { Point } from '../../Сommon/Point';

export default class DragAndDropUseCase
{
    private static defaultIndent: number = 30;

    public static getResultFrame(delta: Point, frame: Frame, scope: Frame): Frame | null
    {
        if (!(frame.leftTopPoint.left + delta.left < scope.width - DragAndDropUseCase.defaultIndent)
            || !(frame.leftTopPoint.left + delta.left > DragAndDropUseCase.defaultIndent - frame.width)
            || !(frame.leftTopPoint.top + delta.top < scope.height - DragAndDropUseCase.defaultIndent)
            || !(frame.leftTopPoint.top + delta.top > DragAndDropUseCase.defaultIndent - frame.height))
        {
            return null;
        }

        return {...frame, leftTopPoint: {top: frame.leftTopPoint.top + delta.top, left: frame.leftTopPoint.left + delta.left}}
    }
}