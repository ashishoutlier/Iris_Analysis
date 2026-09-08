export type RecordRow={id:number;species:string;sepal_length:number;sepal_width:number;petal_length:number;petal_width:number};
export function selectRecords(records:RecordRow[],species:string):RecordRow[];
export function averages(records:RecordRow[],features:string[]):Record<string,number|null>;
