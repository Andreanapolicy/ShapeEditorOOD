import { ISlide } from './ISlide';
import { ShapeType } from '../../common/ShapeType';
import { IShape } from '../shape/IShape';
import Shape from '../shape/Shape';

export default class Slide implements ISlide
{
    public createShape(type: ShapeType): IShape
    {
        return new Shape({leftTopPoint: {left: 10, top: 10}, weight: 10, height: 10}, ShapeType.CIRCLE);
    }

    public doOnAddShape(callback: Function): void
    {
    }

    public removeShape(shape: IShape): void
    {
    }
}