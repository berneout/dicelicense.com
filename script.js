document.addEventListener('DOMContentLoaded', function () {
  addRegenerateButton()
  addLicenseElement()
  generateLicense()
})

function addRegenerateButton () {
  var main = document.getElementById('main')
  var button = document.createElement('button')
  button.appendChild(document.createTextNode('Regenerate'))
  button.addEventListener('click', function () {
    generateLicense()
  })
  main.appendChild(button)
}

function addLicenseElement () {
  var main = document.getElementById('main')
  var pre = document.createElement('pre')
  pre.id = 'license'
  main.appendChild(pre)
}

var components = [
  {
    id: 'copyright',
    alternatives: [
      function () {
        return 'Copyright' +
          optional(' (c)') +
          ' {copyright holders}'
      }
    ]
  },

  {
    id: 'grant',
    alternatives: [
      function () {
        return select([
          'Permission is hereby granted',
          'Permission is granted',
          'You are hereby licensed',
          'You are licensed',
          'The copyright holders hereby grant you a license',
          'The copyright holders grant you a license'
        ]) +
        optional(', free of charge,') +
        ' to any person obtaining a copy of this software and associated documentation files,' +
        ' to deal in this software without restriction' +
        optional(
          ', including without limitation the rights to ' +
          list('and/or', shuffle([
            'use',
            'copy',
            'modify',
            'merge',
            'publish',
            'distribute',
            'sublicense',
            'sell copies of'
          ])) +
          ' this software'
        ) +
        '.'
      }
    ]
  },

  {
    id: 'notice',
    alternatives: [
      function () {
        return 'The above copyright notice' +
        select([
          ' and the text of this license',
          ' and this permission notice (including the next paragraph)'
        ]) +
        select([
          ' shall',
          ' must',
          ' have to be',
          ' are required to be'
        ]) +
        ' be included in all copies or substantial portions of this software' +
        '.'
      },

      function () {
        return 'You must ensure' +
        ' that everyone who gets a copy' +
        ' of any part of this software from you,' +
        ' with or without changes,' +
        ' also gets the text of this license' +
        '.'
      }
    ]
  },

  {
    id: 'disclaimer',
    conspicuous: true,
    alternatives: [
      function () {
        return 'This software' +
        select([
          ' is provided "as is",', ' is provided as is,',
          ' comes "as is",',
          ' comes as is,'
        ]) +
        ' without warranty' +
        optional(' or condition') +
        optional(' of any kind') +
        optional(', express or implied') +
        optional(', including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement') +
        '.'
      },

      function () {
        return select([
          'As far as the law allows',
          'To the fullest legal extent',
          (
            select([
              'To the limits of',
              'Within the limits of'
            ]) +
            select([
              ' applicable law',
              ' the law'
            ])
          )
        ]) +
        ', this software comes as is, without any warranty' +
        optional(' or condition') +
        '.'
      }
    ]
  },

  {
    id: 'exclusion',
    conspicuous: true,
    alternatives: [
      function () {
        return 'In no event' +
        ' shall the authors or copyright holders' +
        ' be liable' +
        ' for any claim, damages or other liability,' +
        ' whether in an action of contract, tort or otherwise,' +
        ' arising from, out of or in connection with the software or the use or other dealings in the software' +
        '.'
      },

      function () {
        return 'As far as the law allows,' +
        ' no contributor will be liable to anyone' +
        ' for any damages related to this software or this license,' +
        ' under any kind of legal claim' +
        '.'
      }
    ]
  }
]

function optional (element) {
  if (Math.random() >= 0.5) {
    return element
  } else {
    return ''
  }
}

function generateLicense () {
  var selected = components.map(function (component) {
    var alternative = select(component.alternatives)
    var type = typeof alternative
    var text
    if (type === 'string') {
      text = alternative
    } else if (type === 'function') {
      text = alternative()
    }
    if (component.conspicuous) {
      text = text.toUpperCase()
    }
    return text
  })
  displayLicense(selected.join('\n\n') + '\n')
}

function displayLicense (text) {
  var license = document.getElementById('license')
  license.innerHTML = ''
  license.appendChild(document.createTextNode(text))
}

function list (conjunction, words) {
  var length = words.length
  if (length === 0) {
    return ''
  } else if (length === 1) {
    return words[0]
  } else if (length === 2) {
    return words[0] + ' ' + conjunction + ' ' + words[1]
  } else {
    return words.slice(0, length - 1).join(', ') + ', ' + conjunction + ' ' + words[words.length - 1]
  }
}

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function select (array) {
  return array[random(0, array.length - 1)]
}

function shuffle (array) {
  var length = array.length
  var last = length - 1
  for (var index = 0; index < length; index++) {
    var rand = random(index, last)
    var temp = array[index]
    array[index] = array[rand]
    array[rand] = temp
  }
  return array
}
