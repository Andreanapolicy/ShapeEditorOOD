import { ShapeType } from '../../common/ShapeType';
import { IShape } from '../shape/IShape';

export interface ISlide
{
    removeShape(shape: IShape): void;
    createShape(type: ShapeType): IShape;
    doOnAddShape(callback: Function): void;
}