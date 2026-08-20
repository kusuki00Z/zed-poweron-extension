use zed_extension_api as zed;

struct PowerOn {
}

impl zed::Extension for PowerOn {
    fn new() -> Self {
        Self {}
    }
}

zed::register_extension!(PowerOn);
