# n-myft-dropdown

[![CircleCI](https://circleci.com/gh/Financial-Times/n-myft-dropdown/tree/main.svg?style=svg&circle-token=c8fadb39490fb006ccb9c3f26b2b05da02c0fcca)](https://circleci.com/gh/Financial-Times/n-myft-dropdown/tree/main)

Client side component to create a dropdown menu from the myFT icon.

This is a test component, that will be integrated with Page Kit and Origami if proved successful.

It's anticipated that this will be present on 2 apps:

- next-article
- next-home-page

## How to use in a consuming app

In client/main.js, import the component, check for whether the `myFTDropdownTest` flag is set to variant, and initialise the component if so:

```
import * as myFtDropdown from '@financial-times/n-myft-dropdown';

flags.get('myFTDropdownTest' === 'variant) {
	myFtDropdown.init();
}
```

Import the styles into main.scss, as set the min width for desktop styling (to match the rest of the app):
```
@import '@financial-times/n-myft-dropdown/main';
```

## Developing

To run locally:
```
git clone git@github.com:Financial-Times/n-myft-dropdown.git
cd n-myft-dropdown
npm install
npm link
```

If you would like to see your changes in a local app, run `npm link @financial-times/n-myft-dropdown` in the consuming app, and ensure that the code described in "How to use in a consuming app" is present.

To run the demo page:
```
npm run demo
```

When you run this command, it starts two processes: one with Node running an express server to serve the demo page on `http://localhost:3000`, and the other one with the `WebpackWatch` task to watch for changes on the `css`, `js` files.