#include <mod.h>

#include "api/CallbackEnabled.hpp"

class CallbackOptifineModule : public Module {
    public:
        CallbackOptifineModule(): Module("CallbackOptifine") {};

        virtual void initialize() override {
            CallbackEnabled::init();
        }
};

MAIN {
    new CallbackOptifineModule();
}