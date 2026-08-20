use zed_extension_api as zed;

struct PowerOnExtension {
    // ... state
}

impl zed::Extension for PowerOnExtension {
    // ...
}

zed::register_extension!(PowerOnExtension);
