import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

export default function CustomDrawerContent(props) {
    const navigation = useNavigation();
    const { logout } = useUser();

    const handleLogout = () => {
        logout();

    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />

            <View style={{ marginTop: 20, paddingLeft: 20 }}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Sair</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}
