import { ShapeType } from '../Type/ShapeType';
import { ISlide } from './ISlide';
import Slide from './Slide';
import Shape from '../Shape/Shape';
import { IShape } from '../Shape/IShape';
import { commonFrame } from '../../Сommon/Frame';

describe('test of slide', () =>
{
    test('get shape from empty slide', () =>
    {
        const slide: ISlide = new Slide();

        expect(slide.getShapeByIndex(0)).toEqual(null);
    });

    test('delete shape from empty slide', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.CIRCLE);
        const slide: ISlide = new Slide();
        let isDeleted: boolean = false;
        shape.doOnDelete(() => isDeleted = true);

        slide.removeShape(shape);
        expect(isDeleted).toEqual(false);
    });

    test('add item', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.TRIANGLE);
        const slide: ISlide = new Slide();
        let isDeleted: boolean = false;
        slide.createShape(ShapeType.TRIANGLE);
        slide.createShape(ShapeType.CIRCLE);

        expect(slide.getShapesCount()).toEqual(2);
        expect(slide.getShapeByIndex(0)?.getFrame()).toEqual(shape.getFrame());
        expect(slide.getShapeByIndex(0)?.getType()).toEqual(shape.getType());

        expect(slide.getShapeByIndex(slide.getShapesCount() - 1)?.getFrame()).toEqual(shape.getFrame());
        expect(slide.getShapeByIndex(slide.getShapesCount() - 1)?.getType()).toEqual(ShapeType.CIRCLE);

        slide.getShapeByIndex(0)?.doOnDelete(() => isDeleted = true);
        slide.removeShapeByIndex(0);

        expect(isDeleted).toEqual(true);
    });

    test('check notification', () =>
    {
        const slide: ISlide = new Slide();
        let isAdded: number = 0;
        slide.doOnAddShape(() => isAdded++);

        slide.createShape(ShapeType.TRIANGLE);
        expect(isAdded).toEqual(1);

        slide.createShape(ShapeType.TRIANGLE);
        expect(isAdded).toEqual(2);

        slide.createShape(ShapeType.TRIANGLE);
        expect(isAdded).toEqual(3);
    });
});