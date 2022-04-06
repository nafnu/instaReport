export interface User {
    id?: string;
    lname: string;
    fname: string;
    email: string;
    phone: number;
    city: string;
    state: string;
    street: string;
    eircode: string;
    password: string
}

export interface type {
    id: number;
    incident: string
    options: {
        a: string,
        b: string,
        c: string
    }
}

export interface Report {
    reportId?: string;
    uid?: string;
    lat:number;
    lng: number;
    imagen: string;
    description: string;
    authority: string;
    incident: string;
}


