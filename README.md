# Atom IDE plugin for Elixir, powered by ElixirLS

Provides an [Atom IDE](https://ide.atom.io/) extension for Elixir, powered by [ElixirLS](https://github.com/JakeBecker/elixir-ls). To use it, you must first install one of [atom-ide-ui](https://atom.io/packages/atom-ide-ui) or [nuclide](https://atom.io/packages/nuclide).

**This is an early release. For a more complete and stable Elixir IDE, try [vscode-elixir-ls](https://github.com/JakeBecker/vscode-elixir-ls)**

![Screenshot](https://raw.githubusercontent.com/JakeBecker/ide-elixir/master/images/screenshot.png)

## Installation

- Install Elixir >= 1.6
- Either `apm install atom-ide-ui` OR `apm install nuclide`
- `apm install ide-elixir`

## Features

Supported ElixirLS features:

- Automatic, incremental Dialyzer analysis (requires Erlang OTP 20)
- Inline reporting of build warnings and errors (requires Elixir >= 1.6)
- Documentation lookup on hover
- Go-to-definition
- Code completion
- Code formatter (requires Elixir >= 1.6)
- Signature help

Unsupported features:

- Debugger
- Output log

## Building and running

To develop, make sure you check out this repo recursively because it contains ElixirLS as a Git submodule. Run `npm run prepare` to compile ElixirLS into the `elixir-ls-release` folder where the extension will look for it.

Unfortunately, Atom's package manager `apm` does not allow packaging of untracked files, which means that the compiled `.ez` archives from ElixirLS have to be committed. (See [issue #498](https://github.com/atom/apm/issues/498))
