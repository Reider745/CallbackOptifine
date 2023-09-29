package com.reider745.callbackoptifine;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;

import com.zhekasmirnov.innercore.api.log.ICLog;
import com.zhekasmirnov.innercore.api.runtime.Callback;


public class CallbackEnabled {
    native public static void setCallbackEnabled(String method, boolean value);

    public static interface IGetCountCallback {
        int get(String name);
    }

    public static String getPrefix(){
        return "CallbackOptifine";
    }

    private static IGetCountCallback getCountCallback = new IGetCountCallback() {
        @Override
        @SuppressWarnings("unchecked")
        public int get(String name){
            try {
                Field field = Callback.class.getDeclaredField("callbacks");
                field.setAccessible(true);

                HashMap<String, ArrayList<Object>> callbacks = (HashMap<String, ArrayList<Object>>) field.get(null);
                return callbacks.containsKey(name) ? callbacks.get(name).size() : 0;
            } catch (Exception e) {
                ICLog.i(getPrefix(), ICLog.getStackTrace(e));
            }
            return 0;
        }
    };

    public static int getCountCallbackForName(String name){
        return getCountCallback.get(name);
    }

    public static void setGetCountCallback(IGetCountCallback getCountCallback){
        CallbackEnabled.getCountCallback = getCountCallback;
    }

    native public static boolean isDebugBuild();
    native public static String getDebugInfo();
}
