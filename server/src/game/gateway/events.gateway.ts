import * as ws from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { iEvents } from './events';
import { GameCreator } from '../logic/GameCreator/GameCreator';

@ws.WebSocketGateway(80, { cors: { origin: '*' } })
export class GameListenerGateway
  implements ws.OnGatewayConnection
{
  @ws.WebSocketServer()
  io: Server;
  private gameRooms = new Set<string>();
  private gameCreators = new Map<string, GameCreator>();

  handleConnection(@ws.ConnectedSocket() client: Socket) {
    let room = randomString();
    while (room in this.gameRooms) room = randomString();
    this.gameRooms.add(room);
    this.gameCreators.set(room, new GameCreator());
    this.putClientInRoom(client, room);
  }

  @ws.SubscribeMessage(iEvents.getRoom)
  @ws.SubscribeMessage(iEvents.getRoommates)
  emitRoom(@ws.ConnectedSocket() client: Socket) {
    this.roomInfoUpdate(client.data.gameRoom);
  }

  @ws.SubscribeMessage(iEvents.setRoom)
  async setRoom(
    @ws.ConnectedSocket() client: Socket,
    @ws.MessageBody() room: string,
  ) {
    if (!this.gameRooms.has(room)) return;
    const roommates = await this.findUserRoommates(client);
    if (!roommates.length) this.gameRooms.delete(room);
    this.putClientInRoom(client, room);
  }

  @ws.SubscribeMessage('setGameConfig')
  setGameConfig(
    @ws.ConnectedSocket() client: Socket,
    @ws.MessageBody() config,
  ) {
    const room = client.data.gameRoom;
    const gameCreator = this.gameCreators.get(room);
    gameCreator.changeConfig(config);
    this.roomInfoUpdate(room);
  }

  @ws.SubscribeMessage('startGame')
  async startGame(@ws.ConnectedSocket() client: Socket) {
    const room = client.data.gameRoom;
    const players = await this.io.in(room).fetchSockets();
    const gameCreator = this.gameCreators.get(room);
    const game = gameCreator.create();
    for (const player of players) {
      player.data.game = game;
    }
    this.gameInfoUpdate(client);
  }

  @ws.SubscribeMessage('makeMove')
  pickTile(
    @ws.ConnectedSocket() client: Socket,
    @ws.MessageBody()
    body: {
      tileId: number;
      cellKey: string;
    },
  ) {
    const game = this.getGame(client);
    game.useTile(body.tileId, body.cellKey, client.id);
    this.gameInfoUpdate(client);
  }

  @ws.SubscribeMessage('placeProject')
  placeProject(
    @ws.ConnectedSocket() client: Socket,
    @ws.MessageBody()
    body: {
      tileId: number;
      cellKey: string;
    },
  ) {
    const game = this.getGame(client);
    game.placeProject(body.tileId, body.cellKey, client.id);
    this.gameInfoUpdate(client);
  }

  @ws.SubscribeMessage('chooseMarketTile')
  chooseMarketTile(
    @ws.ConnectedSocket() client: Socket,
    @ws.MessageBody() { tileId }: { tileId: number },
  ) {
    const game = this.getGame(client);
    game.chooseFromMarket(tileId, client.id);
    this.gameInfoUpdate(client);
  }

  putClientInRoom(
    @ws.ConnectedSocket() client,
    room: string,
  ) {
    client.data.gameRoom = room;
    client.join(room);
    const gameCreator = this.gameCreators.get(room);
    gameCreator.addPlayer(client.id);
    client.data.gameCreator = gameCreator;
    this.roomInfoUpdate(room);
  }

  gameInfoUpdate(@ws.ConnectedSocket() client: Socket) {
    const room = client.data.gameRoom;
    const state = client.data.game.state();
    this.io.to(room).emit('state', state);
  }

  async roomInfoUpdate(room: string) {
    const roommates = await this.findRoommatesInRoom(room);
    const gameCreator = this.gameCreators.get(room);
    const gameConfig = gameCreator.getConfig();
    this.io.to(room).emit('gameConfig', gameConfig);
    this.io.to(room).emit('room', room);
    this.io.to(room).emit('roommates', roommates);
  }

  findUserRoommates(@ws.ConnectedSocket() client) {
    return this.findRoommatesInRoom(client.data.gameRoom);
  }

  async findRoommatesInRoom(roomId: string) {
    const room = this.io.in(roomId);
    const sockets = await room.fetchSockets();
    return sockets.map((s) => s.id);
  }

  getGame(@ws.ConnectedSocket() client: Socket) {
    return client.data.game;
  }
}

const randomString = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();
