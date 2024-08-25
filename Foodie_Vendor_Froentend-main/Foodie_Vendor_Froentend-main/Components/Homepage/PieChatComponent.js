import {PieChart} from "react-native-chart-kit";
import {ActivityIndicator, Dimensions, View} from "react-native";
import {useEffect, useState} from "react";
import {GetBarGraphData} from "../../Api/Graph";
import {GetOrders} from "../../Api/Orders";
import {useTheme} from "@rneui/themed";

export const PieChatComponent = () => {
    const [Data,setData] = useState(null)
    const[Loading,setLoading] = useState(false)
    async function getPieData(){
        try{
            setLoading(true)
            const data =  await GetOrders()
            console.log(data.orders)
            const temp = [
                {
                    name: "Completed",
                    population: 0,
                    color: "rgb(114,203,84)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                },
                {
                    name: "Pending",
                    population: 0,
                    color: "#b93e69",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                },
            ];
            let pending = 0
            let completed = 0
            data.orders.forEach(e=>{
                if(e.status === 'completed'){
                    completed+=1
                }else if(e.status === 'pending'){
                    pending+=1;
                }
            })
            temp[0].population = completed
            temp[1].population = pending
            setData(temp)
        }catch (e) {

        }
        setLoading(false)
    }

    useEffect(() => {
        getPieData()
    }, []);
    const {theme} = useTheme()
    return (
        <View style={{
            justifyContent:"center",
            alignItems:"center",
        }}>
            {Loading && <ActivityIndicator color={theme.colors.primary}/>}
            {!Loading && Data &&  <PieChart
                data={Data}
                width={Dimensions.get("window").width }
                height={300}
                chartConfig={{
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 0,
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"25"}
                absolute
            />}
        </View>
    )
}
