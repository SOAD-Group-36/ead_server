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
        house_no: string,
        street_name: string,
    ) {
        this.pincode = pincode;
        this.state = state;
        this.city = city;
        this.landmark = landmark;
        this.houseNo = house_no;
        this.streetName = street_name;
    }
}
