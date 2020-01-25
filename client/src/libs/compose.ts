export const compose = (...funcs: Function[]): Function => {
  return funcs.reduce((a, b) => (...args: any) => a(b(...args)))
}
