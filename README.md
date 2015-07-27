# Luxo

> A message component for reactjs

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

## Options

**id** required, every message need an unique id. You can use something like [Chance](https://www.npmjs.com/package/chance) to generate random integers if you so incline

type: `number`

**message** required, the type of message that you'll

type: `string` || `array`

example:

```
message: 'Hello React-Luxo'
message: ['Hello', 'React', '-', 'Luxo']
```

**type** required, define what type message you want to define.

type: `string`

**hidden** optional, control this property to show or hide a Luxo component.

type: `boolean`, default is `false`

**buttons** optional, define the buttons that you want show to the user.

type: `string` || `array`

example:

```
buttons: 'close'
butons: [{
    name: 'close'
}]
butons: [{
    name: 'close',
    listener: function() {
        console.log('close button clicked.')
    }
}]
butons: [{
    name: 'close',
    className: 'custom class name',
    listener: function() {
        console.log('close button clicked.')
    }
}]
```

**autoDismiss** optional, Luxo will auto-dismiss if set this propterty, default is true.

type: `boolean`

**timeout** optional, set how long (ms) to auto-dismiss the Luxo.

type: `number`, default is `2000` ms (2 seconds)

**onDismiss** optional, Luxo will invoke this listener when it dismissed.

type: `function`

## License

MIT
