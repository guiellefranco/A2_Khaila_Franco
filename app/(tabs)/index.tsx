import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import LabeledInput from "../../components/LabeledInput";

export default function MainScreen() {
  const [base, setBase] = useState("CAD");
  const [dest, setDest] = useState("");
  const [amount, setAmount] = useState("1");

  const [rate, setRate] = useState<number | null>(null);
  const [converted, setConverted] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validate = () => {
    if (!/^[A-Z]{3}$/.test(base)) return "Base currency must be 3 uppercase letters.";
    if (!/^[A-Z]{3}$/.test(dest)) return "Destination currency must be 3 uppercase letters.";
    if (isNaN(Number(amount)) || Number(amount) <= 0) return "Amount must be positive.";
    return null;
  };

  const convert = async () => {
    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }

    setLoading(true);
    setError("");
    setRate(null);
    setConverted(null);

    try {
      const API_KEY = "here";
      const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${base}`;
      const response = await fetch(url);
      const json = await response.json();

      if (!json.data || !json.data[dest]) {
        setError("Currency not supported.");
        return;
      }

      const r = json.data[dest];
      setRate(r);
      setConverted((Number(amount) * r).toFixed(2));

    } catch (e) {
      setError("Network error or invalid API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <LabeledInput label="Base Currency" value={base} onChange={setBase} />
      <LabeledInput label="Destination Currency" value={dest} onChange={setDest} />
      <LabeledInput label="Amount" value={amount} onChange={setAmount} keyboard="numeric" />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Convert" onPress={convert} disabled={loading} />
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {rate && (
        <View style={styles.resultBox}>
          <Text>Exchange Rate: {rate}</Text>
          <Text>Converted Amount: {converted}</Text>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="About" onPress={() => router.push("/about")} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  resultBox: { marginTop: 20 },
  error: { color: "red", marginTop: 10 },
});
