import { ISlide } from '../Model/Slide/ISlide';
import Slide from '../Model/Slide/Slide';
import View from '../View/View/View';

export default class Application
{
    private readonly model: ISlide;
    private readonly view: View;

    constructor()
    {
        this.model = new Slide();
        this.view = new View();
    }
}