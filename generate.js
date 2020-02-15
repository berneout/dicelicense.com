const _ = require('underscore')
const fs = require('fs')
const path = require('path')
const spellings = require('./spellings')

const components = {}
const componentNames = fs.readdirSync('data')
componentNames.forEach(componentName => {
  components[componentName] = fs.readdirSync(path.join('data', componentName))
    .map(fileName => fs.readFileSync(path.join('data', componentName, fileName), 'utf8'))
})

module.exports = () => {
  const selectedComponents = []
  _.shuffle(componentNames.slice(0)).forEach(componentName => {
    selectedComponents.push(_.sample(components[componentName]))
  })
  let text = selectedComponents.join('\n')
  if (_.random(1) === 1) {
    text = britishify(text)
  }
  return text
}

function britishify (text) {
  spellings.american.forEach((american, index) => {
    const british = spellings.british[index]
    text = text.split(american).join(british)
  })
  return text
}

if (module.parent === null) {
  process.stdout.write(module.exports())
}
