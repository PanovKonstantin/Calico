import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../../app/hooks";
import { makeMove } from "../api/makeMove";
import {
  selectChosenProjects,
  selectIsHoverOverHandList,
  selectSelectedFabricCell,
  selectSelectedInHand,
  selectSelectedMarketTile,
  selectSelectedProjectCell,
} from "./selectors";
import BoardType from "../types/board";
import CatType from "../types/cat";
import TileType, { ProjectTileType } from "../types/tile";
import gameStatuses from "../types/game_statuses";
import { placeProject } from "../api/placeProject";
import { chooseMarketTile } from "../api/chooseMarketTile";
import GameScore from "../types/game_score";

export type screens =
  | "welcome"
  | "creating"
  | "connecting"
  | "playing";
export interface GameState {
  socket_id: string | undefined;
  viewed_socket: string | undefined;
  room_id: string | undefined;
  roommates: string[];
  roommatesNames: { [id: string]: string };
  cats: CatType[];
  market: TileType[];
  userState: { [user: string]: UserState };
}

type UserState = {
  score: GameScore | undefined;
  selectedFabricCell: string | undefined;
  selectedProjectCell: string | undefined;
  selectedInHand: number | undefined;
  projectsToPlace: ProjectTileType[];
  selectedProject: number | undefined;
  selectedMarketTile: number | undefined;
  isHoverOverHandList: boolean;
  game_status: gameStatuses;
  fabricCells: BoardType;
  projectCells: BoardType;
  hand: TileType[];
};

export const defaultUserState: UserState = {
  score: { cats: 0, colors: 0, projects: 0, total: 0 },
  hand: [],
  game_status: "",
  fabricCells: {},
  projectCells: {},
  projectsToPlace: [],
  selectedFabricCell: undefined,
  selectedProjectCell: undefined,
  selectedInHand: undefined,
  selectedProject: undefined,
  selectedMarketTile: undefined,
  isHoverOverHandList: false,
};

const initialState: GameState = {
  socket_id: undefined,
  viewed_socket: undefined,
  room_id: undefined,
  roommates: [],
  roommatesNames: {},
  cats: [],
  market: [],
  userState: {},
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    roomIdSet: (state, action) => {
      state.room_id = action.payload;
    },

    socketConnected: (
      state,
      action: PayloadAction<string>
    ) => {
      state.socket_id = action.payload;
    },
    gameStateUpdated: (state, action) => {
      if (!state.socket_id) return;
      state.cats = action.payload.cats;
      state.market = action.payload.market;
      const sockets = Object.keys(
        action.payload.userStates
      );
      for (const socket of sockets) {
        const userState = action.payload.userStates[socket];
        state.userState = {
          ...state.userState,
          [socket]: {
            ...state.userState[socket],
            score: userState.score,
            game_status: userState.status,
            fabricCells: userState.board.fabricCells,
            projectCells: userState.board.projectCells,
            hand: userState.hand,
            projectsToPlace: userState.projects,
          },
        };
      }
    },
    fabricCellSelected: (state, action) => {
      if (!state.socket_id) return;
      const user = state.socket_id;
      const userState = state.userState[user];
      if (userState.selectedFabricCell)
        state.userState[user].fabricCells[
          userState.selectedFabricCell
        ].isSelected = false;
      state.userState[user].selectedFabricCell = undefined;
      if (!action.payload) return;

      state.userState[user].fabricCells[
        action.payload
      ].isSelected = true;
      state.userState[user].selectedFabricCell =
        action.payload;
    },
    projectCellSelected: (state, action) => {
      if (!state.socket_id) return;
      const user = state.socket_id;
      const userState = state.userState[user];
      if (userState.selectedProjectCell) {
        state.userState[user].projectCells[
          userState.selectedProjectCell
        ].isSelected = false;
      }
      state.userState[user].selectedProjectCell = undefined;
      if (!action.payload) return;
      state.userState[user].projectCells[
        action.payload
      ].isSelected = true;
      state.userState[user].selectedProjectCell =
        action.payload;
    },
    handTileSelected: (state, action) => {
      if (!state.socket_id) return;
      const user = state.socket_id;
      const userState = state.userState[user];
      if (userState.selectedInHand) {
        state.userState[user].hand[
          userState.selectedInHand
        ].isSelected = false;
      }
      state.userState[user].hand[
        action.payload
      ].isSelected = true;
      state.userState[user].selectedInHand = action.payload;
    },
    projectTileChosen: (
      state,
      { payload }: { payload: number | undefined }
    ) => {
      const user = state.socket_id;
      if (!user) return;
      state.userState[user].selectedProject = payload;
    },
    marketTileSelected: (state, action) => {
      const user = state.socket_id;
      if (!user) return;
      state.userState[user].selectedMarketTile =
        action.payload;
    },
    handListEntered: (state) => {
      const user = state.socket_id;
      if (!user) return;
      state.userState[user].isHoverOverHandList = true;
    },
    handListLeft: (state) => {
      const user = state.socket_id;
      if (!user) return;
      state.userState[user].isHoverOverHandList = false;
    },
    roommatesUpdated: (state, action) => {
      state.roommates = action.payload;
      action.payload.forEach(
        (roommate: string, index: number) => {
          state.roommatesNames[roommate] =
            roommate === state.socket_id
              ? "You"
              : `Player ${index + 1}`;
        }
      );
    },
    viewedSocketChanged: (state, action) => {
      state.viewed_socket = action.payload;
    },
  },
});

export const moveMade = createAppAsyncThunk(
  "game/moveMade",
  async (_, { getState }) => {
    const state = getState();
    if (state.game.socket_id !== state.game.viewed_socket)
      return;
    const cell = selectSelectedFabricCell(state);
    const hand = selectSelectedInHand(state);
    if (!cell || hand === undefined) return;
    makeMove(hand, cell);
  }
);

export const projectPlaced = createAppAsyncThunk(
  "game/placeProject",
  async (_, { getState }) => {
    const state = getState();
    if (state.game.socket_id !== state.game.viewed_socket)
      return;
    const cell = selectSelectedProjectCell(state);
    const project = selectChosenProjects(state);
    if (!cell || project === undefined) return;
    placeProject(project, cell);
  }
);

export const marketTileChosen = createAppAsyncThunk(
  "game/marketTileChosen",
  async (_, { getState }) => {
    const state = getState();
    if (state.game.socket_id !== state.game.viewed_socket)
      return;
    const tile = selectSelectedMarketTile(state);
    const isHoverOverHandList =
      selectIsHoverOverHandList(state);
    if (tile === undefined || !isHoverOverHandList) return;
    chooseMarketTile(tile);
  }
);

export const {
  socketConnected,
  roomIdSet,
  gameStateUpdated,
  fabricCellSelected,
  projectCellSelected,
  handTileSelected,
  projectTileChosen,
  marketTileSelected,
  handListEntered,
  handListLeft,
  roommatesUpdated,
  viewedSocketChanged,
} = gameSlice.actions;

const gameReducer = gameSlice.reducer;
export default gameReducer;
