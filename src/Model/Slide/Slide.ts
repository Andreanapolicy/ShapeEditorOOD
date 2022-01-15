import { ISlide } from './ISlide';
import { ShapeType } from '../Type/ShapeType';
import { IShape } from '../Shape/IShape';
import { IShapeFactory } from '../ShapeFactory/IShapeFactory';
import ShapeFactory from '../ShapeFactory/ShapeFactory';

export type ShapeConformity = {
    uuid: string,
    shape: IShape
}

export default class Slide implements ISlide
{
    private readonly shapeFactory: IShapeFactory;
    private shapes: Array<ShapeConformity> = [];
    private doOnAddShapeCallbacks: Array<Function> = [];

    constructor()
    {
        this.shapeFactory = new ShapeFactory();
    }

    public createShape(type: ShapeType): IShape
    {
        const newShape: IShape = this.shapeFactory.createShape(type);

        this.shapes.push({uuid: newShape.getUUID(), shape: newShape});
        this.doOnAddShapeCallbacks.forEach((callback: Function) => callback(newShape));

        return newShape;
    }

    public getShapesCount(): number
    {
        return this.shapes.length;
    }

    public doOnAddShape(callback: Function): void
    {
        this.doOnAddShapeCallbacks.push(callback);
    }

    public getShapeByUUID(UUID: string): IShape | null
    {
        const shape: ShapeConformity | undefined = this.shapes.find((conformity: ShapeConformity) => conformity.uuid === UUID);

        if (shape === undefined)
        {
            return null;
        }

        return shape.shape;
    }

    public removeShapeByUUID(UUID: string): void
    {
        const shape: ShapeConformity | undefined = this.shapes.find((conformity: ShapeConformity) => conformity.uuid === UUID);

        if (shape === undefined)
        {
            return;
        }

        shape.shape.markDeleted()
        this.shapes = this.shapes.filter((conformity: ShapeConformity) => conformity.uuid !== UUID);
    }

    public getConformity(): Array<ShapeConformity>
    {
        return this.shapes;
    }
}