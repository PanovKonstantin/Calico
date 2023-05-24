import { Module } from '@nestjs/common';
import { GameListenerGateway } from '../gateway/events.gateway';

@Module({
  providers: [GameListenerGateway],
})
export default class EventsModule {}
