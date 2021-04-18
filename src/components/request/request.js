import axios from "./axios";

export const predict = (prediction) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/predict`, prediction)
            .then((data) => {
                resolve(data)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
                reject("Something went wrong")
            })

    })
}