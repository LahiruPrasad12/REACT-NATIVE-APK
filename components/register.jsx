import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const registerUser = async (email, password, firstname, lastname) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://recipt-37348.firebaseapp.com",
          })
          .then(() => {
            alert("Verification email sent");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({ firstname, lastname, email });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 23 }}>
        Create a new account
      </Text>
      <View style={{ marginTop: 40 }}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaaaaa"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            autoCorrect={false}
          />

        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            autoCorrect={false}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            secureTextEntry={true}
          />

        </View>
      </View>
      <TouchableOpacity
        onPress={() => registerUser(email, password, firstname, lastname)}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },

  button: {
    marginTop: 30,
    height: 50,
    width: 250,
    backgroundColor: "#aaaaaa",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: 20
  },
  formContainer: {
    flexDirection: "row",
    width: "80%",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
});
