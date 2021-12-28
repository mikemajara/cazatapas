import { useColorMode, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <IconButton
      icon={isDark ? <FiSun /> : <FiMoon />}
      variant="ghost"
      aria-label="Toggle dark mode"
      isChecked={isDark}
      onClick={toggleColorMode}
    />
  )
}
