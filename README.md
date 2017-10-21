# Atom IDE plugin for Elixir, powered by ElixirLS

**This plugin isn't yet ready for production.**

Provides an [Atom IDE](https://ide.atom.io/) extension for Elixir, powered by [ElixirLS](https://github.com/JakeBecker/elixir-ls). To use it, you must first install one of [atom-ide-ui](https://atom.io/packages/atom-ide-ui) or [nuclide](https://atom.io/packages/nuclide).

To develop, make sure you check out this repo recursively because it contains ElixirLS as a Git submodule. Run `./build.sh` to compile ElixirLS into the `elixir-ls-release` folder where the extension will look for it.
