import React from "react";
import { logger } from "lib/logger";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import ky from "ky";
import { Dish, Restaurant } from "@prisma/client";
import { components, MenuListProps } from "react-select";
import {
  Box,
  Heading,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  useToken,
} from "@chakra-ui/react";
import { DishInclude, RestaurantInclude } from "prisma/model";
import { useRouter } from "next/router";
import _ from "lodash";

const loadOptions = async (inputValue: string) => {
  let dishes: DishInclude[] = await ky
    .get(`/api/dishes?search=${inputValue}`)
    .json();
  logger.debug("dish-go-to.tsx:loadOptions:dishes", dishes);
  return dishes.map((dish) => {
    return {
      ...dish,
      value: dish.id,
      label: `${dish.name}`,
    };
  });
};

const formatOptionLabel = (
  data,
  formatOptionLabelMeta,
  isSelected = false,
) => {
  logger.debug("dish-go-to.tsx:formatOptionLabel:data", data);
  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <HStack spacing={isSelected ? 2 : 5}>
      <Image
        boxSize={isSelected ? 8 : 16}
        objectFit="cover"
        borderRadius="md"
        src={`images/dishes/${data.images?.[0]?.fileName}`}
      />
      <Stack>
        <Heading size="sm" fontWeight="regular">
          {data.name}
        </Heading>
        {!isSelected && (
          <Text fontSize="xs" color="gray.500">
            {data.restaurant?.name}
          </Text>
        )}
      </Stack>
      {isSelected && (
        <Box
          w={8}
          p={2}
          position="absolute"
          right="0"
          top={1.5}
          bg="white"
        >
          <Spinner size={"sm"} />
        </Box>
      )}
    </HStack>
  );
};

export const DishGoTo = (props: any) => {
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
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onChange={(selected: Dish, e) => {
        router.push(`/dishes/${selected.id}`);
      }}
      placeholder={placeholder}
      loadOptions={loadOptions}
      {...rest}
    />
  );
};
