import React from "react";
import { logger } from "lib/logger";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import ky from "ky";
import { Restaurant } from "@prisma/client";
import { components, MenuListProps } from "react-select";
import {
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RestaurantInclude } from "prisma/model";
import { useRouter } from "next/router";

const loadOptions = async (inputValue: string) => {
  let restaurants: RestaurantInclude[] = await ky
    .get(`/api/restaurants?search=${inputValue}`)
    .json();
  return (
    restaurants
      // ?.filter((q) => q.symbol)
      .map((restaurant) => {
        return {
          ...restaurant,
          value: restaurant.id,
          label: `${restaurant.name}`,
        };
      })
  );
};

export const SelectAsyncRestaurant = (props: any) => {
  const { name, defaultValue, control, placeholder } = props;
  const router = useRouter();
  if (!control) {
    return (
      <AsyncSelect
        styles={{
          container: (provided) => ({
            ...provided,
            width: "100%",
          }),
          control: (provided) => ({
            ...provided,
            borderColor: "gray.400",
          }),
        }}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          Option: ({ children, ...rest }) => {
            logger.debug("async-select-restaurant:Option:rest", rest);
            return (
              <HStack
                {...rest}
                sx={{ bgColor: "gray.500" }}
                onClick={() =>
                  router.push(`/restaurants/${rest.data.id}`)
                }
              >
                <Image
                  boxSize={16}
                  objectFit="cover"
                  p={1}
                  borderRadius="md"
                  src={`images/restaurants/${rest.data.images?.[0].fileName}`}
                />
                <Stack>
                  <Heading size="sm">{rest.data.name}</Heading>
                  <Text fontSize="xs" color="gray.500">
                    Murcia
                  </Text>
                </Stack>
              </HStack>
            );
          },
        }}
        cacheOptions
        defaultOptions
        placeholder={placeholder}
        loadOptions={loadOptions}
      />
    );
  }

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <AsyncSelect
              {...field}
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
            />
          );
        }}
      />
    </>
  );
};
