import init from './lib'
const promise = init()

async function main() {
  const {
    _add: add
  } = await promise
  
  const result = add(1, 2)
  document.getElementById('result')!.innerText = result.toString()
}

main()
