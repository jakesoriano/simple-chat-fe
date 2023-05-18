import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatMsg } from '../chat-msg';
import { MessagesService } from '../messages.service'

interface Message {
  class: string,
  message: string
}

interface Data {
  id: string,
  msg: string
}

@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.css']
})
export class ChatMsgComponent implements OnInit {

  constructor(private service: MessagesService, private socket: Socket) { }

  model = new ChatMsg('');
  messageList: Message[] = [];
  submitted: boolean = false;

  ngOnInit(): void {
    this.service.getMessage().subscribe((data:Data)=> {
      const { id, msg } = data
      const isCurrentUser = id === this.socket.ioSocket.id;
      const msgClass = isCurrentUser ? 'sent' : 'received'
      const msgObj = { message: msg, class: msgClass }

      this.messageList.push(msgObj);
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
