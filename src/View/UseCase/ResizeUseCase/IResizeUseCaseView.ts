import { Point } from '../../../Сommon/Point';
import { Corners } from '../../Type/CornersIDs';

export default interface IResizeUseCaseView
{
    mouseDown(currentPosition: Point, type: Corners): void;
    doOnChangeSize(callback: Function): void;
    doOnResize(callback: Function): void;
}