import {ExceptionType as ExceptionTypeConst} from '../constants/Exception';
import {ObjectUtils} from "./Object";
import {PRODUCTION} from "../constants";

export default class Exception {
    exceptionTemplate = '$components: $message';
    constructor(type: string, component: string, message: string) {
        if (PRODUCTION) {
            return;
        }

        if (ObjectUtils.Values(ExceptionTypeConst).indexOf(type) === -1) {
            Exception._innerException('Передан не правильный уровень логирования')
        }
        if (!component) {
            Exception._innerException('Не передано название компонента, который вызвал исключение');
        }
        if (!message) {
            message = 'В работе компонента произошла ошибка';
        }

        this._process(type, component, message);
    }

    static _innerException(message: string): void {
        new Exception(ExceptionType.ERROR, 'Exception', message);
    }

    _process(type: string, component: string, message: string) {
        if (PRODUCTION) {
            return;
        }

        if (type === ExceptionType.LOG) {
            console.log(this._prepareMessage(component, message));
        } else if (type === ExceptionType.WARNING) {
            console.warn(component, message);
        } else if (type === ExceptionType.ERROR) {
            throw this._prepareMessage(component, message);
        }
    }

    _prepareMessage(component: string, message: string): string {
        return this.exceptionTemplate
            .replace('$components', component)
            .replace('$message', message);
    }
}

export const ExceptionType = ExceptionTypeConst;
