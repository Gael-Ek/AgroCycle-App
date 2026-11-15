import { useState } from "react";
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
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import {
  ParcelCoordinates,
  ParcelMapPicker,
} from "@/components/ui/parcel-map-picker";

import { useGetCrops } from "@/hooks/use-crop";
import { useCreateParcel, useReverseGeocode } from "@/hooks/use-parcels";
import { CreateParcelForm, createParcelSchema } from "@/schemas/parcels-schema";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ParcelsNew() {
  const router = useRouter();

  const [coordinates, setCoordinates] = useState<ParcelCoordinates | null>(
    null,
  );

  const createParcel = useCreateParcel();
  const reverseGeocode = useReverseGeocode();
  const {
    data: crops = [],
    isLoading: isCropsLoading,
    isError: isCropsError,
    refetch: refetchCrops,
  } = useGetCrops();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateParcelForm>({
    resolver: zodResolver(createParcelSchema),
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

  // Cuando el usuario selecciona o mueve el pin
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
      console.error("Error al obtener la dirección:", error);

      Alert.alert(
        "Ubicación seleccionada",
        "No fue posible obtener la dirección automáticamente. Puedes escribirla manualmente.",
      );
    }
  }

  // Guardar terreno
  async function onSubmit(data: CreateParcelForm) {
    if (!coordinates) {
      Alert.alert(
        "Ubicación requerida",
        "Selecciona la ubicación del terreno en el mapa.",
      );
      return;
    }

    try {
      await createParcel.mutateAsync(data);

      Alert.alert("Terreno registrado", "El terreno se guardó correctamente.", [
        {
          text: "Aceptar",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error("Error al guardar el terreno:", error);

      Alert.alert(
        "Error",
        "No fue posible registrar el terreno. Inténtalo nuevamente.",
      );
    }
  }

  const cargando = createParcel.isPending || reverseGeocode.isPending;

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7F0]">
      <ScrollView
        className="flex-1 bg-[#F4F7F0]"
        contentContainerStyle={{
          padding: 22,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row items-center gap-5">
          <Pressable
            onPress={() => router.back()}
            className="w-[40px] h-[40px] bg-[#EAF3E9] rounded-full justify-center items-center mr-3 active:opacity-80"
          >
            <Text className="text-[#245238] text-[20px] font-bold">‹</Text>
          </Pressable>
          <Text className=" text-xl font-bold text-[#173D2B]">
            Registrar nuevo terreno
          </Text>
        </View>

        {/* Nombre */}
        <Text className="mb-2 mt-[15px] text-sm font-semibold text-[#173D2B]">
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
                    No se pudieron cargar los cultivos. Toca para intentar
                    nuevamente.
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

        {/* Botón */}
        <Pressable
          className={`mt-[30px] flex-row items-center justify-center rounded-xl bg-[#286B45] p-[17px] ${
            cargando ? "opacity-50" : "active:opacity-80"
          }`}
          onPress={() => handleSubmit(onSubmit)()}
          disabled={cargando}
        >
          {createParcel.isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-base font-bold text-white">
              Guardar terreno
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
