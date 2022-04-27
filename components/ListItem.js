import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";

const ListItem = (props) => {
  const [state, setState] = React.useState(false);
  const translateX = useSharedValue(0);
  const Width_Screen = Dimensions.get("window").width;
  const translateX_Threshold = -Width_Screen * 0.3;
  const itemHeight = useSharedValue(70);
  const marginVerticle = useSharedValue(10);
  const opacity = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      const shouldbeDismissed = translateX.value < translateX_Threshold;
      if (shouldbeDismissed) {
        translateX.value = withTiming(-Width_Screen);
        itemHeight.value = withTiming(0);
        marginVerticle.value = withTiming(0);
        opacity.value = withSpring(0, null, (isFinished) => {
          //props.onDismiss();
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < translateX_Threshold ? 1 : 0);
    return {
      opacity,
    };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVerticle.value,
      opacity: opacity.value,
    };
  });

  console.log(state);
  //on item.height === 0, set state to true
  //on item.height === 70, set state to false
  React.useEffect(() => {
    if (itemHeight.value === 0) {
      setState(true);
    } else {
      setState(false);
    }
  }, [opacity.value]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View style={[styles.taskConatiner, rTaskContainerStyle]}>
        <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
          <Icon name="rocket" size={30} color="#900" />
        </Animated.View>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.task, animatedStyle]}>
            <Text>{props.task.title}</Text>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  task: {
    width: "90%",
    height: 70,
    backgroundColor: "#fff",

    borderRadius: 10,
    justifyContent: "center",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  taskConatiner: {
    width: "100%",
    alignItems: "center",
  },
  iconContainer: {
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "10%",
  },
});
