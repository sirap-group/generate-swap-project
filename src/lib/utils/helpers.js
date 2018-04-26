export function escapeQuotes (str) {
  return str.replace(/\\?"/g, '\\"')
}

export function camelcase (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
  }).replace(/\s+/g, '')
}

export function unescapeTemplateLitterals (str) {
  return str.replace(/#{/g, '${')
}
