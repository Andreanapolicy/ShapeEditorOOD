import ShapeContent from './ShapeContent';
import { Frame } from '../../common/Frame';

export default class Triangle extends ShapeContent
{
    private element: SVGElement;

    constructor(id: string)
    {
        super(id);

        this.element = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        this.wrapper.appendChild(this.element);
    }

    public setFrame(frame: Frame)
    {
        super.setFrame(frame);
        this.element = document.getElementById(this.id)?.getElementsByTagName('svg')[0].getElementsByTagName('polygon')[0] as SVGElement;

        this.element.setAttribute('points', '0,' + frame.height + ' ' + frame.width / 2 + ',0 ' + frame.width  + ',' + frame.height);
        this.element.setAttribute('width', '' + frame.width);
        this.element.setAttribute('height', '' + frame.height);
        this.element.setAttribute('viewBox', '0 0 ' + frame.width + ' ' + frame.height);
        this.element.setAttribute('fill', '#3bdb7c');
    }
}