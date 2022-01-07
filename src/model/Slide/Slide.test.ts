import { ShapeType } from '../../common/ShapeType';
import { ISlide } from './ISlide';
import Slide from './Slide';
import Shape from '../Shape/Shape';
import { IShape } from '../Shape/IShape';

describe('test of slide', () =>
{
    test('get shape from empty slide', () =>
    {
        const slide: ISlide = new Slide();

        expect(slide.getShapeByIndex(0)).toEqual(null);
    });

    test('delete shape from empty slide', () =>
    {
        const shape: IShape = new Shape({leftTopPoint: {top: 10, left: 10}, width: 10, height: 10}, ShapeType.CIRCLE);
        const slide: ISlide = new Slide();
        let isDeleted: boolean = false;
        shape.doOnDelete(() => isDeleted = true);

        slide.removeShape(shape);
        expect(isDeleted).toEqual(false);
    });

    test('add item', () =>
    {
        const shape: IShape = new Shape({leftTopPoint: {top: 10, left: 10}, width: 10, height: 10}, ShapeType.TRIANGLE);
        const slide: ISlide = new Slide();
        let isDeleted: boolean = false;
        slide.createShape(ShapeType.TRIANGLE);

        expect(slide.getShapeByIndex(0)?.getFrame()).toEqual(shape.getFrame());
        expect(slide.getShapeByIndex(0)?.getType()).toEqual(shape.getType());

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