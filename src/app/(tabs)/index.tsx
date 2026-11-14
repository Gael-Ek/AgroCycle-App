import { useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ENCABEZADO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>🌱 AgroYucatán</Text>
          <Text style={styles.location}>
            Agricultura inteligente
          </Text>
        </View>
        <Text style={styles.icon}>☀️</Text>
      </View>

      {/* BIENVENIDA */}
      <View style={styles.welcome}>
        <Text style={styles.greeting}>Bienvenido</Text>
        <Text style={styles.title}>
          Tu campo, bajo control.
        </Text>
        <Text style={styles.description}>
          Consulta información para cuidar tus cultivos
          y planificar tus próximas cosechas.
        </Text>
      </View>

      {/* UBICACIÓN */}
      <View style={styles.locationCard}>
        <Text style={styles.cardLabel}>
          📍 REGIÓN DE MONITOREO
        </Text>
        <Text style={styles.region}>
          Yucatán, México
        </Text>
        <Text style={styles.muted}>
          Selecciona tu municipio y terreno próximamente.
        </Text>
      </View>

      {/* INDICADORES */}
      <Text style={styles.sectionTitle}>
        Indicadores agrícolas
      </Text>

      <View style={styles.grid}>
        <View style={styles.metric}>
          <Text style={styles.metricIcon}>🌡️</Text>
          <Text style={styles.metricTitle}>Temperatura</Text>
          <Text style={styles.metricValue}>-- °C</Text>
          <Text style={styles.muted}>Sin datos todavía</Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricIcon}>💧</Text>
          <Text style={styles.metricTitle}>Humedad</Text>
          <Text style={styles.metricValue}>-- %</Text>
          <Text style={styles.muted}>Sin datos todavía</Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricIcon}>🌧️</Text>
          <Text style={styles.metricTitle}>Precipitación</Text>
          <Text style={styles.metricValue}>-- mm</Text>
          <Text style={styles.muted}>Sin datos todavía</Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricIcon}>🌿</Text>
          <Text style={styles.metricTitle}>Suelo</Text>
          <Text style={styles.metricValue}>--</Text>
          <Text style={styles.muted}>Sin datos todavía</Text>
        </View>
      </View>

      {/* ACCESOS */}
      <Text style={styles.sectionTitle}>
        Herramientas
      </Text>
      <Pressable
  style={styles.tool}
  onPress={() => router.push('/terrenos')}
>
  <Text style={styles.toolIcon}>🚜</Text>
  <View style={styles.toolInfo}>
    <Text style={styles.toolTitle}>Mis terrenos</Text>
    <Text style={styles.muted}>
      Registra y administra tus parcelas
    </Text>
  </View>
  <Text style={styles.arrow}>›</Text>
</Pressable>

      <Pressable
        style={styles.tool}
        onPress={() => alert('Próximamente: análisis agrícola')}
      >
        <Text style={styles.toolIcon}>🛰️</Text>
        <View style={styles.toolInfo}>
          <Text style={styles.toolTitle}>Análisis satelital</Text>
          <Text style={styles.muted}>
            Explora información de tu terreno
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable
        style={styles.tool}
        onPress={() => alert('Próximamente: rotación de cultivos')}
      >
        <Text style={styles.toolIcon}>🌾</Text>
        <View style={styles.toolInfo}>
          <Text style={styles.toolTitle}>Rotación de cultivos</Text>
          <Text style={styles.muted}>
            Compara diferentes estrategias
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable
        style={styles.tool}
        onPress={() => alert('Próximamente: pronóstico agrícola')}
      >
        <Text style={styles.toolIcon}>🌦️</Text>
        <View style={styles.toolInfo}>
          <Text style={styles.toolTitle}>Información climática</Text>
          <Text style={styles.muted}>
            Consulta las condiciones del clima
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Text style={styles.footer}>
        AgroYucatán · Agricultura inteligente
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F0',
  },
  header: {
    backgroundColor: '#173D2B',
    paddingTop: 55,
    paddingHorizontal: 22,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  location: {
    color: '#C5D9C8',
    marginTop: 5,
  },
  icon: {
    fontSize: 30,
  },
  welcome: {
    padding: 22,
  },
  greeting: {
    color: '#568365',
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    color: '#173D2B',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    color: '#68756B',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  locationCard: {
    backgroundColor: '#E2EDDF',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 15,
  },
  cardLabel: {
    color: '#568365',
    fontSize: 11,
    fontWeight: 'bold',
  },
  region: {
    color: '#173D2B',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 9,
  },
  muted: {
    color: '#89958A',
    fontSize: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#173D2B',
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
  },
  metric: {
    backgroundColor: '#FFFFFF',
    width: '46%',
    margin: '2%',
    padding: 16,
    borderRadius: 15,
  },
  metricIcon: {
    fontSize: 25,
  },
  metricTitle: {
    color: '#68756B',
    fontSize: 13,
    marginTop: 12,
  },
  metricValue: {
    color: '#173D2B',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  tool: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolIcon: {
    fontSize: 27,
  },
  toolInfo: {
    flex: 1,
    marginLeft: 14,
  },
  toolTitle: {
    color: '#173D2B',
    fontSize: 15,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 27,
    color: '#568365',
  },
  footer: {
    textAlign: 'center',
    color: '#89958A',
    fontSize: 12,
    marginVertical: 30,
  },
});
