import _ from 'lodash';

import {
    tencentCloudObjectStorageToStore,
    getPdfListLocalStorage,
    setPdfListLocalStorage
} from './../../redux/store/pdf';
import { getBucketAsync } from './../../module/cos';

/**
 * 获取pdf列表
 * 1. 获取本地列表
 * 2. 获取远程列表
 */
export const getPdfSourceFileList = isForcedRefresh => new Promise(async (reslove, reject) => {
    const storage = await getPdfListLocalStorage()
        .catch(failure => failure);

    if (
        !isForcedRefresh &&
        !(storage instanceof Error) &&
        !storage.isExpired
    ) {
        return reslove(storage.pdf)
    }

    console.warn(storage);

    const source = await getBucketAsync()
        .catch(failure => failure);

    if (source instanceof Error) {
        console.error(source);
        return reslove([]);
    }

    let store = source.map(bucket => tencentCloudObjectStorageToStore(bucket));

    if (!(storage instanceof Error)) {
        store = store.map(pdf => {
            const cache = _.find(storage.pdf, item => item.eTag === pdf.eTag);
            if (cache) {
                return cache;
            }

            return pdf
        });
    }

    setPdfListLocalStorage(store);
    reslove(store);
})
