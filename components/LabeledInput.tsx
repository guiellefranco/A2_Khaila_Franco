import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChange: (text: string) => void;
  keyboard?: "default" | "numeric";
};

export default function LabeledInput({ label, value, onChange, keyboard }: Props) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        autoCapitalize="characters"
        keyboardType={keyboard || "default"}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
  },
});
