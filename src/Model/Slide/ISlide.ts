import { ShapeType } from '../Type/ShapeType';
import { IShape } from '../Shape/IShape';

export interface ISlide
{
    removeShape(shape: IShape): void;
    createShape(type: ShapeType): IShape;
    getShapeByIndex(index: number): IShape | null;
    removeShapeByIndex(index: number): void;
    doOnAddShape(callback: Function): void;
}