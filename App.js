'use strict'

const SHA256 = require('crypto-js/sha256');
const DIFFICULT  = 4;

class User{
    constructor(displayName, email, password, nonce = 0, proofOfWork = ''){
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.nonce = nonce;
        this.proofOfWork = proofOfWork;
    }

    get JSON() {
        return JSON.stringify({
            displayName: this.displayName, email: this.email, password: this.password, nonce: this.nonce, proofOfWork: this.proofOfWork
        });
    }
    
    static fromJSON(json) {
        var data = JSON.parse(json);
        var user = new User(data.displayName, data.email, data.password, data.nonce, data.proofOfWork);
        return user;
    }
}

let calculateProofOfWork = (user, difficult) => {
    while(user.proofOfWork.substring(0, difficult) !== "0".repeat(difficult)) {
        user.nonce++;
        user.proofOfWork = SHA256(user.displayName + user.email + user.password +user.nonce).toString();
        console.log("Calculating: " + user.proofOfWork);
        console.log("Nonce: " + user.nonce);
    }

    console.log("Proof of Work: " + user.proofOfWork);
    return user;
};

let validateProofofWork = (user) => {
    return (user.proofOfWork === SHA256(user.displayName + user.email + user.password +user.nonce).toString())? true : false;
};

//Recive a new user from login form, and calculate the prof of work, 
//this will make the work of a robot more difficult;
let user = new User('Satoshi Nakamoto', 'snakamoto@bitcoin.org', 'asdf1234' );
console.log(user.JSON);

//calculate Proof of Work
user = calculateProofOfWork(user, DIFFICULT);

//Now, you can send to server this data, and validate on server side
console.log(user.JSON);

//validate on server like this
console.log('Is valid? ' + validateProofofWork(user));
