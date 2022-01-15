import { Frame } from '../../Сommon/Frame';
import { Point } from '../../Сommon/Point';

export default class DragAndDropUseCaseNew
{
    private static defaultIndent: number = 10;

    public static checkForScreenCapacity(frame: Frame, scope: Frame, delta: Point = {top: 0, left: 0}): Frame | null
    {
        if (!(frame.leftTopPoint.left + delta.left < scope.width - DragAndDropUseCaseNew.defaultIndent)
            || !(frame.leftTopPoint.left + delta.left > 0)
            || !(frame.leftTopPoint.top + delta.top < scope.height - DragAndDropUseCaseNew.defaultIndent)
            || !(frame.leftTopPoint.top + delta.top > 0))
        {
            return null;
        }

        return {...frame, leftTopPoint: {top: frame.leftTopPoint.top + delta.top, left: frame.leftTopPoint.left + delta.left}}
    }
}