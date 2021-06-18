import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

export const pdf = {
    // eTag 对象的实体标签（Entity Tag），是对象被创建时标识对象内容的信息标签，可用于检查对象的内容是否发生变化， 例如“8e0b617ca298a564c3331da28dcb50df”，此头部并不一定返回对象的 MD5 值，而是根据对象上传和加密方式而有所不同
    eTag: '8e0b617ca298a564c3331da28dcb50df',
    // 统一资源定位符
    uniformResourceLocator: 'pdf/react-native.pdf',
    // 是否缓存?
    isCache: false,
    // 页码
    page: 1,
}

export const store = [
    // {
    //     ...pdf
    // }
];

export const tencentCloudObjectStorageToStore = ({ eTag, key }) => ({
    eTag,
    uniformResourceLocator: key,
    isCache: false,
    page: 1,
});

const setNewExpired = () => {
    const nowTimestamp = new Date().getTime();
    const hour = 1000 * 60 * 60;
    AsyncStorage.setItem('pdf-expired', `${nowTimestamp + hour}`);
}

const getLocalStorage = () => new Promise((reslove, reject) => {
    AsyncStorage.getItem('pdf')
        .then(pdfString => {
            if (!pdfString) {
                const warn = new Error('No local pdf files')
                console.warn(warn)
                return reject(warn);
            }

            try {
                const storage = JSON.parse(pdfString);
                reslove(storage);
            } catch (error) {
                const warn = new Error('Local pdf files is Error format')
                console.error(error)
                console.warn(warn)
                return reject(warn);
            }
        });
})

export const getPdfListLocalStorage = () => new Promise(async (reslove, reject) => {
    const storage = await getLocalStorage()
        .catch(failure => failure);

    if (storage instanceof Error) {
        return reject(storage);
    }

    AsyncStorage.getItem('pdf-expired')
        .then(expired => {
            const nowTimestamp = new Date().getTime();
            if (!expired || nowTimestamp > +expired) {
                reslove({
                    pdf: storage,
                    isExpired: true
                });
                return;
            }

            reslove({
                pdf: storage,
                isExpired: false
            });
        });
})

export const setPdfListLocalStorage = pdf => {
    setNewExpired();
    AsyncStorage.setItem('pdf', JSON.stringify(pdf));
}

export const updatePdfSourceLocalStorage = (uniformResourceLocator, update) => new Promise(async (reslove, reject) => {
    const list = await getLocalStorage()
        .catch(failure => failure);

    if (list instanceof Error) {
        return reject(list);
    }

    let pdf = _.find(list, item => item.uniformResourceLocator === uniformResourceLocator);
    if (!pdf) {
        const error = new Error(`failure update pdf ${uniformResourceLocator}, because can not find this source`)
        console.error(error);
        return reject(error);
    }

    if (update && update.isCache) {
        pdf.isCache = true
    }

    if (update && update.page) {
        pdf.page = update.page
    }

    const newList = list.map(item => {
        if (item.uniformResourceLocator === uniformResourceLocator) {
            return pdf
        }

        return item
    });

    setPdfListLocalStorage(newList);
    reslove();
})

