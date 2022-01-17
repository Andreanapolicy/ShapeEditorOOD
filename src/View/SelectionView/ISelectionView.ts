import IShapeView from '../ShapeView/IShapeView';

export default interface ISelectionView
{
    select(shapeView: IShapeView): void;
    unselect(shapeView: IShapeView): void;
    doOnMoveShapeWhileMoving(callback: Function): void;
    doOnResizeWhileMovingShape(callback: Function): void;
    doOnResizeWhileMouseUpShape(callback: Function): void;
    doOnMoveShapeWhileMouseUp(callback: Function): void;
}