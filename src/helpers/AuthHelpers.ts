import Exception, {ExceptionType} from "../utils/Exception";
import {CookieStorage, SessionStorage} from "./BrowserStorageHelpers";
import router from "../router";

/**
 * Синглтон для авторизации
 *
 * @class AuthHelper
 * @author Старков Е.П.
 */
export default class AuthHelper {
    static _instance: AuthHelper;
    static _isAuth: boolean;
    static _userInfo: {[key: string]: any};
    static _user: string ;
    static _cookieStorageHelper: CookieStorage = new CookieStorage('auth');
    static _sessionStorageHelper: SessionStorage = new SessionStorage('auth');
    static _cookieMaxAge: number = 7 * 24 * 60 * 60;
    static _userFields = 'user';
    static _userInformationFields = 'userInformation';

    /**
     * Проверяет наличие состояния и получает начальные данные
     */
    constructor() {
        if (AuthHelper._instance) {
            new Exception(ExceptionType.WARNING, 'AuthHelper',
                'Состояние уже опрделено. Используйте метод getInstance()');
        } else {
            AuthHelper._instance = this;
        }

        // Хранение данных об авторизации
        AuthHelper._cookieStorageHelper.changeMaxAge(AuthHelper._cookieMaxAge);

        AuthHelper.checkAuth();
        AuthHelper.checkUserInfo();
    }

    /**
     * Получение текущего состояния
     */
    static getInstance() :AuthHelper {
        AuthHelper.checkAuth();
        AuthHelper.checkUserInfo();

        if (AuthHelper._instance) {
            return AuthHelper._instance;
        }

        return AuthHelper._instance = new AuthHelper;
    }

    /**
     * Проверка авторизации
     */
    static checkAuth(force = false): void {
        if (AuthHelper._isAuth === null || force) {
            AuthHelper._isAuth = !!(AuthHelper._cookieStorageHelper.get(AuthHelper._userFields)
                || AuthHelper._sessionStorageHelper.get(AuthHelper._userFields));
        }
    }

    /**
     * Проверка наличия информации о пользователе
     */
    static checkUserInfo(force = false): void {
        if (AuthHelper._userInfo === null || force) {
            AuthHelper._userInfo = AuthHelper._cookieStorageHelper.get(AuthHelper._userInformationFields)
                || AuthHelper._sessionStorageHelper.get(AuthHelper._userInformationFields);
        }

        if (AuthHelper._user === null || force) {
            AuthHelper._user = AuthHelper._cookieStorageHelper.get(AuthHelper._userFields)
                || AuthHelper._sessionStorageHelper.get(AuthHelper._userFields);
        }
    }

    /**
     * Проверка наличия инициализации синглтона
     */
    static checkInstance(): void {
        if (!AuthHelper._instance) {
            new AuthHelper();
        }
    }

    /**
     * Пользователь авторизован?
     */
    static userIsAuth(): boolean {
        AuthHelper.checkInstance();

        return AuthHelper._isAuth;
    }

    /**
     * Получение информации о пользователе
     */
    static getUserInfo(): {[key: string]: any} {
        AuthHelper.checkInstance();

        return AuthHelper._userInfo;
    }

    static getUser(): string {
        AuthHelper.checkInstance();

        return AuthHelper._user;
    }

    /**
     * Авторизовать пользователя
     *
     * @param useCookie Использовать куки
     * @param uuid UUID пользователя
     * @param userData Данные о пользователе
     */
    static login(useCookie: boolean, uuid: string, userData: {[key: string]: any}): void {
        const helpersStorage = useCookie ? AuthHelper._cookieStorageHelper : AuthHelper._sessionStorageHelper;
        helpersStorage.set(AuthHelper._userFields, uuid);
        helpersStorage.set(AuthHelper._userInformationFields, userData);
        AuthHelper.forceUserCheck();
        router.push('home');
    }

    /**
     * Выход пользователя
     */
    static logout(): void {
        AuthHelper._cookieStorageHelper.delete(AuthHelper._userFields);
        AuthHelper._cookieStorageHelper.delete(AuthHelper._userInformationFields);
        AuthHelper._sessionStorageHelper.delete(AuthHelper._userFields);
        AuthHelper._sessionStorageHelper.delete(AuthHelper._userInformationFields);
        AuthHelper.forceUserCheck();
        router.push('login');
    }

    static forceUserCheck(): void {
        AuthHelper.checkUserInfo(true);
        AuthHelper.checkAuth(true);
    }
}