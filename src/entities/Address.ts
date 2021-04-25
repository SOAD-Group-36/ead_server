export interface IAddress {
    pincode: string,
    state: string,
    city: string,
    landmark: string,
    houseNo: string,
    streetName: string,
}

export class Address implements IAddress {
    public pincode: string;
    public state: string;
    public city: string;
    public landmark: string;
    public houseNo: string;
    public streetName: string;

    constructor(
        pincode: string,
        state: string,
        city: string,
        landmark: string,
        houseNo: string,
        streetName: string,
    ) {
        this.pincode = pincode;
        this.state = state;
        this.city = city;
        this.landmark = landmark;
        this.houseNo = houseNo;
        this.streetName = streetName;
    }
}
