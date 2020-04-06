module.exports = toolbox => {
  const {
    print: { success, error },
    parameters,
    template
  } = toolbox

  const create = async (folder, name) => {
    try {
      const styled = parameters.options.styled
      const isReactNative = parameters.options.native

      let command = ''

      if (parameters.command === 'create:component') {
        command = 'component'
      } else if (parameters.command === 'create:page') {
        command = 'page'
      }

      if (!name) {
        error('Error: Name needs to be specified.')
        return
      }

      if (styled) {
        await template.generate({
          template: 'component.js.ejs',
          target: `${folder}/${name}/index.js`,
          props: { name: name }
        })

        if (isReactNative) {
          await template.generate({
            template: 'styles-rn.js.ejs',
            target: `${folder}/${name}/styles.js`,
            props: { name }
          })
        } else {
          await template.generate({
            template: 'styles-react.js.ejs',
            target: `${folder}/${name}/styles.js`,
            props: { name }
          })
        }
      } else {
        if (isReactNative) {
          await template.generate({
            template: 'component-style-sheet.js.ejs',
            target: `${folder}/${name}/index.js`,
            props: { name }
          })
          await template.generate({
            template: 'styleSheet.js.ejs',
            target: `${folder}/${name}/styles.js`,
            props: { name }
          })
        } else {
          await template.generate({
            template: 'component-css.js.ejs',
            target: `${folder}/${name}/index.js`,
            props: { name }
          })
          await template.generate({
            template: 'styles.css.ejs',
            target: `${folder}/${name}/styles.css`,
            props: { name }
          })
        }
      }

      success(`${name} ${command} successfully created.`)
    } catch (err) {
      error(`Error when creating the ${command}, try again.`)
    }
  }

  toolbox.create = create
}
