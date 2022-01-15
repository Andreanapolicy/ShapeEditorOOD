import ShapeView from '../ShapeView/ShapeView';

export default interface ICanvasView
{
    doOnAddShape(callback: Function): void;
    doOnDeleteShape(callback: Function): void;
    doOnUnselectShape(callback: Function): void;
    doOnSelectShape(callback: Function): void;
    addShape(shapeView: ShapeView): void;
    deleteShape(id: string): void;
    changeShape(shapeView: ShapeView): void;
}