export const searchText = async (text) => {
    return fetch('http://127.0.0.1:8000/searchContent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
        .then((response) => response.json())
        .then((data) => {return (data)})
};
export const searchAddress = async (address) =>{
    return fetch('http://127.0.0.1:8000/searchAddress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address:(address) })
    })
    .then(response=>response.json())
    .then(data=>{return data})
}