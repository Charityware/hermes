# Luxo
[![NPM](https://nodei.co/npm/luxo.png)](https://www.npmjs.com/package/luxo)

[![npm version](https://badge.fury.io/js/luxo.svg)](https://www.npmjs.com/package/luxo)
[![](https://img.shields.io/badge/such-badge-brightgreen.svg)](https://charityware.co)

A simple message component for reactjs. Forked from [react-crouton](https://github.com/xeodou/react-crouton).

## Getting Started

Install via [npm](http://npmjs.org/luxo)

```
   npm i luxo --save

```

## Usage

```Javascript
var Luxo = require('luxo')

var data = {
    id: Date.now(),
    type: 'error',
    message: 'Hello Luxo!',
    autoDismiss: true || false,
    onDismiss: listener,
    buttons: [{
        name: 'close',
        listener: function() {
        }
    }],
    hidden: false,
    timeout: 2000
}

<Luxo
    id={data.id}
    type={data.type}
    message={data.message}
    onDismiss={data.onDismiss}
    buttons={data.buttons}
    hidden={data.hidden}
    timeout={data.timeout}
    autoDismiss={data.autoDismiss}/>
```

## Component Options

**`id`** required, every message need an unique id. You can use something like [Chance](https://www.npmjs.com/package/chance) to generate random integers if you are so inclined

type: `number`

**`message`** required, the type of message that you'll be sending. You can provide either a single string or array of strings. If you provide multiple strings, each message will get it's own div. This could be useful if you need to provide a series of messages at once but have them display within one notification.

type: `string` || `array`

example:

```
message: 'Hello React-Luxo'
message: ['You did something', 'You did something else!', 'This is fun']
```

**`type`** required, define what type message you want to create. This will be the `className` that gets set on a message. You could easily set up some nice nested LESS/SCSS styling that would let you create some custom styling for different message types.

type: `string`

**`hidden`** optional, control this property to hide or show a Luxo component.

type: `boolean`, default is `false`

**`autoDismiss`** optional, Luxo will auto-dismiss if set this proptety; defaults to true.

type: `boolean`

**`timeout`** optional, set how long (ms) to auto-dismiss the Luxo component.

type: `number`, default is `3000` ms (3 seconds)

**`onDismiss`** optional, Luxo will invoke this listener when it dismissed.

type: `function`

## License

MIT

####TODO:
- new API for buttons
- better tests
- provide several css libs to give you an out-of-the-box solution
