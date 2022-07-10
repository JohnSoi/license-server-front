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
     * @param data Данные для запроса
     * @param endpointName Имя конечной точки (Название класса в БЛ)
     * @param method Название метода в классе
     * @param isScalar Признак простого запроса (1 параметр - 1 ответ)
     */
    static async sendRequest(data: IData = {}, endpointName = '',
                             method = '', isScalar = false): Promise<IResponse> {
        let result: IResponse = {success: false};
        if (!endpointName) {
            new Exception(ExceptionType.ERROR, 'HttpHelpers', 'Не задана точка для запроса');
        }

        if (!isScalar) {
            data['user'] = AuthHelper.getUser();
        }

        const url: string = 'http://' + ServerConstants.ServerUrl + '/' + ServerConstants.ServiceEndpoint;
        const axiosParams: IAxiosParams = {
            endpointName,
            method,
            data
        };

        await axios.post(url, axiosParams,
            {headers: {'User-Auth-UUID': AuthHelper.getUser()}}).then((response) => {
            result = isScalar ? response : response.data;
        }).catch((error: { message: string | undefined; }) => {
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