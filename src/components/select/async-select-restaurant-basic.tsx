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
  useToken,
} from "@chakra-ui/react";
import { RestaurantInclude } from "prisma/model";
import { useRouter } from "next/router";
import _ from "lodash";

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

const formatOptionLabel = (data) => {
  // const bgGray = useToken("colors", ["gray.100"]);
  logger.debug(
    "async-select-restaurant.tsx:formatOptionLabel:label",
    data,
  );
  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <HStack spacing={5}>
      <Image
        boxSize={16}
        objectFit="cover"
        borderRadius="md"
        src={`images/restaurants/${data.images?.[0].fileName}`}
      />
      <Stack>
        <Heading size="sm">{data.name}</Heading>
        <Text fontSize="xs" color="gray.500">
          Murcia
        </Text>
      </Stack>
    </HStack>
  );
};

export const SelectAsyncRestaurantBasic = (props: any) => {
  const { name, defaultValue, control, placeholder } = props;
  const router = useRouter();
  if (!control) {
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        formatOptionLabel={formatOptionLabel}
        onChange={(selected) => {
          router.push(`/restaurants/${selected.id}`);
        }}
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
              placeholder={placeholder}
              formatOptionLabel={formatOptionLabel}
              loadOptions={loadOptions}
            />
          );
        }}
      />
    </>
  );
};
