#!/usr/bin/env sh
# Launches the debugger. This script must be in the same directory as the compiled .ez archives.

readlink_f () {
  cd "$(dirname "$1")" > /dev/null
  filename="$(basename "$1")"
  if [ -h "$filename" ]; then
    readlink_f "$(readlink "$filename")"
  else
    echo "`pwd -P`/$filename"
  fi
}

# HACK: We don't want Mix to load the mixfile in the cwd, so we override MIX_EXS here. We can
# restore it from ELIXIR_LS_MIX_EXS once we've launched.
export ELIXIR_LS_MIX_EXS=$MIX_EXS
export MIX_EXS="."

SCRIPT=$(readlink_f $0)
SCRIPTPATH=`dirname $SCRIPT`
export ERL_LIBS="$SCRIPTPATH:$ERL_LIBS"
mix elixir_ls.debugger
