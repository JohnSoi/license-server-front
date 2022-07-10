import {ObjectUtils} from "./Object";
import Exception, {ExceptionType} from "./Exception";

export const ArrayUtils = {
    /**
     * Безопаснаое клонирование массива
     *
     * @param arrayOrigin оригинальный массив
     * @return Копия оригинального массива
     */
    Clone: (arrayOrigin: any[]): any[] => {
        if (!Array.isArray(arrayOrigin)) {
            new Exception(ExceptionType.ERROR, 'ArrayUtils',
                'Передан не массив. Клонирование не возможно.');
        }

        const newArray: any[] = [];

        if (!arrayOrigin.length) {
            return newArray;
        }

        arrayOrigin.forEach((item) => {
            if (typeof item === 'object' && item !== null && !(item instanceof Date)) {
                newArray.push(ObjectUtils.Clone(item));
            } else if (Array.isArray(item)) {
                newArray.push(ArrayUtils.Clone(item));
            } else {
                newArray.push(item);
            }
        });

        return newArray;
    },

    /**
     * Удаление объекта из массива, если ключ равен значению
     *
     * @param arr Массив для поиска
     * @param key Ключ для определения
     * @param value Значение для удаления по ключу
     * @return Новый массив без объекта с прееданным значением
     */
    DeleteObject: (arr: any[], key: string, value: any) => {
        if (!Array.isArray(arr)) {
            new Exception(ExceptionType.ERROR, 'ArrayUtils',
                'Передан не массив. Удаление не возможно.');
        }

        const newArray: any[] = [];

        arr.forEach((item) => {
            if (item && item[key] !== value) {
                newArray.push(item);
            }
        });

        return newArray;
    },

    /**
     * Получение объекта из массива по ключу и значению
     *
     * @param arr Массив для поиска
     * @param key Ключ для поиска значения
     * @param value Значение
     * @return Найденый или пустой объект
     */
    GetObject(arr: any[], key: string, value: any) {
        if (!Array.isArray(arr)) {
            new Exception(ExceptionType.ERROR, 'ArrayUtils',
                'Передан не массив. Получение объекта невозможно.');
        }

        let result: any = {};

        arr.forEach((item) => {
            if (item && item[key] === value) {
                result = item;
                return;
            }
        });

        return result;
    }
};
