import { Week } from "./week.model";

export class Log
{ 
    constructor(public weekID: number, public userID: number,public date: Date, public distance: number, public minutes: number, public seconds: number, public pace: number, public thr: number,public ehr: number, public cem: number, public expenditure: number)
    { 
        
    }
}