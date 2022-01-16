import { ShapeType } from '../../Model/Type/ShapeType';
import IShapeContent from '../ShapeContent/IShapeContent';

export default interface IShapeContentFactory
{
    createShapeContent(shapeType: ShapeType, id: string): IShapeContent;
}