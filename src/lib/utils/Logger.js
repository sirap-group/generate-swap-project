import inspect from 'prettier-inspect'
import debug from 'debug'

const log = ::console.log
const logErr = ::console.error

debug.formatters.i = v => inspect(v)

export default class Logger {
  constructor (name) {
    this._info = debug(`${name}:INFO`)
    this._warn = debug(`${name}:WARN`)
    this._debug = debug(`${name}:DEBUG`)
    this._error = debug(`${name}:ERROR`)

    this._info.log = log
    this._warn.log = log
    this._debug.log = log
    this._error.log = logErr
  }

  info () {
    ::this._info(...arguments)
  }

  warn () {
    ::this._warn(...arguments)
  }

  debug () {
    ::this._debug(inspect(...arguments))
  }

  error () {
    ::this._error(inspect(...arguments))
  }
}
