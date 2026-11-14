import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const iniciarSesion = () => {
    if (!correo.trim() || !contrasena.trim()) {
      Alert.alert('Campos incompletos', 'Ingresa tu correo y contraseña.');
      return;
    }

    router.replace('/dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹ Volver</Text>
          </Pressable>

          <View style={styles.logoContainer}>
            <Text style={styles.logo}>🌱</Text>
            <Text style={styles.brand}>AgroCycle</Text>
            <Text style={styles.subtitle}>
              Agricultura inteligente y sostenible
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>¡Bienvenido!</Text>
            <Text style={styles.description}>
              Inicia sesión para continuar con la gestión de tus cultivos.
            </Text>

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#9BA99D"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#9BA99D"
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry
            />

            <Pressable
              style={styles.loginButton}
              onPress={iniciarSesion}
            >
              <Text style={styles.loginButtonText}>
                Iniciar sesión
              </Text>
            </Pressable>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                ¿No tienes una cuenta?
              </Text>
              <Pressable onPress={() => router.push('/registro')}>
                <Text style={styles.registerLink}> Regístrate</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.footer}>
            AgroCycle · Cultivando un futuro sostenible
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F0',
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 25,
  },
  backText: {
    color: '#315D40',
    fontSize: 16,
    fontWeight: '600',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  logo: {
    fontSize: 55,
  },
  brand: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#245238',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 13,
    color: '#718575',
    marginTop: 5,
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 22,
    elevation: 3,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#214A32',
    marginBottom: 8,
  },
  description: {
    color: '#78877B',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 25,
  },
  label: {
    color: '#315D40',
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F4F7F0',
    borderWidth: 1,
    borderColor: '#DCE7DC',
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    color: '#244631',
  },
  loginButton: {
    backgroundColor: '#2F7048',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 28,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    flexWrap: 'wrap',
  },
  registerText: {
    color: '#718575',
  },
  registerLink: {
    color: '#2F7048',
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#8A998D',
    fontSize: 12,
    marginTop: 30,
    marginBottom: 15,
  },
});
