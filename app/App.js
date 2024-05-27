//bluetooth
import React from 'react';
import BluetoothEMGComponent from './BluetoothEMGComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to EMG Data Viewer</h1>
      </header>
      <main>
        <BluetoothEMGComponent />
      </main>
    </div>
  );
}

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import DataDisplayScreen from './DataDisplayScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App component rendered");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DataDisplay" component={DataDisplayScreen} options={{ title: 'Data Display' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}






// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './LoginScreen';
// import HomeScreen from './HomeScreen';
// import DataDisplayScreen from './DataDisplayScreen';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="DataDisplay" component={DataDisplayScreen} options={{ title: 'Data Display' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
