# Zed PowerOn Extension

PowerOn language support for the Zed editor.

This repository is an early scaffold. It currently provides:

- PowerOn language detection for `.PND`, `.PN`, `.PRO`,and `.DEF` files.
- A local Tree-sitter grammar with starter lexical rules.
- Initial highlighting for comments, strings, numbers, keywords, types, constants, calls, and operators.

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

The grammar is intentionally conservative until the PowerOn language reference and representative source files are available. Expand `tree-sitter-poweron/grammar.js` and `languages/poweron/highlights.scm` together, then test the result against real programs. If a published grammar repository becomes available, replace the `file://` grammar entry in `extension.toml` with its pinned Git revision before publishing this extension.

## References

- Zed language extensions: https://zed.dev/docs/extensions/languages
- Developing extensions locally: https://zed.dev/docs/extensions/developing-extensions
