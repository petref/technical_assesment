export const loginUser = async ( username, password) => {
    try {
        const data = await axios.post('https://localhost:8080/login', { username, password});
    } catch(error) {
//TODO: Handle Error
        console.log(error.message);
    }
}