import { IShape } from '../Shape/IShape';
import { ShapeType } from '../Type/ShapeType';

export interface IShapeFactory
{
    createShape(type: ShapeType): IShape;
}