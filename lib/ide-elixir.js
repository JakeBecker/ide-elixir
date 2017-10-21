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
    return cp.exec("./exscript.sh language_server", {cwd: elixirLsPath});
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

  getInitializeParams(projectPath, process) {
    var rootUri = new URL(projectPath, "file://").toString();
    if (rootUri.endsWith('/')) {
      rootUri = rootUri.slice(0, -1);
    };

    return {
      processId: process.pid,
      capabilities: {},
      rootUri: rootUri
    };
  }
}

module.exports = new ElixirLanguageClient();
