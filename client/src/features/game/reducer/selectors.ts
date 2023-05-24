import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { CellMap } from "../types/cell";
import GameScore from "../types/game_score";
import gameStatuses from "../types/game_statuses";
import { defaultUserState } from "./actions";

export const selectSocket = (state: RootState) =>
  state.game.socket_id;

export const selectCats = (state: RootState) =>
  state.game.cats;

export const selectBoard = (state: RootState) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user]) return {};
  return {
    ...state.game.userState[user].fabricCells,
    ...state.game.userState[user].projectCells,
  };
};
export const selectFabric = (state: RootState) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.fabricCells;
  return state.game.userState[user].fabricCells;
};

export const selectProjects = (state: RootState) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.projectCells;
  return state.game.userState[user].projectCells;
};

export const selectHand = (state: RootState) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.hand;
  return state.game.userState[user].hand;
};

export const selectMarket = (state: RootState) =>
  state.game.market;

export const selectSelectedFabricCell = (
  state: RootState
) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.selectedFabricCell;
  return state.game.userState[user].selectedFabricCell;
};

export const selectSelectedProjectCell = (
  state: RootState
) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.selectedProjectCell;
  return state.game.userState[user].selectedProjectCell;
};

export const selectSelectedInHand = (state: RootState) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.selectedInHand;
  return state.game.userState[user].selectedInHand;
};

export const joinCellKeys = (keys: CellMap) =>
  Object.keys(keys).join(".");
export const selectJoinedFabric = createSelector(
  [selectFabric],
  joinCellKeys
);

export const selectJoinedProject = createSelector(
  [selectProjects],
  joinCellKeys
);

export const selectCatsLevels = createSelector(
  selectCats,
  (cats) => Object.keys(cats).join(".")
);

export const selectAllStatuses = (state: RootState) => {
  return Object.values(state.game.userState).map(
    (v) => v.game_status
  );
};
export const selectGameStatus = (
  state: RootState
): gameStatuses => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.game_status;
  return state.game.userState[user].game_status;
};

export const selectProjectsToPlace = (state: RootState) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.projectsToPlace;
  return state.game.userState[user].projectsToPlace;
};

export const selectChosenProjects = (state: RootState) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.selectedProject;
  return state.game.userState[user].selectedProject;
};

export const selectSelectedMarketTile = (
  state: RootState
) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.selectedMarketTile;
  return state.game.userState[user].selectedMarketTile;
};

export const selectIsHoverOverHandList = (
  state: RootState
) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.isHoverOverHandList;
  return state.game.userState[user].isHoverOverHandList;
};

export const selectUserScore = (state: RootState) => {
  const user = state.game.viewed_socket;
  if (!user || !state.game.userState[user])
    return defaultUserState.score;
  return state.game.userState[user].score;
};

export const selectScores = (state: RootState) => {
  const scores: { [user: string]: GameScore } = {};
  console.log(state.game.userState);
  
  for (const user in state.game.userState) {
    if (
      Object.prototype.hasOwnProperty.call(
        state.game.userState,
        user
      )
    ) {
      const score = state.game.userState[user].score;
      if (score) {
        scores[user] = score;
      }
    }
  }
  return scores;
};

export const selectRoomId = (state: RootState) =>
  state.game.room_id;

export const selectRoommates = (state: RootState) =>
  state.game.roommates;

export const selectRoommatesNames = (state: RootState) =>
  state.game.roommatesNames;

export const selecetViewedSocket = (state: RootState) =>
  state.game.viewed_socket;
