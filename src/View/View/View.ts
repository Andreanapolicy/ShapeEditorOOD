import { ISlide } from '../../Model/Slide/ISlide';
import Slide from '../../Model/Slide/Slide';
import CanvasPresenter from '../../Presenter/CanvasPresenter/CanvasPresenter';

export default class View
{
    private readonly model: ISlide;
    private readonly canvasView: CanvasPresenter;

    constructor()
    {
        this.model = new Slide();
        this.canvasView = new CanvasPresenter(this.model);
    }
}