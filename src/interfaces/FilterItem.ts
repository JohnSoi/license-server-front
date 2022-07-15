export interface IFilterItem {
    title: string;
    type: FILTER_TYPE;
    viewMode: FILTER_VIEW_MODE;
    field: string;
    value: any;
    resetValue: any;
}

export enum FILTER_TYPE {
    DATE,
    DATE_RANGE,
    INPUT,
    INPUT_NUMBER,
    SWITCH
}

export enum FILTER_VIEW_MODE {
    BASIC,
    ADDITIONAL
}

export interface IFilterData {
    filterSource: {
        main: IFilterItem[],
        additional: IFilterItem[]
    };
    filterVisibility: boolean;
    filterType: any;
}



