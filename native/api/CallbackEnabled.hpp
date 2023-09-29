#pragma once

#include <java.h>
#include <hook.h>
#include <unordered_map>
#include <cstring>

#include "constans.hpp"

class CallbackEnabled {
    public:
        static std::unordered_map<std::string, bool> hookEnabled;
        #ifdef DEBUG
            static std::unordered_map<std::string, int> callbackEnabled;
            #ifdef DEBUG_DISABLED
                static std::unordered_map<std::string, int> callbackEnabledUseNotDisabled;
            #endif
        #endif

        static void setHookEnabled(const char*, bool);
        static inline bool canHookEnabled(const char* id){
            auto it = hookEnabled.find(std::string(id));
            if(it == hookEnabled.end())
                return true;
            return it->second;
        }

        static void init();
        static inline void handle(HookManager::CallbackController* controller, jmethodID id, const char* name, const char* sig){
            #ifdef DEBUG
                const int length = strlen(name) + strlen(sig) + 1;
                char* func_name = new char[length];

                strcpy(func_name, name);
                strcat(func_name, sig);

                std::string key(func_name);
                delete func_name;

                auto it = callbackEnabled.find(key);
                if(it == callbackEnabled.end())
                    callbackEnabled[key] = 1;
                else
                    callbackEnabled[key] += 1;

                #ifdef DEBUG_DISABLED
                    if(CallbackEnabled::canHookEnabled(name)){
                        auto it = callbackEnabledUseNotDisabled.find(key);
                        if(it == callbackEnabledUseNotDisabled.end())
                            callbackEnabledUseNotDisabled[key] = 1;
                        else
                            callbackEnabledUseNotDisabled[key] += 1;
                    }
                #endif
            #endif
            if(!CallbackEnabled::canHookEnabled(name)){
                controller->replace();
                #ifdef DEBUG
                    Logger::debug(PREFIX, "Callback Disabled %s%s", name, sig);
                #endif
            }
        }
};