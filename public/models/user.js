class User {

    constructor(name, gender, birth, country, email, password, photo, admin) {
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
    get gender() {
        return this._gender;
    }
    get birth() {
        return this._birth;
    }
    get country() {
        return this._country;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }
    set photo(value) {
        this._photo = value;
    }

    get admin() {
        return this._admin;
    }
    get register() {
        return this._register;
    }

    loadFromJSON(json) {
        for (let name in json) {
            switch (name) {
                case '_register':
                    this[name] = new Date(json[name]);
                    break;

                default:
                if(name.substring(0, 1) === '_'){
                    this[name] = json[name];
                }
            }
        }
    }

    static getUsersStorage() {

        //return HttpRequest.get('/users');
        return Fetch.get('/users');

    }//Fechamento do getUsersStorage()
   
    toJSON() {

        let json = {};

        Object.keys(this).forEach(key => {
            if (this[key] !== undefined) json[key] = this[key];
        });

        return json;

    }//Fechamento do toJSON()

    save() {
        
        return new Promise((resolve, reject) => {

            let promise;

            if (this.id) {
                promise = Fetch.put(`/users/${this.id}`, this.toJSON());
            } else {
                promise = Fetch.post('/users', this.toJSON());
            }
            
            promise.then(data => {
                this.loadFromJSON(data);
                resolve(this);
            }).catch(e => {
                reject(e);
                console.error("Error aqui", e);
            });

        });

    };//Fechamento do save

    remove() {
       return Fetch.delete(`/users/${this.id}`);
    }//Fechamento do remove()
}