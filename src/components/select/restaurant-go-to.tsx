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

const formatOptionLabel = (
  data,
  formatOptionLabelMeta,
  isSelected = false,
) => {
  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <HStack spacing={isSelected ? 2 : 5}>
      <Image
        boxSize={isSelected ? 8 : 16}
        objectFit="cover"
        borderRadius="md"
        src={`images/restaurants/${data.images?.[0].fileName}`}
      />
      <Stack>
        <Heading size="sm">{data.name}</Heading>
        {!isSelected && (
          <Text fontSize="xs" color="gray.500">
            {data.location ?? ""}
          </Text>
        )}
      </Stack>
    </HStack>
  );
};

export const RestaurantGoTo = (props: any) => {
  const { name, defaultValue, control, placeholder, style, ...rest } =
    props;
  const router = useRouter();
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      styles={{
        container: (provided) => ({
          ...provided,
          width: "100%",
        }),
        input: (provided) => ({
          ...provided,
          height: "40px",
        }),
      }}
      components={{
        DropdownIndicator: null,
        IndicatorSeparator: null,
        SingleValue: (props) => {
          return (
            <components.SingleValue
              {...props}
              children={formatOptionLabel(props.data, null, true)}
            />
          );
        },
      }}
      formatOptionLabel={formatOptionLabel}
      onChange={(selected: Restaurant) => {
        router.push(`/restaurants/${selected.id}`);
      }}
      placeholder={placeholder}
      loadOptions={loadOptions}
      {...rest}
    />
  );
};
