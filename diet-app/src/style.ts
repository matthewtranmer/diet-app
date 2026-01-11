import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  nav: {
    width: "100%",
    backgroundColor: "black",
    padding: 15,
  },
  content: {
    marginHorizontal: 15,
    color: "#d6d6d6ff",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#171725ff",
    ...Platform.select({
        ios: { paddingTop: 50 },
        default: {}
    })
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff"
  },
  foodItem: {
    borderRadius: 10,
    backgroundColor: "#d5d5d519",
    padding: 15,
    marginBottom: 5,
  },
  foodTitle: {
    color: "#ffffffff",
  },
  foodDataValue: {
    color: "#b5b5b5ff",
    paddingRight: 10,
    marginTop: 2,
  },
  foodData: {
    flexDirection: "row",
  },
  titleBar: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  viewTitleBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    color: "white",
    fontWeight: "bold",
  },
  data: {
    backgroundColor: '#262637ff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    paddingBottom: 15
  },
  cardContent: {
    height: 90,
  },

  cardTitleWrapper: {
    height: 24,              
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
  },

  valueWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: "row",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
    backgroundColor:  "#ffffff13",
  },
  tabActive: {
    backgroundColor: "#ffffff1f"
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 14, 
    fontWeight: "600", 
    color: "#ffffffff"
  },
  screen: {
    flex: 1, 
    paddingBottom: 15,
  },
  inputTable: {},
  inputBox: {
    backgroundColor: "#ffffff13",
    paddingHorizontal: 10,
    borderColor: "#6e6e6eff",
    borderTopWidth: 0.3,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "flex-start",
  },
  inputBoxTitle: {
    color: "#ffffffff",
    paddingVertical: 17
  },
  // pageTitle: {
  //   textAlign: "center",
  //   alignSelf: "center",
  //   color: "inherit",
  //   fontSize: 14
  // }

});


// backgroundColor: "#262637ff",