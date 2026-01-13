import { ScrollView, View, Text, StyleSheet, Pressable, TextProps } from "react-native";
import { styles } from "./style";
import { router } from "expo-router";
import { calculateProteinDensity } from "./helpers"
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { createFood, createFoodEaten, listFoods, FoodRow, deleteFromFoodHistory, deleteAllFoods, deleteFromFoods } from "../src/db/foods";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";
import { SwipeToDeleteRow } from "../src/swipeToDelete"

export const BoldText = (props: TextProps) => (
  <Text {...props} style={[{ fontWeight: "bold", color: "#ffffffff" }, props.style]} />
);

function returnValues(name: string, calories: number, protein: number) {
  router.replace({
    pathname: "/(tabs)",
    params: {
      id: String(Date.now()),       
      name: String(name),
      calories: String(calories),    
      protein: String(protein),        
    },
  });
}

type dataLineProps = {
  title: string,
  children?: React.ReactNode,
};

export function DataLine({title, children}: dataLineProps){
  return(
    <View style={{flexDirection: "row", justifyContent: "space-between", backgroundColor: "#373746", padding: 10, marginVertical: 2, borderRadius: 10}}>
      <Text style={{ color: "#ffffffff", fontWeight: "500"}}>{title}</Text>
      {/* <Text style={{ color: "#ffffffff", fontWeight: "bold"}}>{data}</Text> */}
      <View style={{flexDirection: "row"}}>{children}</View>
    </View>
  );
}

type foodSavedItemProps = {
  name: string;
  calories: number,
  protein: number,
  uuid: number,
  weight: number,
  refresh: () => void,
};

export function FoodSavedItem({ name, calories, protein, uuid, weight, refresh }: foodSavedItemProps){
  var onDelete = () => {
    deleteFromFoods(uuid)
    refresh();
  }

  var onPress = () => {
      router.push({
        pathname: "/(tabs)/log-item/weight-picker",
        params: {
          foodName: name
        },
      });
  }
  
  return baseFoodItem({ 
    name: name, 
    calories: calories, 
    protein: protein, 
    uuid: uuid, 
    weight: weight,
    onDelete: onDelete, 
    onPress: onPress,
  })
}


type foodItemHistoryItemProps = {
  name: string;
  calories: number,
  protein: number,
  uuid: number,
  weight: number,
  refresh: () => void,
};

export function FoodHistoryItem({ name, calories, protein, uuid, weight, refresh }: foodItemHistoryItemProps){
  var onDelete = () => {
    deleteFromFoodHistory(uuid)
    refresh()
  }
  
  return baseFoodItem({ 
    name: name, 
    calories: calories, 
    protein: protein, 
    uuid: uuid, 
    weight: weight,
    onDelete: onDelete,  
  });
}

type baseFoodItemProps = {
  name: string;
  calories: number,
  protein: number,
  uuid: number,
  weight: number,
  onDelete: () => void,
  onPress?: () => void,
};

function baseFoodItem({ name, calories, protein, uuid, weight, onDelete, onPress }: baseFoodItemProps) {
  return (
    <SwipeToDeleteRow containerStyle={{marginBottom: 3}} id={String(uuid)} onDelete={onDelete}>
      <Pressable style={styles.foodItem} onPress={onPress}
      >
        <Text style={styles.foodTitle}>{name}</Text>
        <View style={styles.foodData}>
          <Text style={[styles.foodDataValue, {marginLeft: 0}]}>{calories} Kcal</Text>
          <Text style={styles.foodDataValue}>{protein}g Protein</Text>
          <Text style={styles.foodDataValue}>{calculateProteinDensity(calories, protein)} Protein Density</Text>
          <Text style={styles.foodDataValue}>{weight}g</Text>
        </View>
      </Pressable>
    </SwipeToDeleteRow>
  );
}

function capProgress(progress: number): number{
  if (progress < 1){
    return 1;
  }

  return progress;
}

type circularProgressBarProps = {
  progress: number,
  title: string,
  innerNumber: number,
  tintColor: string,
  textColor?: string,
};

export function CircularProgressBar({progress, title, innerNumber, tintColor, textColor}: circularProgressBarProps){
  return (
      <View style={{margin: 5, marginHorizontal: 15}}>
        <AnimatedCircularProgress
          size={130}
          width={6}
          fill={capProgress(progress)}
          tintColor={tintColor}
          backgroundColor="#a5a5a9ff"
          
          rotation={0}
          lineCap="round"
        >
          {(fill: number) => (
            <View style={{ alignItems: "center" }}>
              <Text style={{fontSize: 30, color: "#ffffffff", fontWeight: "500"}}>{innerNumber}</Text>
              <Text style={{fontSize: 10, color: textColor}}>{title}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
  );
}

type KPIcardProps = {
  title: string,
  data: number,
  color?: string,
};

export function KPIcard({title, data, color}: KPIcardProps){
  return (
      <View style={styles.cardContent}>
        <View style={styles.cardTitleWrapper}>
          <BoldText style={{ fontSize: 10, textAlign: "center", color: color }}>{title}</BoldText>
        </View>

        <View style={styles.valueWrapper}>
          <BoldText style={{ fontSize: 28, textAlign: "center", color: color }}>{data}</BoldText>
        </View>
      </View>
  );
}

type titleBarWithPlusBtnProps = {
  text: string,
  onPress?: () => void,
};

export function TitleBarWithPlusBtn({text, onPress}: titleBarWithPlusBtnProps){
  return (
    <View style={styles.titleBar}>
        <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>{text}</Text>
        <Text style={{color: "white", fontWeight: "bold", fontSize: 20, padding: 10}} onPress={onPress}>+</Text>
    </View>
  );
}     

type dataTileProps = {
  data: string,
  unit: string,
  text: string,
};

export function DataTile({data, unit, text}: dataTileProps){
  return (
    <View style={{alignContent: "center", backgroundColor: "#", justifyContent: "center", padding: 10, marginHorizontal: 30}}>
        <View style={{flexDirection: "row"}}>
            <Text style={{color: "#ffffffff", fontSize: 22, fontWeight: "bold", marginRight: 3}}>{data}</Text>
            <Text style={{color: "#ffffffff", fontSize: 16, marginTop: 6 ,fontWeight: "bold"}}>{unit}</Text>
        </View>
        <Text style={{color: "#ffffffff", fontSize: 13, textAlign: "center"}}>{text}</Text>
    </View>
  );
}