import React from "react";
import { logger } from "lib/logger";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import ky from "ky";
import { Restaurant, Tag } from "@prisma/client";
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
  let tags: Tag[] = await ky
    .get(`/api/tags?search=${inputValue}`)
    .json();
  return (
    tags
      // ?.filter((q) => q.symbol)
      .map((tag) => {
        return {
          ...tag,
          value: tag.id,
          label: `${tag.name}`,
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
  return <Text>{data.name}</Text>;
};

export const SelectAsyncTags = (props: any) => {
  const { name, defaultValue, control, placeholder } = props;

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
              isMulti
              cacheOptions
              defaultOptions
              closeMenuOnSelect={false}
              placeholder={placeholder}
              // formatOptionLabel={formatOptionLabel}
              loadOptions={loadOptions}
            />
          );
        }}
      />
    </>
  );
};
