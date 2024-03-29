/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { HTTPValidationError } from '../model';
/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get Original Image File
         * @param {string} imageName 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOriginalImageFileImagesOriginalGetImageNameDownloadGet: async (imageName: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'imageName' is not null or undefined
            assertParamExists('getOriginalImageFileImagesOriginalGetImageNameDownloadGet', 'imageName', imageName)
            const localVarPath = `/images/original/get/{image_name}/download`
                .replace(`{${"image_name"}}`, encodeURIComponent(String(imageName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Original Images
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOriginalImagesImagesOriginalGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/images/original/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Screen Resolution
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getScreenResolutionScreenResolutionGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/screen/resolution`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Set Image
         * @param {string} imageName 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setImageImagesSetImageNamePut: async (imageName: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'imageName' is not null or undefined
            assertParamExists('setImageImagesSetImageNamePut', 'imageName', imageName)
            const localVarPath = `/images/set/{image_name}`
                .replace(`{${"image_name"}}`, encodeURIComponent(String(imageName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Set Random Image
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setRandomImageImagesSetRandomPut: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/images/set/random/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Upload File
         * @param {File} file 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadFileUploadfilePost: async (file: File, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'file' is not null or undefined
            assertParamExists('uploadFileUploadfilePost', 'file', file)
            const localVarPath = `/uploadfile/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();


            if (file !== undefined) { 
                localVarFormParams.append('file', file as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Get Original Image File
         * @param {string} imageName 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getOriginalImageFileImagesOriginalGetImageNameDownloadGet(imageName: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getOriginalImageFileImagesOriginalGetImageNameDownloadGet(imageName, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get Original Images
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getOriginalImagesImagesOriginalGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getOriginalImagesImagesOriginalGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get Screen Resolution
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getScreenResolutionScreenResolutionGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getScreenResolutionScreenResolutionGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Set Image
         * @param {string} imageName 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async setImageImagesSetImageNamePut(imageName: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.setImageImagesSetImageNamePut(imageName, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Set Random Image
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async setRandomImageImagesSetRandomPut(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.setRandomImageImagesSetRandomPut(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Upload File
         * @param {File} file 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async uploadFileUploadfilePost(file: File, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uploadFileUploadfilePost(file, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @summary Get Original Image File
         * @param {string} imageName 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOriginalImageFileImagesOriginalGetImageNameDownloadGet(imageName: string, options?: any): AxiosPromise<any> {
            return localVarFp.getOriginalImageFileImagesOriginalGetImageNameDownloadGet(imageName, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Original Images
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOriginalImagesImagesOriginalGet(options?: any): AxiosPromise<any> {
            return localVarFp.getOriginalImagesImagesOriginalGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Screen Resolution
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getScreenResolutionScreenResolutionGet(options?: any): AxiosPromise<any> {
            return localVarFp.getScreenResolutionScreenResolutionGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Set Image
         * @param {string} imageName 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setImageImagesSetImageNamePut(imageName: string, options?: any): AxiosPromise<any> {
            return localVarFp.setImageImagesSetImageNamePut(imageName, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Set Random Image
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setRandomImageImagesSetRandomPut(options?: any): AxiosPromise<any> {
            return localVarFp.setRandomImageImagesSetRandomPut(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Upload File
         * @param {File} file 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadFileUploadfilePost(file: File, options?: any): AxiosPromise<any> {
            return localVarFp.uploadFileUploadfilePost(file, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary Get Original Image File
     * @param {string} imageName 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getOriginalImageFileImagesOriginalGetImageNameDownloadGet(imageName: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).getOriginalImageFileImagesOriginalGetImageNameDownloadGet(imageName, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Original Images
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getOriginalImagesImagesOriginalGet(options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).getOriginalImagesImagesOriginalGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Screen Resolution
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getScreenResolutionScreenResolutionGet(options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).getScreenResolutionScreenResolutionGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Set Image
     * @param {string} imageName 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public setImageImagesSetImageNamePut(imageName: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).setImageImagesSetImageNamePut(imageName, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Set Random Image
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public setRandomImageImagesSetRandomPut(options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).setRandomImageImagesSetRandomPut(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Upload File
     * @param {File} file 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public uploadFileUploadfilePost(file: File, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).uploadFileUploadfilePost(file, options).then((request) => request(this.axios, this.basePath));
    }
}
