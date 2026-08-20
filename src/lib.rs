use zed_extension_api as zed;

struct PowerOnExtension {
}

impl zed::Extension for PowerOnExtension {
    fn new() -> Self {
        Self {}
    }
}

zed::register_extension!(PowerOnExtension);
