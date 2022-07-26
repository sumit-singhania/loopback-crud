import {MiddlewareSequence, RequestContext} from '@loopback/rest';
import moment from 'moment';

export class MySequence extends MiddlewareSequence {
    log(msg: string) {
        console.log(msg);
      }
    async handle(context: RequestContext): Promise<void> {
        const {request} = context;
    
        console.log('request start time', moment().format('MM-DD-YYYY HH:mm:ss'));
        console.log('request sip:', request.ip);
        await super.handle(context);
        console.log('request end time', moment().format('MM-DD-YYYY HH:mm:ss'));
      }
}
