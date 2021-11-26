# Installing Pyenv On macOS
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

The **pyenv** tool is one of the tools that lets you install different versions
of Python on your local machine and use the different ones on the command line.

It is basically **nvm**, but for Python.

Luckily, there's a Homebrew recipe for you.

```shell
brew install pyenv
```

Now, figure out what shell you're using. Open a Terminal and type `echo $SHELL`.
Find the section below that matches the output of that command.

## /bin/zsh

You need to update your **.zshrc** file to define the "PYENV_ROOT" environment
variable, and to add the executable directory to your path. Open your
**.zshrc**.

```shell
code ~/.zshrc
```

Then, in the file, add the following lines.

```shell
# Add pyenv executable directory to PATH
export PATH="$PYENV_ROOT/bin:$PATH"

# Initialize pyenv if it exists
if command -v pyenv 1>/dev/null 2>&1
then
  eval "$(pyenv init -)"
fi
```

## /bin/bash

You need to update your profile to define the "PYENV_ROOT" environment variable,
and to add the executable directory to your path.

Type `ls ~/.bash_profile`. Either you will see a file listed there _or_ you
will get an error message that reads "No such file or directory". If you get the
error message, type `ls ~/.profile`. You _should_ see a file name listed.

If you saw **/Users/your-user/.bash_profile**, then type this:

```shell
code ~/.bash_profile
```

If you saw **/Users/your-user/.profile**, then type this:

```shell
code ~/.profile
```

Then, in the file, add the following lines.

```shell
# Add pyenv executable directory to PATH
export PATH="$PYENV_ROOT/bin:$PATH"

# Initialize pyenv if it exists
if command -v pyenv 1>/dev/null 2>&1
then
  eval "$(pyenv init -)"
fi
```

## Everyone, altogether!

Close your Terminal and open a new one.

Now, install Python 3.8.3 as your default Python installation for **pyenv**.
This can take a while.

```
pyenv install 3.8.3
```

Now, set 3.8.3 as your default Python installation for **pyenv**.

```
pyenv global 3.8.3
```

Make sure that everything is now set by running `python --version`. You should
see "Python 3.8.3" get printed to your screen.
