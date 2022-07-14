import HttpHelpers from "../helpers/HttpHelpers";
import Exception, {ExceptionType} from "../utils/Exception";
import {IData, IFilter, INavigation, IResponse, ISourceServiceParams} from "@/src/interfaces/SourceServiceInterfaces";

/**
 * Класс для источника данных
 *
 * @author Старков Е.П.
 * @class SourceService
 * @public
 */
export default class SourceService {
    /**
     * Внутренние параметры для источника данных
     */
    _params: ISourceServiceParams = {
        endpoint: '',
        keyProperty: '',
        binding: {
            query: 'Get',
            delete: 'Delete',
            list: 'List',
            update: 'Update',
            create: 'Create',
            search: 'Search'
        }
    };
    /**
     * Навигация по умолчанию
     */
    _baseNavigation: INavigation = {
        page: 0,
        pageSize: 35,
        hasMore: false
    };
    /**
     * Признак правильности источника данных
     */
    _isCorrect = false;


    /**
     * Конструктор класса для проверки входных параметров
     *
     * @param params Параметры для источника данных
     */
    constructor(params: {endpoint: string, keyProperty?: string, binding?: any}) {
        this._prepareParams(params);
    }

    /**
     * Запрос одной записи
     *
     * @param key Первичный ключ для выборки данных
     */
    async query(key: number | string): Promise<IResponse> {
        return await this._sendRequest(key, this._params.binding.query);
    }

    /**
     * Создание новой записи
     *
     * @param record Данные о новой записи
     */
    async create(record: IData = {}): Promise<IResponse> {
        return await this._sendRequest(record, this._params.binding.create);
    }

    /**
     * Удаление записи
     *
     * @param key Первичный ключ
     */
    async delete(key: number | string): Promise<IResponse> {
        return await this._sendRequest(key, this._params.binding.delete);
    }

    /**
     * Обновление записи
     *
     * @param record Запись с новыми полями
     */
    async update(record: IData): Promise<IResponse> {
        return await this._sendRequest(record, this._params.binding.update);
    }

    /**
     * Фильтрующая выборка записей
     *
     * @param filter Фильтр для выбора с навигацией
     * @param navigation Объект навигации
     */
    async list(filter: IFilter, navigation: any = null): Promise<IResponse> {
        if (!navigation) {
            navigation = this._baseNavigation
        }

        return await this._sendRequest(null, this._params.binding.list, false, filter, navigation);
    }

    /**
     * Поиск по строке
     *
     * @param searchString Строка для поиска
     * @param filter Фильтр для поиска
     */
    async search(searchString: string, filter: {[key: string]: any} = {}): Promise<IResponse> {
        const filters = {
            searchString,
            filter
        };
        return await this._sendRequest(null, this._params.binding.search, false, filters);
    }

    /**
     * Запрос по ключу из binding
     *
     * @param key Ключ binding для получения пути запроса
     * @param data Данные для запроса
     */
    async customQuery(key: string, data: any): Promise<IResponse> {
        if (Object.keys(this._params.binding).indexOf(key) === -1) {
            new Exception(ExceptionType.ERROR, 'SourceService',
                'Данный ключ не найден в binding праметров');
        }
        return await this._sendRequest(data, this._params.binding[key]);
    }

    async scalarQuery(key: string, value: any): Promise<IResponse> {
        if (Object.keys(this._params.binding).indexOf(key) === -1) {
            new Exception(ExceptionType.ERROR, 'SourceService',
                'Данный ключ не найден в binding праметров');
        }
        return await this._sendRequest(value, this._params.binding[key], true);
    }

    getKeyProperty(): any {
        return this._params.keyProperty;
    }

    /**
     * Подготовка входных параметров
     *
     * @param params Входные параметры
     * @private
     */
    _prepareParams(params: {endpoint: string, keyProperty?: string, binding?: any}): void {
        if (!params.endpoint) {
            new Exception(ExceptionType.ERROR, 'SourceService',
                'Не задана конечная точка (endpoint).' +
                'Данный параметр является обязательным');
        }

        this._params = {
            keyProperty: params.keyProperty,
            endpoint: params.endpoint,
            binding: {
                ...this._params.binding,
                ...params.binding
            }
        }

        this._isCorrect = true;
    }

    /**
     * Признак корректности источника данных
     */
    isCorrect(): boolean {
        return this._isCorrect;
    }

    /**
     * Отправка запроса на БЛ
     *
     * @param params Данные для запроса
     * @param filter Объект фильтра
     * @param navigation Объект навигации
     * @param sorting Объект сортировки
     * @param binding Конечная точка для запроса
     * @param isScalar Признак простого запроса (1 параметр - 1 ответ)
     * @private
     */
    async _sendRequest(params: any, binding: string, isScalar = false, filter = {}, navigation = {},
                       sorting = {}): Promise<IResponse> {
        return await HttpHelpers.sendRequest(params, filter, navigation, sorting,
            this._params.endpoint, binding, isScalar);
    }

}

