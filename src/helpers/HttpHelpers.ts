import axios from "axios";
import Exception, {ExceptionType} from "../utils/Exception";
import AuthHelper from "./AuthHelpers";
import {IData, IResponse} from "../interfaces/SourceServiceInterfaces";
import {ServerConstants} from "../constants";

/**
 * Хелпер для запросов на БЛ
 *
 * @author Старков Е.П.
 * @class HttpHelpers
 * @public
 */
export default class HttpHelpers {
    /**
     * Отправка запроса на бл через axios
     *
     * @param params Данные для запроса
     * @param filter Объект фильтра
     * @param navigation Объект навигации
     * @param sorting Объект сортировки
     * @param endpointName Имя конечной точки (Название класса в БЛ)
     * @param method Название метода в классе
     * @param isScalar Признак простого запроса (1 параметр - 1 ответ)
     */
    static async sendRequest(params = {}, filter = {}, navigation = {},
                             sorting = {}, endpointName = '',
                             method = '', isScalar = false): Promise<IResponse> {
        let result: any = {success: false};
        if (!endpointName) {
            new Exception(ExceptionType.ERROR, 'HttpHelpers', 'Не задана точка для запроса');
        }

        const url: string = 'http://' + ServerConstants.ServerUrl + '/' + ServerConstants.ServiceEndpoint;
        const axiosParams: IAxiosParams = {
            endpointName,
            method,
            data: {
                params,
                filter,
                navigation,
                sorting
            }
        };

        await axios.post(url, axiosParams,
            {headers: {'User-Auth-UUID': AuthHelper.getUser()}}).then((response) => {
            result = isScalar ? response : response.data;
        }).catch((error: { message: string; }) => {
            result.error = error.message;
        });

        return result;
    }
}

interface IAxiosParams {
    data: IData,
    endpointName: string,
    method: string
}