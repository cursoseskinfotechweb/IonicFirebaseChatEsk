export class Chat {

  public $key: string;

  constructor (
    public lastMessage: string,
    public timesstamp: any,
    public title: string,
    public photo: string
  ) {}
}