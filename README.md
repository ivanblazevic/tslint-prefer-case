# TSLint rules for members casing

## Force typescript members case

You want to force PascalCase for enums, camelCase for strings?

This plugin includes set of rules for different member types!

## Usage

### Install from NPM to your Dev Dependencies

```console
npm install --save-dev tslint-prefer-case
```

### Or install from Yarn to your Dev Dependencies

```console
yarn add tslint-prefer-case --dev
```

### Configure TSLint to use `tslint-prefer-case`:

In your `tslint.json` file, source the rules from this package, e.g:

```json
{
  "extends": ["tslint-prefer-case"],
  "rules": {
    "prefer-enum-case": [true, "pascal"]
  }
}
```

## Contributing

Bugs, rules requests, doubts etc., open a Github [Issue].

## LICENSE

MIT

[issue]: https://github.com/ivanblazevic/tslint-prefer-case/issues/new
