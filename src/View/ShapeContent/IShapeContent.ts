import { Frame } from '../../Сommon/Frame';

type Content = SVGElement | HTMLElement;

export default interface IShapeContent
{
    setFrame(frame: Frame): void;
    getContent(): Content;
}