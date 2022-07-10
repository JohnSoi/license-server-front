export default class Url {
    _currentUrl: string;
    _path: string;

    constructor() {
        this._currentUrl = document.location.href;
        this._path = document.location.pathname;
    }

    /**
     * Получить текущий адрес
     */
    getCurrentUrl(): string {
        return this._currentUrl;
    }

    /**
     * Получить текущий путь
     */
    getCurrentPath(): string {
        return this._path;
    }

    /**
     * Получить название страницы (путь без / в конце)
     *
     * @param clearEmpty {boolean} Очищать ли / в пустом пути
     */
    getClearPath(clearEmpty: boolean): string {
        const path = this.getCurrentPath().split('');

        if (path[0] === '/' && (!clearEmpty && path.length === 1)) {
            path[0] = '';
        }

        if (path[path.length - 1] === '/') {
            path[path.length - 1] = '';
        }

        return path.join('');
    }
}