import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  fromUID: string = '';
  user: any;
  message: string = '';
  chats$ = this.chatService.chats$;
  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.fromUID = user.uid;
    });
  }
  

  sendMessage() {
    let chat = {
      from: this.fromUID,
      to: '5',
      message: this.message,
      sentAt: Date.now(),
    }
    this.chatService.addChat(chat);

  }
}
