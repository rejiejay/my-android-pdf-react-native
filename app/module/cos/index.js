import { NativeModules } from 'react-native';
import _ from 'lodash';

const COS = NativeModules.COS

export const getBucketAsync = () => new Promise((reslove, reject) => {
    const getBucketSuccessful = listString => {
        try {
            const list = JSON.parse(listString)
            const source = _.filter(list, ({ key }) => key !== 'pdf/');

            reslove(source);
        } catch (error) {
            const warn = new Error('JSON parse listString error')
            console.warn(warn)
            console.error(error)
            return reject(warn);
        }
    }
    const getBucketFailure = e => {
        const warn = new Error(`getBucketFailure ${e}`)
        console.warn(warn)
        return reject(warn);
    }
    COS.getBucketAsync(getBucketSuccessful, getBucketFailure);
})