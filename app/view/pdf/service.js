import { updatePdfSourceLocalStorage } from './../../redux/store/pdf';

export const setFileCache = uniformResourceLocator => updatePdfSourceLocalStorage(uniformResourceLocator, { isCache: true })

export const setFilePage = (uniformResourceLocator, page) => updatePdfSourceLocalStorage(uniformResourceLocator, { page })

