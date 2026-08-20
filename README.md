# Zed PowerOn Extension

PowerOn language support for the Zed editor.

This repository provides:

- PowerOn language detection for `.PND`, `.PN`, `.PRO`, and `.DEF` files.
- Highlighting for comments, includes, strings, numbers, keywords, types, constants, calls, procedures, fields, and operators.

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

## Next steps

The grammar is intentionally conservative and should continue to be expanded against the real programs in `examples/`. Update `tree-sitter-poweron/grammar.js` and `languages/poweron/highlights.scm` together. If a published grammar repository becomes available, replace the `file://` grammar entry in `extension.toml` with its pinned Git revision before publishing this extension.

## References

- [Zed language extensions](https://zed.dev/docs/extensions/languages)
- [Developing extensions locally](https://zed.dev/docs/extensions/developing-extensions)
