export const logger = state => next => async action => {
  console.log(action.type, state, action.payload)
  return next(action)
}
