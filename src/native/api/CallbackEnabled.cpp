#include "CallbackEnabled.hpp"

#include <hook.h>
#include <symbol.h>
#include <innercore_callbacks.h>
#include <java.h>
#include <logger.h>

#include <vector>
#include <string>
#include <sstream>

std::unordered_map<std::string, bool> CallbackEnabled::hookEnabled;

#ifdef DEBUG
    std::unordered_map<std::string, int> CallbackEnabled::callbackEnabled;
    #ifdef DEBUG_DISABLED
        std::unordered_map<std::string, int> CallbackEnabled::callbackEnabledUseNotDisabled;
    #endif
#endif



void CallbackEnabled::setHookEnabled(const char* id, bool v){
    CallbackEnabled::hookEnabled[std::string(id)] = v;
}

void CallbackEnabled::init(){
    DLHandleManager::initializeHandle("libinnercore.so", "ic");

    HookManager::addCallback(
        SYMBOL("ic", "_ZN13JavaCallbacks15invokeCallbackVEP7_jclassRP10_jmethodIDPKcS6_PN11HookManager18CallbackControllerEiSt9__va_list"),
        LAMBDA((HookManager::CallbackController* controller, _jclass*, _jmethodID*& id, char const* func_name, char const* sig), {
            CallbackEnabled::handle(controller, id, func_name, sig);
        },),
        HookManager::CALL | HookManager::LISTENER | HookManager::CONTROLLER
    );
}
std::string toString(JNIEnv* env, jstring jStr){
	const jclass stringClass = env->GetObjectClass(jStr);
	const jmethodID getBytes = env->GetMethodID(stringClass, "getBytes", "(Ljava/lang/String;)[B");
	const jbyteArray stringJbytes = (jbyteArray) env->CallObjectMethod(jStr, getBytes, env->NewStringUTF("UTF-8"));
	size_t length = (size_t) env->GetArrayLength(stringJbytes);
	jbyte* pBytes = env->GetByteArrayElements(stringJbytes, NULL);
	std::string ret = std::string((char *)pBytes, length);
	env->ReleaseByteArrayElements(stringJbytes, pBytes, JNI_ABORT);
	env->DeleteLocalRef(stringJbytes); env->DeleteLocalRef(stringClass);
	return ret;
}

#ifdef DEBUG
    bool sortByValue(const std::pair<std::string, int>& a, const std::pair<std::string, int>& b) {
        return a.second > b.second;
    }

    std::vector<std::pair<std::string, int>> sortMapByValueDescending(const std::unordered_map<std::string, int>& map) {
        std::vector<std::pair<std::string, int>> tmpVector;
        tmpVector.reserve(map.size());

        for (const auto& pair : map) {
            tmpVector.emplace_back(pair.first, pair.second);
        }

        std::sort(tmpVector.begin(), tmpVector.end(), sortByValue);

        return tmpVector;
    }
#endif

extern "C" {
	JNIEXPORT void JNICALL Java_com_reider745_callbackoptifine_CallbackEnabled_setCallbackEnabled
	(JNIEnv* env, jclass, jstring method, jboolean value) {
		//jclass callback = reinterpret_cast<jclass>(env->NewGlobalRef(env->FindClass(toString(env, class_path).c_str())));
        //jmethodID id = env->GetStaticMethodID(callback, toString(env, method).c_str(), toString(env, sig).c_str());

        CallbackEnabled::setHookEnabled(toString(env, method).c_str(), value == JNI_TRUE);
        //env->DeleteGlobalRef(reinterpret_cast<jobject>(callback));
	}

    JNIEXPORT jboolean JNICALL Java_com_reider745_callbackoptifine_CallbackEnabled_isDebugBuild
	(JNIEnv*, jclass) {
		#ifdef DEBUG
            return JNI_TRUE;
        #else
            return JNI_FALSE;
        #endif
	}
    #ifdef DEBUG
        JNIEXPORT jstring JNICALL Java_com_reider745_callbackoptifine_CallbackEnabled_getDebugInfo
        (JNIEnv* env, jclass) {
            std::string info = "";

            std::vector<std::pair<std::string, int>> sortedVector = sortMapByValueDescending(CallbackEnabled::callbackEnabled);
            int count_full_use = 0;

            for(int i = 0;i < sortedVector.size();i++){
                std::pair<std::string, int> par = sortedVector[i];
                std::stringstream line;
                line << i << ". " << par.first << "\t" << par.second << "\n";
                count_full_use += par.second;
                info += line.str();
            }
            
            #ifdef DEBUG_DISABLED
                info += "\n\n\n===================\n";
                sortedVector.clear();
                sortedVector = sortMapByValueDescending(CallbackEnabled::callbackEnabledUseNotDisabled);
                int count_enabled_use = 0;

                for(int i = 0;i < sortedVector.size();i++){
                    std::pair<std::string, int> par = sortedVector[i];
                    std::stringstream line;
                    line << i << ". " << par.first << "\t" << par.second << "\n";
                    count_enabled_use += par.second;
                    info += line.str();
                }

                info += "\n\n\n===================\n";
                std::stringstream line;
                line << "skip: " << count_full_use - count_enabled_use;
                info += line.str();
            #endif

            return (jstring) env->NewGlobalRef(env->NewStringUTF(info.c_str()));
        }
    #endif
}