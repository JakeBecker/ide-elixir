const { AutoLanguageClient } = require("atom-languageclient");
const path = require("path");
const cp = require("child_process");
const { URL } = require("url");
const os = require("os");

class ElixirLanguageClient extends AutoLanguageClient {
  getGrammarScopes() {
    return ["source.elixir"];
  }
  getLanguageName() {
    return "Elixir";
  }
  getServerName() {
    return "ElixirLS";
  }

  startServerProcess(projectPath) {
    const command = os.platform() == "win32" ? "language_server.bat" : "language_server.sh";
    const elixirLsPath = path.resolve(__dirname, "../elixir-ls-release/" + command);
    return cp.spawn(elixirLsPath, [], {cwd: projectPath});
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
