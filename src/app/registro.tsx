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

export default function RegistroScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const registrarUsuario = () => {
    if (!nombre.trim() || !correo.trim() || !contrasena || !confirmar) {
      Alert.alert('Campos incompletos', 'Completa todos los campos.');
      return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
      Alert.alert('Correo inválido', 'Ingresa un correo electrónico válido.');
      return;
    }

    if (contrasena.length < 8) {
      Alert.alert(
        'Contraseña no válida',
        'Utiliza al menos 8 caracteres.'
      );
      return;
    }

    if (contrasena !== confirmar) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    Alert.alert(
      'AgroCycle',
      'Formulario validado. Próximamente conectaremos el registro de usuarios.'
    );
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

          <View style={styles.header}>
            <Text style={styles.logo}>🌱</Text>
            <Text style={styles.brand}>AgroCycle</Text>
            <Text style={styles.subtitle}>
              Únete a una agricultura más inteligente
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.description}>
              Regístrate para comenzar a gestionar tus terrenos y cultivos.
            </Text>

            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              placeholderTextColor="#9BA99D"
              value={nombre}
              onChangeText={setNombre}
            />

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
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor="#9BA99D"
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry
            />

            <Text style={styles.label}>Confirmar contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Repite tu contraseña"
              placeholderTextColor="#9BA99D"
              value={confirmar}
              onChangeText={setConfirmar}
              secureTextEntry
            />

            <Pressable
              style={styles.registerButton}
              onPress={registrarUsuario}
            >
              <Text style={styles.registerButtonText}>
                Crear cuenta
              </Text>
            </Pressable>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                ¿Ya tienes una cuenta?
              </Text>
              <Pressable onPress={() => router.push('/login')}>
                <Text style={styles.loginLink}> Iniciar sesión</Text>
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
    marginBottom: 18,
  },
  backText: {
    color: '#315D40',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    fontSize: 48,
  },
  brand: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#245238',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 13,
    color: '#718575',
    marginTop: 5,
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 22,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#214A32',
    marginBottom: 8,
  },
  description: {
    color: '#78877B',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
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
    padding: 14,
    fontSize: 15,
    color: '#244631',
  },
  registerButton: {
    backgroundColor: '#2F7048',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 22,
  },
  loginText: {
    color: '#718575',
  },
  loginLink: {
    color: '#2F7048',
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#8A998D',
    fontSize: 12,
    marginTop: 25,
    marginBottom: 15,
  },
});
