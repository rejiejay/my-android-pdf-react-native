import RNFS from 'react-native-fs';

export const readDir = () => {

    RNFS.readDir(RNFS.DocumentDirectoryPath)
        .then((result) => {
            console.log('GOT RESULT', result);
        })
        .catch(error => {
            console.log('GOT error', error);
        })
}

export const writeFile = () => {
    RNFS.writeFile(`${RNFS.DocumentDirectoryPath}/test.txt`, '这是一段文本，YES', 'utf8')
        .then((success) => {
            console.log('success', success);
        })
        .catch((err) => {
            console.log('err', err.message);
        });
}

export const readFileTxt = () => {
    RNFS.readFile(`${RNFS.DocumentDirectoryPath}/test.txt`)
        .then((result) => {
            console.log('result', result);
        })
        .catch((err) => {
            console.log(err.message);
        });
}

export const readFile = () => {
}

export const download = () => {
    const timestamp = (new Date()).getTime();//获取当前时间错
    const random = String(((Math.random() * 1000000) | 0))//六位随机数
    let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath;
    //外部文件，共享目录的绝对路径（仅限android）
    const downloadDest = `${dirs}/${timestamp + random}.mp4`;
    //下载地址
    const formUrl = 'http://rejiejay.cn/pdf/%E9%80%BB%E8%BE%91%E7%A0%94%E7%A9%B6-%E7%AC%AC1%E5%8D%B7.pdf';
    const options = {
        fromUrl: formUrl,
        toFile: downloadDest,
        background: true,
        begin: (res) => {
            console.log('begin', res);
            console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
        },
        progress: (res) => { //下载进度
            let pro = res.bytesWritten / res.contentLength;
            console.log('pro==', pro)
        }
    }

    try {
        const ret = RNFS.downloadFile(options);
        ret.promise.then(res => {
            console.log('success', res);
            console.log('file://' + downloadDest)
        }).catch(err => {
            console.log('err', err);
        });

    } catch (e) {
        ToastAndroid.show('下载失败', ToastAndroid.SHORT)
        console.log(error);
    }
}
