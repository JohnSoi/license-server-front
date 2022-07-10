/**
 * Утилиты для работы с объектами
 *
 * @author Старков Е.П.
 */
import {ArrayUtils} from "./Array";
import Exception, {ExceptionType} from "./Exception";
import {isEqual, values} from 'lodash';

export const ObjectUtils = {
    /**
     * Клонирование объектов
     *
     * @param originalObject {Object} Оригинальный объект
     * @return {Object} Новый объект, аналогичный оригинальному
     * @constructor
     */
    Clone: (originalObject: any): any => {
        if (typeof originalObject !== 'object') {
            new Exception(ExceptionType.ERROR, 'ObjectUtils',
                'Преданный аргумент не является объектом.');
        }

        const newObject: any = {};

        for (const key in originalObject) {
            if (Array.isArray(originalObject[key])) {
                newObject[key] = ArrayUtils.Clone(originalObject[key])
            } else if (typeof originalObject[key] === 'object' && originalObject[key] !== null
                && !(originalObject[key] instanceof Date)) {
                newObject[key] = ObjectUtils.Clone(originalObject[key])
            } else {
                newObject[key] = originalObject[key];
            }
        }

        return newObject;
    },

    /**
     * Сравнивание 2х объектов
     *
     * @param object1 Объект 1
     * @param object2 Объект 2
     * @return Равны ли объекты
     */
    Equal: (object1: any, object2: any): boolean => {
        if (typeof object1 !== 'object' || typeof object2 !== 'object') {
            new Exception(ExceptionType.ERROR, 'ObjectUtils',
                'Преданный аргумент не является объектом.');
        }

        return isEqual(object1, object2)
    },

    /**
     * Проверка на пустоту объекта
     *
     * @param obj Проверяемый объект
     * @return Пустой ли объект
     */
    Empty(obj: any): boolean {
        if (typeof obj !== 'object') {
            new Exception(ExceptionType.ERROR, 'ObjectUtils',
                'Преданный аргумент не является объектом.');
        }

        if (!obj) {
            return true;
        }

        return !Object.keys(obj).length;
    },

    /**
     * Получение всех значений объекта
     *
     * @param obj Объект для выборки значений
     */
    Values(obj: any): any[] {
        if (typeof obj !== 'object') {
            new Exception(ExceptionType.ERROR, 'ObjectUtils',
                'Преданный аргумент не является объектом.');
        }

        return values(obj);
    },

    /**
     * Получение всех ключей объекта, которые True
     *
     * @param obj Начальный объект
     * @param key Дополнительный ключ, нужен для объединения в рекурсии
     * @param objCurrent Объект с текущими значениями
     * @return Массив всех ключей
     */
    GetAllKeysTrue(obj: any, key = '', objCurrent: any = {}): string[] {
        if (typeof obj !== 'object') {
            new Exception(ExceptionType.ERROR, 'ObjectUtils',
                'Преданный аргумент не является объектом.');
        }

        let keys: string[] = Object.keys(obj);

        if (key) {
            const newKeys: string[] = [];
            keys.forEach((keyItem) => {
                if (Array.isArray(objCurrent[keyItem]) && objCurrent[keyItem].length) {
                    newKeys.push(key + '.' + keyItem);
                }
                if (objCurrent[keyItem] && !Array.isArray(objCurrent[keyItem])) {
                    newKeys.push(key + '.' + keyItem);
                }
            });

            keys = newKeys;
        }

        keys.forEach((keyItem) => {
            if (typeof obj[keyItem] === 'object') {
                keys = keys.concat(ObjectUtils.GetAllKeysTrue(obj[keyItem], keyItem, obj[keyItem]));
            }
        });

        return keys;
    }
};
