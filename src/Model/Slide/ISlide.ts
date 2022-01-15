import { ShapeType } from '../Type/ShapeType';
import { IShape } from '../Shape/IShape';
import { ShapeConformity } from './Slide';

export interface ISlide
{
    createShape(type: ShapeType): IShape;
    getShapesCount(): number;
    getShapeByUUID(UUID: string): IShape | null;
    removeShapeByUUID(UUID: string): void;
    doOnAddShape(callback: Function): void;
    getConformity(): Array<ShapeConformity>;
}