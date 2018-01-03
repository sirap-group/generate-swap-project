'use strict'

export { escapeQuotes }

function escapeQuotes (str) {
  return str.replace(/\\?"/g, '\\"')
}
