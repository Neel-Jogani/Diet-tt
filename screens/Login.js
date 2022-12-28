// import * as React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import { RFValue } from 'react-native-responsive-fontsize';
// import * as Google from 'expo-google-app-auth';
// import firebase from 'firebase';

// export default class Login extends React.Component {
//   signInWithGoogleAsync = async () => {
//     try {
//       const result = await Google.logInAsync({
//         behavior: 'web',
//         androidClientId:
//           '178306805195-38clm3uu3vitkffh9ctlgavjt41p90qg.apps.googleusercontent.com',
//         iosClientId:
//           '178306805195-4k11se7160t3dr4n60ajva3knjigrveq.apps.googleusercontent.com',
//         scopes: ['profile', 'email'],
//       });

//       if (result.type === 'success') {
//         this.onSignIn(result);
//         return result.accessToken;
//       } else {
//         return { cancelled: true };
//       }
//     } catch (e) {
//       return { error: true };
//     }
//   };

//   isUserEqual = (googleUser, firebaseUser) => {
//     if (firebaseUser) {
//       var providerData = firebaseUser.providerData;
//       for (var i = 0; i < providerData.length; i++) {
//         if (
//           providerData[i].providerId ===
//             firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
//           providerData[i].uid === googleUser.getBasicProfile().getId()
//         ) {
//           return true;
//         }
//       }
//     }
//     return false;
//   };

//   onSignIn = (googleUser) => {
//     var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
//       unsubscribe();

//       if (!this.isUserEqual(googleUser, firebaseUser)) {
//         var credential = firebase.auth.GoogleAuthProvider.credential(
//           googleUser.idToken,
//           googleUser.accessToken
//         );

//         firebase
//           .auth()
//           .signInWithCredential(credential)
//           .then(function (result) {
//             if (result.additionalUserInfo.isNewUser) {
//               firebase
//                 .database()
//                 .ref('/users/' + result.user.uid)
//                 .set({
//                   gmail: result.user.email,
//                   profilePicture: result.additionalUserInfo.profile.picture,
//                   locale: result.additionalUserInfo.profile.locale,
//                   firstName: result.additionalUserInfo.profile.given_name,
//                   lastName: result.additionalUserInfo.profile.family_name,
//                   currentTheme: 'dark',
//                 })
//                 .then(function (snapshot) {});
//             }
//           })
//           .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;

//             var email = error.email;

//             var credential = error.credential;
//           });
//       } else {
//         console.log('User already signed-in Firebase.');
//       }
//     });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <SafeAreaView style={styles.droidSafeArea} />
//         <View style={styles.appTitle}>
//           <Image
//             source={require('../assets/logo.png')}
//             style={styles.appIcon}></Image>
//           <Text style={styles.appTitleText}>Spectagram</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => this.signInWithGoogleAsync()}>
//             <Image
//               source={require('../assets/google_icon.png')}
//               style={styles.googleIcon}></Image>
//             <Text style={styles.googleText}>Sign in with Google</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   droidSafeArea: {
//     marginTop:
//       Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
//   },
//   appTitle: {
//     flex: 0.4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   appIcon: {
//     width: RFValue(130),
//     height: RFValue(130),
//     resizeMode: 'contain',
//   },
//   appTitleText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: RFValue(40),
//   },
//   buttonContainer: {
//     flex: 0.3,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     width: RFValue(250),
//     height: RFValue(50),
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     borderRadius: RFValue(30),
//     backgroundColor: 'white',
//   },
//   googleIcon: {
//     width: RFValue(30),
//     height: RFValue(30),
//     resizeMode: 'contain',
//   },
//   googleText: {
//     color: 'black',
//     fontSize: RFValue(20),
//   },
// });
