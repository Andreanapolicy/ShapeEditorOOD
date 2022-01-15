import { ISlide } from '../../Model/Slide/ISlide';
import Slide from '../../Model/Slide/Slide';
import CanvasPresenterNew from '../../Presenter/CanvasPresenter/CanvasPresenterNew';

export default class View
{
    private readonly model: ISlide;
    private readonly canvasView: CanvasPresenterNew;

    constructor()
    {
        this.model = new Slide();
        this.canvasView = new CanvasPresenterNew(this.model);
    }
}