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
      function mitStyleGrant () {
        return select([
          (
            select([
              'Permission is hereby granted',
              'Permission is granted'
            ]) +
            ' to any person obtaining a copy of this software and associated documentation files'
          ),
          'You are hereby licensed',
          'You are licensed',
          'The copyright holders hereby grant you a license',
          'The copyright holders grant you a license'
        ]) +
        optional(', free of charge,') +
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
      },

      function bsdStyleGrant () {
        return 'Redistribution and use' +
        ' in source and binary forms,' +
        ' with or without modification,' +
        ' are permitted.'
      },

      function blueOakStyleGrant () {
        return 'The copyright holders license you' +
        ' to do everything with this software' +
        ' that would otherwise infringe their copyright in it,' +
        ' and to do everything with this software' +
        ' that would otherwise any patents they have on it.'
      }
    ]
  },

  {
    id: 'notice',
    alternatives: [
      function mitStyleNotice () {
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

      function bsdStyleNotice () {
        return 'Redistributions of source code' +
        ' must retain the above copyright notice' +
        ' and the text of this license.' +
        ' Redistributions in binary form' +
        ' must reproduce the above copyright notice' +
        ' and the text of this license' +
        ' in the documentation and/or other materials' +
        ' provided with the distribution.'
      },

      function blueOakStyleNotice () {
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
      function mitStyleDisclaimer () {
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
        optional(
          ', including but not limited to the warranties of ' +
          list('and', shuffle([
            'merchantability',
            'fitness for a particular purpose',
            'noninfringement'
          ]))
        ) +
        '.'
      },

      function bsdStyleDisclaimer () {
        return 'This software' +
        ' is provided by the copyright holders and contributors' +
        select([
          ' "as is"' +
          ' as is'
        ]) +
        ' and any ' +
        list(
          select(['or', 'and']),
          shuffle(['express', 'implied'])
        ) +
        ' warranties' +
        optional(
          ', including, but not limited to,' +
          ' the implied warranties of ' +
          list('and', shuffle([
            'merchantability',
            'fitness for a particular purpose'
          ])) +
          ','
        ) +
        ' are disclaimed. '
      },

      function blueOakStyleDisclaimer () {
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
      function mitStyleExclusion () {
        return 'In no event' +
        ' shall the authors or copyright holders' +
        ' be liable' +
        ' for any ' +
        select([
          'claim, damages',
          'damage, claim'
        ]) +
        ' or other liability,' +
        ' whether in an action of ' +
        select([
          'contract, tort',
          'tort, contract'
        ]) +
        ' or otherwise,' +
        ' arising from, out of or in connection with ' +
        list('or', shuffle([
          'this software',
          'the use or other dealings in this software'
        ])) +
        '.'
      },

      function bsdStyleExclusion () {
        return 'In no event' +
        ' shall the copyright holder or contributors' +
        ' be liable for any' +
        list('or', shuffle([
          'direct',
          'indirect',
          'incidental',
          'special',
          'exemplary',
          'consequential'
        ])) +
        ' damages' +
        optional(
          '(' +
          'including, but not limited to,' +
          list('or', shuffle([
            'procurement of ' +
            list('or', shuffle([
              'substitute goods', 'services'
            ])),
            'loss of ' +
            list('or', shuffle([
              'use', 'data', 'profits'
            ])),
            'business interruption'
          ])) +
          ')'
        ) +
        ' however caused and on any theory of liability' +
        ', whether in ' +
        list('or', shuffle([
          'contract',
          'strict liability',
          'tort (including negligence or otherwise)'
        ])) +
        ' arising in any way out of the use of this software' +
        ', even if advised of the possibility of such damage.'
      },

      function blueOakStyleExclusion () {
        return 'As far as the law allows,' +
        ' no contributor will be liable to anyone' +
        ' for any damages related to this software or this license,' +
        ' under any kind of legal claim' +
        '.'
      }
    ]
  }
]

function coinFlip () {
  return Math.random() >= 0.5
}

function optional (element) {
  if (coinFlip()) {
    return element
  } else {
    return ''
  }
}

function generateLicense () {
  var shuffled = [components[0]]
    .concat(shuffle(components.slice(1)))
  var selected = shuffled.map(function (component) {
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
  var text = selected.join('\n\n') + '\n'
  if (coinFlip()) {
    text = britify(text)
  }
  displayLicense(text)
}

function britify (string) {
  return string
    .replace(/license/g, 'licence')
    .replace(/License/g, 'Licence')
}

function displayLicense (text) {
  var license = document.getElementById('license')
  license.innerHTML = ''
  license.appendChild(document.createTextNode(text))
}

function list (conjunction, items) {
  var length = items.length
  if (length === 0) {
    return ''
  } else if (length === 1) {
    return items[0]
  } else if (length === 2) {
    return items[0] + ' ' + conjunction + ' ' + items[1]
  } else {
    return items.slice(0, length - 1).join(', ') + ', ' + conjunction + ' ' + items[items.length - 1]
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
