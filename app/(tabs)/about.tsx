import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Khaila Franco</Text>
      <Text style={styles.id}>Student ID: 101364236</Text>

      <Text style={styles.desc}>
        This application converts currencies using the FreeCurrencyAPI and displays live
        exchange rates and converted amounts.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  name: { fontSize: 22, fontWeight: "700" },
  id: { fontSize: 18, marginTop: 8 },
  desc: { marginTop: 20, fontSize: 16 },
});
