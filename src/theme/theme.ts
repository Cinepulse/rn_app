interface Spacing {
    space_2: number;
    space_4: number;
    space_8: number;
    space_10: number;
    space_12: number;
    space_15: number;
    space_16: number;
    space_18: number;
    space_20: number;
    space_24: number;
    space_28: number;
    space_30: number;
    space_32: number;
    space_36: number;
  }
  
  export const SPACING: Spacing = {
    space_2: 2,
    space_4: 4,
    space_8: 8,
    space_10: 10,
    space_12: 12,
    space_15: 15,
    space_16: 16,
    space_18: 18,
    space_20: 20,
    space_24: 24,
    space_28: 28,
    space_30: 30,
    space_32: 32,
    space_36: 36,
  };
  
  interface Color {
    darkBackground: string;
    lightBackground: string;
    primaryDarkOrange: string;
    secondaryDarkYellow: string;
    darkText1: string;
    darkText2: string;
    lightText1: string;
    lightText2: string;
    errorText: string;
    errorBackground: string;
    successText: string;
    successBackground: string;
    warningText: string;
    warningBackground: string;
    infoText:string;
    infoBackground:string;
  }
  
  export const COLORS: Color = {
    darkBackground: '#1C1C1C',
    lightBackground: '#F8F9F9',
    primaryDarkOrange: '#FF4F01',
    secondaryDarkYellow: '#FFD601',
    darkText1: '#303740',
    darkText2: '#434D5B',
    lightText1: '#F3F6F9',
    lightText2: '#E5EAF2',
    errorText: '#C70011',
    errorBackground: '#FFDBDE',
    successText: '#178D46',
    successBackground: '#C6F6D9',
    warningText: '#FF9411',
    warningBackground: '#FFF3C1',
    infoText:'#007FFF',
    infoBackground:'#CCE5FF',
  };
  
  interface FontFamily {
    poppins_black: string;
    poppins_bold: string;
    poppins_extrabold: string;
    poppins_extralight: string;
    poppins_medium: string;
    poppins_regular: string;
    poppins_semibold: string;
  }
  
  export const FONTFAMILY: FontFamily = {
    poppins_black: 'Poppins-Black',
    poppins_bold: 'Poppins-Bold',
    poppins_extrabold: 'Poppins-ExtraBold',
    poppins_extralight: 'Poppins-ExtraLight',
    poppins_medium: 'Poppins-Medium',
    poppins_regular: 'Poppins-Regular',
    poppins_semibold: 'Poppins-SemiBold',
  };
  
  interface FontSize {
    size_8: number;
    size_10: number;
    size_12: number;
    size_14: number;
    size_16: number;
    size_18: number;
    size_20: number;
    size_24: number;
    size_28: number;
    size_30: number;
  }
  
  export const FONTSIZE: FontSize = {
    size_8: 8,
    size_10: 10,
    size_12: 12,
    size_14: 14,
    size_16: 16,
    size_18: 18,
    size_20: 20,
    size_24: 24,
    size_28: 28,
    size_30: 30,
  };
  
  interface BorderRadius {
    radius_4: number;
    radius_8: number;
    radius_10: number;
    radius_15: number;
    radius_20: number;
    radius_25: number;
  }
  
  export const BORDERRADIUS: BorderRadius = {
    radius_4: 4,
    radius_8: 8,
    radius_10: 10,
    radius_15: 15,
    radius_20: 20,
    radius_25: 25,
  };