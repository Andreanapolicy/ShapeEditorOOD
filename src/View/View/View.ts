import { ISlide } from '../../Model/Slide/ISlide';
import Slide from '../../Model/Slide/Slide';
import CanvasView from '../CanvasView/CanvasView';

export default class View
{
    private readonly model: ISlide;
    private readonly canvasView: CanvasView;

    constructor()
    {
        this.model = new Slide();
        this.canvasView = new CanvasView(this.model);
    }
}