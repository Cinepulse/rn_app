import { StatusBar, TouchableWithoutFeedback, Keyboard, StyleSheet, Text, View, Animated, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTFAMILY } from '../theme/theme';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon, ExclamationCircleIcon } from 'react-native-heroicons/solid'
import NetInfo from '@react-native-community/netinfo';
import OfflineScreen from '../components/OfflineScreen';
import LoadingScreen from '../components/LoadingScreen';
import { offlinedatafetch, signInUser } from '../data/onlinedb/expressApi';
import { useStore } from '../store/store';

const SignInScreen = (props: any) => {

  const [connectionStatus, setConnectionStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  const platform = Platform;

  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const value = useState(new Animated.ValueXY({ x: -710, y: 0 }))[0];

  const setAuthKey = useStore((state: any) => state.setAuthKey);
  const toggleSignIn = useStore((state: any) => state.toggleSignIn);
  const toggleOfflineDataFetch = useStore((state: any) => state.toggleOfflineDataFetch);
  const addUser = useStore((state: any) => state.addUser);
  const setIsDarkMode = useStore((state: any) => state.setIsDarkMode);
  const setisAddInfoDone = useStore((state: any) => state.setisAddInfoDone);
  const setgettingStartedDone = useStore((state: any) => state.setgettingStartedDone);
  const setvoiceFeature = useStore((state: any) => state.setvoiceFeature);
  const setpushNotification = useStore((state: any) => state.setpushNotification);
  const setuserRecentlyViewed = useStore((state: any) => state.setuserRecentlyViewed);
  const setuserSavedList = useStore((state: any) => state.setuserSavedList);
  const setuserSearchHistory = useStore((state: any) => state.setuserSearchHistory);
  const setuserNotification = useStore((state: any) => state.setuserNotification);
  const setuserOfflineImageList = useStore((state: any) => state.setuserOfflineImageList);
  const setuserOfflineMovieDetails = useStore((state: any) => state.setuserOfflineMovieDetails);


  useEffect(() => {
    Animated.timing(value, {
      toValue: { x: screenWidth * 1.7, y: 0 },
      duration: 100000,
      useNativeDriver: false,
    }).start();
  }, []);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    NetInfo.fetch().then((state) => {
      setConnectionStatus(state.isInternetReachable ?? false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleConnectivityChange = (state: any) => {
    setConnectionStatus(state.isConnected);
  };



  async function handelSubmit() {
    try {
      setLoading(true);
      const response = await signInUser(email, password, platform);
      setAuthKey(response.authToken);
      toggleSignIn();

      if (response.success == true) {
        const response2 = await offlinedatafetch(response.authToken);
        if (response2.success) {
          addUser(response2.data[0]);
          if (response2.data[1].darkOrLight == 'dark') {
            setIsDarkMode(true)
          } else { setIsDarkMode(false) }

          if (response2.data[1].isAddInfoDone) {
            setisAddInfoDone(true)
          } else { setisAddInfoDone(false) }

          if (response2.data[1].getStartedDone) {
            setgettingStartedDone(true)

          } else {
            setgettingStartedDone(false)
          }

          if (response2.data[1].voiceFeature) {
            setvoiceFeature(true)

          } else {
            setvoiceFeature(false)
          }

          if (response2.data[1].pushNotification) {
            setpushNotification(true)
          } else {
            setpushNotification(false)
          }

          if (response2.data[2]) {
            setuserRecentlyViewed(response2.data[2])
          }

          if (response2.data[3]) {
            setuserSavedList(response2.data[3])
          }

          if (response2.data[4]) {
            setuserSearchHistory(response2.data[4])
          }

          if (response2.data[5]) {
            setuserNotification(response2.data[5])
          }
          if (response2.data[6]) {
            setuserOfflineImageList(response2.data[6])
          }
          if (response2.data[7]) {
            setuserOfflineMovieDetails(response2.data[7])
          }

          setLoading(false);

          if (!response2.data[1].isAddInfoDone) {

            return props.navigation.replace('SuccessErrorScreen', {
              screen: 'AdditionalInformationScreen',
              type: 'loginsuccess',
              message: 'SignIn Successful'
            });
          }

          toggleOfflineDataFetch()

          if (!response2.data[1].getStartedDone) {

            return props.navigation.replace('SuccessErrorScreen', {
              screen: 'GettingStartedScreen',
              type: 'loginsuccess',
              message: 'SignIn Successful'
            });
          }

          if (response2.data[1].getStartedDone && response2.data[1].isAddInfoDone) {

            return props.navigation.replace('SuccessErrorScreen', {
              screen: 'BottomTab',
              type: 'loginsuccess',
              message: 'SignIn Successful'
            });
          }

        }else {
          setLoading(false);
          return props.navigation.replace('SuccessErrorScreen', {
            screen: 'SignUpScreen',
            type: 'error',
            message: 'Account Cretion Failed'
          });
        }

      } else {
        setLoading(false);
        return props.navigation.replace('SuccessErrorScreen', {
          screen: 'SignUpScreen',
          type: 'error',
          message: 'Account Cretion Failed'
        });
      }
    } catch (error) {
      setLoading(false);
      return props.navigation.replace('SuccessErrorScreen', {
        screen: 'SignUpScreen',
        type: 'error',
        message: 'Server Error! Please Try Again Later'
      });
    }
  }

  function handleEmail(e: any) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
      setEmailError(false);
    }
    else {
      setEmailError(true);
    }
  }

  function handlePassword(e: any) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
      setPasswordError(false);
    }
    else {
      setPasswordError(true);
    }
  }

  function handelTrmsandpolicy() {

  }

  function navToSignUp() {
    props.navigation.replace('SignUpScreen');
  }

  function navTofrgtPswrd() {
    props.navigation.push('ForgotPasswordScreen');
  }

  return (
    <>
      {!connectionStatus ? (
        <OfflineScreen />
      ) : loading ? (
        <LoadingScreen Message="Signing In....." />
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ width: screenWidth, height: screenHeight, backgroundColor: COLORS.darkBackground, justifyContent: 'center', alignItems: 'center' }}>

            <StatusBar
              backgroundColor={COLORS.darkBackground}
              barStyle='light-content'
            />

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Animated.Image
                source={require('../assets/images/sign_in_up_add_inf_bg_img.png')}
                style={[{ resizeMode: 'contain' }, value.getLayout()]}
              />

              <View style={{ width: screenWidth * 0.95, height: 'auto', position: 'absolute', backgroundColor: 'rgba(8,8,8,0.6)', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: COLORS.secondaryDarkYellow, fontFamily: FONTFAMILY.poppins_black, fontSize: 30 }}>Sign In</Text>

                <View style={styles.action}>

                  <EnvelopeIcon fill={COLORS.primaryDarkOrange} style={styles.smallIcon} />

                  <TextInput
                    placeholder="Email"
                    style={styles.textInput}
                    onChange={e => handleEmail(e)}
                  />
                  {email.length < 1 ? null : emailVerify ? (
                    <CheckCircleIcon fill={COLORS.successBackground} size={20} />
                  ) : (
                    <ExclamationCircleIcon fill={COLORS.errorBackground} size={20} />
                  )}
                </View>
                {email.length < 1 ? null : emailVerify ? null : (
                  <Text
                    style={{
                      color: COLORS.errorBackground,
                    }}>
                    <ExclamationCircleIcon
                      fill={COLORS.errorBackground} size={20} />
                    Enter Proper Email Address
                  </Text>
                )}

                <View style={styles.action}>
                  <LockClosedIcon fill={COLORS.primaryDarkOrange} style={styles.smallIcon} />
                  <TextInput
                    placeholder="Password"
                    style={styles.textInput}
                    onChange={e => handlePassword(e)}
                    secureTextEntry={showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {password.length < 1 ? null : !showPassword ? (
                      <EyeSlashIcon fill={passwordVerify ? COLORS.successText : COLORS.errorText} style={{ marginRight: -10 }} size={23} />
                    ) : (
                      <EyeIcon fill={passwordVerify ? COLORS.successText : COLORS.errorText} style={{ marginRight: -10 }} size={23} />
                    )}
                  </TouchableOpacity>
                </View>
                {password.length < 1 ? null : passwordVerify ? null : (
                  <Text
                    style={{
                      color: COLORS.errorBackground,
                    }}>
                    <ExclamationCircleIcon
                      fill={COLORS.errorBackground} size={20} />
                    Password should Contain
                    Uppercase, Lowercase, Number, Symbol and 8 or more characters.
                  </Text>
                )}

                <View style={styles.button}>
                  <TouchableOpacity style={[styles.inBut, { opacity: (emailError || passwordError) ? 0.5 : 1 }]} onPress={() => handelSubmit()} disabled={emailError || passwordError} >
                    <View>
                      <Text style={styles.textSign}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View>


                <View style={{ width: '85%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', margin: 10 }}>
                  <Text style={{ color: COLORS.lightText2, fontFamily: FONTFAMILY.poppins_medium, fontSize: 14 }}>
                    Do Not Have An Account?
                    {'  '}
                  </Text>
                  <TouchableOpacity onPress={() => navToSignUp()}>
                    <Text style={{ color: COLORS.secondaryDarkYellow, fontFamily: FONTFAMILY.poppins_medium, fontSize: 15 }}>Create New Account</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ width: '85%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', margin: 10. }}>
                  <TouchableOpacity onPress={() => navTofrgtPswrd()}>
                    <Text style={{ color: COLORS.secondaryDarkYellow, fontFamily: FONTFAMILY.poppins_medium, fontSize: 15 }}> Forgot Password ?</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  action: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 3,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.primaryDarkOrange,
    backgroundColor: COLORS.lightText2,
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    marginTop: -9,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: COLORS.darkText1
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    textAlign: 'center',
    color: COLORS.darkText2,
  },
  inBut: {
    width: '70%',
    backgroundColor: COLORS.secondaryDarkYellow,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textSign: {
    fontSize: 20,
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.darkText1,
  },
})
export default SignInScreen
