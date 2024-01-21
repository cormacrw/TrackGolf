// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  Roboto_300Light as lightRoboto,
  Roboto_400Regular as regularRoboto,
  Roboto_500Medium as mediumRoboto,
  Roboto_700Bold as boldRoboto,

} from "@expo-google-fonts/roboto"

import {
  RobotoMono_300Light as lightRobotoMono,
  RobotoMono_400Regular as regularRobotoMono,
  RobotoMono_500Medium as mediumRobotoMono,
  RobotoMono_600SemiBold as semiBoldRobotoMono,
  RobotoMono_700Bold as boldRobotoMono
} from '@expo-google-fonts/roboto-mono'

export const customFontsToLoad = {
  lightRoboto,
  regularRoboto,
  mediumRoboto,
  boldRoboto,
  lightRobotoMono,
  regularRobotoMono,
  mediumRobotoMono,
  semiBoldRobotoMono,
  boldRobotoMono,
}

const fonts = {
  roboto: {
    // Cross-platform Google font.
    light: "lightRoboto",
    normal: "regularRoboto",
    medium: "mediumRoboto",
    bold: "boldRoboto",
  },
  robotoMono: {
    // Cross-platform Google font.
    light: "lightRobotoMono",
    normal: "regularRobotoMono",
    medium: "mediumRobotoMono",
    semiBold: "semiBoldRobotoMono",
    bold: "boldRobotoMono",
  }
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.robotoMono,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: fonts.roboto,
  /**
   * Lets get fancy with a monospace font!
   */
  code: fonts.roboto,
}
