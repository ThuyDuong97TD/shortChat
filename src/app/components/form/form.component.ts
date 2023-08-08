import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
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
