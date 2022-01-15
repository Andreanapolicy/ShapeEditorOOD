import { Frame } from '../../Сommon/Frame';
import { Point } from '../../Сommon/Point';

export default class DragAndDropUseCaseNew
{
    public static getResultFrame(delta: Point, frame: Frame, scope: Frame): Frame | null
    {
        if (!(frame.leftTopPoint.left + delta.left < scope.width - frame.width)
            || !(frame.leftTopPoint.left + delta.left > 0)
            || !(frame.leftTopPoint.top + delta.top < scope.height - frame.height)
            || !(frame.leftTopPoint.top + delta.top > 0))
        {
            return null;
        }

        return {...frame, leftTopPoint: {top: frame.leftTopPoint.top + delta.top, left: frame.leftTopPoint.left + delta.left}}
    }
}