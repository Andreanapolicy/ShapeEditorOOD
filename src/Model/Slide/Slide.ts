import { ISlide } from './ISlide';
import { ShapeType } from '../Type/ShapeType';
import { IShape } from '../Shape/IShape';
import { IShapeFactory } from '../ShapeFactory/IShapeFactory';
import ShapeFactory from '../ShapeFactory/ShapeFactory';

export default class Slide implements ISlide
{
    private readonly shapeFactory: IShapeFactory;
    private shapes: Array<IShape> = [];
    private doOnAddShapeCallbacks: Array<Function> = [];

    constructor()
    {
        this.shapeFactory = new ShapeFactory();
    }

    public createShape(type: ShapeType): IShape
    {
        const newShape = this.shapeFactory.createShape(type);
        this.shapes.push(newShape);
        this.doOnAddShapeCallbacks.forEach((callback: Function) => callback());

        return newShape;
    }

    public doOnAddShape(callback: Function): void
    {
        this.doOnAddShapeCallbacks.push(callback);
    }

    public getShapeByIndex(index: number): IShape | null
    {
        if (index >= this.shapes.length)
        {
            return null;
        }

        return this.shapes[index];
    }

    public removeShape(removableShape: IShape): void
    {
        if (!this.shapes.includes(removableShape))
        {
            return;
        }

        removableShape.markDeleted();
        this.shapes = this.shapes.filter((shape: IShape) => shape !== removableShape);
    }

    public removeShapeByIndex(removableIndex: number): void
    {
        if (removableIndex > this.shapes.length)
        {
            return;
        }

        this.shapes[removableIndex].markDeleted();
        this.shapes = this.shapes.filter((shape: IShape, index: number) => index !== removableIndex);
    }
}