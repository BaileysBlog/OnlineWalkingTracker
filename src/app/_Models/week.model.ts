import { Log } from "./log.model";

export class Week
{
    private _LockOverride: boolean = false;

    public weekEnd: Date;
    private Logs: Array<Log> = new Array<Log>();

    constructor(public weekID: number, public userID: number, public title: string, public weekStart: Date, logs: Log[] = [],public submitted: boolean = false)
    { 
        if (weekStart.getDay() != 0)
        { 
            //Day is not a Sunday!
            console.error("Week start date is not a Sunday!", this)
        }    
        this.weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
        if (logs != null && logs.length != 0)
        { 
            this._LockOverride = true;
            logs.forEach(log => {
                this.AddLog(log);
            });
            this._LockOverride = false;
        }    
    }

    public AddLog(log: Log): void
    { 
        if (this.IsLocked())
        {
            console.error("Cannot add log to locked week", this, log);
        } else
        { 
            this.Logs.push(log);

            this.SortLogs();
        }    
    }

    public AddLogs(...logs: Log[]): void
    { 
        if (this.IsLocked())
        {
            console.error("Cannot add log to locked week",this, logs);
        } else
        { 
            logs.forEach(log =>
            {
                this.Logs.push(log);
            });

            this.SortLogs();
        }
    }

    private SortLogs(): void
    { 
        //Sort by date
        this.Logs = this.Logs.sort((a: Log, b: Log) =>
        {
            return a.date.getTime() - b.date.getTime();
        });
    }


    public IsLocked(): boolean
    { 
        var today = new Date();
        if (today.getTime() < this.weekEnd.getTime() || this._LockOverride)
        {
            return false;
        } else
        { 
            return true;
        }    
    }

    public IsPastDue(): boolean
    { 
        var today = new Date();

        if (today.getTime() > this.weekEnd.getTime())
        {
            return true;
        } else
        {
            return false;
        }  
    }

    public GetStatus(): string
    { 
        if (this.IsPastDue())
        {
            if (this.submitted)
            { 
                return `Submitted`;
            } else
            { 
                return `Past Due`;
            }    
        } else
        {
            var today = new Date();
            if (!this.IsFutureWeek())
            {
                return `${this.weekEnd.getDay() - today.getDay()} days remaining`;
            } else
            { 
                return `Not Available`;
            }    
            
        } 
    }

    public IsFutureWeek(): boolean
    {
        var today = new Date();
        return today.getTime() < this.weekStart.getTime();
    }

    public GetLogCount(): number
    { 
        if (this.Logs)
        {
            return this.Logs.length;
        } else
        { 
            return 0;
        }    
    }

}