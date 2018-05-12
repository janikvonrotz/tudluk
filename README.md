# tudluk

*A digital bookshelf generator for the 21th century.*

Tudluk creates a static html page that showcases your favorite books. You can then use headless chrome to take a screenshot of the page and create a beautiful poster.

## Example

Below is a scaled screenshot of the example bookshelf page.

![](https://raw.githubusercontent.com/janikvonrotz/tudluk/master/screenshot.png)

## Installation

Use [yarn](https://yarnpkg.com/lang/en/) or [node](https://nodejs.org/en/) to install the project dependencies.

Open the `bookshelf.md` and add your books metadata.

Make sure that the configurations in `config.json` are correct.

Build the html poster page and run a static web server with `yarn start`.

Open `http://localhost` in your bowser and be amazed.

Use headless chrome to take a screenshot.

* On Windows run this PowerShell command:

`& "C:\Program Files (x86)\Google\Chrome\Application\chrome" --headless --disable-gpu --screenshot=C:\Users\_USERNAME_\screenshot.png  --hide-scrollbars --window-size=5020,2460 http://localhost`

* On Mac OS run this Bash command:

`/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --disable-gpu --screenshot=/Users/_USERNAME_/screenshot.png  --hide-scrollbars --window-size=5020,2460 http://localhost`

You may have to adjust the best `--window-size` settings for a perfect screenshot.