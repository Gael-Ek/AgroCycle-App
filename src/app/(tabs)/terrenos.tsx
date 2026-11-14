import { useEffect, useState } from 'react';

import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Terreno = {
  id: string;
  nombre: string;
  municipio: string;
  superficie: string;
  cultivo: string;
};

const STORAGE_KEY = '@agroyucatan/terrenos';

export default function TerrenosScreen() {
  const [nombre, setNombre] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [cultivo, setCultivo] = useState('');

  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [cargando, setCargando] = useState(true);

  // Cargar terrenos guardados
  useEffect(() => {
    const cargarTerrenos = async () => {
      try {
        const datos = await AsyncStorage.getItem(STORAGE_KEY);

        if (datos) {
          setTerrenos(JSON.parse(datos));
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los terrenos.');
      } finally {
        setCargando(false);
      }
    };

    cargarTerrenos();
  }, []);

  // Guardar terreno
  const guardarTerreno = async () => {
    const nombreLimpio = nombre.trim();
    const municipioLimpio = municipio.trim();
    const cultivoLimpio = cultivo.trim();
    const hectareas = Number(superficie.replace(',', '.'));

    if (
      !nombreLimpio ||
      !municipioLimpio ||
      !superficie.trim() ||
      !cultivoLimpio
    ) {
      Alert.alert('Campos incompletos', 'Completa todos los campos.');
      return;
    }

    if (!Number.isFinite(hectareas) || hectareas <= 0) {
      Alert.alert('Superficie inválida', 'Ingresa una cantidad válida.');
      return;
    }

    const nuevoTerreno: Terreno = {
      id: Date.now().toString(),
      nombre: nombreLimpio,
      municipio: municipioLimpio,
      superficie: hectareas.toString(),
      cultivo: cultivoLimpio,
    };

    const nuevosTerrenos = [...terrenos, nuevoTerreno];

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nuevosTerrenos)
      );

      setTerrenos(nuevosTerrenos);

      setNombre('');
      setMunicipio('');
      setSuperficie('');
      setCultivo('');

      Alert.alert('¡Excelente!', 'Tu terreno se guardó correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el terreno.');
    }
  };

  // Eliminar terreno
  const eliminarTerreno = (id: string) => {
    Alert.alert(
      'Eliminar terreno',
      '¿Estás seguro de que deseas eliminar este terreno?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const nuevosTerrenos = terrenos.filter(
              terreno => terreno.id !== id
            );

            try {
              await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(nuevosTerrenos)
              );

              setTerrenos(nuevosTerrenos);
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el terreno.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🌱 AgroYucatán</Text>

        <Text style={styles.headerTitle}>Mis terrenos</Text>

        <Text style={styles.headerDescription}>
          Administra tus parcelas agrícolas.
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>
          Registrar nuevo terreno
        </Text>

        <Text style={styles.label}>Nombre del terreno</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Parcela El Roble"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Municipio</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Mérida"
          value={municipio}
          onChangeText={setMunicipio}
        />

        <Text style={styles.label}>Superficie (hectáreas)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 5"
          keyboardType="decimal-pad"
          value={superficie}
          onChangeText={setSuperficie}
        />

        <Text style={styles.label}>Cultivo principal</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Maíz, chile habanero..."
          value={cultivo}
          onChangeText={setCultivo}
        />

        <Pressable
          style={styles.button}
          onPress={guardarTerreno}
          disabled={cargando}
        >
          <Text style={styles.buttonText}>
            Guardar terreno
          </Text>
        </Pressable>
      </View>

      {/* LISTA DE TERRENOS */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>
          Mis parcelas ({terrenos.length})
        </Text>

        {cargando ? (
          <Text style={styles.empty}>
            Cargando terrenos...
          </Text>
        ) : terrenos.length === 0 ? (
          <Text style={styles.empty}>
            Todavía no tienes terrenos registrados.
          </Text>
        ) : (
          terrenos.map(terreno => (
            <View key={terreno.id} style={styles.terrainCard}>
              <Text style={styles.terrainName}>
                🌾 {terreno.nombre}
              </Text>

              <Text style={styles.terrainInfo}>
                📍 {terreno.municipio}
              </Text>

              <Text style={styles.terrainInfo}>
                📐 {terreno.superficie} hectáreas
              </Text>

              <Text style={styles.terrainInfo}>
                🌱 Cultivo: {terreno.cultivo}
              </Text>

              <Pressable
                style={styles.deleteButton}
                onPress={() => eliminarTerreno(terreno.id)}
              >
                <Text style={styles.deleteText}>
                  Eliminar terreno
                </Text>
              </Pressable>
            </View>
          ))
        )}
      </View>

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
    paddingBottom: 30,
  },
  logo: {
    fontSize: 21,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 25,
  },
  headerDescription: {
    color: '#C5D9C8',
    marginTop: 8,
  },
  form: {
    padding: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#173D2B',
    marginBottom: 18,
  },
  label: {
    color: '#173D2B',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE5D9',
    borderRadius: 10,
    padding: 15,
    fontSize: 15,
    color: '#173D2B',
  },
  button: {
    backgroundColor: '#286B45',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listSection: {
    paddingHorizontal: 22,
    paddingTop: 5,
  },
  empty: {
    color: '#89958A',
    fontSize: 14,
    marginVertical: 15,
  },
  terrainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 17,
    marginBottom: 14,
  },
  terrainName: {
    color: '#173D2B',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  terrainInfo: {
    color: '#68756B',
    fontSize: 14,
    marginBottom: 8,
  },
  deleteButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FCE8E6',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  deleteText: {
    color: '#B42318',
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    color: '#89958A',
    fontSize: 12,
    marginVertical: 30,
  },
});

