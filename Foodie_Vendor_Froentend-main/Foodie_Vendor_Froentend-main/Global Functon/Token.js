import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (token,email,name,storeName,id) => {
    try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('storeName', storeName);
        await AsyncStorage.setItem('id', id);
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
        const store = await AsyncStorage.getItem('storeName');
        const id = await AsyncStorage.getItem('id');
        return {
            token,
            email,
            name,
            store,
            id,
        }
    } catch (e) {
        return {}
    }
};

export {storeData, getData}
