import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import { Chat } from '../models/chat.models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chatCollection = collection(this.fisestore, 'chats');
  chats$ = new Subject<Chat[]>();
  constructor(private fisestore: Firestore) {
    onSnapshot(this.chatCollection, (querySnapshot) => {
      const result = querySnapshot.docs;
      const chats = result.map((doc) => doc.data() as Chat).sort((a, b) => a.sentAt - b.sentAt);
      this.chats$.next(chats);
    })
  }
  // async getChats(fromUID: string, toUID: string) {
  //   const queryFrom = query(
  //     this.chatCollection,
  //     where('from', '==', fromUID),
  //     where('to', '==', toUID)
  //   );

  //   const queryTo = query(
  //     this.chatCollection,
  //     where('to', '==', fromUID),
  //     where('from', '==', toUID)
  //   );
  //   const resultFrom = await getDocs(queryFrom);
  //   const resultTo = await getDocs(queryTo);
  //     const result = [...resultFrom.docs, ...resultTo.docs];
  //     const chats = result.map((doc) => doc.data() as Chat).sort((a, b) => a.sentAt - b.sentAt);
      
  //     this.chat$.next(chats);
      
  // }
  async addChat(chat: Chat) {
    await addDoc(this.chatCollection, chat);
  }
}
