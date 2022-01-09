import { Frame } from '../../common/Frame';

export default class ShapeContent
{
    protected readonly id: string;
    protected wrapper: SVGElement;

    constructor(id: string)
    {
        this.id = id;
        this.wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    }

    public setFrame(frame: Frame): void
    {
        this.wrapper = document.getElementById(this.id)?.getElementsByTagName('svg')[0] as SVGElement;
        this.wrapper.setAttribute('width', '' + frame.width);
        this.wrapper.setAttribute('height', '' + frame.height);
        this.wrapper.setAttribute('viewBox', '0 0 ' + frame.width + ' ' + frame.height);
    }

    public getContent(): SVGElement
    {
        return this.wrapper;
    }
}