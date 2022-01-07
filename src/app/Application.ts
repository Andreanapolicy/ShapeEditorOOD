import { ISlide } from '../model/Slide/ISlide';
import Slide from '../model/Slide/Slide';

export default class Application
{
    private readonly model: ISlide;
    // private readonly view: View;

    constructor()
    {
        this.model = new Slide();
        // this.view = new View();
    }
}