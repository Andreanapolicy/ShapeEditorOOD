import IShapeView from '../ShapeView/IShapeView';

export default interface ISelectionView
{
    select(shapeView: IShapeView): void;
    unselect(shapeView: IShapeView): void;
    doOnMoveShape(callback: Function): void;
    doOnResizeWhileMovingShape(callback: Function): void;
    doOnResizeWhileMouseUpShape(callback: Function): void;
    doOnChangeFrame(callback: Function): void;
}