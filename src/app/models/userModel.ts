export interface User {
    _id: string,
    fName: string,
    lName: string,
    dob: string,
    email: string,
    password: string,
    profileImage: string,
    admin: string,
    phone: string,
    address: {
        streetAddress: string,
        city: string,
        state: string,
        zipcode: string,
    },
    orders: string,
    cart: string
}