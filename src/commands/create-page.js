module.exports = {
  name: 'create:page',
  description: 'Create new page inside src/pages.',
  run: async toolbox => {
    const { parameters, create } = toolbox

    let tmpName = parameters.first ? parameters.first.toString() : ''
    const name = tmpName.charAt(0).toUpperCase() + tmpName.slice(1)

    await create('src/pages', name)
  }
}
