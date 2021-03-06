module.exports = {
  name: 'create:component',
  description: 'Create new component inside src/components.',
  run: async toolbox => {
    const { parameters, create } = toolbox

    let tmpName = parameters.first ? parameters.first.toString() : ''
    const name = tmpName.charAt(0).toUpperCase() + tmpName.slice(1)

    await create('src/components', name)
  }
}
