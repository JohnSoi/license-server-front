import {debounce} from 'lodash';

export function debounceCall(callback: any, delay: number): void {
    debounce(callback, delay)
}