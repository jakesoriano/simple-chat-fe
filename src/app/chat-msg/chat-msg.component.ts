import { Component, OnInit } from '@angular/core';
import { ChatMsg } from '../chat-msg';
import { MessagesService } from '../messages.service'

@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.css']
})
export class ChatMsgComponent implements OnInit {

  constructor(private service: MessagesService) { }

  model = new ChatMsg('');
  messageList: string[] = [];
  submitted: boolean = false;

  ngOnInit(): void {
    this.service.getMessage().subscribe((message:string)=> {
      this.messageList.push(message);
    });
  }

  sendMessage(): void {
    this.service.sendMessage(this.model.msg);
    this.model.msg = '';
  };

  onSubmit() {
    this.sendMessage()
    this.submitted = true;
   }
}
