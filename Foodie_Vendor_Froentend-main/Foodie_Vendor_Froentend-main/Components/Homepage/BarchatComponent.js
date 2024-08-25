import {BarChart} from "react-native-chart-kit";
import {ActivityIndicator, Dimensions} from "react-native";
import {useEffect, useState} from "react";
import {GetBarGraphData} from "../../Api/Graph";
import {useTheme} from "@rneui/themed";

export const BarchatComponent = () => {
    const [Data,setData] = useState(null)
    const[Loading,setLoading] = useState(false)
    async function getBarData(){
        try{
            setLoading(true)
            const Data = await GetBarGraphData()
            const temp = {
                labels: [],
                datasets: [
                    {
                        data: [],
                    },
                ],
            };
            for (const [key, value] of Object.entries(Data.Data)) {
                temp.labels.push(key)
                temp.datasets[0].data.push(value)
            }
            console.log(temp)
            setData(temp)
        }catch (e) {

        }
        setLoading(false)
    }

    useEffect(() => {
        getBarData()
    }, []);
    const {theme} = useTheme()
    return (
        <>
            {Loading && <ActivityIndicator color={theme.colors.primary}/>}
            {
                !Loading && Data &&  <BarChart
                    data={Data}
                    width={Dimensions.get("window").width}
                    height={300}
                    yAxisLabel=""
                    flatColor={true}
                    fromZero={true}
                    withVerticalLabels={true}
                    chartConfig={{
                        backgroundColor: "#8f00e2",
                        backgroundGradientFrom: "#8a00fb",
                        backgroundGradientTo: "#9d26ff",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, 0.58)`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,
                        style: {
                            borderRadius: 0,
                        },
                    }}
                    verticalLabelRotation={30}
                    yAxisSuffix={""}/>
            }
        </>
    )
}
