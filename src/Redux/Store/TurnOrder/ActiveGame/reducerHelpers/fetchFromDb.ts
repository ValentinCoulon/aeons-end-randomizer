import { loop, Cmd } from 'redux-loop'
import { get as getFromDb } from 'idb-keyval'

import { State } from '../types'
import { TURNORDER_GAME_DB_KEY } from '../constants'
import { actions } from '../actions'

export const fetchFromDb = (state: State) => {
  return loop(
    state,
    Cmd.run(getFromDb, {
      args: [TURNORDER_GAME_DB_KEY],
      successActionCreator: actions.fetchFromDBSuccessful,
      failActionCreator: actions.fetchFromDBFailed,
    })
  )
}

export const fetchFromDbSuccess = (
  state: State,
  action: ReturnType<typeof actions.fetchFromDBSuccessful>
) => {
  // If the fetched state somehow is undefined just take the current state instead
  const newState = action.payload || state
  return newState
}
