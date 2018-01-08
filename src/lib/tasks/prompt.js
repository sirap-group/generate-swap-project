/**
 * Prompts for commonly used data. This task isn't necessary
 * needed, it's more of a convenience for asking questions up front,
 * instead of as files are generated. The actual messages for questions
 * can be found in the [common-questions][] library.
 *
 * ```sh
 * $ gen project:prompt
 * ```
 * @name project:prompt
 * @api public
 * @todo to use radio or other custom prompt:
 * @see https://github.com/enquirer/prompt-radio/issues/3
 */
export default app => {
  return done => {
    if (app.options.prompt === false) return done()

    app.base.data(app.cache.data)
    app.base.set('cache.prompted', true)

    // @todo skip if answer exist in cache
    // const skipCondition = app.option('hints') === false || app.option('skip') === false

    app.on('answer', function (response, key, question, answers) {
      // console.log({response, key, question, answers})
    })

    let name, defaultHost, files, authorName

    app.question('name', {
      message: 'Project name ?',
      default: 'my-swap-app'
    })
    askPromise(['name'])
    .then(answers => {
      name = answers.name
      app.base.data({name})

      app.question('dest', {
        message: 'Project directory ?',
        default: name
      })
      app.question('description', {
        message: 'Description ?',
        default: `${name} SWAP app`
      })
      app.choices('githosts', {
        message: 'Git host platform ?',
        choices: ['github.com', 'gitlab.sirap.fr', 'gitlab.com']
      })
      app.question('author.username', {
        message: 'Author username ?'
      })
      app.question('author.name', {
        message: 'Author name ?'
      })

      // const {dest, description, githosts, owner} = await askPromise(['dest', 'description', 'githosts', 'owner'])
      return askPromise(['dest', 'description', 'githosts', 'author.username', 'author.name'])
    })
    .then(answers => {
      const {githosts} = answers
      defaultHost = (githosts.length > 1) ? 'github.com' : githosts[0]
      app.base.data(answers)

      app.question('owner', {
        message: `Owner (author or organisation) ?`,
        default: authorName
      })
      app.question('namespace', {
        message: 'Project namespace ?',
        default: answers.owner
      })

      return askPromise(['owner', 'namespace'])
    })
    .then(({owner, namespace}) => {
      app.base.data({owner, namespace})

      const defaultHomepage = defaultHost === 'github.com'
        ? `https://github.com/${namespace}/${name}`
        : `https://gitlab.sirap.fr/${namespace}/${name}`
      app.question('homepage', {
        message: 'Project homepage ?',
        default: defaultHomepage
      })

      const defaultIssues = defaultHost === 'github.com'
        ? `https://github.com/${namespace}/${name}/issues`
        : `https://gitlab.sirap.fr/${namespace}/${name}/issues`
      const defaultRepository = defaultHost === 'github.com'
        ? `git@github.com:${namespace}/${name}.git`
        : `git@gitlab.sirap.fr:${namespace}/${name}.git`

      app.question('issues', {
        message: 'Issues URL ?',
        default: defaultIssues
      })
      app.question('repository', {
        message: 'Repository URL ?',
        default: defaultRepository
      })
      app.question('version', {
        message: 'Version ?',
        default: '0.1.0'
      })
      app.question('license', {
        message: 'License ?',
        default: defaultHost === 'github.com' ? 'MIT' : 'UNLICENSED'
      })

      return askPromise([ 'homepage', 'issues', 'repository', 'version', 'license', 'author.name', 'author.username' ])
    })
    .then(answers => {
      app.base.data(answers)

      const authorUsername = answers.author.username
      const defaultAuthorUrl = defaultHost === 'github.com'
        ? `https://github.com/${authorUsername}`
        : `https://gitlab.sirap.fr/${authorUsername}`

      app.question('author.url', {
        message: 'Author URL ?',
        default: defaultAuthorUrl
      })
      app.question('author.twitter', {
        message: 'Twitter URL ?',
        default: `https://twitter.com/${authorUsername}`
      })

      return askPromise(['author.url', 'author.twitter'])
    })
    .then(answers => {
      app.base.data(answers)

      app.question('main', {
        message: 'Main file ?',
        default: 'index.js'
      })

      return askPromise(['main'])
    })
    .then(({main}) => {
      app.base.data({main})

      const defaultFiles = [
        main,
        'LICENSE',
        'README.md',
        'dist/',
        'package.json',
        'yarn.lock'
      ]
      app.choices('files', {
        message: 'Packaged files ?',
        choices: defaultFiles
      })

      return askPromise(['files'])
    })
    .then(answers => {
      files = answers.files

      app.question('additionnalFiles', {
        message: 'Additionnal files (comma separated) ?'
      })

      return askPromise('additionnalFiles')
    })
    .then(({additionnalFiles}) => {
      if (additionnalFiles && additionnalFiles.length) {
        additionnalFiles.split(',')
        .map(s => s.trim())
        .forEach(adFile => files.push(adFile))
      }

      app.base.data({files})

      const defaultKeywords = [
        'SWAP',
        'SWAP App'
      ]
      app.choices('keywords', {
        message: 'Keywords ?',
        choices: defaultKeywords
      })
      app.question('additionnalKeywords', {
        message: 'Additionnal keywords (comma separated) ?'
      })

      return askPromise(['keywords', 'additionnalKeywords'])
    })
    .then(({keywords, additionnalKeywords}) => {
      if (additionnalKeywords && additionnalKeywords.length) {
        additionnalKeywords.split(',')
        .map(s => s.trim())
        .forEach(adKeyword => keywords.push(adKeyword))
      }

      app.base.data({keywords})
    })
    .then(() => done())
    .catch(err => done(err))
  }

  async function askPromise (keys) {
    return new Promise((resolve, reject) => {
      app.ask(keys, (err, answers) => {
        if (err) {
          reject(err)
        } else {
          resolve(answers)
        }
      })
    })
  }
}
