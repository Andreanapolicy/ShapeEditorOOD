import ShapeView from '../ShapeView/ShapeView';

export default interface ISelectionView
{
    select(shapeView: ShapeView): void;
    unselect(shapeView: ShapeView): void;
    doOnMoveShape(callback: Function): void;
    doOnResizeWhileMovingShape(callback: Function): void;
    doOnResizeWhileMouseUpShape(callback: Function): void;
    doOnChangeFrame(callback: Function): void;
}