module.exports = {
  name: 'create:component',
  description: 'Create new component inside src/components.',
  run: async toolbox => {
    const {
      parameters,
      template,
      print: { success, error }
    } = toolbox

    try {
      let tmpName = parameters.first ? parameters.first.toString() : ''
      const name = tmpName.charAt(0).toUpperCase() + tmpName.slice(1)

      const styled = parameters.options.styled
      const isReactNative = parameters.options.rn

      if (!name) {
        error('Error: Component name needs to be specified.')
        return
      }

      if (styled) {
        await template.generate({
          template: 'component.js.ejs',
          target: `src/components/${name}/index.js`,
          props: { name: name }
        })

        if (isReactNative) {
          await template.generate({
            template: 'styles-rn.js.ejs',
            target: `src/components/${name}/styles.js`,
            props: { name: name }
          })
        } else {
          await template.generate({
            template: 'styles-react.js.ejs',
            target: `src/components/${name}/styles.js`,
            props: { name: name }
          })
        }
      } else {
        if(isReactNative){
          await template.generate({
            template: 'component-style-sheet.js.ejs',
            target: `src/components/${name}/index.js`,
            props: { name: name }
          })
          await template.generate({
            template: 'styleSheet.js.ejs',
            target: `src/components/${name}/styles.js`,
            props: { name: name }
          })
        } else {
          await template.generate({
            template: 'component-css.js.ejs',
            target: `src/components/${name}/index.js`,
            props: { name: name }
          })
          await template.generate({
            template: 'styles.css.ejs',
            target: `src/components/${name}/styles.css`,
            props: { name: name }
          })
        }
      }

      success(`${name} component successfully created.`)
    } catch (err) {
      error('Error when creating the component, try again.')
    }
  }
}
