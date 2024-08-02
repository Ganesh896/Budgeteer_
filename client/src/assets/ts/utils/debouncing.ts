export const apiDebounce = (func: Function, delay: number) => {
    let timer: number;
    return function (e: Event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(e);
        }, delay);
    };
};
