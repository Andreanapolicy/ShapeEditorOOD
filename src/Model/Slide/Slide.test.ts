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

        expect(slide.getShapeByUUID('a1234123')).toEqual(null);
    });

    test('delete shape from empty slide', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.CIRCLE, '123123');
        const slide: ISlide = new Slide();
        let isDeleted: boolean = false;
        shape.doOnDelete(() => isDeleted = true);

        slide.removeShapeByUUID('uuid');
        expect(isDeleted).toEqual(false);
    });

    test('add item', () =>
    {
        const shape: IShape = new Shape(commonFrame, ShapeType.TRIANGLE, '123123');
        const slide: ISlide = new Slide();
        let isDeleted: boolean = false;
        slide.createShape(ShapeType.TRIANGLE);
        slide.createShape(ShapeType.CIRCLE);
        const conformity = slide.getConformity();

        expect(slide.getShapesCount()).toEqual(2);
        expect(slide.getShapeByUUID(conformity[0].uuid)?.getFrame()).toEqual(shape.getFrame());
        expect(slide.getShapeByUUID(conformity[0].uuid)?.getType()).toEqual(shape.getType());

        expect(slide.getShapeByUUID(conformity[1].uuid)?.getFrame()).toEqual(shape.getFrame());
        expect(slide.getShapeByUUID(conformity[1].uuid)?.getType()).toEqual(ShapeType.CIRCLE);

        slide.getShapeByUUID(conformity[0].uuid)?.doOnDelete(() => isDeleted = true);
        slide.removeShapeByUUID(conformity[0].uuid);

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