import { useCallback } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";

import { router } from "expo-router";

import { ParcelCard } from "@/components/ui/parcel-card";
import { useGetParcels } from "@/hooks/use-parcels";

export default function ParcelsScreen() {
  const {
    data: terrenos = [],
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useGetParcels();

  const actualizarTerrenos = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <FlatList
      data={terrenos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ParcelCard
          parcel={item}
          onPress={() =>
            router.push({
              pathname: "/parcels/details",
              params: { id: item.id },
            })
          }
        />
      )}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-[#F4F7F0]"
      contentContainerStyle={{
        paddingHorizontal: 22,
        paddingBottom: 35,
        flexGrow: 1,
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={actualizarTerrenos}
          tintColor="#286B45"
          colors={["#286B45"]}
        />
      }
      ListHeaderComponent={
        <View>
          {/* HEADER */}
          <View className="-mx-[22px] bg-[#173D2B] px-[22px] pb-[30px] pt-[55px]">
            <Text className="mt-[25px] text-[27px] font-bold text-white">
              Mis terrenos
            </Text>

            <Text className="mt-2 text-[#C5D9C8]">
              Administra tus parcelas agrícolas.
            </Text>
          </View>

          {/* AGREGAR TERRENO */}
          <Pressable
            className="my-6 flex-row items-center justify-center rounded-xl bg-[#286B45] p-4 active:opacity-80"
            onPress={() => router.push("/parcels/new")}
          >
            <Text className="mr-2 text-lg font-bold text-white">+</Text>
            <Text className="text-base font-bold text-white">
              Agregar nuevo terreno
            </Text>
          </Pressable>

          {/* TITULO */}
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-[#173D2B]">
              Mis parcelas ({terrenos.length})
            </Text>

            <Text className="text-xs text-[#89958A]">
              {isRefetching ? "Actualizando..." : "Desliza para actualizar"}
            </Text>
          </View>
        </View>
      }
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center py-12">
          {isLoading ? (
            <Text className="text-sm text-[#89958A]">Cargando terrenos...</Text>
          ) : isError ? (
            <>
              <Text className="mb-3 text-center font-semibold text-[#173D2B]">
                No se pudieron cargar tus terrenos.
              </Text>

              <Pressable
                onPress={actualizarTerrenos}
                className="rounded-lg bg-[#286B45] px-5 py-3"
              >
                <Text className="font-bold text-white">
                  Intentar nuevamente
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text className="mb-2 text-4xl">🌱</Text>

              <Text className="font-bold text-[#173D2B]">
                Todavía no tienes terrenos
              </Text>

              <Text className="mt-2 text-center text-sm text-[#89958A]">
                Registra tu primera parcela para comenzar.
              </Text>
            </>
          )}
        </View>
      }
    />
  );
}
