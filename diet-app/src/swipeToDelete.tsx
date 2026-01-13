import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type SwipeToDeleteRowProps = {
  id: string;
  onDelete: (id: string) => void;

  /** pixels revealed when fully open */
  actionWidth?: number;

  /** Optional outer container style */
  containerStyle?: ViewStyle;

  /** The row UI */
  children: React.ReactNode;
};

export type SwipeToDeleteRowHandle = {
  close: () => void;
  open: () => void;
};

export const SwipeToDeleteRow = forwardRef<
  SwipeToDeleteRowHandle,
  SwipeToDeleteRowProps
>(({ id, onDelete, actionWidth = 88, containerStyle, children }, ref) => {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const clamp = (v: number, min: number, max: number) => {
    "worklet";
    return Math.min(Math.max(v, min), max);
  };

  const close = () => {
    translateX.value = withSpring(0, { damping: 20, stiffness: 240, mass: 0.7 });
  };

  const open = () => {
    translateX.value = withSpring(-actionWidth, {
      damping: 20,
      stiffness: 240,
      mass: 0.7,
    });
  };

  useImperativeHandle(ref, () => ({ close, open }), [actionWidth]);

  const pan = useMemo(() => {
    return Gesture.Pan()
      .minDistance(8)
      .failOffsetY([-8, 8])
      .activeOffsetX([-10, 10])
      .onBegin(() => {
        startX.value = translateX.value;
      })
      .onUpdate((e) => {
        const next = clamp(startX.value + e.translationX, -actionWidth, 0);
        translateX.value = next;
      })
      .onEnd(() => {
        const shouldOpen = translateX.value < -actionWidth * 0.4;
        translateX.value = withSpring(shouldOpen ? -actionWidth : 0, {
          damping: 20,
          stiffness: 240,
          mass: 0.7,
        });
      });
  }, [actionWidth]);

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Underlay action */}
      <View style={styles.underlay}>
        <View style={[styles.deleteUnderlay, { width: actionWidth }]}>
          <Pressable
            onPress={() => {
              onDelete(id);
              close();
            }}
            style={styles.deleteBtn}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </View>
      </View>

      {/* Foreground row */}
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.row, rowStyle]}>{children}</Animated.View>
      </GestureDetector>
    </View>
  );
});

SwipeToDeleteRow.displayName = "SwipeToDeleteRow";

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: "hidden",
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  deleteUnderlay: {
    height: "100%",
    justifyContent: "center",
  },
  deleteBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E53935",
  },
  deleteText: {
    color: "white",
    fontWeight: "700",
  },
  row: {
    backgroundColor: "rgb(55, 55, 69)",
  },
});
