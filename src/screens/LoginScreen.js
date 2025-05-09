import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
 import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
//import { auth } from '../../firebaseconfig.js'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      // await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace('Home'); // simula login
    } catch (error) {
      Alert.alert('Erro no login', error.message);
    }
  };

  const handleRegister = async () => {
    try {
      // await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert('Registro realizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro no registro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.or}>ou</Text>
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8,
    paddingHorizontal: 10, marginBottom: 15
  },
  or: { textAlign: 'center', marginVertical: 10, color: '#999' }
});
