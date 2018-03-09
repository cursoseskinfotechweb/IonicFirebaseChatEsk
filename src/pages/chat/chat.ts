import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user.service';
import { AngularFireList } from 'angularfire2/database';
import { Message } from '../../models/message.model';
import { MessageService } from '../../providers/message/message.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  messages: AngularFireList<Message>;
  viewMessages: Observable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(
    public authService: AuthService,
    public messageService: MessageService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
  ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {

    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;

    this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;
        console.log(' ionViewDidLoad sender', this.sender)

        let doSubscription = () => {
          this.viewMessages = this.messageService.mapListKeys<Message>(this.messages);
          this.viewMessages
            .subscribe((messages: Message[]) => {
              this.scrollToBottom();
            }
          );
        };

        this.messages = this.messageService
          .getMessages(this.sender.$key, this.recipient.$key);

          this.messages
          .valueChanges()
          .first()
          .subscribe((messages: Message[]) => {

            if (messages.length === 0) {

              this.messages = this.messageService
                .getMessages(this.recipient.$key, this.sender.$key);

              doSubscription();

            } else {
              doSubscription();
            }

          }
        );

      }
    );

  }


  sendMessage(newMessage: string) :void {
    //this.messages.push(newMessage);
  }

  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content._scroll) {
        this.content.scrollToBottom(duration || 300);
      }
    }, 50);
  }

}
