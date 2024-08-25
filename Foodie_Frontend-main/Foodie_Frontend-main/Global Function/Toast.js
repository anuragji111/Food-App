import Toast from "react-native-toast-message";

const showToast = (message,type) => {
    Toast.show({
        type: type,
        text1: message,
        text2: '',
    });
}

export default showToast