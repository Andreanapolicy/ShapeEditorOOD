import IShapeView from '../ShapeView/IShapeView';

export default interface ICanvasView
{
    doOnAddShape(callback: Function): void;
    doOnDeleteShape(callback: Function): void;
    doOnUnselectShape(callback: Function): void;
    doOnSelectShape(callback: Function): void;
    addShape(shapeView: IShapeView): void;
    deleteShape(id: string): void;
    changeShape(shapeView: IShapeView): void;
}