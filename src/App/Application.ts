import View from '../View/View/View';

export default class Application
{
    private readonly view: View;

    constructor()
    {
        this.view = new View();
    }
}