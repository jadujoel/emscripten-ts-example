import init from './add.mjs'
const promise = init()
export async function add(a: number, b: number) {
  const { _add } = await promise
  return _add(a, b)
}
