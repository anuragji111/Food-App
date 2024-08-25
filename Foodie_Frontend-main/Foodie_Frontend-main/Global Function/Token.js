import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (token,email,name) => {
    try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('name', name);
        return true
    } catch (e) {
        console.log(e)
        return false
    }
};

const getData = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const email = await AsyncStorage.getItem('email');
        const name = await AsyncStorage.getItem('name');
        return {
            token,
            email,
            name
        }
    } catch (e) {
        return {}
    }
};

export {storeData, getData}