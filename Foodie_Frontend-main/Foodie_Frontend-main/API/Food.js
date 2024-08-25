import axios from "axios";
import FinalUrl from "../GlobalConstant/ApiUrl";
import {getData} from "../Global Function/Token";
async function FetchFood() {
    try{
        const response = await axios.get(`${FinalUrl}GetProductsFilter`);
        return response.data;
    }
    catch(err){
        console.log('====================================');
        console.log(err.response.data);
        console.log('====================================');
        throw err;
    }
}

async function FetchFoodByCategory(category) {
    try{
        const response = await axios.get(`${FinalUrl}GetProductsFilter?category=${category}`)
        return response.data;
    }
    catch(err){
        console.log('====================================');
        console.log(err.response.data);
        console.log('====================================');
        throw err;
    }
}

async function FetchFoodBySearchAndCategory(search,category) {
    try{
        const response = await axios.get(`${FinalUrl}GetProductsFilter?search=${search}&category=${category}`)
        return response.data;
    }
    catch(err){
        console.log('====================================');
        console.log(err.response.data);
        console.log('====================================');
        throw err;
    }
}

async function FetchFoodById(id) {
    try{
        const response = await axios.get(`${FinalUrl}GetProductsWithId/${id}`)
        return response.data;
    }
    catch(err){
        console.log('====================================');
        console.log(err.response.data);
        console.log('====================================');
        throw err;
    }
}

async function FetchFoodReviews(id){
    try{
        const response = await axios.get(`${FinalUrl}GetProductReviews/${id}`)
        return response.data;
    }
    catch(err){
        console.log('====================================');
        console.log(err.response.data);
        console.log('====================================');
        throw err;
    }
}

async function PostFoodReview(id,rating,comment) {
    let data = JSON.stringify({
        "rating":rating,
        "productId":id,
        "comment":comment,
    });
    const userData = await getData()
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: FinalUrl + "/AddReview",
        headers: {
            'token': userData.token,
            'Content-Type': 'application/json',
        },
        data : data,
    };
    try{
        const response = await axios.request(config)
        return response.data;
    }
    catch(err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}
export { FetchFood, FetchFoodByCategory, FetchFoodBySearchAndCategory, FetchFoodById, FetchFoodReviews, PostFoodReview};
