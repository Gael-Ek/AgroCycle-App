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

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>🌱 AgroCycle</Text>
            <Text style={styles.headerSubtitle}>
              Agricultura inteligente
            </Text>
          </View>

          <View style={styles.profile}>
            <Text style={styles.profileText}>A</Text>
          </View>
        </View>

        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeSmall}>BIENVENIDO A</Text>
          <Text style={styles.welcomeTitle}>AgroCycle</Text>
          <Text style={styles.welcomeDescription}>
            Adapta tus cultivos a las condiciones de tu terreno.
          </Text>

          <View style={styles.location}>
            <Text style={styles.locationText}>
              📍 Yucatán, México
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Condiciones ambientales
          </Text>
          <Text style={styles.sectionSubtitle}>
            Datos de ejemplo
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>🌡️</Text>
            <Text style={styles.metricLabel}>Temperatura</Text>
            <Text style={styles.metricValue}>29 °C</Text>
            <Text style={styles.metricDescription}>Ambiente cálido</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>💧</Text>
            <Text style={styles.metricLabel}>Humedad</Text>
            <Text style={styles.metricValue}>68 %</Text>
            <Text style={styles.metricDescription}>Humedad moderada</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>🌧️</Text>
            <Text style={styles.metricLabel}>Precipitación</Text>
            <Text style={styles.metricValue}>12 mm</Text>
            <Text style={styles.metricDescription}>Dato ilustrativo</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricIcon}>🌱</Text>
            <Text style={styles.metricLabel}>Condición del suelo</Text>
            <Text style={styles.metricValue}>Húmedo</Text>
            <Text style={styles.metricDescription}>Ejemplo de condición</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mis herramientas</Text>
          <Text style={styles.sectionSubtitle}>
            Administra tu actividad agrícola
          </Text>
        </View>

        <Pressable
          style={styles.actionCard}
         onPress={() => router.push('/terrenos')}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionEmoji}>🗺️</Text>
          </View>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Mis terrenos</Text>
            <Text style={styles.actionDescription}>
              Registra y administra tus terrenos agrícolas.
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable
          style={styles.actionCard}
          onPress={() => router.push('/explore')}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionEmoji}>🌾</Text>
          </View>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Explorar cultivos</Text>
            <Text style={styles.actionDescription}>
              Consulta herramientas e información agrícola.
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>🌿 Consejo agrícola</Text>
          <Text style={styles.tipText}>
            Conocer las condiciones del suelo y el clima ayuda a
            elegir cultivos adecuados y planificar la rotación.
          </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 15,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#245238',
  },
  headerSubtitle: {
    color: '#819083',
    fontSize: 12,
    marginTop: 3,
  },
  profile: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#DCEBDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#245238',
    fontWeight: 'bold',
    fontSize: 18,
  },
  welcomeCard: {
    backgroundColor: '#245238',
    marginHorizontal: 20,
    padding: 23,
    borderRadius: 20,
    marginBottom: 27,
  },
  welcomeSmall: {
    color: '#C5DEC8',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 7,
  },
  welcomeDescription: {
    color: '#E0EDE1',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  location: {
    alignSelf: 'flex-start',
    backgroundColor: '#386B4A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 17,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  sectionHeader: {
    paddingHorizontal: 22,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#244631',
  },
  sectionSubtitle: {
    color: '#849184',
    fontSize: 12,
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    marginBottom: 27,
  },
  metricCard: {
    width: '46%',
    backgroundColor: '#FFFFFF',
    margin: '2%',
    padding: 15,
    borderRadius: 17,
    elevation: 2,
  },
  metricIcon: {
    fontSize: 27,
    marginBottom: 10,
  },
  metricLabel: {
    color: '#778579',
    fontSize: 12,
  },
  metricValue: {
    color: '#245238',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 5,
  },
  metricDescription: {
    color: '#91A094',
    fontSize: 10,
    marginTop: 5,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 16,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#EAF3E9',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionEmoji: {
    fontSize: 25,
  },
  actionInfo: {
    flex: 1,
    marginLeft: 13,
  },
  actionTitle: {
    color: '#28533A',
    fontSize: 15,
    fontWeight: 'bold',
  },
  actionDescription: {
    color: '#849184',
    fontSize: 11,
    marginTop: 4,
  },
  arrow: {
    color: '#477D56',
    fontSize: 28,
  },
  tipCard: {
    backgroundColor: '#E5F0E2',
    marginHorizontal: 20,
    marginTop: 13,
    padding: 17,
    borderRadius: 16,
  },
  tipTitle: {
    color: '#28533A',
    fontSize: 15,
    fontWeight: 'bold',
  },
  tipText: {
    color: '#58725D',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },
  footer: {
    color: '#96A196',
    fontSize: 11,
    textAlign: 'center',
    marginVertical: 25,
  },
});
