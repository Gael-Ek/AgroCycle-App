import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ParcelCoordinates,
  ParcelMapPicker,
} from "@/components/ui/parcel-map-picker";

import { useGetCrops } from "@/hooks/use-crop";
import {
  useGetParcelById,
  useReverseGeocode,
  useUpdateParcel,
} from "@/hooks/use-parcels";

import { UpdateParcelForm, updateParcelSchema } from "@/schemas/parcels-schema";

export default function ParcelsEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [coordinates, setCoordinates] = useState<ParcelCoordinates | null>(
    null,
  );

  // Consultar parcela
  const { data: parcel, isLoading, isError, refetch } = useGetParcelById(id);

  // Consultar cultivos
  const {
    data: crops = [],
    isLoading: isCropsLoading,
    isError: isCropsError,
    refetch: refetchCrops,
  } = useGetCrops();

  // Mutaciones
  const updateParcel = useUpdateParcel();
  const reverseGeocode = useReverseGeocode();

  // Formulario
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateParcelForm>({
    resolver: zodResolver(updateParcelSchema),
    defaultValues: {
      terreno_name: "",
      country: "",
      state: "",
      municipality: "",
      area_hectares: 0,
      target_crop: "",
      latitude: undefined,
      longitude: undefined,
    },
  });

  // Precargar información de la parcela
  useEffect(() => {
    if (!parcel) return;

    reset({
      terreno_name: parcel.terreno_name,
      country: parcel.country,
      state: parcel.state,
      municipality: parcel.municipality,
      area_hectares: Number(parcel.area_hectares),
      target_crop: String(parcel.target_crop),
      latitude: Number(parcel.latitude),
      longitude: Number(parcel.longitude),
    });

    setCoordinates({
      latitude: Number(parcel.latitude),
      longitude: Number(parcel.longitude),
    });
  }, [parcel, reset]);

  // Cambiar ubicación en el mapa
  async function handleLocationChange(newCoordinates: ParcelCoordinates) {
    setCoordinates(newCoordinates);

    setValue("latitude", newCoordinates.latitude, {
      shouldValidate: true,
    });

    setValue("longitude", newCoordinates.longitude, {
      shouldValidate: true,
    });

    try {
      const address = await reverseGeocode.mutateAsync(newCoordinates);

      if (address) {
        setValue("country", address.country, {
          shouldValidate: true,
        });

        setValue("state", address.state, {
          shouldValidate: true,
        });

        setValue("municipality", address.municipality, {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.error("Error al obtener dirección:", error);

      Alert.alert(
        "Aviso",
        "No fue posible obtener la dirección automáticamente. Puedes modificarla manualmente.",
      );
    }
  }

  // Actualizar parcela
  async function onSubmit(data: UpdateParcelForm) {
    try {
      await updateParcel.mutateAsync({
        id: String(id),
        data,
      });

      Alert.alert(
        "Parcela actualizada",
        "Los cambios se guardaron correctamente.",
        [
          {
            text: "Aceptar",
            onPress: () => router.back(),
          },
        ],
      );
    } catch (error) {
      console.error("Error al actualizar parcela:", error);

      Alert.alert(
        "Error",
        "No fue posible actualizar la parcela. Inténtalo nuevamente.",
      );
    }
  }

  const cargando = updateParcel.isPending || reverseGeocode.isPending;

  // Estado de carga
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#F4F7F0]">
        <ActivityIndicator size="large" color="#3D7548" />

        <Text className="mt-3 text-gray-500">Cargando información...</Text>
      </SafeAreaView>
    );
  }

  // Estado de error
  if (isError || !parcel) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#F4F7F0] px-6">
        <Text className="text-lg font-bold text-gray-800">
          No se pudo cargar la parcela
        </Text>

        <Text className="mt-2 text-center text-gray-500">
          Comprueba tu conexión e intenta nuevamente.
        </Text>

        <Pressable
          onPress={() => refetch()}
          className="mt-5 rounded-xl bg-green-700 px-6 py-3"
        >
          <Text className="font-semibold text-white">Reintentar</Text>
        </Pressable>

        <Pressable onPress={() => router.back()} className="mt-4">
          <Text className="font-semibold text-gray-600">Regresar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7F0]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 22,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <View className="flex-row items-center gap-5">
          <Pressable
            onPress={() => router.back()}
            className="h-[40px] w-[40px] items-center justify-center rounded-full bg-[#EAF3E9]"
          >
            <Text className="text-[20px] font-bold text-[#245238]">‹</Text>
          </Pressable>

          <View className="flex-1">
            <Text className="text-xl font-bold text-[#173D2B]">
              Editar parcela
            </Text>

            <Text className="mt-1 text-xs text-[#849184]">
              Modifica la información de tu terreno
            </Text>
          </View>
        </View>

        {/* Nombre */}
        <Text className="mb-2 mt-[20px] text-sm font-semibold text-[#173D2B]">
          Nombre del terreno
        </Text>

        <Controller
          control={control}
          name="terreno_name"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="rounded-[10px] border border-[#DCE5D9] bg-white p-[15px] text-[15px] text-[#173D2B]"
              placeholder="Ej. Parcela El Roble"
              placeholderTextColor="#89958A"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {errors.terreno_name && (
          <Text className="mt-1 text-xs text-red-600">
            {errors.terreno_name.message}
          </Text>
        )}

        {/* Mapa */}
        <ParcelMapPicker value={coordinates} onChange={handleLocationChange} />

        {reverseGeocode.isPending && (
          <View className="mt-3 flex-row items-center">
            <ActivityIndicator color="#286B45" />

            <Text className="ml-2 text-sm text-[#68756B]">
              Obteniendo dirección...
            </Text>
          </View>
        )}

        {/* País */}
        <Text className="mb-2 mt-[15px] text-sm font-semibold text-[#173D2B]">
          País
        </Text>

        <Controller
          control={control}
          name="country"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="rounded-[10px] border border-[#DCE5D9] bg-white p-[15px] text-[15px] text-[#173D2B]"
              placeholder="Ej. México"
              placeholderTextColor="#89958A"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {errors.country && (
          <Text className="mt-1 text-xs text-red-600">
            {errors.country.message}
          </Text>
        )}

        {/* Estado */}
        <Text className="mb-2 mt-[15px] text-sm font-semibold text-[#173D2B]">
          Estado
        </Text>

        <Controller
          control={control}
          name="state"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="rounded-[10px] border border-[#DCE5D9] bg-white p-[15px] text-[15px] text-[#173D2B]"
              placeholder="Ej. Yucatán"
              placeholderTextColor="#89958A"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {errors.state && (
          <Text className="mt-1 text-xs text-red-600">
            {errors.state.message}
          </Text>
        )}

        {/* Municipio */}
        <Text className="mb-2 mt-[15px] text-sm font-semibold text-[#173D2B]">
          Municipio
        </Text>

        <Controller
          control={control}
          name="municipality"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="rounded-[10px] border border-[#DCE5D9] bg-white p-[15px] text-[15px] text-[#173D2B]"
              placeholder="Ej. Mérida"
              placeholderTextColor="#89958A"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {errors.municipality && (
          <Text className="mt-1 text-xs text-red-600">
            {errors.municipality.message}
          </Text>
        )}

        {/* Superficie */}
        <Text className="mb-2 mt-[15px] text-sm font-semibold text-[#173D2B]">
          Superficie (hectáreas)
        </Text>

        <Controller
          control={control}
          name="area_hectares"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="rounded-[10px] border border-[#DCE5D9] bg-white p-[15px] text-[15px] text-[#173D2B]"
              placeholder="Ej. 5"
              placeholderTextColor="#89958A"
              keyboardType="decimal-pad"
              value={value === undefined ? "" : String(value)}
              onChangeText={(text) => {
                const normalized = text.replace(",", ".");

                onChange(normalized === "" ? undefined : Number(normalized));
              }}
              onBlur={onBlur}
            />
          )}
        />

        {errors.area_hectares && (
          <Text className="mt-1 text-xs text-red-600">
            {errors.area_hectares.message}
          </Text>
        )}

        {/* Cultivo */}
        <Text className="mb-2 mt-[15px] text-sm font-semibold text-[#173D2B]">
          Cultivo principal
        </Text>

        <Controller
          control={control}
          name="target_crop"
          render={({ field: { value, onChange } }) => (
            <View className="overflow-hidden rounded-[10px] border border-[#DCE5D9] bg-white">
              {isCropsLoading ? (
                <View className="flex-row items-center p-4">
                  <ActivityIndicator color="#286B45" />

                  <Text className="ml-3 text-sm text-[#89958A]">
                    Cargando cultivos...
                  </Text>
                </View>
              ) : isCropsError ? (
                <Pressable onPress={() => refetchCrops()} className="p-4">
                  <Text className="text-sm text-red-600">
                    No se pudieron cargar los cultivos. Toca para reintentar.
                  </Text>
                </Pressable>
              ) : (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={{
                    color: "#173D2B",
                    height: 55,
                  }}
                  dropdownIconColor="#245238"
                >
                  <Picker.Item
                    label="Selecciona un cultivo"
                    value=""
                    color="#89958A"
                  />

                  {crops.map((crop) => (
                    <Picker.Item
                      key={crop.id}
                      label={crop.name}
                      value={crop.id}
                    />
                  ))}
                </Picker>
              )}
            </View>
          )}
        />

        {errors.target_crop && (
          <Text className="mt-1 text-xs text-red-600">
            {errors.target_crop.message}
          </Text>
        )}

        {/* Botón guardar */}
        <Pressable
          className={`mt-[30px] flex-row items-center justify-center rounded-xl bg-[#286B45] p-[17px] ${
            cargando ? "opacity-50" : "active:opacity-80"
          }`}
          onPress={() => handleSubmit(onSubmit)()}
          disabled={cargando}
        >
          {updateParcel.isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-base font-bold text-white">
              Guardar cambios
            </Text>
          )}
        </Pressable>

        {/* Cancelar */}
        <Pressable
          onPress={() => router.back()}
          disabled={cargando}
          className="mt-4 items-center p-3"
        >
          <Text className="font-semibold text-gray-500">Cancelar</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
