# Zed PowerOn Extension

PowerOn language syntax highlighting support for Zed editor.

This repository provides:

- PowerOn language detection for `.PND`, `.PN`, `.PRO`, and `.DEF` files.
- Highlighting for comments, includes, strings, numbers, keywords, types, constants, calls, procedures, fields, and operators.

## Installation
- Clone this repo.
- In Zed, run `zed: install dev extension` from the command palette and select this repository.

## Local development

1. Install Rust with `rustup`.
2. Install the WebAssembly target if Rustup has not done so:

   ```text
   rustup target add wasm32-wasip2
   ```

3. Validate the Rust extension crate:

   ```text
   cargo check
   ```

4. In Zed, run `zed: install dev extension` from the command palette and select this repository.
5. Open a PowerOn file and use `zed: open log` if the extension fails to load.

## References

- [Zed language extensions](https://zed.dev/docs/extensions/languages)
- [Developing extensions locally](https://zed.dev/docs/extensions/developing-extensions)
