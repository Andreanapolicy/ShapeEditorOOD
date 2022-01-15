import { IShape } from '../../Model/Shape/IShape';
import { Frame } from '../../Сommon/Frame';
import IShapeView from '../../View/ShapeView/IShapeView';

export default interface IShapePresenter
{
    getShapeModel(): IShape;
    getShapeView(): IShapeView;
    setNewFrameToModel(frame: Frame): void;
    setNewFrameToView(frame: Frame): void;
    doOnDeleteShape(callback: Function): void;
    doOnChangeShape(callback: Function): void;
}