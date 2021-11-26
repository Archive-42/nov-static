# Installing Pyenv On WSL
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

The **pyenv** tool is one of the tools that lets you install different versions
of Python on your local machine and use the different ones on the command line.

It is basically **nvm**, but for Python.

First, install the prerequisites you'll need to build different Python packages.
When prompted, tell Apt that, yes, you really do want to install those packages.

```shell
sudo apt-get update
sudo apt-get install --no-install-recommends make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
```

Once that finishes, install the **pyenv** code by cloning the GitHub repository
that hosts it. You can do that with the following command line.

```shell
$ git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

Once you have that, you need to update your **.bash_profile** file to define
the "PYENV_ROOT" environment variable, and to add the executable directory to
your path. Open your **.bash_profile**. (Note: If you have no **.bash_profile**
but you _do_ have a **.profile**, open that instead.)

```shell
code ~/.bash_profile
```

Then, in the file, add the following lines. If you cloned the repository into
a different path than **~/.pyenv**, then make sure that is the path you set for
"PYENV_ROOT".

```shell
# PYENV_ROOT used by pyenv to know where to look for its stuff
export PYENV_ROOT="$HOME/.pyenv"

# Add pyenv executable directory to PATH
export PATH="$PYENV_ROOT/bin:$PATH"

# Initialize pyenv if it exists
if command -v pyenv 1>/dev/null 2>&1
then
  eval "$(pyenv init -)"
fi
```

Close your Terminal and open a new one. You should see no errors in the Terminal
when it starts.

Now, install Python 3.8. This can take a while.

```
pyenv install 3.8.3
```

Now, set 3.8.3 as your default Python installation for **pyenv**.

```
pyenv global 3.8.3
```

Make sure that everything is now set by running `python --version`. You should
see "Python 3.8.3" get printed to your screen.
