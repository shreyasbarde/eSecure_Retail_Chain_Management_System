export class Product{
    constructor(
        public category: string=null,
        public description: string=null,
        public discontinued:number= 0,
        // public id:number= 0,
        public listPrice:number= 0,
        public minimumReorderQuantity:number= 0,
        public productName: string=null,
        public quantityPerUnit: string=null,
        public reorderLevel:number= 0,
        public standardCost:number= 0,
        public targetLevel:number= 0
    ){}
}