import { IShape } from '../../Model/Shape/IShape';
import ShapeView from '../../View/ShapeView/ShapeView';
import { Frame } from '../../Сommon/Frame';

export default interface IShapePresenter
{
    getShapeModel(): IShape;
    getShapeView(): ShapeView;
    setNewFrameToModel(frame: Frame): void;
    setNewFrameToView(frame: Frame): void;
    doOnDeleteShape(callback: Function): void;
    doOnChangeShape(callback: Function): void;
}