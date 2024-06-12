import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogTelegramService {
  constructor(private readonly httpService: HttpService) {}

  async sendToTelegram(title: string, desc: string) {
    try {
      // Create message
      const message = `<pre>Title: <b>${title}</b></pre> Detail: ${desc}`;

      //create url
      const chat_id = process.env.CHAT_BOT_ID;
      const bot_token = process.env.TOKEN_BOT_TL;
      const url = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${message.toString()}`;

      console.log('🚀 ~ LogTelegramService ~ sendToTelegram ~ url:', url);
      //Send Message
      const res = await this.httpService.axiosRef.post(url);
      console.log('🚀 ~ LogTelegramService ~ sendToTelegram ~ res:', res);
      return true;
    } catch (error) {
      console.log(111, error);
      // await this.sendToTelegram('Send to telegram error', error.message);
    }
  }
}
