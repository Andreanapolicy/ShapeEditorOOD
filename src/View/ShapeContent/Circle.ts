import ShapeContent from './ShapeContent';
import { Frame } from '../../Сommon/Frame';

export default class Circle extends ShapeContent
{
    private element: SVGElement;

    constructor(id: string)
    {
        super(id);

        this.element = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        this.wrapper.appendChild(this.element);
    }

    public setFrame(frame: Frame)
    {
        super.setFrame(frame);

        this.element = document.getElementById(this.id)?.getElementsByTagName('svg')[0].getElementsByTagName('ellipse')[0] as SVGElement;

        this.element.setAttribute('cx', '' + frame.width / 2);
        this.element.setAttribute('cy', '' + frame.height / 2);
        this.element.setAttribute('rx', '' + frame.width / 2);
        this.element.setAttribute('ry', '' + frame.height / 2);
        this.element.setAttribute('width', '' + frame.width);
        this.element.setAttribute('height', '' + frame.height);
        this.element.setAttribute('viewBox', '0 0 ' + frame.width + ' ' + frame.height);
        this.element.setAttribute('fill', '#3bdb7c');
    }
}