export class User
{ 
    constructor(public userID: number, public category: Category,public weight: number)
    { 
        if (weight < 100)
        {
            weight = 100;
        } else if (weight > 240)
        {
            weight = 240;
        } else
        { 
            if (weight % 10 != 0)
            { 
                var temp = weight.toString().split('');
                temp[2] = '0';
                var temp2 = temp.join('');
                weight = Number.parseInt(temp2);
            }    
        }    
    }
}

export enum Category
{ 
    A,B,C,D
}