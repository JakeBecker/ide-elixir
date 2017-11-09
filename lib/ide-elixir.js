const {AutoLanguageClient} = require('atom-languageclient')
const path = require('path')
const cp = require('child_process')
const { URL } = require('url');

class ElixirLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.elixir' ] }
  getLanguageName () { return 'Elixir' }
  getServerName () { return 'ElixirLS' }

  startServerProcess () {
    const elixirLsPath = path.resolve(__dirname, "../elixir-ls-release");
    const env = Object.assign({}, process.env, {ERL_LIBS: elixirLsPath});
    return cp.spawn("mix", ["elixir_ls.language_server"], {env: env});
  }

  postInitialization({ connection }) {
    this._disposable.add(
      atom.config.observe("ide-elixir.elixirLS", params => {
        connection.didChangeConfiguration({
          settings: { elixirLS: params }
        });
      })
    );
  }
}

module.exports = new ElixirLanguageClient();
