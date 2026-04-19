import SvgHeartLike from "@/assets/heart-like.svg";
import SvgHeart from "@/assets/heart.svg";
import { IPost } from "@/interfaces/post.interfaces";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";

const AnimatedText = Animated.createAnimatedComponent(Text);

interface IProps {
  item: IPost;
  onLike: () => void;
}

export const LikeButton = ({ item, onLike }: IProps) => {
  const scale = useSharedValue(1);
  const count = useSharedValue(item.likesCount);

  const [displayCount, setDisplayCount] = useState(item.likesCount);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    count.value = withTiming(item.likesCount, { duration: 500 });

    const id = setInterval(() => {
      setDisplayCount(Math.round(count.value));
    }, 16);

    return () => clearInterval(id);
  }, [count, item.likesCount]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    scale.value = withSpring(1.3, {}, () => {
      scale.value = withSpring(1);
    });

    onLike();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={[
          styles.actionBlock,
          animatedStyle,
          { backgroundColor: item.isLiked ? "#EA276B" : "#DDDDDD" },
        ]}
      >
        {item.isLiked ? <SvgHeartLike /> : <SvgHeart />}

        <AnimatedText
          style={{
            color: item.isLiked ? "white" : "black",
          }}
        >
          {displayCount}
        </AnimatedText>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 7,
    borderRadius: 15,
  },
});
