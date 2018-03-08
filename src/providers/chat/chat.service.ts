import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Chat } from '../../models/chat.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Injectable()
export class ChatService extends BaseService {

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public http: HttpClient
  ) {
    super();
  }

  create(chat: Chat, userId1: string, userId2: string): Promise<void> {
    return this.db.object<Chat>(`/chats/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }

  getDeepChat(userId1: string, userId2: string): AngularFireObject<Chat> {
    return this.db.object<Chat>(`/chats/${userId1}/${userId2}`);
  }  
}
