class PersonDTO {
    constructor (id, name, surname, pnr, email, password, role_id, username){
        this.person_id = id;
        this.name = name;
        this.surname = surname;
        this.pnr = pnr;
        this.email = email;
        this.password = password;
        this.role_id = role_id;
        this.username = username;
    }
}

module.exports = PersonDTO