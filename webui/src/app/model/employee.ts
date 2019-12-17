export class Employee{
    constructor(
        public address1: string=null,
        public address2: string=null,
        public avatar: string=null,
        public city: string=null,
        public country: string=null,
        public department: string=null,
        public email: string=null,
        public firstName: string=null,
        // public id:number= 0,
        public jobTitle: string=null,
        public lastName: string=null,
        public managerId:number= 0,
        public phone: string=null,
        public postalCode: string=null,
        public state: string=null
    ){}
}