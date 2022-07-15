import {debounce, throttle} from 'lodash';

export function debounceCall(callback: any, delay: number) {
    return debounce(callback, delay)
}

export function throttleCall(callback: any, delay: number) {
    return throttle(callback, delay)
}