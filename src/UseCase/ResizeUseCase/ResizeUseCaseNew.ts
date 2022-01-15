import { Frame } from '../../Сommon/Frame';
import { Point } from '../../Сommon/Point';
import { Corners } from '../../View/Type/CornersIDs';

export default class ResizeUseCaseNew
{
    public static getResultFrame(delta: Point, frame: Frame, cornerType: Corners): Frame | null
    {
        let newFrame: Frame = frame;

        switch (cornerType)
        {
            case Corners.topLeft:
                newFrame = {
                    leftTopPoint: {top: frame.leftTopPoint.top + delta.top, left: frame.leftTopPoint.left + delta.left},
                    width: frame.width - delta.left,
                    height: frame.height - delta.top
                };
                break;
            case Corners.topRight:
                newFrame = {
                    leftTopPoint: {top: frame.leftTopPoint.top + delta.top, left: frame.leftTopPoint.left},
                    width: frame.width + delta.left,
                    height: frame.height - delta.top
                };
                break;
            case Corners.bottomRight:
                newFrame = {
                    leftTopPoint: {top: frame.leftTopPoint.top, left: frame.leftTopPoint.left},
                    width: frame.width + delta.left,
                    height: frame.height + delta.top
                };
                break;
            case Corners.bottomLeft:
                newFrame = {
                    leftTopPoint: {top: frame.leftTopPoint.top, left: frame.leftTopPoint.left + delta.left},
                    width: frame.width - delta.left,
                    height: frame.height + delta.top
                };
                break;
        }

        if (newFrame.width < 15 || newFrame.height < 15)
        {
            return null
        }

        return newFrame;
    }
}