import { useEffect, useState } from "react";
// import { View, StyleSheet, Image, ScrollView } from "react-native";
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
// import { Text, Button, Card, Divider } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const firebaseConfig = {
  apiKey: "AIzaSyD9rLtN1xQY_DsJxRs59PXI7lXxh6MqZT0",
  authDomain: "unrwa-42aab.firebaseapp.com",
  projectId: "unrwa-42aab",
  storageBucket: "unrwa-42aab.firebasestorage.app",
  messagingSenderId: "535221623418",
  appId: "1:535221623418:web:9f337bedae5f772142f9c3",
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}
const db = getFirestore(app);

const ReusableMenu = ({ label, options, onSelect }) => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!visible);

  return (
    <Animatable.View
      animation="fadeIn"
      duration={1500}
      style={styles.menuContainer}
    >
      {/* Trigger Button */}
      <Button
        mode="contained"
        onPress={toggleMenu}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        {label}
      </Button>

      {/* Slide Animation for Menu */}
      {visible && (
        <Animatable.View
          animation="slideInLeft"
          duration={500}
          style={styles.menuList}
        >
          {options.map((option, index) => (
            <Animatable.View
              animation="fadeIn"
              duration={500}
              delay={index * 100}
              key={index}
            >
              <Button
                onPress={() => {
                  onSelect(option);
                  setVisible(false); // Close menu after selection
                }}
                style={styles.menuItem}
                labelStyle={styles.menuItemLabel}
              >
                {option.label}
              </Button>
            </Animatable.View>
          ))}
        </Animatable.View>
      )}
    </Animatable.View>
  );
};

const Main = () => {
  const [item, setItem] = useState({});

  const menuOptions = [
    {
      label: "Business Name",
      field: "name",
      options: [
        { label: "Business A", value: "Business A" },
        { label: "Business B", value: "Business B" },
        { label: "Business C", value: "Business C" },
      ],
    },
    {
      label: "Number of Employees",
      field: "number",
      options: [
        { label: "1-10", value: "1-10" },
        { label: "11-50", value: "11-50" },
        { label: "51-100", value: "51-100" },
      ],
    },
    {
      label: "Location",
      field: "location",
      options: [
        { label: "UK", value: "UK" },
        { label: "USA", value: "USA" },
        { label: "Dubai", value: "Dubai" },
      ],
    },
    {
      label: "Industry",
      field: "industry",
      options: [
        { label: "Technology", value: "Technology" },
        { label: "Retail", value: "Retail" },
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Healthcare", value: "Healthcare" },
      ],
    },
    {
      label: "Annual Revenue",
      field: "revenue",
      options: [
        { label: "$0-$1M", value: "$0-$1M" },
        { label: "$1M-$10M", value: "$1M-$10M" },
        { label: "$10M+", value: "$10M+" },
      ],
    },
    {
      label: "Years in Operation",
      field: "years",
      options: [
        { label: "0-2 Years", value: "0-2 Years" },
        { label: "3-5 Years", value: "3-5 Years" },
        { label: "5+ Years", value: "5+ Years" },
      ],
    },
  ];

  const handleSelect = (field, value) => {
    setItem((prev) => ({ ...prev, [field]: value }));
  };

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const querySnapshot = await getDocs(collection(db, "files"));
      const filesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFiles(filesData);
    };

    fetchFiles();
  }, []);

  const downloadFileToDownloads = async (base64Data, fileName) => {
    try {
      if (Platform.OS !== "android") {
        Alert.alert(
          "Not Supported",
          "This feature is only available on Android."
        );
        return;
      }

      // Request user to grant access to a folder
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted || !permissions.directoryUri) {
        Alert.alert(
          "Permission Denied",
          "You need to grant access to save files in the selected folder."
        );
        return;
      }

      const directoryUri = permissions.directoryUri;
      console.log("Directory URI:", directoryUri);

      // Create the file in the selected folder
      const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
        directoryUri,
        fileName,
        "application/pdf" // Replace with the MIME type of your file
      );

      console.log("File URI:", fileUri);

      // Write the Base64 data to the created file
      await FileSystem.StorageAccessFramework.writeAsStringAsync(
        fileUri,
        base64Data,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      Alert.alert(
        "File Saved",
        `The file has been saved to the selected folder as ${fileName}`
      );
    } catch (error) {
      Alert.alert("Error Saving File", error.message);
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Files</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.fileName}</Text>
            <Button
              title="Download"
              onPress={() =>
                downloadFileToDownloads(item.fileData, item.fileName)
              }
            />
          </View>
        )}
      />
    </SafeAreaView>
    // <LinearGradient
    //   colors={["#00DB8C", "#014F59"]}
    //   style={styles.gradientContainer}
    // >
    //   <ScrollView>
    //     <SafeAreaView style={styles.container}>
    //       {/* Logo */}
    //       <Animatable.View animation="bounceInDown" duration={2000}>
    //         <Card style={styles.card}>
    //           <Card.Content>
    //             <Animatable.View style={styles.logoContainer}>
    //               <Image
    //                 source={require("../assets/logo.jpg")}
    //                 style={styles.logo}
    //                 resizeMode="contain"
    //               />
    //             </Animatable.View>
    //             {/* Typing Animation for Subtitle */}
    //             <View style={styles.container}>
    //               <Text style={styles.subtitle}>
    //                 Every path has steps, and at the end of every step, there is
    //                 a success point.
    //               </Text>
    //             </View>
    //           </Card.Content>
    //         </Card>
    //       </Animatable.View>
    //       {/* Questions */}
    //       <Divider style={styles.divider} />
    //       {menuOptions.map((menu, index) => (
    //         <ReusableMenu
    //           key={index}
    //           label={menu.label}
    //           options={menu.options}
    //           onSelect={(option) => handleSelect(menu.field, option.value)}
    //         />
    //       ))}

    //       {/* Display Selected Data */}
    //       <Animatable.View
    //         animation="slideInUp"
    //         duration={2500}
    //         style={styles.resultContainer}
    //       >
    //         <Text style={styles.resultText}>
    //           Business Name: {item.name || "Not selected"}
    //         </Text>
    //         <Text style={styles.resultText}>
    //           Employees: {item.number || "Not selected"}
    //         </Text>
    //         <Text style={styles.resultText}>
    //           Location: {item.location || "Not selected"}
    //         </Text>
    //         <Text style={styles.resultText}>
    //           Industry: {item.industry || "Not selected"}
    //         </Text>
    //         <Text style={styles.resultText}>
    //           Revenue: {item.revenue || "Not selected"}
    //         </Text>
    //         <Text style={styles.resultText}>
    //           Years in Operation: {item.years || "Not selected"}
    //         </Text>
    //       </Animatable.View>
    //     </SafeAreaView>
    //   </ScrollView>
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 80,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#00DB8C",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  button: {
    backgroundColor: "#014F59",
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
  menuContainer: {
    marginVertical: 8,
  },
  menuList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
  },
  menuItem: {
    backgroundColor: "#F0F0F0",
    marginVertical: 4,
  },
  menuItemLabel: {
    color: "#014F59",
  },
  divider: {
    backgroundColor: "#014F59",
    height: 2,
    marginVertical: 16,
  },
  resultContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    color: "#014F59",
    marginVertical: 4,
    fontFamily: "Poppins-Regular",
  },
});

export default Main;
