import axios from 'axios';

let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).token : "No token";

export const getRecords = async (recordId, patientId) => {
    try {
        console.log(recordId)
        console.log(patientId)

        return await axios.get('http://localhost:4321/record/' + recordId + '/patient/' + patientId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    } catch (error) {
        console.log(error)
    }
}

export const updateData = (data, record, type) => {
    let splittedType = splitForCards(type);
    let splittedDate;
console.log(record);
    if (record.date) { splittedDate = record.date.split('T')[0]; }
    if (splittedType === "allergy") {
        return [...data, { id: record.id, name: record.name }]
    } else if (splittedType === "immunization") {
        return [...data, { id: record.id, name: record.name, date: splittedDate }]

    } else if (splittedType === "diagnosis") {
        return [...data, { id: record.id, name: record.name, date: splittedDate }]

    } else if (splittedType === "medication") {
        return [...data, { id: record.id, name: record.name, prescription: record.prescription, date: splittedDate }]

    } else if (splittedType === "note") {
        return [...data, { id: record.id, note: record.name }]

    }


}

export const setRecord = async (recordId, type, record) => {
    let properType = splitForCards(type);

    if (properType === "diagnosis" || properType === "immunization") {
        try {
            let response = await axios.post(`http://localhost:4321/${properType}/` + recordId, {
                name: record.name,
                date: record.date
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let id = response.data.id;
            let name = response.data.name;
            let date = response.data.date;
            let returnObject = { id, name, date };
            return returnObject;

        } catch (error) {
            console.log(error);
        }
    } else if (properType === "note") {
        try {
            let response = await axios.post(`http://localhost:4321/${properType}/` + recordId, {
                note: record.name,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let id = response.data.id;
            let name = response.data.note;
            let returnObject = { id, name };
          
            
            return returnObject;

        } catch (error) {
            console.log(error);
        }
    } else if (properType === "allergy") {
        try {
            let response = await axios.post(`http://localhost:4321/${properType}/` + recordId, {
                name: record.name,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let id = response.data.id;
            let name = response.data.allergy;
            let returnObject = { id, name };
            return returnObject;

        } catch (error) {
            console.log(error);
        }
    } else if (properType === "medication") {
        try {
            let response = await axios.post(`http://localhost:4321/${properType}/` + recordId, {
                name: record.name,
                date: record.date,
                prescription: record.prescription

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let id = response.data.id;
            let name = response.data.name;
            let prescription = response.data.prescription
            let date = response.data.date;
            let returnObject = { id, name, prescription, date };
            return returnObject;

        } catch (error) {
            console.log(error);
        }
    }
}




export const createArrayOfObjectForCards = (data) => {
    delete data["id"];
    return data;
}

export const splitForCards = (string) => {
    if (string === "allergies") {
        return string = "allergy";
    } else if (string === "diagnosis") {
        return string
    } else {
        let charArr = [...string];
        charArr.pop();
        let newString = charArr.join('');
        return newString;
    }

}

export const removeItemFromRecord = async (data, type, id) => {

    let splittedType = splitForCards(type);
    let successfulUpdate;
    try {

        successfulUpdate = await axios.delete(`http://localhost:4321/${splittedType}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (successfulUpdate.status === 200) {
            let newData = data.filter(identification => identification.id !== id);
            return newData
        }


    } catch (error) {
        console.log(error)
    }
}

export const validate = (word, type) => {
    let regexOnlyAlphabet = new RegExp("/^[A-Za-z]+$/");
    let regexLettersAndNumbers = new RegExp("^[A-Z a-z 0-9_-]*$");
    let result;
    if (type === "letters" && word!=="") {
        result = regexOnlyAlphabet.test(word);
        return result;
    } else if (type === "lettersAndNumbers" && word!=="") {
        result = regexLettersAndNumbers.test(word);
        return result;
    }else return false;
}

