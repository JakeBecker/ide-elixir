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

  getInitializeParams(projectPath, process) {
    return Object.assign(super.getInitializeParams(projectPath, process), {
      capabilities: {
        textDocument: {
          completion: {
            completionItem: {
              snippetSupport: false
            }
          }
        }
      }
    });
  }

  startServerProcess() {
    const command = os.platform() == "win32" ? "mix.bat" : "mix";
    const elixirLsPath = path.resolve(__dirname, "../elixir-ls-release");
    const env = Object.assign({}, process.env, { ERL_LIBS: elixirLsPath });
    return cp.spawn(command, ["elixir_ls.language_server"], { env: env });
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
