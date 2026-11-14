import { useRouter } from 'expo-router';
import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* LOGOTIPO */}
        <View style={styles.header}>
          <Text style={styles.logoIcon}>🌱</Text>
          <Text style={styles.logo}>AgroCycle</Text>
        </View>

        {/* ILUSTRACIÓN */}
        <View style={styles.illustration}>
          <View style={styles.sun}>
            <Text style={styles.sunIcon}>☀️</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.plant}>🌾</Text>
            <Text style={styles.plant}>🌱</Text>
            <Text style={styles.plant}>🌿</Text>
            <Text style={styles.plant}>🌱</Text>
            <Text style={styles.plant}>🌾</Text>
          </View>

          <Text style={styles.illustrationText}>
            Agricultura inteligente y sostenible
          </Text>
        </View>

        {/* PRESENTACIÓN */}
        <View style={styles.introduction}>
          <Text style={styles.tag}>AGRICULTURA DEL FUTURO</Text>

          <Text style={styles.title}>
            Adapta tus cultivos a las condiciones de tu terreno
          </Text>

          <Text style={styles.description}>
            AgroCycle combina información ambiental y datos
            locales para ayudarte a comparar opciones de
            rotación de cultivos y tomar mejores decisiones
            para tu terreno.
          </Text>
        </View>

        {/* BENEFICIOS */}
        <View style={styles.benefits}>
          <View style={styles.benefit}>
            <Text style={styles.benefitIcon}>🌦️</Text>
            <Text style={styles.benefitText}>
              Datos ambientales
            </Text>
          </View>

          <View style={styles.benefit}>
            <Text style={styles.benefitIcon}>🌱</Text>
            <Text style={styles.benefitText}>
              Rotación de cultivos
            </Text>
          </View>
        </View>

        {/* BOTONES */}
        <View style={styles.actions}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push('/registro')}
          >
            <Text style={styles.primaryButtonText}>
              Comenzar
            </Text>
            <Text style={styles.buttonArrow}>→</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.secondaryButtonText}>
              Ya tengo una cuenta
            </Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          AgroCycle · Cultivando un futuro sostenible
        </Text>
      </ScrollView>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  logoIcon: {
    fontSize: 29,
    marginRight: 8,
  },
  logo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#173D2B',
    letterSpacing: 0.5,
  },
  illustration: {
    height: 205,
    backgroundColor: '#E2EDDF',
    borderRadius: 22,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 17,
  },
  sun: {
    position: 'absolute',
    top: 20,
    right: 35,
  },
  sunIcon: {
    fontSize: 38,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#B6D0A9',
    width: '100%',
    height: 115,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    paddingBottom: 12,
  },
  plant: {
    fontSize: 34,
    marginHorizontal: 5,
  },
  illustrationText: {
    color: '#365B40',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 12,
  },
  introduction: {
    marginTop: 28,
  },
  tag: {
    color: '#568365',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  title: {
    color: '#173D2B',
    fontSize: 29,
    lineHeight: 36,
    fontWeight: 'bold',
    marginTop: 12,
  },
  description: {
    color: '#68756B',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 13,
  },
  benefits: {
    flexDirection: 'row',
    marginTop: 22,
    gap: 10,
  },
  benefit: {
    flex: 1,
    backgroundColor: '#E8EFE4',
    borderRadius: 13,
    padding: 12,
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 23,
  },
  benefitText: {
    color: '#365B40',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 7,
    textAlign: 'center',
  },
  actions: {
    marginTop: 27,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#24583A',
    padding: 17,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonArrow: {
    color: '#FFFFFF',
    fontSize: 20,
    position: 'absolute',
    right: 20,
  },
  secondaryButton: {
    padding: 15,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#24583A',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#24583A',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    color: '#89958A',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 25,
  },
});
