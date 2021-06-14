import instance from './instance'

const {
    secretId,
    secretKey,
    bucket,
    region,
} = config.tcos

class Action {
    /**
     * 查询存储桶下的部分或者全部对象
     * @param {string} path 查看的路径 例如: website-station-system/diary-record/temporary/
     * @doc https://cloud.tencent.com/document/product/436/36119#.E6.9F.A5.E8.AF.A2.E5.AF.B9.E8.B1.A1.E5.88.97.E8.A1.A8
     */
    getBucket = path =>
        new Promise((resolve, reject) => {
            instance.getBucket({
                Bucket: bucket,
                Region: region,
                Prefix: path
            }, function (err, data) {
                if (err) {
                    return reject(err)
                }
                /**
                 * {
                 *    "Key": "a/3mb.zip",
                 *    "LastModified": "2018-10-18T07:08:03.000Z",
                 *    "ETag": "\"05a9a30179f3db7b63136f30aa6aacae-3\"",
                 *    "Size": "3145728",
                 *    "Owner": {
                 *        "ID": "1250000000",
                 *        "DisplayName": "1250000000"
                 *    },
                 *    "StorageClass": "STANDARD"
                 * }
                 */
                resolve(data.Contents.filter(content => +content.Size > 0))
            })
        })

    /**
     * 下载对象
     * @param {string} path 查看的路径 例如: website-station-system/diary-record/temporary/test.png
     * @doc https://cloud.tencent.com/document/product/436/36119#.E4.B8.8B.E8.BD.BD.E5.AF.B9.E8.B1.A1
     */
    getObject = path =>
        new Promise((resolve, reject) => {
            instance.getObject({
                Bucket: bucket,
                Region: region,
                Key: path
            }, function (err, data) {
                if (err) {
                    return reject(err)
                }
                /**
                 * 返回的文件内容，默认为 Buffer 形式
                 */
                resolve(data.Body)
            })
        })

    /**
     * 简单上传对象
     * @param {string} path 查看的路径 例如: website-station-system/diary-record/temporary/test.png
     * @param {string} Body 上传文件的内容，可以为 FileStream、字符串、Buffer
     * @doc https://cloud.tencent.com/document/product/436/36119#.E4.B8.8B.E8.BD.BD.E5.AF.B9.E8.B1.A1
     */
    putObject = (path, Body) =>
        new Promise((resolve, reject) => {
            instance.putObject({
                Bucket: bucket,
                Region: region,
                Key: path,
                Body
            }, function (err, data) {
                if (err) {
                    return reject(err)
                }
                /**
                 * 请求成功时返回的对象，如果请求发生错误，则为空
                 */
                resolve(data)
            })
        })

    /**
     * 删除多个对象
     * @param {string} paths 删除的路径 例如: [{ Key: 'website-station-system/diary-record/temporary/test.png' }]
     * @doc https://cloud.tencent.com/document/product/436/36119#.E4.B8.8B.E8.BD.BD.E5.AF.B9.E8.B1.A1
     */
    deleteMultipleObject = paths =>
        new Promise((resolve, reject) => {
            instance.deleteMultipleObject({
                Bucket: bucket,
                Region: region,
                Objects: paths
            }, function (err, data) {
                if (err) {
                    return reject(err)
                }
                resolve(data)
            })
        })
}

export default new Action()