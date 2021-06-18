package com.androidpdfreactnative.cos;

import com.androidpdfreactnative.cos.BucketObject;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.tencent.cos.xml.CosXmlService;
import com.tencent.cos.xml.CosXmlServiceConfig;
import com.tencent.cos.xml.exception.CosXmlClientException;
import com.tencent.cos.xml.exception.CosXmlServiceException;
import com.tencent.cos.xml.listener.CosXmlResultListener;
import com.tencent.cos.xml.model.CosXmlRequest;
import com.tencent.cos.xml.model.CosXmlResult;
import com.tencent.cos.xml.model.bucket.GetBucketRequest;
import com.tencent.cos.xml.model.bucket.GetBucketResult;
import com.tencent.cos.xml.model.tag.ListBucket;
import com.tencent.cos.xml.transfer.TransferConfig;
import com.tencent.cos.xml.transfer.TransferManager;
import com.tencent.qcloud.core.auth.QCloudCredentialProvider;
import com.tencent.qcloud.core.auth.ShortTimeCredentialProvider;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class COSModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;
    private String bucketName = ""; // 格式：BucketName-APPID;
    private CosXmlService cosXmlService;
    private GetBucketResult prevPageResult;
    // 存储桶所在地域简称，例如广州地区是 ap-guangzhou
    private String region = "";

    public COSModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;

        String secretId = ""; // SECRETID 永久密钥 secretId
        String secretKey = ""; // SECRETKEY 永久密钥 secretKey
        // keyDuration 为请求中的密钥有效期，单位为秒
        QCloudCredentialProvider myCredentialProvider = new ShortTimeCredentialProvider(secretId, secretKey, 300);

        // 创建 CosXmlServiceConfig 对象，根据需要修改默认的配置参数
        CosXmlServiceConfig serviceConfig = new CosXmlServiceConfig.Builder()
                .setRegion(region)
                .isHttps(true) // 使用 HTTPS 请求, 默认为 HTTP 请求
                .builder();
        // 初始化 COS Service，获取实例
        cosXmlService = new CosXmlService(context, serviceConfig, myCredentialProvider);
    }

    @Override
    public String getName() {
        return "COS";
    }

    @ReactMethod
    public void getBucketAsync(Callback successCallback, Callback errorCallback) {
        final GetBucketRequest getBucketRequest = new GetBucketRequest(bucketName);

        // 前缀匹配，用来规定返回的对象前缀地址
        getBucketRequest.setPrefix("pdf/");

        // 单次返回最大的条目数量，默认1000
        getBucketRequest.setMaxKeys(1000);

        cosXmlService.getBucketAsync(getBucketRequest, new CosXmlResultListener() {
            @Override
            public void onSuccess(CosXmlRequest request, CosXmlResult result) {
                GetBucketResult getBucketResult = (GetBucketResult) result;
                if (getBucketResult.listBucket.isTruncated) {
                    // 表示数据被截断，需要拉取下一页数据
                    prevPageResult = getBucketResult;
                }

                // https://cos-android-sdk-doc-1253960454.file.myqcloud.com/
                List<ListBucket.Contents> listBucket = getBucketResult.listBucket.contentsList;

                List<String> strList = new ArrayList<>();
                for (ListBucket.Contents itemBucket : listBucket) {
                    BucketObject bucketObj = new BucketObject(itemBucket.key, itemBucket.eTag);
                    String bucket = "{\"key\": \"" + itemBucket.key + "\", \"eTag\": " + itemBucket.eTag + "}";
                    strList.add(bucket);
                }

                String jsonOutput = strList.toString();
                successCallback.invoke(jsonOutput);
            }

            @Override
            public void onFail(CosXmlRequest cosXmlRequest, CosXmlClientException clientException, CosXmlServiceException serviceException) {
                if (clientException != null) {
                    clientException.printStackTrace();
                    errorCallback.invoke("clientException" + clientException.toString());
                } else {
                    serviceException.printStackTrace();
                    errorCallback.invoke("serviceException" + serviceException.toString());
                }
            }
        });
    }
}
