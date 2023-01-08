export const USERS: IUser[] = [{
    id: 1,
    name: "Uma Turman",
    balance: 1000
},
{
    id: 2,
    name: "Rick Karsdorp",
    balance: 2000
},
{
    id: 3,
    name: "Giuseppe Cruciani",
    balance: 12000
},
{
    id: 4,
    name: "Lisa Sherr",
    balance: 21000
},
{
    id: 5,
    name: "Kratos",
    balance: 1400
},
{
    id: 6,
    name: "Boris B",
    balance: 11200
},
{
    id: 7,
    name: "Lisa Simpson",
    balance: 1200
},
{
    id: 8,
    name: "Murats Altuntas",
    balance: 10500
},
{
    id: 9,
    name: "Paulo Coelho",
    balance: 3400
},
{
    id: 10,
    name: "Greta Thunberg",
    balance: 1010
},
{
    id: 11,
    name: "Giorgia Meloni",
    balance: 1076
},
{
    id: 12,
    name: "Keanu Reeves",
    balance: 4590
},
{
    id: 13,
    name: "Ulrich Nielsen",
    balance: 1823
},
{
    id: 14,
    name: "Egon Tiedemann",
    balance: 854
},
{
    id: 15,
    name: "Malcom X",
    balance: 9600
},
{
    id: 16,
    name: "Bjorn Borg",
    balance: 11500
}
];

export type ApiResponse<T> = ({ status: "success"; data: T; })

export type UsersApiResponse = ApiResponse<IUser>;

export interface IUser {
    id: number;
    name: string;
    balance: number;
}