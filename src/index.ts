import { add } from './add'

async function main() {
  const result = await add(1, 2)
  document.getElementById('result')!.innerText = result.toString()
}

main()
