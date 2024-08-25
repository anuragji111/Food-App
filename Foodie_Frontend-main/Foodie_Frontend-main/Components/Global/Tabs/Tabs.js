import {View} from "react-native";
import EachTabs from "./EachTabs";
import {useTheme} from "@rneui/themed";
import {memo} from "react";

 function Tabs({tabs,state,setState}) {
   const {theme} = useTheme()
   return <View style={{flexDirection:'row', flexWrap:"wrap", gap:theme.spacing.xl, paddingHorizontal:theme.spacing.xl}}>
      {tabs.map((e,i)=>{
         if(state===i) return <EachTabs index={i} item={e} isActive={true} setActive={setState} key={i}/>
         else return <EachTabs index={i} item={e} isActive={false} setActive={setState} key={i}/>
      })}
   </View>
}
export default memo(Tabs)