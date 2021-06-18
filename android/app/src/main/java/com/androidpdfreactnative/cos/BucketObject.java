package com.androidpdfreactnative.cos;

public class BucketObject {
    private String key;
    private String tag;

    public BucketObject(String key, String tag) {
        this.key = key;
        this.tag = tag;
    }

    public String getTag() {
        return tag;
    }
    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getKey() {
        return key;
    }
    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public String toString() {
        return "BucketObject{" +
                "key='" + key + '\'' +
                ", tag='" + tag + '\'' +
                '}';
    }
}
