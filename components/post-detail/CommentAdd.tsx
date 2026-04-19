import { addComment } from "@/api/comments";
import SvgSend from "@/assets/send.svg";
import { feedStore } from "@/store/FeedStore";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";

interface IProps {
  id: string;
}

export const CommentAdd: FC<IProps> = observer(({ id }) => {
  const [value, setValue] = useState("");

  const addCommentMutation = useMutation({
    mutationFn: addComment,

    onMutate: async ({ id, text }: { id: string; text: string }) => {
      feedStore.addLocalComment(id);
    },

    onError: () => {
      feedStore.removeLocalComment(id);
    },

    onSuccess() {
      setValue("");
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Ваш комментарий"
        />
      </View>
      <TouchableOpacity
        disabled={!value}
        onPress={() => addCommentMutation.mutate({ id, text: value })}
        style={!value && { opacity: 0.3 }}
      >
        <SvgSend />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 16,
    marginTop: 10,
    marginBottom: 30,
  },
  input: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#EFF2F7",
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
