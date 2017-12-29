import inspect from 'prettier-inspect'
import debug from 'debug'

debug.formatters.i = v => inspect(v)

export default class Logger {
  constructor (name) {
    this.infoLogger = debug(`${name}:INFO`)
    this.warnLogger = debug(`${name}:WARN`)
    this.debugLogger = debug(`${name}:DEBUG`)
    this.errorLogger = debug(`${name}:ERROR`)

    this.infoLogger.log = ::console.log
    this.infoLogger.log = ::console.log
    this.warnLogger.log = ::console.log
    this.debugLogger.log = ::console.log
    this.errorLogger.log = ::console.error
  }

  info (...args) {
    this.infoLogger.apply(this.infoLogger, args)
  }

  debug (...args) {
    this.debugLogger.apply(this.debugLogger, args)
  }

  warn (...args) {
    this.warnLogger.apply(this.warnLogger, args)
  }

  error (...args) {
    this.errorLogger.apply(this.errorLogger, args)
  }
}
