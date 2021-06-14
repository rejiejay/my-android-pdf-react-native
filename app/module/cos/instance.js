import COS from 'cos-nodejs-sdk-v5'
import config from './../../config'

const {
    secretId,
    secretKey,
    bucket,
    region,
} = config.tcos

const instance = new COS({ SecretId: secretId, SecretKey: secretKey })

export default instance
