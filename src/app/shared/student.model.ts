export class Student {
    constructor(
        public studentId: string,
        public firstname: string,
        public lastname: string,
        public address: string,
        public city: string,
        public state: string,
        public zip: string,
        public phone: string,
        public email: string,
        public homePage: string,
        public dateprovided: string,
        public liked: string,
        public interest: string,
        public recommend?: string,
      ) {  }
}
/*
JSON CONTRACT
ALL STRINGS
{
    "studentId": "awebb4",
    "name": "alec",
    "address": "123 st",
    "city": "ffx",
    "state": "va",
    "zip": "22030",
    "phone": "555-555-5555",
    "email": "hi@email.com",
    "homePage": "http://www.mysite.com",
    "dateprovided": "10/11/2019",
    "liked": "students,location,campus,atmosphere,dormrooms,sports",
    "interest": "television",
    "recommend": "v_likely",
    "additionalComments": "yes i do",
    "data": "10,20,30,40,50,60,70,80,90,100",
    "graduationMonth": "March",
    "graduationYear": "2020",
    "mean": "55.0",
    "stddev": "30.276503540974915"
}

*/
