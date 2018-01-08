'use strict'

export { escapeQuotes, camelcase }

function escapeQuotes (str) {
  return str.replace(/\\?"/g, '\\"')
}

function camelcase (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
  }).replace(/\s+/g, '')
}
